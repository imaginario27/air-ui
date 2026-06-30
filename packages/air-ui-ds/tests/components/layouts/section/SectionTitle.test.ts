import { mount } from '@vue/test-utils'
import SectionTitle from '@/components/layouts/section/SectionTitle.vue'

const factory = (props = {}) => {
    return mount(SectionTitle, { props })
}

describe('SectionTitle.vue', () => {
    it('renders the component with default title', () => {
        const wrapper = factory()
        const heading = wrapper.find('h2')

        expect(heading.exists()).toBe(true)
        expect(heading.text()).toBe('Title')
    })

    it('renders the component with a custom title', () => {
        const wrapper = factory({ title: 'My Section Heading' })
        expect(wrapper.find('h2').text()).toBe('My Section Heading')
    })

    it('renders an h3 when headingTag is h3', () => {
        const wrapper = factory({ headingTag: 'h3' })
        expect(wrapper.find('h3').exists()).toBe(true)
        expect(wrapper.find('h2').exists()).toBe(false)
    })

    it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)(
        'renders the correct heading element for headingTag %s',
        (tag) => {
            const wrapper = factory({ headingTag: tag })
            expect(wrapper.find(tag).exists()).toBe(true)
        }
    )
})
