// Height in pixels of one hour of the day and week views
export const FULL_CALENDAR_HOUR_HEIGHT = 60

const MINUTES_PER_DAY = 24 * 60
const DEFAULT_DURATION = 60

// Places the timed events of a day on the hours. Events that share hours are put side by side, in the
// same number of columns for every event of the group.
export const layoutTimedEvents = (events: FullCalendarEvent[]): FullCalendarTimedBlock[] => {
    const items = events
        .map((event) => {
            const start = toMinutes(event.time)!
            const end = toMinutes(event.endTime)

            // Without a valid end, it lasts an hour (or until midnight)
            return {
                event,
                start,
                end: end !== null && end > start ? end : Math.min(start + DEFAULT_DURATION, MINUTES_PER_DAY),
            }
        })
        .sort((a, b) => a.start - b.start || b.end - a.end)

    const blocks: FullCalendarTimedBlock[] = []
    let group: FullCalendarTimedBlock[] = []
    let columnEnds: number[] = []
    let groupEnd = 0

    const closeGroup = () => {
        group.forEach((block) => (block.columns = columnEnds.length))
        blocks.push(...group)
        group = []
        columnEnds = []
        groupEnd = 0
    }

    for (const item of items) {
        // A group ends when the next event starts after all of its events end
        if (group.length && item.start >= groupEnd) closeGroup()

        // The first column that is free when the event starts
        let column = columnEnds.findIndex((end) => end <= item.start)
        if (column === -1) column = columnEnds.length

        columnEnds[column] = item.end
        groupEnd = Math.max(groupEnd, item.end)
        group.push({ event: item.event, start: item.start, end: item.end, column, columns: 1 })
    }

    closeGroup()

    return blocks
}

// The timed events of each day of the day and week views, ready to be placed on the hour grid
export const useFullCalendarTimeGrid = (props: { events: FullCalendarEvent[] }, days: Ref<string[]>) => {
    const timedBlocks = computed<Record<string, FullCalendarTimedBlock[]>>(() => {
        const timed = normalizeFullCalendarEvents(props.events).filter((item) => !item.isBar)

        return Object.fromEntries(
            days.value.map((iso) => [
                iso,
                layoutTimedEvents(timed.filter((item) => item.event.start === iso).map((item) => item.event)),
            ]),
        )
    })

    return { timedBlocks }
}
