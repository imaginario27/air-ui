import { mount } from '@vue/test-utils'
import TableCell from '@/components/tables/TableCell.vue'
import { navigateTo } from '#app'

vi.mock('#app', () => ({
    navigateTo: vi.fn()
}))

const factory = (props?: { fitToContent?: boolean; to?: string; noWrap?: boolean }) => {
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

    it('applies "whitespace-nowrap" class when noWrap is true', () => {
        const wrapper = factory({ noWrap: true })
        expect(wrapper.classes()).toContain('whitespace-nowrap')
    })

    it('does not apply "whitespace-nowrap" class when noWrap is false', () => {
        const wrapper = factory({ noWrap: false })
        expect(wrapper.classes()).not.toContain('whitespace-nowrap')
    })

    it('does not apply "whitespace-nowrap" class by default', () => {
        const wrapper = factory()
        expect(wrapper.classes()).not.toContain('whitespace-nowrap')
    })
})
