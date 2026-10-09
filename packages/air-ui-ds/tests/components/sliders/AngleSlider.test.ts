import { mount } from '@vue/test-utils'
import AngleSlider from '~/components/sliders/AngleSlider.vue'
import { AngleSliderSize } from '@/models/enums/sliders'
import { ColorAccent } from '@/models/enums/colors'

const factory = (props: Record<string, unknown> = {}, slots: Record<string, string> = {}) => {
    return mount(AngleSlider, {
        props: {
            modelValue: 90,
            ...props,
        },
        slots,
    })
}

describe('AngleSlider.vue', () => {
    it('renders the value with a degree sign and the default label', () => {
        const wrapper = factory({ modelValue: 296 })

        expect(wrapper.find('[data-testid="angle-slider-value"]').text()).toBe('296°')
        expect(wrapper.find('[data-testid="angle-slider-value-label"]').text()).toBe('degrees')
    })

    it('hides the value when showValue is false', () => {
        const wrapper = factory({ showValue: false })

        expect(wrapper.find('[data-testid="angle-slider-value"]').exists()).toBe(false)
    })

    it('hides the value label when valueLabel is empty', () => {
        const wrapper = factory({ valueLabel: '' })

        expect(wrapper.find('[data-testid="angle-slider-value-label"]').exists()).toBe(false)
    })

    it('renders custom center content through the default slot', () => {
        const wrapper = factory({ showValue: false }, { default: '<span data-testid="custom">Custom</span>' })

        expect(wrapper.find('[data-testid="custom"]').exists()).toBe(true)
    })

    it('exposes slider accessibility attributes', () => {
        const wrapper = factory({ modelValue: 45, ariaLabel: 'Rotation' })
        const thumb = wrapper.find('[data-testid="angle-slider-thumb"]')

        expect(thumb.attributes('role')).toBe('slider')
        expect(thumb.attributes('aria-label')).toBe('Rotation')
        expect(thumb.attributes('aria-valuemin')).toBe('0')
        expect(thumb.attributes('aria-valuemax')).toBe('360')
        expect(thumb.attributes('aria-valuenow')).toBe('45')
        expect(thumb.attributes('aria-valuetext')).toBe('45 degrees')
    })

    it('uses ariaLabelledby instead of ariaLabel when provided', () => {
        const wrapper = factory({ ariaLabel: 'Rotation', ariaLabelledby: 'label-id' })
        const thumb = wrapper.find('[data-testid="angle-slider-thumb"]')

        expect(thumb.attributes('aria-labelledby')).toBe('label-id')
        expect(thumb.attributes('aria-label')).toBeUndefined()
    })

    it('positions the thumb at the top for 0 degrees and at the right for 90 degrees', () => {
        const top = factory({ modelValue: 0, size: AngleSliderSize.MD })
        const right = factory({ modelValue: 90, size: AngleSliderSize.MD })

        const topStyle = top.find('[data-testid="angle-slider-thumb"]').attributes('style')
        const rightStyle = right.find('[data-testid="angle-slider-thumb"]').attributes('style')

        // MD: dial 160, thumb 24 -> radius 68, center 80
        expect(topStyle).toContain('left: 68px')
        expect(topStyle).toContain('top: 0px')
        expect(rightStyle).toContain('left: 136px')
        expect(rightStyle).toContain('top: 68px')
    })

    it('fills the arc proportionally to the value', () => {
        const wrapper = factory({ modelValue: 180 })
        const fill = wrapper.find('[data-testid="angle-slider-fill"]')
        const [filled, total] = fill.attributes('stroke-dasharray')!.split(' ').map(Number)

        expect(filled! / total!).toBeCloseTo(0.5)
    })

    it('does not render markers by default', () => {
        expect(factory().findAll('[data-testid="angle-slider-marker"]')).toHaveLength(0)
    })

    it('renders 12 markers when showMarkers is true', () => {
        const wrapper = factory({ showMarkers: true })

        expect(wrapper.findAll('[data-testid="angle-slider-marker"]')).toHaveLength(12)
    })

    it('uses butt caps by default and round caps when isRounded', () => {
        const fill = (props = {}) => factory({ modelValue: 90, ...props }).find('[data-testid="angle-slider-fill"]')

        expect(fill().attributes('stroke-linecap')).toBe('butt')
        expect(fill({ isRounded: true }).attributes('stroke-linecap')).toBe('round')
    })

    it('keeps butt caps at 0 degrees so no dot is drawn when isRounded', () => {
        const fill = factory({ modelValue: 0, isRounded: true }).find('[data-testid="angle-slider-fill"]')

        expect(fill.attributes('stroke-linecap')).toBe('butt')
    })

    it('clamps the value between 0 and 360', () => {
        expect(factory({ modelValue: 500 }).find('[data-testid="angle-slider-value"]').text()).toBe('360°')
        expect(factory({ modelValue: -20 }).find('[data-testid="angle-slider-value"]').text()).toBe('0°')
    })

    it('emits updated modelValue and change-end on keyboard increment', async () => {
        const wrapper = factory({ modelValue: 10, step: 5 })
        const thumb = wrapper.find('[data-testid="angle-slider-thumb"]')

        await thumb.trigger('keydown', { key: 'ArrowRight' })

        expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(15)
        expect(wrapper.emitted('change-end')?.[0]?.[0]).toBe(15)
    })

    it('decrements with ArrowLeft and clamps at 0', async () => {
        const wrapper = factory({ modelValue: 0 })
        const thumb = wrapper.find('[data-testid="angle-slider-thumb"]')

        await thumb.trigger('keydown', { key: 'ArrowLeft' })

        expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(0)
    })

    it('respects Home, End and Page keys', async () => {
        const wrapper = factory({ modelValue: 100 })
        const thumb = wrapper.find('[data-testid="angle-slider-thumb"]')

        await thumb.trigger('keydown', { key: 'Home' })
        await thumb.trigger('keydown', { key: 'End' })
        await thumb.trigger('keydown', { key: 'PageUp' })

        const events = wrapper.emitted('update:modelValue')
        expect(events?.[0]?.[0]).toBe(0)
        expect(events?.[1]?.[0]).toBe(360)
        expect(events?.[2]?.[0]).toBe(110)
    })

    it.each([
        [{ disabled: true }],
        [{ readOnly: true }],
    ])('ignores keyboard input when %o', async props => {
        const wrapper = factory(props)
        const thumb = wrapper.find('[data-testid="angle-slider-thumb"]')

        await thumb.trigger('keydown', { key: 'ArrowRight' })

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('disables the thumb when disabled', () => {
        const wrapper = factory({ disabled: true })

        expect(wrapper.find('[data-testid="angle-slider-thumb"]').attributes('disabled')).toBeDefined()
        expect(wrapper.classes()).toContain('cursor-not-allowed')
        expect(wrapper.classes()).toContain('opacity-disabled')
    })

    it('does not dim the thumb twice when disabled', () => {
        const wrapper = factory({ disabled: true })

        expect(wrapper.find('[data-testid="angle-slider-thumb"]').classes()).toContain('disabled:opacity-100!')
    })

    it('marks the thumb as read-only when readOnly', () => {
        const wrapper = factory({ readOnly: true })

        expect(wrapper.find('[data-testid="angle-slider-thumb"]').attributes('aria-readonly')).toBe('true')
    })

    it.each([
        [AngleSliderSize.XS, 80],
        [AngleSliderSize.SM, 112],
        [AngleSliderSize.MD, 160],
        [AngleSliderSize.LG, 208],
        [AngleSliderSize.XL, 256],
        [AngleSliderSize.XXL, 320],
    ])('applies the %s size', (size, px) => {
        const wrapper = factory({ size })

        expect(wrapper.attributes('style')).toContain(`width: ${px}px`)
        expect(wrapper.attributes('style')).toContain(`height: ${px}px`)
    })

    it.each([
        [ColorAccent.NEUTRAL, 'stroke-background-neutral-bold'],
        [ColorAccent.SUCCESS, 'stroke-background-success-bold'],
        [ColorAccent.WARNING, 'stroke-background-warning-bold'],
        [ColorAccent.DANGER, 'stroke-background-danger-bold'],
        [ColorAccent.INFO, 'stroke-background-info-bold'],
        [ColorAccent.PRIMARY_BRAND, 'stroke-background-primary-brand-default'],
        [ColorAccent.SECONDARY_BRAND, 'stroke-background-secondary-brand-default'],
    ])('applies the %s color to the filled arc', (color, expectedClass) => {
        const wrapper = factory({ color })

        expect(wrapper.find('[data-testid="angle-slider-fill"]').classes()).toContain(expectedClass)
    })
})
