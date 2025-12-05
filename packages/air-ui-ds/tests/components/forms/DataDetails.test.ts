import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import DataDetails from '~/components/forms/DataDetails.vue'

const factory = (options = {}): VueWrapper => {
    return mount(DataDetails, {
        slots: {
            default: '<div>Detail content</div>'
        },
        ...options
    })
}

describe('DataDetails.vue', () => {
    it('renders slot content', () => {
        const wrapper = factory()
        expect(wrapper.html()).toContain('Detail content')
    })
})
