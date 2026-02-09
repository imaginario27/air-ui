import { mount, type VueWrapper } from '@vue/test-utils'
import TableHeaderCell from '@/components/tables/TableHeaderCell.vue'
import ActionIconButton from '@/components/buttons/ActionIconButton.vue'
import { ButtonStyleType } from '@/models/enums/buttons'

type Props = {
    sorteable?: boolean
    sortKey?: string
    columnKey?: string
    sortAsc?: boolean
    onToggleSort?: () => void
}

const factory = (
    props?: Props,
    slots?: Record<string, string>
): VueWrapper => {
    return mount(TableHeaderCell, {
        props,
        slots,
        global: {
            stubs: {
                ActionIconButton
            }
        }
    })
}

describe('TableHeaderCell.vue', () => {
    it('mounts properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders slot content', () => {
        const wrapper = factory(
            undefined,
            { default: 'Header Cell' }
        )
        expect(wrapper.text()).toContain('Header Cell')
    })

    it('does not render ActionIconButton when sorteable is false', () => {
        const wrapper = factory({ sorteable: false })
        expect(wrapper.findComponent(ActionIconButton).exists()).toBe(false)
    })

    it('renders ActionIconButton when sorteable is true', () => {
        const wrapper = factory({ sorteable: true })
        expect(wrapper.findComponent(ActionIconButton).exists()).toBe(true)
    })

    it('renders arrow-up icon when sortAsc is true', () => {
        const wrapper = factory({
            sorteable: true,
            sortAsc: true
        })

        const button = wrapper.findComponent(ActionIconButton)
        expect(button.props('icon')).toBe('mdi:arrow-up')
    })

    it('renders arrow-down icon when sortAsc is false', () => {
        const wrapper = factory({
            sorteable: true,
            sortAsc: false
        })

        const button = wrapper.findComponent(ActionIconButton)
        expect(button.props('icon')).toBe('mdi:arrow-down')
    })

    it('uses NEUTRAL_FILLED styleType when sortKey matches columnKey', () => {
        const wrapper = factory({
            sorteable: true,
            sortKey: 'name',
            columnKey: 'name'
        })

        const button = wrapper.findComponent(ActionIconButton)
        expect(button.props('styleType')).toBe(ButtonStyleType.NEUTRAL_FILLED)
    })

    it('uses NEUTRAL_OUTLINED styleType when sortKey does not match columnKey', () => {
        const wrapper = factory({
            sorteable: true,
            sortKey: 'name',
            columnKey: 'email'
        })

        const button = wrapper.findComponent(ActionIconButton)
        expect(button.props('styleType')).toBe(ButtonStyleType.NEUTRAL_OUTLINED)
    })

    it('calls onToggleSort when ActionIconButton is clicked', async () => {
        const onToggleSort = vi.fn()
        const wrapper = factory({
            sorteable: true,
            onToggleSort
        })

        const button = wrapper.findComponent(ActionIconButton)
        await button.trigger('click')

        expect(onToggleSort).toHaveBeenCalled()
    })
})
