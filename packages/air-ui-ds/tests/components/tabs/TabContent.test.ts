import { mount } from '@vue/test-utils'
import TabContent from '@/components/tabs/TabContent.vue'

describe('TabContent', () => {
    it('renders slot content', () => {
        const wrapper = mount(TabContent, {
            slots: {
                default: '<p>Test slot content</p>'
            }
        })

        expect(wrapper.text()).toContain('Test slot content')
        expect(wrapper.find('p').exists()).toBe(true)
    })
})
