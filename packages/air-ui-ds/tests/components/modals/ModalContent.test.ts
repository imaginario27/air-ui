import { mount } from '@vue/test-utils'
import ModalContent from '@/components/modals/ModalContent.vue'

const factory = (slots?: { default?: string }) => {
    return mount(ModalContent, {
        slots
    })
}

describe('ModalContent', () => {
    it('renders slot content', () => {
        const wrapper = factory({
            default: '<p>Hello World</p>'
        })

        expect(wrapper.html()).toContain('<p>Hello World</p>')
    })
})
