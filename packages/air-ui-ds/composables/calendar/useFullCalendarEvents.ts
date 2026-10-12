const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/

// Minutes since midnight of an HH:mm time. Returns null when it is not a valid time.
export const toMinutes = (time?: string | null): number | null => {
    const match = TIME_PATTERN.exec(time ?? '')

    return match ? Number(match[1]) * 60 + Number(match[2]) : null
}

// The last day of an event: its own `end` when it is a later valid date, and the start otherwise
const getEventEnd = (event: FullCalendarEvent) =>
    event.end && event.end > event.start && parseISODate(event.end) ? event.end : event.start

// A bar is an event of the whole day: it has no valid time, or it lasts several days
export const isFullCalendarBar = (event: FullCalendarEvent) =>
    toMinutes(event.time) === null || getEventEnd(event) > event.start

// Events with a valid start, ordered the way a day lists them: bars first, then the earliest and longest
export const normalizeFullCalendarEvents = (events: FullCalendarEvent[]) =>
    events
        .filter((event) => parseISODate(event.start))
        .map((event) => ({ event, end: getEventEnd(event), isBar: isFullCalendarBar(event) }))
        .sort(
            (a, b) =>
                Number(b.isBar) - Number(a.isBar) ||
                a.event.start.localeCompare(b.event.start) ||
                b.end.localeCompare(a.end) ||
                (a.event.time ?? '').localeCompare(b.event.time ?? '') ||
                a.event.title.localeCompare(b.event.title),
        )

// Where the events go: each row of days gets the segments of its events on lanes, and the days with more than fit.
// With `barsOnly`, only the events of the whole day are placed (the all day row of the day and week views).
export const useFullCalendarEvents = (
    props: { events: FullCalendarEvent[]; maxEvents: number },
    weeks: Ref<CalendarWeek[]>,
    options: { barsOnly?: boolean } = {},
) => {
    const normalized = computed(() => {
        const items = normalizeFullCalendarEvents(props.events)

        return options.barsOnly ? items.filter((item) => item.isBar) : items
    })

    const getDayEvents = (iso: string) =>
        normalized.value.filter((item) => item.event.start <= iso && item.end >= iso).map((item) => item.event)

    const layouts = computed(() =>
        weeks.value.map((week) => {
            const first = week.days[0]!.iso
            const lastColumn = week.days.length - 1
            const last = week.days[lastColumn]!.iso
            const lanes: boolean[][] = []

            const segments = normalized.value
                .filter((item) => item.event.start <= last && item.end >= first)
                .map<FullCalendarSegment>((item) => {
                    const startColumn =
                        item.event.start < first ? 0 : week.days.findIndex((day) => day.iso === item.event.start)
                    const endColumn = item.end > last ? lastColumn : week.days.findIndex((day) => day.iso === item.end)

                    // The first lane that is free on every column the segment covers
                    const covered = Array.from(
                        { length: endColumn - startColumn + 1 },
                        (_, offset) => startColumn + offset,
                    )
                    let lane = 0
                    while (covered.some((col) => lanes[lane]?.[col])) lane++

                    lanes[lane] ??= []
                    covered.forEach((col) => (lanes[lane]![col] = true))

                    return {
                        event: item.event,
                        column: startColumn,
                        span: endColumn - startColumn + 1,
                        lane,
                        isBar: item.isBar,
                        continuesBefore: item.event.start < first,
                        continuesAfter: item.end > last,
                    }
                })

            const visible = segments.filter((segment) => segment.lane < props.maxEvents)

            // Days where some events did not fit
            const more = week.days
                .map((day, column) => ({
                    column,
                    date: day.iso,
                    count: segments.filter(
                        (segment) =>
                            segment.lane >= props.maxEvents &&
                            column >= segment.column &&
                            column < segment.column + segment.span,
                    ).length,
                }))
                .filter((item) => item.count > 0)

            return { segments: visible, more }
        }),
    )

    return { layouts, getDayEvents }
}
