import { mount } from '@vue/test-utils'
import NavSidebarMenuSectionTitle from '@/components/navigation/nav-sidebar/NavSidebarMenuSectionTitle.vue'
import { MdiIcon } from '#components'
import Divider from '~/components/dividers/Divider.vue'
import { SidebarNavMenuItemStyleType } from '#imports'

const factory = (props = {}) =>
    mount(NavSidebarMenuSectionTitle, {
        props,
        global: {
            components: { MdiIcon, Divider }
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

    it('does not render MdiIcon if icon is not provided', () => {
        const wrapper = factory()
        expect(wrapper.findComponent(MdiIcon).exists()).toBe(false)
    })

    it('renders MdiIcon with correct icon prop and class', () => {
        const wrapper = factory({ icon: 'mdiFolder' })

        const icon = wrapper.findComponent(MdiIcon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdiFolder')
        expect(icon.classes()).toContain('text-icon-neutral-subtle')
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
