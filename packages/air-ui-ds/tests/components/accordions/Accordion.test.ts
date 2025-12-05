import { mount } from '@vue/test-utils'
import Accordion from '@/components/accordions/Accordion.vue'

const mockItems = [
    { id: 1, title: 'Item 1', content: 'Content 1' },
    { id: 2, title: 'Item 2', content: 'Content 2' }
]

describe('Accordion.vue', () => {
    it('renders the component properly with required props', () => {
        const wrapper = mount(Accordion, {
            props: {
                items: mockItems
            }
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('renders AccordionItem components for each item', () => {
        const wrapper = mount(Accordion, {
            props: {
                items: mockItems
            }
        })

        const items = wrapper.findAllComponents({ name: 'AccordionItem' })
        expect(items.length).toBe(mockItems.length)
    })
})
