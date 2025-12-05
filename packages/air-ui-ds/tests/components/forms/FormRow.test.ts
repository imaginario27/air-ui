import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import FormRow from '~/components/forms/FormRow.vue'

const factory = (options = {}): VueWrapper => {
    return mount(FormRow, {
        slots: {
            default: '<div>Form Row Content</div>'
        },
        ...options
    })
}

describe('FormRow.vue', () => {
    it('renders slot content', () => {
        const wrapper = factory()
        expect(wrapper.html()).toContain('Form Row Content')
    })

    it('does not apply spacing class when spaced is false', () => {
        const wrapper = factory()
        const div = wrapper.find('div')

        expect(div.classes()).not.toContain('py-6')
    })

    it('applies spacing class when spaced is true', () => {
        const wrapper = factory({
            props: {
                spaced: true
            }
        })

        const div = wrapper.find('div')
        expect(div.classes()).toContain('py-6')
    })
})
