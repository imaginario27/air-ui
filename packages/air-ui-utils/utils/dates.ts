/**
 * Formats a date (ISO string or timestamp) into a localized full date with optional time.
 * Example: 
 * - formatLocalizedDateTime('2025-09-20T10:15:22', 'en') → "September 20, 2025 (10:15:22)"
 * - formatLocalizedDateTime(1761724212863, 'en', false) → "October 29, 2025"
 * 
 * @param dateInput - ISO date string or timestamp
 * @param locale - The locale code (e.g. 'en', 'es', 'fr', 'de')
 * @param showTime - Whether to include the time in the output
 * @returns Formatted localized date string
 */
export function formatLocalizedDateTime(
    dateInput: string | number, 
    locale: string = 'en',
    showTime: boolean = true
): string {
    if (!dateInput) return ''

    const date = new Date(dateInput)
    if (isNaN(date.getTime())) return ''

    const dateFormatter = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    const formattedDate = dateFormatter.format(date)

    if (!showTime) {
        return formattedDate
    }

    const timeFormatter = new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    })

    const formattedTime = timeFormatter.format(date)
    return `${formattedDate} (${formattedTime})`
}

/**
 * Formats a date string (YYYY-MM-DD or ISO 8601) into a localized full date.
 *
 * This utility safely supports both plain date strings (`YYYY-MM-DD`)
 * and full ISO 8601 strings with or without timezones.
 *
 * - Always outputs the date in `UTC` to avoid local timezone shifts.
 * - Returns an empty string for invalid or missing inputs.
 *
 * @example
 * formatLocalizedDate('2025-09-24', 'en') // "September 24, 2025"
 * formatLocalizedDate('2025-09-24', 'es') // "24 de septiembre de 2025"
 * formatLocalizedDate('2025-09-24T00:00:00Z', 'fr') // "24 septembre 2025"
 *
 * @param dateString - Date in `YYYY-MM-DD` or ISO 8601 format.
 * @param locale - Locale code (e.g. `'en'`, `'es'`, `'fr'`). Defaults to `'en'`.
 * @returns Localized date string (e.g. "September 24, 2025"), or empty string if invalid.
 */
export const formatLocalizedDate = (
    dateString: string,
    locale: string = 'en'
): string => {
    if (!dateString) return ''

    let date: Date

    // If format is YYYY-MM-DD, parse manually to avoid local timezone shifts
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [yearStr, monthStr, dayStr] = dateString.split('-')

        const year = Number(yearStr)
        const month = Number(monthStr)
        const day = Number(dayStr)

        if (
            Number.isNaN(year) ||
            Number.isNaN(month) ||
            Number.isNaN(day)
        ) return ''

        // Construct UTC date from parts
        date = new Date(Date.UTC(year, month - 1, day))
    } else {
        // Try standard ISO string parsing
        date = new Date(dateString)
    }

    // If invalid date
    if (Number.isNaN(date.getTime())) return ''

    // Format using Intl API with UTC output
    const formatter = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    })

    return formatter.format(date)
}