// composables/useDarkMode.ts
export const useDarkMode = () => {
    const preferredDark = usePreferredDark()

    // use VueUse localStorage composable, reading the saved mode after mount so hydration matches the server render
    const themeMode = useLocalStorage<'light' | 'dark' | 'system'>(
        'color-mode',
        'system',
        { initOnMounted: true },
    )

    const resolvedIsDark = useDark({
        storageKey: 'color-scheme',
        valueDark: 'dark',
        valueLight: 'light',
    })

    // Reports light until mounted so the first client render matches the server render.
    // Outside a component there is no hydration to wait for.
    const isHydrated = ref(!getCurrentInstance())

    if (getCurrentInstance()) {
        onMounted(() => {
            isHydrated.value = true
        })
    }

    const isDark = computed({
        get: () => isHydrated.value && resolvedIsDark.value,
        set: (value: boolean) => {
            resolvedIsDark.value = value
        },
    })

    watchEffect(() => {
        if (!isHydrated.value) return

        if (themeMode.value === 'system') {
            resolvedIsDark.value = preferredDark.value
        } else {
            resolvedIsDark.value = themeMode.value === 'dark'
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
