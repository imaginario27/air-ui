import { mount } from '@vue/test-utils'
import MainContent from '@/components/layouts/MainContent.vue'

// Default: desktop mode
const { useIsMobileSpy } = vi.hoisted(() => ({
    useIsMobileSpy: vi.fn(() => ({ isMobile: false }))
}))
vi.mock('@/composables/useIsMobile', () => ({
    useIsMobile: useIsMobileSpy
}))

const factory = (props = {}, slots = {}) => {
    return mount(MainContent, {
        props,
        slots
    })
}

describe('MainContent.vue', () => {
    it('renders main tag with base classes', () => {
        const wrapper = factory()
        const main = wrapper.find('main')

        expect(main.exists()).toBe(true)
        expect(main.classes()).toEqual(expect.arrayContaining([
            'flex',
            'flex-col',
            'gap-3',
            'w-full'
        ]))
    })

    it('renders slot content', () => {
        const wrapper = factory({}, {
            default: '<div class="slot-test">Main Content</div>'
        })

        expect(wrapper.find('.slot-test').exists()).toBe(true)
        expect(wrapper.text()).toContain('Main Content')
    })

    it('forwards mobileBreakpoint to useIsMobile (default 1024)', () => {
        useIsMobileSpy.mockClear()
        factory()
        const breakpointArg = useIsMobileSpy.mock.calls.at(-1)?.[0]
        expect(typeof breakpointArg).toBe('function')
        expect(breakpointArg()).toBe(1024)
    })

    it('forwards a custom mobileBreakpoint to useIsMobile', () => {
        useIsMobileSpy.mockClear()
        factory({ mobileBreakpoint: 1280 })
        const breakpointArg = useIsMobileSpy.mock.calls.at(-1)?.[0]
        expect(typeof breakpointArg).toBe('function')
        expect(breakpointArg()).toBe(1280)
    })

    it('applies inline style for max-width when not mobile', () => {
        const wrapper = factory({ tocSidebarWidth: 320 })

        const main = wrapper.find('main')
        expect(main.attributes('style')).toContain('max-width: calc(100% - 320px)')
    })

    it('does not apply max-width style on mobile', async () => {
        vi.resetModules()

        vi.doMock('@/composables/useIsMobile', () => ({
            useIsMobile: () => ({
                isMobile: true
            })
        }))

        const { default: MobileMainContent } = await import('@/components/layouts/MainContent.vue')

        const wrapper = mount(MobileMainContent)
        const main = wrapper.find('main')

        expect(main.attributes('style')).toBeUndefined()
    })
})
