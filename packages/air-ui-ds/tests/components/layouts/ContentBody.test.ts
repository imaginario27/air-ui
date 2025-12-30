import { mount } from '@vue/test-utils'
import ContentBody from '@/components/layouts/ContentBody.vue'

// Default mocks (desktop)
vi.mock('@/composables/useMobileSidebar', () => ({
    useMobileSidebar: () => ({
        isMobileSidebarOpen: false
    })
}))

vi.mock('@/composables/useIsMobile', () => ({
    useIsMobile: () => ({
        isMobile: false
    })
}))

describe('ContentBody.vue', () => {
    it('renders the container', () => {
        const wrapper = mount(ContentBody)
        expect(wrapper.find('div').exists()).toBe(true)
    })

    it('renders slot content', () => {
        const wrapper = mount(ContentBody, {
            slots: {
                default: '<p class="slot-test">Slot content</p>'
            }
        })

        expect(wrapper.find('.slot-test').exists()).toBe(true)
    })

    it('has no sidebar class when hasSidebar is false', () => {
        const wrapper = mount(ContentBody, {
            props: { hasSidebar: false }
        })

        const div = wrapper.find('div')
        expect(div.classes()).not.toContain('ml-[240px]')
        expect(div.classes()).not.toContain('translate-x-[240px]')
    })

    it('applies "ml-[240px]" when not mobile and hasSidebar is true', () => {
        const wrapper = mount(ContentBody, {
            props: { hasSidebar: true }
        })

        expect(wrapper.find('div').classes()).toContain('ml-[240px]')
    })

    it('applies "translate-x-[240px]" when mobile and sidebar is open', async () => {
        vi.resetModules()

        vi.doMock('@/composables/useMobileSidebar', () => ({
            useMobileSidebar: () => ({
                isMobileSidebarOpen: true
            })
        }))

        vi.doMock('@/composables/useIsMobile', () => ({
            useIsMobile: () => ({
                isMobile: true
            })
        }))

        const { default: MobileContentBody } = await import(
            '@/components/layouts/ContentBody.vue'
        )

        const wrapper = mount(MobileContentBody, {
            props: { hasSidebar: true }
        })

        expect(wrapper.find('div').classes()).toContain('translate-x-[240px]')
    })

    it('applies "translate-x-0" when mobile and sidebar is closed', async () => {
        vi.resetModules()

        vi.doMock('@/composables/useMobileSidebar', () => ({
            useMobileSidebar: () => ({
                isMobileSidebarOpen: false
            })
        }))

        vi.doMock('@/composables/useIsMobile', () => ({
            useIsMobile: () => ({
                isMobile: true
            })
        }))

        const { default: MobileContentBody } = await import(
            '@/components/layouts/ContentBody.vue'
        )

        const wrapper = mount(MobileContentBody, {
            props: { hasSidebar: true }
        })

        expect(wrapper.find('div').classes()).toContain('translate-x-0')
    })
})
