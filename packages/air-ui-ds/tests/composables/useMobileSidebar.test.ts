import { mount } from '@vue/test-utils'
import { ref, defineComponent, nextTick } from 'vue'
import { useMobileSidebar } from '~/composables/useMobileSidebar'

// Reactive mocks
const isMobile = ref(true)
const fullPath = ref('/')

// Mock dependencies
vi.mock('~/composables/useIsMobile', () => ({
    useIsMobile: () => ({
        isMobile
    })
}))

vi.mock('#app', () => ({
    useRoute: () => ({
        get fullPath() {
            return fullPath.value
        }
    })
}))

describe('useMobileSidebar', () => {
    const factory = () =>
        mount(
            defineComponent({
                setup() {
                    return useMobileSidebar()
                },
                template: '<div />'
            })
        )

    beforeEach(() => {
        // Reset shared state before each test
        isMobile.value = true
        fullPath.value = '/'
    })

    it('isMobileSidebarOpen is false initially', () => {
        const wrapper = factory()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(false)
    })

    it('toggleMobileSidebar toggles the state', () => {
        const wrapper = factory()

        wrapper.vm.toggleMobileSidebar()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(true)

        wrapper.vm.toggleMobileSidebar()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(false)
    })

    it('openMobileSidebar sets state to true', () => {
        const wrapper = factory()

        wrapper.vm.openMobileSidebar()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(true)
    })

    it('closeMobileSidebar sets state to false', () => {
        const wrapper = factory()

        wrapper.vm.openMobileSidebar()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(true)

        wrapper.vm.closeMobileSidebar()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(false)
    })

    it('closes sidebar when isMobile becomes false', async () => {
        const wrapper = factory()

        wrapper.vm.openMobileSidebar()
        expect(wrapper.vm.isMobileSidebarOpen).toBe(true)

        isMobile.value = false
        await nextTick()

        expect(wrapper.vm.isMobileSidebarOpen).toBe(false)
    })
})
