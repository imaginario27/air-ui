import { mount } from '@vue/test-utils'
import CardFooter from '@/components/cards/CardFooter.vue'
import { useDarkMode } from '@/composables/useDarkMode'

vi.mock('@/composables/useDarkMode', () => ({
    useDarkMode: vi.fn()
}))

describe('CardFooter.vue', () => {
    const mountComponent = (options?: {
        hasBorder?: boolean
        isDark?: boolean
        slots?: Record<string, string>
    }) => {
        ;(useDarkMode as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            isDark: options?.isDark ?? false
        })

        return mount(CardFooter, {
            props: {
                hasBorder: options?.hasBorder
            },
            slots: options?.slots
        })
    }

    it('renders the component', () => {
        const wrapper = mountComponent()
        expect(wrapper.exists()).toBe(true)
    })

    it('renders default slot content', () => {
        const wrapper = mountComponent({
            slots: {
                default: '<p>Footer Content</p>'
            }
        })

        expect(wrapper.html()).toContain('Footer Content')
    })

    it('renders light border by default', () => {
        const wrapper = mountComponent({
            isDark: false
        })

        expect(wrapper.classes()).toContain('border-t')
        expect(wrapper.classes()).toContain('border-border-neutral-subtle')
        expect(wrapper.classes()).not.toContain('border-border-default/70')
    })

    it('renders dark border when dark mode is active', () => {
        const wrapper = mountComponent({
            isDark: true
        })

        expect(wrapper.classes()).toContain('border-t')
        expect(wrapper.classes()).toContain('border-border-default/70')
        expect(wrapper.classes()).not.toContain('border-border-neutral-subtle')
    })

    it('does not render border when hasBorder is false', () => {
        const wrapper = mountComponent({
            hasBorder: false,
            isDark: true
        })

        expect(wrapper.classes()).not.toContain('border-t')
        expect(wrapper.classes()).not.toContain('border-border-neutral-subtle')
        expect(wrapper.classes()).not.toContain('border-border-default/70')
    })
})
