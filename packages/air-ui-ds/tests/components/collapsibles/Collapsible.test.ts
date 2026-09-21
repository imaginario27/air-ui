import { mount } from '@vue/test-utils'
import Collapsible from '@/components/collapsibles/Collapsible.vue'
import ActionIconButton from '@/components/buttons/ActionIconButton.vue'
import { ButtonSize } from '@/models/enums/buttons'

const factory = (props?: { title?: string; titleClass?: string; buttonSize?: ButtonSize }) => {
    return mount(Collapsible, {
        props,
        slots: {
            default: '<div>Collapsible Content</div>'
        }
    })
}

describe('Collapsible', () => {
    it('renders with default props', () => {
        const wrapper = factory()

        expect(wrapper.text()).toContain('Item title')
        expect(wrapper.text()).toContain('Collapsible Content')
    })

    it('renders with custom title and content', () => {
        const wrapper = factory({
            title: 'Custom Title'
        })

        expect(wrapper.text()).toContain('Custom Title')
        expect(wrapper.text()).toContain('Collapsible Content')
    })

    it('toggles isOpen on click and updates state accordingly', async () => {
        const wrapper = factory()

        expect((wrapper.vm as any).isOpen).toBe(false)

        await wrapper.find('.collapsible-header').trigger('click')
        expect((wrapper.vm as any).isOpen).toBe(true)

        await wrapper.find('.collapsible-header').trigger('click')
        expect((wrapper.vm as any).isOpen).toBe(false)
    })

    it('displays correct icon based on isOpen state', async () => {
        const wrapper = factory()
        const iconButton = wrapper.findComponent(ActionIconButton)

        expect(iconButton.props('icon')).toBe('mdi:unfold-more-horizontal')

        await wrapper.find('.collapsible-header').trigger('click')
        expect(iconButton.props('icon')).toBe('mdi:unfold-less-horizontal')
    })

    it('uses a button element for the header', () => {
        const wrapper = factory()
        expect(wrapper.find('button.collapsible-header').exists()).toBe(true)
    })

    it('sets aria-expanded to match open state', async () => {
        const wrapper = factory()
        const header = wrapper.find('button.collapsible-header')

        expect(header.attributes('aria-expanded')).toBe('false')

        await header.trigger('click')
        expect(header.attributes('aria-expanded')).toBe('true')
    })

    it('links header to panel via aria-controls', () => {
        const wrapper = factory()
        const header = wrapper.find('button.collapsible-header')
        const panel = wrapper.find('[role="region"]')

        expect(header.attributes('aria-controls')).toBe(panel.attributes('id'))
    })

    it('applies titleClass to the title span', () => {
        const wrapper = factory({ titleClass: 'text-lg' })
        const title = wrapper.find('.collapsible-header span')

        expect(title.classes()).toContain('text-lg')
        expect(title.classes()).toContain('font-semibold')
    })

    it('passes buttonSize to the icon button', () => {
        const wrapper = factory({ buttonSize: ButtonSize.XL })
        const iconButton = wrapper.findComponent(ActionIconButton)

        expect(iconButton.props('size')).toBe(ButtonSize.XL)
    })

    it('defaults buttonSize to ButtonSize.MD', () => {
        const wrapper = factory()
        const iconButton = wrapper.findComponent(ActionIconButton)

        expect(iconButton.props('size')).toBe(ButtonSize.MD)
    })
})
