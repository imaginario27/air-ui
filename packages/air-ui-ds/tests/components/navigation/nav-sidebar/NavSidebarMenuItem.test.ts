import { mount } from '@vue/test-utils'
import { reactive } from 'vue'
import NavSidebarMenuItem from '@/components/navigation/nav-sidebar/NavSidebarMenuItem.vue'
import Icon from '@/components/icons/Icon.vue'
import { SidebarNavMenuItemStyleType } from '#imports'
import { PrefetchOn } from '@/models/enums/prefetch'

vi.mock('#app', () => ({
    useRoute: () => reactive({
        path: '/settings'
    })
}))

describe('NavSidebarMenuItem.vue', () => {
    const globalStubs = {
        NuxtLink: {
            template: `<a :href="to" :data-prefetch-on="typeof prefetchOn === 'string' ? prefetchOn : JSON.stringify(prefetchOn)" @click="$emit('click')"><slot /></a>`,
            props: ['to', 'prefetchOn']
        }
    }

    const factory = (props = {}) =>
        mount(NavSidebarMenuItem, {
            props,
            global: {
                stubs: globalStubs,
                components: {
                    Icon
                }
            }
        })

    it('renders NuxtLink with correct href', () => {
        const wrapper = factory({ to: '/settings' })
        const link = wrapper.find('a')

        expect(link.exists()).toBe(true)
        expect(link.attributes('href')).toBe('/settings')
    })

    it('renders button when `to` is not provided', () => {
        const wrapper = factory()
        const button = wrapper.find('button')

        expect(button.exists()).toBe(true)
        expect(button.attributes('type')).toBe('button')
    })

    it('keeps parent item label left-aligned when used as button with dropdown arrow', () => {
        const wrapper = factory({
            text: 'Parent item',
            showDropdownArrow: true,
        })

        const button = wrapper.find('button')
        expect(button.classes()).toContain('text-left')
    })

    it('renders text in span when not collapsed', () => {
        const wrapper = factory({ text: 'Settings' })
        const span = wrapper.find('span')

        expect(span.exists()).toBe(true)
        expect(span.text()).toBe('Settings')
    })

    it('does not render text when isCollapsed is true', () => {
        const wrapper = factory({ isCollapsed: true })
        expect(wrapper.find('span').exists()).toBe(false)
    })

    it('renders Icon when icon prop is provided', () => {
        const wrapper = factory({ icon: 'mdi:home' })
        const icon = wrapper.findComponent(Icon)

        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:home')
    })

    it('does not render Icon when icon prop is not provided', () => {
        const wrapper = factory()
        const icon = wrapper.findComponent(Icon)

        expect(icon.exists()).toBe(false)
    })

    it('does not apply active classes when detectActive is false', () => {
        const wrapper = factory({
            to: '/settings',
            detectActive: false
        })

        const link = wrapper.find('a')
        const classList = link.classes()

        expect(classList).not.toContain('text-text-primary-brand-on-neutral-hover-bg')
        expect(classList).not.toContain('bg-background-neutral-hover')
    })

    it('renders dropdown arrow icon when showDropdownArrow is true and not collapsed', () => {
        const wrapper = factory({
            showDropdownArrow: true,
            isCollapsed: false,
            isOpen: false
        })

        const icons = wrapper.findAllComponents(Icon)
        const dropdownIcon = icons.find(icon => icon.props('name') === 'mdi:chevron-down')

        expect(dropdownIcon).toBeTruthy()
    })

    it('renders chevron up icon when showDropdownArrow is true and isOpen is true', () => {
        const wrapper = factory({
            showDropdownArrow: true,
            isCollapsed: false,
            isOpen: true
        })

        const icons = wrapper.findAllComponents(Icon)
        const dropdownIcon = icons.find(icon => icon.props('name') === 'mdi:chevron-up')

        expect(dropdownIcon).toBeTruthy()
    })

    it('does not render dropdown icon when isCollapsed is true', () => {
        const wrapper = factory({
            showDropdownArrow: true,
            isCollapsed: true
        })

        const icons = wrapper.findAllComponents(Icon)
        const chevronIcon = icons.find(icon =>
            ['mdi:chevron-up', 'mdi:chevron-down'].includes(icon.props('name') ?? '')
        )

        expect(chevronIcon).toBeUndefined()
    })

    it('applies correct spacing and gap classes for SPACED style', () => {
        const wrapper = factory({
            styleType: SidebarNavMenuItemStyleType.SPACED
        })

        const button = wrapper.find('button')
        const content = button.find('div')

        expect(button.classes()).toContain('min-h-[40px]')
        expect(content.classes()).toContain('gap-3')
    })

    it('emits click when NuxtLink is clicked', async () => {
        const wrapper = factory()

        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('applies textClass on the label span', () => {
        const wrapper = factory({
            text: 'Settings',
            textClass: '!text-text-danger'
        })

        expect(wrapper.find('span').classes()).toContain('!text-text-danger')
    })

    it('applies iconClass only to the item icon, not to the dropdown arrow', () => {
        const wrapper = factory({
            icon: 'mdi:home',
            iconClass: '!text-icon-success',
            showDropdownArrow: true,
            isOpen: false,
        })

        const icons = wrapper.findAllComponents(Icon)
        const itemIcon = icons.find(icon => icon.props('name') === 'mdi:home')
        const arrowIcon = icons.find(icon => icon.props('name') === 'mdi:chevron-down')

        expect(itemIcon?.props('iconClass')).toContain('!text-icon-success')
        expect(arrowIcon?.props('iconClass')).toBeUndefined()
    })

    it('applies disabled styles and text selection guard when disabled is true', () => {
        const wrapper = factory({
            text: 'Disabled item',
            disabled: true,
        })

        const rootClasses = wrapper.classes()
        const text = wrapper.find('span')

        expect(rootClasses).toContain('opacity-disabled')
        expect(rootClasses).toContain('cursor-not-allowed')
        expect(rootClasses).toContain('pointer-events-none')
        expect(text.classes()).toContain('select-none')
    })

    it('passes default prefetchOn strategy to NuxtLink', () => {
        const wrapper = factory({ to: '/settings' })
        const link = wrapper.find('a')

        expect(link.attributes('data-prefetch-on')).toBe(PrefetchOn.VISIBILITY)
    })

    it('passes custom prefetchOn strategy to NuxtLink', () => {
        const wrapper = factory({
            to: '/settings',
            prefetchOn: PrefetchOn.INTERACTION,
        })
        const link = wrapper.find('a')

        expect(link.attributes('data-prefetch-on')).toBe(PrefetchOn.INTERACTION)
    })

    it('applies level 2 typography and nested guide line when enabled', () => {
        const wrapper = factory({
            level: 2,
            showNestedLevelGuide: true,
        })

        const rootClasses = wrapper.classes()
        expect(rootClasses).toContain('text-sm')
        expect(rootClasses).toContain('font-medium')
        expect(rootClasses).not.toContain('border-l-2')
    })

    it('applies level 3 typography and hides nested guide line when disabled', () => {
        const wrapper = factory({
            level: 3,
            showNestedLevelGuide: false,
        })

        const rootClasses = wrapper.classes()
        expect(rootClasses).toContain('text-xs')
        expect(rootClasses).toContain('font-medium')
        expect(rootClasses).not.toContain('border-l-2')
    })

    it('does not render nested guide line in collapsed mode', () => {
        const wrapper = factory({
            level: 2,
            showNestedLevelGuide: true,
            isCollapsed: true,
        })

        expect(wrapper.classes()).not.toContain('border-l-2')
    })
})
