import { ref, nextTick } from 'vue'
import { useDarkMode } from '@/composables/useDarkMode'
import { useDark, usePreferredDark, useLocalStorage } from '@vueuse/core'

vi.mock('@vueuse/core', () => ({
    useDark: vi.fn(),
    usePreferredDark: vi.fn(),
    useLocalStorage: vi.fn(),
}))

describe('useDarkMode', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    const setupMocks = ({
        preferred = false,
        storedTheme = 'system' as 'light' | 'dark' | 'system',
        initialIsDark = false,
    } = {}) => {
        const preferredDark = ref(preferred)
        const themeMode = ref<'light' | 'dark' | 'system'>(storedTheme)
        const isDark = ref(initialIsDark)

        ;(usePreferredDark as unknown as vi.Mock).mockReturnValue(preferredDark)
        ;(useLocalStorage as unknown as vi.Mock).mockReturnValue(themeMode)
        ;(useDark as unknown as vi.Mock).mockReturnValue(isDark)

        return { preferredDark, themeMode, isDark }
    }

    it('initializes with system theme using preferredDark value', async () => {
        const { isDark, preferredDark } = setupMocks({
            preferred: true,
            storedTheme: 'system',
            initialIsDark: false,
        })

        const composable = useDarkMode()

        await nextTick()

        expect(composable.isDark.value).toBe(true)
        expect(preferredDark.value).toBe(true)
    })

    it('sets dark mode when themeMode is dark', async () => {
        const { isDark } = setupMocks({
            storedTheme: 'dark',
        })

        useDarkMode()

        await nextTick()

        expect(isDark.value).toBe(true)
    })

    it('sets light mode when themeMode is light', async () => {
        const { isDark } = setupMocks({
            storedTheme: 'light',
            initialIsDark: true,
        })

        useDarkMode()

        await nextTick()

        expect(isDark.value).toBe(false)
    })

    it('reacts to themeMode changes dynamically', async () => {
        const { themeMode, isDark } = setupMocks({
            storedTheme: 'light',
        })

        useDarkMode()

        await nextTick()
        expect(isDark.value).toBe(false)

        themeMode.value = 'dark'
        await nextTick()

        expect(isDark.value).toBe(true)
    })

    it('reacts to preferredDark when themeMode is system', async () => {
        const { preferredDark, themeMode, isDark } = setupMocks({
            storedTheme: 'system',
            preferred: false,
        })

        useDarkMode()

        await nextTick()
        expect(isDark.value).toBe(false)

        preferredDark.value = true
        await nextTick()

        expect(isDark.value).toBe(true)

        themeMode.value = 'light'
        await nextTick()

        expect(isDark.value).toBe(false)
    })

    it('updates themeMode when setTheme is called', () => {
        const { themeMode } = setupMocks({
            storedTheme: 'light',
        })

        const { setTheme } = useDarkMode()

        setTheme('dark')
        expect(themeMode.value).toBe('dark')

        setTheme('system')
        expect(themeMode.value).toBe('system')
    })
})
