const sidebarStates = reactive<Record<string, boolean>>({})

export const useSidebar = () => {
    const { isMobile } = useIsMobile()

    const toggleSidebarState = (id: string) => {
        sidebarStates[id] = !sidebarStates[id]
    }

    const expandSidebar = (id: string) => {
        sidebarStates[id] = false
    }

    const collapseSidebar = (id: string) => {
        sidebarStates[id] = true
    }

    const setSidebarCollapsed = (id: string, collapsed: boolean) => {
        sidebarStates[id] = collapsed
    }

    const isSidebarCollapsed = (id: string) => {
        return computed(() => sidebarStates[id] ?? false)
    }

    watch(isMobile, (newVal) => {
        if (!newVal) {
            for (const key in sidebarStates) {
                sidebarStates[key] = false
            }
        }
    })

    return {
        isSidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebarState,
        expandSidebar,
        collapseSidebar,
    }
}
