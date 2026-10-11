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

        <!-- Inline: the calendar replaces the input -->
        <div v-if="isInline" class="flex">
            <Calendar
                :id
                v-bind="calendarProps"
                :modelValue
                :isBoxed
                :class="hasError && '!border-border-error'"
                @update:modelValue="handleSelect"
            />
        </div>

        <!-- Input + calendar popup -->
        <div
            v-else
            ref="container"
            :class="[
                'relative',
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
                (isFocused || isOpen) &&
                    'ring-2 focus-within:ring-inset focus-within:ring-border-primary-brand-default',
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
                v-if="clearable && hasValue && !disabled && !readonly"
                type="button"
                :aria-label="resolvedClearAriaLabel"
                :class="iconButtonClass"
                @click.stop="handleClear"
            >
                <Icon name="mdi:close-circle" />
            </button>

            <!-- Open calendar -->
            <button
                type="button"
                :aria-label="resolvedOpenAriaLabel"
                :aria-expanded="isOpen"
                :disabled
                :class="[iconButtonClass, disabled && 'cursor-not-allowed']"
                @click="toggle"
            >
                <Icon name="mdi:calendar-month-outline" />
            </button>

            <Icon v-if="hasError" name="mdi:alert-circle-outline" iconClass="text-icon-error" />

            <!-- Calendar -->
            <Transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                leave-active-class="transition duration-100 ease-in"
                leave-to-class="opacity-0 -translate-y-1"
            >
                <Calendar
                    v-if="isOpen"
                    ref="calendar"
                    v-bind="calendarProps"
                    :class="['absolute left-0 z-50 shadow-lg', popupPositionClass]"
                    :modelValue
                    @update:modelValue="handleSelect"
                    @keydown.esc.stop="close"
                />
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
        type: String as PropType<DatePickerVariant>,
        default: DatePickerVariant.INPUT,
        validator: (value: DatePickerVariant) => Object.values(DatePickerVariant).includes(value),
    },
    modelValue: {
        type: [String, Object, Array] as PropType<string | string[] | CalendarRange | null>,
        default: null,
    },
    mode: {
        type: String as PropType<CalendarMode>,
        default: CalendarMode.SINGLE,
        validator: (value: CalendarMode) => Object.values(CalendarMode).includes(value),
    },
    placeholder: String as PropType<string>,
    icon: String as PropType<string>,
    size: {
        type: String as PropType<InputSize>,
        default: InputSize.MD,
        validator: (value: InputSize) => Object.values(InputSize).includes(value),
    },
    displayFormat: Object as PropType<Intl.DateTimeFormatOptions>,
    closeOnSelect: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    clearable: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    calendarPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    min: String as PropType<string>,
    max: String as PropType<string>,
    isDateDisabled: {
        type: Function as PropType<(date: string) => boolean>,
        default: () => false,
    },
    locale: {
        type: String as PropType<string>,
        default: 'en-US',
    },
    firstDayOfWeek: {
        type: Number as PropType<number>,
        default: 0,
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.PRIMARY_BRAND,
    },
    hasYearControls: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasOutsideDays: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    isRounded: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isNavigationLocked: {
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
const calendar = ref<{ focus: () => void } | null>(null)

// States
const isOpen = ref(false)
const isFocused = ref(false)

// Computed
const isInline = computed(() => props.variant === DatePickerVariant.INLINE)
const hasError = computed(() => props.error !== '')

const optionalLabelText = computed(() => props.optionalLabel ?? dsConfig.forms.optionalLabelText())
const resolvedPlaceholder = computed(() => props.placeholder ?? dsConfig.calendar.placeholderText())
const resolvedClearAriaLabel = computed(() => props.clearAriaLabel ?? dsConfig.forms.clearSelectionText())
const resolvedOpenAriaLabel = computed(() => props.openAriaLabel ?? dsConfig.calendar.openText())

const inputSizeClass = computed(() => {
    const sizeVariant = {
        [InputSize.MD]: 'h-[36px]',
        [InputSize.LG]: 'h-[44px]',
    }
    return sizeVariant[props.size as InputSize] || 'h-[36px]'
})

const popupPositionClass = computed(() =>
    props.calendarPosition === Position.TOP ? 'bottom-full mb-1' : 'top-full mt-1',
)

const calendarProps = computed(() => ({
    mode: props.mode,
    min: props.min,
    max: props.max,
    isDateDisabled: props.isDateDisabled,
    locale: props.locale,
    firstDayOfWeek: props.firstDayOfWeek,
    color: props.color,
    hasYearControls: props.hasYearControls,
    hasOutsideDays: props.hasOutsideDays,
    isRounded: props.isRounded,
    isNavigationLocked: props.isNavigationLocked,
    disabled: props.disabled,
    readonly: props.readonly,
    ariaLabel: props.label ?? props.ariaLabel,
}))

const rangeValue = computed<CalendarRange>(() => {
    const value = props.modelValue
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        return { start: value.start ?? null, end: value.end ?? null }
    }

    return { start: null, end: null }
})

const selectedDates = computed<string[]>(() => {
    const value = props.modelValue

    if (props.mode === CalendarMode.RANGE)
        return [rangeValue.value.start, rangeValue.value.end].filter(Boolean) as string[]
    if (Array.isArray(value)) return value

    return typeof value === 'string' && value ? [value] : []
})

const hasValue = computed(() => selectedDates.value.length > 0)

const displayValue = computed(() => {
    const format = (iso: string | null) => formatISODate(iso, props.locale, props.displayFormat)

    if (props.mode === CalendarMode.RANGE) {
        const { start, end } = rangeValue.value
        if (!start) return ''

        return end ? `${format(start)} – ${format(end)}` : `${format(start)} –`
    }

    return selectedDates.value.map(format).join(', ')
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

const emptyValue = () => {
    if (props.mode === CalendarMode.RANGE) return { start: null, end: null }

    return props.mode === CalendarMode.MULTIPLE ? [] : null
}

// Picking is finished when a single date is chosen or a range has both ends. Multiple stays open.
const isSelectionComplete = (value: string | string[] | CalendarRange | null) => {
    if (props.mode === CalendarMode.MULTIPLE) return false
    if (props.mode === CalendarMode.RANGE) return Boolean((value as CalendarRange | null)?.end)

    return true
}

const open = async () => {
    if (props.disabled || props.readonly || isInline.value) return

    isOpen.value = true
    await nextTick()
    calendar.value?.focus()
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
const handleSelect = (value: string | string[] | CalendarRange | null) => {
    emit('update:modelValue', value)

    if (props.closeOnSelect && isSelectionComplete(value)) close()
}

const handleClear = () => {
    emit('update:modelValue', emptyValue())
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
