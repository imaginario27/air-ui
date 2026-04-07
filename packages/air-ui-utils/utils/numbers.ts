/**
 * Formats a number into a string with thousands separators using Intl locale rules.
 *
 * @param value - Number to format
 * @param locale - Optional locale (default: 'es-ES')
 * @returns Formatted string with thousands separators
 *
 * @example
 * formatNumberWithThousands(1234567)
 * // "1.234.567"
 *
 * @example
 * formatNumberWithThousands(1234567.89, 'en-US')
 * // "1,234,567.89"
 *
 * @example
 * formatNumberWithThousands(1234.56, 'de-DE')
 * // "1.234,56"
 */
export const formatNumberWithThousands = (
    value: number,
    locale: string = 'en-GB'
): string => {
    if (!Number.isFinite(value)) return 'Not a valid number'

    return value.toLocaleString(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20
    })
}