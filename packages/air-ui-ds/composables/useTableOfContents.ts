export const useTableOfContents = () => {
    // Tracks the currently active heading
    const activeId = ref<string | null>(null)
    const route = useRoute()

    let observer: IntersectionObserver | null = null

    const initObserver = () => {
        if (observer) observer.disconnect()

        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        activeId.value = entry.target.id
                        break
                    }
                }
            },
            {
                rootMargin: '0px 0px -70% 0px',
                threshold: 0.1,
            }
        )

        const headings = document.querySelectorAll('h2, h3')
        headings.forEach((heading) => observer!.observe(heading))

        // First heading is active by default when the page loads
        if (headings.length > 0) {
            activeId.value = headings[0].id
        }
    }

    watch(
        () => route.path,
        () => {
            nextTick(() => {
                initObserver()
            })
        },
        { immediate: true }
    )

    onBeforeUnmount(() => {
        if (observer) observer.disconnect()
    })

    return { activeId }
}
