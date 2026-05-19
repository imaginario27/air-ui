import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import NavSidebar from '@/components/navigation/nav-sidebar/NavSidebar.vue'
import NavSidebarMenu from '@/components/navigation/nav-sidebar/NavSidebarMenu.vue'
import NavSidebarMenuItem from '@/components/navigation/nav-sidebar/NavSidebarMenuItem.vue'
import NavSidebarMenuSectionTitle from '@/components/navigation/nav-sidebar/NavSidebarMenuSectionTitle.vue'
import DropdownMenu from '~/components/dropdowns/DropdownMenu.vue'
import DropdownMenuItem from '~/components/dropdowns/DropdownMenuItem.vue'
import ActionIconButton from '@/components/buttons/ActionIconButton.vue'
import { Position } from '@/models/enums/positions'

// Shared reactive ref for collapsed state
const isSidebarCollapsedRef = ref(false)
const toggleMobileSidebarMock = vi.fn()

vi.mock('@/composables/useMobileSidebar', () => ({
    useMobileSidebar: () => ({
        isMobileSidebarOpen: true,
        toggleMobileSidebar: toggleMobileSidebarMock
    })
}))

vi.mock('@/composables/useSidebar', () => ({
    useSidebar: () => ({
        isSidebarCollapsed: () => isSidebarCollapsedRef,
        toggleSidebarState: vi.fn(),
        setSidebarCollapsed: vi.fn()
    })
}))

const { useIsMobileSpy } = vi.hoisted(() => ({
    useIsMobileSpy: vi.fn(() => ({ isMobile: false }))
}))
vi.mock('@/composables/useIsMobile', () => ({
    useIsMobile: useIsMobileSpy
}))

const defaultMenuItems = [
    { isSectionTitle: true, text: 'Section 1', icon: 'mdi:bullseye' },
    { text: 'Item 1', icon: 'mdi:help', to: '/' },
    { text: 'Item 2', icon: 'mdi:help', to: '/' },
    {
        text: 'Item 3',
        icon: 'mdi:help',
        children: [
            { isSectionTitle: true, text: 'Subsection A', icon: 'mdi:shape-outline' },
            {
                text: 'Subitem 1',
                icon: 'mdi:help',
                children: [
                    { isSectionTitle: true, text: 'Nested subsection', icon: 'mdi:format-list-bulleted-square' },
                    { text: 'Third level 1', icon: 'mdi:help-circle-outline', to: '/sub1/third-1' },
                ]
            },
            { text: 'Subitem 2', icon: 'mdi:help', to: '/sub2' }
        ]
    }
]

const factory = (options: {
    props?: Record<string, unknown>
    slots?: Record<string, string>
} = {}) => {
    return mount(NavSidebar, {
        props: {
            sidebarId: 'main-sidebar',
            menuItems: defaultMenuItems,
            ...options.props
        },
        slots: {
            ...options.slots
        },
        global: {
            components: {
                DropdownMenu,
                DropdownMenuItem,
                ActionIconButton
            }
        }
    })
}

beforeEach(() => {
    isSidebarCollapsedRef.value = false
    vi.clearAllMocks()
})

describe('NavSidebar.vue', () => {
    it('forwards mobileBreakpoint to useIsMobile (default 1024)', () => {
        factory()
        const breakpointArg = useIsMobileSpy.mock.calls.at(-1)?.[0]
        expect(typeof breakpointArg).toBe('function')
        expect(breakpointArg()).toBe(1024)
    })

    it('forwards a custom mobileBreakpoint to useIsMobile', () => {
        factory({ props: { mobileBreakpoint: 1280 } })
        const breakpointArg = useIsMobileSpy.mock.calls.at(-1)?.[0]
        expect(typeof breakpointArg).toBe('function')
        expect(breakpointArg()).toBe(1280)
    })

    it('renders menu items and section titles', () => {
        const wrapper = factory()
        expect(wrapper.findComponent(NavSidebarMenu).exists()).toBe(true)
        expect(wrapper.findAllComponents(NavSidebarMenuItem)).toHaveLength(3)
        expect(wrapper.findAllComponents(NavSidebarMenuSectionTitle)).toHaveLength(1)
    })

    it('renders collapse toggle button when showCollapseToggle is true and position is TOP (expanded)', () => {
        const wrapper = factory({
            props: {
                showCollapseToggle: true,
                collapseTogglePosition: Position.TOP
            }
        })
        expect(wrapper.findAllComponents(ActionIconButton)).toHaveLength(1)
    })

    it('renders collapse toggle item in menu when showCollapseToggle is true and isCollapsed is true', async () => {
        isSidebarCollapsedRef.value = true

        const wrapper = factory({
            props: {
                showCollapseToggle: true,
                collapseTogglePosition: Position.TOP
            }
        })

        await nextTick()

        const menu = wrapper.findComponent(NavSidebarMenu)
        expect(menu.findComponent(ActionIconButton).exists()).toBe(true)
    })

    it('renders collapse button at bottom when showCollapseToggle is true and position is BOTTOM', () => {
        const wrapper = factory({
            props: {
                showCollapseToggle: true,
                collapseTogglePosition: Position.BOTTOM
            }
        })

        expect(wrapper.findAllComponents(ActionIconButton).length).toBe(1)
    })

    it('applies fixed class when isFixed is true', () => {
        const wrapper = factory({ props: { isFixed: true } })
        expect(wrapper.find('aside').classes()).toContain('fixed')
    })

    it('does not apply fixed class when isFixed is false', () => {
        const wrapper = factory({ props: { isFixed: false } })
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
        globalThis.dispatchEvent(new Event('scroll'))
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
        globalThis.dispatchEvent(new Event('scroll'))
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

    it('keeps the sidebar visible (translate-x-0) when not mobile', () => {
        const wrapper = factory()
        const aside = wrapper.find('aside')

        expect(aside.classes()).toContain('translate-x-0')
        expect(aside.classes()).not.toContain('-translate-x-full')
        expect(aside.classes()).not.toContain('lg:translate-x-0')
    })

    it('does not gate visibility on a static lg: breakpoint', () => {
        const wrapper = factory()
        const aside = wrapper.find('aside')

        // Visibility is driven by mobileBreakpoint/isMobile, not Tailwind's lg:
        expect(aside.classes()).not.toContain('lg:translate-x-0')
    })

    it('renders DropdownMenu when collapsed and item has children', async () => {
        isSidebarCollapsedRef.value = true

        const wrapper = factory()

        await nextTick()

        const dropdowns = wrapper.findAllComponents(DropdownMenu)
        expect(dropdowns.length).toBeGreaterThan(0)
    })

    it('renders collapsed submenu labels without prefix markers', async () => {
        isSidebarCollapsedRef.value = true

        const wrapper = factory()
        await nextTick()

        const activator = wrapper.find('.dropdown-activator')
        await activator.trigger('click')
        await nextTick()

        const bodyText = globalThis.document.body.textContent ?? ''
        expect(bodyText).toContain('Subsection A')
        expect(bodyText).toContain('Subitem 1')
        expect(bodyText).not.toContain('-- Subsection A')
        expect(bodyText).not.toContain('-- Subitem 1')
    })

    it('renders nested children when not collapsed and item is open', async () => {
        const wrapper = factory()

        const items = wrapper.findAllComponents(NavSidebarMenuItem)
        expect(items.length).toBeGreaterThan(2) // Ensure the 3rd item exists

        await items[2]!.trigger('click') // Use non-null assertion since we just checked
        await nextTick()

        const allItems = wrapper.findAllComponents(NavSidebarMenuItem)
        expect(allItems.length).toBeGreaterThan(3)
    })

    it('applies subItemsCustomClass to expanded child menu items', async () => {
        const customClass = '!text-text-danger !font-bold'
        const wrapper = factory({
            props: {
                subItemsCustomClass: customClass
            }
        })

        const items = wrapper.findAllComponents(NavSidebarMenuItem)
        await items[2]!.trigger('click')
        await nextTick()

        const subItems = wrapper
            .findAllComponents(NavSidebarMenuItem)
            .filter(item => String(item.props('text')).startsWith('Subitem'))

        expect(subItems).toHaveLength(2)

        subItems.forEach((item) => {
            const classes = item.classes()
            expect(classes).toContain('!text-text-danger')
            expect(classes).toContain('!font-bold')
        })
    })

    it('applies thirdLevelItemsCustomClass to expanded third-level menu items', async () => {
        const customClass = '!text-text-primary-brand-default !italic'
        const wrapper = factory({
            props: {
                thirdLevelItemsCustomClass: customClass,
            }
        })

        const topLevelParent = wrapper
            .findAllComponents(NavSidebarMenuItem)
            .find(item => item.props('text') === 'Item 3')

        await topLevelParent!.trigger('click')
        await nextTick()

        const secondLevelParent = wrapper
            .findAllComponents(NavSidebarMenuItem)
            .find(item => item.props('text') === 'Subitem 1')

        await secondLevelParent!.trigger('click')
        await nextTick()

        const thirdLevelItems = wrapper
            .findAllComponents(NavSidebarMenuItem)
            .filter(item => String(item.props('text')).startsWith('Third level'))

        expect(thirdLevelItems).toHaveLength(1)
        expect(thirdLevelItems[0]!.classes()).toContain('!text-text-primary-brand-default')
        expect(thirdLevelItems[0]!.classes()).toContain('!italic')
    })

    it('renders subsection titles across level 1, 2 and 3', async () => {
        const wrapper = factory()

        const topLevelParent = wrapper
            .findAllComponents(NavSidebarMenuItem)
            .find(item => item.props('text') === 'Item 3')

        await topLevelParent!.trigger('click')
        await nextTick()

        const secondLevelParent = wrapper
            .findAllComponents(NavSidebarMenuItem)
            .find(item => item.props('text') === 'Subitem 1')

        await secondLevelParent!.trigger('click')
        await nextTick()

        const sectionTitles = wrapper.findAllComponents(NavSidebarMenuSectionTitle)
        expect(sectionTitles).toHaveLength(3)
    })

    it('forwards custom text and icon classes for items and subitems', async () => {
        const wrapper = factory({
            props: {
                itemsTextClass: '!text-text-success',
                itemsIconClass: '!text-icon-success',
                subItemsTextClass: '!text-text-danger',
                subItemsIconClass: '!text-icon-danger',
            }
        })

        const items = wrapper.findAllComponents(NavSidebarMenuItem)
        expect(items[0]!.props('textClass')).toBe('!text-text-success')
        expect(items[0]!.props('iconClass')).toBe('!text-icon-success')

        await items[2]!.trigger('click')
        await nextTick()

        const subItems = wrapper
            .findAllComponents(NavSidebarMenuItem)
            .filter(item => String(item.props('text')).startsWith('Subitem'))

        expect(subItems).toHaveLength(2)
        subItems.forEach((item) => {
            expect(item.props('textClass')).toBe('!text-text-danger')
            expect(item.props('iconClass')).toBe('!text-icon-danger')
        })
    })

})
