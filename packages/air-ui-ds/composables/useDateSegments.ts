interface DateSegmentsOptions {
    hourFormat?: HourFormat
    hasSeconds?: boolean
    weekText?: string
}

interface DateSegmentRangeContext {
    is12h: boolean
    month?: number | null
    year?: number | null
}

const SEGMENT_KINDS = Object.values(DateSegmentKind).filter((kind) => kind !== DateSegmentKind.LITERAL) as string[]

const pad = (value: number, length = 2) => String(value).padStart(length, '0')

export const getSegmentLength = (kind: DateSegmentKind): number => (kind === DateSegmentKind.YEAR ? 4 : 2)

export const padSegmentValue = (kind: DateSegmentKind, value: number | string): string =>
    String(Number(value)).padStart(getSegmentLength(kind), '0')

export const getDateSegmentLayout = (
    type: DateSegmentsType,
    locale: string,
    options: DateSegmentsOptions = {},
): DateSegmentLayoutItem[] => {
    if (type === DateSegmentsType.WEEK) {
        return [
            { kind: DateSegmentKind.LITERAL, text: `${options.weekText ?? 'Week'} ` },
            { kind: DateSegmentKind.WEEK },
            { kind: DateSegmentKind.LITERAL, text: ', ' },
            { kind: DateSegmentKind.YEAR },
        ]
    }

    // Latin digits and the Gregorian calendar, whatever the locale writes by default
    const formatOptions: Intl.DateTimeFormatOptions = { calendar: 'gregory', numberingSystem: 'latn' }

    if (type !== DateSegmentsType.TIME) {
        formatOptions.year = 'numeric'
        formatOptions.month = '2-digit'
        if (type !== DateSegmentsType.MONTH) formatOptions.day = '2-digit'
    }

    if (type === DateSegmentsType.TIME || type === DateSegmentsType.DATETIME_LOCAL) {
        formatOptions.hour = '2-digit'
        formatOptions.minute = '2-digit'
        if (options.hasSeconds) formatOptions.second = '2-digit'
        if (options.hourFormat) formatOptions.hour12 = options.hourFormat === HourFormat.HOURS_12
    }

    return new Intl.DateTimeFormat(locale, formatOptions)
        .formatToParts(new Date(2000, 0, 1, 13, 5, 9))
        .flatMap((part): DateSegmentLayoutItem[] => {
            if (part.type === 'literal') return [{ kind: DateSegmentKind.LITERAL, text: part.value }]

            return SEGMENT_KINDS.includes(part.type) ? [{ kind: part.type as DateSegmentKind }] : []
        })
}

export const getDayPeriodLabels = (locale: string): { am: string; pm: string } => {
    const label = (hour: number, fallback: string) =>
        new Intl.DateTimeFormat(locale, { hour: 'numeric', hour12: true, numberingSystem: 'latn' })
            .formatToParts(new Date(2000, 0, 1, hour))
            .find((part) => part.type === 'dayPeriod')?.value ?? fallback

    return { am: label(9, 'AM'), pm: label(15, 'PM') }
}

export const getSegmentRange = (
    kind: DateSegmentKind,
    { is12h, month, year }: DateSegmentRangeContext,
): { min: number; max: number } => {
    if (kind === DateSegmentKind.DAY) {
        return { min: 1, max: month ? new Date(year ?? 2000, month, 0).getDate() : 31 }
    }
    if (kind === DateSegmentKind.WEEK) {
        return { min: 1, max: year ? getISOWeek(new Date(year, 11, 28)).week : 53 }
    }

    const ranges: Partial<Record<DateSegmentKind, { min: number; max: number }>> = {
        [DateSegmentKind.MONTH]: { min: 1, max: 12 },
        [DateSegmentKind.YEAR]: { min: 1, max: 9999 },
        [DateSegmentKind.HOUR]: is12h ? { min: 1, max: 12 } : { min: 0, max: 23 },
        [DateSegmentKind.MINUTE]: { min: 0, max: 59 },
        [DateSegmentKind.SECOND]: { min: 0, max: 59 },
    }

    return ranges[kind] ?? { min: 0, max: 0 }
}

const buildDate = (parts: DateSegmentParts): string | null => {
    if (!parts.year || !parts.month || !parts.day) return null

    const value = `${pad(Number(parts.year), 4)}-${pad(Number(parts.month))}-${pad(Number(parts.day))}`

    return parseISODate(value) ? value : null
}

const buildMonth = (parts: DateSegmentParts): string | null => {
    if (!parts.year || !parts.month) return null

    const value = `${pad(Number(parts.year), 4)}-${pad(Number(parts.month))}`

    return parseISOMonth(value) ? value : null
}

const buildWeek = (parts: DateSegmentParts): string | null => {
    if (!parts.year || !parts.week) return null

    const value = `${pad(Number(parts.year), 4)}-W${pad(Number(parts.week))}`

    return parseISOWeek(value) ? value : null
}

const buildTime = (parts: DateSegmentParts, is12h: boolean, hasSeconds: boolean): string | null => {
    if (!parts.hour || !parts.minute || (hasSeconds && !parts.second) || (is12h && !parts.dayPeriod)) return null

    let hours = Number(parts.hour)
    if (is12h) {
        if (hours < 1 || hours > 12) return null
        hours = (hours % 12) + (parts.dayPeriod === 'pm' ? 12 : 0)
    }

    const value = toTimeString(
        { hours, minutes: Number(parts.minute), seconds: hasSeconds ? Number(parts.second) : 0 },
        hasSeconds,
    )

    return parseTime(value) ? value : null
}

export const buildSegmentValue = (
    type: DateSegmentsType,
    parts: DateSegmentParts,
    { is12h, hasSeconds }: { is12h: boolean; hasSeconds: boolean },
): string | null => {
    if (type === DateSegmentsType.DATE) return buildDate(parts)
    if (type === DateSegmentsType.MONTH) return buildMonth(parts)
    if (type === DateSegmentsType.WEEK) return buildWeek(parts)
    if (type === DateSegmentsType.TIME) return buildTime(parts, is12h, hasSeconds)

    const date = buildDate(parts)
    const time = buildTime(parts, is12h, hasSeconds)

    return date && time ? joinDateTime(date, time) : null
}

const parseDateParts = (value: string | null): DateSegmentParts | null => {
    const date = parseISODate(value)

    return date
        ? {
              [DateSegmentKind.YEAR]: pad(date.getFullYear(), 4),
              [DateSegmentKind.MONTH]: pad(date.getMonth() + 1),
              [DateSegmentKind.DAY]: pad(date.getDate()),
          }
        : null
}

const parseTimeParts = (value: string | null, is12h: boolean, hasSeconds: boolean): DateSegmentParts | null => {
    const time = parseTime(value)
    if (!time) return null

    return {
        [DateSegmentKind.HOUR]: pad(is12h ? time.hours % 12 || 12 : time.hours),
        [DateSegmentKind.MINUTE]: pad(time.minutes),
        ...(hasSeconds && { [DateSegmentKind.SECOND]: pad(time.seconds) }),
        ...(is12h && { [DateSegmentKind.DAY_PERIOD]: time.hours >= 12 ? 'pm' : 'am' }),
    }
}

export const parseSegmentValue = (
    type: DateSegmentsType,
    value: string,
    { is12h, hasSeconds }: { is12h: boolean; hasSeconds: boolean },
): DateSegmentParts | null => {
    if (type === DateSegmentsType.DATE) return parseDateParts(value)

    if (type === DateSegmentsType.MONTH) {
        const month = parseISOMonth(value)

        return month
            ? {
                  [DateSegmentKind.YEAR]: pad(month.getFullYear(), 4),
                  [DateSegmentKind.MONTH]: pad(month.getMonth() + 1),
              }
            : null
    }

    if (type === DateSegmentsType.WEEK) {
        const monday = parseISOWeek(value)
        if (!monday) return null

        const { year, week } = getISOWeek(monday)

        return { [DateSegmentKind.YEAR]: pad(year, 4), [DateSegmentKind.WEEK]: pad(week) }
    }

    if (type === DateSegmentsType.TIME) return parseTimeParts(value, is12h, hasSeconds)

    const { date, time } = splitDateTime(value)
    const dateParts = parseDateParts(date)
    const timeParts = parseTimeParts(time, is12h, hasSeconds)

    return dateParts && timeParts ? { ...dateParts, ...timeParts } : null
}

const normalizeBound = (value: string) => (/(^|T)\d{2}:\d{2}$/.test(value) ? `${value}:00` : value)

export const isWithinBounds = (value: string, min?: string, max?: string): boolean => {
    const key = normalizeBound(value)
    const compare = (bound: string) => {
        const normalized = normalizeBound(bound)
        const start = key.slice(0, normalized.length)

        return Number(start > normalized) - Number(start < normalized)
    }

    return (!min || compare(min) >= 0) && (!max || compare(max) <= 0)
}
