<template>
    <div
        ref="root"
        role="group"
        :aria-label="ariaLabel"
        :class="[
            'flex flex-col',
            'w-full max-w-full',
            'overflow-hidden',
            'rounded-lg border border-border-default bg-background-container-surface',
            'text-text-default',
            disabled && 'opacity-disabled',
        ]"
        @keydown.capture="handleKeydown"
    >
        <!-- Header -->
        <div class="flex items-center gap-2 p-3">
            <ActionButton
                :text="todayLabel"
                :size="ButtonSize.SM"
                :styleType="ButtonStyleType.NEUTRAL_OUTLINED"
                :disabled
                @click="goToday"
            />
            <div class="flex items-center gap-1">
                <ActionIconButton
                    icon="mdi:chevron-left"
                    :size="ButtonSize.SM"
                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                    :disabled
                    :ariaLabel="previousLabel"
                    @click="goPrevious"
                />
                <ActionIconButton
                    icon="mdi:chevron-right"
                    :size="ButtonSize.SM"
                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                    :disabled
                    :ariaLabel="nextLabel"
                    @click="goNext"
                />
            </div>
            <h2 class="text-lg font-semibold" aria-live="polite">{{ monthLabel }} {{ viewYear }}</h2>
        </div>

        <!-- Weekdays -->
        <div class="grid grid-cols-7 border-y border-border-default">
            <span
                v-for="weekday in weekdays"
                :key="weekday.long"
                :abbr="weekday.long"
                class="py-2 text-center text-xs font-semibold uppercase text-text-neutral-subtler"
            >
                {{ weekday.short }}
            </span>
        </div>

        <!-- Weeks -->
        <div>
            <div
                v-for="(week, weekIndex) in visibleWeeks"
                :key="weekIndex"
                class="relative grid grid-cols-7 border-b border-border-default last:border-b-0"
                :style="{ minHeight: `${2.25 + (maxEvents + 1) * 1.625}rem` }"
            >
                <!-- Days -->
                <div
                    v-for="day in week.days"
                    :key="day.iso"
                    :class="[
                        'flex justify-center pt-1',
                        'border-r border-border-default last:border-r-0',
                        'transition-colors',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-background-neutral-hover',
                    ]"
                    @click="handleDayClick(day)"
                >
                    <button
                        type="button"
                        :data-date="day.iso"
                        :disabled
                        :tabindex="day.iso === focusedISO ? 0 : -1"
                        :aria-label="day.label"
                        :aria-pressed="day.isSelected"
                        :aria-current="day.isToday ? 'date' : undefined"
                        :class="dayNumberClass(day)"
                    >
                        {{ dayNumber(day) }}
                    </button>
                </div>

                <!-- Events -->
                <div class="pointer-events-none absolute inset-x-0 top-9 grid grid-cols-7 auto-rows-[1.5rem] gap-y-0.5">
                    <button
                        v-for="segment in layouts[weekIndex]!.segments"
                        :key="`${segment.event.id ?? segment.event.title}-${segment.column}-${segment.lane}`"
                        type="button"
                        :disabled
                        :aria-label="eventLabel(segment.event)"
                        :class="eventClass(segment)"
                        :style="{ gridColumn: `${segment.column + 1} / span ${segment.span}`, gridRow: segment.lane + 1 }"
                        @click.stop="emit('event-click', segment.event)"
                    >
                        <slot name="event" :event="segment.event">
                            <span v-if="!segment.isBar" :class="['h-2 w-2 shrink-0 rounded-full', dotClass(segment.event)]" />
                            <span v-if="!segment.isBar && segment.event.time" class="shrink-0 text-text-neutral-subtle">
                                {{ segment.event.time }}
                            </span>
                            <span class="truncate">{{ segment.event.title }}</span>
                        </slot>
                    </button>

                    <button
                        v-for="item in layouts[weekIndex]!.more"
                        :key="item.date"
                        type="button"
                        :disabled
                        :class="[
                            'pointer-events-auto mx-0.5 truncate rounded px-2 text-left text-xs font-semibold',
                            'text-text-neutral-subtle hover:bg-background-neutral-hover',
                            'focus-visible:outline-none focus-visible:ring-2',
                            accent.ring,
                        ]"
                        :style="{ gridColumn: item.column + 1, gridRow: maxEvents + 1 }"
                        @click.stop="emit('more-click', { date: item.date, events: getDayEvents(item.date) })"
                    >
                        +{{ item.count }} {{ moreLabel }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    modelValue: {
        type: String as PropType<string | null>,
        default: null,
    },
    events: {
        type: Array as PropType<FullCalendarEvent[]>,
        default: () => [],
    },
    maxEvents: {
        type: Number as PropType<number>,
        default: 3,
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
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    ariaLabel: String as PropType<string>,
    previousMonthAriaLabel: String as PropType<string>,
    nextMonthAriaLabel: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue', 'day-click', 'event-click', 'more-click', 'month-change'])

// States
const dsConfig = useDSConfig()
const root = ref<HTMLElement | null>(null)

// The calendar composables read a Calendar props object: this one is a single date selection of days
const calendarOptions: Record<string, unknown> = {
    mode: CalendarMode.SINGLE,
    unit: CalendarUnit.DAY,
    isDateDisabled: () => false,
    markers: {},
    isNavigationLocked: false,
    readonly: false,
}
const calendarProps = new Proxy(props, {
    get: (target, key, receiver) => (key in calendarOptions ? calendarOptions[key as string] : Reflect.get(target, key, receiver)),
}) as unknown as CalendarProps

// Logic, shared with the Calendar
const calendarEmit = emit as CalendarEmit
const selection = useCalendarSelection(calendarProps, calendarEmit)
const calendarView = useCalendarView(calendarProps, calendarEmit, root, selection)
const { handleDayKeydown } = useCalendarKeyboard(calendarProps, calendarView)

const {
    viewDate,
    viewYear,
    focusedISO,
    monthLabel,
    previousLabel,
    nextLabel,
    weekdays,
    weeks,
    goPrevious,
    goNext,
    selectDay,
    focus,
} = calendarView

const accent = computed(() => getCalendarAccent(props.color))
const todayLabel = computed(() => dsConfig.calendar.todayText())
const moreLabel = computed(() => dsConfig.calendar.moreText())

// Only the weeks that have days of the month are shown (5 or 6 rows)
const visibleWeeks = computed(() => weeks.value.filter((week) => week.days.some((day) => day.isInMonth)))

const { layouts, getDayEvents } = useFullCalendarEvents(props, visibleWeeks)

// The first day of a month is shown with its month, such as "1 Oct"
const monthDayFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { day: 'numeric', month: 'short' }))
const dayNumber = (day: CalendarDay) => (day.number === 1 ? monthDayFormatter.value.format(parseISODate(day.iso)!) : day.number)

const goToday = () => {
    const today = new Date()

    viewDate.value = getMonthStart(today)
    focusedISO.value = toISODate(today)
}

const handleDayClick = (day: CalendarDay) => {
    if (props.disabled) return

    selectDay(day)
    emit('day-click', { date: day.iso, key: day.key, isDisabled: false } satisfies CalendarDayEvent)
}

// The arrows move between days only from a day: events and buttons keep their own keys
const handleKeydown = (event: KeyboardEvent) => {
    if ((event.target as HTMLElement).dataset.date) handleDayKeydown(event)
}

// Classes
const fillClasses: Record<string, string> = {
    [ColorAccent.NEUTRAL]: 'bg-background-neutral-bold',
    [ColorAccent.SUCCESS]: 'bg-background-success-bold',
    [ColorAccent.WARNING]: 'bg-background-warning-bold',
    [ColorAccent.DANGER]: 'bg-background-danger-bold',
    [ColorAccent.INFO]: 'bg-background-info-bold',
    [ColorAccent.PRIMARY_BRAND]: 'bg-background-primary-brand-default',
    [ColorAccent.SECONDARY_BRAND]: 'bg-background-secondary-brand-default',
}

const dotClass = (event: FullCalendarEvent) => getMarkerColorClass(event.color)

const dayNumberClass = (day: CalendarDay) => [
    'flex h-7 min-w-7 items-center justify-center rounded-full px-1',
    'text-xs',
    'focus-visible:outline-none focus-visible:ring-2',
    accent.value.ring,
    props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    day.isToday && [accent.value.filled, 'font-semibold'],
    !day.isToday && day.isSelected && [accent.value.soft, 'font-semibold'],
    !day.isToday && !day.isSelected && !day.isInMonth && 'text-text-neutral-subtler',
]

const eventClass = (segment: FullCalendarSegment) => [
    'pointer-events-auto flex items-center gap-1',
    'min-w-0 px-2',
    'text-xs text-left',
    'focus-visible:outline-none focus-visible:ring-2',
    accent.value.ring,
    props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    segment.isBar
        ? [
              fillClasses[segment.event.color ?? ColorAccent.PRIMARY_BRAND] ?? fillClasses[ColorAccent.PRIMARY_BRAND],
              'text-text-neutral-on-filled font-semibold hover:opacity-90',
              segment.continuesBefore ? 'rounded-l-none' : 'rounded-l ml-0.5',
              segment.continuesAfter ? 'rounded-r-none' : 'rounded-r mr-0.5',
          ]
        : ['mx-0.5 rounded hover:bg-background-neutral-hover'],
]

const eventLabel = (event: FullCalendarEvent) => (event.time ? `${event.time} ${event.title}` : event.title)

defineExpose({ focus })
</script>
