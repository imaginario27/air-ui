import { mount } from '@vue/test-utils'
import Collapsible from '@/components/collapsibles/Collapsible.vue'
import ActionIconButton from '@/components/buttons/ActionIconButton.vue'

const factory = (props?: { title?: string }) => {
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

        expect(iconButton.props('icon')).toBe('mdiUnfoldMoreHorizontal')

        await wrapper.find('.collapsible-header').trigger('click')
        expect(iconButton.props('icon')).toBe('mdiUnfoldLessHorizontal')
    })
})
