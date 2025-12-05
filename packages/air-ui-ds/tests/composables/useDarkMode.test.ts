import { useDarkMode } from '@/composables/useDarkMode'
import { useDark, useToggle } from '@vueuse/core'

vi.mock('@vueuse/core', () => ({
    useDark: vi.fn(),
    useToggle: vi.fn()
}))


describe('useDarkMode', () => {
    it('returns isDark and toggleDark from vueuse', () => {
        const isDarkMock = ref(false)
        const toggleMock = vi.fn()

        ;(useDark as vi.Mock).mockReturnValue(isDarkMock)
        ;(useToggle as vi.Mock).mockReturnValue(toggleMock)

        const { isDark, toggleDark } = useDarkMode()

        expect(isDark).toBe(isDarkMock)
        expect(toggleDark).toBe(toggleMock)
    })
})
