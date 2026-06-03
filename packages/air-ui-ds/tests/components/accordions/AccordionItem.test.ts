import { mount } from '@vue/test-utils'
import AccordionItem from '@/components/accordions/AccordionItem.vue'
import ActionIconButton from '@/components/buttons/ActionIconButton.vue'

const factory = (props?: { title?: string; content?: string }) => {
    return mount(AccordionItem, {
        props
    })
}

describe('AccordionItem', () => {
    it('renders with default props', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Item title')
        expect(wrapper.text()).toContain('Item content')
    })

    it('renders with custom title and content', () => {
        const wrapper = factory({
            title: 'FAQ Question',
            content: 'This is the answer.'
        })

        expect(wrapper.text()).toContain('FAQ Question')
        expect(wrapper.text()).toContain('This is the answer.')
    })

    it('toggles isOpen on click and updates state accordingly', async () => {
        const wrapper = factory()

        expect((wrapper.vm as any).isOpen).toBe(false)

        await wrapper.find('.accordion-header').trigger('click')
        expect((wrapper.vm as any).isOpen).toBe(true)

        await wrapper.find('.accordion-header').trigger('click')
        expect((wrapper.vm as any).isOpen).toBe(false)
    })

    it('displays correct icon based on isOpen state', async () => {
        const wrapper = factory()
        const iconButton = wrapper.findComponent(ActionIconButton)

        expect(iconButton.props('icon')).toBe('mdi:plus')

        await wrapper.find('.accordion-header').trigger('click')
        expect(iconButton.props('icon')).toBe('mdi:minus')
    })

    it('uses a button element for the header', () => {
        const wrapper = factory()
        expect(wrapper.find('button.accordion-header').exists()).toBe(true)
    })

    it('sets aria-expanded to match open state', async () => {
        const wrapper = factory()
        const header = wrapper.find('button.accordion-header')

        expect(header.attributes('aria-expanded')).toBe('false')

        await header.trigger('click')
        expect(header.attributes('aria-expanded')).toBe('true')
    })

    it('links header to panel via aria-controls', () => {
        const wrapper = factory()
        const header = wrapper.find('button.accordion-header')
        const panel = wrapper.find('[role="region"]')

        expect(header.attributes('aria-controls')).toBe(panel.attributes('id'))
    })

    it('makes inner ActionIconButton decorative', () => {
        const wrapper = factory()
        const iconButton = wrapper.findComponent(ActionIconButton)

        expect(iconButton.attributes('tabindex')).toBe('-1')
        expect(iconButton.attributes('aria-hidden')).toBe('true')
    })
})
