import { mount } from '@vue/test-utils'
import TableCell from '@/components/tables/TableCell.vue'
import { navigateTo } from '#app'

vi.mock('#app', () => ({
    navigateTo: vi.fn()
}))

const factory = (props?: { fitToContent?: boolean; to?: string }) => {
    return mount(TableCell, {
        props,
        slots: {
            default: 'Cell Content'
        }
    })
}

describe('TableCell', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('mounts properly', () => {
        const wrapper = factory()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders default slot content', () => {
        const wrapper = factory()
        expect(wrapper.text()).toContain('Cell Content')
    })

    it('applies "w-[1%]" class when fitToContent is true', () => {
        const wrapper = factory({ fitToContent: true })
        expect(wrapper.classes()).toContain('w-[1%]')
    })

    it('applies "w-auto" class when fitToContent is false', () => {
        const wrapper = factory({ fitToContent: false })
        expect(wrapper.classes()).toContain('w-auto')
    })

    it('adds hover cursor when "to" prop is provided', () => {
        const wrapper = factory({ to: '/route' })
        expect(wrapper.classes()).toContain('hover:cursor-pointer')
    })

    it('does not call navigateTo when "to" is undefined', async () => {
        const wrapper = factory()
        await wrapper.trigger('click')
        expect(navigateTo).not.toHaveBeenCalled()
    })
})
