import { mount } from '@vue/test-utils'
import ModalHeaderGroup from '~/components/modals/ModalHeaderGroup.vue'

const factory = (props?: Partial<{ centered: boolean }>, slots?: { default?: string }) => {
    return mount(ModalHeaderGroup, {
        props: {
            centered: false,
            ...props,
        },
        slots,
    })
}

describe('ModalHeaderGroup', () => {
    it('renders slot content', () => {
        const wrapper = factory(undefined, {
            default: '<p>Description here</p>',
        })

        expect(wrapper.html()).toContain('<p>Description here</p>')
    })

    it('adds text-center class when centered is true', () => {
        const wrapper = factory({ centered: true })

        const div = wrapper.find('div')
        expect(div.classes()).toContain('text-center')
    })

    it('mirrors the title right padding on the left when centered is true', () => {
        const wrapper = factory({ centered: true })

        expect(wrapper.find('div').classes()).toContain('[&>h2]:pl-10')
    })

    it('does not mirror the title padding when centered is false', () => {
        const wrapper = factory({ centered: false })

        expect(wrapper.find('div').classes()).not.toContain('[&>h2]:pl-10')
    })

    it('does not have text-center class when centered is false', () => {
        const wrapper = factory({ centered: false })

        const div = wrapper.find('div')
        expect(div.classes()).not.toContain('text-center')
    })
})
