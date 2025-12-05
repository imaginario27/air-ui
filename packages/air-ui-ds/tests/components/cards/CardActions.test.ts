import { mount } from '@vue/test-utils'
import CardActions from '@/components/cards/CardActions.vue'

describe('CardActions.vue', () => {
    it('renders the component properly', () => {
        const wrapper = mount(CardActions)
        expect(wrapper.exists()).toBe(true)
    })

    it('renders default slot content', () => {
        const wrapper = mount(CardActions, {
            slots: {
                default: '<button>Action</button>'
            }
        })
        expect(wrapper.html()).toContain('Action')
    })
})
