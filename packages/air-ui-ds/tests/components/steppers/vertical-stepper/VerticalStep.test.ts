import { mount } from '@vue/test-utils'
import VerticalStep from '@/components/steppers/vertical-stepper/VerticalStep.vue'
import StepIndicator from '@/components/steppers/StepIndicator.vue'
import { StepIndicatorSize, StepIndicatorType, StepStatus } from '@/models/enums/steppers'

describe('VerticalStep.vue', () => {
    const defaultProps = {
        title: 'Step Title',
        metaTitle: 'Meta Title',
        description: 'Step description here.',
        step: 1,
        stepType: StepIndicatorType.NUMBER,
        stepStatus: StepStatus.CURRENT,
        stepSize: StepIndicatorSize.SM,
        stepIcon: 'mdiStar',
        stepCompletedIcon: 'mdiCheck',
        isLast: false,
        hasStepper: true,
        hasStepperGap: true,
        showLine: true,
        isHovered: false,
    }

    const factory = (props = {}, slots = {}) => {
        return mount(VerticalStep, {
            props: {
                ...defaultProps,
                ...props,
            },
            global: {
                components: {
                    StepIndicator,
                },
            },
            slots,
        })
    }

    it('renders title, metaTitle, and description correctly', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain(defaultProps.title)
        expect(wrapper.text()).toContain(defaultProps.metaTitle)
        expect(wrapper.text()).toContain(defaultProps.description)
    })

    it('renders StepIndicator with correct props', () => {
        const wrapper = factory()
        const stepIndicator = wrapper.findComponent(StepIndicator)
        expect(stepIndicator.exists()).toBe(true)
        expect(stepIndicator.props()).toMatchObject({
            type: defaultProps.stepType,
            size: defaultProps.stepSize,
            status: defaultProps.stepStatus,
            stepIcon: defaultProps.stepIcon,
            completedIcon: defaultProps.stepCompletedIcon,
            step: defaultProps.step,
            isHovered: defaultProps.isHovered,
        })
    })

    it('renders vertical line when not last step and showLine is true', () => {
        const wrapper = factory({ isLast: false, showLine: true })
        const lines = wrapper.findAll('div').filter(div => {
            return div.classes().some(c => c.includes('bg-border-default') || c.includes('bg-background-primary-brand-default'))
        })
        expect(lines.length).toBeGreaterThan(0)
    })

    it('does not render vertical line when isLast is true', () => {
        const wrapper = factory({ isLast: true })
        const line = wrapper.find('div.bg-border-default, div.bg-background-primary-brand-default')
        expect(line.exists()).toBe(false)
    })

    it('applies correct spacing classes based on stepSize', () => {
        const wrapper = factory({ stepSize: StepIndicatorSize.XL })
        const rootDiv = wrapper.find('div.flex')
        expect(rootDiv.classes()).toContain('pl-14')
    })

    it('applies correct gap class when hasStepperGap is true', () => {
        const wrapper = factory({ stepSize: StepIndicatorSize.SM, hasStepperGap: true })
        const gapDiv = wrapper.find('div.flex-1')
        expect(gapDiv.classes()).toContain('my-0.5')
    })

    it('does not apply gap class when hasStepperGap is false', () => {
        const wrapper = factory({ hasStepperGap: false })
        const gapDiv = wrapper.find('div.flex-1')
        expect(gapDiv.classes().some(cls => cls.startsWith('my-'))).toBe(false)
    })

    it('renders slot content instead of description if description is not provided', () => {
        const wrapper = factory(
            { description: undefined },
            {
                default: '<p class="custom-desc">Custom content here</p>',
            }
        )

        expect(wrapper.find('.custom-desc').exists()).toBe(true)
        expect(wrapper.text()).toContain('Custom content here')
    })

    it('applies correct titleHeaderClass margin when metaTitle is missing', () => {
        const wrapper = factory({ metaTitle: undefined, stepSize: StepIndicatorSize.XL })
        const titleWrapper = wrapper.find('h3')
        expect(titleWrapper.classes()).toContain('text-lg')
    })
})
