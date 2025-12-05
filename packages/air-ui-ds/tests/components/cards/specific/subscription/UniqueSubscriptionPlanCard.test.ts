import { mount } from '@vue/test-utils'
import UniqueSubscriptionPlanCard from '@/components/cards/specific/subscription/UniqueSubscriptionPlanCard.vue'
import ListItem from '@/components/lists/ListItem.vue'

const defaultProps = {
    title: 'Plan name',
    description: 'Plan description',
    features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
        'Feature 6',
        'Feature 7',
        'Feature 8'
    ],
    price: '0€',
    buttonText: 'Get started today'
}

const factory = (props = {}, slots = {}) => {
    return mount(UniqueSubscriptionPlanCard, {
        props: { ...defaultProps, ...props },
        slots
    })
}

describe('UniqueSubscriptionPlanCard', () => {
    it('renders default props correctly', () => {
        const wrapper = factory()

        expect(wrapper.text()).toContain(defaultProps.title)
        expect(wrapper.text()).toContain(defaultProps.description)
        expect(wrapper.text()).toContain(defaultProps.price)
        expect(wrapper.text()).toContain(defaultProps.buttonText)

        const listItems = wrapper.findAllComponents(ListItem)
        expect(listItems.length).toBe(defaultProps.features.length)

        defaultProps.features.forEach((feature, index) => {
            expect(listItems[index].text()).toBe(feature)
        })
    })

    it('renders custom props correctly', () => {
        const customProps = {
            title: 'Pro Plan',
            description: 'Everything you need',
            price: '49€',
            buttonText: 'Subscribe Now',
            overtitle: 'Best Value',
            features: ['Fast support', 'Advanced analytics']
        }

        const wrapper = factory(customProps)

        expect(wrapper.text()).toContain(customProps.title)
        expect(wrapper.text()).toContain(customProps.description)
        expect(wrapper.text()).toContain(customProps.price)
        expect(wrapper.text()).toContain(customProps.buttonText)
        expect(wrapper.text()).toContain(customProps.overtitle)

        const listItems = wrapper.findAllComponents(ListItem)
        expect(listItems.length).toBe(customProps.features.length)

        customProps.features.forEach((feature, index) => {
            expect(listItems[index].text()).toBe(feature)
        })
    })

    it('renders additionalInfo slot content', () => {
        const wrapper = factory({}, {
            additionalInfo: '<p>Custom <strong>slot</strong> info</p>'
        })

        expect(wrapper.html()).toContain('<strong>slot</strong>')
    })

    it('emits click event when ActionButton is clicked', async () => {
        const wrapper = factory()

        const button = wrapper.findComponent({ name: 'ActionButton' })
        expect(button.exists()).toBe(true)

        await button.trigger('click')

        expect(wrapper.emitted('click')).toBeTruthy()
        expect(wrapper.emitted('click')?.length).toBe(1)
    })
})
