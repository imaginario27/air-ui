<template>
    <div :class="['flex flex-col', 'w-full', 'gap-2']">
        <!-- Label -->
        <label
            v-if="label"
            :for="id"
            :class="['text-sm', 'font-semibold', 'text-left', hasError ? 'text-text-error' : undefined]"
        >
            {{ label }}
            <span v-if="!required && showOptionalLabel" class="font-normal text-text-neutral-subtler">
                {{ optionalLabelText }}
            </span>
        </label>

        <!-- Help Text (top) -->
        <HelpText v-if="helpTextPosition === Position.TOP" :text="helpText" :error="error" />

        <BadgeStack
            v-if="multiple && hasBadgeStack && badgesSelectedOptions.length > 0"
            :items="badgesSelectedOptions"
            closeable
            @close="handleBadgeRemove"
        />

        <DropdownCombobox
            :id
            :ariaLabel="!label ? ariaLabel : undefined"
            :modelValue
            :options
            :type
            :placeholder
            :size
            :responsiveSize
            :activeStyle
            :noResultsFoundText
            :disabled
            :readonly
            :dropdownPosition
            :autoFlip
            :hasSeparator
            :multiple
            :allowDeselect
            :allowCustomValue
            :clearable
            :filterLocally
            :searchDebounce
            :isLoading
            :loadingText
            :transparent
            :clearSelectionAriaLabel
            :shouldTeleport
            :teleportTo
            :selectBoxClass="computedSelectBoxClass"
            @update:model-value="handleValueUpdate"
            @search="emit('search', $event)"
        />

        <!-- Help Text (bottom) -->
        <HelpText v-if="helpTextPosition === Position.BOTTOM" :text="helpText" :error="error" />
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
    ariaLabel: String as PropType<string>,
    helpText: String as PropType<string>,
    helpTextPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showOptionalLabel: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    optionalLabel: {
        type: String as PropType<string>,
        default: undefined,
    },
    options: {
        type: Array as PropType<SelectOption[]>,
        default: () => [],
    },
    placeholder: String as PropType<string>,
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
    responsiveSize: {
        type: Boolean as PropType<boolean | null>,
        default: null,
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
    autoFlip: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    noResultsFoundText: String as PropType<string>,
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    readonly: {
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
    selectBoxClass: String as PropType<string>,
    transparent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    clearSelectionAriaLabel: String as PropType<string>,
    shouldTeleport: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    teleportTo: {
        type: String as PropType<string>,
        default: 'body',
    },
    glowColorMode: {
        type: String as PropType<GlowColorMode>,
        validator: (value: GlowColorMode) => Object.values(GlowColorMode).includes(value),
    },
    glowTrigger: {
        type: String as PropType<GlowTrigger>,
        validator: (value: GlowTrigger) => Object.values(GlowTrigger).includes(value),
    },
    glowType: {
        type: String as PropType<GlowType>,
        validator: (value: GlowType) => Object.values(GlowType).includes(value),
    },
    glowOpacity: {
        type: Number as PropType<number>,
        validator: (value: number) => value >= 0 && value <= 100,
    },
    glowSize: {
        type: Number as PropType<number | null>,
        validator: (value: number | null) => value === null || value >= 0,
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'update:error', 'search'])

// Composables
const validationMode = useInjectedValidationMode()
const dsConfig = useDSConfig()

// Computed
const hasError = computed(() => props.error !== '')

// Glow
const { glowClass } = useFieldGlow(props, hasError)
const optionalLabelText = computed(() => props.optionalLabel ?? dsConfig.forms.optionalLabelText())

const computedSelectBoxClass = computed(() => {
    const errorClass = hasError.value ? 'border-border-error text-text-error' : ''

    return [errorClass, ...glowClass.value, props.selectBoxClass].filter(Boolean).join(' ')
})

const badgesSelectedOptions = computed(() => {
    if (!Array.isArray(props.modelValue)) return []

    return props.options
        .filter((option) => (props.modelValue as (string | number)[]).includes(option.value))
        .map((option) => ({
            ...option,
            text: option.text ?? '',
        }))
})

// Handlers
const handleValueUpdate = (newValue: string | number | (string | number)[] | null) => {
    emit('update:modelValue', newValue)
}

const handleBadgeRemove = (item: SelectOption) => {
    if (!Array.isArray(props.modelValue)) return

    emit(
        'update:modelValue',
        props.modelValue.filter((val) => val !== item.value),
    )
}

// Methods
const runValidation = () => {
    if (!props.required || !props.validator) return

    const result = props.validator(props.modelValue)

    emit('update:error', result ?? '')
}

// Watchers
watch(
    () => props.modelValue,
    () => {
        if (validationMode.value === FormValidationMode.BLUR) {
            runValidation()
        }
    },
)
</script>
