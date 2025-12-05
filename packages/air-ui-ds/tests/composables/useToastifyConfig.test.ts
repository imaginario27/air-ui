import { useToastifyConfig } from '@/composables/useToastifyConfig'

describe('useToastifyConfig', () => {
    it('returns expected default options', () => {
        const config = useToastifyConfig()

        expect(config.autoClose).toBe(5000)
        expect(config.position).toBe('bottom-center')
        expect(config.theme).toBe('colored')
    })

    it('is reactive and allows updates', () => {
        const config = useToastifyConfig()

        config.autoClose = 10000
        config.position = 'top-right'
        config.theme = 'light'

        expect(config.autoClose).toBe(10000)
        expect(config.position).toBe('top-right')
        expect(config.theme).toBe('light')
    })
})
