import { mount, type VueWrapper } from '@vue/test-utils'
import TableHeaderCell from '@/components/tables/TableHeaderCell.vue'
import ActionIconButton from '@/components/buttons/ActionIconButton.vue'
import { ButtonStyleType } from '@/models/enums/buttons'
import { TableHeaderCellScope } from '@/models/enums/tables'
import { navigateTo } from '#app'

vi.mock('#app', () => ({
    navigateTo: vi.fn()
}))

type Props = {
    scope?: TableHeaderCellScope
    sorteable?: boolean
    sortKey?: string
    columnKey?: string
    sortAsc?: boolean
    onToggleSort?: () => void
    fitToContent?: boolean
    to?: string
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
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('mounts successfully', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders slot content', () => {
        const wrapper = factory(undefined, { default: 'Header Cell' })
        expect(wrapper.text()).toContain('Header Cell')
    })

    it('uses COL as default scope', () => {
        const wrapper = factory()
        expect(wrapper.attributes('scope')).toBe(TableHeaderCellScope.COL)
    })

    it('applies COL classes when scope is COL', () => {
        const wrapper = factory({ scope: TableHeaderCellScope.COL })
        const th = wrapper.find('th')

        expect(th.classes()).toContain('border-b')
        expect(th.classes()).toContain('font-semibold')
        expect(th.classes()).toContain('whitespace-nowrap')
    })

    it('applies ROW classes when scope is ROW', () => {
        const wrapper = factory({ scope: TableHeaderCellScope.ROW })
        const th = wrapper.find('th')

        expect(th.classes()).toContain('border-t')
        expect(th.classes()).toContain('text-sm')
    })

    it('applies w-[1%] when scope is ROW and fitToContent is true', () => {
        const wrapper = factory({
            scope: TableHeaderCellScope.ROW,
            fitToContent: true
        })

        expect(wrapper.find('th').classes()).toContain('w-[1%]')
    })

    it('applies w-auto when scope is ROW and fitToContent is false', () => {
        const wrapper = factory({
            scope: TableHeaderCellScope.ROW,
            fitToContent: false
        })

        expect(wrapper.find('th').classes()).toContain('w-auto')
    })

    it('adds hover cursor when scope is ROW and to is provided', () => {
        const wrapper = factory({
            scope: TableHeaderCellScope.ROW,
            to: '/route'
        })

        expect(wrapper.find('th').classes()).toContain('hover:cursor-pointer')
    })

    it('does not render ActionIconButton when sorteable is false', () => {
        const wrapper = factory({ sorteable: false })
        expect(wrapper.findComponent(ActionIconButton).exists()).toBe(false)
    })

    it('does not render ActionIconButton when scope is ROW', () => {
        const wrapper = factory({
            sorteable: true,
            scope: TableHeaderCellScope.ROW
        })

        expect(wrapper.findComponent(ActionIconButton).exists()).toBe(false)
    })

    it('renders ActionIconButton when sorteable is true and scope is COL', () => {
        const wrapper = factory({
            sorteable: true,
            scope: TableHeaderCellScope.COL
        })

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

        expect(onToggleSort).toHaveBeenCalledTimes(1)
    })

    it('does not throw when onToggleSort is undefined', async () => {
        const wrapper = factory({
            sorteable: true
        })

        const button = wrapper.findComponent(ActionIconButton)
        await expect(button.trigger('click')).resolves.not.toThrow()
    })

    it('does not call navigateTo when scope is COL', async () => {
        const wrapper = factory({
            scope: TableHeaderCellScope.COL,
            to: '/details'
        })

        await wrapper.find('th').trigger('click')

        expect(navigateTo).not.toHaveBeenCalled()
    })

    it('does not call navigateTo when to is undefined', async () => {
        const wrapper = factory({
            scope: TableHeaderCellScope.ROW
        })

        await wrapper.find('th').trigger('click')

        expect(navigateTo).not.toHaveBeenCalled()
    })
})