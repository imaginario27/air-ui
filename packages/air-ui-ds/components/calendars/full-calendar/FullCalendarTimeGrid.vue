<template>
    <div ref="scroller" data-test="full-calendar-time-grid" class="overflow-y-auto" :style="{ maxHeight }">
        <!-- Header: it stays on top while the hours scroll -->
        <div :class="['sticky top-0 z-20 border-b border-border-default', headerClass]">
            <div class="grid" :style="{ gridTemplateColumns: gutterColumns }">
                <span class="flex items-end justify-end pb-2 pr-2 text-xs">
                    {{ timezoneLabel }}
                </span>
                <div class="grid" :style="{ gridTemplateColumns: dayColumns }">
                    <button
                        v-for="day in headerDays"
                        :key="day.iso"
                        type="button"
                        :disabled
                        :aria-label="day.label"
                        :aria-current="day.isToday ? 'date' : undefined"
                        :aria-pressed="day.isSelected"
                        :class="[
                            'flex flex-col items-center gap-0.5 py-2',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
                            accent.ring,
                            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                        ]"
                        @click="emit('day-click', day.iso)"
                    >
                        <span
                            :class="[
                                'text-xs font-semibold uppercase',
                                day.isToday ? 'text-text-default' : 'text-text-neutral-subtler',
                            ]"
                        >
                            {{ day.weekday }}
                        </span>
                        <span
                            :class="[
                                'flex h-9 min-w-9 items-center justify-center rounded-full text-xl',
                                day.isToday && accent.filled,
                                !day.isToday && day.isSelected && accent.soft,
                            ]"
                        >
                            {{ day.number }}
                        </span>
                    </button>
                </div>
            </div>

            <!-- All day -->
            <div
                v-if="allDaySegments.length"
                data-test="full-calendar-all-day"
                class="grid pb-1"
                :style="{ gridTemplateColumns: gutterColumns }"
            >
                <span class="pr-2 pt-1 text-right text-xs">{{ allDayLabel }}</span>
                <div
                    class="pointer-events-none grid auto-rows-[1.5rem] gap-y-0.5"
                    :style="{ gridTemplateColumns: dayColumns }"
                >
                    <button
                        v-for="segment in allDaySegments"
                        :key="`${segment.event.id ?? segment.event.title}-${segment.column}-${segment.lane}`"
                        type="button"
                        :disabled
                        :aria-label="eventLabel(segment.event)"
                        :class="eventClass(segment)"
                        :style="{
                            gridColumn: `${segment.column + 1} / span ${segment.span}`,
                            gridRow: segment.lane + 1,
                        }"
                        @click="emit('event-click', segment.event, $event.currentTarget)"
                    >
                        <slot name="event" :event="segment.event">
                            <span class="truncate">{{ segment.event.title }}</span>
                        </slot>
                    </button>
                </div>
            </div>
        </div>

        <!-- Hours -->
        <div class="flex">
            <div class="relative shrink-0" :style="{ width: gutterWidth, height: `${gridHeight}px` }">
                <span
                    v-for="hour in hours"
                    :key="hour.value"
                    class="absolute right-2 -translate-y-1/2 text-xs"
                    :style="{ top: `${hour.value * FULL_CALENDAR_HOUR_HEIGHT}px` }"
                >
                    {{ hour.label }}
                </span>
            </div>

            <div class="grid min-w-0 flex-1" :style="{ gridTemplateColumns: dayColumns }">
                <div
                    v-for="day in headerDays"
                    :key="day.iso"
                    data-test="full-calendar-day-column"
                    :class="[
                        'relative border-l border-border-default',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                    ]"
                    :style="{ height: `${gridHeight}px`, backgroundImage: hourLines }"
                    @click="handleSlotClick($event, day.iso)"
                >
                    <button
                        v-for="block in timedBlocks[day.iso]"
                        :key="`${block.event.id ?? block.event.title}-${block.start}`"
                        type="button"
                        :disabled
                        :aria-label="eventLabel(block.event)"
                        :class="[
                            'absolute overflow-hidden px-2 py-0.5',
                            'rounded text-left text-xs',
                            'border border-background-container-surface',
                            fillClass(block.event),
                            'text-text-neutral-on-filled',
                            isPastEvent(block.event) ? 'opacity-disabled' : 'hover:opacity-90',
                            'focus-visible:outline-none focus-visible:ring-2',
                            accent.ring,
                            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                        ]"
                        :style="blockStyle(block)"
                        @click.stop="emit('event-click', block.event, $event.currentTarget)"
                    >
                        <slot name="event" :event="block.event">
                            <span class="block truncate font-semibold">{{ block.event.title }}</span>
                            <span class="block truncate">{{ blockTime(block) }}</span>
                        </slot>
                    </button>

                    <!-- Current time -->
                    <div
                        v-if="day.isToday"
                        data-test="full-calendar-now"
                        aria-hidden="true"
                        class="pointer-events-none absolute inset-x-0 z-10 h-0.5 bg-background-danger-bold"
                        :style="{ top: `${nowTop}px` }"
                    >
                        <span class="absolute -left-1.5 -top-[5px] h-3 w-3 rounded-full bg-background-danger-bold" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    days: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    events: {
        type: Array as PropType<FullCalendarEvent[]>,
        default: () => [],
    },
    selectedDate: {
        type: String as PropType<string | null>,
        default: null,
    },
    locale: {
        type: String as PropType<string>,
        default: 'en-US',
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.PRIMARY_BRAND,
    },
    getEventColor: Function as PropType<(event: FullCalendarEvent) => ColorAccent | undefined>,
    maxHeight: {
        type: String as PropType<string>,
        default: '40rem',
    },
    hourFormat: {
        type: String as PropType<HourFormat>,
        default: HourFormat.HOURS_24,
    },
    headerClass: String as PropType<string>,
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['day-click', 'event-click', 'slot-click'])

// States
const dsConfig = useDSConfig()
const scroller = ref<HTMLElement | null>(null)
const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | null = null

const gutterWidth = '3.5rem'
const gridHeight = 24 * FULL_CALENDAR_HOUR_HEIGHT

const { accent, fillClass, isPastEvent, eventClass, eventLabel } = useFullCalendarEventStyles(props)

// Columns: the hours and then one per day
const gutterColumns = computed(() => `${gutterWidth} minmax(0, 1fr)`)
const dayColumns = computed(() => `repeat(${Math.max(props.days.length, 1)}, minmax(0, 1fr))`)

// Lines of the hours, drawn on the background so the day does not need 24 elements
const hourLines = `repeating-linear-gradient(to bottom, transparent 0, transparent ${FULL_CALENDAR_HOUR_HEIGHT - 1}px, var(--color-border-default) ${FULL_CALENDAR_HOUR_HEIGHT - 1}px, var(--color-border-default) ${FULL_CALENDAR_HOUR_HEIGHT}px)`

// Texts
const todayISO = computed(() => toISODate(now.value))
const allDayLabel = computed(() => dsConfig.calendar.allDayText())

const weekdayFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { weekday: 'short' }))
const labelFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { dateStyle: 'full' }))
const hourFormatter = computed(() => {
    const hasPeriod = props.hourFormat === HourFormat.HOURS_12

    return new Intl.DateTimeFormat(props.locale, {
        hour: hasPeriod ? 'numeric' : '2-digit',
        minute: '2-digit',
        hour12: hasPeriod,
    })
})

// The offset of the time zone of the browser, such as GMT+2
const timezoneLabel = computed(
    () =>
        new Intl.DateTimeFormat(props.locale, { timeZoneName: 'shortOffset' })
            .formatToParts(now.value)
            .find((part) => part.type === 'timeZoneName')?.value ?? '',
)

const headerDays = computed(() =>
    props.days.map((iso) => {
        const date = parseISODate(iso)!

        return {
            iso,
            number: date.getDate(),
            weekday: weekdayFormatter.value.format(date),
            label: labelFormatter.value.format(date),
            isToday: iso === todayISO.value,
            isSelected: iso === props.selectedDate,
        }
    }),
)

// The hours that are labeled: the first one (midnight) has no label, as the grid starts there
const hours = computed(() =>
    Array.from({ length: 23 }, (_, index) => ({
        value: index + 1,
        label: hourFormatter.value.format(new Date(2000, 0, 1, index + 1)),
    })),
)

// Events
const dayList = computed(() => props.days)
const { timedBlocks } = useFullCalendarTimeGrid(props, dayList)

// The events of the whole day, laid over the days like the bars of the month
const allDayWeeks = computed<CalendarWeek[]>(() => [
    { number: 0, days: props.days.map((iso) => ({ iso }) as CalendarDay) },
])
const allDayOptions = reactive({ events: toRef(props, 'events'), maxEvents: Number.MAX_SAFE_INTEGER })
const { layouts: allDayLayouts } = useFullCalendarEvents(allDayOptions, allDayWeeks, { barsOnly: true })
const allDaySegments = computed(() => allDayLayouts.value[0]?.segments ?? [])

const blockStyle = (block: FullCalendarTimedBlock) => {
    const hourHeight = FULL_CALENDAR_HOUR_HEIGHT / 60

    return {
        top: `${block.start * hourHeight}px`,
        // A short event keeps a height where its title can be read
        height: `${Math.max((block.end - block.start) * hourHeight, 20)}px`,
        left: `${(block.column / block.columns) * 100}%`,
        width: `${100 / block.columns}%`,
    }
}

const formatMinutes = (minutes: number) =>
    `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`

const blockTime = (block: FullCalendarTimedBlock) =>
    block.event.endTime ? `${block.event.time} – ${block.event.endTime}` : block.event.time

// The hour slot that was clicked, in steps of 30 minutes
const handleSlotClick = (event: MouseEvent, iso: string) => {
    if (props.disabled) return

    const column = event.currentTarget as HTMLElement
    const offset = (event.clientY - column.getBoundingClientRect().top) / FULL_CALENDAR_HOUR_HEIGHT
    const minutes = Math.min(Math.max(Math.floor(offset * 2) * 30, 0), 23 * 60 + 30)

    emit('slot-click', { date: iso, time: formatMinutes(minutes) } satisfies FullCalendarSlotEvent)
}

// The line of the current time moves every minute
const nowTop = computed(() => ((now.value.getHours() * 60 + now.value.getMinutes()) / 60) * FULL_CALENDAR_HOUR_HEIGHT)

onMounted(() => {
    timer = setInterval(() => {
        now.value = new Date()
    }, 60_000)

    // Starts an hour before now, or at 7:00 when today is not shown
    const startHour = props.days.includes(todayISO.value) ? Math.max(now.value.getHours() - 1, 0) : 7

    if (scroller.value) scroller.value.scrollTop = startHour * FULL_CALENDAR_HOUR_HEIGHT
})

onBeforeUnmount(() => {
    if (timer !== null) clearInterval(timer)
})
</script>
