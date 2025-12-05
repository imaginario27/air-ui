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
    it('renders label and checkbox', () => {
        const wrapper = factory({ label: 'Agree to terms' })
        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toContain('Agree to terms')

        const checkbox = wrapper.find('input[type="checkbox"]')
        expect(checkbox.exists()).toBe(true)
    })

    it('renders legend if provided', () => {
        const wrapper = factory({ legend: 'Permissions' })
        const legend = wrapper.find('legend')
        expect(legend.exists()).toBe(true)
        expect(legend.text()).toBe('Permissions')
    })

    it('renders help text', () => {
        const wrapper = factory({ helpText: 'This is optional' })
        const help = wrapper.find('p.text-xs')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('This is optional')
    })

    it('renders error when error prop is set', () => {
        const wrapper = factory({ error: 'Required field' })
        const error = wrapper.find('p.text-text-error')
        expect(error.exists()).toBe(true)
        expect(error.text()).toBe('Required field')
    })

    it('toggles checkbox and emits update:modelValue', async () => {
        const wrapper = factory({ modelValue: false })
        const box = wrapper.find('[role="checkbox"], div.cursor-pointer')

        await box.trigger('click')
        const emits = wrapper.emitted('update:modelValue') as [any[], ...any[]]
        expect(emits.length).toBe(1)
        expect(emits[0][0]).toBe(true)
    })

    it('does not toggle when disabled', async () => {
        const wrapper = factory({ modelValue: false, disabled: true })

        const layout = wrapper.find('div.flex.items-center')
        const box = layout.findAll('div').at(0)

        expect(box).toBeDefined()
        await box!.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits update:error when validator fails on toggle', async () => {
        const validator = vi.fn().mockReturnValue('Validation failed')
        const wrapper = factory({
            modelValue: false,
            required: true,
            validator
        })

        const box = wrapper.find('[role="checkbox"], div.cursor-pointer')
        await box.trigger('click')

        const emits = wrapper.emitted('update:error') as [any[], ...any[]]
        expect(emits[0][0]).toBe('Validation failed')
        expect(validator).toHaveBeenCalled()
    })

    it('renders checkbox on right when inverse is true', () => {
        const wrapper = factory({ inverse: true, label: 'On the left' })

        const label = wrapper.findAll('label')[0]
        expect(label.text()).toContain('On the left')

        const checkbox = wrapper.find('input[type="checkbox"]')
        expect(checkbox.exists()).toBe(true)
    })
})
