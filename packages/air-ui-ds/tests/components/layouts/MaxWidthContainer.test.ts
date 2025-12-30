import { mount } from '@vue/test-utils'
import MaxWidthContainer from '@/components/layouts/MaxWidthContainer.vue'

describe('MaxWidthContainer.vue', () => {
    it('renders the container element', () => {
        const wrapper = mount(MaxWidthContainer)
        expect(wrapper.find('div').exists()).toBe(true)
    })

    it('renders default slot content', () => {
        const wrapper = mount(MaxWidthContainer, {
            slots: {
                default: '<p class="test-slot">Hello World</p>'
            }
        })

        expect(wrapper.find('.test-slot').exists()).toBe(true)
        expect(wrapper.text()).toContain('Hello World')
    })
})
