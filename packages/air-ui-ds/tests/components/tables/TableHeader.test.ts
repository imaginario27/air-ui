import { mount, type VueWrapper } from '@vue/test-utils'
import TableHeader from '@/components/tables/TableHeader.vue'

const factory = (options?: {
    slots?: Record<string, string>
}): VueWrapper => {
    return mount(TableHeader, {
        ...options
    })
}

describe('TableHeader', () => {
    it('mounts properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders slot content', () => {
        const wrapper = factory({
            slots: {
                default: '<tr><th>Header</th></tr>'
            }
        })

        expect(wrapper.html()).toContain('<th>Header</th>')
    })
})
