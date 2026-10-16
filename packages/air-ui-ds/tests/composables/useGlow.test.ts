import { useGlow } from '@/composables/useGlow'
import { GlowTrigger, GlowColorMode, GlowType } from '@/models/enums/glow'

describe('useGlow', () => {
    it('returns no classes for none', () => {
        expect(useGlow(GlowColorMode.NONE).glowClass.value).toEqual([])
    })

    it('returns no classes when the type is undefined', () => {
        expect(useGlow(undefined).glowClass.value).toEqual([])
    })

    it('applies the glow in both themes', () => {
        const classes = useGlow(GlowColorMode.BOTH).glowClass.value
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(true)
        expect(classes).not.toContain('[.dark_&]:shadow-none')
    })

    it('applies the glow only in light mode', () => {
        const classes = useGlow(GlowColorMode.LIGHT).glowClass.value
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(true)
        expect(classes).toContain('[.dark_&]:shadow-none')
    })

    it('applies the glow only in dark mode', () => {
        const classes = useGlow(GlowColorMode.DARK).glowClass.value
        expect(classes.some((c) => c.startsWith('[.dark_&]:shadow-['))).toBe(true)
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(false)
    })

    it('reacts to a ref', () => {
        const type = ref<GlowColorMode>(GlowColorMode.NONE)
        const { glowClass } = useGlow(type)
        expect(glowClass.value).toEqual([])

        type.value = GlowColorMode.BOTH
        expect(glowClass.value.length).toBeGreaterThan(0)
    })

    it('appends the color and size classes only when the glow is active', () => {
        const options = { colorClass: '[--glow-color:red]', sizeClass: '[--glow-size:8px]' }

        expect(useGlow(GlowColorMode.DARK, options).glowClass.value).toEqual(
            expect.arrayContaining(['[--glow-color:red]', '[--glow-size:8px]']),
        )
        expect(useGlow(GlowColorMode.NONE, options).glowClass.value).toEqual([])
    })

    it('shows the glow always by default', () => {
        const classes = useGlow(GlowColorMode.BOTH).glowClass.value
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(true)
        expect(classes.some((c) => c.includes('hover:') || c.includes('focus-visible:'))).toBe(false)
    })

    it('shows the glow on hover only', () => {
        const classes = useGlow(GlowColorMode.BOTH, { trigger: GlowTrigger.HOVER }).glowClass.value
        expect(classes.some((c) => c.startsWith('hover:shadow-['))).toBe(true)
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(false)
        expect(classes.some((c) => c.startsWith('focus-visible:'))).toBe(false)
    })

    it('shows the glow on keyboard focus only', () => {
        const classes = useGlow(GlowColorMode.BOTH, { trigger: GlowTrigger.FOCUS }).glowClass.value
        expect(classes.some((c) => c.startsWith('focus-visible:shadow-['))).toBe(true)
        expect(classes.some((c) => c.startsWith('hover:'))).toBe(false)
    })

    it('shows the glow on hover and focus', () => {
        const classes = useGlow(GlowColorMode.BOTH, { trigger: GlowTrigger.HOVER_FOCUS }).glowClass.value
        expect(classes.some((c) => c.startsWith('hover:shadow-['))).toBe(true)
        expect(classes.some((c) => c.startsWith('focus-visible:shadow-['))).toBe(true)
    })

    it('combines the theme with the trigger in dark mode', () => {
        const classes = useGlow(GlowColorMode.DARK, { trigger: GlowTrigger.HOVER }).glowClass.value
        expect(classes.some((c) => c.startsWith('[.dark_&]:hover:shadow-['))).toBe(true)
        expect(classes.some((c) => c.startsWith('shadow-['))).toBe(false)
    })

    it('turns the light glow off in dark mode for the same trigger', () => {
        const classes = useGlow(GlowColorMode.LIGHT, { trigger: GlowTrigger.HOVER_FOCUS }).glowClass.value
        expect(classes).toContain('[.dark_&]:hover:shadow-none')
        expect(classes).toContain('[.dark_&]:focus-visible:shadow-none')
    })

    it('reacts to a ref trigger', () => {
        const trigger = ref<GlowTrigger>(GlowTrigger.ALWAYS)
        const { glowClass } = useGlow(GlowColorMode.BOTH, { trigger })
        expect(glowClass.value.some((c) => c.startsWith('shadow-['))).toBe(true)

        trigger.value = GlowTrigger.HOVER
        expect(glowClass.value.some((c) => c.startsWith('hover:shadow-['))).toBe(true)
    })

    it('uses focus-within instead of focus-visible when focusWithin is set', () => {
        const classes = useGlow(GlowColorMode.LIGHT, { trigger: GlowTrigger.HOVER_FOCUS, focusWithin: true }).glowClass
            .value
        expect(classes.some((c) => c.startsWith('focus-within:shadow-['))).toBe(true)
        expect(classes).toContain('[.dark_&]:focus-within:shadow-none')
        expect(classes.some((c) => c.includes('focus-visible'))).toBe(false)
        expect(classes.some((c) => c.startsWith('hover:shadow-['))).toBe(true)
    })

    it('draws the glow outside by default', () => {
        const classes = useGlow(GlowColorMode.BOTH).glowClass.value
        expect(classes.some((c) => c.startsWith('shadow-[0_0_'))).toBe(true)
        expect(classes.some((c) => c.includes('inset_'))).toBe(false)
    })

    it('draws the glow inside when the type is inner', () => {
        const classes = useGlow(GlowColorMode.BOTH, { type: GlowType.INNER }).glowClass.value
        expect(classes.some((c) => c.startsWith('shadow-[inset_0_0_'))).toBe(true)
    })

    it('keeps the trigger and the theme with the inner type', () => {
        const classes = useGlow(GlowColorMode.LIGHT, { type: GlowType.INNER, trigger: GlowTrigger.HOVER }).glowClass
            .value
        expect(classes.some((c) => c.startsWith('hover:shadow-[inset_'))).toBe(true)
        expect(classes).toContain('[.dark_&]:hover:shadow-none')

        const dark = useGlow(GlowColorMode.DARK, { type: GlowType.INNER }).glowClass.value
        expect(dark.some((c) => c.startsWith('[.dark_&]:shadow-[inset_'))).toBe(true)
    })

    it('adds no opacity class for the default opacity', () => {
        expect(useGlow(GlowColorMode.BOTH).glowClass.value.some((c) => c.includes('--glow-opacity:'))).toBe(false)
        expect(
            useGlow(GlowColorMode.BOTH, { opacity: 55 }).glowClass.value.some((c) => c.includes('--glow-opacity:')),
        ).toBe(false)
    })

    it.each([
        [0, '[--glow-opacity:0%]'],
        [20, '[--glow-opacity:20%]'],
        [87, '[--glow-opacity:85%]'],
        [100, '[--glow-opacity:100%]'],
        [250, '[--glow-opacity:100%]'],
        [-10, '[--glow-opacity:0%]'],
        ['30', '[--glow-opacity:30%]'],
    ])('sets the opacity class for %s', (opacity, expected) => {
        expect(useGlow(GlowColorMode.BOTH, { opacity }).glowClass.value).toContain(expected)
    })

    it('falls back to the default opacity for a value that is not a number', () => {
        const classes = useGlow(GlowColorMode.BOTH, { opacity: 'abc' }).glowClass.value
        expect(classes.some((c) => c.includes('--glow-opacity:'))).toBe(false)
    })

    it('adds no opacity class when the glow is off', () => {
        expect(useGlow(GlowColorMode.NONE, { opacity: 20 }).glowClass.value).toEqual([])
    })

    it('keeps the size class of the component when no custom size is set', () => {
        const classes = useGlow(GlowColorMode.BOTH, { sizeClass: '[--glow-size:12px]', size: null }).glowClass.value
        expect(classes).toContain('[--glow-size:12px]')
    })

    it.each([
        [0, '[--glow-size:0px]'],
        [20, '[--glow-size:20px]'],
        [13, '[--glow-size:14px]'],
        [64, '[--glow-size:64px]'],
        [500, '[--glow-size:64px]'],
        [-8, '[--glow-size:0px]'],
        ['30', '[--glow-size:30px]'],
    ])('replaces the component size with a custom size of %s', (size, expected) => {
        const classes = useGlow(GlowColorMode.BOTH, { sizeClass: '[--glow-size:12px]', size }).glowClass.value
        expect(classes).toContain(expected)
        expect(classes).not.toContain('[--glow-size:12px]')
    })

    it('adds no size class when the glow is off', () => {
        expect(useGlow(GlowColorMode.NONE, { size: 20 }).glowClass.value).toEqual([])
    })
})
