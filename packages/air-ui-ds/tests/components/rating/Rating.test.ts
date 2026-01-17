import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import Rating from '~/components/rating/Rating.vue'
import RatingItem from '~/components/rating/RatingItem.vue'
import { RatingItemSize, RatingItemColor } from '@/models/enums/rating'

type RatingProps = Partial<InstanceType<typeof Rating>['$props']>

const factory = (props?: RatingProps): VueWrapper => {
    return mount(Rating, {
        props
    })
}

describe('Rating.vue', () => {
    const getItems = (wrapper: VueWrapper) => wrapper.findAllComponents(RatingItem)

    it('renders 5 RatingItem components for NaN value', () => {
        const wrapper = factory({ value: NaN })
        expect(getItems(wrapper)).toHaveLength(5)
    })

    it('renders 5 RatingItem components for 0 value', () => {
        const wrapper = factory({ value: 0 })
        expect(getItems(wrapper)).toHaveLength(5)
    })

    it('renders 5 RatingItem components for rounded value (e.g. 3.3 → 3.5)', () => {
        const wrapper = factory({ value: 3.3 })
        expect(getItems(wrapper)).toHaveLength(5)
    })

    it('clamps value above 5', () => {
        const wrapper = factory({ value: 6 })
        expect(getItems(wrapper)).toHaveLength(5)
    })

    it('clamps value below 0', () => {
        const wrapper = factory({ value: -2 })
        expect(getItems(wrapper)).toHaveLength(5)
    })

    it('renders 5 RatingItem components for values between 0 and 5', () => {
        for (let i = 0; i <= 5; i++) {
            const wrapper = factory({ value: i })
            expect(getItems(wrapper)).toHaveLength(5)
        }
    })

    it('applies size and color props to RatingItem components', () => {
        const wrapper = factory({
            value: 4,
            size: RatingItemSize.LG,
            color: RatingItemColor.GOLD
        })

        const items = getItems(wrapper)
        for (const item of items) {
            expect(item.props('size')).toBe(RatingItemSize.LG)
            expect(item.props('color')).toBe(RatingItemColor.GOLD)
        }
    })

    it('uses default icons when none are provided', () => {
        const wrapper = factory({ value: 2.5 })
        const icons = getItems(wrapper).map(item => item.props('icon'))

        expect(icons).toContain('mdi:star')
        expect(icons).toContain('mdi:star-half-full')
        expect(icons).toContain('mdi:star-outline')
    })

    it('respects custom icons for indicators', () => {
        const wrapper = factory({
            value: 2.5,
            fullIndicatorIcon: 'customFull',
            halfIndicatorIcon: 'customHalf',
            emptyIndicatorIcon: 'customEmpty'
        })

        const icons = getItems(wrapper).map(item => item.props('icon'))
        expect(icons).toContain('customFull')
        expect(icons).toContain('customHalf')
        expect(icons).toContain('customEmpty')
    })
})
