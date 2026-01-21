import { mount } from '@vue/test-utils'
import ListItem from '@/components/lists/ListItem.vue'
import Icon from '@/components/icons/Icon.vue'
import { ListItemSize } from '@/models/enums/lists'

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

    it('does not render Icon when markerIcon is not provided', () => {
        const wrapper = factory()
        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(false)
    })

    it('renders Icon when markerIcon is provided', () => {
        const wrapper = factory({ markerIcon: 'mdi:help' })
        const icon = wrapper.findComponent(Icon)

        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:help')

        const iconClasses = icon.props('iconClass')
        expect(iconClasses).toContain('text-icon-secondary-brand-default')
        expect(iconClasses.some(cls => cls.includes('w-[20px]'))).toBe(true)
    })

    it('applies custom markerIconClass', () => {
        const wrapper = factory({
            markerIcon: 'mdi:check',
            markerIconClass: 'text-green-500'
        })

        const icon = wrapper.findComponent(Icon)
        const iconClasses = icon.props('iconClass')
        expect(iconClasses).toContain('text-green-500')
    })

    it('applies correct icon size classes when size is MD', () => {
        const wrapper = factory({
            markerIcon: 'mdi:check',
            size: ListItemSize.MD
        })

        const icon = wrapper.findComponent(Icon)
        const iconClasses = icon.props('iconClass')
        expect(iconClasses.some(cls => cls.includes('w-[24px]'))).toBe(true)
        expect(iconClasses.some(cls => cls.includes('h-[24px]'))).toBe(true)
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
