import Fuse from 'fuse.js'

type SearchIndexItem = {
    pageTitle: string
    content: string
    path: string
    breadcrumbs: string
    category: string
}

export const useFuseContentSearch = () => {
    const index = ref<SearchIndexItem[]>([])
    const fuse = ref<Fuse<SearchIndexItem> | null>(null)
    const isInitialized = ref(false)

    const init = async () => {
        if (isInitialized.value) return

        const router = useRouter()
        const routes = router.getRoutes()

        const docsRoutes = routes.filter((route) =>
            route.path.startsWith('/docs'),
        )

        const items: SearchIndexItem[] = docsRoutes.map((route) => {
            const segments = route.path.split('/').filter(Boolean)

            const breadcrumbs = segments
                .map((segment) =>
                    segment
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, (c) => c.toUpperCase()),
                )
                .join(' > ')

            return {
                pageTitle: (route.meta.title as string) ?? 'Untitled',
                content: (route.meta.description as string) ?? '',
                path: route.path,
                breadcrumbs,
                category:
                    (route.meta.overtitle as string) ??
                    (route.meta.category as string) ??
                    'Docs',
            }
        })

        index.value = items

        fuse.value = new Fuse(index.value, {
            keys: [
                { name: 'pageTitle', weight: 0.5 },
                { name: 'content', weight: 0.3 },
                { name: 'breadcrumbs', weight: 0.2 },
            ],
            threshold: 0.3,
            ignoreLocation: true,
            minMatchCharLength: 2,
        })

        isInitialized.value = true
    }

    const search = (term: string): SearchItem[] => {
        const q = term.trim()
        if (!q || !fuse.value) return []

        return fuse.value
            .search(q)
            .slice(0, 10)
            .map(({ item }) => ({
                text: item.pageTitle,
                breadcrumbs: item.breadcrumbs,
                badgeText: item.category,
                to: item.path,
            }))
    }

    return {
        init,
        search,
    }
}