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

// An event of the full calendar. Dates are ISO strings; `end` is the last day (inclusive) of a multi-day event.
// An event with a `time` (HH:mm) on a single day is shown as a dot in the month, and as a block of the hour grid in the
// day and week (from `time` to `endTime`, one hour long without it). Any other event is a bar (all day).
export interface FullCalendarEvent {
    id?: string
    title: string
    start: string
    end?: string
    time?: string
    endTime?: string
    color?: ColorAccent
    // Anything else you need back in the event handlers and slots, such as a category or an id from your API
    meta?: Record<string, unknown>
}

// Payload of range-change: the view and the first and last day (ISO dates) it shows
export interface FullCalendarRangeEvent {
    view: FullCalendarView
    from: string
    to: string
}

// Payload of slot-click: the day and the time (HH:mm, in steps of 30 minutes) of the hour slot that was clicked
export interface FullCalendarSlotEvent {
    date: string
    time: string
}

// Payload of event-add: the day (and the time, in the day and week views) of the cell that was clicked
export interface FullCalendarAddEvent {
    date: string
    time?: string
}

// A timed event placed on the hour grid of a day. Times are minutes since midnight, and the event is
// the `column` (0-based) of `columns` that share the same hours.
export interface FullCalendarTimedBlock {
    event: FullCalendarEvent
    start: number
    end: number
    column: number
    columns: number
}

// Payload of more-click: the day and all of its events
export interface FullCalendarMoreEvent {
    date: string
    events: FullCalendarEvent[]
}

// The part of an event that falls in one week row, placed on the 7-column grid (columns and lanes are 0-based)
export interface FullCalendarSegment {
    event: FullCalendarEvent
    column: number
    span: number
    lane: number
    isBar: boolean
    continuesBefore: boolean
    continuesAfter: boolean
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
    readonly modelValue?: string | string[] | CalendarRange | null
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
