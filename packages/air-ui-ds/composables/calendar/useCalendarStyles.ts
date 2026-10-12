// Classes and texts of the cells: colors, rounding, cursors, markers
export const useCalendarStyles = (props: CalendarProps) => {
    // Navigation (arrows, year controls, month and year buttons) is off when disabled or locked
    const isNavigationDisabled = computed(() => props.disabled || props.isNavigationLocked)

    const accent = computed(() => getCalendarAccent(props.color))

    const radius = computed(() =>
        props.isRounded
            ? { all: 'rounded-full', left: 'rounded-l-full', right: 'rounded-r-full' }
            : { all: 'rounded', left: 'rounded-l', right: 'rounded-r' },
    )

    const gridColumnsClass = computed(() =>
        props.hasWeekNumbers ? 'grid-cols-[2.5rem_repeat(7,minmax(0,1fr))]' : 'grid-cols-7',
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

    // The days of a selection that spans several days (a week or a range) are joined into a band: only its ends are rounded
    const dayRadius = (day: CalendarDay) => {
        if (!day.hasSpan) return radius.value.all
        if (day.isBandStart) return radius.value.left
        if (day.isBandEnd) return radius.value.right

        return ''
    }

    const dayCursor = (day: CalendarDay) => {
        if (props.disabled) return 'cursor-not-allowed'
        // Nothing can be picked in readonly, so no day gets an interactive cursor
        if (props.readonly) return 'cursor-default'

        return day.isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
    }

    const dayClass = (day: CalendarDay) => {
        const isInteractive = !props.disabled && !props.readonly && !day.isDisabled

        return [
            'relative',
            'flex items-center justify-center',
            'w-full aspect-square',
            'text-sm',
            'transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
            accent.value.ring,
            dayRadius(day),
            dayCursor(day),
            day.isDisabled && 'text-text-neutral-disabled',
            day.isSelected && !day.isDisabled && accent.value.filled,
            day.isSelected && isInteractive && accent.value.filledHover,
            day.isInRange && accent.value.soft,
            !day.isSelected && !day.isInRange && isInteractive && 'hover:bg-background-neutral-hover',
            !day.isSelected && !day.isInMonth && !day.isDisabled && 'text-text-neutral-subtler',
            day.isToday && !day.isSelected && [accent.value.today, 'font-semibold'],
        ]
    }

    // Month and year cells
    const cellButtonClass = (isActive: boolean, isDisabled: boolean, isInRange = false) => [
        'flex items-center justify-center',
        'h-10',
        radius.value.all,
        'text-sm',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2',
        accent.value.ring,
        isDisabled ? 'cursor-not-allowed text-text-neutral-disabled' : 'cursor-pointer',
        isActive && [accent.value.filled, !isDisabled && accent.value.filledHover],
        !isActive && isInRange && accent.value.soft,
        !isActive && !isInRange && !isDisabled && 'hover:bg-background-neutral-hover',
    ]

    // Markers
    const visibleMarkers = (day: CalendarDay) => day.markers.slice(0, props.maxMarkers)

    // A marker on a selected day uses the color of the text on filled backgrounds, so it stays visible
    const markerClass = (marker: CalendarMarker, day: CalendarDay) =>
        day.isSelected && !day.isDisabled ? 'bg-text-neutral-on-filled' : getMarkerColorClass(marker.color)

    const dayLabel = (day: CalendarDay) => {
        const labels = day.markers.map((marker) => marker.label).filter(Boolean)

        return labels.length ? `${day.label}, ${labels.join(', ')}` : day.label
    }

    return {
        isNavigationDisabled,
        gridColumnsClass,
        headerButtonClass,
        dayClass,
        cellButtonClass,
        visibleMarkers,
        markerClass,
        dayLabel,
    }
}
