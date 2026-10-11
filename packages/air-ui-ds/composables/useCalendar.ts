const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/

// Parses a YYYY-MM-DD string into a local Date. Returns null for anything that is not a real calendar date.
export const parseISODate = (value?: string | null): Date | null => {
    const match = ISO_DATE_PATTERN.exec(value ?? '')
    if (!match) return null

    const year = Number(match[1])
    const month = Number(match[2])
    const day = Number(match[3])
    const date = new Date(year, month - 1, day)

    const isRealDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day

    return isRealDate ? date : null
}

export const toISODate = (date: Date): string => {
    const year = String(date.getFullYear()).padStart(4, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

const DEFAULT_DISPLAY_FORMAT: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }

// Formats a YYYY-MM-DD string for display using the given locale. Returns '' when the value is not a valid date.
export const formatISODate = (
    value: string | null | undefined,
    locale: string,
    options: Intl.DateTimeFormatOptions = DEFAULT_DISPLAY_FORMAT,
): string => {
    const date = parseISODate(value)
    if (!date) return ''

    return new Intl.DateTimeFormat(locale, options).format(date)
}

// Adds months keeping the day of the month, clamped to the last day of the target month (Jan 31 + 1 = Feb 28/29)
export const addMonths = (date: Date, amount: number): Date => {
    const target = new Date(date.getFullYear(), date.getMonth() + amount, 1)
    const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
    target.setDate(Math.min(date.getDate(), lastDay))

    return target
}
