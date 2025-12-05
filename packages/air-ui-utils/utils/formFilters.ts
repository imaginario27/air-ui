/**
 * Filters out non-alphabetic characters from a given string.
 *
 * @param {string} value - The input string to be filtered.
 * @returns {string} The filtered string containing only alphabetic characters and spaces.
 */
export const filterAlphabetic = (value: string): string => {
    return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '') // Removes non-alphabetic characters
}

