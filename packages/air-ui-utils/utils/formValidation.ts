
import { FieldError } from '../models/constants/form'
import type {
    ArrayValidator,
    CreateRulesFieldValidatorOptions,
    RuleValidationItem,
    RuleValidationValue,
} from '../models/types/formValidation'

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

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
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

/**
 * Composes multiple array validators into a single validator function.
 *
 * Validators run in order and validation stops at the first error found.
 *
 * @typeParam T - Item type in the validated array.
 * @param validators - List of validators to execute sequentially.
 * @returns A validator function that returns the first error message, or null if all validators pass.
 */
export const composeArrayValidators = <T>(
    validators: ArrayValidator<T>[],
): ArrayValidator<T> => {
    return (value: T[]) => {
        for (const validator of validators) {
            const error = validator(value)
            if (error) {
                return error
            }
        }

        return null
    }
}

/**
 * Validates that the array contains at least one complete rule.
 *
 * A rule is considered complete when item, operator, and value are all present.
 *
 * @param value - Rules array to validate.
 * @param requiredFieldMessage - Optional custom message returned when no complete rule exists.
 * @returns Validation error message or null.
 */
export const validateAtLeastOneRule = (
    value: RuleValidationItem[],
    requiredFieldMessage = 'Add at least one complete rule.',
): string | null => {
    const hasCompleteRule = value.some(rule => isRuleComplete(rule))

    if (!hasCompleteRule) {
        return requiredFieldMessage
    }

    return null
}

/**
 * Validates that no rule is partially filled.
 *
 * Empty rows are allowed. Rows with some data must be fully complete.
 *
 * @param value - Rules array to validate.
 * @param incompleteRuleMessage - Optional custom message returned when incomplete rows are found.
 * @returns Validation error message or null.
 */
export const validateRuleCompleteness = (
    value: RuleValidationItem[],
    incompleteRuleMessage = 'Complete all rule fields before continuing.',
): string | null => {
    const hasIncompleteRule = value.some(rule => !isRuleEmpty(rule) && !isRuleComplete(rule))

    if (hasIncompleteRule) {
        return incompleteRuleMessage
    }

    return null
}

/**
 * Validates that the number of rules does not exceed the specified limit.
 *
 * @param value - Rules array to validate.
 * @param maxRules - Maximum number of allowed rules.
 * @param maxRulesMessage - Optional custom message returned when max is exceeded.
 * @returns Validation error message or null.
 */
export const validateMaxRules = (
    value: RuleValidationItem[],
    maxRules: number,
    maxRulesMessage?: string,
): string | null => {
    const normalizedMax = Math.floor(maxRules)
    if (normalizedMax <= 0) {
        return null
    }

    if (value.length > normalizedMax) {
        return maxRulesMessage ?? `No more than ${normalizedMax} rule${normalizedMax > 1 ? 's' : ''} allowed.`
    }

    return null
}

/**
 * Creates a ready-to-use validator function for RulesField values.
 *
 * By default, this validator:
 * 1) Rejects incomplete rows
 * 2) Requires at least one complete row
 *
 * You can add extra custom validators that run after the built-in checks.
 *
 * @param options - Validation behavior options.
 * @param options.required - Whether at least one complete rule is required.
 * @param options.requiredFieldMessage - Custom message for missing complete rules.
 * @param options.incompleteRuleMessage - Custom message for incomplete rows.
 * @param options.validators - Additional custom validators.
 * @returns A validator compatible with form field validator APIs.
 */
export const createRulesFieldValidator = (
    options: CreateRulesFieldValidatorOptions = {},
): ArrayValidator<RuleValidationItem> => {
    const {
        required = true,
        requiredFieldMessage,
        incompleteRuleMessage,
        maxRules,
        maxRulesMessage,
        validators = [],
    } = options

    const baseValidators: ArrayValidator<RuleValidationItem>[] = []

    if (incompleteRuleMessage) {
        baseValidators.push(value => validateRuleCompleteness(value, incompleteRuleMessage))
    } else {
        baseValidators.push(validateRuleCompleteness)
    }

    if (required) {
        baseValidators.push(value => validateAtLeastOneRule(value, requiredFieldMessage))
    }

    if (typeof maxRules === 'number') {
        baseValidators.push(value => validateMaxRules(value, maxRules, maxRulesMessage))
    }

    return composeArrayValidators([...baseValidators, ...validators])
}

// Helper functions for rule validation
const hasValue = (value: RuleValidationValue): boolean => {
    if (typeof value === 'string') {
        return value.trim() !== ''
    }

    return value !== null
}

const isRuleEmpty = (rule: RuleValidationItem): boolean => {
    return !hasValue(rule.item) && !hasValue(rule.operator) && !hasValue(rule.value)
}

const isRuleComplete = (rule: RuleValidationItem): boolean => {
    return hasValue(rule.item) && hasValue(rule.operator) && hasValue(rule.value)
}