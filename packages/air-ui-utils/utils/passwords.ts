
/**
 * Evaluates secure password conditions.
 * @param password - The password string to evaluate.
 * @returns An object indicating whether each condition is satisfied.
 */
export const evaluateSecurePasswordConditions = (password: string) => {
    return {
        isLongEnough: password.length >= 12,
        hasMixedCase: /[a-z]/.test(password) && /[A-Z]/.test(password),
        hasNumbersAndSpecialChars: /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password),
    }
}

/**
 * Checks if all secure password conditions are fulfilled.
 * @param password - The password string to validate.
 * @returns `true` if all conditions are met, otherwise `false`.
 */
export const isSecurePassword = (password: string): boolean => {
    const conditions = evaluateSecurePasswordConditions(password)
    for (const key in conditions) {
        if (!conditions[key as keyof typeof conditions]) return false
    }
    return true
}

/**
 * Generates a secure password that meets specified security requirements.
 *
 * @param length - The desired length of the password (default is 12 characters).
 * @returns A randomly generated, secure password string.
 *
 * The generated password will:
 * 1. Be at least 12 characters long (or the specified length).
 * 2. Include at least one lowercase letter, one uppercase letter, one number, and one special character.
 * 3. Be shuffled to prevent predictable patterns.
 */
export const generateSecurePassword = (length: number = 12): string => {
    const getRandomChar = (charset: string): string => {
        return charset[Math.floor(Math.random() * charset.length)]!
    }

    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numericChars = '0123456789'
    const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?'

    let password = ''

    // Ensure the password contains at least one character from each required set
    password += getRandomChar(lowerCaseChars)
    password += getRandomChar(upperCaseChars)
    password += getRandomChar(numericChars)
    password += getRandomChar(specialChars)

    // Fill the rest of the password with random characters from all sets
    const allChars = lowerCaseChars + upperCaseChars + numericChars + specialChars
    while (password.length < length) {
        password += getRandomChar(allChars)
    }

    // Shuffle the password to make it less predictable
    password = password.split('').sort(() => Math.random() - 0.5).join('')

    // Ensure the password meets all conditions
    const conditions = evaluateSecurePasswordConditions(password)
    if (!conditions.isLongEnough || !conditions.hasMixedCase || !conditions.hasNumbersAndSpecialChars) {
        // Recursively generate a new password if conditions are not met
        return generateSecurePassword(length)
    }

    return password
}