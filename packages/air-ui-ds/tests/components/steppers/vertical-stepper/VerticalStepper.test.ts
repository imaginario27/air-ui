import { mount } from '@vue/test-utils'
import VerticalStepper from '@/components/steppers/vertical-stepper/VerticalStepper.vue'
import VerticalStep from '@/components/steppers/vertical-stepper/VerticalStep.vue'
import { StepIndicatorType, StepIndicatorSize, StepStatus} from '@/models/enums/steppers'
import type { VerticalStepperItem } from '@/models/types/steppers'

describe('VerticalStepper.vue', () => {
    const items: VerticalStepperItem[] = [
        {
            title: 'Step 1',
            metaTitle: 'Meta 1',
            description: 'Desc 1',
            stepIcon: 'mdiAlphaA',
            stepStatus: StepStatus.COMPLETED,
        },
        {
            title: 'Step 2',
            metaTitle: 'Meta 2',
            description: 'Desc 2',
            stepIcon: 'mdiAlphaB',
            stepStatus: StepStatus.CURRENT,
        },
    ]

    const factory = (props = {}, slots = {}) => {
        return mount(VerticalStepper, {
            props: {
                items,
                stepType: StepIndicatorType.NUMBER,
                stepSize: StepIndicatorSize.SM,
                stepCompletedIcon: 'mdiCheck',
                ...props,
            },
            global: {
                components: {
                    VerticalStep,
                },
            },
            slots,
        })
    }

    it('renders a VerticalStep per item with correct props', () => {
        const wrapper = factory()

        const steps = wrapper.findAllComponents(VerticalStep)
        expect(steps).toHaveLength(items.length)

        steps.forEach((step, index) => {
            const item = items[index]!
            expect(step.props('title')).toBe(item.title)
            expect(step.props('metaTitle')).toBe(item.metaTitle)
            expect(step.props('description')).toBe(item.description)
            expect(step.props('step')).toBe(index + 1)
            expect(step.props('stepIcon')).toBe(item.stepIcon)
            expect(step.props('stepType')).toBe(StepIndicatorType.NUMBER)
            expect(step.props('stepCompletedIcon')).toBe('mdiCheck')
            expect(step.props('stepSize')).toBe(StepIndicatorSize.SM)
            expect(step.props('stepStatus')).toBe(item.stepStatus)
            expect(step.props('isLast')).toBe(index === items.length - 1)
        })
    })

    it('reacts to mouseenter and mouseleave when step interaction is enabled', async () => {
        const wrapper = factory({ isStepInteractive: true })

        const steps = wrapper.findAllComponents(VerticalStep)
        const target = steps[1]

        await target.trigger('mouseenter')
        expect(target.props('isHovered')).toBe(true)

        await target.trigger('mouseleave')
        expect(target.props('isHovered')).toBe(false)
    })

    it('ignores hover interaction when isStepInteractive is false', async () => {
        const wrapper = factory({ isStepInteractive: false })

        const step = wrapper.findAllComponents(VerticalStep)[0]
        await step.trigger('mouseenter')

        expect(step.props('isHovered')).toBe(false)
    })

    it('renders slot content and bypasses step rendering when default slot is present', () => {
        const wrapper = factory(
            { items: [] },
            {
                default: '<div class="custom-slot">Custom Content</div>',
            }
        )

        expect(wrapper.findAllComponents(VerticalStep)).toHaveLength(0)
        expect(wrapper.find('.custom-slot').exists()).toBe(true)
    })
})
