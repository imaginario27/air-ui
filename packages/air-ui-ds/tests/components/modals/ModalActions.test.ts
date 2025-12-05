import { mount } from '@vue/test-utils'
import ModalActions from '@/components/modals/ModalActions.vue'

const factory = (props?: Partial<{ reverseOnMobile: boolean }>, slots?: { default?: string }) => {
    return mount(ModalActions, {
        props: {
            reverseOnMobile: true,
            ...props
        },
        slots
    })
}

describe('ModalActions', () => {
    it('renders slot content', () => {
        const wrapper = factory(undefined, {
            default: '<button>Confirm</button>'
        })

        expect(wrapper.html()).toContain('<button>Confirm</button>')
    })

    it('applies class for reverseOnMobile = true (default)', () => {
        const wrapper = factory()

        const rootDiv = wrapper.find('div')
        expect(rootDiv.classes()).toContain('flex-col-reverse')
        expect(rootDiv.classes()).toContain('md:flex-row')
    })

    it('applies class for reverseOnMobile = false', () => {
        const wrapper = factory({ reverseOnMobile: false })

        const rootDiv = wrapper.find('div')
        expect(rootDiv.classes()).toContain('flex-col')
        expect(rootDiv.classes()).toContain('md:flex-row')
        expect(rootDiv.classes()).not.toContain('flex-col-reverse')
    })
})
