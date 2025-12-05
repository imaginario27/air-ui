import { mount } from '@vue/test-utils'
import ActionButton from '@/components/buttons/ActionButton.vue'
import { ButtonActionType } from '@/models/enums/buttons'
import { IconPosition } from '@/models/enums/icons'

const factory = (props = {}) => {
    return mount(ActionButton, {
        props,
        global: {
            stubs: {
                NuxtLink: {
                    template: '<a :href="to"><slot /></a>',
                    props: ['to']
                },
                MdiIcon: true
            }
        }
    })
}

describe('ActionButton.vue', () => {
    it('renders with default props', () => {
        const wrapper = factory()
        expect(wrapper.find('button').exists()).toBe(true)
    })

    it('renders as a button when actionType is ACTION', () => {
        const wrapper = factory({ actionType: ButtonActionType.ACTION })
        expect(wrapper.find('button').exists()).toBe(true)
    })

    it('renders as a link when actionType is LINK', () => {
        const wrapper = factory({
            actionType: ButtonActionType.LINK,
            to: '/home'
        })

        const link = wrapper.find('a')
        expect(link.exists()).toBe(true)
        expect(link.attributes('href')).toBe('/home')
    })

    it('applies disabled attribute when disabled is true', () => {
        const wrapper = factory({ disabled: true })
        expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('renders left icon when iconPosition is LEFT', () => {
        const wrapper = factory({
            iconPosition: IconPosition.LEFT,
            icon: 'mdiCheck'
        })
        expect(wrapper.findComponent({ name: 'MdiIcon' }).exists()).toBe(true)
    })

    it('renders right icon when iconPosition is RIGHT', () => {
        const wrapper = factory({
            iconPosition: IconPosition.RIGHT,
            icon: 'mdiCheck'
        })
        expect(wrapper.findComponent({ name: 'MdiIcon' }).exists()).toBe(true)
    })

    it('emits click event when clicked', async () => {
        const wrapper = factory()
        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click event when disabled', async () => {
        const wrapper = factory({ disabled: true })
        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('shows loading state when loading is true', () => {
        const wrapper = factory({ isLoading: true })
        expect(wrapper.text()).toContain('Processing...')
        expect(wrapper.find('.animate-spin').exists()).toBe(true)
    })

    it.each([
        ['button' as const],
        ['submit' as const],
        ['reset' as const]
    ])('sets the type attribute to "%s" when actionType is ACTION', async (buttonType) => {
        const wrapper = factory({
            actionType: ButtonActionType.ACTION,
            type: buttonType
        })

        expect(wrapper.find('button').attributes('type')).toBe(buttonType)
    })
})
