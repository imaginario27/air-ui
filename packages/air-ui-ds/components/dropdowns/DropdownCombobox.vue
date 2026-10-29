<template>
    <div class="relative w-full">
        <DropdownMenu
            ref="menu"
            :trigger="Trigger.MANUAL"
            :shouldTeleport
            :teleportTo
            :position="teleportPosition"
            :positionClass="`absolute ${dropdownPositionClass}`"
            :positionYOffset="dropdownGap"
            :autoFlip
            zIndex="10000"
            :class="['max-h-[200px]', 'overflow-y-auto', 'border', 'border-border-default']"
            @mousedown.prevent
        >
            <template #activator="{ isOpen }">
                <!-- Combobox Box -->
                <div
                    :class="[
                        'combobox-box',
                        'flex items-center justify-between gap-2',
                        'w-full',
                        'px-3',
                        disabled ? 'bg-background-neutral-disabled' : !transparent && 'bg-background-field',
                        'rounded',
                        'border border-border-default',
                        'text-sm',
                        disabled ? 'text-text-neutral-disabled' : 'text-text-default',
                        'focus-within:ring-2 focus-within:ring-border-primary-brand-default',
                        sizeClass,
                        selectBoxClass,
                    ]"
                >
                    <input
                        :id="id"
                        ref="input"
                        v-model="inputValue"
                        type="text"
                        role="combobox"
                        autocomplete="off"
                        aria-autocomplete="list"
                        aria-haspopup="listbox"
                        :aria-expanded="isOpen"
                        :aria-controls="listboxId"
                        :aria-activedescendant="
                            isOpen && highlightedIndex >= 0 ? getOptionId(highlightedIndex) : undefined
                        "
                        :aria-label="ariaLabel || resolvedPlaceholder"
                        :placeholder="inputPlaceholder"
                        :disabled="disabled"
                        :readonly="readonly"
                        :class="[
                            'flex-1',
                            'min-w-0',
                            'bg-transparent',
                            'outline-none',
                            'disabled:cursor-not-allowed',
                            hasMultipleSelection
                                ? 'placeholder:text-text-default'
                                : 'placeholder:text-text-neutral-subtle',
                        ]"
                        @input="handleInput($event as InputEvent)"
                        @click="openMenu"
                        @focus="isFocused = true"
                        @blur="handleBlur"
                        @keydown="handleKeydown"
                    />

                    <div class="flex gap-2 items-center" @mousedown.prevent>
                        <!-- Clear button -->
                        <ActionIconButton
                            v-if="clearable && !disabled && !readonly && hasValue"
                            :size="ButtonSize.SM"
                            :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT_SUBTLE"
                            icon="mdi:close-circle"
                            :ariaLabel="resolvedClearSelectionAriaLabel"
                            @click="handleClear"
                        />

                        <Spinner v-if="isLoading" />
                        <span
                            v-else
                            :class="['flex items-center', disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
                            @click="toggleMenu"
                        >
                            <Icon :name="isOpen ? 'mdi:unfold-less-horizontal' : 'mdi:unfold-more-horizontal'" />
                        </span>
                    </div>
                </div>
            </template>

            <template #items>
                <div :id="listboxId" role="listbox" :aria-multiselectable="multiple || undefined">
                    <!-- Loading state -->
                    <div
                        v-if="isLoading"
                        class="p-4 flex items-center justify-center space-x-2 text-sm text-text-neutral-subtle"
                    >
                        <Spinner />
                        <span>{{ resolvedLoadingText }}</span>
                    </div>

                    <!-- Filtered options -->
                    <template v-else-if="filteredOptions.length > 0">
                        <template v-for="(option, index) in filteredOptions" :key="index">
                            <DropdownSectionItem v-if="option.sectionTitle" :text="option.text" :icon="option.icon" />

                            <DropdownSelectItem
                                v-else
                                :id="getOptionId(index)"
                                role="option"
                                :aria-selected="isSelected(option)"
                                :type="type"
                                :size="size"
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
                                    index === highlightedIndex && 'bg-background-neutral-hover-subtle',
                                    hasSeparator && index !== filteredOptions.length - 1
                                        ? 'border-b border-border-default'
                                        : undefined,
                                ]"
                                @click="handleOptionClick(option)"
                            />
                        </template>
                    </template>

                    <!-- No Results Message -->
                    <div v-else class="p-2 text-sm text-text-neutral-subtle">
                        {{ resolvedNoResultsFoundText }}
                    </div>
                </div>
            </template>
        </DropdownMenu>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    id: {
        type: String as PropType<string>,
        required: true,
    },
    ariaLabel: String as PropType<string>,
    options: {
        type: Array as PropType<SelectOption[]>,
        default: () => [],
    },
    placeholder: String as PropType<string>,
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
    responsiveSize: {
        type: Boolean as PropType<boolean | null>,
        default: null,
    },
    activeStyle: {
        type: String as PropType<SelectActiveStyle>,
        default: SelectActiveStyle.CHECK,
        validator: (value: SelectActiveStyle) => Object.values(SelectActiveStyle).includes(value),
    },
    modelValue: {
        type: [String, Number, Array] as PropType<string | number | (string | number)[] | null>,
        default: null,
    },
    dropdownPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    selectBoxClass: String as PropType<string>,
    noResultsFoundText: String as PropType<string>,
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    readonly: {
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
    allowCustomValue: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    clearable: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    filterLocally: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    searchDebounce: {
        type: Number as PropType<number>,
        default: 300,
    },
    isLoading: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    loadingText: String as PropType<string>,
    clearSelectionAriaLabel: String as PropType<string>,
    transparent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    autoFlip: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    shouldTeleport: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    teleportTo: {
        type: String as PropType<string>,
        default: 'body',
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'search'])

// Composables
const dsConfig = useDSConfig()

// Constants
const dropdownGap = 4

// Refs
const menu = ref<{ open: () => void; close: () => void; toggle: () => void; isOpen: boolean } | null>(null)
const input = ref<HTMLInputElement | null>(null)

// States
const inputValue = ref('')
const query = ref('')
const highlightedIndex = ref(-1)
const isFocused = ref(false)
let searchTimer: ReturnType<typeof setTimeout> | null = null

// Computed
const listboxId = computed(() => `${props.id}-listbox`)
const resolvedPlaceholder = computed(() => props.placeholder ?? dsConfig.forms.selectPlaceholderText())
const resolvedNoResultsFoundText = computed(() => props.noResultsFoundText ?? dsConfig.forms.noResultsText())
const resolvedLoadingText = computed(() => props.loadingText ?? dsConfig.forms.loadingOptionsText())
const resolvedClearSelectionAriaLabel = computed(
    () => props.clearSelectionAriaLabel ?? dsConfig.forms.clearSelectionText(),
)

const isResponsive = computed(() => props.responsiveSize ?? dsConfig.forms.responsiveSize)

const sizeClass = computed(() => {
    if (isResponsive.value && props.size === SelectSize.MD) return 'min-h-[44px] lg:min-h-[36px]'

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

const teleportPosition = computed(() => {
    const positionVariant = {
        [Position.TOP]: DropdownPosition.TOP_LEFT,
        [Position.BOTTOM]: DropdownPosition.BOTTOM_LEFT,
    }

    return positionVariant[props.dropdownPosition as Position] || DropdownPosition.BOTTOM_LEFT
})

const getOptionLabel = (option?: SelectOption | null) => option?.text || option?.userDisplayName || ''

const selectedValues = computed<(string | number)[]>(() => {
    if (Array.isArray(props.modelValue)) return props.modelValue
    return props.modelValue === null || props.modelValue === '' ? [] : [props.modelValue]
})

const selectedOptions = computed(() => props.options.filter((option) => selectedValues.value.includes(option.value)))

const hasValue = computed(() => selectedValues.value.length > 0 || inputValue.value !== '')
const hasMultipleSelection = computed(() => props.multiple && selectedOptions.value.length > 0)

// Single mode: label of the current selection (or the custom value itself)
const selectedLabel = computed(() => {
    if (props.multiple || selectedValues.value.length === 0) return ''

    const option = selectedOptions.value[0]
    if (option) return getOptionLabel(option)

    return props.allowCustomValue ? String(selectedValues.value[0]) : ''
})

// Multiple mode: the input only holds the search query, so selections are summarized in the placeholder
const inputPlaceholder = computed(() => {
    if (!hasMultipleSelection.value) return resolvedPlaceholder.value

    return trimText(selectedOptions.value.map(getOptionLabel).filter(Boolean).join(', '), 40)
})

const filteredOptions = computed(() => {
    if (!props.filterLocally || query.value === '') return props.options

    const search = query.value.toLowerCase()

    return props.options.filter(
        (option) => !option.sectionTitle && getOptionLabel(option).toLowerCase().includes(search),
    )
})

const navigableIndexes = computed(() =>
    filteredOptions.value.reduce<number[]>((acc, option, index) => {
        if (!option.sectionTitle && !option.disabled) acc.push(index)
        return acc
    }, []),
)

// Helpers
const getOptionId = (index: number) => `${props.id}-option-${index}`

const isSelected = (option: SelectOption) => selectedValues.value.includes(option.value)

const syncInputValue = () => {
    inputValue.value = props.multiple ? '' : selectedLabel.value
    query.value = ''
}

const clearSearchTimer = () => {
    if (searchTimer !== null) {
        globalThis.clearTimeout(searchTimer)
        searchTimer = null
    }
}

const emitSearch = (value: string) => {
    clearSearchTimer()
    searchTimer = globalThis.setTimeout(() => emit('search', value), props.searchDebounce)
}

const openMenu = () => {
    if (props.disabled || props.readonly || menu.value?.isOpen) return

    menu.value?.open()
    highlightedIndex.value = filteredOptions.value.findIndex((option) => !option.sectionTitle && isSelected(option))
}

const closeMenu = () => {
    menu.value?.close()
    highlightedIndex.value = -1
}

const toggleMenu = () => {
    if (props.disabled || props.readonly) return

    if (menu.value?.isOpen) {
        closeMenu()
    } else {
        input.value?.focus()
        openMenu()
    }
}

// Handlers
const handleInput = (event: InputEvent) => {
    inputValue.value = (event.target as HTMLInputElement).value
    query.value = inputValue.value
    openMenu()
    highlightedIndex.value = navigableIndexes.value[0] ?? -1
    emitSearch(inputValue.value)
}

const commitCustomValue = () => {
    const value = inputValue.value.trim()
    if (!props.allowCustomValue || !value) return false
    if (!props.multiple && value === selectedLabel.value) return false

    // Typing the exact label of an existing option picks that option instead of a custom value
    const match = props.options.find(
        (option) => !option.sectionTitle && getOptionLabel(option).toLowerCase() === value.toLowerCase(),
    )
    const resolved = match ? match.value : value

    if (props.multiple) {
        if (!selectedValues.value.includes(resolved)) {
            emit('update:modelValue', [...selectedValues.value, resolved])
        }
        inputValue.value = ''
        query.value = ''
    } else {
        emit('update:modelValue', resolved)
    }

    closeMenu()
    return true
}

const handleOptionClick = (option: SelectOption) => {
    if (props.disabled || props.readonly || option.disabled) return

    if (props.multiple) {
        const next = selectedValues.value.includes(option.value)
            ? selectedValues.value.filter((value) => value !== option.value)
            : [...selectedValues.value, option.value]

        emit('update:modelValue', next)
        inputValue.value = ''
        query.value = ''
        input.value?.focus()
        return
    }

    emit('update:modelValue', props.allowDeselect && isSelected(option) ? null : option.value)
    inputValue.value = props.allowDeselect && isSelected(option) ? '' : getOptionLabel(option)
    query.value = ''
    closeMenu()
}

const handleClear = () => {
    if (props.readonly) return

    emit('update:modelValue', props.multiple ? [] : null)
    inputValue.value = ''
    query.value = ''
    emitSearch('')
    input.value?.focus()
}

const handleBlur = () => {
    isFocused.value = false

    if (!commitCustomValue()) {
        syncInputValue()
    }

    closeMenu()
}

const moveHighlight = (direction: 1 | -1) => {
    const indexes = navigableIndexes.value
    if (indexes.length === 0) return

    const current = indexes.indexOf(highlightedIndex.value)
    const start = direction === 1 ? -1 : 0
    const next = ((current === -1 ? start : current) + direction + indexes.length) % indexes.length

    highlightedIndex.value = indexes[next]!
}

const handleKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
            event.preventDefault()
            if (!menu.value?.isOpen) {
                openMenu()
                // Opening already highlights the current selection
                if (highlightedIndex.value >= 0) break
            }
            moveHighlight(event.key === 'ArrowDown' ? 1 : -1)
            break
        case 'Enter': {
            const option = filteredOptions.value[highlightedIndex.value]

            if (menu.value?.isOpen && option && !option.sectionTitle) {
                event.preventDefault()
                handleOptionClick(option)
            } else if (commitCustomValue()) {
                event.preventDefault()
            }
            break
        }
        case 'Escape':
            if (menu.value?.isOpen) {
                event.preventDefault()
                syncInputValue()
                closeMenu()
            }
            break
    }
}

// Keep the highlighted option visible while navigating with the keyboard
watch(highlightedIndex, (index) => {
    if (index < 0) return

    nextTick(() => document.getElementById(getOptionId(index))?.scrollIntoView({ block: 'nearest' }))
})

// Reflect external changes of the value (and late-loaded options) in the input
watch(() => props.modelValue, syncInputValue)
watch(
    () => props.options,
    () => {
        if (!isFocused.value) syncInputValue()
    },
)

syncInputValue()

onBeforeUnmount(clearSearchTimer)
</script>
