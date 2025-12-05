import { mount } from '@vue/test-utils'
import Table from '@/components/tables/Table.vue'

describe('Table', () => {
    it('mounts properly', () => {
        const wrapper = mount(Table)
        expect(wrapper.exists()).toBe(true)
    })
})
