<template>
    <div
        ref="root"
        role="group"
        :aria-label="ariaLabel"
        :class="[
            'relative flex flex-col',
            'w-full max-w-full',
            isBoxed && 'rounded-lg border border-border-default bg-background-container-surface',
            'text-text-default',
            disabled && 'opacity-disabled',
        ]"
        @keydown.capture="handleKeydown"
        @keydown.esc="handleEscape"
    >
        <!-- Header -->
        <div class="flex flex-wrap items-center gap-2 p-3">
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
                    :ariaLabel="previousButtonLabel"
                    @click="goPreviousPeriod"
                />
                <ActionIconButton
                    icon="mdi:chevron-right"
                    :size="ButtonSize.SM"
                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                    :disabled
                    :ariaLabel="nextButtonLabel"
                    @click="goNextPeriod"
                />
            </div>
            <component :is="headingTag" class="text-lg font-semibold" aria-live="polite">
                {{ title }}
            </component>

            <!-- View -->
            <div v-if="availableViews.length > 1" class="ml-auto">
                <DropdownMenu :disabled dropdownClass="min-w-48">
                    <template #activator>
                        <ActionButton
                            :text="viewLabels[activeView]"
                            icon="mdi:menu-down"
                            :iconPosition="IconPosition.RIGHT"
                            :size="ButtonSize.SM"
                            :styleType="ButtonStyleType.NEUTRAL_OUTLINED"
                            :disabled
                        />
                    </template>
                    <template #items="{ onClose }">
                        <DropdownMenuContextItem
                            v-for="item in viewItems"
                            :key="item.value"
                            :actionType="DropdownActionType.ACTION"
                            :type="DropdownItemType.TEXT"
                            :text="item.text"
                            :kbd="item.kbd"
                            :class="item.value === activeView && 'font-semibold'"
                            @click="setView(item.value)"
                            @close="onClose"
                        />
                    </template>
                </DropdownMenu>
            </div>
        </div>

        <!-- Month -->
        <template v-if="activeView === FullCalendarView.MONTH">
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
            <div data-test="full-calendar-month">
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
                            'border-r border-border-default [&:nth-child(7)]:border-r-0',
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
                    <div
                        class="pointer-events-none absolute inset-x-0 top-9 grid grid-cols-7 auto-rows-[1.5rem] gap-y-0.5"
                    >
                        <button
                            v-for="segment in layouts[weekIndex]!.segments"
                            :key="`${segment.event.id ?? segment.event.title}-${segment.column}-${segment.lane}`"
                            type="button"
                            :disabled
                            :aria-label="eventLabel(segment.event)"
                            :class="eventClass(segment)"
                            :style="{
                                gridColumn: `${segment.column + 1} / span ${segment.span}`,
                                gridRow: segment.lane + 1,
                            }"
                            @click.stop="handleEventClick(segment.event, $event.currentTarget as HTMLElement)"
                        >
                            <slot name="event" :event="segment.event">
                                <span
                                    v-if="!segment.isBar"
                                    :class="['h-2 w-2 shrink-0 rounded-full', dotClass(segment.event)]"
                                />
                                <span
                                    v-if="!segment.isBar && segment.event.time"
                                    class="shrink-0 text-text-neutral-subtle"
                                >
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
                        enter-from-class="opacity-0 scale-95"
                        leave-active-class="transition duration-100 ease-in"
                        leave-to-class="opacity-0 scale-95"
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
                                        @click="handleMoreEventClick(event, $event.currentTarget as HTMLElement)"
                                    >
                                        <slot name="event" :event="event">
                                            <span
                                                v-if="!isFullCalendarBar(event)"
                                                :class="['h-2 w-2 shrink-0 rounded-full', dotClass(event)]"
                                            />
                                            <span
                                                v-if="!isFullCalendarBar(event) && event.time"
                                                class="shrink-0 text-text-neutral-subtle"
                                            >
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
        </template>

        <!-- Day and week -->
        <FullCalendarTimeGrid
            v-else-if="isTimeGrid"
            class="border-t border-border-default"
            :days="gridDays"
            :events
            :selectedDate="modelValue"
            :locale
            :color
            :getEventColor
            :maxHeight="timeGridMaxHeight"
            :hourFormat
            :headerClass="timeGridHeaderClass"
            :disabled
            @day-click="openDay"
            @event-click="handleEventClick"
            @slot-click="handleSlotClick"
        >
            <template v-if="$slots.event" #event="slotProps">
                <slot name="event" v-bind="slotProps" />
            </template>
        </FullCalendarTimeGrid>

        <!-- Year -->
        <FullCalendarYearView
            v-else-if="activeView === FullCalendarView.YEAR"
            class="border-t border-border-default"
            :year="viewYear"
            :selectedDate="modelValue"
            :locale
            :firstDayOfWeek="selection.firstDay.value"
            :color
            :disabled
            @day-click="openDay"
            @month-click="openMonth"
        />

        <!-- Agenda -->
        <FullCalendarAgendaView
            v-else
            class="border-t border-border-default"
            :from="focusedISO"
            :days="agendaDays"
            :events
            :locale
            :color
            :getEventColor
            :disabled
            @day-click="openDay"
            @event-click="handleEventClick"
        >
            <template v-if="$slots.event" #event="slotProps">
                <slot name="event" v-bind="slotProps" />
            </template>
        </FullCalendarAgendaView>

        <!-- Event -->
        <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 scale-95"
            leave-active-class="transition duration-100 ease-in"
            leave-to-class="opacity-0 scale-95"
        >
            <FullCalendarEventPopover
                v-if="eventPopover"
                :event="eventPopover.event"
                :anchor="eventPopover.anchor"
                :locale
                :color
                :getEventColor
                :isEditable
                :isDeletable
                @close="closeEventPopover"
                @edit="handleEventEdit"
                @delete="handleEventDelete"
            >
                <template v-if="$slots['event-popover']" #default="slotProps">
                    <slot name="event-popover" v-bind="slotProps" />
                </template>
            </FullCalendarEventPopover>
        </Transition>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    modelValue: {
        type: String as PropType<string | null>,
        default: null,
    },
    view: {
        type: String as PropType<FullCalendarView>,
        default: FullCalendarView.MONTH,
        validator: (value: FullCalendarView) => Object.values(FullCalendarView).includes(value),
    },
    views: {
        type: Array as PropType<FullCalendarView[]>,
        default: () => Object.values(FullCalendarView),
    },
    events: {
        type: Array as PropType<FullCalendarEvent[]>,
        default: () => [],
    },
    maxEvents: {
        type: Number as PropType<number>,
        default: 3,
    },
    agendaDays: {
        type: Number as PropType<number>,
        default: 30,
        validator: (value: number) => Number.isInteger(value) && value >= 1,
    },
    timeGridMaxHeight: {
        type: String as PropType<string>,
        default: '40rem',
    },
    hourFormat: {
        type: String as PropType<HourFormat>,
        default: HourFormat.HOURS_24,
        validator: (value: HourFormat) => Object.values(HourFormat).includes(value),
    },
    timeGridHeaderClass: {
        type: String as PropType<string>,
        default: 'bg-background-container-surface',
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
    hasEventPopover: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    isAddable: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isEditable: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isDeletable: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    headingTag: {
        type: String as PropType<HeadingTag>,
        default: 'h2',
        validator: (value: string) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value),
    },
    isBoxed: {
        type: Boolean as PropType<boolean>,
        default: true,
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
const emit = defineEmits([
    'update:modelValue',
    'update:view',
    'day-click',
    'event-click',
    'event-add',
    'event-edit',
    'event-delete',
    'more-click',
    'slot-click',
    'month-change',
    'range-change',
])

// States
const dsConfig = useDSConfig()
const root = ref<HTMLElement | null>(null)
const activeView = ref(props.view)

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
    get: (target, key, receiver) =>
        key in calendarOptions ? calendarOptions[key as string] : Reflect.get(target, key, receiver),
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

const { accent, dotClass, eventClass, eventLabel } = useFullCalendarEventStyles(props)
const todayLabel = computed(() => dsConfig.calendar.todayText())
const moreLabel = computed(() => dsConfig.calendar.moreText())

// Only the weeks that have days of the month are shown (5 or 6 rows)
const visibleWeeks = computed(() => weeks.value.filter((week) => week.days.some((day) => day.isInMonth)))

const { layouts, getDayEvents } = useFullCalendarEvents(props, visibleWeeks)

// Views
const shortcuts: Record<string, FullCalendarView> = {
    d: FullCalendarView.DAY,
    w: FullCalendarView.WEEK,
    m: FullCalendarView.MONTH,
    y: FullCalendarView.YEAR,
    a: FullCalendarView.AGENDA,
}

const availableViews = computed(() => Object.values(FullCalendarView).filter((view) => props.views.includes(view)))

const viewLabels = computed<Record<FullCalendarView, string>>(() => ({
    [FullCalendarView.DAY]: dsConfig.calendar.dayText(),
    [FullCalendarView.WEEK]: dsConfig.calendar.weekText(),
    [FullCalendarView.MONTH]: dsConfig.calendar.monthText(),
    [FullCalendarView.YEAR]: dsConfig.calendar.yearText(),
    [FullCalendarView.AGENDA]: dsConfig.calendar.agendaText(),
}))

const viewItems = computed(() =>
    availableViews.value.map((value) => ({
        value,
        text: viewLabels.value[value],
        kbd: Object.keys(shortcuts)
            .find((key) => shortcuts[key] === value)!
            .toUpperCase(),
    })),
)

const isTimeGrid = computed(() => [FullCalendarView.DAY, FullCalendarView.WEEK].includes(activeView.value))

const setView = (view: FullCalendarView) => {
    if (!availableViews.value.includes(view) || view === activeView.value) return

    closeMore()
    closeEventPopover()
    activeView.value = view
    emit('update:view', view)
}

watch(
    () => props.view,
    (view) => {
        if (view !== activeView.value) {
            closeMore()
            activeView.value = view
        }
    },
)

// Dates: every view shows the focused day, so changing the view keeps the date
const focusedDate = computed(() => parseISODate(focusedISO.value) ?? new Date())

const setDate = (date: Date) => {
    viewDate.value = getMonthStart(date)
    focusedISO.value = toISODate(date)
}

const weekStart = computed(() =>
    addDays(focusedDate.value, -((focusedDate.value.getDay() - selection.firstDay.value + 7) % 7)),
)

// The days of the columns of the day and week views
const gridDays = computed(() =>
    activeView.value === FullCalendarView.DAY
        ? [focusedISO.value]
        : Array.from({ length: 7 }, (_, index) => toISODate(addDays(weekStart.value, index))),
)

// The first and last day that the view shows
const range = computed(() => {
    const focused = focusedDate.value
    const viewRanges: Record<FullCalendarView, [Date, Date]> = {
        [FullCalendarView.DAY]: [focused, focused],
        [FullCalendarView.WEEK]: [weekStart.value, addDays(weekStart.value, 6)],
        [FullCalendarView.MONTH]: [
            parseISODate(visibleWeeks.value[0]!.days[0]!.iso)!,
            parseISODate(visibleWeeks.value.at(-1)!.days[6]!.iso)!,
        ],
        [FullCalendarView.YEAR]: [new Date(viewYear.value, 0, 1), new Date(viewYear.value, 11, 31)],
        [FullCalendarView.AGENDA]: [focused, addDays(focused, props.agendaDays - 1)],
    }
    const [from, to] = viewRanges[activeView.value]

    return { from: toISODate(from), to: toISODate(to) }
})

watch([activeView, () => range.value.from, () => range.value.to], ([view, from, to]) => {
    closeEventPopover()
    emit('range-change', { view, from, to } satisfies FullCalendarRangeEvent)
})

const titleFormatter = computed(
    () => new Intl.DateTimeFormat(props.locale, { day: 'numeric', month: 'short', year: 'numeric' }),
)
const dayTitleFormatter = computed(
    () => new Intl.DateTimeFormat(props.locale, { day: 'numeric', month: 'long', year: 'numeric' }),
)

const title = computed(() => {
    const { from, to } = range.value

    if (activeView.value === FullCalendarView.DAY) return dayTitleFormatter.value.format(focusedDate.value)
    if (activeView.value === FullCalendarView.MONTH) return `${monthLabel.value} ${viewYear.value}`
    if (activeView.value === FullCalendarView.YEAR) return String(viewYear.value)

    return titleFormatter.value.formatRange(parseISODate(from)!, parseISODate(to)!)
})

// Navigation: each view moves by what it shows
const isMonthView = computed(() => activeView.value === FullCalendarView.MONTH)
const previousButtonLabel = computed(() => (isMonthView.value ? previousLabel.value : dsConfig.calendar.previousText()))
const nextButtonLabel = computed(() => (isMonthView.value ? nextLabel.value : dsConfig.calendar.nextText()))

const shiftPeriod = (direction: 1 | -1) => {
    const steps: Record<FullCalendarView, () => Date> = {
        [FullCalendarView.DAY]: () => addDays(focusedDate.value, direction),
        [FullCalendarView.WEEK]: () => addDays(focusedDate.value, direction * 7),
        [FullCalendarView.MONTH]: () => addMonths(focusedDate.value, direction),
        [FullCalendarView.YEAR]: () => addMonths(focusedDate.value, direction * 12),
        [FullCalendarView.AGENDA]: () => addDays(focusedDate.value, direction * props.agendaDays),
    }

    setDate(steps[activeView.value]())
}

const goPreviousPeriod = () => (isMonthView.value ? goPrevious() : shiftPeriod(-1))
const goNextPeriod = () => (isMonthView.value ? goNext() : shiftPeriod(1))

const goToday = () => setDate(new Date())

// The first day of a month is shown with its month, such as "1 Oct"
const monthDayFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { day: 'numeric', month: 'short' }))
const dayNumber = (day: CalendarDay) =>
    day.number === 1 ? monthDayFormatter.value.format(parseISODate(day.iso)!) : day.number

// The panel with all the events of a day, opened by +N more
const moreDate = ref<string | null>(null)
const closeLabel = computed(() => dsConfig.actions.closeText())
const moreEvents = computed(() => (moreDate.value ? getDayEvents(moreDate.value) : []))
const moreDay = computed(() =>
    visibleWeeks.value.flatMap((week) => week.days).find((day) => day.iso === moreDate.value),
)

const moreColumn = (week: CalendarWeek) => week.days.findIndex((day) => day.iso === moreDate.value)

// The panel is centered on the column of the day in the middle columns, and starts at it in the first ones. Without room it
// opens inwards: the last columns to the left, and the last rows upwards
const morePlacement = ref({ vertical: 'top', horizontal: 'left' })
let moreElement: HTMLElement | null = null

const setMoreElement = (element: unknown) => {
    moreElement = element as HTMLElement | null
}

const morePanelStyle = (column: number) => {
    const { horizontal } = morePlacement.value

    if (horizontal === 'center') return { left: `calc(${column + 0.5} / 7 * 100%)`, transform: 'translateX(-50%)' }

    return horizontal === 'left' ? { left: `calc(${column} / 7 * 100%)` } : { right: `calc(${6 - column} / 7 * 100%)` }
}

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

const toSegment = (event: FullCalendarEvent): FullCalendarSegment => ({
    event,
    column: 0,
    span: 1,
    lane: 0,
    isBar: isFullCalendarBar(event),
    continuesBefore: false,
    continuesAfter: false,
})

const openMore = (date: string) => {
    const column = visibleWeeks.value.flatMap((week) => week.days).findIndex((day) => day.iso === date) % 7

    morePlacement.value = {
        vertical: 'top',
        horizontal: column <= 1 ? 'left' : column <= 4 ? 'center' : 'right',
    }
    moreDate.value = date

    // Measured once it renders and before the browser paints, so it never shows on the wrong side
    if (props.morePopoverAutoFlip) nextTick(flipMore)

    emit('more-click', { date, events: getDayEvents(date) } satisfies FullCalendarMoreEvent)
}

const closeMore = () => {
    moreDate.value = null
}

const handleMoreEventClick = (event: FullCalendarEvent, target: HTMLElement) => {
    closeMore()
    handleEventClick(event, target)
}

// The popover of an event, opened by clicking it. Deleting is up to the parent: it may need a request
const eventPopover = ref<{ event: FullCalendarEvent; anchor: DOMRectLike } | null>(null)
let eventPopoverTarget: HTMLElement | null = null

type DOMRectLike = { top: number; left: number; width: number; height: number }

const handleEventClick = (event: FullCalendarEvent, target: HTMLElement) => {
    emit('event-click', event)

    if (!props.hasEventPopover || !root.value) return

    const bounds = root.value.getBoundingClientRect()
    const rect = target.getBoundingClientRect()

    closeMore()
    eventPopoverTarget = target
    eventPopover.value = {
        event,
        anchor: { top: rect.top - bounds.top, left: rect.left - bounds.left, width: rect.width, height: rect.height },
    }
}

const closeEventPopover = () => {
    eventPopover.value = null
}

const handleEventEdit = (event: FullCalendarEvent) => {
    closeEventPopover()
    emit('event-edit', event)
}

const handleEventDelete = (event: FullCalendarEvent) => {
    closeEventPopover()
    emit('event-delete', event)
}

// Escape closes the popover or the panel first, so a parent that closes on Escape stays open
const handleEscape = (event: KeyboardEvent) => {
    if (eventPopover.value) {
        event.stopPropagation()
        closeEventPopover()
        eventPopoverTarget?.focus()

        return
    }

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

    if (props.isAddable) emit('event-add', { date: day.iso } satisfies FullCalendarAddEvent)
}

// An empty hour of the day or week views
const handleSlotClick = (slot: FullCalendarSlotEvent) => {
    closeEventPopover()
    emit('slot-click', slot)

    if (props.isAddable) emit('event-add', { date: slot.date, time: slot.time } satisfies FullCalendarAddEvent)
}

// A day picked in the week, year or agenda is selected, and shown in the day view when it is available
const openDay = (iso: string) => {
    if (props.disabled) return

    selection.selectKey(iso)
    setDate(parseISODate(iso)!)
    emit('day-click', { date: iso, key: iso, isDisabled: false } satisfies CalendarDayEvent)
    setView(FullCalendarView.DAY)
}

// A month picked in the year view is shown in the month view when it is available
const openMonth = (index: number) => {
    if (props.disabled) return

    setDate(new Date(viewYear.value, index, 1))
    setView(FullCalendarView.MONTH)
}

// Keyboard: the arrows move between the days of the month, and the letters of the menu change the view
const handleKeydown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement

    if (target.dataset.date) handleDayKeydown(event)

    const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable
    if (event.ctrlKey || event.metaKey || event.altKey || isTyping) return

    const view = shortcuts[event.key.toLowerCase()]
    if (view) setView(view)
}

// Classes
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

defineExpose({ focus })
</script>
