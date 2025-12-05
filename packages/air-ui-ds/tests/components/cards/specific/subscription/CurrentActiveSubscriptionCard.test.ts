import { mount } from '@vue/test-utils'
import CurrentActiveSubscriptionCard from '@/components/cards/specific/subscription/CurrentActiveSubscriptionCard.vue'
import CardTitle from '~/components/cards/CardTitle.vue'
import ActionButton from '~/components/buttons/ActionButton.vue'

const factory = (props = {}, options = {}) => {
    return mount(CurrentActiveSubscriptionCard, {
        props,
        ...options
    })
}

describe('CurrentActiveSubscriptionCard.vue', () => {
    it('renders the component properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the default title when plan is active', () => {
        const wrapper = factory({ isPlanCancelled: false })
        const title = wrapper.findComponent(CardTitle)
        expect(title.props('title')).toBe('Current Active Plan')
        expect(title.classes()).not.toContain('text-text-danger')
    })

    it('displays "Plan canceled" title and danger class when plan is cancelled', () => {
        const wrapper = factory({ isPlanCancelled: true })
        const title = wrapper.findComponent(CardTitle)
        expect(title.props('title')).toBe('Plan canceled')
        expect(title.classes()).toContain('text-text-danger')
    })

    it('renders custom title when provided and plan is active', () => {
        const wrapper = factory({ title: 'My Subscription', isPlanCancelled: false })
        const title = wrapper.findComponent(CardTitle)
        expect(title.props('title')).toBe('My Subscription')
    })

    it('displays next invoice message when plan is active', () => {
        const wrapper = factory({
            isPlanCancelled: false,
            nextPaymentAmount: 19.99,
            currencySymbol: '$',
            nextPaymentDate: '2025-08-01'
        })
        expect(wrapper.text()).toContain('Your next invoice is 19.99$ and will be sent on 2025-08-01.')
    })

    it('displays cancellation message when plan is cancelled', () => {
        const wrapper = factory({
            isPlanCancelled: true,
            nextPaymentDate: '2025-08-01'
        })
        expect(wrapper.text()).toContain('Your plan will switch to FREE on 2025-08-01.')
    })

    it('renders the plan name in uppercase', () => {
        const wrapper = factory({ planName: 'pro' })
        expect(wrapper.text()).toContain('PRO')
    })

    it('renders the plan description if plan is active', () => {
        const wrapper = factory({
            isPlanCancelled: false,
            planDescription: 'Best features'
        })
        expect(wrapper.text()).toContain('Best features')
    })

    it('does not render plan description if plan is cancelled', () => {
        const wrapper = factory({
            isPlanCancelled: true,
            planDescription: 'Hidden description'
        })
        expect(wrapper.text()).not.toContain('Hidden description')
    })

    it('renders change plan button with correct props', () => {
        const wrapper = factory({
            changePlanButtonText: 'Update Plan',
            changePlanLink: '/settings/plan'
        })
        const button = wrapper.findAllComponents(ActionButton)[0]
        expect(button.props('text')).toBe('Update Plan')
        expect(button.props('to')).toBe('/settings/plan')
    })

    it('renders cancel button and emits cancel event when clicked (plan active)', async () => {
        const wrapper = factory({ isPlanCancelled: false })
        const buttons = wrapper.findAllComponents(ActionButton)
        const cancelBtn = buttons.find(btn => btn.props('text') === 'Cancel subscription')
        expect(cancelBtn).toBeTruthy()
        await cancelBtn!.trigger('click')
        expect(wrapper.emitted('cancel')).toBeTruthy()
    })

    it('renders undo cancellation button and emits undoCancellation event when clicked (plan cancelled)', async () => {
        const wrapper = factory({ isPlanCancelled: true })
        const buttons = wrapper.findAllComponents(ActionButton)
        const undoBtn = buttons.find(btn => btn.text() === 'Undo cancellation')
        expect(undoBtn).toBeTruthy()
        await undoBtn!.trigger('click')
        expect(wrapper.emitted('undoCancellation')).toBeTruthy()
    })
})
