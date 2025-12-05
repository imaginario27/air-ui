import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import FormActions from '~/components/forms/FormActions.vue'

const factory = (options = {}): VueWrapper => {
    return mount(FormActions, {
        slots: {
            default: '<button>Action</button>'
        },
        ...options
    })
}

describe('FormActions.vue', () => {
    it('renders slot content', () => {
        const wrapper = factory()
        expect(wrapper.html()).toContain('Action')
    })

    it('applies default flex direction when reverseOnMobile is true', () => {
        const wrapper = factory()
        const div = wrapper.find('div')

        expect(div.classes()).toContain('flex-col-reverse')
        expect(div.classes()).toContain('md:flex-row')
    })

    it('applies alternate flex direction when reverseOnMobile is false', () => {
        const wrapper = factory({
            props: {
                reverseOnMobile: false
            }
        })
        const div = wrapper.find('div')

        expect(div.classes()).toContain('flex-col')
        expect(div.classes()).toContain('md:flex-row')
        expect(div.classes()).not.toContain('flex-col-reverse')
    })
})
