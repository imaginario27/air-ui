import { mount } from '@vue/test-utils'
import RadioButtonField from '~/components/forms/fields/radio/RadioButtonField.vue'
import Icon from '~/components/icons/Icon.vue'
import { ColorAccent, ControlFieldSize } from '#imports'

const defaultProps = {
    id: 'radio-1',
    name: 'group',
    value: 'option1',
    modelValue: null,
    label: 'Option 1',
    helpText: 'Helpful info',
    icon: 'mdi:help'
}

describe('RadioButtonField', () => {
    const factory = (props = {}) => {
        return mount(RadioButtonField, {
            props: {
                ...defaultProps,
                ...props
            },
            global: {
                components: {
                    Icon
                }
            }
        })
    }

    it('renders label and helpText when provided', () => {
        const wrapper = factory()

        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Option 1')

        const helpText = wrapper.find('p')
        expect(helpText.exists()).toBe(true)
        expect(helpText.text()).toBe('Helpful info')
    })

    it('renders radio as checked when modelValue matches value', () => {
        const wrapper = factory({ modelValue: 'option1' })

        const input = wrapper.find('input[type="radio"]')
        expect((input.element as HTMLInputElement).checked).toBe(true)

        const checkedDot = wrapper.find('.bg-icon-neutral-on-filled-bg')
        expect(checkedDot.exists()).toBe(true)
    })

    it('does not emit update:modelValue when disabled and clicked', async () => {
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

        expect(wrapper.classes()).toContain('opacity-disabled')
    })

    it('applies correct label size class for LG', () => {
        const wrapper = factory({ size: ControlFieldSize.LG })

        const label = wrapper.find('label')
        expect(label.classes()).toContain('text-base')
    })

    it('applies correct styling based on danger color accent', () => {
        const wrapper = factory({
            modelValue: 'option1',
            type: ColorAccent.DANGER
        })

        expect(wrapper.find('.bg-background-danger-subtlest').exists()).toBe(true)
        expect(wrapper.find('.text-icon-danger').exists()).toBe(true)
    })

    it('does not render label or helpText when not provided', () => {
        const wrapper = factory({
            label: undefined,
            helpText: undefined
        })

        expect(wrapper.find('label').exists()).toBe(false)
        expect(wrapper.find('p').exists()).toBe(false)
    })

    it('renders Icon with correct name prop', () => {
        const wrapper = factory({ icon: 'mdi:account' })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:account')
    })
})
