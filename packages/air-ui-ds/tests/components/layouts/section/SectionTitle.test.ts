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
})
