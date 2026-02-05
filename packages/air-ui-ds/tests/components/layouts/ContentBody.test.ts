import { mount } from '@vue/test-utils'
import type { MountingOptions } from '@vue/test-utils'
import ContentBody from '@/components/layouts/ContentBody.vue'

vi.mock('@/composables/useMobileSidebar', () => ({
    useMobileSidebar: () => ({
        isMobileSidebarOpen: { value: false }
    })
}))

vi.mock('@/composables/useIsMobile', () => ({
    useIsMobile: () => ({
        isMobile: { value: false }
    })
}))

type Props = {
    hasSidebar?: boolean
    sidebarWidth?: number
}

const mountComponent = (props: Props = {}, options: MountingOptions<any> = {}) => {
    return mount(ContentBody, {
        props,
        ...options
    })
}

describe('ContentBody.vue', () => {
    it('renders root container div', () => {
        const wrapper = mountComponent()
        expect(wrapper.find('div').exists()).toBe(true)
    })

    it('renders default slot content', () => {
        const wrapper = mountComponent({}, {
            slots: {
                default: '<p class="slot-test">Slot content</p>'
            }
        })

        expect(wrapper.find('.slot-test').text()).toBe('Slot content')
    })

    it('has no transform or margin style when hasSidebar is false', () => {
        const wrapper = mountComponent({ hasSidebar: false })
        const style = wrapper.find('div').attributes('style')
        expect(style).toBeUndefined()
    })

    it('applies margin-left when not mobile and hasSidebar is true', () => {
        const wrapper = mountComponent({ hasSidebar: true, sidebarWidth: 240 })
        const style = wrapper.find('div').attributes('style')
        expect(style).toContain('margin-left: 240px')
    })

    it('applies translateX with sidebar width when mobile and sidebar is open', async () => {
        vi.resetModules()

        vi.doMock('@/composables/useMobileSidebar', () => ({
            useMobileSidebar: () => ({
                isMobileSidebarOpen: { value: true }
            })
        }))

        vi.doMock('@/composables/useIsMobile', () => ({
            useIsMobile: () => ({
                isMobile: { value: true }
            })
        }))

        const { default: MobileContentBody } = await import('@/components/layouts/ContentBody.vue')

        const wrapper = mount(MobileContentBody, {
            props: {
                hasSidebar: true,
                sidebarWidth: 300
            }
        })

        const style = wrapper.find('div').attributes('style')
        expect(style).toContain('transform: translateX(300px)')
    })

    it('applies translateX(0) when mobile and sidebar is closed', async () => {
        vi.resetModules()

        vi.doMock('@/composables/useMobileSidebar', () => ({
            useMobileSidebar: () => ({
                isMobileSidebarOpen: { value: false }
            })
        }))

        vi.doMock('@/composables/useIsMobile', () => ({
            useIsMobile: () => ({
                isMobile: { value: true }
            })
        }))

        const { default: MobileContentBody } = await import('@/components/layouts/ContentBody.vue')

        const wrapper = mount(MobileContentBody, {
            props: {
                hasSidebar: true,
                sidebarWidth: 180
            }
        })

        const style = wrapper.find('div').attributes('style')
        expect(style).toContain('transform: translateX(0)')
    })
})
