<template>
    <div 
        :class="[ 
            'flex flex-col',
            'w-full', 
            'gap-2' 
        ]"
    >
        <!-- Label -->
        <label 
            v-if="label"
            :for="id" 
            :class="[ 
                'text-sm', 
                'font-semibold', 
                'text-left', 
                hasError ? 'text-text-error' : undefined 
            ]"
        >
            {{ label }}
        </label>

        <BadgeStack 
            v-if="multiple && hasBadgeStack"
            :items="badgesSelectedOptions"
            closeable
            @close="handleBadgeRemove"
        />
        
        <DropdownSelect 
            :id
            :key="computedPlaceholder"
            :modelValue 
            :options 
            :type 
            :borderClass="hasError ? 'border border-border-error text-text-error' : 'border border-border-default'"
            :placeholder="computedPlaceholder"
            :size
            :activeStyle
            :filterable
            :searchFieldPlaceholder
            :noResultsFoundText
            :disabled
            :dropdownPosition
            :hasSeparator
            :multiple
            :allowDeselect
            :isLoading="isLoadingOptions"
            :loadingText
            :selectBoxClass
            @update:modelValue="handleValueUpdate"
        />

        <!-- Help Text -->
        <p 
            v-if="hasError || helpText"
            :class="[ 
                'text-xs text-left', 
                hasError ? 'text-text-error' : 'text-text-neutral-subtle' 
            ]" 
        >
            {{ hasError ? error : helpText }}
        </p>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    id: { 
        type: String as PropType<string>, 
        required: true,
    },
    label: String as PropType<string>,
    helpText: String as PropType<string>,
    required: { 
        type: Boolean as PropType<boolean>, 
        default: false,
    },
    options: {
        type: Array as PropType<SelectOption[]>,
        default: () => [],
    },
    placeholder: { 
        type: String as PropType<string>,
        default: 'Select an option',
    },
    modelValue: {
        type: [String, Number, Array] as PropType<string | number | (string | number)[] | null>, 
        default: null,
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
    dropdownPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
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
    validator: {
        type: Function as PropType<(value: unknown) => string | null>,
        default: () => null,
    },
    error: {
        type: String as PropType<string>,
        default: '',
    },
    hasSeparator: Boolean as PropType<boolean>,
    multiple: Boolean as PropType<boolean>,
    hasBadgeStack: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    allowDeselect: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showLoadingState: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    isLoading: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    loadingText: {
        type: String as PropType<string>,
        default: 'Loading options...'
    },
    loadingOptionsPlaceholder: { 
        type: String as PropType<string>,
        default: 'Options are being loaded',
    },
    selectBoxClass: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue', 'update:error'])

// Composables
const validationMode = useInjectedValidationMode()

// Computed
const hasError = computed(() => props.error !== '')
const hasOptions = computed(() => Array.isArray(props.options) && props.options.length > 0)

const isLoadingOptions = computed(() => {
    if (!props.showLoadingState) return false

    return props.isLoading && !hasOptions.value
})

const computedPlaceholder = computed(() => {
    if (props.showLoadingState && props.isLoading && !hasOptions.value) {
        return props.loadingOptionsPlaceholder
    }

    return props.placeholder
})

// Handlers
const handleValueUpdate = (newValue: string | number | (string | number)[] | null) => {
    if (props.allowDeselect && !props.multiple) {
        // If it a simple select, deselect on click
        if (newValue === props.modelValue) {
            emit('update:modelValue', null)
            return
        }
    }

    emit('update:modelValue', newValue)
}

// Methods
const runValidation = () => {
    if (!props.required || !props.validator) return

    const result = props.validator(props.modelValue)

    emit('update:error', result ?? '')
}

const badgesSelectedOptions = computed(() => {
    if (!Array.isArray(props.modelValue)) return []

    return props.options
        .filter(option => (props.modelValue as (string | number)[]).includes(option.value))
        .map(option => ({
            ...option,
            text: option.text ?? '',
        }))
})

const handleBadgeRemove = (item: SelectOption) => {
    if (!Array.isArray(props.modelValue)) return

    const updated = props.modelValue.filter(val => val !== item.value)
    emit('update:modelValue', updated)
}

// Watchers
watch(() => props.modelValue, () => {
    if (validationMode.value === FormValidationMode.BLUR) {
        runValidation()
    }
})
</script>
