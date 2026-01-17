import { mount } from '@vue/test-utils'
import ButtonField from '~/components/forms/fields/ButtonField.vue'
import ActionButton from '~/components/buttons/ActionButton.vue'

const factory = (props: Record<string, any> = {}) => {
    return mount(ButtonField, {
        props: {
            id: 'test-button',
            ...props
        },
        global: {
            components: {
                ActionButton
            }
        }
    })
}

describe('ButtonField.vue', () => {
    it('renders label when label prop is provided', () => {
        const wrapper = factory({ label: 'My Button Label' })
        const label = wrapper.find('label')

        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('My Button Label')
        expect(label.attributes('for')).toBe('test-button')
    })

    it('does not render label when label prop is not provided', () => {
        const wrapper = factory()
        const label = wrapper.find('label')

        expect(label.exists()).toBe(false)
    })

    it('emits click when ActionButton emits click and not disabled', async () => {
        const wrapper = factory({ disabled: false })
        const button = wrapper.findComponent(ActionButton)

        await button.vm.$emit('click')

        const emits = wrapper.emitted('click')
        expect(emits).toBeTruthy()
        expect(emits).toHaveLength(1)
    })

    it('does not emit click when disabled is true', async () => {
        const wrapper = factory({ disabled: true })
        const button = wrapper.findComponent(ActionButton)

        await button.vm.$emit('click')

        const emits = wrapper.emitted('click')
        expect(emits).toBeUndefined()
    })

    it('passes all expected props to ActionButton', () => {
        const props = {
            id: 'test-button',
            label: 'Test',
            text: 'Submit',
            size: 'lg',
            icon: 'mdi:help',
            iconPosition: 'none',
            disabled: false,
            isLoading: true,
            loadingText: 'Please wait...',
            styleType: 'neutral-outlined',
            actionType: 'action',
            isRounded: true,
            isFullWidth: true,
            isMobileFullWidth: true,
            to: '/path',
            isExternal: true
        }

        const wrapper = factory(props)
        const button = wrapper.findComponent(ActionButton)

        expect(button.props()).toMatchObject({
            text: 'Submit',
            size: 'lg',
            icon: 'mdi:help',
            iconPosition: 'none',
            disabled: false,
            isLoading: true,
            loadingText: 'Please wait...',
            styleType: 'neutral-outlined',
            actionType: 'action',
            isRounded: true,
            isFullWidth: true,
            isMobileFullWidth: true,
            to: '/path',
            isExternal: true
        })
    })

})
