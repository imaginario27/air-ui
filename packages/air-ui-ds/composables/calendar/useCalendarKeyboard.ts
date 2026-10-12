// Arrow keys, Home / End and PageUp / PageDown move the focus between the days
export const useCalendarKeyboard = (props: CalendarProps, view: ReturnType<typeof useCalendarView>) => {
    const { viewYear, viewMonth, viewDate, focusedISO, focusDay } = view

    const handleDayKeydown = (event: KeyboardEvent) => {
        // Keys typed inside the day popover are not for the grid
        if ((event.target as HTMLElement).closest('[role="dialog"]')) return

        const current = parseISODate(focusedISO.value)
        if (!current) return

        const step = (days: number) => new Date(current.getFullYear(), current.getMonth(), current.getDate() + days)

        const targets: Record<string, () => Date> = {
            ArrowLeft: () => step(-1),
            ArrowRight: () => step(1),
            ArrowUp: () => step(-7),
            ArrowDown: () => step(7),
            Home: () => new Date(current.getFullYear(), current.getMonth(), 1),
            End: () => new Date(current.getFullYear(), current.getMonth() + 1, 0),
            PageUp: () => addMonths(current, event.shiftKey ? -12 : -1),
            PageDown: () => addMonths(current, event.shiftKey ? 12 : 1),
        }

        const target = targets[event.key]?.()
        if (!target) return

        event.preventDefault()

        // Moving to another month would navigate
        if (
            props.isNavigationLocked &&
            (target.getMonth() !== viewMonth.value || target.getFullYear() !== viewYear.value)
        ) {
            return
        }

        focusedISO.value = toISODate(target)
        viewDate.value = getMonthStart(target)
        focusDay()
    }

    return { handleDayKeydown }
}
