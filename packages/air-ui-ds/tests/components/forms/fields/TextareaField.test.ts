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

const factory = (props = {}) => {
    return mount(TextareaField, {
        props: {
            ...defaultProps,
            ...props
        }
    })
}

describe('TextareaField', () => {
    it('renders correctly with minimal props', () => {
        const wrapper = factory()

        const textarea = wrapper.find('textarea')

        expect(textarea.exists()).toBe(true)
        expect(textarea.attributes('id')).toBe('textarea-id')
        expect(textarea.attributes('maxlength')).toBe('100')
        expect(textarea.attributes('placeholder')).toBe('Placeholder')
        expect(textarea.attributes('autocomplete')).toBe('off')
    })

    it('renders label when provided', () => {
        const wrapper = factory({
            label: 'Message'
        })

        const label = wrapper.find('label')

        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Message')
        expect(label.attributes('for')).toBe('textarea-id')
    })

    it.concurrent('emits update:modelValue on input', async () => {
        const wrapper = factory()

        const textarea = wrapper.find('textarea')

        await textarea.setValue('Hello world')

        expect(wrapper.emitted('update:modelValue')).toEqual([
            ['Hello world']
        ])
    })

    it('does not emit update:modelValue when disabled', async () => {
        const wrapper = factory({
            disabled: true
        })

        const textarea = wrapper.find('textarea')

        await textarea.setValue('test')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('renders error message and icon when error is present', () => {
        const wrapper = factory({
            error: 'Field is required'
        })

        const errorText = wrapper.find('p.text-text-error')
        const icon = wrapper.findComponent({ name: 'Icon' })

        expect(errorText.exists()).toBe(true)
        expect(errorText.text()).toBe('Field is required')

        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:alert-circle')
    })

    it('renders help text when no error is present', () => {
        const wrapper = factory({
            helpText: 'Helper text'
        })

        const helpText = wrapper.find('p.text-text-neutral-subtle')

        expect(helpText.exists()).toBe(true)
        expect(helpText.text()).toBe('Helper text')
    })

    it.concurrent('renders character counter when enabled', () => {
        const wrapper = factory({
            modelValue: '12345'
        })

        const counter = wrapper.find('p.text-right')

        expect(counter.exists()).toBe(true)
        expect(counter.text()).toBe('5 / 100')
    })

    it.concurrent('does not render character counter when disabled', () => {
        const wrapper = factory({
            hasCharCounter: false
        })

        const counter = wrapper.find('p.text-right')

        expect(counter.exists()).toBe(false)
    })

    it('applies textareaClass when provided', () => {
        const wrapper = factory({
            textareaClass: 'custom-textarea'
        })

        const container = wrapper.find('div.border')

        expect(container.classes()).toContain('custom-textarea')
    })

    it('applies minHeightClass and maxHeightClass when autoResize is enabled', () => {
        const wrapper = factory({
            autoResize: true,
            minHeightClass: 'min-h-[200px]',
            maxHeightClass: 'max-h-[400px]'
        })

        const container = wrapper.find('div.border')

        expect(container.classes()).toContain('min-h-[200px]')
        expect(container.classes()).toContain('max-h-[400px]')
    })

    it('emits update:error on blur if validation fails', async () => {
        const validator = vi.fn().mockReturnValue('Invalid input')

        const wrapper = factory({
            required: true,
            validator,
            modelValue: 'text'
        })

        const textarea = wrapper.find('textarea')

        await textarea.trigger('blur')

        expect(validator).toHaveBeenCalledWith('text')

        expect(wrapper.emitted('update:error')).toEqual([
            ['Invalid input']
        ])
    })

    it('emits update:error from watcher when modelValue changes', async () => {
        const validator = vi.fn().mockReturnValue('Too long')

        const wrapper = factory({
            validator,
            required: true,
            modelValue: ''
        })

        await wrapper.setProps({
            modelValue: 'Changed'
        })

        expect(validator).toHaveBeenCalledWith('Changed')

        expect(wrapper.emitted('update:error')).toEqual([
            ['Too long']
        ])
    })

    it('does not run validation when required is false', async () => {
        const validator = vi.fn()

        const wrapper = factory({
            validator,
            required: false
        })

        await wrapper.setProps({
            modelValue: 'any'
        })

        expect(validator).not.toHaveBeenCalled()
    })

    it('applies filled state when modelValue contains text', () => {
        const wrapper = factory({
            modelValue: 'content'
        })

        const container = wrapper.find('div.border')

        expect(container.classes()).toContain('text-text-default')
    })

    it('applies blur styles when blurContent is true', () => {
        const wrapper = factory({
            blurContent: true,
            revealBlurOnFocus: false
        })

        const textarea = wrapper.find('textarea')

        expect(textarea.classes()).toContain('blur-sm')
        expect(textarea.classes()).toContain('select-none')
        expect(textarea.classes()).toContain('caret-transparent')
        expect(textarea.classes()).toContain('pointer-events-none')
    })

    it('removes blur when focused if revealBlurOnFocus is enabled', async () => {
        const wrapper = factory({
            blurContent: true,
            revealBlurOnFocus: true
        })

        const textarea = wrapper.find('textarea')

        await textarea.trigger('focus')

        expect(wrapper.emitted('update:blurContent')).toEqual([
            [false]
        ])
    })

    it('restores blur on blur event when revealBlurOnFocus is enabled', async () => {
        const wrapper = factory({
            blurContent: false,
            revealBlurOnFocus: true
        })

        const textarea = wrapper.find('textarea')

        await textarea.trigger('blur')

        expect(wrapper.emitted('update:blurContent')).toContainEqual([true])
    })
})