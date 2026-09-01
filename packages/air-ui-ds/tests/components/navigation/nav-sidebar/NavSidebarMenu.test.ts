import { mount } from '@vue/test-utils'
import NavSidebarMenu from '@/components/navigation/nav-sidebar/NavSidebarMenu.vue'

describe('NavSidebarMenu.vue', () => {
    const factory = (props = {}, slots = {}) =>
        mount(NavSidebarMenu, {
            props,
            slots,
        })

    it('renders slot content', () => {
        const wrapper = factory({}, {
            default: '<div class="test-slot">Slot Content</div>'
        })

        const slot = wrapper.find('.test-slot')
        expect(slot.exists()).toBe(true)
        expect(slot.text()).toBe('Slot Content')
    })

    it('adds overflow-y-auto class when isCollapsed is false', () => {
        const wrapper = factory({ isCollapsed: false })
        expect(wrapper.find('nav').classes()).toContain('overflow-y-auto')
    })

    it('does not add overflow-y-auto class when isCollapsed is true', () => {
        const wrapper = factory({ isCollapsed: true })
        expect(wrapper.find('nav').classes()).not.toContain('overflow-y-auto')
    })

    it('reserves a stable scrollbar gutter on the scroll container when expanded', () => {
        expect(factory({ isCollapsed: false }).find('nav').classes()).toContain('scrollbar-gutter-stable')
        expect(factory({ isCollapsed: true }).find('nav').classes()).not.toContain('scrollbar-gutter-stable')
    })
})
