import { mount } from '@vue/test-utils'
import ContentPlaceholder from '@/components/placeholders/ContentPlaceholder.vue'

const factory = (props?: Partial<InstanceType<typeof ContentPlaceholder>['$props']>) => {
    return mount(ContentPlaceholder, {
        props,
    })
}

describe('ContentPlaceholder', () => {
    it('renders with default text if none is provided', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Replace me')
    })

    it('renders with provided text', () => {
        const wrapper = factory({ text: 'Loading content...' })
        expect(wrapper.text()).toContain('Loading content...')
    })

    it('applies custom textWrapperClass', () => {
        const wrapper = factory({ textWrapperClass: 'custom-wrapper' })
        const wrapperDiv = wrapper.findAll('div')[1]
        expect(wrapperDiv.classes()).toContain('custom-wrapper')
    })

    it('applies custom textClass to span', () => {
        const wrapper = factory({ textClass: 'custom-text' })
        const span = wrapper.find('span')
        expect(span.classes()).toContain('custom-text')
    })

    it('renders structure correctly', () => {
        const wrapper = factory({ text: 'Placeholder text' })

        const outer = wrapper.find('div')
        const inner = wrapper.find('div > div')
        const span = wrapper.find('span')

        expect(outer.exists()).toBe(true)
        expect(inner.exists()).toBe(true)
        expect(span.exists()).toBe(true)
        expect(span.text()).toBe('Placeholder text')
    })
})
