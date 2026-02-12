// Shared state
const isMobileSidebarOpen: Ref = ref(false)

export const useMobileSidebar = () => {

    const { isMobile } = useIsMobile()
    const route = useRoute()
    
    const toggleMobileSidebar = () => {
        isMobileSidebarOpen.value = !isMobileSidebarOpen.value
    }

    const openMobileSidebar = () => {
        isMobileSidebarOpen.value = true
    }

    const closeMobileSidebar = () => {
        isMobileSidebarOpen.value = false
    }

    watch(isMobile, newVal => {
        if (!newVal) {
            isMobileSidebarOpen.value = false
        }
    })

    // Close on route change
    watch(
        () => route.fullPath,
        () => {
            isMobileSidebarOpen.value = false
        },
    )

    return {
        isMobileSidebarOpen,
        toggleMobileSidebar,
        openMobileSidebar,
        closeMobileSidebar,
    }
}
