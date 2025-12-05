export const useIsMobile = (breakpoint: number = 1024) => {
    const isMobile = ref(false) // Initial value for SSR

    // Function to update `isMobile`
    const updateIsMobile = () => {
        if (typeof window !== 'undefined') {
            isMobile.value = window.innerWidth < breakpoint
        }
    }

    // Attach resize listener on the client
    onMounted(() => {
        updateIsMobile() // Initialize the value
        window.addEventListener('resize', updateIsMobile)
    })

    // Cleanup listener when unmounted
    onUnmounted(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', updateIsMobile)
        }
    })

    return {
        isMobile,
    }
}
