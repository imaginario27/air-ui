import { mount } from '@vue/test-utils'
import TableWrapper from '@/components/tables/TableWrapper.vue'

describe('TableWrapper', () => {
    it('mounts properly', () => {
        const wrapper = mount(TableWrapper)
        expect(wrapper.exists()).toBe(true)
    })

    it('renders slot content', () => {
        const wrapper = mount(TableWrapper, {
            slots: {
                default: '<p>Wrapped content</p>'
            }
        })
        expect(wrapper.html()).toContain('<p>Wrapped content</p>')
    })
})
