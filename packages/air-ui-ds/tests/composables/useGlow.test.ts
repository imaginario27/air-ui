import { useGlow } from '@/composables/useGlow'
import { GlowTrigger, GlowType } from '@/models/enums/glow'

describe('useGlow', () => {
    it('returns no classes for none', () => {
        expect(useGlow(GlowType.NONE).glowClass.value).toEqual([])
    })

    it('returns no classes when the type is undefined', () => {
        expect(useGlow(undefined).glowClass.value).toEqual([])
    })

    it('applies the glow in both themes', () => {
        const classes = useGlow(GlowType.BOTH).glowClass.value
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(true)
        expect(classes).not.toContain('[.dark_&]:shadow-none')
    })

    it('applies the glow only in light mode', () => {
        const classes = useGlow(GlowType.LIGHT).glowClass.value
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(true)
        expect(classes).toContain('[.dark_&]:shadow-none')
    })

    it('applies the glow only in dark mode', () => {
        const classes = useGlow(GlowType.DARK).glowClass.value
        expect(classes.some((c) => c.startsWith('[.dark_&]:shadow-['))).toBe(true)
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(false)
    })

    it('reacts to a ref', () => {
        const type = ref<GlowType>(GlowType.NONE)
        const { glowClass } = useGlow(type)
        expect(glowClass.value).toEqual([])

        type.value = GlowType.BOTH
        expect(glowClass.value.length).toBeGreaterThan(0)
    })

    it('appends the color and size classes only when the glow is active', () => {
        const options = { colorClass: '[--glow-color:red]', sizeClass: '[--glow-size:8px]' }

        expect(useGlow(GlowType.DARK, options).glowClass.value).toEqual(
            expect.arrayContaining(['[--glow-color:red]', '[--glow-size:8px]']),
        )
        expect(useGlow(GlowType.NONE, options).glowClass.value).toEqual([])
    })

    it('shows the glow always by default', () => {
        const classes = useGlow(GlowType.BOTH).glowClass.value
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(true)
        expect(classes.some((c) => c.includes('hover:') || c.includes('focus-visible:'))).toBe(false)
    })

    it('shows the glow on hover only', () => {
        const classes = useGlow(GlowType.BOTH, { trigger: GlowTrigger.HOVER }).glowClass.value
        expect(classes.some((c) => c.startsWith('hover:shadow-['))).toBe(true)
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(false)
        expect(classes.some((c) => c.startsWith('focus-visible:'))).toBe(false)
    })

    it('shows the glow on keyboard focus only', () => {
        const classes = useGlow(GlowType.BOTH, { trigger: GlowTrigger.FOCUS }).glowClass.value
        expect(classes.some((c) => c.startsWith('focus-visible:shadow-['))).toBe(true)
        expect(classes.some((c) => c.startsWith('hover:'))).toBe(false)
    })

    it('shows the glow on hover and focus', () => {
        const classes = useGlow(GlowType.BOTH, { trigger: GlowTrigger.HOVER_FOCUS }).glowClass.value
        expect(classes.some((c) => c.startsWith('hover:shadow-['))).toBe(true)
        expect(classes.some((c) => c.startsWith('focus-visible:shadow-['))).toBe(true)
    })

    it('combines the theme with the trigger in dark mode', () => {
        const classes = useGlow(GlowType.DARK, { trigger: GlowTrigger.HOVER }).glowClass.value
        expect(classes.some((c) => c.startsWith('[.dark_&]:hover:shadow-['))).toBe(true)
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(false)
    })

    it('turns the light glow off in dark mode for the same trigger', () => {
        const classes = useGlow(GlowType.LIGHT, { trigger: GlowTrigger.HOVER_FOCUS }).glowClass.value
        expect(classes).toContain('[.dark_&]:hover:shadow-none')
        expect(classes).toContain('[.dark_&]:focus-visible:shadow-none')
    })

    it('reacts to a ref trigger', () => {
        const trigger = ref<GlowTrigger>(GlowTrigger.ALWAYS)
        const { glowClass } = useGlow(GlowType.BOTH, { trigger })
        expect(glowClass.value.some((c) => c.startsWith('shadow-['))).toBe(true)

        trigger.value = GlowTrigger.HOVER
        expect(glowClass.value.some((c) => c.startsWith('hover:shadow-['))).toBe(true)
    })
})
