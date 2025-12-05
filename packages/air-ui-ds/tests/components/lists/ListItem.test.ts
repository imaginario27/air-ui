import { mount } from '@vue/test-utils'
import ListItem from '@/components/lists/ListItem.vue'

const factory = (props = {}, options = {}) => {
    return mount(ListItem, {
        props,
        slots: {
            default: 'List item content'
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
        expect(wrapper.text()).toBe('List item content')
    })

    it('does not render MdiIcon if no icon is provided', () => {
        const wrapper = factory()
        expect(wrapper.findComponent({ name: 'MdiIcon' }).exists()).toBe(false)
    })

    it('renders MdiIcon when icon is provided', () => {
        const wrapper = factory({ icon: 'mdiHelp' })
        const icon = wrapper.findComponent({ name: 'MdiIcon' })
        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdiHelp')
        expect(icon.props('size')).toBe('20')
        expect(icon.classes()).toContain('text-icon-secondary-brand-default')
    })

    it('applies custom iconClass', () => {
        const wrapper = factory({
            icon: 'mdiCheck',
            iconClass: 'text-green-500'
        })
        const icon = wrapper.findComponent({ name: 'MdiIcon' })
        expect(icon.classes()).toContain('text-green-500')
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
