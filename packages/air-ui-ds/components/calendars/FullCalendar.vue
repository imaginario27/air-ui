<template>
    <div
        ref="root"
        role="group"
        :aria-label="ariaLabel"
        :class="[
            'flex flex-col',
            'w-full max-w-full',
            'rounded-lg border border-border-default bg-background-container-surface',
            'text-text-default',
            disabled && 'opacity-disabled',
        ]"
        @keydown.capture="handleKeydown"
        @keydown.esc="handleEscape"
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
            <component :is="headingTag" class="text-lg font-semibold" aria-live="polite">
                {{ monthLabel }} {{ viewYear }}
            </component>
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
                        :aria-haspopup="'dialog'"
                        :aria-expanded="moreDate === item.date"
                        @click.stop="openMore(item.date)"
                    >
                        +{{ item.count }} {{ moreLabel }}
                    </button>
                </div>

                <!-- All the events of a day -->
                <Transition
                    enter-active-class="transition duration-150 ease-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition duration-100 ease-in"
                    leave-to-class="opacity-0"
                >
                    <div
                        v-if="moreColumn(week) >= 0"
                        :ref="setMoreElement"
                        role="dialog"
                        :aria-label="moreDay?.label"
                        :class="[
                            'absolute z-50',
                            morePlacement.vertical === 'top' ? 'top-0' : 'bottom-0',
                            'min-w-56 max-h-72 overflow-y-auto',
                            'rounded-lg border border-border-default bg-background-surface p-2 shadow-lg',
                        ]"
                        :style="morePanelStyle(moreColumn(week))"
                    >
                        <slot
                            name="more-popover"
                            :date="moreDate"
                            :label="moreDay?.label"
                            :events="moreEvents"
                            :close="closeMore"
                        >
                            <div class="flex items-center justify-between gap-2 pb-1 pl-1">
                                <span class="text-sm font-semibold">{{ moreDay?.label }}</span>
                                <ActionIconButton
                                    icon="mdi:close"
                                    :size="ButtonSize.SM"
                                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                                    :ariaLabel="closeLabel"
                                    @click="closeMore"
                                />
                            </div>
                            <div class="flex flex-col gap-0.5">
                                <button
                                    v-for="(event, eventIndex) in moreEvents"
                                    :key="`${event.id ?? event.title}-${eventIndex}`"
                                    type="button"
                                    :aria-label="eventLabel(event)"
                                    :class="[eventClass(toSegment(event)), 'h-6']"
                                    @click="handleMoreEventClick(event)"
                                >
                                    <slot name="event" :event="event">
                                        <span v-if="!isBar(event)" :class="['h-2 w-2 shrink-0 rounded-full', dotClass(event)]" />
                                        <span v-if="!isBar(event) && event.time" class="shrink-0 text-text-neutral-subtle">
                                            {{ event.time }}
                                        </span>
                                        <span class="truncate">{{ event.title }}</span>
                                    </slot>
                                </button>
                            </div>
                        </slot>
                    </div>
                </Transition>
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
    getEventColor: Function as PropType<(event: FullCalendarEvent) => ColorAccent | undefined>,
    morePopoverAutoFlip: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    headingTag: {
        type: String as PropType<HeadingTag>,
        default: 'h2',
        validator: (value: string) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value),
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

// The panel with all the events of a day, opened by +N more
const moreDate = ref<string | null>(null)
const closeLabel = computed(() => dsConfig.actions.closeText())
const moreEvents = computed(() => (moreDate.value ? getDayEvents(moreDate.value) : []))
const moreDay = computed(() => visibleWeeks.value.flatMap((week) => week.days).find((day) => day.iso === moreDate.value))

const moreColumn = (week: CalendarWeek) => week.days.findIndex((day) => day.iso === moreDate.value)

// The panel starts at the column of the day. Without room it opens inwards: the last columns to the left, and the last rows upwards
const morePlacement = ref({ vertical: 'top', horizontal: 'left' })
let moreElement: HTMLElement | null = null

const setMoreElement = (element: unknown) => {
    moreElement = element as HTMLElement | null
}

const morePanelStyle = (column: number) =>
    morePlacement.value.horizontal === 'left'
        ? { left: `calc(${column} / 7 * 100%)` }
        : { right: `calc(${6 - column} / 7 * 100%)` }

// Moves the panel to the other side when it goes out of the calendar and there is more room there
const flipMore = () => {
    const container = root.value

    if (!moreElement || !container) return

    const panel = moreElement.getBoundingClientRect()
    const bounds = container.getBoundingClientRect()
    const row = moreElement.parentElement!.getBoundingClientRect()
    let { vertical, horizontal } = morePlacement.value

    if (panel.bottom > bounds.bottom && row.bottom - bounds.top > bounds.bottom - row.top) vertical = 'bottom'

    if (panel.right > bounds.right) horizontal = 'right'
    else if (panel.left < bounds.left) horizontal = 'left'

    morePlacement.value = { vertical, horizontal }
}

const isBar = (event: FullCalendarEvent) => !event.time || Boolean(event.end && event.end > event.start)

const toSegment = (event: FullCalendarEvent): FullCalendarSegment => ({
    event,
    column: 0,
    span: 1,
    lane: 0,
    isBar: isBar(event),
    continuesBefore: false,
    continuesAfter: false,
})

const openMore = (date: string) => {
    const column = visibleWeeks.value.flatMap((week) => week.days).findIndex((day) => day.iso === date) % 7

    morePlacement.value = { vertical: 'top', horizontal: column <= 4 ? 'left' : 'right' }
    moreDate.value = date

    // Measured once it renders and before the browser paints, so it never shows on the wrong side
    if (props.morePopoverAutoFlip) nextTick(flipMore)

    emit('more-click', { date, events: getDayEvents(date) } satisfies FullCalendarMoreEvent)
}

const closeMore = () => {
    moreDate.value = null
}

const handleMoreEventClick = (event: FullCalendarEvent) => {
    closeMore()
    emit('event-click', event)
}

// Escape closes the panel first, so a parent that closes on Escape stays open
const handleEscape = (event: KeyboardEvent) => {
    if (moreDate.value === null) return

    event.stopPropagation()
    closeMore()
    focus()
}

// The day of the panel may be gone when the month changes
watch([viewYear, () => viewDate.value.getMonth()], closeMore)

onClickOutside(root, closeMore)

const handleDayClick = (day: CalendarDay) => {
    if (props.disabled) return

    closeMore()
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

// The color of an event: the one from getEventColor, or its own
const resolveColor = (event: FullCalendarEvent) => props.getEventColor?.(event) ?? event.color

const dotClass = (event: FullCalendarEvent) => getMarkerColorClass(resolveColor(event))

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
              fillClasses[resolveColor(segment.event) ?? ColorAccent.PRIMARY_BRAND] ?? fillClasses[ColorAccent.PRIMARY_BRAND],
              'text-text-neutral-on-filled font-semibold hover:opacity-90',
              segment.continuesBefore ? 'rounded-l-none' : 'rounded-l ml-0.5',
              segment.continuesAfter ? 'rounded-r-none' : 'rounded-r mr-0.5',
          ]
        : ['mx-0.5 rounded hover:bg-background-neutral-hover'],
]

const eventLabel = (event: FullCalendarEvent) => (event.time ? `${event.time} ${event.title}` : event.title)

defineExpose({ focus })
</script>
