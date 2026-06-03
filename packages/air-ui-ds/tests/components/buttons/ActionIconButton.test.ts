import { mount } from '@vue/test-utils'
import ActionIconButton from '@/components/buttons/ActionIconButton.vue'
import Icon from '@/components/icons/Icon.vue'
import { ButtonActionType } from '@/models/enums/buttons'

const factory = (props = {}) => {
    return mount(ActionIconButton, {
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

describe('ActionIconButton.vue', () => {
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

    it('renders as a span when actionType is LINK and disabled is true', () => {
        const wrapper = factory({
            actionType: ButtonActionType.LINK,
            to: '/home',
            disabled: true
        })
        expect(wrapper.find('span').exists()).toBe(true)
        expect(wrapper.find('a').exists()).toBe(false)
    })

    it('applies disabled visual classes when disabled is true', () => {
        const wrapper = factory({ disabled: true })
        const classes = wrapper.find('button').classes()
        expect(classes).toContain('opacity-disabled')
        expect(classes).toContain('cursor-not-allowed')
        expect(classes).toContain('pointer-events-none')
    })

    it('does not apply disabled visual classes when disabled is false', () => {
        const wrapper = factory({ disabled: false })
        const classes = wrapper.find('button').classes()
        expect(classes).not.toContain('opacity-disabled')
        expect(classes).not.toContain('cursor-not-allowed')
        expect(classes).not.toContain('pointer-events-none')
    })

    it('renders the correct icon', () => {
        const wrapper = factory({ icon: 'mdi:check' })

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:check')
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

    it('renders aria-label when ariaLabel prop is provided', () => {
        const wrapper = factory({ ariaLabel: 'Close dialog' })
        expect(wrapper.find('button').attributes('aria-label')).toBe('Close dialog')
    })

    it('does not render aria-label when ariaLabel prop is not provided', () => {
        const wrapper = factory()
        expect(wrapper.find('button').attributes('aria-label')).toBeUndefined()
    })
})
