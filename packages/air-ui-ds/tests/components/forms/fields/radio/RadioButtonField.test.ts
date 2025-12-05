import { mount } from '@vue/test-utils'
import RadioButtonField from '~/components/forms/fields/radio/RadioButtonField.vue'

const defaultProps = {
    id: 'radio-1',
    name: 'group',
    value: 'option1',
    modelValue: null,
    label: 'Option 1',
    helpText: 'Helpful info',
    icon: 'mdiHelp',
}

describe('RadioButtonField', () => {
    const factory = (props = {}) => {
        return mount(RadioButtonField, {
            props: {
                ...defaultProps,
                ...props,
            },
        })
    }

    it('renders label and helpText when provided', () => {
        const wrapper = factory()

        expect(wrapper.find('label').exists()).toBe(true)
        expect(wrapper.find('label').text()).toBe('Option 1')

        const helpText = wrapper.find('p')
        expect(helpText.exists()).toBe(true)
        expect(helpText.text()).toBe('Helpful info')
    })

    it('renders radio as checked when modelValue matches value', () => {
        const wrapper = factory({ modelValue: 'option1' })

        const input = wrapper.find('input[type="radio"]')
        expect((input.element as HTMLInputElement).checked).toBe(true)

        const checkedIcon = wrapper.find('.bg-icon-neutral-on-filled-bg')
        expect(checkedIcon.exists()).toBe(true)
    })

    it('does not emit update when disabled and clicked', async () => {
        const wrapper = factory({ disabled: true })

        await wrapper.trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits update:modelValue when clicked and not disabled', async () => {
        const wrapper = factory()

        await wrapper.trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual(['option1'])
    })

    it('applies opacity-disabled class when disabled', () => {
        const wrapper = factory({ disabled: true })

        const rootDiv = wrapper.find('div')
        expect(rootDiv.classes()).toContain('opacity-disabled')
    })

    it('applies correct label size class based on size prop', () => {
        const wrapper = factory({ size: 'lg' })

        const label = wrapper.find('label')
        expect(label.classes()).toContain('text-base')
    })

    it('updates styling based on color accent type', () => {
        const wrapper = factory({
            modelValue: 'option1',
            type: 'danger',
        })

        expect(wrapper.find('.bg-background-danger-subtlest').exists()).toBe(true)
        expect(wrapper.find('.text-icon-danger').exists()).toBe(true)
    })

    it('does not render label or helpText if not provided', () => {
        const wrapper = factory({
            label: undefined,
            helpText: undefined,
        })

        expect(wrapper.find('label').exists()).toBe(false)
        expect(wrapper.find('p').exists()).toBe(false)
    })

    it('renders custom icon via prop', () => {
        const wrapper = factory({ icon: 'mdiAccount' })

        const iconComponent = wrapper.findComponent({ name: 'MdiIcon' })
        expect(iconComponent.exists()).toBe(true)
        expect(iconComponent.props('icon')).toBe('mdiAccount')
    })
})
