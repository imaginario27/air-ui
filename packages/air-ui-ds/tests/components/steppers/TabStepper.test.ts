import { mount } from '@vue/test-utils'
import TabStepper from '@/components/steppers/TabStepper.vue'
import Step from '@/components/steppers/Step.vue'
import { StepStatus, StepIndicatorSize, StepIndicatorType } from '@/models/enums/steppers'

const defaultSteps = [
    { title: 'Step 1', description: 'Desc 1' },
    { title: 'Step 2', description: 'Desc 2' },
    { title: 'Step 3', description: 'Desc 3' },
]

describe('TabStepper.vue', () => {
    const factory = (props = {}) => {
        return mount(TabStepper, {
            props: {
                modelValue: 2,
                steps: defaultSteps,
                ...props,
            },
            global: {
                components: {
                    Step,
                },
            },
        })
    }

    it('renders all steps', () => {
        const wrapper = factory()
        const steps = wrapper.findAllComponents(Step)
        expect(steps.length).toBe(3)
    })

    it('assigns correct step statuses based on modelValue', () => {
        const wrapper = factory({ modelValue: 2 })
        const steps = wrapper.findAllComponents(Step)

        expect(steps[0].props('status')).toBe(StepStatus.COMPLETED)
        expect(steps[1].props('status')).toBe(StepStatus.CURRENT)
        expect(steps[2].props('status')).toBe(StepStatus.INACTIVE)
    })

    it('renders chevron dividers between steps when hasDivider is true', () => {
        const wrapper = factory({ hasDivider: true })
        const chevrons = wrapper.findAll('svg')
        expect(chevrons.length).toBe(2) // n - 1 chevrons
    })

    it('does not render chevron dividers when hasDivider is false', () => {
        const wrapper = factory({ hasDivider: false })
        expect(wrapper.find('svg').exists()).toBe(false)
    })

    it('applies "w-full" class when isFullWidth is true', () => {
        const wrapper = factory({ isFullWidth: true })
        const root = wrapper.find('div')
        expect(root.classes()).toContain('w-full')
    })

    it('applies "w-fit" class when isFullWidth is false', () => {
        const wrapper = factory({ isFullWidth: false })
        const root = wrapper.find('div')
        expect(root.classes()).toContain('w-fit')
    })

    it('applies "justify-between" when hasDivider and justifySteps are true', () => {
        const wrapper = factory({ hasDivider: true, justifySteps: true })
        const root = wrapper.find('div')
        expect(root.classes()).toContain('justify-between')
    })

    it('does not apply "justify-between" when hasDivider is false', () => {
        const wrapper = factory({ hasDivider: false, justifySteps: true })
        const root = wrapper.find('div')
        expect(root.classes()).not.toContain('justify-between')
    })

    it('does not emit update:modelValue when isInteractive is false', async () => {
        const wrapper = factory({ isInteractive: false })
        const steps = wrapper.findAllComponents(Step)

        await steps[2].trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits update:modelValue with correct index + 1 when isInteractive is true', async () => {
        const wrapper = factory({ isInteractive: true })
        const steps = wrapper.findAllComponents(Step)

        await steps[2].trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([3])
    })

    it('passes type, size, completedIcon, isInteractive props to each Step', () => {
        const wrapper = factory({
            type: StepIndicatorType.ICON,
            size: StepIndicatorSize.LG,
            completedIcon: 'mdi:check',
            isInteractive: true,
        })

        const step = wrapper.findComponent(Step)
        expect(step.props('type')).toBe(StepIndicatorType.ICON)
        expect(step.props('size')).toBe(StepIndicatorSize.LG)
        expect(step.props('completedIcon')).toBe('mdi:check')
        expect(step.props('isInteractive')).toBe(true)
    })
})
