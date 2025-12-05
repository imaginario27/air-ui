import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import DataDetailsRow from '~/components/forms/DataDetailsRow.vue'

const factory = (options = {}): VueWrapper => {
    return mount(DataDetailsRow, {
        slots: {
            default: '<div>Row Content</div>'
        },
        ...options
    })
}

describe('DataDetailsRow.vue', () => {
    it('renders slot content', () => {
        const wrapper = factory()
        expect(wrapper.html()).toContain('Row Content')
    })

    it('applies spacing when spaced is true', () => {
        const wrapper = factory({
            props: {
                spaced: true
            }
        })

        const div = wrapper.find('div')
        expect(div.classes()).toContain('py-6')
    })

    it('does not apply spacing when spaced is false', () => {
        const wrapper = factory({
            props: {
                spaced: false
            }
        })

        const div = wrapper.find('div')
        expect(div.classes()).not.toContain('py-6')
    })
})
