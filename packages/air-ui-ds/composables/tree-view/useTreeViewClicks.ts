// Time to wait for a second click before a click on a selected node starts a rename
const RENAME_ON_CLICK_DELAY_MS = 500

export const useTreeViewClicks = (
    props: TreeViewProps,
    emit: TreeViewEmit,
    structure: ReturnType<typeof useTreeViewStructure>,
    selection: ReturnType<typeof useTreeViewSelection>,
    rename: ReturnType<typeof useTreeViewRename>,
    selected: Ref<string[]>,
) => {
    const { isBranch, isDisabled } = structure

    let renameTimer: ReturnType<typeof setTimeout> | null = null

    const clearRenameTimer = () => {
        if (renameTimer) {
            clearTimeout(renameTimer)
            renameTimer = null
        }
    }

    // Like a file explorer: clicking the only selected node again starts a rename, unless a double click follows
    const canRenameOnClick = (node: TreeViewNode, event: MouseEvent, wasOnlySelected: boolean) => {
        const hasModifier = event.shiftKey || event.ctrlKey || event.metaKey
        const togglesOnClick = props.expandOnClick && isBranch(node)

        return props.renameOnClick
            && rename.canRename.value
            && wasOnlySelected
            && !hasModifier
            && !togglesOnClick
            && !isDisabled(node)
            && event.detail < 2
    }

    const onRowClick = async (node: TreeViewNode, event: MouseEvent) => {
        const wasOnlySelected = selection.isSelected(node) && selected.value.length === 1

        clearRenameTimer()

        await selection.handleRowClick(node, event)

        if (canRenameOnClick(node, event, wasOnlySelected)) {
            renameTimer = setTimeout(() => rename.startRename(node.value), RENAME_ON_CLICK_DELAY_MS)
        }
    }

    const onRowDoubleClick = (node: TreeViewNode) => {
        clearRenameTimer()

        if (!isDisabled(node)) {
            emit('node-dblclick', { node })
        }
    }

    onBeforeUnmount(clearRenameTimer)

    return { onRowClick, onRowDoubleClick }
}
