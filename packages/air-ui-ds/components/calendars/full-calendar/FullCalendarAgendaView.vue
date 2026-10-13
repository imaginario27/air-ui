<template>
    <div data-test="full-calendar-agenda">
        <p v-if="!groups.length" class="p-8 text-center text-sm text-text-neutral-subtle">{{ noEventsLabel }}</p>

        <div
            v-for="group in groups"
            :key="group.iso"
            data-test="full-calendar-agenda-day"
            class="flex gap-2 border-b border-border-default px-3 py-2 last:border-b-0"
        >
            <button
                type="button"
                :disabled
                :aria-label="group.label"
                :class="[
                    'flex h-9 w-20 shrink-0 items-center gap-2 self-start rounded-full px-1 sm:w-28',
                    'focus-visible:outline-none focus-visible:ring-2',
                    accent.ring,
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                ]"
                @click="emit('day-click', group.iso)"
            >
                <span
                    :class="[
                        'flex h-8 min-w-8 items-center justify-center rounded-full text-lg',
                        group.isToday && accent.filled,
                    ]"
                >
                    {{ group.number }}
                </span>
                <span class="text-xs font-semibold uppercase text-text-neutral-subtle">{{ group.shortLabel }}</span>
            </button>

            <div class="flex min-w-0 flex-1 flex-col">
                <button
                    v-for="(item, index) in group.events"
                    :key="`${item.event.id ?? item.event.title}-${index}`"
                    type="button"
                    :disabled
                    :aria-label="`${item.time} ${item.event.title}`"
                    :class="[
                        'flex items-center gap-4 rounded px-2 py-1.5 text-left text-sm',
                        'focus-visible:outline-none focus-visible:ring-2',
                        accent.ring,
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-background-neutral-hover',
                        isPastEvent(item.event) && 'opacity-disabled',
                    ]"
                    @click="emit('event-click', item.event, $event.currentTarget)"
                >
                    <slot name="event" :event="item.event">
                        <!-- On small screens the title goes below the time, so it has room -->
                        <div
                            class="grid min-w-0 flex-1 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-0.5 sm:flex sm:gap-4"
                        >
                            <span :class="['h-3 w-3 shrink-0 rounded-full', dotClass(item.event)]" />
                            <span class="text-text-neutral-subtle sm:w-32 sm:shrink-0">{{ item.time }}</span>
                            <span class="col-start-2 min-w-0 font-semibold sm:col-auto sm:truncate">
                                {{ item.event.title }}
                            </span>
                        </div>
                    </slot>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    from: {
        type: String as PropType<string>,
        required: true,
    },
    days: {
        type: Number as PropType<number>,
        default: 30,
    },
    events: {
        type: Array as PropType<FullCalendarEvent[]>,
        default: () => [],
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
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['day-click', 'event-click'])

// States
const dsConfig = useDSConfig()
const { accent, dotClass, isPastEvent } = useFullCalendarEventStyles(props)

const noEventsLabel = computed(() => dsConfig.calendar.noEventsText())
const todayISO = toISODate(new Date())

const labelFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { dateStyle: 'full' }))
const shortLabelFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { month: 'short', weekday: 'short' }))

// "All day", or the time of the event, with its end when it has one
const getTime = (event: FullCalendarEvent) => {
    if (isFullCalendarBar(event)) return dsConfig.calendar.allDayText()

    return event.endTime ? `${event.time} – ${event.endTime}` : (event.time ?? '')
}

// The days of the range that have events, each with the events that cover it
const groups = computed(() => {
    const start = parseISODate(props.from)
    if (!start) return []

    const events = normalizeFullCalendarEvents(props.events)

    return Array.from({ length: props.days }, (_, index) => addDays(start, index))
        .map((date) => {
            const iso = toISODate(date)

            return {
                iso,
                number: date.getDate(),
                label: labelFormatter.value.format(date),
                shortLabel: shortLabelFormatter.value.format(date),
                isToday: iso === todayISO,
                events: events
                    .filter((item) => item.event.start <= iso && item.end >= iso)
                    .map((item) => ({ event: item.event, time: getTime(item.event) })),
            }
        })
        .filter((group) => group.events.length > 0)
})
</script>
