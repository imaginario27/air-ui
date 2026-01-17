import { mount } from '@vue/test-utils'
import RatingItem from '@/components/rating/RatingItem.vue'
import Icon from '@/components/icons/Icon.vue'
import { RatingItemSize, RatingItemColor } from '@/models/enums/rating'

describe('RatingItem', () => {
    it('renders with default props', () => {
        const wrapper = mount(RatingItem)

        const icon = wrapper.findComponent(Icon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('name')).toBe('mdi:star-outline')
        expect(icon.classes()).toContain('text-icon-rating')
        expect(icon.classes()).toContain('w-[20px]')
        expect(icon.classes()).not.toContain('hover:cursor-pointer')
    })

    it('applies correct size class based on size prop', () => {
        const wrapper = mount(RatingItem, {
            props: {
                size: RatingItemSize.XL
            }
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.classes()).toContain('w-[40px]')
        expect(icon.classes()).toContain('h-[40px]')
    })

    it('applies correct color class based on color prop', () => {
        const wrapper = mount(RatingItem, {
            props: {
                color: RatingItemColor.PRIMARY_BRAND
            }
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.classes()).toContain('text-icon-primary-brand-rating')
    })

    it('adds interactive class when isInteractive is true', () => {
        const wrapper = mount(RatingItem, {
            props: {
                isInteractive: true
            }
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.classes()).toContain('hover:cursor-pointer')
    })

    it('falls back to default size and color if invalid values are provided', () => {
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        const wrapper = mount(RatingItem, {
            props: {
                // @ts-expect-error: intentionally invalid
                size: 'invalid',
                // @ts-expect-error: intentionally invalid
                color: 'invalid'
            }
        })

        const icon = wrapper.findComponent(Icon)
        expect(icon.classes()).toContain('text-icon-rating')
        expect(icon.classes()).toContain('w-[20px]')
        consoleWarnSpy.mockRestore()
    })
})
