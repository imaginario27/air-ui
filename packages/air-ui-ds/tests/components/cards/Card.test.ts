import { mount } from '@vue/test-utils'
import Card from '@/components/cards/Card.vue'
import { useDSConfig } from '@/composables/useDSConfig'
import { GlowTrigger, GlowColorMode, GlowType } from '@/models/enums/glow'

type MountOptions = {
    props?: {
        hasShadow?: boolean
        hasBorder?: boolean
        hasBackgroundHover?: boolean
    }
    slots?: {
        default?: string
    }
}

const factory = (options: MountOptions = {}) => {
    return mount(Card, {
        props: {
            hasShadow: true,
            hasBorder: true,
            hasBackgroundHover: false,
            ...options.props,
        },
        slots: {
            default: '<p>Default Slot Content</p>',
            ...options.slots,
        },
    })
}

describe('Card.vue', () => {
    it('renders the component properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.classes()).toContain('w-full')
        expect(wrapper.classes()).toContain('rounded-lg')
    })

    it('renders default slot content', () => {
        const wrapper = factory({
            slots: {
                default: '<p>Card Content</p>',
            },
        })
        expect(wrapper.html()).toContain('Card Content')
    })

    it('applies shadow class when hasShadow is true', () => {
        const wrapper = factory({ props: { hasShadow: true } })
        expect(wrapper.classes()).toContain('shadow-sm')
    })

    it('does not apply shadow class when hasShadow is false', () => {
        const wrapper = factory({ props: { hasShadow: false } })
        expect(wrapper.classes()).not.toContain('shadow-sm')
    })

    it('applies border classes when hasBorder is true', () => {
        const wrapper = factory({ props: { hasBorder: true } })
        expect(wrapper.classes()).toContain('border')
        expect(wrapper.classes()).toContain('border-border-default')
    })

    it('does not apply border classes when hasBorder is false', () => {
        const wrapper = factory({ props: { hasBorder: false } })
        expect(wrapper.classes()).not.toContain('border')
        expect(wrapper.classes()).not.toContain('border-border-default')
    })

    it('applies hover background and transition classes when hasBackgroundHover is true', () => {
        const wrapper = factory({ props: { hasBackgroundHover: true } })
        expect(wrapper.classes()).toContain('hover:bg-background-neutral-subtlest/40')
        expect(wrapper.classes()).toContain('transition-colors')
        expect(wrapper.classes()).toContain('duration-200')
    })

    it('does not apply hover background and transition classes when hasBackgroundHover is false', () => {
        const wrapper = factory({ props: { hasBackgroundHover: false } })
        expect(wrapper.classes()).not.toContain('hover:bg-background-neutral-subtlest/40')
        expect(wrapper.classes()).not.toContain('transition-colors')
        expect(wrapper.classes()).not.toContain('duration-200')
    })

    it('uses default prop values when none are provided', () => {
        const wrapper = mount(Card)
        expect(wrapper.props()).toMatchObject({
            hasShadow: true,
            hasBorder: true,
            hasBackgroundHover: false,
        })
    })

    describe('glow', () => {
        const hasGlow = (classes: string[]) => classes.some((c) => c.includes('--glow-color'))

        it('has no glow by default', () => {
            const classes = factory().classes()
            expect(hasGlow(classes)).toBe(false)
            expect(classes).toContain('shadow-sm')
        })

        it('shows the glow in dark mode only when glowColorMode is dark', () => {
            const classes = factory({ props: { glowColorMode: GlowColorMode.DARK } }).classes()
            expect(hasGlow(classes)).toBe(true)
            expect(classes.some((c) => c.startsWith('[.dark_&]:shadow-['))).toBe(true)
            expect(classes.some((c) => c.startsWith('shadow-['))).toBe(false)
        })

        it('replaces the resting shadow with an always-on glow', () => {
            const classes = factory({ props: { glowColorMode: GlowColorMode.BOTH } }).classes()
            expect(classes).not.toContain('shadow-sm')
        })

        it('keeps the resting shadow when the glow only shows on hover', () => {
            const classes = factory({
                props: { glowColorMode: GlowColorMode.BOTH, glowTrigger: GlowTrigger.HOVER },
            }).classes()
            expect(classes).toContain('shadow-sm')
            expect(classes.some((c) => c.startsWith('hover:shadow-['))).toBe(true)
        })

        it('replaces the resting shadow with an inner glow, so it can transition from no shadow', () => {
            const classes = factory({
                props: { glowColorMode: GlowColorMode.BOTH, glowTrigger: GlowTrigger.HOVER, glowType: GlowType.INNER },
            }).classes()
            expect(classes).not.toContain('shadow-sm')
            expect(classes.some((c) => c.startsWith('hover:shadow-[inset_'))).toBe(true)
            expect(classes).toContain('transition-[background-color,box-shadow]')
        })

        it('uses focus-within for the focus trigger', () => {
            const classes = factory({
                props: { glowColorMode: GlowColorMode.BOTH, glowTrigger: GlowTrigger.FOCUS },
            }).classes()
            expect(classes.some((c) => c.startsWith('focus-within:shadow-['))).toBe(true)
        })

        it('draws an inner glow', () => {
            const classes = factory({
                props: { glowColorMode: GlowColorMode.BOTH, glowType: GlowType.INNER },
            }).classes()
            expect(classes.some((c) => c.startsWith('shadow-[inset_'))).toBe(true)
        })

        it('sets the glow opacity', () => {
            const classes = factory({ props: { glowColorMode: GlowColorMode.BOTH, glowOpacity: 30 } }).classes()
            expect(classes).toContain('[--glow-opacity:30%]')
        })

        it('uses the neutral color for the glow', () => {
            const classes = factory({ props: { glowColorMode: GlowColorMode.BOTH } }).classes()
            expect(classes).toContain('[--glow-color:var(--color-background-neutral-bold)]')
        })

        describe('DS config', () => {
            const cardConfig = useDSConfig().glow.card
            const original = { ...cardConfig }

            afterEach(() => Object.assign(cardConfig, original))

            it('takes the glow settings from the DS config', () => {
                Object.assign(cardConfig, {
                    colorMode: GlowColorMode.BOTH,
                    type: GlowType.INNER,
                    opacity: 30,
                    size: 24,
                })
                const classes = factory().classes()
                expect(classes.some((c) => c.startsWith('shadow-[inset_'))).toBe(true)
                expect(classes).toContain('[--glow-opacity:30%]')
                expect(classes).toContain('[--glow-size:24px]')
            })

            it('lets a prop override the DS config', () => {
                Object.assign(cardConfig, { colorMode: GlowColorMode.BOTH, opacity: 30 })
                const classes = factory({ props: { glowColorMode: GlowColorMode.NONE } }).classes()
                expect(classes.some((c) => c.includes('--glow-color'))).toBe(false)
                expect(classes).toContain('shadow-sm')

                const opaque = factory({ props: { glowOpacity: 80 } }).classes()
                expect(opaque).toContain('[--glow-opacity:80%]')
            })
        })

        it('sets the glow size', () => {
            const classes = factory({ props: { glowColorMode: GlowColorMode.BOTH, glowSize: 32 } }).classes()
            expect(classes).toContain('[--glow-size:32px]')
            expect(classes).not.toContain('[--glow-size:12px]')
        })

        it('uses the glow transition instead of transition-colors when both apply', () => {
            const classes = factory({
                props: { glowColorMode: GlowColorMode.BOTH, hasBackgroundHover: true },
            }).classes()
            expect(classes).toContain('transition-[background-color,box-shadow]')
            expect(classes).not.toContain('transition-colors')
        })

        it('leaves the glow props unset so the DS config provides them', () => {
            const props = mount(Card).props()
            expect(props.glowColorMode).toBeUndefined()
            expect(props.glowTrigger).toBeUndefined()
            expect(props.glowType).toBeUndefined()
            expect(props.glowOpacity).toBeUndefined()
            expect(props.glowSize).toBeUndefined()
        })
    })
})
