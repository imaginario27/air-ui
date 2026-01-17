import { mount } from '@vue/test-utils'
import ActionButton from '@/components/buttons/ActionButton.vue'
import Icon from '@/components/icons/Icon.vue'
import { ButtonActionType, ButtonStyleType, ButtonSize } from '@/models/enums/buttons'
import { IconPosition } from '@/models/enums/icons'

const factory = (props = {}) => {
    return mount(ActionButton, {
        props,
        global: {
            components: {
                Icon
            },
            stubs: {
                NuxtLink: {
                    template: '<a :href="to" :target="target" :rel="rel"><slot /></a>',
                    props: ['to', 'target', 'rel']
                }
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

    it('adds external link attributes when isExternal is true', () => {
        const wrapper = factory({
            actionType: ButtonActionType.LINK,
            to: 'https://external.com',
            isExternal: true
        })

        const link = wrapper.find('a')
        expect(link.attributes('target')).toBe('_blank')
        expect(link.attributes('rel')).toBe('noopener noreferrer')
    })

    it('applies disabled attribute when disabled is true', () => {
        const wrapper = factory({ disabled: true })
        expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('renders left icon when iconPosition is LEFT', () => {
        const wrapper = factory({
            iconPosition: IconPosition.LEFT,
            icon: 'mdi:check'
        })

        const icons = wrapper.findAllComponents(Icon)
        expect(icons.length).toBeGreaterThan(0)
        expect(icons[0].props('name')).toBe('mdi:check')
    })

    it('renders right icon when iconPosition is RIGHT', () => {
        const wrapper = factory({
            iconPosition: IconPosition.RIGHT,
            icon: 'mdi:check'
        })

        const icons = wrapper.findAllComponents(Icon)
        expect(icons.length).toBeGreaterThan(0)
        expect(icons[0].props('name')).toBe('mdi:check')
    })

    it('does not render icon when iconPosition is NONE', () => {
        const wrapper = factory({
            iconPosition: IconPosition.NONE,
            icon: 'mdi:check'
        })

        const icons = wrapper.findAllComponents(Icon)
        expect(icons.length).toBe(0)
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

    it('shows loading state when isLoading is true', () => {
        const wrapper = factory({ isLoading: true })
        expect(wrapper.text()).toContain('Processing...')
        expect(wrapper.find('.animate-spin').exists()).toBe(true)

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:loading')
    })

    it('shows custom loading text when loadingText is provided', () => {
        const wrapper = factory({
            isLoading: true,
            loadingText: 'Loading now...'
        })
        expect(wrapper.text()).toContain('Loading now...')
    })

    it.each([
        ['button' as const],
        ['submit' as const],
        ['reset' as const]
    ])('sets the type attribute to "%s" when actionType is ACTION', (buttonType) => {
        const wrapper = factory({
            actionType: ButtonActionType.ACTION,
            type: buttonType
        })

        expect(wrapper.find('button').attributes('type')).toBe(buttonType)
    })

    it('does not set type attribute when actionType is LINK', () => {
        const wrapper = factory({
            actionType: ButtonActionType.LINK,
            type: 'submit'
        })

        expect(wrapper.find('a').attributes('type')).toBeUndefined()
    })
})
