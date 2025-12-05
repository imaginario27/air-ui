/**
 * Formats an ISO date string to 'dd/mm/yyyy'.
 *
 * @param {string} isoDate - The ISO date string.
 * @returns {string} The formatted date or 'Invalid date' if the input is invalid.
 */
export const formatISODateToDDMMYYYY = (isoDate: string): string => {
    const date = new Date(isoDate)
    return isNaN(date.getTime())
        ? 'Invalid date'
        : date.toLocaleDateString('en-GB') // Formats to dd/mm/yyyy
}

/**
 * Converts a date string from `YYYY-MM-DD` format to `DD/MM/YYYY` format.
 *
 * @param {string} dateString - The date string in `YYYY-MM-DD` format.
 * @returns {string} The formatted date string in `DD/MM/YYYY` format, or an empty string if the input is invalid.
 */
export const formatDateToDDMMYYYY = (dateString: string): string => {
    if (!dateString) return ''

    const [year, month, day] = dateString.split('-').map(Number)

    // Ensure all values are valid before formatting
    if (!year || !month || !day) return ''

    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
}


/**
 * Returns a human-readable relative date string (e.g., "Today", "Yesterday", "2 days ago").
 * If the date is older than 6 days, it formats as 'dd/mm/yyyy'.
 *
 * @param {string} isoDate - The ISO date string.
 * @returns {string} The formatted relative date or standard date format.
 */
export const formatRelativeDate = (isoDate: string): string => {
    const date = new Date(isoDate)
    if (isNaN(date.getTime())) return 'Invalid date'

    const now = new Date()
    const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()) // Strip time from today
    const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate()) // Strip time from input

    const diffInMs = nowMidnight.getTime() - dateMidnight.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) // Convert ms to days

    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays >= 2 && diffInDays <= 6) return `${diffInDays} days ago`

    return formatISODateToDDMMYYYY(isoDate) // Fallback to dd/mm/yyyy
}

/**
 * Formats a date string (YYYY-MM) into an object containing the full month name and year.
 *
 * @param {string} dateString - The date string in "YYYY-MM" format.
 * @returns {{ month: string; year: number } | null} 
 *          An object containing the full month name and year, or `null` if the input is invalid.
 *
 * @example
 * formatDateToMonthYear("2025-03")
 * // Returns: { month: "March", year: 2025 }
 *
 * formatDateToMonthYear("")
 * // Returns: null
 */
export const formatDateToMonthYear = (
    dateString: string
): { month: string; year: number } | null => {
    if (!dateString) return null

    const [year, month] = dateString.split('-')
    const date = new Date(Number(year), Number(month) - 1)

    return {
        month: date.toLocaleString('en-GB', { month: 'long' }),
        year: date.getFullYear()
    }
}

/**
 * Adds a month to a given ISO date string.
 * 
 * @param isoDate - The ISO date string (e.g., '2025-03-15T00:00:00.000Z').
 * @returns A new ISO date string with one month added.
 */
export const getNextMonthISODate = (isoDate: string): string => {
    const date = new Date(isoDate)

    // Set the new month while handling month overflow
    date.setMonth(date.getMonth() + 1)

    return date.toISOString()
}

/**
 * Adds a year to a given ISO date string.
 * 
 * @param isoDate - The ISO date string (e.g., '2025-03-15T00:00:00.000Z').
 * @returns A new ISO date string with one year added.
 */
export const getNextYearToISODate = (isoDate: string): string => {
    const date = new Date(isoDate)

    // Set the new year while maintaining the month/day
    date.setFullYear(date.getFullYear() + 1)

    return date.toISOString()
}

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
 * Formats a YYYY-MM-DD date string into a localized full date.
 * Example:
 * - formatLocalizedDate('2025-09-24', 'en') → "September 24, 2025"
 * - formatLocalizedDate('2025-09-24', 'es') → "24 de septiembre de 2025"
 *
 * @param dateString - The date string in "YYYY-MM-DD" format
 * @param locale - The locale code (e.g. 'en', 'es', 'fr', 'de')
 * @returns Formatted localized date string
 */
export const formatLocalizedDate = (
    dateString: string,
    locale: string = 'en'
): string => {
    if (!dateString) return ''

    const date = new Date(dateString)

    if (isNaN(date.getTime())) return ''

    const formatter = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return formatter.format(date)
}