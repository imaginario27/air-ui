import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import AngleSliderField from '~/components/forms/fields/AngleSliderField.vue'
import AngleSlider from '~/components/sliders/AngleSlider.vue'
import { Position } from '@/models/enums/positions'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref('blur')
}))

const factory = (props: Record<string, unknown> = {}) => {
    return mount(AngleSliderField, {
        props: {
            id: 'rotation',
            modelValue: 90,
            ...props,
        },
    })
}

describe('AngleSliderField.vue', () => {
    it('renders label and help text', () => {
        const wrapper = factory({ label: 'Rotation', helpText: 'Pick an angle', required: true })

        expect(wrapper.find('label').text()).toBe('Rotation')
        expect(wrapper.text()).toContain('Pick an angle')
    })

    it('links the label to the slider thumb through aria-labelledby', () => {
        const wrapper = factory({ label: 'Rotation' })

        expect(wrapper.find('label').attributes('id')).toBe('rotation-label')
        expect(wrapper.find('[role="slider"]').attributes('aria-labelledby')).toBe('rotation-label')
    })

    it('passes slider props to the AngleSlider component', () => {
        const wrapper = factory({ step: 5, isRounded: true, showMarkers: true, showValue: false, valueLabel: 'deg', readOnly: true })
        const slider = wrapper.findComponent(AngleSlider)

        expect(slider.props('modelValue')).toBe(90)
        expect(slider.props('step')).toBe(5)
        expect(slider.props('isRounded')).toBe(true)
        expect(slider.props('showMarkers')).toBe(true)
        expect(slider.props('showValue')).toBe(false)
        expect(slider.props('valueLabel')).toBe('deg')
        expect(slider.props('readOnly')).toBe(true)
    })

    it('emits update:modelValue and change-end from the slider', async () => {
        const wrapper = factory()
        const slider = wrapper.findComponent(AngleSlider)

        await slider.vm.$emit('update:modelValue', 120)
        await slider.vm.$emit('change-end', 120)

        expect(wrapper.emitted('update:modelValue')).toEqual([[120]])
        expect(wrapper.emitted('change-end')).toEqual([[120]])
    })

    it('shows error text over help text when error exists', () => {
        const wrapper = factory({ helpText: 'Helpful note', error: 'Required field' })

        expect(wrapper.find('p').text()).toBe('Required field')
    })

    it('renders help text before the slider when helpTextPosition is top', () => {
        const wrapper = factory({ helpText: 'Drag to set', helpTextPosition: Position.TOP })
        const children = Array.from(wrapper.element.children)

        expect(children[0]!.tagName).toBe('P')
    })

    it('runs validation and emits update:error on value changes', async () => {
        const validator = vi.fn().mockReturnValue('Invalid angle')
        const wrapper = factory({ required: true, validator })

        await wrapper.findComponent(AngleSlider).vm.$emit('update:modelValue', 200)

        expect(validator).toHaveBeenCalledWith(200)
        expect(wrapper.emitted('update:error')?.[0]?.[0]).toBe('Invalid angle')
    })
})
