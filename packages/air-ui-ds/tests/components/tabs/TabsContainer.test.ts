import { mount } from '@vue/test-utils'
import TabsContainer from '@/components/tabs/TabsContainer.vue'

describe('TabsContainer', () => {
    it('renders slot content', () => {
        const wrapper = mount(TabsContainer, {
            slots: {
                default: '<div>Inner Content</div>'
            }
        })

        expect(wrapper.text()).toContain('Inner Content')
        expect(wrapper.find('div').exists()).toBe(true)
    })
})
