<template>
    <div class="relative w-full">
        <!-- Dropdown Menu -->
        <DropdownMenu
            ref="dropdownContainer"
            :shouldTeleport="false"
            :positionClass="`absolute ${dropdownPositionClass}`"
            zIndex="10"
            :dropdownClass
            :class="[ 
                'max-h-[200px]', 
                'overflow-y-auto', 
                'border', 
                'border-border-default', 
            ]"
        >
            <template #activator="{ isOpen }">
                <!-- Select Box -->
                <div
                    :class="[ 
                        'select-box', // Class identifier for unit test
                        'flex items-center justify-between',
                        'w-full',
                        'px-3',
                        disabled && 'bg-background-neutral-disabled',
                        'rounded',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                        'border border-border-default',
                        'text-sm',
                        disabled ? 'text-text-neutral-disabled' : 'text-text-default',
                        sizeClass,
                        selectBoxClass,
                    ]"
                    @click="handleSelectBoxClick"
                >
                    <div v-if="multiple">
                        <template v-if="Array.isArray(selected) && selected.length">
                            <div class="flex flex-wrap gap-1">
                                {{ trimText(multiSelectionText, 40) }}
                            </div>
                        </template>
                        <template v-else>
                            <span class="text-text-neutral-subtle">
                                {{ placeholder }}
                            </span>
                        </template>
                    </div>

                    <div 
                        v-else
                        class="flex items-center gap-2"
                    >
                        <!-- Render based on type -->
                        <template v-if="type === SelectType.USER">
                            <!-- Show default placeholder if no user is selected -->
                            <template v-if="!selectedOption?.userDisplayName">
                                <span>{{ placeholder }}</span>
                            </template>
                            <!-- Show selected user's avatar and displayName -->
                            <template v-else>
                                <User
                                    :displayName="selectedOption?.userDisplayName"
                                    :imgUrl="selectedOption?.userProfileImg"
                                    :size="AvatarSize.XS"
                                />
                            </template>
                        </template>
                        <template v-else-if="type === SelectType.ICON && selectedOption?.icon">
                            <Icon
                                :name="selectedOption?.icon" 
                            />
                        </template>
                        <template v-else-if="type === SelectType.IMAGE && selectedOption?.imgUrl">
                            <img
                                v-if="selectedOption?.imgUrl && isImageLoaded"
                                :src="selectedOption?.imgUrl" 
                                :alt="selectedOption?.alt" 
                                class="w-[20px] h-[20px] rounded" 
                                @load="handleImageLoad"
                                @error="handleImageError"
                            >
                            <img
                                v-else
                                :src="missingImagePlaceholder"
                                :alt="selectedOption?.alt" 
                                class="w-[20px] h-[20px] rounded" 
                            >
                        </template>
                        <span 
                            v-if="type !== SelectType.USER"
                            class="text-left" 
                        >
                            {{ selectedOption?.text }}
                        </span>
                    </div>

                    <div class="flex gap-2 items-center">
                        <!-- Clear button -->
                        <ActionIconButton 
                            v-if="multiple && Array.isArray(selected) && selected.length"
                            :size="ButtonSize.SM"
                            :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT_SUBTLE"
                            icon="mdi:close-circle"
                            @click="selected = []"
                        />

                        <!-- Show loading icon while loading instead of the icon-->
                        <Spinner v-if="isLoading" />
                        <Icon 
                            v-else
                            :name="isOpen ? 'mdi:unfold-less-horizontal' : 'mdi:unfold-more-horizontal'"
                        />
                    </div>
                </div>
            </template>

            <template #items="{ onClose }">
                <!-- Show loading state if it is loading -->
                <div v-if="isLoading" class="p-4 flex items-center justify-center space-x-2 text-sm text-text-neutral-subtle">
                    <Spinner/>
                    <span>{{ loadingText }}</span>
                </div>
                <template v-else>
                    <!-- Search Input -->
                    <div 
                        v-if="filterable" 
                        :class="[ 
                            'p-2', 
                            'sticky',
                            'top-0', 
                            'bg-background-container-surface', 
                            'z-10',
                        ]"
                    >
                        <input
                            v-model="searchQuery"
                            type="text"
                            :placeholder="searchFieldPlaceholder"
                            :class="[ 
                                'w-full', 
                                'px-2', 
                                'py-1', 
                                'border', 
                                'border-border-default', 
                                'rounded-sm', 
                                'text-sm', 
                                'outline-none',
                                searchQuery ? 'text-text-default' : 'text-text-neutral-subtle',
                                isSearchFieldFocused && 'ring-2 focus-within:ring-inset focus-within:ring-border-primary-brand-default',
                            ]"
                            @focus="isSearchFieldFocused = true"
                            @blur="isSearchFieldFocused = false"
                        >
                    </div>

                    <!-- Filtered options -->
                    <div v-if="filteredOptions.length > 0">
                        <template
                            v-for="(option, index) in filteredOptions"
                            :key="index"
                        >
                            <DropdownSectionItem
                                v-if="option.sectionTitle"
                                :text="option.text"
                                :icon="option.icon"
                            />

                            <DropdownSelectItem
                                v-else
                                :type="type"
                                :text="option.text"
                                :icon="option.icon"
                                :userDisplayName="option.userDisplayName"
                                :userProfileImg="option.userProfileImg"
                                :imgUrl="option.imgUrl"
                                :alt="option.alt"
                                :helpText="option.helpText"
                                :isSelected="isSelected(option)"
                                :activeStyle="activeStyle"
                                :to="option.to"
                                :isExternal="option.isExternal"
                                :disabled="option.disabled"
                                :class="[
                                    hasSeparator && index !== filteredOptions.length - 1 
                                        ? 'border-b border-border-default' 
                                        : undefined
                                ]"
                                @click="() => { 
                                    handleOptionClick(option)
                                    if (!multiple) onClose()
                                }"
                            />
                        </template>
                    </div>
                    
                    <!-- No Results Message -->
                    <div v-else class="p-2 text-sm text-text-neutral-subtle">
                        {{ noResultsFoundText }}
                    </div>
                </template>
            </template>
        </DropdownMenu>
    </div>
</template>

<script setup lang="ts">
// Imports
import missingImagePlaceholder from '@/assets/images/placeholders/missing-image-placeholder.png'

// Props
const props = defineProps({
    id: String as PropType<string>,
    options: {
        type: Array as PropType<SelectOption[]>,
        default: () => [
            {
                text: 'Item 1',
                value: 'item-1',
            },
            {
                text: 'Item 2',
                value: 'item-2',
            },
            {
                text: 'Item 3',
                value: 'item-3',
            },
        ]
    },
    placeholder: { 
        type: String as PropType<string>,
        default: 'Select an option',
    },
    type: {
        type: String as PropType<SelectType>,
        default: SelectType.TEXT,
        validator: (value: SelectType) => Object.values(SelectType).includes(value),
    },
    size: {
        type: String as PropType<SelectSize>,
        default: SelectSize.MD,
        validator: (value: SelectSize) => Object.values(SelectSize).includes(value),
    },
    activeStyle: {
        type: String as PropType<SelectActiveStyle>,
        default: SelectActiveStyle.CHECK,
        validator: (value: SelectActiveStyle) => Object.values(SelectActiveStyle).includes(value),
    },
    modelValue: {
        type: [String, Number, Object, Array] as PropType<string | number | (string | number)[] | null>, 
        default: null,
    },
    dropdownPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    selectBoxClass: String as PropType<string>,
    filterable: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    searchFieldPlaceholder: {
        type: String as PropType<string>,
        default: 'Search...',
    },
    noResultsFoundText: {
        type: String as PropType<string>,
        default: 'No results found',
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasSeparator: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    multiple: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    allowDeselect: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isLoading: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    loadingText: {
        type: String as PropType<string>,
        default: 'Loading options...',
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'onSelect'])

// Computed classes
const sizeClass = computed(() => {
    const sizeVariant = {
        [SelectSize.MD]: 'min-h-[36px]',
        [SelectSize.LG]: 'min-h-[44px]',
    }
    return sizeVariant[props.size as SelectSize] || 'min-h-[36px]'
})

const dropdownPositionClass = computed(() => {
    const positionVariant = {
        [Position.TOP]: 'bottom-full mb-1',
        [Position.BOTTOM]: 'top-full mt-1',
    }

    return positionVariant[props.dropdownPosition as Position] || 'top-full mt-1'
})

const dropdownClass = computed(() => {
    const baseClass= 'max-w-full'

    return props.filterable? `${baseClass} pt-0!` : baseClass
})

// States
const isImageLoaded = ref(true)
const selected = ref<SelectOption[] | SelectOption | null>(props.multiple ? [] : null)
const searchQuery = ref('')
const isSearchFieldFocused = ref(false)

// Handlers for image load and error
const handleImageLoad = () => {
    isImageLoaded.value = true
}

const handleImageError = () => {
    isImageLoaded.value = false
}

const handleSelectBoxClick = (event: MouseEvent) => {
    // DropdownMenu handles open/close at its activator wrapper level,
    // so disabled state must stop click propagation before it reaches that wrapper.
    if (props.disabled || props.isLoading) {
        event.preventDefault()
        event.stopPropagation()
    }
}

// Initialize the selected state dynamically based on the 'modelValue' (key options: id or value)
const initializeSelected = () => {
    const hasOptions = Array.isArray(props.options) && props.options.length > 0

    if (props.modelValue) {
        if (props.multiple && Array.isArray(props.modelValue)) {
            selected.value = hasOptions
                ? props.options.filter(option =>
                    (props.modelValue as (string | number)[]).includes(option.value)
                )
                : []
        } else {
            const preselectedOption = hasOptions
                ? props.options.find(
                    (option) => option.id === props.modelValue || option.value === props.modelValue
                )
                : null

            selected.value = preselectedOption 
                ? { ...preselectedOption } 
                : { text: props.placeholder, value: '' }
        }
    } else {
        const defaultValue = hasOptions ? props.options[0]!.value : ''

        if (props.multiple) {
            selected.value = []
        } else {
            switch (props.type) {
                case SelectType.ICON:
                    selected.value = { text: props.placeholder, icon: '', value: defaultValue }
                    break
                case SelectType.USER:
                    selected.value = { userDisplayName: '', userProfileImg: '', value: defaultValue }
                    break
                case SelectType.IMAGE:
                    selected.value = { text: props.placeholder, imgUrl: '', alt: 'Default image', value: defaultValue }
                    break
                default:
                    selected.value = { text: props.placeholder, value: defaultValue }
                    break
            }
        }
    }
}

// Concatenated string with text or userDisplayName
const multiSelectionText = computed(() => {
    if (!props.multiple || !Array.isArray(selected.value)) return ''

    return selected.value
        .map(option => props.type === SelectType.USER ? option.userDisplayName : option.text)
        .filter(Boolean)
        .join(', ')
})

// Check if the option is selected based on the `type`
const isSelected = (option: SelectOption) => {
    if (props.multiple && Array.isArray(props.modelValue)) {
        return (selected.value as SelectOption[]).some(
            (item) => item.value === option.value
        )
    }
    return JSON.stringify(selected.value) === JSON.stringify(option)
}

const selectedOption = computed(() => {
    return !props.multiple && selected.value && !Array.isArray(selected.value)
        ? selected.value as SelectOption
        : null
})

// Computed: Filtered options based on search query
const filteredOptions = computed(() => {

    if (props.isLoading || !Array.isArray(props.options) || props.options.length === 0) return []
    
    return props.options.filter(option =>
        (option?.text || option?.userDisplayName || '')
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
    )
})

// Updates visually the component when the value has changed
watch(() => props.modelValue, (newValue) => {
    if (props.multiple) {
        if (Array.isArray(newValue)) {
            selected.value = props.options.filter(option => newValue.includes(option.value))
        } else {
            selected.value = []
        }

    } else {
        const newSelected = props.options.find(option => option.value === newValue) as SelectOption
        selected.value = newSelected || { 
            text: props.placeholder, 
            value: (
                typeof props.modelValue === 'string' || 
                typeof props.modelValue === 'number'
            )
                ? props.modelValue
                : ''
        }
    }
})

// Method
const handleOptionClick = (option: SelectOption) => {
    if (props.disabled || props.isLoading || option.disabled) return

    const optionValue = option.value

    // Multiple select with deselect
    if (props.multiple) {
        // Multiple selection
        const currentValues = Array.isArray(props.modelValue) ? props.modelValue : []
        const isSelected = currentValues.includes(optionValue)
        
        if (isSelected) {
            // If selected, deselect.
            const newValues = currentValues.filter(val => val !== optionValue)
            emit('update:modelValue', newValues)
        } else {
            // Add to selection
            emit('update:modelValue', [...currentValues, optionValue])
        }
    } else {
        // Simple select
        if (props.allowDeselect && props.modelValue === optionValue) {
            // Deselect if this options is enabled
            emit('update:modelValue', null)
        } else {
            // Select new option
            emit('update:modelValue', optionValue)
        }
        
        // Close dropdown for simple selection
        toggle()
    }
}

// Composables
const [_, toggle] = useToggle(false)

onMounted(() => {
    initializeSelected()
})
</script>
