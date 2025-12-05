import { mount } from '@vue/test-utils'
import Loading from '@/components/loaders/Loading.vue'
import Spinner from '@/components/spinners/Spinner.vue'
import { LoadingSpinnerSize } from '~/models/enums/loaders'

vi.useFakeTimers()

describe('Loading.vue', () => {
    const factory = (props = {}) => {
        return mount(Loading, {
            props,
        })
    }

    it('renders Spinner and initial text when isLoading is true', () => {
        const wrapper = factory({ text: 'Loading', isLoading: true })

        expect(wrapper.findComponent(Spinner).exists()).toBe(true)
        expect(wrapper.text()).toContain('Loading')
    })

    it('does not render when isLoading is false', () => {
        const wrapper = factory({ isLoading: false })

        expect(wrapper.findComponent(Spinner).exists()).toBe(false)
        expect(wrapper.text()).toBe('')
    })

    it('animates dots when isLoading is true', async () => {
        const wrapper = factory({ text: 'Loading', isLoading: true })

        vi.advanceTimersByTime(500)
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('Loading.')

        vi.advanceTimersByTime(500)
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('Loading..')

        vi.advanceTimersByTime(500)
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('Loading...')

        vi.advanceTimersByTime(500)
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('Loading')
    })

    it('stops animation and removes content when isLoading becomes false', async () => {
        const wrapper = factory({ text: 'Loading', isLoading: true })

        vi.advanceTimersByTime(1500)
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).not.toBe('Loading')

        await wrapper.setProps({ isLoading: false })
        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent(Spinner).exists()).toBe(false)
        expect(wrapper.text()).toBe('')
    })

    it('cleans up interval on unmount', () => {
        const wrapper = factory({ isLoading: true })
        const clearSpy = vi.spyOn(global, 'clearInterval')

        wrapper.unmount()

        expect(clearSpy).toHaveBeenCalled()
    })

    it('applies correct spinner size class based on spinnerSize prop', () => {
        const wrapper = factory({ spinnerSize: LoadingSpinnerSize.XL })

        const spinner = wrapper.findComponent(Spinner)
        expect(spinner.classes()).toContain('w-[40px]')
        expect(spinner.classes()).toContain('h-[40px]')
        expect(spinner.classes()).toContain('border-3')
    })

})