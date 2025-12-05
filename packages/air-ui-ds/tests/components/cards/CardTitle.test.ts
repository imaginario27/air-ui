import { mount } from '@vue/test-utils'
import CardTitle from '@/components/cards/CardTitle.vue'

describe('CardTitle.vue', () => {
    it('renders the component properly', () => {
        const wrapper = mount(CardTitle)
        expect(wrapper.exists()).toBe(true)
    })

    it('renders the default title', () => {
        const wrapper = mount(CardTitle)
        expect(wrapper.text()).toBe('Card title')
    })

    it('renders a custom title when passed as a prop', () => {
        const wrapper = mount(CardTitle, {
            props: { title: 'Custom Title' }
        })
        expect(wrapper.text()).toBe('Custom Title')
    })
})
