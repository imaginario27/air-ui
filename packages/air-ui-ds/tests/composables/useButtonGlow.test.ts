import { useButtonGlow } from '@/composables/useButtonGlow'
import { ButtonSize, ButtonStyleType } from '@/models/enums/buttons'
import { GlowTrigger, GlowColorMode, GlowType } from '@/models/enums/glow'

const base = { styleType: ButtonStyleType.PRIMARY_BRAND_FILLED, size: ButtonSize.LG }

describe('useButtonGlow', () => {
    it('has no glow when the type is none or not set', () => {
        expect(useButtonGlow(base).glowClass.value).toEqual([])
        expect(useButtonGlow({ ...base, glowColorMode: GlowColorMode.NONE }).glowClass.value).toEqual([])
    })

    it('draws the glow when the type is set', () => {
        expect(useButtonGlow({ ...base, glowColorMode: GlowColorMode.BOTH }).glowClass.value.length).toBeGreaterThan(0)
    })

    it('sets the color from the style type and the spread from the size', () => {
        const classes = useButtonGlow({
            glowColorMode: GlowColorMode.DARK,
            styleType: ButtonStyleType.DELETE_SOFT,
            size: ButtonSize.XS,
        }).glowClass.value

        expect(classes).toContain('[--glow-color:var(--color-background-delete-default)]')
        expect(classes).toContain('[--glow-size:4px]')
    })

    it('follows the glow trigger', () => {
        const hover = useButtonGlow({ ...base, glowColorMode: GlowColorMode.BOTH, glowTrigger: GlowTrigger.HOVER })
            .glowClass.value
        expect(hover.some((c) => c.startsWith('hover:shadow-['))).toBe(true)
        expect(hover.some((c) => c.startsWith('shadow-['))).toBe(false)

        const focus = useButtonGlow({ ...base, glowColorMode: GlowColorMode.BOTH, glowTrigger: GlowTrigger.FOCUS })
            .glowClass.value
        expect(focus.some((c) => c.startsWith('focus-visible:shadow-['))).toBe(true)
    })

    it.each([
        [ButtonStyleType.PRIMARY_BRAND_FILLED, '[--glow-color:var(--color-text-neutral-on-filled)]'],
        [ButtonStyleType.SECONDARY_BRAND_FILLED, '[--glow-color:var(--color-text-neutral-on-filled)]'],
        [ButtonStyleType.DELETE_FILLED, '[--glow-color:var(--color-text-neutral-on-filled)]'],
        [ButtonStyleType.NEUTRAL_FILLED, '[--glow-color:var(--color-text-neutral-on-neutral-filled-bg)]'],
    ])('uses a contrasting color for an inner glow on %s', (styleType, expected) => {
        const classes = useButtonGlow({
            ...base,
            styleType,
            glowColorMode: GlowColorMode.BOTH,
            glowType: GlowType.INNER,
        }).glowClass.value
        expect(classes).toContain(expected)
    })

    it('keeps the style color for an outer glow on a filled button', () => {
        const classes = useButtonGlow({
            ...base,
            styleType: ButtonStyleType.PRIMARY_BRAND_FILLED,
            glowColorMode: GlowColorMode.BOTH,
        }).glowClass.value
        expect(classes).toContain('[--glow-color:var(--color-background-primary-brand-default)]')
    })

    it('keeps the style color for an inner glow on a button that is not filled', () => {
        const classes = useButtonGlow({
            ...base,
            styleType: ButtonStyleType.PRIMARY_BRAND_SOFT,
            glowColorMode: GlowColorMode.BOTH,
            glowType: GlowType.INNER,
        }).glowClass.value
        expect(classes).toContain('[--glow-color:var(--color-background-primary-brand-default)]')
    })

    it('uses a custom glow size instead of the one that follows the button size', () => {
        const classes = useButtonGlow({ ...base, glowColorMode: GlowColorMode.BOTH, glowSize: 40 }).glowClass.value
        expect(classes).toContain('[--glow-size:40px]')
        expect(classes).not.toContain('[--glow-size:16px]')
    })
})
