// composables/useDarkMode.ts
export const useDarkMode = () => {
    const preferredDark = usePreferredDark()

    // use VueUse localStorage composable
    const themeMode = useLocalStorage<'light' | 'dark' | 'system'>(
        'color-mode',
        'system',
    )

    const isDark = useDark({
        storageKey: 'color-scheme',
        valueDark: 'dark',
        valueLight: 'light',
    })

    watchEffect(() => {
        if (themeMode.value === 'system') {
            isDark.value = preferredDark.value
        } else {
            isDark.value = themeMode.value === 'dark'
        }
    })

    const setTheme = (theme: 'light' | 'dark' | 'system') => {
        themeMode.value = theme
    }

    return {
        isDark,
        themeMode,
        preferredDark,
        setTheme,
    }
}
