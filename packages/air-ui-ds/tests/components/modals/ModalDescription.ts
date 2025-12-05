import { mount } from '@vue/test-utils'
import ModalDescription from '@/components/modals/ModalDescription.vue'

const factory = (slots?: { default?: string }) => {
    return mount(ModalDescription, {
        slots
    })
}

describe('ModalDescription', () => {
    it('renders slot content', () => {
        const wrapper = factory({
            default: 'This is a description.'
        })

        expect(wrapper.text()).toBe('This is a description.')
    })
})
