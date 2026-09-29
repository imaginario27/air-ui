import { useDSConfig } from '@/composables/useDSConfig'

describe('useDSConfig', () => {
    it('returns expected default options', () => {
        const config = useDSConfig()

        expect(config.forms.optionalLabelText()).toBe('(optional)')
    })

    it('is reactive and allows overriding the resolver function', () => {
        const config = useDSConfig()

        config.forms.optionalLabelText = () => '(opcional)'

        expect(config.forms.optionalLabelText()).toBe('(opcional)')
        expect(useDSConfig().forms.optionalLabelText()).toBe('(opcional)')

        config.forms.optionalLabelText = () => '(optional)'
    })
})
