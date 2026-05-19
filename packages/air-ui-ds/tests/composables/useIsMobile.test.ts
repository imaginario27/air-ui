import { mount } from '@vue/test-utils'
import { ref } from 'vue'
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

    it('reacts when a reactive breakpoint changes', async () => {
        window.innerWidth = 800
        const breakpoint = ref(700)

        const wrapper = mount(defineComponent({
            setup() {
                const { isMobile } = useIsMobile(breakpoint)
                return { isMobile }
            },
            template: '<div />',
        }))

        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isMobile).toBe(false) // 800 >= 700

        breakpoint.value = 900
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isMobile).toBe(true) // 800 < 900, no resize event needed
    })

    it('supports a getter breakpoint', async () => {
        window.innerWidth = 800
        const breakpoint = ref(700)

        const wrapper = mount(defineComponent({
            setup() {
                const { isMobile } = useIsMobile(() => breakpoint.value)
                return { isMobile }
            },
            template: '<div />',
        }))

        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isMobile).toBe(false)

        breakpoint.value = 1000
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
