import { mount } from '@vue/test-utils'
import BadgeStack from '@/components/badges/BadgeStack.vue'
import Badge from '@/components/badges/Badge.vue'

const sampleData = [
    { text: 'Badge 1', icon: 'mdi:check' },
    { text: 'Badge 2' },
    { text: 'Badge 3' }
]

const factory = (props: Partial<InstanceType<typeof BadgeStack>['$props']> = {}) => {
    return mount(BadgeStack, {
        props: {
            items: sampleData,
            ...props
        },
        global: {
            components: {
                Badge
            }
        }
    })
}

describe('BadgeStack.vue', () => {
    it('renders all badges when no itemsLimit is set', () => {
        const wrapper = factory()
        const badges = wrapper.findAllComponents(Badge)

        expect(badges).toHaveLength(sampleData.length)
        expect(wrapper.text()).toContain('Badge 1')
        expect(wrapper.text()).toContain('Badge 2')
        expect(wrapper.text()).toContain('Badge 3')
    })

    it('limits badges correctly when itemsLimit is set', () => {
        const wrapper = factory({ itemsLimit: 2 })
        const badges = wrapper.findAllComponents(Badge)

        // 2 normal badges + 1 ellipsis badge
        expect(badges).toHaveLength(3)
        
        const visibleTexts = badges.map(b => b.text())
        expect(visibleTexts).toContain('Badge 1')
        expect(visibleTexts).toContain('Badge 2')
        expect(visibleTexts).toContain('...')
    })

    it('shows ellipsis badge when itemsLimit is exceeded', () => {
        const wrapper = factory({ itemsLimit: 2 })
        const badges = wrapper.findAllComponents(Badge)

        const ellipsisBadge = badges.find(badge => badge.text() === '...')
        expect(ellipsisBadge).toBeTruthy()
    })

    it('does not show ellipsis badge when itemsLimit is not exceeded', () => {
        const wrapper = factory({ itemsLimit: 5 })
        const badges = wrapper.findAllComponents(Badge)

        const ellipsisBadge = badges.find(b => b.text() === '...')
        expect(ellipsisBadge).toBeFalsy()

        expect(badges).toHaveLength(sampleData.length)
    })

    it('renders no badges if items list is empty', () => {
        const wrapper = factory({ items: [], itemsLimit: 2 })

        const badges = wrapper.findAllComponents(Badge)
        expect(badges.length).toBe(0)
    })

    it('applies badgeClass to visible badges', () => {
        const customClass = 'custom-badge-class'
        const wrapper = factory({ badgeClass: customClass })
        const badges = wrapper.findAllComponents(Badge)

        badges.forEach((badge) => {
            expect(badge.classes()).toContain(customClass)
        })
    })

    it('applies ellipsisBadgeClass only to ellipsis badge', () => {
        const ellipsisClass = 'custom-ellipsis-class'
        const wrapper = factory({ itemsLimit: 2, ellipsisBadgeClass: ellipsisClass })
        const badges = wrapper.findAllComponents(Badge)

        const ellipsisBadge = badges.find((badge) => badge.text() === '...')
        expect(ellipsisBadge).toBeTruthy()
        expect(ellipsisBadge?.classes()).toContain(ellipsisClass)

        const visibleBadges = badges.filter((badge) => badge.text() !== '...')
        visibleBadges.forEach((badge) => {
            expect(badge.classes()).not.toContain(ellipsisClass)
        })
    })

    it('falls back to BadgeStack-level props when items do not override them', () => {
        const wrapper = factory({ styleType: BadgeStyle.FILLED, color: ColorAccent.SUCCESS })
        const badges = wrapper.findAllComponents(Badge)

        badges.forEach((badge) => {
            expect(badge.props('styleType')).toBe(BadgeStyle.FILLED)
            expect(badge.props('color')).toBe(ColorAccent.SUCCESS)
        })
    })

    it('lets individual items override BadgeStack-level props', () => {
        const wrapper = factory({
            styleType: BadgeStyle.BORDER,
            color: ColorAccent.NEUTRAL,
            items: [
                { text: 'Badge 1' },
                { text: 'Badge 2', styleType: BadgeStyle.FILLED, color: ColorAccent.DANGER, shape: BadgeShape.PILL, isTransparent: true, showDot: true, closeable: true, showIcon: true, icon: 'mdi:check' },
            ]
        })
        const badges = wrapper.findAllComponents(Badge)

        expect(badges[0].props('styleType')).toBe(BadgeStyle.BORDER)
        expect(badges[0].props('color')).toBe(ColorAccent.NEUTRAL)

        expect(badges[1].props('styleType')).toBe(BadgeStyle.FILLED)
        expect(badges[1].props('color')).toBe(ColorAccent.DANGER)
        expect(badges[1].props('shape')).toBe(BadgeShape.PILL)
        expect(badges[1].props('isTransparent')).toBe(true)
        expect(badges[1].props('showDot')).toBe(true)
        expect(badges[1].props('closeable')).toBe(true)
        expect(badges[1].props('showIcon')).toBe(true)
    })
})
