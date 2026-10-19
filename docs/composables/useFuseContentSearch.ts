import Fuse from 'fuse.js'

type SearchIndexItem = {
    pageTitle: string
    content: string
    path: string
    breadcrumbs: string
    category: string
}

const MAX_RESULTS = 10
const MAX_SECTIONS_PER_PAGE = 3

export const useFuseContentSearch = () => {
    const index = ref<SearchIndexItem[]>([])
    const pagesByPath = new Map<string, SearchIndexItem>()
    const fuse = ref<Fuse<SearchIndexItem> | null>(null)
    const isInitialized = ref(false)

    const sectionSearch = useSearchCollection('content', {
        immediate: false,
        // Only plain text is indexed: code blocks and the demo/table blocks (props, config) are left out
        ignoredTags: ['pre', 'component-code', 'props-table', 'options-table', 'slots-table'],
    })

    const init = async () => {
        if (isInitialized.value) return

        const router = useRouter()
        const routes = router.getRoutes()

        const docsRoutes = routes.filter((route) => route.path.startsWith('/docs'))

        const items: SearchIndexItem[] = docsRoutes.map((route) => {
            const segments = route.path.split('/').filter(Boolean)

            const breadcrumbs = segments
                .map((segment) => segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))
                .join(' > ')

            return {
                pageTitle: (route.meta.title as string) ?? 'Untitled',
                content: (route.meta.description as string) ?? '',
                path: route.path,
                breadcrumbs,
                category: (route.meta.overtitle as string) ?? (route.meta.category as string) ?? 'Docs',
            }
        })

        index.value = items
        items.forEach((item) => pagesByPath.set(item.path, item))

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

        // Builds the full-text index of the page sections. Page search still works if it fails.
        await sectionSearch.init().catch(() => undefined)

        isInitialized.value = true
    }

    const toSearchItem = (item: SearchIndexItem, sections?: SearchSectionItem[]): SearchItem => ({
        text: item.pageTitle,
        breadcrumbs: item.breadcrumbs,
        badgeText: item.category,
        to: item.path,
        ...(sections?.length && { sections }),
    })

    const search = async (term: string): Promise<SearchItem[]> => {
        const q = term.trim()
        if (!q || !fuse.value) return []

        const pageHits = fuse.value.search(q).map(({ item }) => item.path)

        const sectionsByPage = new Map<string, SearchSectionItem[]>()
        const sectionResults = await sectionSearch
            .search(q, { limit: 40, snippet: { columns: ['content'], around: 12 } })
            .catch(() => [])

        for (const result of sectionResults) {
            const [path, anchor] = result.id.split('#')
            if (!path || !pagesByPath.has(path)) continue

            // The snippet only holds an excerpt when the word was found in the body text
            const snippet = result.snippets?.content
            const excerpt = snippet?.includes('<mark>') ? snippet.replaceAll(/<\/?mark>/g, '') : undefined

            // Sections without an anchor are the page itself, already listed as the page result
            if (!anchor && !excerpt) continue

            const sections = sectionsByPage.get(path) ?? []
            if (sections.length >= MAX_SECTIONS_PER_PAGE) continue

            sections.push({
                text: result.titles.slice(1).concat(result.title).join(' > ') || result.title,
                to: result.id,
                excerpt,
            })
            sectionsByPage.set(path, sections)
        }

        const orderedPaths = [...new Set([...pageHits, ...sectionsByPage.keys()])].slice(0, MAX_RESULTS)

        return orderedPaths.flatMap((path) => {
            const page = pagesByPath.get(path)
            return page ? [toSearchItem(page, sectionsByPage.get(path))] : []
        })
    }

    return {
        init,
        search,
    }
}
