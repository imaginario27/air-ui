import {
    composeArrayValidators,
    createRulesFieldValidator,
    validateAtLeastOneRule,
    validateMaxRules,
    validateRuleCompleteness,
} from '../../utils/formValidation'

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
