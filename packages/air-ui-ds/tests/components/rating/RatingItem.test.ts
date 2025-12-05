// tests/components/RatingItem.spec.ts
import { mount } from '@vue/test-utils'
import RatingItem from '~/components/rating/RatingItem.vue'
import { RatingItemSize, RatingItemColor } from '@/models/enums/rating'
import { MdiIcon } from '#components'

describe('RatingItem', () => {
    it('renders with default props', () => {
        const wrapper = mount(RatingItem)

        const icon = wrapper.findComponent(MdiIcon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdiStarOutline')
        expect(icon.props('size')).toBe('20')
        expect(icon.classes()).toContain('text-icon-rating')
        expect(icon.classes()).not.toContain('hover:cursor-pointer')
    })

    it('applies correct size based on prop', () => {
        const wrapper = mount(RatingItem, {
            props: {
                size: RatingItemSize.XL
            }
        })

        expect(wrapper.findComponent(MdiIcon).props('size')).toBe('40')
    })

    it('applies correct color class based on prop', () => {
        const wrapper = mount(RatingItem, {
            props: {
                color: RatingItemColor.PRIMARY_BRAND
            }
        })

        expect(wrapper.findComponent(MdiIcon).classes()).toContain('text-icon-primary-brand-rating')
    })

    it('adds interactive class when isInteractive is true', () => {
        const wrapper = mount(RatingItem, {
            props: {
                isInteractive: true
            }
        })

        expect(wrapper.findComponent(MdiIcon).classes()).toContain('hover:cursor-pointer')
    })

    it('falls back to default size and color if invalid values are provided', () => {
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        const wrapper = mount(RatingItem, {
            props: {
                // @ts-expect-error intentionally invalid
                size: 'invalid',
                // @ts-expect-error intentionally invalid
                color: 'invalid'
            }
        })

        expect(wrapper.findComponent(MdiIcon).props('size')).toBe('20') // fallback
        expect(wrapper.findComponent(MdiIcon).classes()).toContain('text-icon-rating')

        consoleWarnSpy.mockRestore()
    })
})
