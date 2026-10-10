// Rough size of the dropdown panel, used to flip it near the viewport edge
const MORE_ACTIONS_ITEM_HEIGHT = 36
const MORE_ACTIONS_MENU_PADDING = 8

export const useTreeViewMoreActions = (
    props: TreeViewProps,
    structure: ReturnType<typeof useTreeViewStructure>,
    focus: ReturnType<typeof useTreeViewFocus>,
    appearance: ReturnType<typeof useTreeViewAppearance>,
    rename: ReturnType<typeof useTreeViewRename>,
) => {
    const { rows, isBranch, isDisabled } = structure

    const actionsValue = ref<string | null>(null)
    const moreActionsPositions = reactive<Record<string, DropdownPosition>>({})

    const toDropdownPosition = (position: Position) => {
        return position === Position.TOP ? DropdownPosition.TOP_RIGHT : DropdownPosition.BOTTOM_RIGHT
    }

    // Same items for every node, or resolved per node when a function is given
    const moreActionsByValue = computed<Record<string, DropdownMenuItem[]>>(() => {
        const resolve = props.moreActionsItems

        return Object.fromEntries(rows.value.map(row => {
            if (isDisabled(row.node)) {
                return [row.node.value, []]
            }

            const custom = (typeof resolve === 'function'
                ? resolve(row.node, { isBranch: isBranch(row.node), level: row.level })
                : resolve) ?? []

            const renameItem: DropdownMenuItem = {
                text: props.renameLabel,
                icon: 'mdi:pencil-outline',
                type: DropdownItemType.ICON,
                actionType: DropdownActionType.ACTION,
                callback: () => rename.startRename(row.node.value),
            }

            return [row.node.value, rename.canRename.value ? [renameItem, ...custom] : custom]
        }))
    })

    // Only one row at a time mounts its dropdown: the hovered / focused one, plus the active ones for touch
    const isActionsArmed = (node: TreeViewNode) => {
        return actionsValue.value === node.value
            || focus.focusedValue.value === node.value
            || appearance.isActive(node)
    }

    // The dropdown always anchors to the right; only top/bottom flips based on the available space
    const activateActions = (event: Event, node: TreeViewNode) => {
        actionsValue.value = node.value

        const rowElement = (event.currentTarget as HTMLElement | null)?.closest('[role="treeitem"]')

        if (!rowElement) {
            return
        }

        const menuHeight = (moreActionsByValue.value[node.value]?.length ?? 0) * MORE_ACTIONS_ITEM_HEIGHT + MORE_ACTIONS_MENU_PADDING
        const rect = rowElement.getBoundingClientRect()
        const fitsBelow = window.innerHeight - rect.bottom >= menuHeight
        const fitsAbove = rect.top >= menuHeight

        let position = props.moreActionsPosition

        if (position === Position.BOTTOM && !fitsBelow && fitsAbove) {
            position = Position.TOP
        } else if (position === Position.TOP && !fitsAbove && fitsBelow) {
            position = Position.BOTTOM
        }

        moreActionsPositions[node.value] = toDropdownPosition(position)
    }

    return {
        moreActionsPositions,
        moreActionsByValue,
        toDropdownPosition,
        isActionsArmed,
        activateActions,
    }
}
