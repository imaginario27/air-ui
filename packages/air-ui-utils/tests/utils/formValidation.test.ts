import {
    composeArrayValidators,
    createRulesFieldValidator,
    validateArrayField,
    validateAtLeastOneRule,
    validateBooleanField,
    validateDateRange,
    validateEmail,
    validateField,
    validateMaxRules,
    validatePasswordMatch,
    validateRuleCompleteness,
    validateUrl,
} from '../../utils/formValidation'
import { useUtilsConfig } from '../../composables/useUtilsConfig'

describe('formValidation rules utils', () => {
    it('validates at least one complete rule', () => {
        const result = validateAtLeastOneRule([
            { item: null, operator: null, value: null },
            { item: 'age', operator: null, value: null },
        ])

        expect(result).toBe('Add at least one complete rule.')
    })

    it('returns null when at least one complete rule exists', () => {
        const result = validateAtLeastOneRule([
            { item: null, operator: null, value: null },
            { item: 'age', operator: 'gt', value: 18 },
        ])

        expect(result).toBeNull()
    })

    it('detects incomplete rules', () => {
        const result = validateRuleCompleteness([
            { item: 'age', operator: null, value: null },
        ])

        expect(result).toBe('Complete all rule fields before continuing.')
    })

    it('returns null when rules are complete or empty', () => {
        const result = validateRuleCompleteness([
            { item: null, operator: null, value: null },
            { item: 'age', operator: 'gt', value: 18 },
        ])

        expect(result).toBeNull()
    })

    it('composes array validators and returns first error', () => {
        const validator = composeArrayValidators<number>([
            value => (value.length < 2 ? 'Need 2 items' : null),
            value => (value.includes(0) ? 'Zero is not allowed' : null),
        ])

        expect(validator([1])).toBe('Need 2 items')
        expect(validator([1, 0])).toBe('Zero is not allowed')
        expect(validator([1, 2])).toBeNull()
    })

    it('builds ready-to-use rules field validator', () => {
        const validator = createRulesFieldValidator({ required: true })

        expect(validator([{ item: null, operator: null, value: null }])).toBe(
            'Add at least one complete rule.'
        )

        expect(validator([{ item: 'age', operator: null, value: null }])).toBe(
            'Complete all rule fields before continuing.'
        )

        expect(validator([{ item: 'age', operator: 'gt', value: 18 }])).toBeNull()
    })

    it('validates max rules length', () => {
        const result = validateMaxRules(
            [
                { item: 'age', operator: 'gt', value: 18 },
                { item: 'status', operator: 'eq', value: 'active' },
            ],
            1
        )

        expect(result).toBe('No more than 1 rule allowed.')
    })

    it('applies maxRules in createRulesFieldValidator', () => {
        const validator = createRulesFieldValidator({
            required: false,
            maxRules: 1,
            maxRulesMessage: 'Maximum number of rules reached.',
        })

        expect(validator([
            { item: 'age', operator: 'gt', value: 18 },
            { item: 'status', operator: 'eq', value: 'active' },
        ])).toBe('Maximum number of rules reached.')
    })
})

describe('formValidation global config', () => {
    afterEach(() => {
        const config = useUtilsConfig()
        config.validation.requiredFieldMessage = () => 'This field is required.'
        config.validation.invalidEmailMessage = () => 'Invalid email address.'
        config.validation.passwordsDoNotMatchMessage = () => 'Passwords do not match.'
        config.validation.invalidDateRangeMessage = () => 'Start date must be before or equal to end date'
        config.validation.invalidUrlMessage = () => 'Invalid URL.'
    })

    it('falls back to useUtilsConfig().validation.requiredFieldMessage() when unset', () => {
        expect(validateField('')).toBe('This field is required.')
        expect(validateBooleanField(false)).toBe('This field is required.')
        expect(validateArrayField([])).toBe('This field is required.')
    })

    it('lets a per-call message win over the global config', () => {
        expect(validateField('', 'Custom required message')).toBe('Custom required message')
    })

    it('lets a global config override change the default message', () => {
        useUtilsConfig().validation.requiredFieldMessage = () => 'Campo obligatorio.'

        expect(validateField('')).toBe('Campo obligatorio.')
        expect(validateBooleanField(false)).toBe('Campo obligatorio.')
        expect(validateArrayField([])).toBe('Campo obligatorio.')
    })

    it('resolves validateEmail invalid-format message from global config', () => {
        useUtilsConfig().validation.invalidEmailMessage = () => 'Correo inválido.'

        expect(validateEmail('not-an-email')).toBe('Correo inválido.')
    })

    it('resolves validatePasswordMatch mismatch message from global config', () => {
        useUtilsConfig().validation.passwordsDoNotMatchMessage = () => 'Las contraseñas no coinciden.'

        expect(validatePasswordMatch('secret1', 'secret2')).toBe('Las contraseñas no coinciden.')
    })

    it('resolves validateDateRange messages from global config', () => {
        useUtilsConfig().validation.invalidDateRangeMessage = () => 'Rango de fechas inválido.'

        expect(validateDateRange('2025-01-10', '2025-01-01')).toBe('Rango de fechas inválido.')
    })

    it('resolves validateUrl invalid message from global config', () => {
        useUtilsConfig().validation.invalidUrlMessage = () => 'URL inválida.'

        expect(validateUrl('not-a-url')).toBe('URL inválida.')
    })
})
