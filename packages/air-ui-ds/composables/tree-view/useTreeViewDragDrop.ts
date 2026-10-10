// Drag and drop reorder. The tree never mutates `nodes`: it emits `reorder` and the moved tree as
// `update:nodes`, and the parent decides whether to apply them.
const countNodes = (nodes: TreeViewNode[]): number => {
    return nodes.reduce((total, node) => total + 1 + countNodes(node.children ?? []), 0)
}

const withoutNode = (nodes: TreeViewNode[], value: string): TreeViewNode[] => {
    return nodes
        .filter(node => node.value !== value)
        .map(node => node.children ? { ...node, children: withoutNode(node.children, value) } : node)
}

const insertNode = (
    nodes: TreeViewNode[],
    moved: TreeViewNode,
    targetValue: string,
    position: TreeViewDropPosition,
): TreeViewNode[] => {
    return nodes.flatMap(node => {
        if (node.value !== targetValue) {
            return [node.children ? { ...node, children: insertNode(node.children, moved, targetValue, position) } : node]
        }

        if (position === TreeViewDropPosition.INSIDE) {
            return [{ ...node, children: [...(node.children ?? []), moved] }]
        }

        return position === TreeViewDropPosition.BEFORE ? [moved, node] : [node, moved]
    })
}

export const useTreeViewDragDrop = (
    props: TreeViewProps,
    emit: TreeViewEmit,
    structure: ReturnType<typeof useTreeViewStructure>,
    expanded: Ref<string[]>,
    renamingValue: Ref<string | null>,
) => {
    const { findNode, descendantValues, isDisabled, isBranch, isFolder, expandedSet, rowOf } = structure

    const draggedValue = ref<string | null>(null)
    const dropTarget = ref<TreeViewDropTarget | null>(null)

    // Line placeholder, only for manual order
    const dropLine = computed(() => {
        const target = dropTarget.value

        return target && !structure.isSortActive.value && target.position !== TreeViewDropPosition.INSIDE
            ? target
            : null
    })

    // The list that will receive the node: a folder row, or the root level when `value` is null
    const dropContainer = computed<{ value: string | null } | null>(() => {
        const target = dropTarget.value

        if (!target) {
            return null
        }

        if (target.position === TreeViewDropPosition.INSIDE) {
            return { value: target.value }
        }

        return structure.isSortActive.value ? { value: rowOf(target.value)?.parentValue ?? null } : null
    })

    const isDropContainer = (node: TreeViewNode) => dropContainer.value?.value === node.value
    const isRootDropContainer = computed(() => !!dropContainer.value && dropContainer.value.value === null)

    const canReorder = computed(() => props.isReorderable && !props.readOnly && !props.disabled)

    const isDraggable = (node: TreeViewNode) => {
        return canReorder.value && !isDisabled(node) && renamingValue.value !== node.value
    }

    const resetDrag = () => {
        draggedValue.value = null
        dropTarget.value = null
    }

    // Returns the moved tree, or null when the move involves lazy-loaded nodes that `nodes` does not hold
    const moveNode = (value: string, targetValue: string, position: TreeViewDropPosition) => {
        const moved = findNode(value)

        if (!moved) {
            return null
        }

        const result = insertNode(withoutNode(props.nodes, value), moved, targetValue, position)

        return countNodes(result) === countNodes(props.nodes) ? result : null
    }

    const handleDragStart = (event: DragEvent, node: TreeViewNode) => {
        if (!isDraggable(node)) {
            event.preventDefault()
            return
        }

        draggedValue.value = node.value

        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('text/plain', node.value)
        }
    }

    // Top / bottom quarter of a folder drops before / after it, the middle drops inside it.
    // With an automatic sort the order is not up to the user, so a drop only picks the list the node
    // joins: the folder itself, or the list a hovered file belongs to (a folder or the root level).
    const getDropPosition = (event: DragEvent, row: TreeRow) => {
        const dragged = draggedValue.value
        const draggedNode = dragged ? findNode(dragged) : undefined

        if (!draggedNode || row.node.value === draggedNode.value || isDisabled(row.node)) {
            return null
        }

        if (descendantValues(draggedNode).includes(row.node.value)) {
            return null
        }

        if (structure.isSortActive.value) {
            const draggedParent = rowOf(draggedNode.value)?.parentValue ?? null

            if (isFolder(row.node)) {
                return draggedParent === row.node.value ? null : TreeViewDropPosition.INSIDE
            }

            return draggedParent === row.parentValue ? null : TreeViewDropPosition.AFTER
        }

        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
        const ratio = rect.height ? (event.clientY - rect.top) / rect.height : 0.5

        // Folders, including empty ones, also accept drops inside them
        if (isBranch(row.node) || isFolder(row.node)) {
            if (ratio < 0.25) {
                return TreeViewDropPosition.BEFORE
            }

            return ratio > 0.75 ? TreeViewDropPosition.AFTER : TreeViewDropPosition.INSIDE
        }

        return ratio < 0.5 ? TreeViewDropPosition.BEFORE : TreeViewDropPosition.AFTER
    }

    const handleDragOver = (event: DragEvent, row: TreeRow) => {
        const position = getDropPosition(event, row)

        if (!position) {
            dropTarget.value = null
            return
        }

        event.preventDefault()

        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move'
        }

        if (dropTarget.value?.value !== row.node.value || dropTarget.value.position !== position) {
            dropTarget.value = { value: row.node.value, position }
        }
    }

    const handleDragLeave = (event: DragEvent, node: TreeViewNode) => {
        // `relatedTarget` is unreliable in drag events, so compare the pointer with the row bounds instead
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
        const isOutside = event.clientX <= rect.left
            || event.clientX >= rect.right
            || event.clientY <= rect.top
            || event.clientY >= rect.bottom

        if (dropTarget.value?.value === node.value && isOutside) {
            dropTarget.value = null
        }
    }

    const handleDrop = (event: DragEvent, row: TreeRow) => {
        const position = getDropPosition(event, row)
        const value = draggedValue.value

        if (position && value) {
            event.preventDefault()

            emit('reorder', {
                value,
                targetValue: row.node.value,
                position,
                parentValue: position === TreeViewDropPosition.INSIDE ? row.node.value : row.parentValue,
            })

            const moved = moveNode(value, row.node.value, position)

            if (moved) {
                emit('update:nodes', moved)

                // Show the node that was dropped inside a closed folder
                if (position === TreeViewDropPosition.INSIDE && !expandedSet.value.has(row.node.value)) {
                    expanded.value = [...expanded.value, row.node.value]
                }
            }
        }

        resetDrag()
    }

    return {
        canReorder,
        draggedValue,
        dropLine,
        isDropContainer,
        isRootDropContainer,
        isDraggable,
        resetDrag,
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
    }
}
