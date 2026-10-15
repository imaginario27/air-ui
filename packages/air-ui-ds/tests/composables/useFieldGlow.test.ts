import { useFieldGlow } from '@/composables/useFieldGlow'
import { GlowColorMode, GlowTrigger } from '@/models/enums/glow'
import { InputSize } from '@/models/enums/formFields'

describe('useFieldGlow', () => {
    it('has no glow when the mode is none or not set', () => {
        expect(useFieldGlow({}).glowClass.value).toEqual([])
        expect(useFieldGlow({ glowColorMode: GlowColorMode.NONE }).glowClass.value).toEqual([])
    })

    it('uses the brand color and turns to the error color on error', () => {
        const props = { glowColorMode: GlowColorMode.BOTH }
        expect(useFieldGlow(props).glowClass.value).toContain(
            '[--glow-color:var(--color-border-primary-brand-default)]',
        )
        expect(useFieldGlow(props, true).glowClass.value).toContain('[--glow-color:var(--color-border-error)]')
    })

    it('spreads the glow after the size', () => {
        expect(useFieldGlow({ glowColorMode: GlowColorMode.BOTH, size: InputSize.MD }).glowClass.value).toContain(
            '[--glow-size:12px]',
        )
        expect(useFieldGlow({ glowColorMode: GlowColorMode.BOTH, size: InputSize.LG }).glowClass.value).toContain(
            '[--glow-size:16px]',
        )
    })

    it('triggers the focus glow with focus-within', () => {
        const classes = useFieldGlow({ glowColorMode: GlowColorMode.BOTH, glowTrigger: GlowTrigger.FOCUS }).glowClass
            .value
        expect(classes.some((c) => c.startsWith('focus-within:shadow-['))).toBe(true)
    })
})
