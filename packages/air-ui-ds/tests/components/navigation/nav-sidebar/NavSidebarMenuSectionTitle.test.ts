import { mount } from '@vue/test-utils'
import NavSidebarMenuSectionTitle from '@/components/navigation/nav-sidebar/NavSidebarMenuSectionTitle.vue'
import Icon from '@/components/icons/Icon.vue'
import Divider from '~/components/dividers/Divider.vue'
import { SidebarNavMenuItemStyleType } from '#imports'

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

    it('applies nested level styles when level is greater than 1', () => {
        const wrapper = factory({
            level: 2,
            showNestedLevelGuide: true,
        })

        const root = wrapper.find('div')
        expect(root.classes()).toContain('text-sm')
        expect(root.classes()).toContain('font-bold')
        expect(root.classes()).toContain('text-text-neutral-subtle')
        expect(root.classes()).not.toContain('border-l-2')
    })

    it('keeps original level 1 border style', () => {
        const wrapper = factory({
            level: 1,
            showNestedLevelGuide: true,
        })

        const root = wrapper.find('div')
        expect(root.classes()).toContain('border-b')
        expect(root.classes()).not.toContain('border-l-2')
        expect(root.classes()).toContain('font-semibold')
    })

    it('applies bottom margin for expanded level 1 section title', () => {
        const wrapper = factory({
            level: 1,
            isCollapsed: false,
            styleType: SidebarNavMenuItemStyleType.COMPACT,
        })

        const root = wrapper.find('div')
        expect(root.classes()).toContain('mb-1')
    })

    it('does not apply expanded level 1 bottom margin for nested levels', () => {
        const wrapper = factory({
            level: 2,
            isCollapsed: false,
            styleType: SidebarNavMenuItemStyleType.COMPACT,
        })

        const root = wrapper.find('div')
        expect(root.classes()).not.toContain('mb-1')
        expect(root.classes()).not.toContain('mb-2')
    })

    it('applies level 3 guide line with lighter border color', () => {
        const wrapper = factory({
            level: 3,
            showNestedLevelGuide: true,
        })

        const root = wrapper.find('div')
        expect(root.classes()).not.toContain('border-l-2')
        expect(root.classes()).not.toContain('border-border-neutral-subtle/50')
    })

    it('does not render nested guide line when showNestedLevelGuide is false', () => {
        const wrapper = factory({
            level: 3,
            showNestedLevelGuide: false,
        })

        const root = wrapper.find('div')
        expect(root.classes()).not.toContain('border-l-2')
    })

    it('forwards external classes so level indentation from parent is applied', () => {
        const wrapper = factory({
            level: 2,
            class: 'ml-4',
        })

        const root = wrapper.find('div')
        expect(root.classes()).toContain('ml-4')
    })
})
