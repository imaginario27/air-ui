import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import SliderField from '~/components/forms/fields/SliderField.vue'
import Slider from '~/components/sliders/Slider.vue'
import { SliderType } from '@/models/enums/sliders'
import { Position } from '@/models/enums/positions'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref('blur')
}))

const factory = (props: Record<string, unknown> = {}) => {
    return mount(SliderField, {
        props: {
            id: 'price-slider',
            modelValue: 25,
            ...props,
        },
    })
}

describe('SliderField.vue', () => {
    it('renders label and help text', () => {
        const wrapper = factory({
            label: 'Price',
            helpText: 'Select a value',
        })

        expect(wrapper.find('label').text()).toBe('Price')
        expect(wrapper.text()).toContain('Select a value')
    })

    it('passes slider props to the Slider component', () => {
        const wrapper = factory({
            type: SliderType.RANGE,
            modelValue: [10, 30],
            min: 0,
            max: 50,
            step: 5,
            hasTooltip: true,
        })

        const slider = wrapper.findComponent(Slider)
        expect(slider.exists()).toBe(true)
        expect(slider.props('type')).toBe(SliderType.RANGE)
        expect(slider.props('modelValue')).toEqual([10, 30])
        expect(slider.props('hasTooltip')).toBe(true)
    })

    it('emits update:modelValue when Slider emits update', async () => {
        const wrapper = factory({ modelValue: 10 })
        const slider = wrapper.findComponent(Slider)

        await slider.vm.$emit('update:modelValue', 40)

        expect(wrapper.emitted('update:modelValue')).toEqual([[40]])
    })

    it('shows error text over help text when error exists', () => {
        const wrapper = factory({
            helpText: 'Helpful note',
            error: 'Required field',
        })

        const paragraph = wrapper.find('p')
        expect(paragraph.exists()).toBe(true)
        expect(paragraph.text()).toBe('Required field')
    })

    it('runs validation and emits update:error on value changes', async () => {
        const validator = vi.fn().mockReturnValue('Invalid value')
        const wrapper = factory({
            required: true,
            validator,
            modelValue: 15,
        })

        const slider = wrapper.findComponent(Slider)
        await slider.vm.$emit('update:modelValue', 35)

        expect(validator).toHaveBeenCalledWith(35)
        expect(wrapper.emitted('update:error')).toBeTruthy()
        expect(wrapper.emitted('update:error')?.[0]?.[0]).toBe('Invalid value')
    })

    it('renders prefixed and suffixed current range values', () => {
        const wrapper = factory({
            label: 'Budget',
            type: SliderType.RANGE,
            modelValue: [10, 30],
            currentValuePrefix: '$',
            currentValueSuffix: ' USD',
        })

        expect(wrapper.text()).toContain('$10 USD - $30 USD')
    })

    it('shows bottom inputs when showInputs is true by default', () => {
        const wrapper = factory({ showInputs: true, modelValue: 50 })

        const numberInputs = wrapper.findAll('input[type="number"]')
        expect(numberInputs.length).toBeGreaterThanOrEqual(1)
    })

    it('does not display input labels by default when showInputs is enabled', () => {
        const wrapper = factory({
            showInputs: true,
            type: SliderType.RANGE,
            modelValue: [10, 20],
        })

        const labels = wrapper.findAll('label').map(label => label.text())
        expect(labels).not.toContain('Min:')
        expect(labels).not.toContain('Max:')
    })

    it('displays input labels when showInputsLabel is true', () => {
        const wrapper = factory({
            showInputs: true,
            showInputsLabel: true,
            type: SliderType.RANGE,
            modelValue: [10, 20],
            minText: 'Min:',
            maxText: 'Max:',
        })

        const labels = wrapper.findAll('label').map(label => label.text())
        expect(labels).toContain('Min:')
        expect(labels).toContain('Max:')
    })

    it('shows top inputs when inputPosition is TOP', () => {
        const wrapper = factory({
            showInputs: true,
            inputPosition: Position.TOP,
            type: SliderType.RANGE,
            modelValue: [10, 20],
        })

        const numberInputs = wrapper.findAll('input[type="number"]')
        expect(numberInputs.length).toBeGreaterThanOrEqual(2)
    })

    it('updates modelValue from single typed input', async () => {
        const wrapper = factory({
            showInputs: true,
            modelValue: 25,
            min: 0,
            max: 100,
        })

        const input = wrapper.find('input[type="number"]')
        await input.setValue('72')

        const events = wrapper.emitted('update:modelValue')
        expect(events).toBeTruthy()
        expect(events?.at(-1)?.[0]).toBe(72)
    })

    it('passes borderRadius to Slider', () => {
        const wrapper = factory({ borderRadius: 12 })
        const slider = wrapper.findComponent(Slider)

        expect(slider.props('borderRadius')).toBe(12)
    })
})
