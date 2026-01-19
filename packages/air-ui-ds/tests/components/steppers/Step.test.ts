import { mount } from '@vue/test-utils'
import Step from '@/components/steppers/Step.vue'
import StepIndicator from '@/components/steppers/StepIndicator.vue'
import { StepStatus, StepIndicatorType, StepIndicatorSize } from '@/models/enums/steppers'

describe('Step.vue', () => {
    const defaultProps = {
        title: 'My Step Title',
        step: 1,
        status: StepStatus.INACTIVE,
        type: StepIndicatorType.NUMBER,
        size: StepIndicatorSize.XL,
        isInteractive: false,
    }

    const factory = (props = {}) => {
        return mount(Step, {
            props: {
                ...defaultProps,
                ...props,
            },
            global: {
                components: {
                    StepIndicator,
                },
            },
        })
    }

    it('renders the title correctly', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('My Step Title')
    })

    it('does not render description if not provided', () => {
        const wrapper = factory()
        expect(wrapper.find('p').exists()).toBe(false)
    })

    it('renders description when provided', () => {
        const wrapper = factory({ description: 'Step description here' })
        const desc = wrapper.find('p')
        expect(desc.exists()).toBe(true)
        expect(desc.text()).toBe('Step description here')
    })

    it('applies "items-center" when description is not present', () => {
        const wrapper = factory()
        const root = wrapper.find('div')
        expect(root.classes()).toContain('items-center')
    })

    it('does not apply "items-center" when description is present', () => {
        const wrapper = factory({ description: 'With desc' })
        const root = wrapper.find('div')
        expect(root.classes()).not.toContain('items-center')
    })

    it('applies "cursor-pointer group" when isInteractive is true', () => {
        const wrapper = factory({ isInteractive: true })
        const root = wrapper.find('div')
        expect(root.classes()).toContain('cursor-pointer')
        expect(root.classes()).toContain('group')
    })

    it('does not apply interactive classes when isInteractive is false', () => {
        const wrapper = factory({ isInteractive: false })
        const root = wrapper.find('div')
        expect(root.classes()).not.toContain('cursor-pointer')
        expect(root.classes()).not.toContain('group')
    })

    it('passes correct props to StepIndicator', () => {
        const wrapper = factory({
            stepIcon: 'mdi:icon',
            completedIcon: 'mdi:check',
        })

        const indicator = wrapper.findComponent(StepIndicator)
        expect(indicator.exists()).toBe(true)

        expect(indicator.props()).toMatchObject({
            type: StepIndicatorType.NUMBER,
            status: StepStatus.INACTIVE,
            size: StepIndicatorSize.XL,
            step: 1,
            stepIcon: 'mdi:icon',
            completedIcon: 'mdi:check',
            isHovered: false,
        })
    })

    it('updates isHovered prop on StepIndicator on mouseenter/mouseleave when interactive', async () => {
        const wrapper = factory({ isInteractive: true })

        const indicator = wrapper.findComponent(StepIndicator)

        await wrapper.trigger('mouseenter')
        expect(indicator.props('isHovered')).toBe(true)

        await wrapper.trigger('mouseleave')
        expect(indicator.props('isHovered')).toBe(false)
    })

    it('does not change isHovered prop on StepIndicator when not interactive', async () => {
        const wrapper = factory({ isInteractive: false })

        const indicator = wrapper.findComponent(StepIndicator)

        await wrapper.trigger('mouseenter')
        expect(indicator.props('isHovered')).toBe(false)

        await wrapper.trigger('mouseleave')
        expect(indicator.props('isHovered')).toBe(false)
    })

    it('applies correct title class based on status', () => {
        const wrapper = factory({ status: StepStatus.CURRENT })
        const title = wrapper.find('span')
        expect(title.classes()).toContain('text-text-primary-brand-active')
    })
})
