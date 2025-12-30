import { mount } from '@vue/test-utils'
import SectionHeader from '@/components/layouts/section/SectionHeader.vue'

describe('SectionHeader.vue', () => {
    it('renders the component', () => {
        const wrapper = mount(SectionHeader)
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find('div').exists()).toBe(true)
    })

    it('renders slot content', () => {
        const wrapper = mount(SectionHeader, {
            slots: {
                default: '<h2 class="slot-content">Header Content</h2>'
            }
        })

        expect(wrapper.find('.slot-content').exists()).toBe(true)
        expect(wrapper.text()).toContain('Header Content')
    })
})
