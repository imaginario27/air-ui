import { mount } from '@vue/test-utils'
import SectionBody from '@/components/layouts/section/SectionBody.vue'

describe('SectionBody.vue', () => {
    it('renders the component', () => {
        const wrapper = mount(SectionBody)
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find('div').exists()).toBe(true)
    })

    it('renders slot content', () => {
        const wrapper = mount(SectionBody, {
            slots: {
                default: '<p class="slot-content">Test Content</p>'
            }
        })

        expect(wrapper.find('.slot-content').exists()).toBe(true)
        expect(wrapper.text()).toContain('Test Content')
    })
})
