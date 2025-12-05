/**
 * Navigates to the previous URL using the router's back method.
 * If no history exists, it redirects to a specified fallback URL.
 * 
 * @param fallback - The URL to navigate to if no history is available.
 */
export const goBack = (fallback = '/') => {
    const router = useRouter()

    if (window.history.length > 1) {
        router.back()
    } else {
        router.push(fallback) 
    }
}