import { mount } from '@vue/test-utils'
import CardBody from '@/components/cards/CardBody.vue'

describe('CardBody.vue', () => {
    it('renders the component properly', () => {
        const wrapper = mount(CardBody)
        expect(wrapper.exists()).toBe(true)
    })

    it('renders default slot content', () => {
        const wrapper = mount(CardBody, {
            slots: {
                default: '<p>Body Content</p>'
            }
        })
        expect(wrapper.html()).toContain('Body Content')
    })
})
