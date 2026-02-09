// composables/useTable.ts

export function useTable<T extends Record<string, string>>(data: Ref<T[]>) {
    const sortKey = ref<keyof T | ''>('')
    const sortAsc = ref(true)

    const toggleSort = (key: keyof T) => {
        if (sortKey.value === key) {
            sortAsc.value = !sortAsc.value
        } else {
            sortKey.value = key
            sortAsc.value = true
        }
    }

    const sortedData = computed(() => {
        if (!sortKey.value) return data.value

        return [...data.value].sort((a, b) => {
            const key = sortKey.value
            const valA = (a[key] ?? '').toLowerCase()
            const valB = (b[key] ?? '').toLowerCase()

            if (valA < valB) return sortAsc.value ? -1 : 1
            if (valA > valB) return sortAsc.value ? 1 : -1
            return 0
        })
    })

    return {
        sortKey,
        sortAsc,
        toggleSort,
        sortedData,
    }
}
