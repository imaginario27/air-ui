import { mount } from '@vue/test-utils'
import ModalTitlesWrapper from '~/components/modals/ModalHeadings.vue'

const factory = (slots?: { default?: string }) => {
    return mount(ModalTitlesWrapper, {
        slots
    })
}

describe('ModalTitlesWrapper', () => {
    it('renders slot content', () => {
        const wrapper = factory({
            default: '<h2>Title</h2><h3>Subtitle</h3>'
        })

        expect(wrapper.html()).toContain('<h2>Title</h2>')
        expect(wrapper.html()).toContain('<h3>Subtitle</h3>')
    })
})
