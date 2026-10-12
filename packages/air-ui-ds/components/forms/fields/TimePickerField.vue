<template>
    <div :class="['flex flex-col', 'w-full', 'gap-2']">
        <!-- Label -->
        <component
            :is="isInline ? 'span' : 'label'"
            v-if="label"
            :for="isInline ? undefined : id"
            :class="['text-sm', 'font-semibold', 'text-left', hasError && 'text-text-error']"
        >
            {{ label }}
            <span v-if="!required && showOptionalLabel" class="font-normal text-text-neutral-subtler">
                {{ optionalLabelText }}
            </span>
        </component>

        <!-- Help Text (top) -->
        <HelpText v-if="helpTextPosition === Position.TOP" :text="helpText" :error="error" />

        <div ref="container" :class="!isInline && 'relative'">
            <!-- Input (the time picker opens below or above it) -->
            <div
                v-if="!isInline"
                :class="[
                    'flex gap-2',
                    'items-center',
                    'border',
                    'rounded-md',
                    'transition-all',
                    'text-text-default',
                    icon ? 'pl-3' : 'pl-4',
                    'pr-3',
                    inputSizeClass,
                    hasError ? 'border-border-error text-text-error' : 'border-border-default',
                    (isFocused || isOpen) && 'ring-2 ring-inset ring-border-primary-brand-default',
                    disabled ? 'bg-background-neutral-disabled' : !transparent && 'bg-background-container-surface',
                    disabled && 'cursor-not-allowed',
                ]"
            >
                <Icon v-if="icon" :name="icon" iconClass="text-icon-neutral-subtler" />

                <input
                    :id
                    ref="input"
                    type="text"
                    readonly
                    aria-haspopup="dialog"
                    :aria-expanded="isOpen"
                    :aria-label="!label ? ariaLabel : undefined"
                    :placeholder="resolvedPlaceholder"
                    :value="displayValue"
                    :disabled
                    :class="[
                        'w-full',
                        'outline-none',
                        'bg-transparent',
                        'text-sm',
                        'placeholder-text-neutral-subtler',
                        disabled ? 'cursor-not-allowed' : !readonly && 'cursor-pointer',
                    ]"
                    @focus="isFocused = true"
                    @blur="isFocused = false"
                    @click="toggle"
                    @keydown="handleKeydown"
                />

                <!-- Clear -->
                <button
                    v-if="clearable && modelValue && !disabled && !readonly"
                    type="button"
                    :aria-label="resolvedClearAriaLabel"
                    :class="iconButtonClass"
                    @click.stop="handleClear"
                >
                    <Icon name="mdi:close-circle" />
                </button>

                <!-- Open -->
                <button
                    type="button"
                    :aria-label="resolvedOpenAriaLabel"
                    :aria-expanded="isOpen"
                    :disabled
                    :class="[iconButtonClass, disabled && 'cursor-not-allowed']"
                    @click="toggle"
                >
                    <Icon name="mdi:clock-outline" />
                </button>

                <Icon v-if="hasError" name="mdi:alert-circle-outline" iconClass="text-icon-error" />
            </div>

            <!-- Time picker -->
            <Transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                leave-active-class="transition duration-100 ease-in"
                leave-to-class="opacity-0 -translate-y-1"
            >
                <div v-if="isInline || isOpen" ref="panel" :class="panelClass" @keydown.esc.stop="close">
                    <TimePicker
                        :id="isInline ? id : undefined"
                        ref="timePicker"
                        :modelValue
                        :locale
                        :hourFormat
                        :hasSeconds
                        :minuteStep
                        :secondStep
                        :min
                        :max
                        :color
                        :isRounded
                        :isBoxed="isInline ? isBoxed : true"
                        :disabled
                        :readonly
                        :ariaLabel="label ?? ariaLabel"
                        :class="isInline && hasError && '!border-border-error'"
                        @update:modelValue="handleSelect"
                    />
                </div>
            </Transition>
        </div>

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
    variant: {
        type: String as PropType<PickerVariant>,
        default: PickerVariant.INPUT,
        validator: (value: PickerVariant) => Object.values(PickerVariant).includes(value),
    },
    modelValue: {
        type: String as PropType<string | null>,
        default: null,
    },
    placeholder: String as PropType<string>,
    icon: String as PropType<string>,
    size: {
        type: String as PropType<InputSize>,
        default: InputSize.MD,
        validator: (value: InputSize) => Object.values(InputSize).includes(value),
    },
    clearable: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    pickerPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    autoFlip: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    locale: {
        type: String as PropType<string>,
        default: 'en-US',
    },
    hourFormat: {
        type: String as PropType<HourFormat>,
        validator: (value: HourFormat) => Object.values(HourFormat).includes(value),
    },
    hasSeconds: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    minuteStep: {
        type: Number as PropType<number>,
        default: 1,
    },
    secondStep: {
        type: Number as PropType<number>,
        default: 1,
    },
    min: String as PropType<string>,
    max: String as PropType<string>,
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.PRIMARY_BRAND,
    },
    isRounded: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isBoxed: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    validator: {
        type: Function as PropType<(value: unknown) => string | null>,
        default: () => null,
    },
    error: {
        type: String as PropType<string>,
        default: '',
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    readonly: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showOptionalLabel: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    optionalLabel: String as PropType<string>,
    transparent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    clearAriaLabel: String as PropType<string>,
    openAriaLabel: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue', 'update:error'])

// Composables
const validationMode = useInjectedValidationMode()
const dsConfig = useDSConfig()

// Refs
const container = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const timePicker = ref<{ focus: () => void } | null>(null)
const panel = ref<HTMLElement | null>(null)

// States
const isOpen = ref(false)
const isFocused = ref(false)

// Computed
const isInline = computed(() => props.variant === PickerVariant.INLINE)
const hasError = computed(() => props.error !== '')

const optionalLabelText = computed(() => props.optionalLabel ?? dsConfig.forms.optionalLabelText())
const resolvedPlaceholder = computed(() => props.placeholder ?? dsConfig.timePicker.placeholderText())
const resolvedClearAriaLabel = computed(() => props.clearAriaLabel ?? dsConfig.forms.clearSelectionText())
const resolvedOpenAriaLabel = computed(() => props.openAriaLabel ?? dsConfig.timePicker.openText())

const displayValue = computed(() => formatTime(props.modelValue, props.locale, props.hasSeconds, props.hourFormat))

const inputSizeClass = computed(() => {
    const sizeVariant = {
        [InputSize.MD]: 'h-[36px]',
        [InputSize.LG]: 'h-[44px]',
    }
    return sizeVariant[props.size as InputSize] || 'h-[36px]'
})

const { resolvedPosition } = useAutoFlip(
    panel,
    () => props.pickerPosition,
    () => props.autoFlip,
    isOpen,
)

const panelClass = computed(() => {
    if (isInline.value) return 'flex'

    return [
        'absolute left-0 z-50 rounded-lg shadow-lg',
        resolvedPosition.value === Position.TOP ? 'bottom-full mb-1' : 'top-full mt-1',
    ]
})

const iconButtonClass = [
    'text-icon-default',
    'hover:text-icon-neutral-subtle',
    'focus:outline-none',
    'transition-colors',
    'cursor-pointer',
    'h-[20px]',
]

// Methods
const runValidation = () => {
    if (!props.required || !props.validator) return

    emit('update:error', props.validator(props.modelValue) ?? '')
}

const open = async () => {
    if (props.disabled || props.readonly || isInline.value) return

    isOpen.value = true
    await nextTick()
    timePicker.value?.focus()
}

const close = () => {
    if (!isOpen.value) return

    isOpen.value = false
    input.value?.focus()

    if (validationMode.value === FormValidationMode.BLUR) runValidation()
}

const toggle = () => {
    if (isOpen.value) close()
    else open()
}

// Handlers
// The popup stays open after a pick, since a time takes an hour and a minute
const handleSelect = (value: string | null) => {
    emit('update:modelValue', value)
}

const handleClear = () => {
    emit('update:modelValue', null)
    input.value?.focus()
}

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault()
        open()
    } else if (event.key === 'Escape') {
        close()
    }
}

onClickOutside(container, () => {
    if (!isOpen.value) return

    isOpen.value = false
    if (validationMode.value === FormValidationMode.BLUR) runValidation()
})

// Watchers
watch(
    () => props.modelValue,
    () => {
        if (validationMode.value === FormValidationMode.BLUR) runValidation()
    },
)

defineExpose({ open, close })
</script>
