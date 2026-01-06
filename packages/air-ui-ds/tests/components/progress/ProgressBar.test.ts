import { mount } from '@vue/test-utils'
import ProgressBar from '~/components/progress/ProgressBar.vue'
import { ColorAccent } from '@/models/enums/colors'
import { ProgressBarSize } from '@/models/enums/progress'
import { Position, Align } from '@/models/enums/positions'

const factory = (props: Record<string, any> = {}) => {
    return mount(ProgressBar, {
        props,
    })
}

const findBarContainer = (wrapper: ReturnType<typeof factory>) => {
    return wrapper.findAll('div').find(div =>
        div.classes().some(cls => cls.startsWith('h-['))
    )
}

const findProgressBar = (wrapper: ReturnType<typeof factory>) => {
    return wrapper.findAll('div').find(div =>
        div.attributes('style')?.includes('width')
    )
}

describe('ProgressBar', () => {
    it('renders with default props', () => {
        const wrapper = factory()

        expect(wrapper.html()).toContain('w-full')
        expect(wrapper.find('.bg-background-primary-brand-default/10').exists()).toBe(true)

        const container = findBarContainer(wrapper)
        expect(container).toBeDefined()
        expect(container?.classes()).toContain('h-[8px]')
    })

    it('renders progress bar with correct width when progress is set', () => {
        const wrapper = factory({ progress: 75 })

        const bar = findProgressBar(wrapper)
        expect(bar).toBeDefined()
        expect(bar?.attributes('style')).toContain('width: 75%')
    })

    it('does not render progress bar when clamped progress equals min', () => {
        const wrapper = factory({ progress: -10, min: 0, max: 100 })

        // normalizedProgress === 0 → v-if prevents rendering
        expect(findProgressBar(wrapper)).toBeUndefined()
    })

    it('clamps progress greater than max to 100%', () => {
        const wrapper = factory({ progress: 120, min: 0, max: 100 })

        const bar = findProgressBar(wrapper)
        expect(bar).toBeDefined()
        expect(bar?.attributes('style')).toContain('width: 100%')
    })

    it('shows label at the top when configured', () => {
        const wrapper = factory({
            showProgressLabel: true,
            progressLabelPosition: Position.TOP,
            progress: 42,
        })

        const label = wrapper.find('div.text-xs')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('42%')
    })

    it('shows label at the bottom when configured', () => {
        const wrapper = factory({
            showProgressLabel: true,
            progressLabelPosition: Position.BOTTOM,
            progress: 42,
        })

        const label = wrapper.find('div.text-xs')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('42%')
    })

    it('displays loading text when in indeterminate mode', () => {
        const wrapper = factory({
            isIndeterminate: true,
            showProgressLabel: true,
            loadingText: 'Please wait...',
        })

        expect(wrapper.text()).toContain('Please wait...')
    })

    it('renders indeterminate bar instead of progress bar when isIndeterminate is true', () => {
        const wrapper = factory({ isIndeterminate: true })

        expect(wrapper.find('.indeterminate-bar').exists()).toBe(true)
        expect(findProgressBar(wrapper)).toBeUndefined()
    })

    it('applies custom progressClass and progressLabelClass', () => {
        const wrapper = factory({
            progressClass: 'custom-progress',
            progressLabelClass: 'custom-label',
            showProgressLabel: true,
            progress: 50,
        })

        expect(wrapper.find('.custom-progress').exists()).toBe(true)
        expect(wrapper.find('.custom-label').exists()).toBe(true)
    })

    it('applies rounded-full class when isRounded is true', () => {
        const wrapper = factory({ isRounded: true })

        expect(wrapper.html()).toContain('rounded-full')
    })

    it('does not apply rounded-full class when isRounded is false', () => {
        const wrapper = factory({ isRounded: false })

        expect(wrapper.html()).not.toContain('rounded-full')
    })

    it.each([
        [Align.LEFT, 'text-left'],
        [Align.CENTER, 'text-center'],
        [Align.RIGHT, 'text-right'],
    ])('applies correct label alignment for %s', (align, expectedClass) => {
        const wrapper = factory({
            showProgressLabel: true,
            progressLabelAlignment: align,
        })

        const label = wrapper.find('div.text-xs')
        expect(label.classes()).toContain(expectedClass)
    })

    it.each([
        [ProgressBarSize.XS, 'h-[4px]'],
        [ProgressBarSize.SM, 'h-[8px]'],
        [ProgressBarSize.MD, 'h-[12px]'],
        [ProgressBarSize.LG, 'h-[16px]'],
        [ProgressBarSize.XL, 'h-[20px]'],
    ])('applies correct size class for size %s', (size, expectedClass) => {
        const wrapper = factory({ size })

        const container = findBarContainer(wrapper)
        expect(container).toBeDefined()
        expect(container?.classes()).toContain(expectedClass)
    })

    it.each([
        [ColorAccent.NEUTRAL, 'bg-background-neutral-default'],
        [ColorAccent.SUCCESS, 'bg-background-success-bold'],
        [ColorAccent.WARNING, 'bg-background-warning-bold'],
        [ColorAccent.DANGER, 'bg-background-danger-bold'],
        [ColorAccent.INFO, 'bg-background-info-bold'],
        [ColorAccent.PRIMARY_BRAND, 'bg-background-primary-brand-default'],
        [ColorAccent.SECONDARY_BRAND, 'bg-background-secondary-brand-default'],
    ])('applies correct completed background color class for color %s', (color, expectedClass) => {
        const wrapper = factory({ color, progress: 50 })

        expect(wrapper.find(`.${expectedClass}`).exists()).toBe(true)
    })

    it.each([
        [ColorAccent.NEUTRAL, 'bg-background-neutral-default/10'],
        [ColorAccent.SUCCESS, 'bg-background-success-bold/10'],
        [ColorAccent.WARNING, 'bg-background-warning-bold/10'],
        [ColorAccent.DANGER, 'bg-background-danger-bold/10'],
        [ColorAccent.INFO, 'bg-background-info-bold/10'],
        [ColorAccent.PRIMARY_BRAND, 'bg-background-primary-brand-default/10'],
        [ColorAccent.SECONDARY_BRAND, 'bg-background-secondary-brand-default/10'],
    ])('applies correct incomplete background color class for color %s', (color, expectedClass) => {
        const wrapper = factory({ color })

        expect(wrapper.find(`.${expectedClass}`).exists()).toBe(true)
    })
})
