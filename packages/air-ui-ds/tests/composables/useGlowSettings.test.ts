import { useGlowSettings } from '@/composables/useGlowSettings'
import { useDSConfig } from '@/composables/useDSConfig'
import { GlowColorMode, GlowTrigger, GlowType } from '@/models/enums/glow'

describe('useGlowSettings', () => {
    const glow = useDSConfig().glow
    const original = {
        card: { ...glow.card },
        button: { ...glow.button },
        input: { ...glow.input },
    }

    afterEach(() => {
        Object.assign(glow.card, original.card)
        Object.assign(glow.button, original.button)
        Object.assign(glow.input, original.input)
    })

    it('uses the built-in defaults of the DS config when nothing is set', () => {
        const settings = useGlowSettings('button', {})
        expect(settings.colorMode.value).toBe(GlowColorMode.NONE)
        expect(settings.trigger.value).toBe(GlowTrigger.ALWAYS)
        expect(settings.type.value).toBe(GlowType.OUTER)
        expect(settings.opacity.value).toBe(40)
        expect(settings.size.value).toBeNull()
    })

    it('uses the values set in the DS config for the family', () => {
        Object.assign(glow.button, {
            colorMode: GlowColorMode.BOTH,
            trigger: GlowTrigger.HOVER,
            type: GlowType.INNER,
            opacity: 30,
            size: 24,
        })
        const settings = useGlowSettings('button', {})
        expect(settings.colorMode.value).toBe(GlowColorMode.BOTH)
        expect(settings.trigger.value).toBe(GlowTrigger.HOVER)
        expect(settings.type.value).toBe(GlowType.INNER)
        expect(settings.opacity.value).toBe(30)
        expect(settings.size.value).toBe(24)
    })

    it('lets a prop win over the DS config', () => {
        Object.assign(glow.input, { colorMode: GlowColorMode.BOTH, opacity: 30, size: 24 })
        const settings = useGlowSettings('input', {
            glowColorMode: GlowColorMode.DARK,
            glowOpacity: 0,
            glowSize: 8,
        })
        expect(settings.colorMode.value).toBe(GlowColorMode.DARK)
        expect(settings.opacity.value).toBe(0)
        expect(settings.size.value).toBe(8)
    })

    it('keeps each family independent', () => {
        glow.card.colorMode = GlowColorMode.LIGHT
        expect(useGlowSettings('card', {}).colorMode.value).toBe(GlowColorMode.LIGHT)
        expect(useGlowSettings('button', {}).colorMode.value).toBe(GlowColorMode.NONE)
        expect(useGlowSettings('input', {}).colorMode.value).toBe(GlowColorMode.NONE)
    })

    it('reacts to a change of the DS config', () => {
        const settings = useGlowSettings('card', {})
        expect(settings.colorMode.value).toBe(GlowColorMode.NONE)

        glow.card.colorMode = GlowColorMode.BOTH
        expect(settings.colorMode.value).toBe(GlowColorMode.BOTH)
    })
})
