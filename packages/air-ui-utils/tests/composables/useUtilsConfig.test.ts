import { useUtilsConfig } from '../../composables/useUtilsConfig'

describe('useUtilsConfig', () => {
    it('returns expected default options', () => {
        const config = useUtilsConfig()

        expect(config.validation.requiredFieldMessage()).toBe('This field is required.')
        expect(config.validation.invalidEmailMessage()).toBe('Invalid email address.')
        expect(config.validation.passwordsDoNotMatchMessage()).toBe('Passwords do not match.')
        expect(config.validation.invalidDateRangeMessage()).toBe('Start date must be before or equal to end date')
        expect(config.validation.invalidUrlMessage()).toBe('Invalid URL.')
        expect(config.validation.requiredEmailMessage()).toBe('Email is required.')
        expect(config.validation.minItemsMessage(1)).toBe('At least 1 item required')
        expect(config.validation.minItemsMessage(2)).toBe('At least 2 items required')
        expect(config.validation.maxItemsMessage(1)).toBe('No more than 1 item allowed')
        expect(config.validation.maxItemsMessage(3)).toBe('No more than 3 items allowed')
        expect(config.validation.atLeastOneRuleMessage()).toBe('Add at least one complete rule.')
        expect(config.validation.incompleteRuleMessage()).toBe('Complete all rule fields before continuing.')
        expect(config.validation.maxRulesMessage(1)).toBe('No more than 1 rule allowed.')
        expect(config.validation.maxRulesMessage(2)).toBe('No more than 2 rules allowed.')
        expect(config.common.invalidNumberText()).toBe('Not a valid number')
        expect(config.common.readMoreText()).toBe('Read more')
    })

    it('is reactive and allows overriding the resolver function', () => {
        const config = useUtilsConfig()

        config.validation.requiredFieldMessage = () => 'Este campo es obligatorio.'

        expect(config.validation.requiredFieldMessage()).toBe('Este campo es obligatorio.')
        expect(useUtilsConfig().validation.requiredFieldMessage()).toBe('Este campo es obligatorio.')

        config.validation.requiredFieldMessage = () => 'This field is required.'
    })
})
