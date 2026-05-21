import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import Rating from '~/components/rating/Rating.vue'
import RatingItem from '~/components/rating/RatingItem.vue'
import { RatingItemSize, RatingItemColor } from '@/models/enums/rating'

// Mock getRatingIndicator to ensure predictable icons based on value
vi.mock('@/utils/rating', () => ({
    getRatingIndicator: (value: number, empty: string, half: string, full: string) => {
        if (value === 2.5) return [full, full, half, empty, empty]
        if (value === 5) return Array(5).fill(full)
        return Array(5).fill(empty)
    }
}))

type RatingProps = Partial<InstanceType<typeof Rating>['$props']>

const factory = (props?: RatingProps): VueWrapper => {
    return mount(Rating, {
        props,
        global: {
            stubs: {
                Icon: {
                    name: 'Icon',
                    props: ['name', 'iconClass', 'mode'],
                    template: '<i :data-icon="name" class="stub-icon" />'
                }
            }
        }
    })
}

const getItems = (wrapper: VueWrapper) => wrapper.findAllComponents(RatingItem)

describe('Rating.vue', () => {
    it('renders 5 RatingItem components for NaN value', () => {
        const wrapper = factory({ modelValue: NaN })
        expect(getItems(wrapper)).toHaveLength(5)
    })

    it('renders 5 RatingItem components for 0 value', () => {
        const wrapper = factory({ modelValue: 0 })
        expect(getItems(wrapper)).toHaveLength(5)
    })

    it('renders 5 RatingItem components for rounded value (e.g. 3.3 → 3.5)', () => {
        const wrapper = factory({ modelValue: 3.3 })
        expect(getItems(wrapper)).toHaveLength(5)
    })

    it('clamps value above 5', () => {
        const wrapper = factory({ modelValue: 6 })
        expect(getItems(wrapper)).toHaveLength(5)
    })

    it('clamps value below 0', () => {
        const wrapper = factory({ modelValue: -2 })
        expect(getItems(wrapper)).toHaveLength(5)
    })

    it('renders 5 RatingItem components for values between 0 and 5', () => {
        for (let i = 0; i <= 5; i++) {
            const wrapper = factory({ modelValue: i })
            expect(getItems(wrapper)).toHaveLength(5)
        }
    })

    it('applies size and color props to RatingItem components', () => {
        const wrapper = factory({
            modelValue: 4,
            size: RatingItemSize.LG,
            color: RatingItemColor.GOLD
        })

        const items = getItems(wrapper)
        for (const item of items) {
            expect(item.props('size')).toBe(RatingItemSize.LG)
            expect(item.props('color')).toBe(RatingItemColor.GOLD)
            expect(item.props('isInteractive')).toBe(false)
        }
    })

    it('respects custom icons for indicators', () => {
        const wrapper = factory({
            modelValue: 2.5,
            fullIndicatorIcon: 'customFull',
            halfIndicatorIcon: 'customHalf',
            emptyIndicatorIcon: 'customEmpty'
        })

        const icons = getItems(wrapper).map(item => item.props('icon'))
        expect(icons).toContain('customFull')
        expect(icons).toContain('customHalf')
        expect(icons).toContain('customEmpty')
    })

    it('does not emit update:modelValue on click when not interactive', async () => {
        const wrapper = factory({ modelValue: 2 })
        await getItems(wrapper)[3].trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    describe('isInteractive', () => {
        it('passes isInteractive to each RatingItem', () => {
            const wrapper = factory({ modelValue: 3, isInteractive: true })

            for (const item of getItems(wrapper)) {
                expect(item.props('isInteractive')).toBe(true)
            }
        })

        it('emits updated modelValue when a new item is clicked', async () => {
            const wrapper = factory({ modelValue: 2, isInteractive: true })

            await getItems(wrapper)[3].trigger('click') // index 3 = value 4

            expect(wrapper.emitted('update:modelValue')).toBeTruthy()
            expect(wrapper.emitted('update:modelValue')![0]).toEqual([4])
        })

        it('resets modelValue to 0 if clicked item is already selected', async () => {
            const wrapper = factory({ modelValue: 4, isInteractive: true })

            await getItems(wrapper)[3].trigger('click') // index 3 = value 4
            expect(wrapper.emitted('update:modelValue')![0]).toEqual([0])
        })

        it('updates displayValue based on hover when hoverPreview is enabled', async () => {
            const wrapper = factory({ modelValue: 2.5, isInteractive: true })
            const items = getItems(wrapper)

            await items[4].trigger('mouseenter') // index 4 = value 5
            const icons = items.map(i => i.props('icon'))

            expect(icons).toEqual(['mdi:star', 'mdi:star', 'mdi:star', 'mdi:star', 'mdi:star'])
        })

        it('ignores hover when hoverPreview is disabled', async () => {
            const wrapper = factory({ modelValue: 2.5, isInteractive: true, hoverPreview: false })
            const items = getItems(wrapper)

            await items[4].trigger('mouseenter')
            const icons = items.map(i => i.props('icon'))

            expect(icons).toEqual(['mdi:star', 'mdi:star', 'mdi:star-half-full', 'mdi:star-outline', 'mdi:star-outline'])
        })

        it('clears hover on container mouseleave', async () => {
            const wrapper = factory({ modelValue: 2.5, isInteractive: true })
            const container = wrapper.find('div')

            await getItems(wrapper)[4].trigger('mouseenter')
            let icons = getItems(wrapper).map(i => i.props('icon'))
            expect(icons).toEqual(['mdi:star', 'mdi:star', 'mdi:star', 'mdi:star', 'mdi:star'])

            await container.trigger('mouseleave')
            icons = getItems(wrapper).map(i => i.props('icon'))
            expect(icons).toEqual(['mdi:star', 'mdi:star', 'mdi:star-half-full', 'mdi:star-outline', 'mdi:star-outline'])
        })

        it('ignores hover when not interactive', async () => {
            const wrapper = factory({ modelValue: 2.5, isInteractive: false })
            const items = getItems(wrapper)

            await items[4].trigger('mouseenter')
            const icons = items.map(i => i.props('icon'))

            expect(icons).toEqual(['mdi:star', 'mdi:star', 'mdi:star-half-full', 'mdi:star-outline', 'mdi:star-outline'])
        })
    })
})
