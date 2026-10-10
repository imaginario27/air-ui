// Selection. Single mode always replaces the selection. In multiple mode a plain click replaces it,
// Ctrl / Cmd toggles a node and Shift selects the range from the last clicked node.
export const useTreeViewSelection = (
    props: TreeViewProps,
    structure: ReturnType<typeof useTreeViewStructure>,
    expansion: ReturnType<typeof useTreeViewExpansion>,
    focus: ReturnType<typeof useTreeViewFocus>,
    selected: Ref<string[]>,
) => {
    const { rows, rowIndexByValue, isDisabled } = structure

    const anchorValue = ref<string | null>(null)
    const selectedSet = computed(() => new Set(selected.value))
    const isMultiple = computed(() => props.selectionMode === TreeViewSelectionMode.MULTIPLE)

    const isSelected = (node: TreeViewNode) => selectedSet.value.has(node.value)

    const selectNode = (node: TreeViewNode) => {
        if (isDisabled(node)) {
            return
        }

        anchorValue.value = node.value
        selected.value = [node.value]
    }

    const toggleSelection = (node: TreeViewNode) => {
        if (isDisabled(node)) {
            return
        }

        if (!isMultiple.value) {
            selectNode(node)
            return
        }

        anchorValue.value = node.value
        selected.value = isSelected(node)
            ? selected.value.filter(value => value !== node.value)
            : [...selected.value, node.value]
    }

    const selectRange = (targetIndex: number, fallbackIndex: number) => {
        const anchorIndex = rowIndexByValue.value.get(anchorValue.value ?? '') ?? fallbackIndex

        anchorValue.value ??= rows.value[fallbackIndex]?.node.value ?? null

        selected.value = rows.value
            .slice(Math.min(anchorIndex, targetIndex), Math.max(anchorIndex, targetIndex) + 1)
            .filter(item => !isDisabled(item.node))
            .map(item => item.node.value)
    }

    const selectAllEnabled = () => {
        selected.value = rows.value.filter(item => !isDisabled(item.node)).map(item => item.node.value)
    }

    const handleRowClick = async (node: TreeViewNode, event?: MouseEvent) => {
        if (isMultiple.value && !isDisabled(node)) {
            if (event?.shiftKey) {
                selectRange(
                    rowIndexByValue.value.get(node.value) ?? 0,
                    rowIndexByValue.value.get(focus.focusedValue.value ?? '') ?? 0,
                )
                return
            }

            if (event?.ctrlKey || event?.metaKey) {
                toggleSelection(node)
                return
            }
        }

        selectNode(node)

        // The second click of a double click must not toggle the branch back
        const isRepeatedClick = (event?.detail ?? 0) > 1

        if (props.expandOnClick && !isRepeatedClick) {
            await expansion.toggleExpanded(node)
        }
    }

    return {
        isMultiple,
        isSelected,
        selectNode,
        toggleSelection,
        selectRange,
        selectAllEnabled,
        handleRowClick,
    }
}
