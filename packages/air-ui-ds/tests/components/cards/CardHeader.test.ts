import { mount } from '@vue/test-utils'
import CardHeader from '@/components/cards/CardHeader.vue'

describe('CardHeader.vue', () => {
    it('renders the component properly', () => {
        const wrapper = mount(CardHeader)
        expect(wrapper.exists()).toBe(true)
    })

    it('renders default slot content', () => {
        const wrapper = mount(CardHeader, {
            slots: {
                default: '<h1>Header Content</h1>'
            }
        })
        expect(wrapper.html()).toContain('Header Content')
    })
})
