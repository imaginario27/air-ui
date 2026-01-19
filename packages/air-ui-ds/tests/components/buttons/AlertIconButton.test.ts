import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import AlertIconButton from '@/components/buttons/AlertIconButton.vue'
import Icon from '@/components/icons/Icon.vue'
import { ButtonActionType } from '@/models/enums/buttons'

type MountOptions = Parameters<typeof mount<InstanceType<typeof AlertIconButton>>>[1]

const factory = (
    props?: Record<string, any>,
    options?: MountOptions
): VueWrapper => {
    return mount(AlertIconButton, {
        props,
        global: {
            components: { Icon },
            stubs: {
                NuxtLink: {
                    props: ['to', 'target', 'rel', 'external'],
                    template: `
                        <a :href="to" :target="target" :rel="rel">
                            <slot />
                        </a>
                    `
                }
            },
            ...options?.global
        },
        ...options
    })
}

describe('AlertIconButton.vue', () => {
    it('renders icon with default props', () => {
        const wrapper = factory()
        const icon = wrapper.findComponent(Icon)

        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:help')
    })

    it('renders icon with custom name', () => {
        const wrapper = factory({ icon: 'mdi:check' })
        const icon = wrapper.findComponent(Icon)

        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:check')
    })

    it('renders as <button> when actionType is ACTION', () => {
        const wrapper = factory({ actionType: ButtonActionType.ACTION })
        expect(wrapper.element.tagName.toLowerCase()).toBe('button')
    })

    it('renders as <NuxtLink> when actionType is LINK', () => {
        const wrapper = factory({
            actionType: ButtonActionType.LINK,
            to: '/about'
        })

        const link = wrapper.find('a')
        expect(link.exists()).toBe(true)
        expect(link.attributes('href')).toBe('/about')
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

    it('emits click when clicked and actionType is ACTION', async () => {
        const wrapper = factory({ actionType: ButtonActionType.ACTION })

        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click when disabled is true', async () => {
        const wrapper = factory({
            actionType: ButtonActionType.ACTION,
            disabled: true
        })

        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('renders a button with a type attribute when actionType is ACTION', () => {
        const wrapper = factory({
            actionType: ButtonActionType.ACTION
        })

        const type = wrapper.find('button').attributes('type')
        expect(type).toBeDefined()
    })

    it('does not render type attribute when actionType is LINK', () => {
        const wrapper = factory({
            actionType: ButtonActionType.LINK,
            to: '/about'
        })

        expect(wrapper.find('a').attributes('type')).toBeUndefined()
    })
})
