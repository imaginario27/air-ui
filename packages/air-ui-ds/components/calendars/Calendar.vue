<template>
    <div
        ref="root"
        role="group"
        :aria-label="ariaLabel"
        :class="[
            'flex flex-col gap-3',
            'max-w-full',
            'text-text-default',
            disabled && 'opacity-disabled',
            isBoxed
                ? 'w-[19.5rem] p-3 rounded-lg border border-border-default bg-background-container-surface'
                : 'w-[18rem]',
        ]"
    >
        <!-- Header -->
        <div class="flex items-center justify-between gap-1">
            <div class="flex items-center gap-1">
                <ActionIconButton
                    v-if="hasYearControls && view === CalendarView.DAYS"
                    icon="mdi:chevron-double-left"
                    :size="ButtonSize.SM"
                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                    :disabled="isNavigationDisabled || !canGoPreviousYear"
                    :ariaLabel="previousYearLabel"
                    @click="goYear(-1)"
                />
                <ActionIconButton
                    icon="mdi:chevron-left"
                    :size="ButtonSize.SM"
                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                    :disabled="isNavigationDisabled || !canGoPrevious"
                    :ariaLabel="previousLabel"
                    @click="goPrevious"
                />
            </div>

            <div class="flex items-center gap-1">
                <template v-if="view === CalendarView.DAYS">
                    <button
                        type="button"
                        :disabled="isNavigationDisabled"
                        :class="headerButtonClass"
                        @click="view = CalendarView.MONTHS"
                    >
                        {{ monthLabel }}
                    </button>
                    <button
                        type="button"
                        :disabled="isNavigationDisabled"
                        :class="headerButtonClass"
                        @click="openYears"
                    >
                        {{ viewYear }}
                    </button>
                </template>
                <button
                    v-else-if="view === CalendarView.MONTHS"
                    type="button"
                    :disabled="isNavigationDisabled"
                    :class="headerButtonClass"
                    @click="openYears"
                >
                    {{ viewYear }}
                </button>
                <span v-else class="px-2 py-1 text-sm font-semibold">{{ yearsRangeLabel }}</span>
            </div>

            <div class="flex items-center gap-1">
                <ActionIconButton
                    icon="mdi:chevron-right"
                    :size="ButtonSize.SM"
                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                    :disabled="isNavigationDisabled || !canGoNext"
                    :ariaLabel="nextLabel"
                    @click="goNext"
                />
                <ActionIconButton
                    v-if="hasYearControls && view === CalendarView.DAYS"
                    icon="mdi:chevron-double-right"
                    :size="ButtonSize.SM"
                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                    :disabled="isNavigationDisabled || !canGoNextYear"
                    :ariaLabel="nextYearLabel"
                    @click="goYear(1)"
                />
            </div>
        </div>

        <!-- Days -->
        <div
            v-if="view === CalendarView.DAYS"
            role="grid"
            :aria-label="`${monthLabel} ${viewYear}`"
            :aria-readonly="readonly || undefined"
            @keydown="handleDayKeydown"
            @mouseleave="hoverISO = null"
        >
            <div role="row" class="grid grid-cols-7">
                <span
                    v-for="weekday in weekdays"
                    :key="weekday.long"
                    role="columnheader"
                    :abbr="weekday.long"
                    class="flex h-9 items-center justify-center text-xs font-semibold text-text-neutral-subtler"
                >
                    {{ weekday.short }}
                </span>
            </div>

            <div v-for="(week, weekIndex) in weeks" :key="weekIndex" role="row" class="grid grid-cols-7">
                <template v-for="day in week" :key="day.iso">
                    <button
                        v-if="day.isInMonth || hasOutsideDays"
                        type="button"
                        role="gridcell"
                        :data-date="day.iso"
                        :disabled
                        :tabindex="day.iso === focusedISO ? 0 : -1"
                        :aria-label="day.label"
                        :aria-selected="day.isSelected"
                        :aria-disabled="day.isDisabled || undefined"
                        :aria-current="day.isToday ? 'date' : undefined"
                        :class="dayClass(day)"
                        @click="selectDay(day)"
                        @mouseenter="handleDayHover(day)"
                    >
                        {{ day.number }}
                    </button>
                    <span v-else role="gridcell" aria-hidden="true" />
                </template>
            </div>
        </div>

        <!-- Months -->
        <div v-else-if="view === CalendarView.MONTHS" class="grid grid-cols-3 gap-1">
            <button
                v-for="month in months"
                :key="month.index"
                type="button"
                :disabled="disabled || month.isDisabled"
                :aria-current="month.isCurrent ? 'true' : undefined"
                :class="cellButtonClass(month.isCurrent, disabled || month.isDisabled)"
                @click="selectMonth(month.index)"
            >
                {{ month.label }}
            </button>
        </div>

        <!-- Years -->
        <div v-else class="grid grid-cols-3 gap-1">
            <button
                v-for="year in years"
                :key="year.value"
                type="button"
                :disabled="disabled || year.isDisabled"
                :aria-current="year.isCurrent ? 'true' : undefined"
                :class="cellButtonClass(year.isCurrent, disabled || year.isDisabled)"
                @click="selectYear(year.value)"
            >
                {{ year.value }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
interface CalendarDay {
    iso: string
    number: number
    label: string
    isInMonth: boolean
    isToday: boolean
    isDisabled: boolean
    isSelected: boolean
    isRangeStart: boolean
    isRangeEnd: boolean
    isInRange: boolean
}

const YEARS_PER_PAGE = 12

// Props
const props = defineProps({
    modelValue: {
        type: [String, Object, Array] as PropType<string | string[] | CalendarRange | null>,
        default: null,
    },
    mode: {
        type: String as PropType<CalendarMode>,
        default: CalendarMode.SINGLE,
        validator: (value: CalendarMode) => Object.values(CalendarMode).includes(value),
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
        validator: (value: number) => Number.isInteger(value) && value >= 0 && value <= 6,
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.PRIMARY_BRAND,
        validator: (value: ColorAccent) => [ColorAccent.PRIMARY_BRAND, ColorAccent.SECONDARY_BRAND].includes(value),
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
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    readonly: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    ariaLabel: String as PropType<string>,
    previousMonthAriaLabel: String as PropType<string>,
    nextMonthAriaLabel: String as PropType<string>,
    previousYearAriaLabel: String as PropType<string>,
    nextYearAriaLabel: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Composables
const dsConfig = useDSConfig()

// Refs
const root = ref<HTMLElement | null>(null)

// Navigation (arrows, year controls, month and year buttons) is off when disabled or locked
const isNavigationDisabled = computed(() => props.disabled || props.isNavigationLocked)

// Value helpers
const isRange = computed(() => props.mode === CalendarMode.RANGE)
const isMultiple = computed(() => props.mode === CalendarMode.MULTIPLE)

const singleValue = computed(() => (typeof props.modelValue === 'string' && props.modelValue ? props.modelValue : null))

const multipleValue = computed(() => (Array.isArray(props.modelValue) ? props.modelValue : []))

const rangeValue = computed<CalendarRange>(() => {
    const value = props.modelValue
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        return { start: value.start ?? null, end: value.end ?? null }
    }

    return { start: null, end: null }
})

const anchorISO = computed(() => {
    if (isRange.value) return rangeValue.value.start
    if (isMultiple.value) return multipleValue.value[0] ?? null

    return singleValue.value
})

const clampISO = (iso: string) => {
    if (props.min && iso < props.min) return props.min
    if (props.max && iso > props.max) return props.max

    return iso
}

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1)

const initialDate = parseISODate(clampISO(parseISODate(anchorISO.value) ? anchorISO.value! : toISODate(new Date())))!

// States
const view = ref<CalendarView>(CalendarView.DAYS)
const viewDate = ref(startOfMonth(initialDate))
const focusedISO = ref(toISODate(initialDate))
const hoverISO = ref<string | null>(null)
const yearsStart = ref(0)

// Computed
const todayISO = toISODate(new Date())
const viewYear = computed(() => viewDate.value.getFullYear())
const viewMonth = computed(() => viewDate.value.getMonth())

const monthFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { month: 'long' }))
const shortMonthFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { month: 'short' }))
const labelFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { dateStyle: 'full' }))

const monthLabel = computed(() => monthFormatter.value.format(viewDate.value))

const previousYearLabel = computed(() => props.previousYearAriaLabel ?? dsConfig.calendar.previousYearText())
const nextYearLabel = computed(() => props.nextYearAriaLabel ?? dsConfig.calendar.nextYearText())

const previousLabel = computed(() =>
    view.value === CalendarView.DAYS
        ? (props.previousMonthAriaLabel ?? dsConfig.calendar.previousMonthText())
        : previousYearLabel.value,
)

const nextLabel = computed(() =>
    view.value === CalendarView.DAYS
        ? (props.nextMonthAriaLabel ?? dsConfig.calendar.nextMonthText())
        : nextYearLabel.value,
)

const weekdays = computed(() => {
    const shortFormatter = new Intl.DateTimeFormat(props.locale, { weekday: 'short' })
    const longFormatter = new Intl.DateTimeFormat(props.locale, { weekday: 'long' })

    return Array.from({ length: 7 }, (_, index) => {
        // 2023-01-01 is a Sunday
        const date = new Date(2023, 0, 1 + ((props.firstDayOfWeek + index) % 7))

        return { short: shortFormatter.format(date), long: longFormatter.format(date) }
    })
})

// Range preview: while only the start is picked, the hovered day previews the range
const rangeBounds = computed(() => {
    const { start, end } = rangeValue.value
    if (!isRange.value || !start) return null

    const other = end ?? hoverISO.value ?? start

    return start <= other ? { from: start, to: other } : { from: other, to: start }
})

const isDisabled = (iso: string) =>
    Boolean((props.min && iso < props.min) || (props.max && iso > props.max) || props.isDateDisabled(iso))

const isDaySelected = (iso: string, bounds: { from: string; to: string } | null) => {
    if (isRange.value) return iso === bounds?.from || iso === bounds?.to
    if (isMultiple.value) return multipleValue.value.includes(iso)

    return iso === singleValue.value
}

const weeks = computed(() => {
    const firstOfMonth = viewDate.value
    const offset = (firstOfMonth.getDay() - props.firstDayOfWeek + 7) % 7
    const bounds = rangeBounds.value

    const days: CalendarDay[] = Array.from({ length: 42 }, (_, index) => {
        const date = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), 1 - offset + index)
        const iso = toISODate(date)

        return {
            iso,
            number: date.getDate(),
            label: labelFormatter.value.format(date),
            isInMonth: date.getMonth() === firstOfMonth.getMonth(),
            isToday: iso === todayISO,
            isDisabled: isDisabled(iso) || (props.isNavigationLocked && date.getMonth() !== firstOfMonth.getMonth()),
            isSelected: isDaySelected(iso, bounds),
            isRangeStart: iso === bounds?.from,
            isRangeEnd: iso === bounds?.to,
            isInRange: Boolean(bounds && iso > bounds.from && iso < bounds.to),
        }
    })

    return Array.from({ length: 6 }, (_, index) => days.slice(index * 7, index * 7 + 7))
})

const months = computed(() =>
    Array.from({ length: 12 }, (_, index) => {
        const first = toISODate(new Date(viewYear.value, index, 1))
        const last = toISODate(new Date(viewYear.value, index + 1, 0))

        return {
            index,
            label: shortMonthFormatter.value.format(new Date(viewYear.value, index, 1)),
            isCurrent: index === viewMonth.value,
            isDisabled: Boolean((props.min && last < props.min) || (props.max && first > props.max)),
        }
    }),
)

const years = computed(() =>
    Array.from({ length: YEARS_PER_PAGE }, (_, index) => {
        const value = yearsStart.value + index
        const first = toISODate(new Date(value, 0, 1))
        const last = toISODate(new Date(value, 11, 31))

        return {
            value,
            isCurrent: value === viewYear.value,
            isDisabled: Boolean((props.min && last < props.min) || (props.max && first > props.max)),
        }
    }),
)

const yearsRangeLabel = computed(() => `${yearsStart.value} – ${yearsStart.value + YEARS_PER_PAGE - 1}`)

// Navigation limits
const canGoPrevious = computed(() => {
    if (!props.min) return true

    if (view.value === CalendarView.DAYS) return toISODate(new Date(viewYear.value, viewMonth.value, 0)) >= props.min
    if (view.value === CalendarView.MONTHS) return toISODate(new Date(viewYear.value - 1, 11, 31)) >= props.min

    return toISODate(new Date(yearsStart.value - 1, 11, 31)) >= props.min
})

const canGoNext = computed(() => {
    if (!props.max) return true

    if (view.value === CalendarView.DAYS)
        return toISODate(new Date(viewYear.value, viewMonth.value + 1, 1)) <= props.max
    if (view.value === CalendarView.MONTHS) return toISODate(new Date(viewYear.value + 1, 0, 1)) <= props.max

    return toISODate(new Date(yearsStart.value + YEARS_PER_PAGE, 0, 1)) <= props.max
})

// Same month in the previous / next year
const canGoPreviousYear = computed(
    () => !props.min || toISODate(new Date(viewYear.value - 1, viewMonth.value + 1, 0)) >= props.min,
)

const canGoNextYear = computed(
    () => !props.max || toISODate(new Date(viewYear.value + 1, viewMonth.value, 1)) <= props.max,
)

// Classes
const accent = computed(() => {
    const variants = {
        [ColorAccent.PRIMARY_BRAND]: {
            filled: 'bg-background-primary-brand-default text-text-neutral-on-filled',
            filledHover: 'hover:bg-background-primary-brand-hover',
            soft: 'bg-background-primary-brand-soft text-text-primary-brand-on-soft-bg',
            today: 'border border-border-primary-brand-default',
            ring: 'focus-visible:ring-border-primary-brand-default',
        },
        [ColorAccent.SECONDARY_BRAND]: {
            filled: 'bg-background-secondary-brand-default text-text-neutral-on-filled',
            filledHover: 'hover:bg-background-secondary-brand-hover',
            soft: 'bg-background-secondary-brand-soft text-text-secondary-brand-on-soft-bg',
            today: 'border border-border-secondary-brand-default',
            ring: 'focus-visible:ring-border-secondary-brand-default',
        },
    }

    return variants[props.color as keyof typeof variants] ?? variants[ColorAccent.PRIMARY_BRAND]
})

const radius = computed(() =>
    props.isRounded
        ? { all: 'rounded-full', left: 'rounded-l-full', right: 'rounded-r-full' }
        : { all: 'rounded', left: 'rounded-l', right: 'rounded-r' },
)

const headerButtonClass = computed(() => [
    'px-2 py-1',
    'rounded',
    'text-sm font-semibold',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2',
    accent.value.ring,
    isNavigationDisabled.value ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-background-neutral-hover',
])

// Range days are joined into a band: only its ends are rounded
const dayRadius = (day: CalendarDay) => {
    const bounds = rangeBounds.value
    const hasSpan = isRange.value && bounds !== null && bounds.from !== bounds.to

    if (!hasSpan) return radius.value.all
    if (day.isRangeStart) return radius.value.left
    if (day.isRangeEnd) return radius.value.right

    return day.isInRange ? '' : radius.value.all
}

const dayCursor = (day: CalendarDay) => {
    if (props.disabled) return 'cursor-not-allowed'
    // Nothing can be picked in readonly, so no day gets an interactive cursor
    if (props.readonly) return 'cursor-default'

    return day.isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
}

const dayClass = (day: CalendarDay) => {
    const isEdge = day.isSelected && (!isRange.value || day.isRangeStart || day.isRangeEnd)
    const isInteractive = !props.disabled && !props.readonly && !day.isDisabled

    return [
        'flex items-center justify-center',
        'w-full aspect-square',
        'text-sm',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
        accent.value.ring,
        dayRadius(day),
        dayCursor(day),
        day.isDisabled && 'text-text-neutral-disabled',
        isEdge && !day.isDisabled && accent.value.filled,
        isEdge && isInteractive && accent.value.filledHover,
        day.isInRange && accent.value.soft,
        !isEdge && !day.isInRange && isInteractive && 'hover:bg-background-neutral-hover',
        !isEdge && !day.isInMonth && !day.isDisabled && 'text-text-neutral-subtler',
        day.isToday && !isEdge && [accent.value.today, 'font-semibold'],
    ]
}

const cellButtonClass = (isCurrent: boolean, isDisabled: boolean) => [
    'flex items-center justify-center',
    'h-10',
    radius.value.all,
    'text-sm',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2',
    accent.value.ring,
    isDisabled ? 'cursor-not-allowed text-text-neutral-disabled' : 'cursor-pointer',
    isCurrent
        ? [accent.value.filled, !isDisabled && accent.value.filledHover]
        : !isDisabled && 'hover:bg-background-neutral-hover',
]

// Methods
const focusDay = () => {
    nextTick(() => root.value?.querySelector<HTMLElement>(`[data-date="${focusedISO.value}"]`)?.focus())
}

const focus = () => {
    if (props.disabled) return

    if (view.value === CalendarView.DAYS) {
        focusDay()
        return
    }

    nextTick(() => root.value?.querySelector<HTMLElement>('button:not([disabled])')?.focus())
}

// Shows the given month and keeps the focused day in it (same day of month, clamped)
const showMonth = (year: number, month: number) => {
    const current = parseISODate(focusedISO.value) ?? viewDate.value
    const target = addMonths(current, (year - current.getFullYear()) * 12 + (month - current.getMonth()))

    viewDate.value = startOfMonth(target)
    focusedISO.value = toISODate(target)
}

const openYears = () => {
    yearsStart.value = Math.floor(viewYear.value / YEARS_PER_PAGE) * YEARS_PER_PAGE
    view.value = CalendarView.YEARS
}

// Handlers
const goPrevious = () => {
    if (view.value === CalendarView.DAYS) showMonth(viewYear.value, viewMonth.value - 1)
    else if (view.value === CalendarView.MONTHS) showMonth(viewYear.value - 1, viewMonth.value)
    else yearsStart.value -= YEARS_PER_PAGE
}

const goNext = () => {
    if (view.value === CalendarView.DAYS) showMonth(viewYear.value, viewMonth.value + 1)
    else if (view.value === CalendarView.MONTHS) showMonth(viewYear.value + 1, viewMonth.value)
    else yearsStart.value += YEARS_PER_PAGE
}

const goYear = (amount: number) => showMonth(viewYear.value + amount, viewMonth.value)

const selectMonth = (month: number) => {
    showMonth(viewYear.value, month)
    view.value = CalendarView.DAYS
}

// Picking a year goes straight back to the days of the current month
const selectYear = (year: number) => {
    showMonth(year, viewMonth.value)
    view.value = CalendarView.DAYS
}

const toggleMultiple = (iso: string) => {
    const selected = multipleValue.value
    const next = selected.includes(iso) ? selected.filter((value) => value !== iso) : [...selected, iso]

    emit('update:modelValue', next.sort())
}

const pickRangeDate = (iso: string) => {
    const { start, end } = rangeValue.value

    // First click, a new range after a complete one, or a click before the start: (re)start the range
    if (!start || end || iso < start) {
        emit('update:modelValue', { start: iso, end: null })
    } else {
        emit('update:modelValue', { start, end: iso })
    }
}

const selectDay = (day: CalendarDay) => {
    if (day.isDisabled || props.disabled || props.readonly) return

    focusedISO.value = day.iso

    if (!day.isInMonth) viewDate.value = startOfMonth(parseISODate(day.iso)!)

    if (isMultiple.value) toggleMultiple(day.iso)
    else if (isRange.value) pickRangeDate(day.iso)
    else emit('update:modelValue', day.iso)
}

// The range preview follows the pointer only while picking is possible
const handleDayHover = (day: CalendarDay) => {
    if (!props.disabled && !props.readonly) hoverISO.value = day.iso
}

const handleDayKeydown = (event: KeyboardEvent) => {
    const current = parseISODate(focusedISO.value)
    if (!current) return

    const step = (days: number) => new Date(current.getFullYear(), current.getMonth(), current.getDate() + days)

    const targets: Record<string, () => Date> = {
        ArrowLeft: () => step(-1),
        ArrowRight: () => step(1),
        ArrowUp: () => step(-7),
        ArrowDown: () => step(7),
        Home: () => new Date(current.getFullYear(), current.getMonth(), 1),
        End: () => new Date(current.getFullYear(), current.getMonth() + 1, 0),
        PageUp: () => addMonths(current, event.shiftKey ? -12 : -1),
        PageDown: () => addMonths(current, event.shiftKey ? 12 : 1),
    }

    const target = targets[event.key]?.()
    if (!target) return

    event.preventDefault()

    // Moving to another month would navigate
    if (
        props.isNavigationLocked &&
        (target.getMonth() !== viewMonth.value || target.getFullYear() !== viewYear.value)
    ) {
        return
    }

    focusedISO.value = toISODate(target)
    viewDate.value = startOfMonth(target)
    focusDay()
}

// Follow external changes of the value
watch(anchorISO, (iso) => {
    // Toggling dates in multiple mode must not move the view
    if (isMultiple.value) return

    const date = parseISODate(iso)
    if (!date || (date.getFullYear() === viewYear.value && date.getMonth() === viewMonth.value)) return

    viewDate.value = startOfMonth(date)
    focusedISO.value = iso!
})

defineExpose({ focus })
</script>
