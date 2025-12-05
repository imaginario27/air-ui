import { mount, type VueWrapper } from '@vue/test-utils'
import TableHeaderCell from '@/components/tables/TableHeaderCell.vue'

const factory = (options?: {
    slots?: Record<string, string>
}): VueWrapper => {
    return mount(TableHeaderCell, {
        ...options
    })
}

describe('TableHeaderCell', () => {
    it('mounts properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders slot content', () => {
        const wrapper = factory({
            slots: {
                default: 'Header Cell'
            }
        })
        expect(wrapper.text()).toContain('Header Cell')
    })
})
