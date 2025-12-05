import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import Form from '~/components/forms/Form.vue'

const factory = (options = {}): VueWrapper => {
    return mount(Form, {
        slots: {
            default: '<button type="submit">Submit</button>'
        },
        ...options
    })
}

describe('Form.vue', () => {
    it('renders slot content', () => {
        const wrapper = factory()
        expect(wrapper.html()).toContain('Submit')
    })

    it('emits submit event when form is submitted', async () => {
        const wrapper = factory()

        await wrapper.find('form').trigger('submit')

        expect(wrapper.emitted('submit')).toHaveLength(1)
    })

    it('prevents default form submission behavior', async () => {
        const wrapper = factory()

        const form = wrapper.find('form')
        const event = new Event('submit')
        const preventDefault = vi.spyOn(event, 'preventDefault')

        await form.element.dispatchEvent(event)

        expect(preventDefault).toHaveBeenCalled()
    })
})
