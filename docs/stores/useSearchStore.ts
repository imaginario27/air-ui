export const useSearchStore = defineStore('search', () => {
    // States
    const searchValue = ref('')
    const debouncedSearchValue = useDebounce(searchValue, 300)

    const results = ref<SearchItem[]>([])

    // Local storage
    const recentSearches = useLocalStorage<SearchItem[]>(
        'docs-recent-searches',
        [],
    )

    // Methods
    const setResults = (items: SearchItem[]) => {
        results.value = items
    }

    const setSearchValue = (value: string) => {
        searchValue.value = value
    }

    const clearResults = () => {
        results.value = []
    }

    const removeRecentSearchItem = (index: number) => {
        recentSearches.value.splice(index, 1)
    }

    const addToRecentSearch = (item: SearchItem) => {
        // Remove duplicate first
        recentSearches.value = recentSearches.value.filter(
            (r) => r.to !== item.to,
        )

        // Add to top
        recentSearches.value.unshift(item)

        // Limit size (recommended)
        if (recentSearches.value.length > 10) {
            recentSearches.value = recentSearches.value.slice(0, 10)
        }

        searchValue.value = ''
    }

    return {
        searchValue,
        debouncedSearchValue,
        results,
        recentSearches,
        setResults,
        setSearchValue,
        clearResults,
        removeRecentSearchItem,
        addToRecentSearch,
    }
})