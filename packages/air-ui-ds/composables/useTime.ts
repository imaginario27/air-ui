const TIME_PATTERN = /^(\d{2}):(\d{2})(?::(\d{2}))?$/

const pad = (value: number) => String(value).padStart(2, '0')

// Parses HH:mm or HH:mm:ss. Returns null for anything that is not a real time of day.
export const parseTime = (value?: string | null): TimeParts | null => {
    const match = TIME_PATTERN.exec(value ?? '')
    if (!match) return null

    const parts = { hours: Number(match[1]), minutes: Number(match[2]), seconds: Number(match[3] ?? 0) }

    return parts.hours < 24 && parts.minutes < 60 && parts.seconds < 60 ? parts : null
}

// HH:mm, or HH:mm:ss when seconds are used. This is the format of the native time input.
export const toTimeString = (parts: TimeParts, hasSeconds = false): string => {
    const base = `${pad(parts.hours)}:${pad(parts.minutes)}`

    return hasSeconds ? `${base}:${pad(parts.seconds)}` : base
}

// Whether the locale writes the time with an AM/PM period
export const uses12HourClock = (locale: string): boolean =>
    new Intl.DateTimeFormat(locale, { hour: 'numeric' }).resolvedOptions().hour12 === true

// Formats a time of day for display using the given locale and hour format
export const formatTime = (
    value: string | null | undefined,
    locale: string,
    hasSeconds = false,
    hourFormat?: HourFormat,
): string => {
    const parts = parseTime(value)
    if (!parts) return ''

    return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: hasSeconds ? '2-digit' : undefined,
        hour12: hourFormat ? hourFormat === HourFormat.HOURS_12 : undefined,
    }).format(new Date(2000, 0, 1, parts.hours, parts.minutes, parts.seconds))
}

// Splits YYYY-MM-DDTHH:mm into its date and time, the format of the native datetime-local input
export const splitDateTime = (value?: string | null): { date: string | null; time: string | null } => {
    const [date, time] = (value ?? '').split('T')

    return { date: parseISODate(date) ? date! : null, time: parseTime(time) ? time! : null }
}

export const joinDateTime = (date: string, time: string): string => `${date}T${time}`
