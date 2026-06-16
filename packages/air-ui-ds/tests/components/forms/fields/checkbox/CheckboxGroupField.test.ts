import { mount } from '@vue/test-utils'
import CheckboxGroupField from '~/components/forms/fields/checkbox/CheckboxGroupField.vue'
import CheckboxField from '~/components/forms/fields/checkbox/CheckboxField.vue'
import { FormValidationMode } from '~/models/enums/formValidations'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref(FormValidationMode.BLUR)
}))

const defaultOptions = [
    { id: 1, value: 'a', label: 'Option A' },
    { id: 2, value: 'b', label: 'Option B', disabled: true, helpText: 'Hint B' },
]

const defaultProps = {
    modelValue: [],
    options: defaultOptions,
}

describe('CheckboxGroupField', () => {
    const factory = (props = {}) => {
        return mount(CheckboxGroupField, {
            props: {
                ...defaultProps,
                ...props,
            },
        })
    }

    it('renders label if provided', () => {
        const wrapper = factory({ label: 'Choose options' })
        expect(wrapper.text()).toContain('Choose options')
    })

    it('renders help text if provided and no error', () => {
        const wrapper = factory({
            helpText: 'Helpful text',
            options: [
                { id: 1, value: 'a', label: 'Option A' },
                { id: 2, value: 'b', label: 'Option B' },
            ],
        })

        const helpParagraphs = wrapper.findAll('p.text-text-neutral-subtle')
        const groupHelp = helpParagraphs.find(p => p.text() === 'Helpful text')
        expect(groupHelp).toBeTruthy()
    })

    it('renders error message and applies error class to label', () => {
        const wrapper = factory({
            label: 'My Label',
            error: 'Required field',
        })

        const errorText = wrapper.find('p.text-text-error')
        expect(errorText.exists()).toBe(true)
        expect(errorText.text()).toBe('Required field')

        const label = wrapper.findAll('div')
            .find(div => div.classes().includes('font-semibold') && div.text() === 'My Label')

        expect(label).toBeTruthy()
        expect(label!.classes()).toContain('text-text-error')
    })

    it('renders a CheckboxField for each option', () => {
        const wrapper = factory()
        const fields = wrapper.findAllComponents(CheckboxField)
        expect(fields).toHaveLength(2)
    })

    it('passes correct props to each option component', () => {
        const wrapper = factory({ required: true, inverse: true })
        const fields = wrapper.findAllComponents(CheckboxField)

        expect(fields.length).toBe(defaultOptions.length)

        for (const [index, field] of fields.entries()) {
            expect(field.props('required')).toBe(true)
            expect(field.props('inverse')).toBe(true)
            expect(field.props('label')).toBe(defaultOptions[index]!.label)
        }
    })

    it('passes checked state based on modelValue', () => {
        const wrapper = factory({ modelValue: ['a'] })
        const fields = wrapper.findAllComponents(CheckboxField)

        expect(fields[0]!.props('modelValue')).toBe(true)
        expect(fields[1]!.props('modelValue')).toBe(false)
    })

    it('emits update:modelValue with value added when checkbox is checked', async () => {
        const wrapper = factory({ modelValue: [] })
        const firstOption = wrapper.findAllComponents(CheckboxField)[0]!

        firstOption.vm.$emit('update:modelValue', true)
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([['a']])
    })

    it('emits update:modelValue with value removed when checkbox is unchecked', async () => {
        const wrapper = factory({ modelValue: ['a', 'b'] })
        const firstOption = wrapper.findAllComponents(CheckboxField)[0]!

        firstOption.vm.$emit('update:modelValue', false)
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([['b']])
    })

    it('runs validator on change and emits update:error', async () => {
        const validator = vi.fn().mockReturnValue('Error message')
        const wrapper = factory({
            validator,
            required: true,
            modelValue: [],
        })

        const firstOption = wrapper.findAllComponents(CheckboxField)[0]!
        firstOption.vm.$emit('update:modelValue', true)
        await nextTick()

        expect(validator).toHaveBeenCalledWith(['a'])
        expect(wrapper.emitted('update:error')).toBeTruthy()
        expect(wrapper.emitted('update:error')![0]).toEqual(['Error message'])
    })

    it('applies vertical orientation classes by default', () => {
        const wrapper = factory()
        const container = wrapper.findAll('div').find(div => div.classes().includes('flex-col'))
        expect(container?.classes()).toContain('flex-col')
    })

    it('applies grid layout when orientation is horizontal', () => {
        const wrapper = factory({ orientation: 'horizontal' })
        const container = wrapper.findAll('div').find(div => div.classes().includes('grid'))
        expect(container?.classes()).toContain('grid-cols-1')
        expect(container?.classes()).toContain('sm:grid-cols-2')
    })

    it('forwards option ariaLabel when visual label is omitted', () => {
        const wrapper = factory({
            options: [
                { id: 1, value: 'a', ariaLabel: 'Accessible option A' },
                { id: 2, value: 'b', label: 'Option B' },
            ],
        })

        const fields = wrapper.findAllComponents(CheckboxField)

        expect(fields[0]!.props('ariaLabel')).toBe('Accessible option A')
        expect(fields[1]!.props('ariaLabel')).toBeUndefined()
    })

    it('disables individual option when option.disabled is set', () => {
        const wrapper = factory()
        const fields = wrapper.findAllComponents(CheckboxField)

        expect(fields[0]!.props('disabled')).toBe(false)
        expect(fields[1]!.props('disabled')).toBe(true)
    })

    it('disables all options when disabled prop is true', () => {
        const wrapper = factory({ disabled: true })
        const fields = wrapper.findAllComponents(CheckboxField)

        for (const field of fields) {
            expect(field.props('disabled')).toBe(true)
        }
    })
})
