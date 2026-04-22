import { mount } from '@vue/test-utils'
import { NuxtLink } from '#components'
import DropdownMenuContextItem from '@/components/dropdowns/DropdownMenuContextItem.vue'
import Kbd from '@/components/kbds/Kbd.vue'
import { DropdownActionType, DropdownItemType } from '~/models/enums/dropdowns'
import { PrefetchOn } from '@/models/enums/prefetch'

vi.mock('@/assets/images/placeholders/missing-image-placeholder.png', () => ({
    default: '/mocked/missing-image.png'
}))

const factory = (props?: Record<string, unknown>) => {
    return mount(DropdownMenuContextItem, {
        props: {
            actionType: DropdownActionType.ACTION,
            text: 'Context action',
            ...props,
        },
        global: {
            components: {
                Kbd,
            },
            stubs: {
                NuxtLink: {
                    name: 'NuxtLink',
                    template: '<a><slot /></a>',
                    props: ['to', 'target', 'rel', 'external', 'prefetchOn'],
                },
                Icon: true,
                User: true,
            },
        },
    })
}

describe('DropdownMenuContextItem.vue', () => {
    it('emits click and close for action items', async () => {
        const wrapper = factory()

        await wrapper.trigger('click')

        expect(wrapper.emitted('click')).toBeTruthy()
        expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('renders as a NuxtLink when actionType is LINK', () => {
        const wrapper = factory({
            actionType: DropdownActionType.LINK,
            to: '/settings',
        })

        expect(wrapper.findComponent(NuxtLink).exists()).toBe(true)
    })

    it('passes the configured prefetch strategy for link items', () => {
        const wrapper = factory({
            actionType: DropdownActionType.LINK,
            to: '/settings',
            prefetchOn: PrefetchOn.INTERACTION,
        })

        expect(wrapper.findComponent(NuxtLink).props('prefetchOn')).toBe(PrefetchOn.INTERACTION)
    })

    it('renders keyboard shortcuts as Kbd components', () => {
        const wrapper = factory({
            kbd: ['Ctrl', 'K'],
        })

        const keys = wrapper.findAllComponents(Kbd)

        expect(keys).toHaveLength(2)
        expect(keys[0]?.text()).toBe('Ctrl')
        expect(keys[1]?.text()).toBe('K')
    })

    it('keeps the compact item height styles', () => {
        const wrapper = factory({
            type: DropdownItemType.TEXT,
        })

        expect(wrapper.classes()).toContain('min-h-[32px]')
        expect(wrapper.classes()).toContain('px-2.5')
    })

    it('does not emit click when disabled', async () => {
        const wrapper = factory({
            disabled: true,
        })

        await wrapper.trigger('click')

        expect(wrapper.emitted('click')).toBeFalsy()
        expect(wrapper.emitted('close')).toBeFalsy()
    })
})