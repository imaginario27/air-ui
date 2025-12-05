export const useDarkMode = () => {
    const isDark = useDark()
    const toggleDark = useToggle(isDark)

    return {
        isDark,
        toggleDark
    }
}