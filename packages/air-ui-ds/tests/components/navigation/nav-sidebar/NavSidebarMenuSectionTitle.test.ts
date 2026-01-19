import { mount } from '@vue/test-utils'
import NavSidebarMenuSectionTitle from '@/components/navigation/nav-sidebar/NavSidebarMenuSectionTitle.vue'
import Icon from '@/components/icons/Icon.vue'
import Divider from '~/components/dividers/Divider.vue'

const factory = (props = {}) =>
    mount(NavSidebarMenuSectionTitle, {
        props,
        global: {
            components: { Icon, Divider }
        }
    })

describe('NavSidebarMenuSectionTitle.vue', () => {
    it('renders with default text when no props are passed', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Item text')
    })

    it('renders custom text when text prop is provided', () => {
        const wrapper = factory({ text: 'Section Title' })
        expect(wrapper.text()).toContain('Section Title')
    })

    it('does not render Icon if icon is not provided', () => {
        const wrapper = factory()
        expect(wrapper.findComponent(Icon).exists()).toBe(false)
    })

    it('renders Icon with correct name prop and class', () => {
        const wrapper = factory({ icon: 'mdi:folder' })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:folder')
        expect(icon.classes().some(cls => cls.includes('text-icon-neutral-subtle'))).toBe(true)
    })

    it('renders Divider when isCollapsed is true and showCollapseDivider is true', () => {
        const wrapper = factory({
            isCollapsed: true,
            showCollapseDivider: true
        })

        expect(wrapper.findComponent(Divider).exists()).toBe(true)
        expect(wrapper.text()).not.toContain('Item text') // Main div is hidden when collapsed
    })

    it('does not render Divider when isCollapsed is true and showCollapseDivider is false', () => {
        const wrapper = factory({
            isCollapsed: true,
            showCollapseDivider: false
        })

        expect(wrapper.findComponent(Divider).exists()).toBe(false)
        expect(wrapper.text()).not.toContain('Item text')
    })

    it('renders main content when isCollapsed is false (default)', () => {
        const wrapper = factory()
        expect(wrapper.find('div').exists()).toBe(true)
        expect(wrapper.findComponent(Divider).exists()).toBe(false)
    })
})
