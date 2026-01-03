import { mount } from '@vue/test-utils'
import NavSidebarMenuItem from '@/components/navigation/nav-sidebar/NavSidebarMenuItem.vue'
import { MdiIcon } from '#components'

vi.mock('#app', () => ({
    useRoute: () => ({
        path: '/settings'
    })
}))

describe('NavSidebarMenuItem.vue', () => {
    const globalStubs = {
        NuxtLink: {
            template: `<a :href="to" @click="$emit('click')"><slot /></a>`,
            props: ['to']
        }
    }

    const factory = (props = {}) =>
        mount(NavSidebarMenuItem, {
            props,
            global: {
                stubs: globalStubs,
                components: { MdiIcon }
            }
        })

    it('renders NuxtLink with correct href', () => {
        const wrapper = factory({ to: '/settings' })
        const link = wrapper.find('a')
        expect(link.exists()).toBe(true)
        expect(link.attributes('href')).toBe('/settings')
    })

    it('renders NuxtLink even if `to` is null', () => {
        const wrapper = factory()
        const link = wrapper.find('a')
        expect(link.exists()).toBe(true)
        expect(link.attributes('href')).toBeUndefined()
    })

    it('renders text in span', () => {
        const wrapper = factory({ text: 'Settings' })
        const span = wrapper.find('span')
        expect(span.exists()).toBe(true)
        expect(span.text()).toBe('Settings')
    })

    it('does not render text when isCollapsed is true', () => {
        const wrapper = factory({ isCollapsed: true })
        expect(wrapper.find('span').exists()).toBe(false)
    })

    it('renders MdiIcon when icon prop is provided', () => {
        const wrapper = factory({ icon: 'mdiHome' })
        const icon = wrapper.findComponent(MdiIcon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdiHome')
    })

    it('does not render MdiIcon when icon prop is not provided', () => {
        const wrapper = factory()
        const icon = wrapper.findComponent(MdiIcon)
        expect(icon.exists()).toBe(false)
    })

    it('does not apply active classes when detectActive is false', () => {
        const wrapper = factory({ to: '/settings', detectActive: false })
        const link = wrapper.find('a')
        expect(link.classes()).not.toContain('text-text-primary-brand-on-neutral-hover-bg')
    })

    it('renders dropdown arrow icon when showDropdownArrow is true and isCollapsed is false', () => {
        const wrapper = factory({
            showDropdownArrow: true,
            isCollapsed: false,
            isOpen: false
        })

        const icons = wrapper.findAllComponents(MdiIcon)
        const dropdownIcon = icons.find(i => i.props('icon') === 'mdiChevronDown')
        expect(dropdownIcon).toBeTruthy()
    })

    it('renders mdiChevronUp when showDropdownArrow is true and isOpen is true', () => {
        const wrapper = factory({
            showDropdownArrow: true,
            isCollapsed: false,
            isOpen: true
        })

        const icons = wrapper.findAllComponents(MdiIcon)
        const dropdownIcon = icons.find(i => i.props('icon') === 'mdiChevronUp')
        expect(dropdownIcon).toBeTruthy()
    })

    it('does not render dropdown icon when isCollapsed is true', () => {
        const wrapper = factory({
            showDropdownArrow: true,
            isCollapsed: true
        })

        const chevron = wrapper.findAllComponents(MdiIcon).find(i =>
            ['mdiChevronUp', 'mdiChevronDown'].includes(i.props('icon'))
        )

        expect(chevron).toBeFalsy()
    })

    it('emits click when NuxtLink is clicked', async () => {
        const wrapper = factory()
        await wrapper.find('a').trigger('click')
        expect(wrapper.emitted('click')).toBeTruthy()
    })
})
