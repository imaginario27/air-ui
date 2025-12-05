import { mount } from '@vue/test-utils'
import ActionPanel from '@/components/action-panels/ActionPanel.vue'
import { Orientation } from '@/models/enums/orientations'

const factory = (
    props?: Partial<{
        title: string
        description: string
        orientation: Orientation
        hasShadow: boolean
        hasBorder: boolean
    }>,
    slots?: { actions?: string }
) => {
    return mount(ActionPanel, {
        props,
        slots
    })
}

describe('ActionPanel', () => {
    it('renders with default props', () => {
        const wrapper = factory()

        expect(wrapper.text()).toContain('Title')
        expect(wrapper.text()).toContain('Description')
        expect(wrapper.classes()).toContain('!p-6')
        expect(wrapper.find('p').classes()).toContain('text-text-neutral-subtle')
    })

    it('renders custom title and description', () => {
        const wrapper = factory({
            title: 'Custom Title',
            description: 'Custom description content.'
        })

        expect(wrapper.text()).toContain('Custom Title')
        expect(wrapper.text()).toContain('Custom description content.')
    })

    it('applies horizontal orientation class when orientation is HORIZONTAL', () => {
        const wrapper = factory({
            orientation: Orientation.HORIZONTAL
        })

        expect(wrapper.findComponent(ActionPanel).classes()).toContain('md:!flex-row')
    })

    it('does not apply horizontal class when orientation is VERTICAL', () => {
        const wrapper = factory({
            orientation: Orientation.VERTICAL
        })

        expect(wrapper.findComponent(ActionPanel).classes()).not.toContain('md:!flex-row')
    })

    it('applies shadow-sm class when hasShadow is true', () => {
        const wrapper = factory({
            hasShadow: true
        })

        expect(wrapper.findComponent(ActionPanel).classes()).toContain('!shadow-sm')
    })

    it('does not apply shadow-sm class when hasShadow is false', () => {
        const wrapper = factory({
            hasShadow: false
        })

        expect(wrapper.findComponent(ActionPanel).classes()).not.toContain('!shadow-sm')
    })

    it('renders actions slot if provided', () => {
        const wrapper = factory(undefined, {
            actions: '<button>Click me</button>'
        })

        const actions = wrapper.find('button')
        expect(actions.exists()).toBe(true)
        expect(actions.text()).toBe('Click me')
    })

    it('does not render actions slot section if slot is not provided', () => {
        const wrapper = factory()
        expect(wrapper.find('[data-test="card-actions"]').exists()).toBe(false)
    })
})
