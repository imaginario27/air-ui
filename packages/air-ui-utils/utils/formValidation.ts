
/**
 * Validates a field value to ensure it is not empty, null, or undefined.
 *
 * @param value - The value to validate. Can be of any type.
 * @param requiredFieldMessage - Optional custom error message to return if the value is invalid.
 * @returns A string containing the error message if invalid, or null if the value is valid.
 */
export const validateField = (
    value: unknown,
    requiredFieldMessage?: string,
): string | null => {
    if (typeof value === 'string' && value.trim() === '') {
        return requiredFieldMessage ?? FieldError.REQUIRED_FIELD
    }

    if (value === null || value === undefined) {
        return requiredFieldMessage ?? FieldError.REQUIRED_FIELD
    }

    return null
}

/**
 * Validates whether a given value is a valid email address.
 *
 * @param value - The value to validate as an email. Must be a non-empty string.
 * @param requiredFieldMessage - Optional custom error message to return if the email is empty or missing.
 * @param invalidEmailMessage - Optional custom error message to return if the email format is invalid.
 * @returns A string containing the validation error message if invalid, or null if valid.
 */
export const validateEmail = (
    value: unknown,
    requiredFieldMessage?: string,
    invalidEmailMessage?: string,
): string | null => {
    if (typeof value !== 'string' || !value.trim()) {
        return requiredFieldMessage ?? FieldError.REQUIRED_EMAIL
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
        return invalidEmailMessage ?? FieldError.INVALID_EMAIL
    }

    return null
}

/**
 * Validates that two password values match.
 *
 * @param password - The original password.
 * @param confirmPassword - The repeated password to compare.
 * @param requiredFieldMessage - Optional custom error message to return if the value is invalid.
 * @param mismatchMessage - Optional custom error message if the passwords do not match.
 * @returns A string containing the error message if invalid, or null if the passwords match.
 */
export const validatePasswordMatch = (
    password: unknown,
    confirmPassword: unknown,
    requiredFieldMessage?: string,
    mismatchMessage?: string,
): string | null => {
    if (
        typeof password !== 'string' ||
        !password.trim() ||
        typeof confirmPassword !== 'string' ||
        !confirmPassword.trim()
    ) {
        return requiredFieldMessage ?? FieldError.REQUIRED_FIELD
    }

    if (password !== confirmPassword) {
        return mismatchMessage ?? FieldError.PASSWORDS_DO_NOT_MATCH
    }

    return null
}

/**
 * Validates that an end date is not before a start date.
 *
 * @param startDate - The start date to compare from.
 * @param endDate - The end date to compare against.
 * @param requiredFieldMessage - Optional custom message if either date is missing or invalid.
 * @param invalidRangeMessage - Optional custom message if the end date is before the start date.
 * @returns A string containing the error message if invalid, or null if the range is valid.
 */
export const validateDateRange = (
    startDate: unknown,
    endDate: unknown,
    requiredFieldMessage = FieldError.REQUIRED_FIELD,
    invalidRangeMessage = FieldError.INVALID_DATE_RANGE,
): string | null => {
    if (
        typeof startDate !== 'string' || !startDate ||
        typeof endDate !== 'string' || !endDate
    ) {
        return requiredFieldMessage
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
        return invalidRangeMessage
    }

    return null
}

/**
 * Validates whether a given value is a valid URL.
 *
 * @param value - The value to validate as a URL.
 * @param requiredFieldMessage - Optional custom message if the value is empty.
 * @param invalidUrlMessage - Optional custom message if the URL format is invalid.
 * @returns A string containing the error message if invalid, or null if valid.
 */
export const validateUrl = (
    value: unknown,
    requiredFieldMessage = FieldError.REQUIRED_FIELD,
    invalidUrlMessage = FieldError.INVALID_URL,
): string | null => {
    if (typeof value !== 'string' || !value.trim()) {
        return requiredFieldMessage
    }

    try {
        new URL(value)
        return null
    } catch {
        return invalidUrlMessage
    }
}

/**
 * Validates a checkbox/switch field to ensure it is checked (true).
 *
 * @param value - The value to validate. Should be a boolean.
 * @param requiredFieldMessage - Optional custom error message to return if the checkbox is not checked.
 * @returns A string containing the error message if unchecked, or null if valid.
 */
export const validateBooleanField = (
    value: unknown,
    requiredFieldMessage = FieldError.REQUIRED_FIELD,
): string | null => {
    if (typeof value !== 'boolean' || value === false) {
        return requiredFieldMessage
    }

    return null
}

/**
 * Validates that a given value is a non-empty array (or meets min/max length criteria).
 *
 * @param value - The value to validate. Should be an array.
 * @param requiredFieldMessage - Custom error message if value is not a valid array or empty.
 * @param minLength - Optional minimum number of items required in the array.
 * @param maxLength - Optional maximum number of items allowed in the array.
 * @param lengthErrorMessage - Optional custom error message if min/max length is violated.
 * @returns A string containing the error message if invalid, or null if valid.
 */
export const validateArrayField = (
    value: unknown,
    requiredFieldMessage = FieldError.REQUIRED_FIELD,
    minLength?: number,
    maxLength?: number,
    lengthErrorMessage?: string,
): string | null => {
    // Must be an array
    if (!Array.isArray(value)) {
        return requiredFieldMessage
    }

    // Must not be empty
    if (value.length === 0) {
        return requiredFieldMessage
    }

    // Check minimum length
    if (typeof minLength === 'number' && value.length < minLength) {
        return (
            lengthErrorMessage ??
            `At least ${minLength} item${minLength > 1 ? 's' : ''} required`
        )
    }

    // Check maximum length
    if (typeof maxLength === 'number' && value.length > maxLength) {
        return (
            lengthErrorMessage ??
            `No more than ${maxLength} item${maxLength > 1 ? 's' : ''} allowed`
        )
    }

    return null
}
