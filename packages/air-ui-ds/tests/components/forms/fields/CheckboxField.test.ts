import { mount } from '@vue/test-utils'
import CheckboxField from '~/components/forms/fields/CheckboxField.vue'
import { ref } from 'vue'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref('blur')
}))

const factory = (props: Record<string, any> = {}) => {
    return mount(CheckboxField, {
        props: {
            id: 'test-checkbox',
            ...props
        }
    })
}

describe('CheckboxField.vue', () => {
    it('renders label and checkbox input', () => {
        const wrapper = factory({ label: 'Accept terms' })

        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.html()).toContain('Accept terms')

        const input = wrapper.find('input[type="checkbox"]')
        expect(input.exists()).toBe(true)
    })

    it('renders legend when provided', () => {
        const wrapper = factory({ legend: 'Form Section' })

        const legend = wrapper.find('legend')
        expect(legend.exists()).toBe(true)
        expect(legend.text()).toBe('Form Section')
    })

    it('renders help text when no error is present', () => {
        const wrapper = factory({ helpText: 'Optional field' })

        const helpText = wrapper.find('p.text-xs')
        expect(helpText.exists()).toBe(true)
        expect(helpText.text()).toBe('Optional field')
    })

    it('renders error text when error prop is set', () => {
        const wrapper = factory({ error: 'Field is required' })

        const error = wrapper.find('p.text-text-error')
        expect(error.exists()).toBe(true)
        expect(error.text()).toBe('Field is required')
    })

    it('emits update:modelValue when checkbox is toggled', async () => {
        const wrapper = factory({ modelValue: false })

        const box = wrapper.find('div.cursor-pointer')
        expect(box.exists()).toBe(true)

        await box.trigger('click')

        const emitted = wrapper.emitted('update:modelValue')
        expect(emitted).toBeTruthy()
        expect(emitted?.[0]?.[0]).toBe(true)
    })

    it('does not emit when disabled is true', async () => {
        const wrapper = factory({ modelValue: false, disabled: true })

        const box = wrapper.find('div.cursor-not-allowed')
        expect(box.exists()).toBe(true)

        await box.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits update:error when validator fails on toggle', async () => {
        const validator = vi.fn().mockReturnValue('Invalid selection')

        const wrapper = factory({
            modelValue: false,
            required: true,
            validator
        })

        const box = wrapper.find('div.cursor-pointer')
        expect(box.exists()).toBe(true)

        await box.trigger('click')

        const emitted = wrapper.emitted('update:error')
        expect(emitted).toBeTruthy()
        expect(emitted?.[0]?.[0]).toBe('Invalid selection')
        expect(validator).toHaveBeenCalledWith(false)
    })

    it('renders label before checkbox when inverse is true', () => {
        const wrapper = factory({ inverse: true, label: 'Label First' })

        const labels = wrapper.findAll('label')
        expect(labels.length).toBeGreaterThan(0)
        expect(labels[0].html()).toContain('Label First')

        const input = wrapper.find('input[type="checkbox"]')
        expect(input.exists()).toBe(true)
    })


    it('applies correct size classes for control and icon', () => {
        const wrapper = factory({ size: 'lg', modelValue: true })

        const box = wrapper.find('div.cursor-pointer')
        expect(box.classes()).toContain('w-[32px]')
        expect(box.classes()).toContain('h-[32px]')

        const icon = wrapper.findComponent({ name: 'Icon' })
        expect(icon.exists()).toBe(true)
        expect(icon.attributes('class')).toMatch(/!w-\[20px\]/)
    })

    it('emits update:error from watcher when modelValue changes', async () => {
        const validator = vi.fn().mockReturnValue('Error from watcher')

        const wrapper = factory({
            modelValue: false,
            required: true,
            validator
        })

        await wrapper.setProps({ modelValue: true })

        expect(validator).toHaveBeenCalledWith(true)

        const emitted = wrapper.emitted('update:error')
        expect(emitted).toBeTruthy()
        expect(emitted?.[0]?.[0]).toBe('Error from watcher')
    })
})
