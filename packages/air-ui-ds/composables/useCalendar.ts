const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/
const ISO_MONTH_PATTERN = /^(\d{4})-(\d{2})$/
const ISO_WEEK_PATTERN = /^(\d{4})-W(\d{2})$/

const pad = (value: number, length = 2) => String(value).padStart(length, '0')

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

export const toISODate = (date: Date): string =>
    `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

// Parses a YYYY-MM string into the first day of that month
export const parseISOMonth = (value?: string | null): Date | null => {
    const match = ISO_MONTH_PATTERN.exec(value ?? '')
    if (!match) return null

    const month = Number(match[2])

    return month >= 1 && month <= 12 ? new Date(Number(match[1]), month - 1, 1) : null
}

export const toISOMonth = (date: Date): string => `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}`

// ISO 8601 week: weeks start on Monday and week 1 is the one that contains January 4th
export const getISOWeek = (date: Date): { year: number; week: number } => {
    const thursday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3 - ((date.getDay() + 6) % 7))
    const firstThursday = new Date(thursday.getFullYear(), 0, 4)
    const days = Math.round((thursday.getTime() - firstThursday.getTime()) / 86_400_000)

    return { year: thursday.getFullYear(), week: 1 + Math.round((days - 3 + ((firstThursday.getDay() + 6) % 7)) / 7) }
}

// YYYY-Www, the same format the native week input uses
export const toISOWeek = (date: Date): string => {
    const { year, week } = getISOWeek(date)

    return `${pad(year, 4)}-W${pad(week)}`
}

// Parses a YYYY-Www string into the Monday of that week
export const parseISOWeek = (value?: string | null): Date | null => {
    const match = ISO_WEEK_PATTERN.exec(value ?? '')
    if (!match) return null

    const year = Number(match[1])
    const week = Number(match[2])
    const januaryFourth = new Date(year, 0, 4)
    const monday = new Date(year, 0, 4 - ((januaryFourth.getDay() + 6) % 7) + (week - 1) * 7)

    // Rejects weeks that do not exist in that year, such as W53 in a 52-week year
    return week >= 1 && toISOWeek(monday) === value ? monday : null
}

// Normalizes a date, month (YYYY-MM) or week (YYYY-Www) bound to the first or last day it covers
export const toBoundISO = (value: string | undefined, edge: 'start' | 'end'): string | undefined => {
    if (!value) return undefined

    const month = parseISOMonth(value)
    if (month) return toISODate(edge === 'start' ? month : new Date(month.getFullYear(), month.getMonth() + 1, 0))

    const monday = parseISOWeek(value)
    if (monday)
        return toISODate(
            edge === 'start' ? monday : new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6),
        )

    return value
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

// Classes shared by the calendar and the time picker for each accent color
export const getCalendarAccent = (color?: string) => {
    const variants = {
        [ColorAccent.PRIMARY_BRAND]: {
            filled: 'bg-background-primary-brand-default text-text-neutral-on-filled',
            filledHover: 'hover:bg-background-primary-brand-hover',
            soft: 'bg-background-primary-brand-soft text-text-primary-brand-on-soft-bg',
            today: 'border border-border-primary-brand-default',
            ring: 'focus-visible:ring-border-primary-brand-default',
        },
        [ColorAccent.SECONDARY_BRAND]: {
            filled: 'bg-background-secondary-brand-default text-text-neutral-on-filled',
            filledHover: 'hover:bg-background-secondary-brand-hover',
            soft: 'bg-background-secondary-brand-soft text-text-secondary-brand-on-soft-bg',
            today: 'border border-border-secondary-brand-default',
            ring: 'focus-visible:ring-border-secondary-brand-default',
        },
    }

    return variants[color as keyof typeof variants] ?? variants[ColorAccent.PRIMARY_BRAND]
}
