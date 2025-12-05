import { mount } from '@vue/test-utils'
import NavSidebarMenu from '@/components/navigation/nav-sidebar/NavSidebarMenu.vue'

describe('NavSidebarMenu.vue', () => {
    it('renders slot content', () => {
        const wrapper = mount(NavSidebarMenu, {
            slots: {
                default: '<div class="test-slot">Slot Content</div>'
            }
        })

        expect(wrapper.find('.test-slot').exists()).toBe(true)
        expect(wrapper.find('.test-slot').text()).toBe('Slot Content')
    })
})
