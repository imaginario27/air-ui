// Where the events go: each week row gets the segments of its events on lanes, and the days with more than fit
export const useFullCalendarEvents = (
    props: { events: FullCalendarEvent[]; maxEvents: number },
    weeks: Ref<CalendarWeek[]>,
) => {
    // Events with a valid start, ordered the way a day lists them: bars first, then the earliest and longest
    const normalized = computed(() =>
        props.events
            .filter((event) => parseISODate(event.start))
            .map((event) => {
                const end = event.end && event.end > event.start && parseISODate(event.end) ? event.end : event.start

                return { event, end, isBar: !event.time || end > event.start }
            })
            .sort(
                (a, b) =>
                    Number(b.isBar) - Number(a.isBar) ||
                    a.event.start.localeCompare(b.event.start) ||
                    b.end.localeCompare(a.end) ||
                    (a.event.time ?? '').localeCompare(b.event.time ?? '') ||
                    a.event.title.localeCompare(b.event.title),
            ),
    )

    const getDayEvents = (iso: string) =>
        normalized.value.filter((item) => item.event.start <= iso && item.end >= iso).map((item) => item.event)

    const layouts = computed(() =>
        weeks.value.map((week) => {
            const first = week.days[0]!.iso
            const last = week.days[6]!.iso
            const lanes: boolean[][] = []

            const segments = normalized.value
                .filter((item) => item.event.start <= last && item.end >= first)
                .map<FullCalendarSegment>((item) => {
                    const startColumn = item.event.start < first ? 0 : week.days.findIndex((day) => day.iso === item.event.start)
                    const endColumn = item.end > last ? 6 : week.days.findIndex((day) => day.iso === item.end)

                    // The first lane that is free on every column the segment covers
                    let lane = 0
                    const isTaken = (index: number) =>
                        Array.from({ length: endColumn - startColumn + 1 }, (_, offset) => startColumn + offset).some(
                            (col) => lanes[index]?.[col],
                        )
                    while (isTaken(lane)) lane++

                    lanes[lane] ??= []
                    for (let col = startColumn; col <= endColumn; col++) lanes[lane]![col] = true

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
