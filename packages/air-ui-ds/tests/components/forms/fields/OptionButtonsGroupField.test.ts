import { mount } from '@vue/test-utils'
import OptionButtonsGroupField from '~/components/forms/fields/OptionButtonsGroupField.vue'
import OptionButtonGroup from '~/components/buttons/options/OptionButtonGroup.vue'
import { FormValidationMode } from '~/models/enums/formValidations'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref(FormValidationMode.BLUR)
}))

const defaultProps = {
    id: 'test-id',
    modelValue: 'val1',
    buttons: [
        { label: 'Option 1', value: 'val1', text: 'Option 1' },
        { label: 'Option 2', value: 'val2', text: 'Option 2' }
    ]
}

describe('OptionButtonsGroupField', () => {
    it('renders correctly with minimal required props', () => {
        const wrapper = mount(OptionButtonsGroupField, {
            props: {
                ...defaultProps
            }
        })

        expect(wrapper.find('label').exists()).toBe(false)
        expect(wrapper.findComponent(OptionButtonGroup).exists()).toBe(true)
    })

    it('renders label when provided', () => {
        const wrapper = mount(OptionButtonsGroupField, {
            props: {
                ...defaultProps,
                label: 'My Label'
            }
        })

        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('My Label')
        expect(label.attributes('for')).toBe('test-id')
    })

    it('emits update:modelValue when OptionButtonGroup emits', async () => {
        const wrapper = mount(OptionButtonsGroupField, {
            props: {
                ...defaultProps
            }
        })

        const optionGroup = wrapper.findComponent(OptionButtonGroup)
        await optionGroup.vm.$emit('update:modelValue', 'val2')

        expect(wrapper.emitted('update:modelValue')).toEqual([['val2']])
    })

    it('renders error text when error is present', () => {
        const wrapper = mount(OptionButtonsGroupField, {
            props: {
                ...defaultProps,
                error: 'Something went wrong'
            }
        })

        const errorText = wrapper.find('p')
        expect(errorText.exists()).toBe(true)
        expect(errorText.text()).toBe('Something went wrong')
        expect(errorText.classes()).toContain('text-text-error')
    })

    it('renders help text when no error is present', () => {
        const wrapper = mount(OptionButtonsGroupField, {
            props: {
                ...defaultProps,
                helpText: 'Helpful tip here'
            }
        })

        const helpText = wrapper.find('p')
        expect(helpText.exists()).toBe(true)
        expect(helpText.text()).toBe('Helpful tip here')
        expect(helpText.classes()).toContain('text-text-neutral-subtle')
    })

    it('renders nothing if both helpText and error are empty', () => {
        const wrapper = mount(OptionButtonsGroupField, {
            props: {
                ...defaultProps,
                helpText: '',
                error: ''
            }
        })

        expect(wrapper.find('p').exists()).toBe(false)
    })

    it('validates and emits update:error when modelValue changes and validator exists', async () => {
        const validator = vi.fn().mockReturnValue('Invalid selection')

        const wrapper = mount(OptionButtonsGroupField, {
            props: {
                ...defaultProps,
                validator,
                required: true,
                error: ''
            }
        })

        await wrapper.setProps({ modelValue: 'val2' })

        expect(validator).toHaveBeenCalledWith('val2')
        expect(wrapper.emitted('update:error')).toEqual([['Invalid selection']])
    })

    it('does not validate when required is false', async () => {
        const validator = vi.fn()

        const wrapper = mount(OptionButtonsGroupField, {
            props: {
                ...defaultProps,
                validator,
                required: false
            }
        })

        await wrapper.setProps({ modelValue: 'val2' })

        expect(validator).not.toHaveBeenCalled()
        expect(wrapper.emitted('update:error')).toBeUndefined()
    })

    it('emits empty error when validator is not provided and required is true', async () => {
        const wrapper = mount(OptionButtonsGroupField, {
            props: {
                ...defaultProps,
                required: true,
                validator: undefined
            }
        })

        await wrapper.setProps({ modelValue: 'val2' })

        expect(wrapper.emitted('update:error')).toEqual([['']])
    })

    it('forwards ariaLabel when visual label is hidden', () => {
        const wrapper = mount(OptionButtonsGroupField, {
            props: {
                ...defaultProps,
                label: '',
                ariaLabel: 'Accessible options group',
            }
        })

        const optionGroup = wrapper.findComponent(OptionButtonGroup)

        expect(wrapper.find('label').exists()).toBe(false)
        expect(optionGroup.props('ariaLabel')).toBe('Accessible options group')
    })
})
