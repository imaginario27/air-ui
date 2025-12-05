/**
 * Generates a unique username based on the user's first name and last names.
 * The username follows the format: `{firstName}.{lastNames}{randomNumber}`.
 *
 * @param {string} firstName - The user's first name.
 * @param {string} lastNames - The user's last names (can include spaces).
 * @returns {string} A generated username in lowercase with a random 4-digit number.
 */
export const generateUsername = (firstName: string, lastNames: string): string => {
    const normalizedFirstName = firstName.trim().toLowerCase()
    const normalizedLastNames = lastNames.trim().toLowerCase().replace(/\s+/g, '')
    
    const randomNumber = Math.floor(1000 + Math.random() * 9000)
    
    return `${normalizedFirstName}.${normalizedLastNames}${randomNumber}`
}

/**
 * Generates a display name using the first name and only the first last name.
 * Returns 'Test User' if either parameter is null or undefined.
 * 
 * @param {string | null | undefined} firstName - The user's first name.
 * @param {string | null | undefined} lastNames - The user's full last names (may contain multiple words).
 * @returns {string} The formatted display name or 'Test User' if inputs are missing.
 */
export const getUserDisplayName = (firstName?: string | null, lastNames?: string | null): string => {
    if (!firstName || !lastNames) return 'Test User'

    const firstLastName = lastNames.split(' ')[0] // Get only the first last name
    return `${firstName} ${firstLastName}`
}
