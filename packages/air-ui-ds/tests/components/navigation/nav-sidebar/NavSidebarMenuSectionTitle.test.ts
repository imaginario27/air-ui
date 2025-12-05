import { mount } from '@vue/test-utils'
import NavSidebarMenuSectionTitle from '@/components/navigation/nav-sidebar/NavSidebarMenuSectionTitle.vue'
import { MdiIcon } from '#components'
import { SidebarNavMenuItemStyleType } from '#imports'

const factory = (props = {}) =>
    mount(NavSidebarMenuSectionTitle, {
        props,
        global: {
            components: { MdiIcon }
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

    it('applies correct spacing and icon size class for COMPACT styleType', () => {
        const wrapper = factory({
            styleType: SidebarNavMenuItemStyleType.COMPACT,
            icon: 'mdiFolder'
        })

        expect(wrapper.classes()).toContain('gap-2')
        expect(wrapper.classes()).toContain('pt-3')
        expect(wrapper.classes()).toContain('pb-1')
        expect(wrapper.classes()).toContain('px-2')

        const icon = wrapper.findComponent(MdiIcon)
        expect(icon.classes()).toContain('w-[16px]')
        expect(icon.classes()).toContain('h-[16px]')
    })

    it('applies correct spacing and icon size class for SPACED styleType', () => {
        const wrapper = factory({
            styleType: SidebarNavMenuItemStyleType.SPACED,
            icon: 'mdiFolder'
        })

        expect(wrapper.classes()).toContain('min-h-[40px]')
        expect(wrapper.classes()).toContain('gap-3')
        expect(wrapper.classes()).toContain('pt-4')
        expect(wrapper.classes()).toContain('pb-2')
        expect(wrapper.classes()).toContain('px-3')

        const icon = wrapper.findComponent(MdiIcon)
        expect(icon.classes()).toContain('w-[20px]')
        expect(icon.classes()).toContain('h-[20px]')
    })

    it('uses default styleType (COMPACT) when none is provided', () => {
        const wrapper = factory()
        expect(wrapper.classes()).toContain('gap-2')
        expect(wrapper.classes()).toContain('pt-3')
        expect(wrapper.classes()).toContain('pb-1')
        expect(wrapper.classes()).toContain('px-2')
    })
})
