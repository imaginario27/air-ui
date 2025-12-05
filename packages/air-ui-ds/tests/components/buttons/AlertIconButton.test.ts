import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import AlertIconButton from '@/components/buttons/AlertIconButton.vue'
import { MdiIcon } from '#components'
import { AlertType } from '@/models/enums/alerts'
import { ButtonActionType } from '@/models/enums/buttons'

type MountOptions = Parameters<typeof mount<InstanceType<typeof AlertIconButton>>>[1]

const factory = (
    props?: Record<string, any>,
    options?: MountOptions
): VueWrapper => {
    return mount(AlertIconButton, {
        props,
        global: {
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
    it('renders icon inside button', () => {
        const wrapper = factory()
        const icon = wrapper.findComponent(MdiIcon)

        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdiHelp') // default
    })

    it('renders as <button> when actionType is ACTION', () => {
        const wrapper = factory({
            actionType: ButtonActionType.ACTION
        })

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
        const wrapper = factory({
            actionType: ButtonActionType.ACTION
        })

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

    it.each([
        [AlertType.WARNING, 'text-icon-warning-on-bg'],
        [AlertType.DANGER, 'text-icon-danger'],
        [AlertType.SUCCESS, 'text-icon-success'],
        [AlertType.INFO, 'text-icon-info']
    ])('applies correct class for alert type %s', (type, expectedClass) => {
        const wrapper = factory({ type })
        expect(wrapper.classes()).toContain(expectedClass)
    })
})
