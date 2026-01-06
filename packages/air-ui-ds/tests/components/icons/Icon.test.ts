import { mount } from '@vue/test-utils'
import Icon from '~/components/icons/Icon.vue'
import { IconType, IconSize, IconMode } from '@/models/enums/icons'
import { ColorAccent } from '@/models/enums/colors'

const factory = (props: Partial<InstanceType<typeof Icon>['$props']> = {}) => {
    return mount(Icon, {
        props: {
            icon: 'mdiTestIcon',
            ...props,
        },
        global: {
            stubs: {
                MdiIcon: {
                    name: 'MdiIcon',
                    template: '<div class="mdi-icon" />',
                },
                NuxtIcon: {
                    name: 'NuxtIcon',
                    props: ['name', 'mode', 'customize'],
                    template: '<div class="nuxt-icon" />',
                },
            },
        },
    })
}

describe('Icon', () => {
    it('renders MdiIcon when type is NATIVE', () => {
        const wrapper = factory({ type: IconType.NATIVE })
        const mdiIcon = wrapper.findComponent({ name: 'MdiIcon' })
        expect(mdiIcon.exists()).toBe(true)
        expect(wrapper.findComponent({ name: 'NuxtIcon' }).exists()).toBe(false)
    })

    it('renders NuxtIcon when type is COLLECTION', () => {
        const wrapper = factory({ type: IconType.COLLECTION })
        const nuxtIcon = wrapper.findComponent({ name: 'NuxtIcon' })
        expect(nuxtIcon.exists()).toBe(true)
        expect(nuxtIcon.props('name')).toBe('mdiTestIcon')
        expect(wrapper.findComponent({ name: 'MdiIcon' }).exists()).toBe(false)
    })

    it('applies correct size class', () => {
        const wrapper = factory({ size: IconSize.XL, type: IconType.NATIVE })
        expect(wrapper.classes()).toContain('w-[32px]')
    })

    it('applies correct color class', () => {
        const wrapper = factory({ color: ColorAccent.SUCCESS, type: IconType.NATIVE })
        expect(wrapper.classes()).toContain('text-icon-success')
    })

    it('applies default classes when size and color are invalid', () => {
        const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        const wrapper = factory({
            size: 'INVALID' as IconSize,
            color: 'INVALID' as ColorAccent,
            type: IconType.NATIVE,
        })

        expect(wrapper.classes()).toContain('w-[20px]')
        expect(wrapper.classes()).toContain('text-icon-default')

        spy.mockRestore()
    })

    it('applies custom iconClass', () => {
        const wrapper = factory({ iconClass: 'custom-class', type: IconType.NATIVE })
        expect(wrapper.findComponent({ name: 'MdiIcon' }).classes()).toContain('custom-class')
    })

    it('passes svgCustomize to NuxtIcon', () => {
        const mockCustomize = vi.fn()
        const wrapper = factory({
            type: IconType.COLLECTION,
            svgCustomize: mockCustomize,
        })
        const nuxtIcon = wrapper.findComponent({ name: 'NuxtIcon' })
        expect(nuxtIcon.props('customize')).toBe(mockCustomize)
    })

    it('passes mode prop to NuxtIcon', () => {
        const wrapper = factory({
            type: IconType.COLLECTION,
            mode: IconMode.SVG,
        })
        const nuxtIcon = wrapper.findComponent({ name: 'NuxtIcon' })
        expect(nuxtIcon.props('mode')).toBe(IconMode.SVG)
    })

    it('uses default props when none are provided', () => {
        const wrapper = mount(Icon)
        expect(wrapper.findComponent({ name: 'MdiIcon' }).exists()).toBe(true)
    })
})
