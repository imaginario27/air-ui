const TYPEAHEAD_RESET_MS = 500

// Roving tabindex, programmatic focus and typeahead search
export const useTreeViewFocus = (
    rootRef: Ref<{ $el: HTMLElement } | null>,
    structure: ReturnType<typeof useTreeViewStructure>,
    selected: Ref<string[]>,
) => {
    const { rows, rowIndexByValue } = structure

    const focusedValue = ref<string | null>(null)

    let typeaheadBuffer = ''
    let typeaheadTimer: ReturnType<typeof setTimeout> | null = null

    // Only one row is reachable with Tab
    const tabbableValue = computed(() => {
        if (focusedValue.value && rowIndexByValue.value.has(focusedValue.value)) {
            return focusedValue.value
        }

        const visible = rows.value.map(row => row.node.value)

        return visible.find(value => selected.value.includes(value)) ?? visible[0] ?? null
    })

    const focusRow = async (value: string | null | undefined) => {
        if (!value) {
            return
        }

        focusedValue.value = value
        await nextTick()

        rootRef.value?.$el
            ?.querySelector<HTMLElement>(`[data-value="${CSS.escape(value)}"]`)
            ?.focus()
    }

    const isTyping = () => !!typeaheadBuffer

    const handleTypeahead = (key: string, currentIndex: number) => {
        typeaheadBuffer += key.toLowerCase()

        if (typeaheadTimer) {
            clearTimeout(typeaheadTimer)
        }

        typeaheadTimer = setTimeout(() => {
            typeaheadBuffer = ''
        }, TYPEAHEAD_RESET_MS)

        const ordered = [...rows.value.slice(currentIndex + 1), ...rows.value.slice(0, currentIndex + 1)]
        const match = ordered.find(row => row.node.label.toLowerCase().startsWith(typeaheadBuffer))

        focusRow(match?.node.value)
    }

    onBeforeUnmount(() => {
        if (typeaheadTimer) {
            clearTimeout(typeaheadTimer)
        }
    })

    return { focusedValue, tabbableValue, focusRow, isTyping, handleTypeahead }
}
