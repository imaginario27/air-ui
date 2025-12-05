import { mount } from '@vue/test-utils'
import ModalTitle from '@/components/modals/ModalTitle.vue'

const factory = (props?: Partial<{ title: string }>) => {
    return mount(ModalTitle, {
        props: {
            title: 'Modal title',
            ...props
        }
    })
}

describe('ModalTitle', () => {
    it('renders default title', () => {
        const wrapper = factory()
        expect(wrapper.text()).toBe('Modal title')
    })

    it('renders custom title', () => {
        const wrapper = factory({ title: 'My Custom Title' })
        expect(wrapper.text()).toBe('My Custom Title')
    })

    it('has correct class applied', () => {
        const wrapper = factory()
        const h2 = wrapper.find('h2')
        expect(h2.classes()).toContain('font-bold')
    })
})
