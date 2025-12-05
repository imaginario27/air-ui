import { mount } from '@vue/test-utils'
import CircleStepper from '@/components/steppers/CircleStepper.vue'
import StepIndicator from '@/components/steppers/StepIndicator.vue'
import Divider from '@/components/dividers/Divider.vue'
import { StepStatus } from '@/models/enums/steppers'

describe('CircleStepper.vue', () => {
    const defaultSteps = [
        { icon: 'mdiHomeOutline' },
        { icon: 'mdiAccountOutline' },
        { icon: 'mdiMapMarkerStarOutline' },
    ]

    const factory = (props = {}) => {
        return mount(CircleStepper, {
            props: {
                modelValue: 2,
                steps: defaultSteps,
                ...props,
            },
            global: {
                components: {
                    StepIndicator,
                    Divider,
                },
            },
        })
    }

    it('renders correct number of StepIndicators', () => {
        const wrapper = factory()
        const indicators = wrapper.findAllComponents(StepIndicator)
        expect(indicators).toHaveLength(3)
    })

    it('renders dividers between steps', () => {
        const wrapper = factory()
        const dividers = wrapper.findAllComponents(Divider)
        expect(dividers).toHaveLength(2) // n - 1 dividers
    })

    it('applies full width class if isFullWidth is true', () => {
        const wrapper = factory({ isFullWidth: true })
        expect(wrapper.find('div').classes()).toContain('w-full')
    })

    it('applies fit width class if isFullWidth is false', () => {
        const wrapper = factory({ isFullWidth: false })
        expect(wrapper.find('div').classes()).toContain('w-fit')
    })

    it('assigns correct statuses based on modelValue', () => {
        const wrapper = factory({ modelValue: 2 })
        const indicators = wrapper.findAllComponents(StepIndicator)

        expect(indicators[0].props('status')).toBe(StepStatus.COMPLETED)
        expect(indicators[1].props('status')).toBe(StepStatus.CURRENT)
        expect(indicators[2].props('status')).toBe(StepStatus.INACTIVE)
    })

    it('supports numeric steps prop', () => {
        const wrapper = factory({ steps: 4 })
        const indicators = wrapper.findAllComponents(StepIndicator)
        expect(indicators).toHaveLength(4)
    })

    it('emits update:modelValue on click when interactive', async () => {
        const wrapper = factory({ isInteractive: true })
        const indicators = wrapper.findAllComponents(StepIndicator)

        await indicators[2].trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([3])
    })

    it('does not emit update:modelValue on click when not interactive', async () => {
        const wrapper = factory({ isInteractive: false })
        const indicators = wrapper.findAllComponents(StepIndicator)

        await indicators[2].trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('sets isHovered on correct step on mouseenter', async () => {
        const wrapper = factory({ isInteractive: true })
        const indicators = wrapper.findAllComponents(StepIndicator)

        await indicators[1].trigger('mouseenter')
        expect(indicators[1].props('isHovered')).toBe(true)

        // others should be false
        expect(indicators[0].props('isHovered')).toBe(false)
        expect(indicators[2].props('isHovered')).toBe(false)
    })

    it('clears isHovered on mouseleave', async () => {
        const wrapper = factory({ isInteractive: true })
        const indicators = wrapper.findAllComponents(StepIndicator)

        await indicators[1].trigger('mouseenter')
        await indicators[1].trigger('mouseleave')

        // After leave, all should be false
        indicators.forEach(indicator => {
            expect(indicator.props('isHovered')).toBe(false)
        })
    })

    it('applies custom divider class if provided', () => {
        const wrapper = factory({ dividerClass: 'bg-red-500' })
        const divider = wrapper.findComponent(Divider)
        expect(divider.classes()).toContain('bg-red-500')
    })

    it('applies completed border class to divider if previous step is completed', () => {
        const wrapper = factory({ modelValue: 3 })
        const dividers = wrapper.findAllComponents(Divider)

        // Divider after step 1 should have completed class
        expect(dividers[0].classes()).toContain('!border-border-primary-brand-active')
    })
})
