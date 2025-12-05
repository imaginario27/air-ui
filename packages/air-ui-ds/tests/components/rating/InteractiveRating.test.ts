import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import InteractiveRating from '~/components/rating/InteractiveRating.vue'
import RatingItem from '~/components/rating/RatingItem.vue'
import { RatingItemSize, RatingItemColor } from '@/models/enums/rating'

// Mock getRatingIndicator to ensure predictable icons based on value
vi.mock('@/utils/rating', () => ({
    getRatingIndicator: (value: number, empty: string, half: string, full: string) => {
        // Return [full, full, half, empty, empty] for 2.5
        if (value === 2.5) return [full, full, half, empty, empty]
        if (value === 5) return Array(5).fill(full)
        return Array(5).fill(empty)
    }
}))

type Props = Partial<InstanceType<typeof InteractiveRating>['$props']>

const factory = (props?: Props): VueWrapper => {
    return mount(InteractiveRating, {
        props: {
            modelValue: 3,
            ...props
        }
    })
}

const getStars = (wrapper: VueWrapper) => wrapper.findAllComponents(RatingItem)

describe('InteractiveRating.vue', () => {
    it('renders 5 RatingItem components', () => {
        const wrapper = factory({ modelValue: 3 })
        expect(getStars(wrapper)).toHaveLength(5)
    })

    it('emits updated modelValue when a new item is clicked', async () => {
        const wrapper = factory({ modelValue: 2 })
        const items = getStars(wrapper)

        await items[3].trigger('click') // index 3 = value 4

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([4])
    })

    it('resets modelValue to 0 if clicked item is already selected', async () => {
        const wrapper = factory({ modelValue: 4 })
        const items = getStars(wrapper)

        await items[3].trigger('click') // index 3 = value 4
        expect(wrapper.emitted('update:modelValue')![0]).toEqual([0])
    })

    it('updates displayValue based on hover when hoverPreview is enabled', async () => {
        const wrapper = factory({ modelValue: 2.5 })
        const items = getStars(wrapper)

        await items[4].trigger('mouseenter') // index 4 = value 5
        const icons = items.map(i => i.props('icon'))

        expect(icons).toEqual(['mdiStar', 'mdiStar', 'mdiStar', 'mdiStar', 'mdiStar'])
    })

    it('ignores hover when hoverPreview is disabled', async () => {
        const wrapper = factory({ hoverPreview: false, modelValue: 2.5 })
        const items = getStars(wrapper)

        await items[4].trigger('mouseenter')
        const icons = items.map(i => i.props('icon'))

        expect(icons).toEqual(['mdiStar', 'mdiStar', 'mdiStarHalfFull', 'mdiStarOutline', 'mdiStarOutline'])
    })

    it('clears hover on container mouseleave', async () => {
        const wrapper = factory({ modelValue: 2.5 })
        const container = wrapper.find('div')

        await getStars(wrapper)[4].trigger('mouseenter')
        let icons = getStars(wrapper).map(i => i.props('icon'))
        expect(icons).toEqual(['mdiStar', 'mdiStar', 'mdiStar', 'mdiStar', 'mdiStar'])

        await container.trigger('mouseleave')
        icons = getStars(wrapper).map(i => i.props('icon'))
        expect(icons).toEqual(['mdiStar', 'mdiStar', 'mdiStarHalfFull', 'mdiStarOutline', 'mdiStarOutline'])
    })

    it('passes props correctly to each RatingItem', () => {
        const wrapper = factory({
            modelValue: 3,
            size: RatingItemSize.LG,
            color: RatingItemColor.GOLD
        })

        const items = getStars(wrapper)

        for (const item of items) {
            expect(item.props('size')).toBe(RatingItemSize.LG)
            expect(item.props('color')).toBe(RatingItemColor.GOLD)
            expect(item.props('isInteractive')).toBe(true)
        }
    })

    it('uses provided custom icons', () => {
        const wrapper = factory({
            modelValue: 2.5,
            fullIndicatorIcon: 'customFull',
            halfIndicatorIcon: 'customHalf',
            emptyIndicatorIcon: 'customEmpty'
        })

        const icons = getStars(wrapper).map(i => i.props('icon'))
        expect(icons).toEqual(['customFull', 'customFull', 'customHalf', 'customEmpty', 'customEmpty'])
    })
})
