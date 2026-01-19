import { mount } from '@vue/test-utils'
import ListItem from '@/components/lists/ListItem.vue'
import Icon from '@/components/icons/Icon.vue'
import { ListItemSize } from '#imports'

const factory = (props = {}, options = {}) => {
    return mount(ListItem, {
        props,
        slots: {
            default: 'List item content'
        },
        global: {
            components: {
                Icon
            }
        },
        ...options
    })
}

describe('ListItem.vue', () => {
    it('renders as a <li> element', () => {
        const wrapper = factory()
        expect(wrapper.element.tagName).toBe('LI')
    })

    it('renders slot content', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('List item content')
    })

    it('does not render Icon when no icon is provided', () => {
        const wrapper = factory()
        const icon = wrapper.findComponent(Icon)

        expect(icon.exists()).toBe(false)
    })

    it('renders Icon when icon is provided', () => {
        const wrapper = factory({ icon: 'mdi:help' })
        const icon = wrapper.findComponent(Icon)

        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:help')

        // Default size is SM
        expect(icon.classes()).toContain('w-[20px]')
        expect(icon.classes()).toContain('h-[20px]')
        expect(icon.classes()).toContain('text-icon-secondary-brand-default')
    })

    it('applies custom iconClass', () => {
        const wrapper = factory({
            icon: 'mdi:check',
            iconClass: 'text-green-500'
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.classes()).toContain('text-green-500')
    })

    it('applies correct icon size classes when size is MD', () => {
        const wrapper = factory({
            icon: 'mdi:check',
            size: ListItemSize.MD
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.classes()).toContain('w-[24px]')
        expect(icon.classes()).toContain('h-[24px]')
    })

    it('applies correct content text size class when size is XS', () => {
        const wrapper = factory({
            size: ListItemSize.XS
        })

        const content = wrapper.find('span')
        expect(content.classes()).toContain('text-xs')
    })

    it('adds py-4 class when spaced is true', () => {
        const wrapper = factory({ spaced: true })
        expect(wrapper.classes()).toContain('py-4')
    })

    it('does not add py-4 class when spaced is false', () => {
        const wrapper = factory({ spaced: false })
        expect(wrapper.classes()).not.toContain('py-4')
    })
})
