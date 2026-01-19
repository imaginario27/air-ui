import { mount } from '@vue/test-utils'
import NavLink from '@/components/navigation/links/NavLink.vue'
import Icon from '@/components/icons/Icon.vue'
import { IconPosition } from '@/models/enums/icons'
import { NavLinkSize } from '#imports'

const factory = (props?: Partial<InstanceType<typeof NavLink>['$props']>) => {
    return mount(NavLink, {
        props: {
            text: 'Test Link',
            ...props,
        },
        global: {
            components: {
                Icon,
            },
            stubs: {
                NuxtLink: {
                    template: '<a :href="to" :target="target" :rel="rel"><slot /></a>',
                    props: ['to', 'external', 'rel', 'target'],
                },
            },
        },
    })
}

describe('NavLink', () => {
    it('renders link text correctly', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Test Link')
    })

    it('renders left icon when iconPosition is LEFT', () => {
        const wrapper = factory({
            iconPosition: IconPosition.LEFT,
            icon: 'mdi:check',
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:check')
    })

    it('renders right icon when iconPosition is RIGHT', () => {
        const wrapper = factory({
            iconPosition: IconPosition.RIGHT,
            icon: 'mdi:arrow-right',
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:arrow-right')
    })

    it('does not render icon when iconPosition is NONE', () => {
        const wrapper = factory({
            iconPosition: IconPosition.NONE,
            icon: 'mdi:close',
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(false)
    })

    it('renders as external link with correct attributes', () => {
        const wrapper = factory({
            isExternal: true,
            to: 'https://external.com',
        })

        const link = wrapper.find('a')
        expect(link.attributes('href')).toBe('https://external.com')
        expect(link.attributes('target')).toBe('_blank')
        expect(link.attributes('rel')).toBe('noopener noreferrer')
    })

    it('renders as internal link with default attributes', () => {
        const wrapper = factory({
            isExternal: false,
            to: '/internal',
        })

        const link = wrapper.find('a')
        expect(link.attributes('href')).toBe('/internal')
        expect(link.attributes('target')).toBe('_self')
        expect(link.attributes('rel')).toBeUndefined()
    })

    it('disables navigation when disabled is true', () => {
        const wrapper = factory({ disabled: true })

        const link = wrapper.find('a')
        expect(link.attributes('href')).toBeUndefined()
    })

    it('applies correct text size and gap class based on size', () => {
        const wrapper = factory({ size: NavLinkSize.LG })

        const textSpan = wrapper.find('span')
        expect(textSpan.classes()).toContain('text-lg')

        const iconWrapper = wrapper.find('div.group')
        expect(iconWrapper.classes()).toContain('gap-2')
    })

    it('applies disabled styles when disabled is true', () => {
        const wrapper = factory({ disabled: true })

        const iconWrapper = wrapper.find('div.group')
        expect(iconWrapper.classes()).toContain('opacity-disabled')
        expect(iconWrapper.classes()).toContain('cursor-not-allowed')
    })
})
