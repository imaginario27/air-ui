import { mount } from '@vue/test-utils'
import CompactHeader from '@/components/layouts/headers/CompactHeader.vue'
import { SidebarTogglePosition } from '@/models/enums/positions'

// Mock before component import
vi.mock('@/composables/useMobileSidebar', () => ({
    useMobileSidebar: () => ({
        isMobileSidebarOpen: false,
        toggleMobileSidebar: vi.fn()
    })
}))

vi.mock('@/composables/useIsMobile', () => ({
    useIsMobile: () => ({
        isMobile: false
    })
}))

vi.mock('vue-router', () => ({
    useRoute: () => ({
        meta: {
            title: 'Test Page'
        }
    })
}))

vi.mock('../../../../../air-ui-utils/utils/pages', () => ({
    pageTitle: vi.fn((pageTitle, appName, format) => {
        return format === 'full'
            ? `${pageTitle} | ${appName}`
            : pageTitle
    })
}))

const defaultProps = {
    navMenuItems: [],
    userFullname: '',
    userAvatarUrl: '',
    userMenuItems: [],
}

const factory = (props = {}, slots = {}) => {
    return mount(CompactHeader, {
        props: {
            ...defaultProps,
            ...props
        },
        slots
    })
}

describe('CompactHeader.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders top, header, and bottom slots', () => {
        const wrapper = factory({}, {
            'top-header': '<div class="top-header">Top</div>',
            'header-logo': '<div class="header-logo">Logo</div>',
            'header-actions': '<div class="header-actions">Actions</div>',
            'bottom-header': '<div class="bottom-header">Bottom</div>',
        })

        expect(wrapper.find('.top-header').exists()).toBe(true)
        expect(wrapper.find('.header-logo').exists()).toBe(true)
        expect(wrapper.find('.header-actions').exists()).toBe(true)
        expect(wrapper.find('.bottom-header').exists()).toBe(true)
    })

    it('applies sticky and border classes based on props', () => {
        const wrapper = factory({
            isSticky: true,
            hasBorder: true
        })

        const header = wrapper.find('header')
        expect(header.classes()).toContain('sticky')
        expect(wrapper.find('div.border-b').exists()).toBe(true)
    })

    it('renders NavMenu when navMenuItems are provided', () => {
        const wrapper = factory({
            navMenuItems: [{ text: 'Home', to: '/' }]
        })

        expect(wrapper.findComponent({ name: 'NavMenu' }).exists()).toBe(true)
    })

    it('renders user menu when userFullname and userMenuItems are provided', () => {
        const wrapper = factory({
            userFullname: 'Jane Doe',
            userAvatarUrl: '/avatar.png',
            userMenuItems: [
                { text: 'Profile', icon: 'mdiAccount', callback: vi.fn() }
            ]
        })

        const dropdown = wrapper.findComponent({ name: 'DropdownMenu' })
        expect(dropdown.exists()).toBe(true)

        const avatar = wrapper.findComponent({ name: 'Avatar' })
        expect(avatar.exists()).toBe(true)
        expect(avatar.props('displayName')).toBe('Jane Doe')
    })

    it('renders ActionIconButton when showMobileSidebarToggle is true', () => {
        const wrapper = factory({
            showMobileSidebarToggle: true,
            sidebarTogglePosition: SidebarTogglePosition.RIGHT_SIDE
        })

        expect(wrapper.findComponent({ name: 'ActionIconButton' }).exists()).toBe(true)
    })

    it('renders mobile menu toggle if isMobile is true', async () => {
        // Re-mock useIsMobile to return true and re-import component
        vi.resetModules()
        vi.doMock('@/composables/useIsMobile', () => ({
            useIsMobile: () => ({
                isMobile: true
            })
        }))

        const { default: MobileHeader } = await import('@/components/layouts/headers/CompactHeader.vue')
        const wrapper = mount(MobileHeader, {
            props: {
                navMenuItems: [{ text: 'Mobile', to: '/' }],
                showMobileMenuToggle: true
            }
        })

        expect(wrapper.findComponent({ name: 'DropdownMenu' }).exists()).toBe(true)
    })

    it('applies glass effect classes when hasGlassEffect is true', () => {
        const wrapper = factory({
            hasGlassEffect: true
        })

        const glassWrapper = wrapper.find('div.bg-background-surface')
        expect(glassWrapper.classes()).toContain('backdrop-blur-md')
    })

    it('renders sidebar toggle on left or right of logo depending on prop', () => {
        const leftWrapper = factory({
            showMobileSidebarToggle: true,
            sidebarTogglePosition: SidebarTogglePosition.LOGO_LEFT_SIDE
        })

        const rightWrapper = factory({
            showMobileSidebarToggle: true,
            sidebarTogglePosition: SidebarTogglePosition.LOGO_RIGHT_SIDE
        })

        expect(leftWrapper.findAllComponents({ name: 'ActionIconButton' }).length).toBeGreaterThan(0)
        expect(rightWrapper.findAllComponents({ name: 'ActionIconButton' }).length).toBeGreaterThan(0)
    })
})
