import { useUtilsConfig } from '../../composables/useUtilsConfig'

describe('useUtilsConfig', () => {
    it('returns expected default options', () => {
        const config = useUtilsConfig()

        expect(config.validation.requiredFieldMessage()).toBe('This field is required.')
        expect(config.validation.invalidEmailMessage()).toBe('Invalid email address.')
        expect(config.validation.passwordsDoNotMatchMessage()).toBe('Passwords do not match.')
        expect(config.validation.invalidDateRangeMessage()).toBe('Start date must be before or equal to end date')
        expect(config.validation.invalidUrlMessage()).toBe('Invalid URL.')
    })

    it('is reactive and allows overriding the resolver function', () => {
        const config = useUtilsConfig()

        config.validation.requiredFieldMessage = () => 'Este campo es obligatorio.'

        expect(config.validation.requiredFieldMessage()).toBe('Este campo es obligatorio.')
        expect(useUtilsConfig().validation.requiredFieldMessage()).toBe('Este campo es obligatorio.')

        config.validation.requiredFieldMessage = () => 'This field is required.'
    })
})
