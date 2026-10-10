export const useTreeViewKeyboard = (
    props: TreeViewProps,
    structure: ReturnType<typeof useTreeViewStructure>,
    focus: ReturnType<typeof useTreeViewFocus>,
    expansion: ReturnType<typeof useTreeViewExpansion>,
    selection: ReturnType<typeof useTreeViewSelection>,
    checkboxes: ReturnType<typeof useTreeViewCheckboxes>,
    rename: ReturnType<typeof useTreeViewRename>,
) => {
    const { rows, rowIndexByValue, isBranch, isDisabled, isExpanded, siblingsOf } = structure

    // `*`: opens every closed folder at the focused row's level
    const expandSiblings = async (row: TreeRow) => {
        if (props.isAccordion) {
            return
        }

        const closed = siblingsOf(row)
            .filter(sibling => isBranch(sibling) && !isExpanded(sibling) && !isDisabled(sibling))

        await Promise.all(closed.map(expansion.expandNode))
    }

    const handleKeydown = async (event: KeyboardEvent) => {
        if (props.disabled) {
            return
        }

        const index = rowIndexByValue.value.get(focus.focusedValue.value ?? '') ?? -1
        const row = rows.value[index]

        if (!row) {
            return
        }

        const { node } = row

        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp': {
                event.preventDefault()

                const target = event.key === 'ArrowDown'
                    ? Math.min(index + 1, rows.value.length - 1)
                    : Math.max(index - 1, 0)

                if (event.shiftKey && selection.isMultiple.value) {
                    selection.selectRange(target, index)
                }

                await focus.focusRow(rows.value[target]?.node.value)
                break
            }
            case '*':
                event.preventDefault()
                await expandSiblings(row)
                break
            case 'Home':
                event.preventDefault()
                await focus.focusRow(rows.value[0]?.node.value)
                break
            case 'End':
                event.preventDefault()
                await focus.focusRow(rows.value[rows.value.length - 1]?.node.value)
                break
            case 'ArrowRight':
                event.preventDefault()

                if (!isBranch(node) || isDisabled(node)) {
                    break
                }

                if (isExpanded(node)) {
                    await focus.focusRow(rows.value[index + 1]?.node.value)
                } else {
                    await expansion.expandNode(node)
                }
                break
            case 'ArrowLeft':
                event.preventDefault()

                if (isBranch(node) && isExpanded(node) && !isDisabled(node)) {
                    expansion.collapseNode(node)
                } else {
                    await focus.focusRow(row.parentValue)
                }
                break
            case 'Enter':
                event.preventDefault()
                await selection.handleRowClick(node)
                break
            case 'F2':
                event.preventDefault()
                await rename.startRename(node.value)
                break
            case ' ':
                event.preventDefault()

                if (focus.isTyping() && !event.ctrlKey) {
                    focus.handleTypeahead(' ', index)
                } else if (props.showCheckboxes && !event.ctrlKey) {
                    checkboxes.toggleChecked(node)
                } else {
                    selection.toggleSelection(node)
                }
                break
            default:
                if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a' && selection.isMultiple.value) {
                    event.preventDefault()
                    selection.selectAllEnabled()
                    break
                }

                if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
                    focus.handleTypeahead(event.key, index)
                }
        }
    }

    return { handleKeydown }
}
