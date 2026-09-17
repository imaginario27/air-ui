import { mount } from '@vue/test-utils'
import TriStateCheckboxField from '~/components/forms/fields/checkbox/TriStateCheckboxField.vue'
import TriStateCheckbox from '~/components/forms/fields/checkbox/TriStateCheckbox.vue'
import { TriStateValue } from '#imports'
import { ref } from 'vue'

vi.mock('~/composables/useFormValidationMode', () => ({
    useInjectedValidationMode: () => ref('blur')
}))

const factory = (props: Record<string, any> = {}) => {
    return mount(TriStateCheckboxField, {
        props: {
            id: 'test-checkbox',
            ...props
        },
        global: {
            components: {
                TriStateCheckbox
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

describe('TriStateCheckboxField.vue', () => {
    it('renders label and checkbox control', () => {
        const wrapper = factory({ label: 'Accept terms' })

        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.html()).toContain('Accept terms')

        const checkbox = wrapper.findComponent(TriStateCheckbox)
        expect(checkbox.exists()).toBe(true)
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

    it('emits update:modelValue with CHECKED when toggled from UNCHECKED', async () => {
        const wrapper = factory({ modelValue: TriStateValue.UNCHECKED })
        const checkbox = wrapper.findComponent(TriStateCheckbox)

        expect(checkbox.exists()).toBe(true)

        await checkbox.vm.$emit('update:modelValue', TriStateValue.CHECKED)

        const emitted = wrapper.emitted('update:modelValue')
        expect(emitted).toBeTruthy()
        expect(emitted?.[0]?.[0]).toBe(TriStateValue.CHECKED)
    })

    it('does not emit when disabled is true', async () => {
        const wrapper = factory({ modelValue: TriStateValue.UNCHECKED, disabled: true })
        const checkbox = wrapper.findComponent(TriStateCheckbox)

        expect(checkbox.exists()).toBe(true)

        await checkbox.vm.$emit('update:modelValue', TriStateValue.CHECKED)

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits update:error when validator fails on toggle', async () => {
        const validator = vi.fn().mockReturnValue('Invalid selection')

        const wrapper = factory({
            modelValue: TriStateValue.UNCHECKED,
            required: true,
            validator
        })
        const checkbox = wrapper.findComponent(TriStateCheckbox)

        expect(checkbox.exists()).toBe(true)

        await checkbox.vm.$emit('update:modelValue', TriStateValue.CHECKED)

        const emitted = wrapper.emitted('update:error')
        expect(emitted).toBeTruthy()
        expect(emitted?.[0]?.[0]).toBe('Invalid selection')
        expect(validator).toHaveBeenCalledWith(TriStateValue.UNCHECKED)
    })

    it('renders label before checkbox when inverse is true', () => {
        const wrapper = factory({ inverse: true, label: 'Label First' })

        const labels = wrapper.findAll('label')
        expect(labels.length).toBeGreaterThan(0)
        expect(labels[0].html()).toContain('Label First')

        const checkbox = wrapper.findComponent(TriStateCheckbox)
        expect(checkbox.exists()).toBe(true)
    })

    it('passes size prop to checkbox control', () => {
        const wrapper = factory({ size: 'lg', modelValue: TriStateValue.CHECKED })

        const checkbox = wrapper.findComponent(TriStateCheckbox)
        expect(checkbox.props('size')).toBe('lg')
    })

    it('passes indeterminate modelValue through to checkbox control', () => {
        const wrapper = factory({ modelValue: TriStateValue.INDETERMINATE })

        const checkbox = wrapper.findComponent(TriStateCheckbox)
        expect(checkbox.props('modelValue')).toBe(TriStateValue.INDETERMINATE)
    })

    it('emits update:error from watcher when modelValue changes', async () => {
        const validator = vi.fn().mockReturnValue('Error from watcher')

        const wrapper = factory({
            modelValue: TriStateValue.UNCHECKED,
            required: true,
            validator
        })

        await wrapper.setProps({ modelValue: TriStateValue.INDETERMINATE })

        expect(validator).toHaveBeenCalledWith(TriStateValue.INDETERMINATE)

        const emitted = wrapper.emitted('update:error')
        expect(emitted).toBeTruthy()
        expect(emitted?.[0]?.[0]).toBe('Error from watcher')
    })

    it('uses ariaLabel fallback when visual label is hidden', () => {
        const wrapper = factory({
            label: '',
            ariaLabel: 'Accept terms checkbox',
        })

        const checkbox = wrapper.findComponent(TriStateCheckbox)

        expect(wrapper.find('label').exists()).toBe(false)
        expect(checkbox.props('ariaLabel')).toBe('Accept terms checkbox')
    })
})
