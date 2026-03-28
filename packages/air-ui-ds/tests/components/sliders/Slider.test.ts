import { mount } from '@vue/test-utils'
import Slider from '~/components/sliders/Slider.vue'
import { SliderType, SliderSize } from '@/models/enums/sliders'
import { Orientation } from '@/models/enums/orientations'

const factory = (props: Record<string, unknown> = {}) => {
    return mount(Slider, {
        props: {
            modelValue: 25,
            ...props,
        },
    })
}

describe('Slider.vue', () => {
    it('renders one thumb for single slider mode', () => {
        const wrapper = factory({ type: SliderType.SINGLE })
        const thumbs = wrapper.findAll('[data-testid^="slider-thumb-"]')

        expect(thumbs).toHaveLength(1)
    })

    it('renders two thumbs for range slider mode', () => {
        const wrapper = factory({
            type: SliderType.RANGE,
            modelValue: [20, 80],
        })

        const thumbs = wrapper.findAll('[data-testid^="slider-thumb-"]')
        expect(thumbs).toHaveLength(2)
    })

    it('renders tooltips with current values when hasTooltip is true', () => {
        const wrapper = factory({
            type: SliderType.RANGE,
            modelValue: [20, 80],
            hasTooltip: true,
        })

        const tooltip0 = wrapper.find('[data-testid="slider-tooltip-0"]')
        const tooltip1 = wrapper.find('[data-testid="slider-tooltip-1"]')

        expect(tooltip0.exists()).toBe(true)
        expect(tooltip1.exists()).toBe(true)
        expect(tooltip0.text()).toBe('20')
        expect(tooltip1.text()).toBe('80')
    })

    it('emits updated modelValue on keyboard increment', async () => {
        const wrapper = factory({ modelValue: 10, step: 5 })
        const thumb = wrapper.find('[data-testid="slider-thumb-0"]')

        await thumb.trigger('keydown', { key: 'ArrowRight' })

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(15)
    })

    it('respects Home and End keyboard controls', async () => {
        const wrapper = factory({ modelValue: 40, min: 10, max: 90 })
        const thumb = wrapper.find('[data-testid="slider-thumb-0"]')

        await thumb.trigger('keydown', { key: 'Home' })
        await thumb.trigger('keydown', { key: 'End' })

        const events = wrapper.emitted('update:modelValue')
        expect(events).toBeTruthy()
        expect(events?.[0]?.[0]).toBe(10)
        expect(events?.[1]?.[0]).toBe(90)
    })

    it('applies size and orientation variants', () => {
        const wrapper = factory({
            size: SliderSize.LG,
            orientation: Orientation.VERTICAL,
        })

        expect(wrapper.classes()).toContain('h-[240px]')
        expect(wrapper.find('[data-testid="slider-track"]').exists()).toBe(true)
    })

    it('does not dim the whole slider when disabled', () => {
        const wrapper = factory({ disabled: true })

        expect(wrapper.classes()).not.toContain('opacity-disabled')
        expect(wrapper.find('[data-testid="slider-thumb-0"]').attributes('disabled')).toBeDefined()
    })

    it('applies custom numeric border radius when provided', () => {
        const wrapper = factory({ borderRadius: 10 })

        const track = wrapper.find('[data-testid="slider-track"]')
        const fill = wrapper.find('[data-testid="slider-fill"]')
        const thumb = wrapper.find('[data-testid="slider-thumb-0"]')

        expect(track.attributes('style')).toContain('border-radius: 10px')
        expect(fill.attributes('style')).toContain('border-radius: 10px')
        expect(thumb.attributes('style')).toContain('border-radius: 10px')
    })
})
