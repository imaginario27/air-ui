export const useTableOfContents = () => {
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

        if (headings.length > 0) {
            const firstHeading = headings[0] as HTMLElement
            activeId.value = firstHeading.id ?? null
        }
    }

    const scrollToHash = () => {
        if (route.hash) {
            const target = document.getElementById(route.hash.slice(1))
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    const setupObserver = () => {
        nextTick(() => {
            initObserver()
            scrollToHash()
        })
    }

    onMounted(() => {
        setupObserver()
    })

    watch(
        () => route.path,
        () => {
            setupObserver()
        }
    )

    onBeforeUnmount(() => {
        if (observer) observer.disconnect()
    })

    return { activeId }
}