import { mount } from '@vue/test-utils'
import CircleStepper from '@/components/steppers/CircleStepper.vue'
import StepIndicator from '@/components/steppers/StepIndicator.vue'
import Divider from '@/components/dividers/Divider.vue'
import { StepStatus } from '@/models/enums/steppers'

describe('CircleStepper.vue', () => {
    const defaultSteps = [
        { icon: 'mdi:home-outline' },
        { icon: 'mdi:account-outline' },
        { icon: 'mdi:map-marker-star-outline' }
    ]

    const factory = (props = {}) => {
        return mount(CircleStepper, {
            props: {
                modelValue: 2,
                steps: defaultSteps,
                ...props
            },
            global: {
                components: {
                    StepIndicator,
                    Divider
                }
            }
        })
    }

    it('renders correct number of StepIndicators', () => {
        const wrapper = factory()
        const indicators = wrapper.findAllComponents(StepIndicator)
        expect(indicators).toHaveLength(3)
    })

    it('renders correct number of Divider components', () => {
        const wrapper = factory()
        const dividers = wrapper.findAllComponents(Divider)
        expect(dividers).toHaveLength(2) // 3 steps → 2 dividers
    })

    it('applies w-full class when isFullWidth is true', () => {
        const wrapper = factory({ isFullWidth: true })
        expect(wrapper.find('div').classes()).toContain('w-full')
    })

    it('applies w-fit class when isFullWidth is false', () => {
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

    it('passes correct icons to StepIndicators', () => {
        const wrapper = factory()
        const indicators = wrapper.findAllComponents(StepIndicator)

        expect(indicators[0].props('stepIcon')).toBe('mdi:home-outline')
        expect(indicators[1].props('stepIcon')).toBe('mdi:account-outline')
        expect(indicators[2].props('stepIcon')).toBe('mdi:map-marker-star-outline')
    })

    it('supports numeric steps', () => {
        const wrapper = factory({ steps: 4 })
        const indicators = wrapper.findAllComponents(StepIndicator)
        expect(indicators).toHaveLength(4)

        indicators.forEach(indicator => {
            expect(indicator.props('stepIcon')).toBeUndefined()
        })
    })

    it('emits update:modelValue when clicked (interactive)', async () => {
        const wrapper = factory({ isInteractive: true })
        const indicators = wrapper.findAllComponents(StepIndicator)

        await indicators[2].trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([3])
    })

    it('does not emit update:modelValue if not interactive', async () => {
        const wrapper = factory({ isInteractive: false })
        const indicators = wrapper.findAllComponents(StepIndicator)

        await indicators[2].trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('sets isHovered only on hovered step (interactive)', async () => {
        const wrapper = factory({ isInteractive: true })
        const indicators = wrapper.findAllComponents(StepIndicator)

        await indicators[1].trigger('mouseenter')

        expect(indicators[1].props('isHovered')).toBe(true)
        expect(indicators[0].props('isHovered')).toBe(false)
        expect(indicators[2].props('isHovered')).toBe(false)
    })

    it('clears all isHovered values on mouseleave', async () => {
        const wrapper = factory({ isInteractive: true })
        const indicators = wrapper.findAllComponents(StepIndicator)

        await indicators[1].trigger('mouseenter')
        await indicators[1].trigger('mouseleave')

        indicators.forEach(indicator => {
            expect(indicator.props('isHovered')).toBe(false)
        })
    })

    it('applies custom divider class if passed', () => {
        const wrapper = factory({ dividerClass: 'custom-divider' })
        const dividers = wrapper.findAllComponents(Divider)
        dividers.forEach(divider => {
            expect(divider.classes()).toContain('custom-divider')
        })
    })

    it('adds completed border class to divider after completed step', () => {
        const wrapper = factory({ modelValue: 3 })
        const dividers = wrapper.findAllComponents(Divider)

        expect(dividers[0].classes()).toContain('!border-border-primary-brand-active')
    })

    it('does not add completed border class if previous step not completed', () => {
        const wrapper = factory({ modelValue: 1 })
        const dividers = wrapper.findAllComponents(Divider)

        dividers.forEach(div => {
            expect(div.classes()).not.toContain('!border-border-primary-brand-active')
        })
    })
})
