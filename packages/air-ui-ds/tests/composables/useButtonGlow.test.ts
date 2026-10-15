import { useButtonGlow } from '@/composables/useButtonGlow'
import { ButtonSize, ButtonStyleType } from '@/models/enums/buttons'
import { GlowTrigger, GlowType } from '@/models/enums/glow'

const base = { styleType: ButtonStyleType.PRIMARY_BRAND_FILLED, size: ButtonSize.LG }

describe('useButtonGlow', () => {
    it('has no glow when the type is none or not set', () => {
        expect(useButtonGlow(base).glowClass.value).toEqual([])
        expect(useButtonGlow({ ...base, glowType: GlowType.NONE }).glowClass.value).toEqual([])
    })

    it('draws the glow when the type is set', () => {
        expect(useButtonGlow({ ...base, glowType: GlowType.BOTH }).glowClass.value.length).toBeGreaterThan(0)
    })

    it('sets the color from the style type and the spread from the size', () => {
        const classes = useButtonGlow({
            glowType: GlowType.DARK,
            styleType: ButtonStyleType.DELETE_SOFT,
            size: ButtonSize.XS,
        }).glowClass.value

        expect(classes).toContain('[--glow-color:var(--color-background-delete-default)]')
        expect(classes).toContain('[--glow-size:8px]')
    })

    it('follows the glow trigger', () => {
        const hover = useButtonGlow({ ...base, glowType: GlowType.BOTH, glowTrigger: GlowTrigger.HOVER }).glowClass.value
        expect(hover.some((c) => c.startsWith('hover:shadow-['))).toBe(true)
        expect(hover.some((c) => c.startsWith('shadow-['))).toBe(false)

        const focus = useButtonGlow({ ...base, glowType: GlowType.BOTH, glowTrigger: GlowTrigger.FOCUS }).glowClass.value
        expect(focus.some((c) => c.startsWith('focus-visible:shadow-['))).toBe(true)
    })
})
