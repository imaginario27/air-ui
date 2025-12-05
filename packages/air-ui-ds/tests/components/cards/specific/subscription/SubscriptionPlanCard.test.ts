import { mount } from '@vue/test-utils'
import SubscriptionPlanCard from '@/components/cards/specific/subscription/SubscriptionPlanCard.vue'
import { Align } from '~/models/enums/positions'
import { ButtonStyleType } from '@/models/enums/buttons'
import { MdiIcon } from '#components'
import ListItem from '~/components/lists/ListItem.vue'
import List from '~/components/lists/List.vue'
import ActionButton from '~/components/buttons/ActionButton.vue'
import Badge from '~/components/badges/Badge.vue'

const defaultFeatures = ['Feature A', 'Feature B']

const factory = (props = {}, options = {}) => {
    return mount(SubscriptionPlanCard, {
        props: {
            title: 'Pro Plan',
            monthlyAmount: 15,
            yearlyAmount: 150,
            features: defaultFeatures,
            ...props
        },
        ...options
    })
}

describe('SubscriptionPlanCard.vue', () => {
    it('renders the capitalized title and monthly pricing by default', () => {
        const wrapper = factory({ title: 'starter' })
        expect(wrapper.text()).toContain('Starter')
        expect(wrapper.text()).toContain('15€')
        expect(wrapper.text()).toContain('monthly')
    })

    it('renders yearly pricing and label when isYearly is true', () => {
        const wrapper = factory({ isYearly: true })
        expect(wrapper.text()).toContain('150€')
        expect(wrapper.text()).toContain('yearly')
    })

    it('renders the featured badge when isFeatured is true and isActive is false', () => {
        const wrapper = factory({ isFeatured: true, isActive: false })
        const badge = wrapper.findComponent(Badge)
        expect(badge.exists()).toBe(true)
        expect(badge.props('text')).toBe('Recommended')
    })

    it('does not render featured badge when isActive is true (even if isFeatured)', () => {
        const wrapper = factory({ isFeatured: true, isActive: true })
        const badge = wrapper.findComponent(Badge)
        expect(badge.exists()).toBe(false)
    })

    it('shows MdiIcon check when isActive is true and not isFeatured', () => {
        const wrapper = factory({ isActive: true, isFeatured: false })
        const icon = wrapper.findComponent(MdiIcon)
        expect(icon.exists()).toBe(true)
        expect(icon.props('icon')).toBe('mdiCheckCircle')
    })

    it('does not show MdiIcon check when isActive is false', () => {
        const wrapper = factory({ isActive: false })
        expect(wrapper.find('.active-icon').exists()).toBe(false)
    })

    it('renders the description when provided', () => {
        const wrapper = factory({ description: 'Plan description here' })
        expect(wrapper.text()).toContain('Plan description here')
    })

    it('renders each feature in a ListItem', () => {
        const wrapper = factory()
        const items = wrapper.findAllComponents(ListItem)
        expect(items).toHaveLength(defaultFeatures.length)
        defaultFeatures.forEach((feature, index) => {
            expect(items[index].text()).toContain(feature)
        })
    })

    it('applies separator prop to List when hasFeatureListSeparator is true', () => {
        const wrapper = factory({ hasFeatureListSeparator: true })
        const list = wrapper.findComponent(List)
        expect(list.props('hasSeparator')).toBe(true)
    })

    it('does not apply separator to List when hasFeatureListSeparator is false', () => {
        const wrapper = factory({ hasFeatureListSeparator: false })
        const list = wrapper.findComponent(List)
        expect(list.props('hasSeparator')).toBe(false)
    })

    it('renders select button when isActive is false and showSelectButton is true', () => {
        const wrapper = factory({ isActive: false, showSelectButton: true })
        const button = wrapper.findComponent(ActionButton)
        expect(button.exists()).toBe(true)
        expect(button.props('text')).toBe('Get started today')
    })

    it('does not render select button if isActive is true', () => {
        const wrapper = factory({ isActive: true })
        expect(wrapper.findComponent(ActionButton).exists()).toBe(false)
    })

    it('does not render select button if showSelectButton is false', () => {
        const wrapper = factory({ isActive: false, showSelectButton: false })
        expect(wrapper.findComponent(ActionButton).exists()).toBe(false)
    })

    it('applies featuredButtonStyle to ActionButton when isFeatured', () => {
        const wrapper = factory({ isFeatured: true, isActive: false })
        const button = wrapper.findComponent(ActionButton)
        expect(button.props('styleType')).toBe(ButtonStyleType.PRIMARY_BRAND_FILLED)
    })

    it('applies default buttonStyle when not featured', () => {
        const wrapper = factory({ isFeatured: false, isActive: false })
        const button = wrapper.findComponent(ActionButton)
        expect(button.props('styleType')).toBe(ButtonStyleType.NEUTRAL_FILLED)
    })

    it('aligns the button wrapper according to alignSelectButton', () => {
        const wrapper = factory({ alignSelectButton: Align.RIGHT })
        const buttonWrapper = wrapper.find('.mt-auto.flex')
        expect(buttonWrapper.classes()).toContain('justify-end')
    })
})
