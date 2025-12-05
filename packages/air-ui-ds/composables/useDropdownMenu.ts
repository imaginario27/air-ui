
export const useDropdownMenu = () => {
    const isDropdownMenuOpen = ref(false)

    const toggleDropdownMenu = () => {
        isDropdownMenuOpen.value = !isDropdownMenuOpen.value
    }

    const closeDropdownMenu = () => {
        isDropdownMenuOpen.value = false
    }

    const closeDropdownOnClickOutside = (elementRef: Ref<HTMLElement | null>) => {
        useClickOutside(elementRef, () => {
            closeDropdownMenu()
        })
    }

    return {
        isDropdownMenuOpen,
        toggleDropdownMenu,
        closeDropdownOnClickOutside,
        closeDropdownMenu
    }
}