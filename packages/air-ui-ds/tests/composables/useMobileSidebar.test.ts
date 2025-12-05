import { mount } from '@vue/test-utils'
import { ref, defineComponent, nextTick } from 'vue'
import { useMobileSidebar } from '~/composables/useMobileSidebar'

// Mock composable dependency
vi.mock('~/composables/useIsMobile', () => {
    return {
        useIsMobile: vi.fn(() => ({
            isMobile: ref(true),
        })),
    }
})

describe('useMobileSidebar', () => {
    const createWrapper = () => {
        return mount(defineComponent({
            setup() {
                return useMobileSidebar()
            },
            template: '<div />',
        }))
    }

    it('isMobileSidebarOpen is false initially', () => {
        const wrapper = createWrapper()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(false)
    })

    it('toggleMobileSidebar toggles the state', async () => {
        const wrapper = createWrapper()

        wrapper.vm.toggleMobileSidebar()
        await nextTick()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(true)

        wrapper.vm.toggleMobileSidebar()
        await nextTick()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(false)
    })

    it('openMobileSidebar sets isMobileSidebarOpen to true', async () => {
        const wrapper = createWrapper()

        wrapper.vm.openMobileSidebar()
        await nextTick()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(true)
    })

    it('closeMobileSidebar sets isMobileSidebarOpen to false', async () => {
        const wrapper = createWrapper()

        wrapper.vm.openMobileSidebar()
        await nextTick()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(true)

        wrapper.vm.closeMobileSidebar()
        await nextTick()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(false)
    })

    it('automatically closes sidebar when isMobile becomes false', async () => {
        // Use a ref to simulate reactive `isMobile`
        const isMobile = ref(true)

        // Override mock implementation for this test
        const { useIsMobile } = await import('~/composables/useIsMobile')
        ;(useIsMobile as any).mockReturnValue({ isMobile })

        const wrapper = createWrapper()

        wrapper.vm.openMobileSidebar()
        await nextTick()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(true)

        isMobile.value = false
        await nextTick()

        expect(wrapper.vm.isMobileSidebarOpen).toBe(false)
    })
})
