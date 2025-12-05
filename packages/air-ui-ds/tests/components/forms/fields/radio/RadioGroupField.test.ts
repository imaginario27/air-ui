import { mount } from '@vue/test-utils'
import RadioGroupField from '~/components/forms/fields/radio/RadioGroupField.vue'
import RadioField from '~/components/forms/fields/radio/RadioField.vue'
import RadioButtonField from '~/components/forms/fields/radio/RadioButtonField.vue'
import { FormValidationMode } from '~/models/enums/formValidations'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref(FormValidationMode.BLUR)
}))

const defaultOptions = [
    { id: 1, value: 'a', label: 'Option A' },
    { id: 2, value: 'b', label: 'Option B', disabled: true, helpText: 'Hint B' },
]

const defaultProps = {
    name: 'test-group',
    modelValue: null,
    options: defaultOptions,
}

describe('RadioGroupField', () => {
    const factory = (props = {}) => {
        return mount(RadioGroupField, {
            props: {
                ...defaultProps,
                ...props,
            },
        })
    }

    it('renders label if provided', () => {
        const wrapper = factory({ label: 'Choose one' })
        expect(wrapper.text()).toContain('Choose one')
    })

    it('renders help text if provided and no error', () => {
        const wrapper = factory({
            helpText: 'Helpful text',
            options: [
                { id: 1, value: 'a', label: 'Option A' },
                { id: 2, value: 'b', label: 'Option B' }, 
            ],
        })

        const help = wrapper.find('p.text-text-neutral-subtle')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Helpful text')
    })

    it('renders error message and applies error class', () => {
        const wrapper = factory({
            label: 'My Label',
            error: 'Required field',
        })

        // Assert error message
        const errorText = wrapper.find('p.text-text-error')
        expect(errorText.exists()).toBe(true)
        expect(errorText.text()).toBe('Required field')

        // Assert label has error class
        const label = wrapper.findAll('div')
            .find(div => div.classes().includes('font-semibold') && div.text() === 'My Label')

        expect(label).toBeTruthy()
        expect(label!.classes()).toContain('text-text-error')
    })

    it('renders RadioField components when type is DEFAULT', () => {
        const wrapper = factory({ type: 'default' })
        const fields = wrapper.findAllComponents(RadioField)
        expect(fields).toHaveLength(2)
    })

    it('renders RadioButtonField components when type is BUTTON', () => {
        const wrapper = factory({ type: 'button' })
        const buttons = wrapper.findAllComponents(RadioButtonField)
        expect(buttons).toHaveLength(2)
    })

    it('passes correct props to each option component', () => {
        const wrapper = factory({ type: 'default', required: true, inverse: true })
        const fields = wrapper.findAllComponents(RadioField)

        expect(fields.length).toBe(defaultOptions.length)

        for (const [index, field] of fields.entries()) {
            expect(field).toBeDefined()
            expect(field.props('name')).toBe('test-group')
            expect(field.props('required')).toBe(true)
            expect(field.props('inverse')).toBe(true)
            expect(field.props('label')).toBe(defaultOptions[index].label)
        }
    })

    it('emits update:modelValue when internal value changes', async () => {
        const wrapper = factory()
        const firstOption = wrapper.findComponent(RadioField)

        await firstOption.vm.$emit('update:modelValue', 'a')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual(['a'])
    })

    it('runs validator on blur mode and emits update:error', async () => {
        const validator = vi.fn().mockReturnValue('Error message')
        const wrapper = factory({
            validator,
            required: true,
            modelValue: 'a',
        })

        const firstOption = wrapper.findComponent(RadioField)
        await firstOption.vm.$emit('update:modelValue', 'a')

        expect(validator).toHaveBeenCalledWith('a')
        expect(wrapper.emitted('update:error')).toBeTruthy()
        expect(wrapper.emitted('update:error')![0]).toEqual(['Error message'])
    })

    it('applies vertical orientation classes by default', () => {
        const wrapper = factory()
        const container = wrapper.findAll('div').find(div => div.classes().includes('flex'))
        expect(container?.classes()).toContain('flex-col')
    })

    it('applies grid layout when orientation is horizontal', () => {
        const wrapper = factory({ orientation: 'horizontal' })
        const container = wrapper.findAll('div').find(div => div.classes().includes('grid'))
        expect(container?.classes()).toContain('grid-cols-1')
        expect(container?.classes()).toContain('sm:grid-cols-2')
    })
})
