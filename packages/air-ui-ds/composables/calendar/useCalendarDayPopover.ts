import type { Slots } from 'vue'

// The panel of a day: when it opens, where it goes, how it flips and the day events
export const useCalendarDayPopover = (
    props: CalendarProps,
    emit: CalendarEmit,
    slots: Slots,
    root: Ref<HTMLElement | null>,
    view: ReturnType<typeof useCalendarView>,
    selection: ReturnType<typeof useCalendarSelection>,
) => {
    const { firstDay, isMonth, hoverKey, clearHover } = selection

    const popoverDate = ref<string | null>(null)
    const popoverPlacement = ref<CalendarPlacement>({ position: Position.BOTTOM, align: Align.CENTER })
    let popoverElement: HTMLElement | null = null
    let popoverTimer: ReturnType<typeof setTimeout> | null = null

    // It needs the slot, a trigger and, by default, a day with markers
    const canOpenPopover = (day: CalendarDay) => {
        if (!slots['day-popover'] || props.disabled || props.dayPopoverTrigger === Trigger.MANUAL) return false

        return props.hasDayPopover ? props.hasDayPopover(day.iso) : day.markers.length > 0
    }

    // Placement
    const setPopoverElement = (element: unknown) => {
        popoverElement = element as HTMLElement | null
    }

    // Without an explicit align, the cells at the edges open the popover inwards so it stays inside the calendar
    const getPopoverPlacement = (iso: string): CalendarPlacement => {
        const column = (parseISODate(iso)!.getDay() - firstDay.value + 7) % 7
        const edgeAlign = column <= 1 ? Align.LEFT : column >= 5 ? Align.RIGHT : Align.CENTER

        return { position: props.dayPopoverPosition, align: props.dayPopoverAlign ?? edgeAlign }
    }

    const popoverPlacementClass = computed(() => {
        const { position, align } = popoverPlacement.value

        const positionVariant = {
            [Position.TOP]: 'bottom-full pb-1',
            [Position.BOTTOM]: 'top-full pt-1',
        }

        const alignVariant = {
            [Align.LEFT]: 'left-0',
            [Align.CENTER]: 'left-1/2 -translate-x-1/2',
            [Align.RIGHT]: 'right-0',
        }

        return [
            positionVariant[position] ?? positionVariant[Position.BOTTOM],
            alignVariant[align] ?? alignVariant[Align.CENTER],
        ]
    })

    // Moves the popover to the other side when it does not fit in the window and there is more room there
    const flipPopover = () => {
        const cell = popoverElement?.closest('[role="presentation"]')

        if (popoverElement && cell) {
            const panel = popoverElement.getBoundingClientRect()
            const anchor = cell.getBoundingClientRect()
            const viewportWidth = document.documentElement.clientWidth || window.innerWidth
            const spaceAbove = anchor.top
            const spaceBelow = window.innerHeight - anchor.bottom
            let { position, align } = popoverPlacement.value

            if (position === Position.BOTTOM && panel.bottom > window.innerHeight && spaceAbove > spaceBelow) {
                position = Position.TOP
            } else if (position === Position.TOP && panel.top < 0 && spaceBelow > spaceAbove) {
                position = Position.BOTTOM
            }

            if (panel.right > viewportWidth) align = Align.RIGHT
            else if (panel.left < 0) align = Align.LEFT

            popoverPlacement.value = { position, align }
        }
    }

    // Open and close
    const clearPopoverTimer = () => {
        if (popoverTimer !== null) {
            globalThis.clearTimeout(popoverTimer)
            popoverTimer = null
        }
    }

    const openPopover = (iso: string) => {
        clearPopoverTimer()
        if (popoverDate.value === iso) return

        popoverPlacement.value = getPopoverPlacement(iso)
        popoverDate.value = iso

        // Measured right after it renders and before the browser paints, so it never shows on the wrong side
        if (props.dayPopoverAutoFlip) nextTick(flipPopover)
    }

    const closePopover = () => {
        clearPopoverTimer()
        popoverDate.value = null
    }

    // A short delay lets the pointer travel from the day to the popover
    const schedulePopoverClose = () => {
        clearPopoverTimer()
        popoverTimer = globalThis.setTimeout(closePopover, 150)
    }

    // Events
    const toDayEvent = (day: CalendarDay): CalendarDayEvent => ({
        date: day.iso,
        key: day.key,
        isDisabled: day.isDisabled,
    })

    // The range preview follows the pointer only while picking is possible
    const handleCellEnter = (day: CalendarDay) => {
        emit('day-hover', toDayEvent(day))

        if (!props.disabled && !props.readonly) hoverKey.value = day.key
        if (props.dayPopoverTrigger === Trigger.HOVER && canOpenPopover(day)) openPopover(day.iso)
    }

    const handleCellLeave = () => {
        if (props.dayPopoverTrigger === Trigger.HOVER && popoverDate.value !== null) schedulePopoverClose()
    }

    const handleGridLeave = () => {
        clearHover()
        emit('day-hover-end')
    }

    // Keyboard users get the popover that hover users get
    const handleCellFocus = (day: CalendarDay) => {
        if (props.dayPopoverTrigger === Trigger.HOVER && canOpenPopover(day)) openPopover(day.iso)
    }

    const handleCellBlur = (event: FocusEvent) => {
        if (props.dayPopoverTrigger !== Trigger.HOVER) return

        const cell = event.currentTarget as HTMLElement
        if (!cell.contains(event.relatedTarget as Node | null)) schedulePopoverClose()
    }

    const handleDayClick = (day: CalendarDay) => {
        emit('day-click', toDayEvent(day))

        if (props.dayPopoverTrigger === Trigger.CLICK) {
            if (!canOpenPopover(day) || popoverDate.value === day.iso) closePopover()
            else openPopover(day.iso)
        }

        view.selectDay(day)
    }

    // Escape closes the popover first, so a parent that closes on Escape stays open
    const handleEscape = (event: KeyboardEvent) => {
        if (popoverDate.value === null) return

        event.stopPropagation()
        view.focusedISO.value = popoverDate.value
        closePopover()
        view.focusDay()
    }

    const handleMonthHover = (month: Pick<CalendarMonthCell, 'key'>) => {
        if (isMonth.value && !props.disabled && !props.readonly) hoverKey.value = month.key
    }

    // The day of the popover may be gone when the month or the view changes
    watch([view.viewYear, view.viewMonth, view.view], closePopover)

    onClickOutside(root, () => {
        if (popoverDate.value !== null) closePopover()
    })

    onBeforeUnmount(clearPopoverTimer)

    return {
        popoverDate,
        popoverPlacementClass,
        canOpenPopover,
        setPopoverElement,
        closePopover,
        handleCellEnter,
        handleCellLeave,
        handleCellFocus,
        handleCellBlur,
        handleGridLeave,
        handleDayClick,
        handleEscape,
        handleMonthHover,
    }
}
