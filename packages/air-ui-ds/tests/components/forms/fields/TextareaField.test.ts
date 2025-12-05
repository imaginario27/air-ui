import { mount } from '@vue/test-utils'
import TextareaField from '~/components/forms/fields/TextareaField.vue'
import { FormValidationMode } from '~/models/enums/formValidations'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref(FormValidationMode.BLUR)
}))

const defaultProps = {
    id: 'textarea-id',
    maxLength: 100
}

describe('TextareaField', () => {
    it('renders correctly with minimal props', () => {
        const wrapper = mount(TextareaField, {
            props: {
                ...defaultProps
            }
        })

        const textarea = wrapper.find('textarea')
        expect(textarea.exists()).toBe(true)
        expect(textarea.attributes('id')).toBe('textarea-id')
        expect(textarea.attributes('maxlength')).toBe('100')
        expect(textarea.attributes('placeholder')).toBe('Placeholder')
    })

    it('renders label when provided', () => {
        const wrapper = mount(TextareaField, {
            props: {
                ...defaultProps,
                label: 'Message'
            }
        })

        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Message')
        expect(label.attributes('for')).toBe('textarea-id')
    })

    it('emits update:modelValue on input', async () => {
        const wrapper = mount(TextareaField, {
            props: {
                ...defaultProps
            }
        })

        const textarea = wrapper.find('textarea')
        await textarea.setValue('Hello world')

        expect(wrapper.emitted('update:modelValue')).toEqual([['Hello world']])
    })

    it('renders error message and icon when error is present', () => {
        const wrapper = mount(TextareaField, {
            props: {
                ...defaultProps,
                error: 'Field is required'
            }
        })

        const errorText = wrapper.find('p.text-text-error')
        const icon = wrapper.findComponent({ name: 'MdiIcon' })

        expect(errorText.exists()).toBe(true)
        expect(errorText.text()).toBe('Field is required')
        expect(icon.exists()).toBe(true)
    })

    it('renders help text when no error is present', () => {
        const wrapper = mount(TextareaField, {
            props: {
                ...defaultProps,
                helpText: 'This is a helper'
            }
        })

        const helpText = wrapper.find('p.text-text-neutral-subtle')
        expect(helpText.exists()).toBe(true)
        expect(helpText.text()).toBe('This is a helper')
    })

    it('renders character counter when hasCharCounter is true', () => {
        const wrapper = mount(TextareaField, {
            props: {
                ...defaultProps,
                modelValue: '12345',
                hasCharCounter: true
            }
        })

        const counter = wrapper.find('p.text-right')
        expect(counter.exists()).toBe(true)
        expect(counter.text()).toBe('5 / 100')
    })

    it('does not render character counter when hasCharCounter is false', () => {
        const wrapper = mount(TextareaField, {
            props: {
                ...defaultProps,
                hasCharCounter: false
            }
        })

        const counter = wrapper.find('p.text-right')
        expect(counter.exists()).toBe(false)
    })

    it('handles readonly, disabled, wrap, spellcheck and autofocus attributes', () => {
        const wrapper = mount(TextareaField, {
            props: {
                ...defaultProps,
                readonly: true,
                disabled: true,
                wrap: 'hard',
                spellcheck: true,
                autofocus: true
            }
        })

        const textarea = wrapper.find('textarea')
        expect(textarea.attributes('readonly')).toBeDefined()
        expect(textarea.attributes('disabled')).toBeDefined()
        expect(textarea.attributes('wrap')).toBe('hard')
        expect(textarea.attributes('spellcheck')).toBe('true')
        expect(textarea.attributes('autofocus')).toBeDefined()
    })

    it('emits update:error on blur if validation fails', async () => {
        const validator = vi.fn().mockReturnValue('Invalid input')

        const wrapper = mount(TextareaField, {
            props: {
                ...defaultProps,
                required: true,
                validator,
                modelValue: 'text'
            }
        })

        const textarea = wrapper.find('textarea')
        await textarea.trigger('blur')

        expect(validator).toHaveBeenCalledWith('text')
        expect(wrapper.emitted('update:error')).toEqual([['Invalid input']])
    })

    it('emits update:error from watcher when modelValue changes', async () => {
        const validator = vi.fn().mockReturnValue('Too long')

        const wrapper = mount(TextareaField, {
            props: {
                ...defaultProps,
                validator,
                required: true,
                modelValue: ''
            }
        })

        await wrapper.setProps({ modelValue: 'Changed' })

        expect(validator).toHaveBeenCalledWith('Changed')
        expect(wrapper.emitted('update:error')).toEqual([['Too long']])
    })

    it('does not run validation when required is false', async () => {
        const validator = vi.fn()

        const wrapper = mount(TextareaField, {
            props: {
                ...defaultProps,
                validator,
                required: false,
                modelValue: ''
            }
        })

        await wrapper.setProps({ modelValue: 'any' })

        expect(validator).not.toHaveBeenCalled()
    })

    it('applies minHeightClass to the container', () => {
        const wrapper = mount(TextareaField, {
            props: {
                ...defaultProps,
                minHeightClass: 'min-h-[200px]'
            }
        })

        const container = wrapper.find('div.p-4')
        expect(container.classes()).toContain('min-h-[200px]')
    })
})
