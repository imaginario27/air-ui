import { mount } from '@vue/test-utils'
import Icon from '@/components/icons/Icon.vue'
import { IconSize, IconMode } from '@/models/enums/icons'
import { ColorAccent } from '@/models/enums/colors'
import { describe, it, expect, vi } from 'vitest'

const factory = (props: Partial<InstanceType<typeof Icon>['$props']> = {}) => {
    return mount(Icon, {
        props,
        global: {
            stubs: {
                NuxtIcon: {
                    name: 'NuxtIcon',
                    props: ['name', 'mode', 'customize'],
                    template: '<div class="nuxt-icon" />'
                }
            }
        }
    })
}

describe('Icon', () => {
    it('renders NuxtIcon with default props', () => {
        const wrapper = factory()
        const nuxtIcon = wrapper.findComponent({ name: 'NuxtIcon' })

        expect(nuxtIcon.exists()).toBe(true)
        expect(nuxtIcon.props('name')).toBe('mdi:help')
        expect(nuxtIcon.props('mode')).toBe(IconMode.CSS)
    })

    it('applies correct size class for XL', () => {
        const wrapper = factory({ size: IconSize.XL })
        expect(wrapper.classes()).toContain('w-[32px]')
    })

    it('applies correct color class for SUCCESS', () => {
        const wrapper = factory({ color: ColorAccent.SUCCESS })
        expect(wrapper.classes()).toContain('text-icon-success')
    })

    it('applies default size and color classes for invalid values', () => {
        const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        const wrapper = factory({
            size: 'INVALID' as IconSize,
            color: 'INVALID' as ColorAccent
        })

        expect(wrapper.classes()).toContain('w-[20px]')
        expect(wrapper.classes()).toContain('text-icon-default')

        spy.mockRestore()
    })

    it('splits and applies iconClass when string', () => {
        const wrapper = factory({ iconClass: 'one two three' })
        const classList = wrapper.classes()

        expect(classList).toContain('one')
        expect(classList).toContain('two')
        expect(classList).toContain('three')
    })

    it('applies iconClass when passed as array', () => {
        const wrapper = factory({ iconClass: ['foo', 'bar'] })
        const classList = wrapper.classes()

        expect(classList).toContain('foo')
        expect(classList).toContain('bar')
    })

    it('passes svgCustomize to NuxtIcon', () => {
        const mockCustomize = vi.fn()
        const wrapper = factory({ svgCustomize: mockCustomize })
        const nuxtIcon = wrapper.findComponent({ name: 'NuxtIcon' })

        expect(nuxtIcon.props('customize')).toBe(mockCustomize)
    })

    it('passes mode prop to NuxtIcon', () => {
        const wrapper = factory({ mode: IconMode.SVG })
        const nuxtIcon = wrapper.findComponent({ name: 'NuxtIcon' })

        expect(nuxtIcon.props('mode')).toBe(IconMode.SVG)
    })
})
