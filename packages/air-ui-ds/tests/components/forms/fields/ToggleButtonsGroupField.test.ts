import { mount } from '@vue/test-utils'
import ToggleButtonsGroupField from '~/components/forms/fields/ToggleButtonsGroupField.vue'
import ToggleButtonGroup from '~/components/buttons/toggle/ToggleButtonGroup.vue'
import { ToggleButtonGroupStyle } from '#imports'

const defaultProps = {
    id: 'toggle-id',
    modelValue: 'option1',
    buttons: [
        { label: 'Option 1', value: 'option1', text: 'Option 1' },
        { label: 'Option 2', value: 'option2', text: 'Option 2' }
    ]
}

describe('ToggleButtonsGroupField', () => {
    it('renders without errors with minimal props', () => {
        const wrapper = mount(ToggleButtonsGroupField, {
            props: {
                ...defaultProps
            }
        })

        expect(wrapper.findComponent(ToggleButtonGroup).exists()).toBe(true)
        expect(wrapper.find('label').exists()).toBe(false)
        expect(wrapper.find('p').exists()).toBe(false)
    })

    it('renders the label when provided', () => {
        const wrapper = mount(ToggleButtonsGroupField, {
            props: {
                ...defaultProps,
                label: 'My Label'
            }
        })

        const label = wrapper.find('label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('My Label')
        expect(label.attributes('for')).toBe('toggle-id')
    })

    it('renders help text when provided', () => {
        const wrapper = mount(ToggleButtonsGroupField, {
            props: {
                ...defaultProps,
                helpText: 'Helpful hint'
            }
        })

        const help = wrapper.find('p')
        expect(help.exists()).toBe(true)
        expect(help.text()).toBe('Helpful hint')
        expect(help.classes()).toContain('text-text-neutral-subtler')
    })

    it('passes props correctly to ToggleButtonGroup', () => {
        const wrapper = mount(ToggleButtonsGroupField, {
            props: {
                ...defaultProps,
                groupStyle: ToggleButtonGroupStyle.SEGMENTED
            }
        })

        const group = wrapper.findComponent(ToggleButtonGroup)
        expect(group.props('buttons')).toEqual(defaultProps.buttons)
        expect(group.props('modelValue')).toBe('option1')
        expect(group.props('groupStyle')).toBe('segmented')
    })

    it('emits update:modelValue when ToggleButtonGroup emits', async () => {
        const wrapper = mount(ToggleButtonsGroupField, {
            props: {
                ...defaultProps
            }
        })

        const group = wrapper.findComponent(ToggleButtonGroup)
        await group.vm.$emit('update:modelValue', 'option2')

        expect(wrapper.emitted('update:modelValue')).toEqual([['option2']])
    })
})
