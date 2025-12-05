import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import NavSidebar from '@/components/navigation/nav-sidebar/NavSidebar.vue'
import NavSidebarMenu from '@/components/navigation/nav-sidebar/NavSidebarMenu.vue'
import NavSidebarMenuItem from '@/components/navigation/nav-sidebar/NavSidebarMenuItem.vue'
import NavSidebarMenuSectionTitle from '@/components/navigation/nav-sidebar/NavSidebarMenuSectionTitle.vue'

const toggleMobileSidebarMock = vi.fn()

vi.mock('@/composables/useMobileSidebar', () => ({
    useMobileSidebar: () => ({
        isMobileSidebarOpen: true,
        toggleMobileSidebar: toggleMobileSidebarMock
    })
}))

const factory = (options: {
    props?: Record<string, unknown>
    slots?: Record<string, string>
} = {}) => {
    return mount(NavSidebar, {
        props: {
            ...options.props
        },
        slots: {
            ...options.slots
        },
        global: {
            stubs: {
                ActionIconButton: {
                    template: '<button data-testid="close-button" @click="$emit(\'click\')">X</button>'
                }
            }
        }
    })
}

describe('NavSidebar.vue', () => {
    const defaultMenuItems = [
        { isSectionTitle: true, text: 'Section 1', icon: 'mdiTitle' },
        { text: 'Item 1', icon: 'mdiHelp', to: '/' },
        { text: 'Item 2', icon: 'mdiHelp', to: '/' }
    ]

    it('renders menu items and section titles', () => {
        const wrapper = factory({
            props: { menuItems: defaultMenuItems }
        })

        expect(wrapper.findComponent(NavSidebarMenu).exists()).toBe(true)
        expect(wrapper.findAllComponents(NavSidebarMenuItem)).toHaveLength(2)
        expect(wrapper.findAllComponents(NavSidebarMenuSectionTitle)).toHaveLength(1)
    })

    it('shows close button when hasCloseButton is true', async () => {
        const wrapper = factory({
            props: { hasCloseButton: true }
        })

        const closeBtn = wrapper.find('[data-testid="close-button"]')
        expect(closeBtn.exists()).toBe(true)

        await closeBtn.trigger('click')
        expect(toggleMobileSidebarMock).toHaveBeenCalled()
    })

    it('does not render close button when hasCloseButton is false', () => {
        const wrapper = factory({
            props: { hasCloseButton: false }
        })

        expect(wrapper.find('[data-testid="close-button"]').exists()).toBe(false)
    })

    it('applies fixed class when isFixed is true', () => {
        const wrapper = factory({
            props: { isFixed: true }
        })

        expect(wrapper.find('aside').classes()).toContain('fixed')
    })

    it('does not apply fixed class when isFixed is false', () => {
        const wrapper = factory({
            props: { isFixed: false }
        })

        expect(wrapper.find('aside').classes()).not.toContain('fixed')
    })

    it('applies style top: 0px when scrollY > stickyScrollHeight', async () => {
        const wrapper = factory({
            props: {
                stickOnScroll: true,
                stickyScrollHeight: 100
            }
        })

        window.scrollY = 200
        window.dispatchEvent(new Event('scroll'))
        await nextTick()

        const style = (wrapper.find('aside').element as HTMLElement).style.top
        expect(style).toBe('0px')
    })

    it('applies style top to stickyScrollHeight when scrollY <= stickyScrollHeight', async () => {
        const wrapper = factory({
            props: {
                stickOnScroll: true,
                stickyScrollHeight: 150
            }
        })

        window.scrollY = 50
        window.dispatchEvent(new Event('scroll'))
        await nextTick()

        const style = (wrapper.find('aside').element as HTMLElement).style.top
        expect(style).toBe('150px')
    })

    it('renders all slot content correctly', () => {
        const wrapper = factory({
            slots: {
                'sidebar-header': '<div class="header-slot">Header</div>',
                'sidebar-menu-prefix-content': '<div class="prefix-slot">Prefix</div>',
                'sidebar-menu-suffix-content': '<div class="suffix-slot">Suffix</div>',
                'sidebar-footer': '<div class="footer-slot">Footer</div>'
            }
        })

        expect(wrapper.find('.header-slot').exists()).toBe(true)
        expect(wrapper.find('.prefix-slot').exists()).toBe(true)
        expect(wrapper.find('.suffix-slot').exists()).toBe(true)
        expect(wrapper.find('.footer-slot').exists()).toBe(true)
    })

    it('applies responsive classes for visibility', () => {
        const wrapper = factory()
        const aside = wrapper.find('aside')

        expect(aside.classes()).toContain('translate-x-0')
        expect(aside.classes()).toContain('lg:translate-x-0')
    })
})
