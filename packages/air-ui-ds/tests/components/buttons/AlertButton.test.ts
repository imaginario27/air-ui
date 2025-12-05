import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import AlertButton from '@/components/buttons/AlertButton.vue'
import { MdiIcon } from '#components'
import { AlertType } from '@/models/enums/alerts'
import { ButtonActionType } from '@/models/enums/buttons'
import { IconPosition } from '@/models/enums/icons'

type MountOptions = Parameters<typeof mount<InstanceType<typeof AlertButton>>>[1]

const factory = (
    props?: Record<string, any>,
    options?: MountOptions
): VueWrapper => {
    return mount(AlertButton, {
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

describe('AlertButton.vue', () => {
    it('renders button text', () => {
        const wrapper = factory({ text: 'Click Me' })
        expect(wrapper.text()).toContain('Click Me')
    })

    it('renders as a <button> when actionType is ACTION', () => {
        const wrapper = factory({ actionType: ButtonActionType.ACTION })
        expect(wrapper.element.tagName.toLowerCase()).toBe('button')
    })

    it('renders as a <NuxtLink> when actionType is LINK', () => {
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
            isExternal: true,
            to: 'https://external.com'
        })

        const link = wrapper.find('a')
        expect(link.attributes('target')).toBe('_blank')
        expect(link.attributes('rel')).toBe('noopener noreferrer')
    })

    it('renders left icon when iconPosition is LEFT', () => {
        const wrapper = factory({
            iconPosition: IconPosition.LEFT,
            icon: 'mdiCheck'
        })

        const icons = wrapper.findAllComponents(MdiIcon)
        expect(icons.length).toBe(1)
        expect(icons[0].props('icon')).toBe('mdiCheck')
    })

    it('renders right icon when iconPosition is RIGHT', () => {
        const wrapper = factory({
            iconPosition: IconPosition.RIGHT,
            icon: 'mdiArrowRight'
        })

        const icons = wrapper.findAllComponents(MdiIcon)
        expect(icons.length).toBe(1)
        expect(icons[0].props('icon')).toBe('mdiArrowRight')
    })

    it('does not render icon when iconPosition is NONE', () => {
        const wrapper = factory({
            iconPosition: IconPosition.NONE,
            icon: 'mdiClose'
        })

        expect(wrapper.findComponent(MdiIcon).exists()).toBe(false)
    })

    it('emits click when clicked and actionType is ACTION', async () => {
        const wrapper = factory({ actionType: ButtonActionType.ACTION })
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click if disabled is true', async () => {
        const wrapper = factory({
            actionType: ButtonActionType.ACTION,
            disabled: true
        })

        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeFalsy()
    })

    it.each([
        [AlertType.WARNING, 'text-text-warning-on-bg'],
        [AlertType.DANGER, 'text-text-danger'],
        [AlertType.SUCCESS, 'text-text-success'],
        [AlertType.INFO, 'text-text-info']
    ])('applies correct text class for alert type: %s', (type, expectedClass) => {
        const wrapper = factory({ type })
        expect(wrapper.classes()).toContain(expectedClass)
    })
})
