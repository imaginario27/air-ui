/**
 * Trims a string to the specified maximum length and appends "..." if it exceeds the limit.
 * In `link` mode (default), appends a "Read more" link when `readMoreLink` is provided.
 * In `toggle` mode, `isExpanded` controls whether the full text or the trimmed text is returned,
 * letting a caller-owned state (e.g. a ref bound to a "Read more"/"Show less" button) drive the output.
 *
 * @param {string} inputString - The text string to be trimmed.
 * @param {number} maxLength - The maximum allowed length of the string.
 * @param {string} [readMoreText='Read more'] - Optional text for the "Read more" link (`link` mode only).
 * @param {string} [readMoreLink] - Optional URL for the "Read more" link (`link` mode only). If omitted, only "..." is appended.
 * @param {'link' | 'toggle'} [readMoreType='link'] - Whether truncation is resolved via a link or via caller-driven `isExpanded` state.
 * @param {boolean} [isExpanded=false] - In `toggle` mode, returns the full text when `true`. Ignored in `link` mode.
 * @returns {string} The trimmed string, the full string (when expanded), or a string with a "Read more" link appended.
 * @throws {Error} If `inputString` is not a string.
 * @throws {Error} If `maxLength` is not a number or negative.
 * @example
 * trimText('Lorem ipsum dolor sit amet', 10, 'Read more', undefined, 'toggle', isExpanded.value)
 */
export const trimText = (
    inputString: string,
    maxLength: number,
    readMoreText: string = 'Read more',
    readMoreLink?: string,
    readMoreType: 'link' | 'toggle' = 'link',
    isExpanded: boolean = false
): string => {
    if (typeof inputString !== 'string') {
        throw new Error('The inputString parameter must be a text string')
    }
    if (typeof maxLength !== 'number' || maxLength < 0) {
        throw new Error('The maxLength parameter must be a non-negative number')
    }

    // Return the original text if it's within the max length
    if (inputString.length <= maxLength) {
        return inputString
    }

    // In toggle mode, let the caller-owned isExpanded state decide the output
    if (readMoreType === 'toggle' && isExpanded) {
        return inputString
    }

    // Trim text
    const trimmedText = inputString.substring(0, maxLength) + '...'

    // Append "Read more" link only in link mode when readMoreLink is provided
    return readMoreType === 'link' && readMoreLink
        ? `${trimmedText} <a href="${readMoreLink}" target="_blank" rel="noopener noreferrer" class="text-text-primary hover:text-text-hover">(${readMoreText})</a>`
        : trimmedText

}

/**
 * Converts a string into a slug format.
 * - Converts to lowercase
 * - Removes special characters
 * - Replaces spaces with hyphens
 *
 * @param {string} text - The input string to slugify
 * @returns {string} - The slugified string
 */
export const convertStringIntoSlugFormat = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .trim()
}

/**
 * Converts the first letter of a string to lowercase while keeping the rest unchanged.
 * 
 * @param {string} str - The input string.
 * @returns {string} The transformed string with the first letter in lowercase.
 */
export const lowercaseFirstLetter = (str: string): string => {
    if (!str) return str
    return str.charAt(0).toLowerCase() + str.slice(1)
}

/**
 * Converts the first letter of a string to upperrcase while keeping the rest unchanged.
 * 
 * @param {string} str - The input string.
 * @returns {string} The transformed string with the first letter in uppercase.
 */
export const uppercaseFirstLetter = (str: string): string => {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Extracts the last four digits from a given credit card number.
 *
 * @param {string} pan - The full credit card number (PAN).
 * @returns {string} The last four digits of the card number, or an empty string if the input is invalid.
 */
export const getCreditCardLastFourNumbers = (pan: string): string => {
    if (!pan) return ''
    return pan.slice(-4)
}

/**
 * Returns the full name by combining first and last names.
 *
 * @param firstName - The first name.
 * @param lastName - The last name.
 * @returns The concatenated full name in the format "FirstName LastName".
 */
export const getFullName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`
}

/**
 * Extracts the initials from a given input.
 *
 * - If the name is empty or invalid, returns "TU" by default.
 * - Takes the first character of up to two words to form the initials.
 *
 * @param input - The input string to generate initials from
 * @returns A string with the initials in uppercase (e.g., "John Doe" -> "JD")
 * 
 */
export const getInitials = (input: string): string => {
    const words = input?.split(' ').filter(Boolean)
  
    if (!words?.length) return 'TU'
  
    const initials = words.slice(0, 2).map(word => word[0]?.toUpperCase()).join('')
  
    return initials || 'TU'
}
  
  