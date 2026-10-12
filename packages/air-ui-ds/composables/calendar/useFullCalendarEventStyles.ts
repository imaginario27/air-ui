// How an event looks in every view: its color, the dot, the bar and its label
export const useFullCalendarEventStyles = (props: {
    color: ColorAccent
    disabled: boolean
    getEventColor?: (event: FullCalendarEvent) => ColorAccent | undefined
}) => {
    const accent = computed(() => getCalendarAccent(props.color))

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

    const fillClass = (event: FullCalendarEvent) =>
        fillClasses[resolveColor(event) ?? ColorAccent.PRIMARY_BRAND] ?? fillClasses[ColorAccent.PRIMARY_BRAND]

    const dotClass = (event: FullCalendarEvent) => getMarkerColorClass(resolveColor(event))

    const eventClass = (segment: FullCalendarSegment) => [
        'pointer-events-auto flex items-center gap-1',
        'min-w-0 px-2',
        'text-xs text-left',
        'focus-visible:outline-none focus-visible:ring-2',
        accent.value.ring,
        props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        segment.isBar
            ? [
                  fillClass(segment.event),
                  'text-text-neutral-on-filled font-semibold hover:opacity-90',
                  segment.continuesBefore ? 'rounded-l-none' : 'rounded-l ml-0.5',
                  segment.continuesAfter ? 'rounded-r-none' : 'rounded-r mr-0.5',
              ]
            : ['mx-0.5 rounded hover:bg-background-neutral-hover'],
    ]

    const eventLabel = (event: FullCalendarEvent) => (event.time ? `${event.time} ${event.title}` : event.title)

    return { accent, resolveColor, fillClass, dotClass, eventClass, eventLabel }
}
