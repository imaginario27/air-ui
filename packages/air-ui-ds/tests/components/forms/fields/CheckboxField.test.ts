import { mount } from '@vue/test-utils'
import CheckboxField from '~/components/forms/fields/checkbox/CheckboxField.vue'
import Checkbox from '~/components/forms/fields/checkbox/Checkbox.vue'
import { ref } from 'vue'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref('blur')
}))

const factory = (props: Record<string, any> = {}) => {
    return mount(CheckboxField, {
        props: {
            id: 'test-checkbox',
            ...props
        },
        global: {
            components: {
                Checkbox
            },
            stubs: {
                Icon: {
                    name: 'Icon',
                    props: ['name', 'iconClass'],
                    template: '<div class="mock-icon" />'
                }
            }
        }
    })
}

describe('CheckboxField.vue', () => {
    it('renders label and checkbox control', () => {
        const wrapper = factory({ label: 'Accept terms' })

        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.html()).toContain('Accept terms')

        const checkbox = wrapper.findComponent(Checkbox)
        expect(checkbox.exists()).toBe(true)
    })

    it('renders legend when provided', () => {
        const wrapper = factory({ legend: 'Form Section', required: true })

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
        const checkbox = wrapper.findComponent(Checkbox)

        expect(checkbox.exists()).toBe(true)

        await checkbox.vm.$emit('update:modelValue', true)

        const emitted = wrapper.emitted('update:modelValue')
        expect(emitted).toBeTruthy()
        expect(emitted?.[0]?.[0]).toBe(true)
    })

    it('does not emit when disabled is true', async () => {
        const wrapper = factory({ modelValue: false, disabled: true })
        const checkbox = wrapper.findComponent(Checkbox)

        expect(checkbox.exists()).toBe(true)

        await checkbox.vm.$emit('update:modelValue', true)

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits update:error when validator fails on toggle', async () => {
        const validator = vi.fn().mockReturnValue('Invalid selection')

        const wrapper = factory({
            modelValue: false,
            required: true,
            validator
        })
        const checkbox = wrapper.findComponent(Checkbox)

        expect(checkbox.exists()).toBe(true)

        await checkbox.vm.$emit('update:modelValue', true)

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

        const checkbox = wrapper.findComponent(Checkbox)
        expect(checkbox.exists()).toBe(true)
    })

    it('passes size prop to checkbox control', () => {
        const wrapper = factory({ size: 'lg', modelValue: true })

        const checkbox = wrapper.findComponent(Checkbox)
        expect(checkbox.props('size')).toBe('lg')
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

    it('uses ariaLabel fallback when visual label is hidden', () => {
        const wrapper = factory({
            label: '',
            ariaLabel: 'Accept terms checkbox',
        })

        const checkbox = wrapper.findComponent(Checkbox)

        expect(wrapper.find('label').exists()).toBe(false)
        expect(checkbox.props('ariaLabel')).toBe('Accept terms checkbox')
    })

    it('toggles the checkbox when clicking the row background', async () => {
        const wrapper = factory({ modelValue: false, label: 'Accept terms' })

        const row = wrapper.find('.flex.items-center.gap-3')
        await row.trigger('click')

        const emitted = wrapper.emitted('update:modelValue')
        expect(emitted).toBeTruthy()
        expect(emitted?.[0]?.[0]).toBe(true)
    })

    it('does not toggle the row when disabled', async () => {
        const wrapper = factory({ modelValue: false, label: 'Accept terms', disabled: true })

        const row = wrapper.find('.flex.items-center.gap-3')
        await row.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('renders rich markup passed via the label slot', () => {
        const wrapper = mount(CheckboxField, {
            props: { id: 'test-checkbox' },
            slots: {
                label: '<strong>Bold</strong> terms'
            },
            global: {
                components: { Checkbox },
                stubs: {
                    Icon: {
                        name: 'Icon',
                        props: ['name', 'iconClass'],
                        template: '<div class="mock-icon" />'
                    }
                }
            }
        })

        const label = wrapper.find('label')
        expect(label.find('strong').exists()).toBe(true)
        expect(label.text()).toBe('Bold terms')
    })
})
