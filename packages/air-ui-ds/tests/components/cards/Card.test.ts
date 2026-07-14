import { mount } from '@vue/test-utils'
import Card from '@/components/cards/Card.vue'

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
            ...options.props
        },
        slots: {
            default: '<p>Default Slot Content</p>',
            ...options.slots
        }
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
                default: '<p>Card Content</p>'
            }
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
            hasBackgroundHover: false
        })
    })
})
