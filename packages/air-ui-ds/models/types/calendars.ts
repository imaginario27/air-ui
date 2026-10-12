// Dates are ISO strings (YYYY-MM-DD), the same format the native date input uses
export interface CalendarRange {
    start: string | null
    end: string | null
}

export interface TimeParts {
    hours: number
    minutes: number
    seconds: number
}

// A dot shown under a day, such as an event or a task. The color uses the accent tokens.
export interface CalendarMarker {
    color?: ColorAccent
    label?: string
}

// Payload of the day events: the ISO date, the key that a click would select and whether the day is disabled
export interface CalendarDayEvent {
    date: string
    key: string
    isDisabled: boolean
}

// Payload of month-change: the visible month (1-12) and the first and last day of it, as ISO dates
export interface CalendarMonthEvent {
    year: number
    month: number
    from: string
    to: string
}

// A day of the grid, with everything the template needs to show it
export interface CalendarDay {
    iso: string
    key: string
    number: number
    label: string
    isInMonth: boolean
    markers: CalendarMarker[]
    isToday: boolean
    isDisabled: boolean
    isSelected: boolean
    isInRange: boolean
    isBandStart: boolean
    isBandEnd: boolean
    hasSpan: boolean
}

// The first and last day (ISO dates) covered by a selection
export interface CalendarBand {
    from: string
    to: string
}

// A row of the grid, with its ISO week number
export interface CalendarWeek {
    number: number
    days: CalendarDay[]
}

export interface CalendarMonthCell {
    index: number
    key: string
    label: string
    isSelected: boolean
    isInRange: boolean
    isCurrent: boolean
    isDisabled: boolean
}

export interface CalendarYearCell {
    value: number
    isCurrent: boolean
    isDisabled: boolean
}

export interface CalendarPlacement {
    position: Position
    align: Align
}

export type CalendarEvent = 'update:modelValue' | 'day-click' | 'day-hover' | 'day-hover-end' | 'month-change'

export type CalendarEmit = (event: CalendarEvent, ...args: unknown[]) => void

// The props the calendar composables read
export interface CalendarProps {
    readonly modelValue: string | string[] | CalendarRange | null
    readonly mode: CalendarMode
    readonly unit: CalendarUnit
    readonly min?: string
    readonly max?: string
    readonly isDateDisabled: (date: string) => boolean
    readonly locale: string
    readonly firstDayOfWeek: number
    readonly color: ColorAccent
    readonly hasWeekNumbers: boolean
    readonly isRounded: boolean
    readonly isNavigationLocked: boolean
    readonly markers: Record<string, CalendarMarker[]>
    readonly maxMarkers: number
    readonly dayPopoverTrigger: Trigger
    readonly hasDayPopover?: (date: string) => boolean
    readonly dayPopoverPosition: Position
    readonly dayPopoverAlign?: Align
    readonly dayPopoverAutoFlip: boolean
    readonly disabled: boolean
    readonly readonly: boolean
    readonly previousMonthAriaLabel?: string
    readonly nextMonthAriaLabel?: string
    readonly previousYearAriaLabel?: string
    readonly nextYearAriaLabel?: string
}
