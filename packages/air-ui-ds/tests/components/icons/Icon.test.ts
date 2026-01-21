import { mount } from '@vue/test-utils'
import Icon from '@/components/icons/Icon.vue'
import { IconMode, IconSize } from '@/models/enums/icons'
import { ColorAccent } from '@/models/enums/colors'

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

describe('Icon.vue', () => {
    it('renders NuxtIcon with default props', () => {
        const wrapper = factory()
        const nuxtIcon = wrapper.findComponent({ name: 'NuxtIcon' })

        expect(nuxtIcon.exists()).toBe(true)
        expect(nuxtIcon.props('name')).toBe('mdi:help')
        expect(nuxtIcon.props('mode')).toBe(IconMode.CSS)

        const classes = wrapper.classes()
        expect(classes).toContain('w-[20px]')
        expect(classes).toContain('text-inherit')
    })

    it('applies correct size class for XL', () => {
        const wrapper = factory({ size: IconSize.XL })
        expect(wrapper.classes()).toContain('w-[32px]')
        expect(wrapper.classes()).toContain('h-[32px]')
        expect(wrapper.classes()).toContain('min-w-[32px]')
        expect(wrapper.classes()).toContain('min-h-[32px]')
    })

    it('applies correct color class for SUCCESS', () => {
        const wrapper = factory({ color: ColorAccent.SUCCESS })
        expect(wrapper.classes()).toContain('text-icon-success')
    })

    it('applies default size and color when invalid values are provided', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

        const wrapper = factory({
            size: 'INVALID' as IconSize,
            color: 'INVALID' as ColorAccent
        })

        expect(wrapper.classes()).toContain('w-[20px]')
        expect(wrapper.classes()).toContain('text-inherit')

        warn.mockRestore()
    })

    it('splits and applies iconClass when passed as string', () => {
        const wrapper = factory({ iconClass: 'one two three' })
        const classes = wrapper.classes()

        expect(classes).toContain('one')
        expect(classes).toContain('two')
        expect(classes).toContain('three')
    })

    it('applies iconClass when passed as array', () => {
        const wrapper = factory({ iconClass: ['foo', 'bar'] })
        const classes = wrapper.classes()

        expect(classes).toContain('foo')
        expect(classes).toContain('bar')
    })

    it('does not apply default size class if size is overridden by iconClass', () => {
        const wrapper = factory({
            size: IconSize.XL,
            iconClass: ['w-[10px]', 'h-[10px]']
        })

        const classes = wrapper.classes()
        expect(classes).toContain('w-[10px]')
        expect(classes).not.toContain('w-[32px]')
    })

    it('does not apply color class if text color is overridden by iconClass', () => {
        const wrapper = factory({
            color: ColorAccent.WARNING,
            iconClass: ['text-red-500']
        })

        const classes = wrapper.classes()
        expect(classes).toContain('text-red-500')
        expect(classes).not.toContain('text-icon-warning')
    })

    it('passes svgCustomize function to NuxtIcon', () => {
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

    it('applies deduplicated classes', () => {
        const wrapper = factory({
            iconClass: ['text-icon-success', 'text-icon-success', 'w-[20px]']
        })

        const classes = wrapper.classes()
        const deduped = new Set(classes)
        expect(deduped.size).toBe(classes.length)
    })
})
