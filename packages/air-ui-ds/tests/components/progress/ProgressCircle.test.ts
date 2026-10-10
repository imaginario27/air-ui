import { mount } from '@vue/test-utils'
import ProgressCircle from '~/components/progress/ProgressCircle.vue'
import { ColorAccent } from '@/models/enums/colors'
import { ProgressCircleSize, ProgressCircleLabelPosition } from '@/models/enums/progress'

const factory = (props: Record<string, unknown> = {}, slots: Record<string, string> = {}) => {
    return mount(ProgressCircle, { props, slots })
}

const indicator = (wrapper: ReturnType<typeof factory>) => {
    return wrapper.find('[data-testid="progress-circle-indicator"]')
}

describe('ProgressCircle', () => {
    it('renders a progressbar with default props', () => {
        const wrapper = factory()
        const root = wrapper.find('[role="progressbar"]')

        expect(root.attributes('aria-valuenow')).toBe('50')
        expect(root.attributes('aria-valuemin')).toBe('0')
        expect(root.attributes('aria-valuemax')).toBe('100')
        expect(root.attributes('aria-label')).toBe('Progress')
        expect(root.attributes('style')).toContain('width: 72px')
    })

    it('fills the arc proportionally to the progress', () => {
        const [filled, total] = indicator(factory({ progress: 25 })).attributes('stroke-dasharray')!.split(' ').map(Number)

        expect(filled! / total!).toBeCloseTo(0.25)
    })

    it('uses min and max to compute the percentage', () => {
        const wrapper = factory({ progress: 15, min: 10, max: 20, showProgressLabel: true })

        expect(wrapper.find('[data-testid="progress-circle-label"]').text()).toBe('50%')
    })

    it.each([
        [-10, '0%'],
        [250, '100%'],
    ])('clamps progress %s to %s', (progress, expected) => {
        const wrapper = factory({ progress, showProgressLabel: true })

        expect(wrapper.find('[data-testid="progress-circle-label"]').text()).toBe(expected)
    })

    it('does not render the indicator at 0%', () => {
        expect(indicator(factory({ progress: 0 })).exists()).toBe(false)
    })

    it('does not render the label by default', () => {
        expect(factory().find('[data-testid="progress-circle-label"]').exists()).toBe(false)
    })

    it('renders the label inside the ring by default when enabled', () => {
        const wrapper = factory({ progress: 27, showProgressLabel: true })
        const label = wrapper.find('[data-testid="progress-circle-label"]')

        expect(label.text()).toBe('27%')
        expect(wrapper.find('[role="progressbar"]').element.contains(label.element)).toBe(true)
    })

    it.each([
        [ProgressCircleLabelPosition.TOP, 0],
        [ProgressCircleLabelPosition.BOTTOM, 1],
    ])('renders the label outside the ring at the %s', (position, index) => {
        const wrapper = factory({ showProgressLabel: true, progressLabelPosition: position })
        const children = Array.from(wrapper.element.children)

        expect(children).toHaveLength(2)
        expect(children[index]!.getAttribute('data-testid')).toBe('progress-circle-label')
    })

    it('renders custom center content through the default slot', () => {
        const wrapper = factory({}, { default: '<span data-testid="custom">Done</span>' })

        expect(wrapper.find('[data-testid="custom"]').exists()).toBe(true)
    })

    it('uses round caps by default and butt caps when isRounded is false', () => {
        expect(indicator(factory()).attributes('stroke-linecap')).toBe('round')
        expect(indicator(factory({ isRounded: false })).attributes('stroke-linecap')).toBe('butt')
    })

    it('shows a spinning quarter arc and loading text when indeterminate', () => {
        const wrapper = factory({ isIndeterminate: true, showProgressLabel: true, progressLabelPosition: ProgressCircleLabelPosition.BOTTOM, loadingText: 'Please wait...' })
        const [filled, total] = indicator(wrapper).attributes('stroke-dasharray')!.split(' ').map(Number)
        const root = wrapper.find('[role="progressbar"]')

        expect(wrapper.find('svg').classes()).toContain('animate-spin')
        expect(filled! / total!).toBeCloseTo(0.25)
        expect(root.attributes('aria-valuenow')).toBeUndefined()
        expect(root.attributes('aria-valuetext')).toBe('Please wait...')
        expect(wrapper.find('[data-testid="progress-circle-label"]').text()).toBe('Please wait...')
    })

    it('hides the center label when indeterminate', () => {
        const wrapper = factory({ isIndeterminate: true, showProgressLabel: true })

        expect(wrapper.find('[data-testid="progress-circle-label"]').exists()).toBe(false)
    })

    it('uses the aria label when provided', () => {
        expect(factory({ ariaLabel: 'Upload' }).find('[role="progressbar"]').attributes('aria-label')).toBe('Upload')
    })

    it.each([
        [ProgressCircleSize.XS, 32],
        [ProgressCircleSize.SM, 48],
        [ProgressCircleSize.MD, 72],
        [ProgressCircleSize.LG, 96],
        [ProgressCircleSize.XL, 128],
        [ProgressCircleSize.XXL, 160],
    ])('applies the %s size', (size, px) => {
        const root = factory({ size }).find('[role="progressbar"]')

        expect(root.attributes('style')).toContain(`width: ${px}px`)
        expect(root.attributes('style')).toContain(`height: ${px}px`)
    })

    it.each([
        [ColorAccent.NEUTRAL, 'stroke-background-neutral-default'],
        [ColorAccent.SUCCESS, 'stroke-background-success-bold'],
        [ColorAccent.WARNING, 'stroke-background-warning-bold'],
        [ColorAccent.DANGER, 'stroke-background-danger-bold'],
        [ColorAccent.INFO, 'stroke-background-info-bold'],
        [ColorAccent.PRIMARY_BRAND, 'stroke-background-primary-brand-default'],
        [ColorAccent.SECONDARY_BRAND, 'stroke-background-secondary-brand-default'],
    ])('applies the %s color to the indicator', (color, expectedClass) => {
        expect(indicator(factory({ color })).classes()).toContain(expectedClass)
    })
})
