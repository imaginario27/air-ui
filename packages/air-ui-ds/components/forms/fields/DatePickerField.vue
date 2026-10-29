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
            <!-- Input (the panel opens below or above it) -->
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
                    ...glowClass,
                    disabled ? 'bg-background-neutral-disabled' : !transparent && 'bg-background-field',
                    disabled && 'cursor-not-allowed',
                ]"
            >
                <Icon v-if="icon" :name="icon" iconClass="text-icon-neutral-subtler" />

                <DateTimeSegments
                    v-if="isTypeable"
                    :id
                    ref="segments"
                    class="text-sm"
                    :type="segmentsType"
                    :modelValue="typeof modelValue === 'string' ? modelValue : ''"
                    :locale
                    :hourFormat
                    :hasSeconds
                    :isAllowed="isTypedValueAllowed"
                    :ariaLabel="label ?? ariaLabel"
                    :disabled
                    :readonly
                    @update:model-value="handleSegmentsInput"
                    @focus="isFocused = true"
                    @blur="isFocused = false"
                    @open="open"
                />

                <input
                    v-else
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

                <!-- Open -->
                <button
                    type="button"
                    :aria-label="resolvedOpenAriaLabel"
                    :aria-expanded="isOpen"
                    :disabled
                    :class="[iconButtonClass, disabled && 'cursor-not-allowed']"
                    @click="toggle"
                >
                    <Icon :name="pickerIcon" />
                </button>

                <Icon v-if="hasError" name="mdi:alert-circle-outline" iconClass="text-icon-error" />
            </div>

            <!-- Panel: the calendar (and the time picker for date and time) -->
            <Transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                leave-active-class="transition duration-100 ease-in"
                leave-to-class="opacity-0 -translate-y-1"
            >
                <div v-if="isInline || isOpen" ref="panel" :class="panelClass" @keydown.esc.stop="close">
                    <div :class="isDateTime ? 'flex flex-col gap-3 sm:flex-row' : 'contents'">
                        <Calendar
                            :id="isInline ? id : undefined"
                            ref="calendar"
                            v-bind="calendarProps"
                            :modelValue="calendarValue"
                            :isBoxed="isCalendarBoxed"
                            :class="isInline && !isDateTime && hasError && '!border-border-error'"
                            @update:model-value="handleCalendarSelect"
                            @day-click="emit('day-click', $event)"
                            @day-hover="emit('day-hover', $event)"
                            @day-hover-end="emit('day-hover-end')"
                            @month-change="emit('month-change', $event)"
                        >
                            <template v-if="$slots['day-popover']" #day-popover="slotProps">
                                <slot name="day-popover" v-bind="slotProps" />
                            </template>
                        </Calendar>
                        <TimePicker
                            v-if="isDateTime"
                            v-bind="timePickerProps"
                            :modelValue="timeValue"
                            :isBoxed="false"
                            class="border-t border-border-default pt-3 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0"
                            @update:model-value="handleTimeSelect"
                        />
                    </div>

                    <!-- Done: multiple and date and time have no last pick that closes the panel -->
                    <div v-if="hasDoneButton" class="flex justify-between gap-2 border-t border-border-default pt-3">
                        <ActionButton
                            v-if="hasValue"
                            :text="resolvedClearText"
                            :styleType="ButtonStyleType.DELETE_TRANSPARENT"
                            :size="ButtonSize.MD"
                            @click="handleClear"
                        />
                        <div class="ml-auto">
                            <ActionButton
                                :text="resolvedDoneText"
                                :styleType="ButtonStyleType.NEUTRAL_FILLED"
                                :size="ButtonSize.MD"
                                @click="close"
                            />
                        </div>
                    </div>
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
    type: {
        type: String as PropType<DatePickerType>,
        default: DatePickerType.DATE,
        validator: (value: DatePickerType) => Object.values(DatePickerType).includes(value),
    },
    variant: {
        type: String as PropType<PickerVariant>,
        default: PickerVariant.INPUT,
        validator: (value: PickerVariant) => Object.values(PickerVariant).includes(value),
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
    responsiveSize: {
        type: Boolean as PropType<boolean | null>,
        default: null,
    },
    displayFormat: Object as PropType<Intl.DateTimeFormatOptions>,
    hasDateTimeSegments: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
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
    autoFlip: {
        type: Boolean as PropType<boolean>,
        default: true,
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
    hasWeekNumbers: {
        type: Boolean as PropType<boolean>,
        default: false,
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
    markers: {
        type: Object as PropType<Record<string, CalendarMarker[]>>,
        default: () => ({}),
    },
    maxMarkers: {
        type: Number as PropType<number>,
        default: 3,
    },
    dayPopoverTrigger: {
        type: String as PropType<Trigger>,
        default: Trigger.MANUAL,
        validator: (value: Trigger) => Object.values(Trigger).includes(value),
    },
    hasDayPopover: Function as PropType<(date: string) => boolean>,
    dayPopoverPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    dayPopoverAlign: {
        type: String as PropType<Align>,
        validator: (value: Align) => Object.values(Align).includes(value),
    },
    dayPopoverAutoFlip: {
        type: Boolean as PropType<boolean>,
        default: true,
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
    doneText: String as PropType<string>,
    clearText: String as PropType<string>,
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
const emit = defineEmits([
    'update:modelValue',
    'update:error',
    'day-click',
    'day-hover',
    'day-hover-end',
    'month-change',
])

// Composables
const validationMode = useInjectedValidationMode()
const dsConfig = useDSConfig()

// Refs
const container = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const segments = ref<{ focus: () => void } | null>(null)
const calendar = ref<{ focus: () => void } | null>(null)
const panel = ref<HTMLElement | null>(null)

// States
const isOpen = ref(false)
const isFocused = ref(false)

// Type
const isInline = computed(() => props.variant === PickerVariant.INLINE)
const isDateTime = computed(() => props.type === DatePickerType.DATETIME_LOCAL)

// The type decides what each selection covers, and the mode how many can be picked. Date and time takes one.
const calendarUnit = computed(() => {
    const unitVariant = {
        [DatePickerType.DATE]: CalendarUnit.DAY,
        [DatePickerType.MONTH]: CalendarUnit.MONTH,
        [DatePickerType.WEEK]: CalendarUnit.WEEK,
        [DatePickerType.DATETIME_LOCAL]: CalendarUnit.DAY,
    }

    return unitVariant[props.type as DatePickerType] ?? CalendarUnit.DAY
})

const calendarMode = computed(() => (isDateTime.value ? CalendarMode.SINGLE : props.mode))

const isTypeable = computed(
    () => props.hasDateTimeSegments && !isInline.value && calendarMode.value === CalendarMode.SINGLE,
)
const segmentsType = computed(() => props.type as string as DateSegmentsType)

const pickerIcon = computed(() => {
    const iconVariant = {
        [DatePickerType.DATE]: 'mdi:calendar-month-outline',
        [DatePickerType.MONTH]: 'mdi:calendar-month-outline',
        [DatePickerType.WEEK]: 'mdi:calendar-week-outline',
        [DatePickerType.DATETIME_LOCAL]: 'mdi:calendar-clock-outline',
    }

    return iconVariant[props.type as DatePickerType] ?? 'mdi:calendar-month-outline'
})

// Computed
const hasError = computed(() => props.error !== '')

// Glow
const { glowClass } = useFieldGlow(props, hasError)

const optionalLabelText = computed(() => props.optionalLabel ?? dsConfig.forms.optionalLabelText())
const resolvedClearAriaLabel = computed(() => props.clearAriaLabel ?? dsConfig.forms.clearSelectionText())
const resolvedOpenAriaLabel = computed(() => props.openAriaLabel ?? dsConfig.calendar.openText())
const resolvedDoneText = computed(() => props.doneText ?? dsConfig.calendar.doneText())
const resolvedClearText = computed(() => props.clearText ?? dsConfig.calendar.clearText())

const resolvedPlaceholder = computed(() => {
    if (props.placeholder) return props.placeholder

    const placeholderVariant = {
        [DatePickerType.DATE]: dsConfig.calendar.placeholderText(),
        [DatePickerType.MONTH]: dsConfig.calendar.monthPlaceholderText(),
        [DatePickerType.WEEK]: dsConfig.calendar.weekPlaceholderText(),
        [DatePickerType.DATETIME_LOCAL]: dsConfig.calendar.dateTimePlaceholderText(),
    }

    return placeholderVariant[props.type as DatePickerType] ?? dsConfig.calendar.placeholderText()
})

const isResponsive = computed(() => props.responsiveSize ?? dsConfig.forms.responsiveSize)

const inputSizeClass = computed(() => {
    if (isResponsive.value && props.size === InputSize.MD) return 'h-[44px] lg:h-[36px]'

    const sizeVariant = {
        [InputSize.MD]: 'h-[36px]',
        [InputSize.LG]: 'h-[44px]',
    }
    return sizeVariant[props.size as InputSize] || 'h-[36px]'
})

const { resolvedPosition } = useAutoFlip(
    panel,
    () => props.calendarPosition,
    () => props.autoFlip,
    isOpen,
)

const boxClass = 'rounded-lg border border-border-default bg-background-container-surface'

const hasDoneButton = computed(
    () => !isInline.value && (isDateTime.value || calendarMode.value === CalendarMode.MULTIPLE),
)

// Date and time and the panel with a done button share one box; otherwise the calendar is the box
const isCalendarBoxed = computed(() => {
    if (isDateTime.value || hasDoneButton.value) return false

    return isInline.value ? props.isBoxed : true
})

const panelClass = computed(() => {
    if (isInline.value) {
        return isDateTime.value
            ? ['flex w-fit max-w-full', props.isBoxed && ['p-3', boxClass], hasError.value && '!border-border-error']
            : 'flex'
    }

    return [
        'absolute left-0 z-50 rounded-lg shadow-lg',
        resolvedPosition.value === Position.TOP ? 'bottom-full mb-1' : 'top-full mt-1',
        isDateTime.value && [
            'flex max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] flex-col gap-3 overflow-y-auto p-3',
            boxClass,
        ],
        hasDoneButton.value && !isDateTime.value && ['flex flex-col gap-3 p-3', boxClass],
    ]
})

// Date and time values are YYYY-MM-DDTHH:mm: each picker gets its half
const dateTimeParts = computed(() => splitDateTime(typeof props.modelValue === 'string' ? props.modelValue : null))
const dateTimeBounds = computed(() => ({ min: splitDateTime(props.min), max: splitDateTime(props.max) }))

const calendarValue = computed(() => (isDateTime.value ? dateTimeParts.value.date : props.modelValue))
const timeValue = computed(() => dateTimeParts.value.time)

const calendarProps = computed(() => ({
    mode: calendarMode.value,
    unit: calendarUnit.value,
    min: isDateTime.value ? (dateTimeBounds.value.min.date ?? undefined) : props.min,
    max: isDateTime.value ? (dateTimeBounds.value.max.date ?? undefined) : props.max,
    isDateDisabled: props.isDateDisabled,
    locale: props.locale,
    firstDayOfWeek: props.firstDayOfWeek,
    color: props.color,
    hasYearControls: props.hasYearControls,
    hasOutsideDays: props.hasOutsideDays,
    hasWeekNumbers: props.hasWeekNumbers || props.type === DatePickerType.WEEK,
    isRounded: props.isRounded,
    isNavigationLocked: props.isNavigationLocked,
    markers: props.markers,
    maxMarkers: props.maxMarkers,
    dayPopoverTrigger: props.dayPopoverTrigger,
    hasDayPopover: props.hasDayPopover,
    dayPopoverPosition: props.dayPopoverPosition,
    dayPopoverAlign: props.dayPopoverAlign,
    dayPopoverAutoFlip: props.dayPopoverAutoFlip,
    disabled: props.disabled,
    readonly: props.readonly,
    ariaLabel: props.label ?? props.ariaLabel,
}))

// The time limits only apply on the day of the date limit
const timePickerProps = computed(() => {
    const { date } = dateTimeParts.value
    const { min, max } = dateTimeBounds.value

    return {
        locale: props.locale,
        hourFormat: props.hourFormat,
        hasSeconds: props.hasSeconds,
        minuteStep: props.minuteStep,
        secondStep: props.secondStep,
        min: date && date === min.date ? (min.time ?? undefined) : undefined,
        max: date && date === max.date ? (max.time ?? undefined) : undefined,
        color: props.color,
        isRounded: props.isRounded,
        disabled: props.disabled,
        readonly: props.readonly,
        ariaLabel: props.label ?? props.ariaLabel,
    }
})

const rangeValue = computed<CalendarRange>(() => {
    const value = props.modelValue
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        return { start: value.start ?? null, end: value.end ?? null }
    }

    return { start: null, end: null }
})

const selectedDates = computed<string[]>(() => {
    const value = props.modelValue

    if (calendarMode.value === CalendarMode.RANGE) {
        return [rangeValue.value.start, rangeValue.value.end].filter(Boolean) as string[]
    }
    if (Array.isArray(value)) return value

    return typeof value === 'string' && value ? [value] : []
})

const hasValue = computed(() => selectedDates.value.length > 0)

const formatMonth = (value: string | null) => {
    const month = parseISOMonth(value)
    const options = props.displayFormat ?? { month: 'long', year: 'numeric' }

    return month ? new Intl.DateTimeFormat(props.locale, options).format(month) : ''
}

const formatWeek = (value: string | null) => {
    const monday = parseISOWeek(value)
    if (!monday) return ''

    const { year, week } = getISOWeek(monday)

    return `${dsConfig.calendar.weekText()} ${week}, ${year}`
}

// Each key is written for what it covers: a date, a week or a month
const formatKey = (key: string | null) => {
    if (props.type === DatePickerType.MONTH) return formatMonth(key)
    if (props.type === DatePickerType.WEEK) return formatWeek(key)

    return formatISODate(key, props.locale, props.displayFormat)
}

const formatDateTime = () => {
    const { date, time } = dateTimeParts.value
    const formattedTime = formatTime(time, props.locale, props.hasSeconds, props.hourFormat)

    return [formatISODate(date, props.locale, props.displayFormat), formattedTime].filter(Boolean).join(' ')
}

const formatKeys = () => {
    if (calendarMode.value === CalendarMode.RANGE) {
        const { start, end } = rangeValue.value
        if (!start) return ''

        return end ? `${formatKey(start)} – ${formatKey(end)}` : `${formatKey(start)} –`
    }

    return selectedDates.value.map(formatKey).join(', ')
}

const displayValue = computed(() => (isDateTime.value ? formatDateTime() : formatKeys()))

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
    if (calendarMode.value === CalendarMode.RANGE) return { start: null, end: null }

    return calendarMode.value === CalendarMode.MULTIPLE ? [] : null
}

// Picking is finished when a single date, month or week is chosen or a range has both ends.
// Multiple and date and time stay open, since they take more than one pick.
const isSelectionComplete = (value: string | string[] | CalendarRange | null) => {
    if (isDateTime.value || calendarMode.value === CalendarMode.MULTIPLE) return false
    if (calendarMode.value === CalendarMode.RANGE) return Boolean((value as CalendarRange | null)?.end)

    return true
}

const isTypedValueAllowed = (value: string) => {
    if (isDateTime.value) {
        const { date } = splitDateTime(value)

        return isWithinBounds(value, props.min, props.max) && !(date && props.isDateDisabled(date))
    }

    if (props.type === DatePickerType.DATE) {
        const isInBounds = isWithinBounds(value, toBoundISO(props.min, 'start'), toBoundISO(props.max, 'end'))

        return isInBounds && !props.isDateDisabled(value)
    }

    return isWithinBounds(value, props.min, props.max)
}

const focusField = () => (isTypeable.value ? segments.value : input.value)?.focus()

const open = async () => {
    if (props.disabled || props.readonly || isInline.value) return

    isOpen.value = true
    await nextTick()
    calendar.value?.focus()
}

const close = () => {
    if (!isOpen.value) return

    isOpen.value = false
    focusField()

    if (validationMode.value === FormValidationMode.BLUR) runValidation()
}

const toggle = () => {
    if (isOpen.value) close()
    else open()
}

// Handlers
const handleCalendarSelect = (value: string | string[] | CalendarRange | null) => {
    if (isDateTime.value) {
        // The time defaults to midnight until one is picked
        emit('update:modelValue', joinDateTime(value as string, dateTimeParts.value.time ?? '00:00'))
        return
    }

    emit('update:modelValue', value)

    if (props.closeOnSelect && isSelectionComplete(value)) close()
}

const handleTimeSelect = (time: string | null) => {
    if (!time) return

    // The date defaults to today until one is picked
    emit('update:modelValue', joinDateTime(dateTimeParts.value.date ?? toISODate(new Date()), time))
}

const handleSegmentsInput = (value: string) => {
    emit('update:modelValue', value || null)
}

const handleClear = () => {
    emit('update:modelValue', emptyValue())
    focusField()
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
