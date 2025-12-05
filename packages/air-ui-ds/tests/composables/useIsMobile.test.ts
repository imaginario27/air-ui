import { mount } from '@vue/test-utils'
import { useIsMobile } from '~/composables/useIsMobile'

describe('useIsMobile', () => {
    const originalInnerWidth = window.innerWidth
    let addEventListenerSpy: ReturnType<typeof vi.fn>
    let removeEventListenerSpy: ReturnType<typeof vi.fn>

    beforeEach(() => {
        addEventListenerSpy = vi.spyOn(window, 'addEventListener')
        removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    })

    afterEach(() => {
        vi.restoreAllMocks()
        window.innerWidth = originalInnerWidth
    })

    it('sets isMobile to true when window.innerWidth is less than default breakpoint', async () => {
        window.innerWidth = 500

        const wrapper = mount(defineComponent({
            setup() {
                const { isMobile } = useIsMobile()
                return { isMobile }
            },
            template: '<div />',
        }))

        await wrapper.vm.$nextTick()
        window.dispatchEvent(new Event('resize'))

        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isMobile).toBe(true)
    })

    it('sets isMobile to false when window.innerWidth is greater than or equal to default breakpoint', async () => {
        window.innerWidth = 1200

        const wrapper = mount(defineComponent({
            setup() {
                const { isMobile } = useIsMobile()
                return { isMobile }
            },
            template: '<div />',
        }))

        await wrapper.vm.$nextTick()
        window.dispatchEvent(new Event('resize'))

        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isMobile).toBe(false)
    })

    it('supports custom breakpoint', async () => {
        window.innerWidth = 800

        const wrapper = mount(defineComponent({
            setup() {
                const { isMobile } = useIsMobile(900)
                return { isMobile }
            },
            template: '<div />',
        }))

        await wrapper.vm.$nextTick()
        window.dispatchEvent(new Event('resize'))

        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isMobile).toBe(true)
    })

    it('adds and removes resize event listener on mount and unmount', async () => {
        const wrapper = mount(defineComponent({
            setup() {
                const { isMobile } = useIsMobile()
                return { isMobile }
            },
            template: '<div />',
        }))

        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))

        wrapper.unmount()

        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    })
})
