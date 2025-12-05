import { mount } from '@vue/test-utils'
import TableBody from '@/components/tables/TableBody.vue'

describe('TableBody', () => {
    it('mounts properly', () => {
        const wrapper = mount(TableBody)
        expect(wrapper.exists()).toBe(true)
    })
})
