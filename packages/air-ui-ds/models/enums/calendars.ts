export enum CalendarMode {
    SINGLE = 'single',
    MULTIPLE = 'multiple',
    RANGE = 'range',
}

// What each selection covers. It combines with the mode: a range of weeks, several months...
export enum CalendarUnit {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
}

// How the full calendar shows its dates
export enum FullCalendarView {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
    YEAR = 'year',
    AGENDA = 'agenda',
}

export enum CalendarView {
    DAYS = 'days',
    MONTHS = 'months',
    YEARS = 'years',
}

// Same values as the native input types they replace
export enum DatePickerType {
    DATE = 'date',
    MONTH = 'month',
    WEEK = 'week',
    DATETIME_LOCAL = 'datetime-local',
}

export enum PickerVariant {
    INPUT = 'input',
    INLINE = 'inline',
}

export enum HourFormat {
    HOURS_12 = '12',
    HOURS_24 = '24',
}

export enum DateSegmentsType {
    DATE = 'date',
    MONTH = 'month',
    WEEK = 'week',
    DATETIME_LOCAL = 'datetime-local',
    TIME = 'time',
}

export enum DateSegmentKind {
    DAY = 'day',
    MONTH = 'month',
    YEAR = 'year',
    WEEK = 'week',
    HOUR = 'hour',
    MINUTE = 'minute',
    SECOND = 'second',
    DAY_PERIOD = 'dayPeriod',
    LITERAL = 'literal',
}
