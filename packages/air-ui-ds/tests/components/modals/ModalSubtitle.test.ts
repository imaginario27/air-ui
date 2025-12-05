import { mount } from '@vue/test-utils'
import ModalSubtitle from '@/components/modals/ModalSubtitle.vue'

const factory = (props?: Partial<{ title: string }>) => {
    return mount(ModalSubtitle, {
        props: {
            title: 'Modal subtitle',
            ...props
        }
    })
}

describe('ModalSubtitle', () => {
    it('renders default title', () => {
        const wrapper = factory()
        expect(wrapper.text()).toBe('Modal subtitle')
    })

    it('renders custom title', () => {
        const wrapper = factory({ title: 'Custom subtitle' })
        expect(wrapper.text()).toBe('Custom subtitle')
    })
})
