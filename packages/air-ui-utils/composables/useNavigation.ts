export const useNavigation = () => {
    const router = useRouter()

    /**
     * Navigate to the previous page if browser history exists,
     * otherwise redirect to the provided fallback path.
     *
     * @param fallback - Fallback path if no history is available.
     */
    const goBack = (fallback: string = '/') => {
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push(fallback)
        }
    }

    return {
        goBack,
    }
}