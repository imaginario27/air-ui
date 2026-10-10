// Checkboxes. Only enabled leaves are stored in `checkedValue`; branches derive their state.
// With `checkStrictly` every node is stored on its own and nothing cascades.
export const useTreeViewCheckboxes = (
    props: TreeViewProps,
    structure: ReturnType<typeof useTreeViewStructure>,
    checked: Ref<string[]>,
) => {
    const { childrenOf, isDisabled } = structure

    const checkedSet = computed(() => new Set(checked.value))

    // Enabled leaves under every node, computed once per tree change
    const leavesByValue = computed(() => {
        const map = new Map<string, string[]>()

        const collect = (node: TreeViewNode): string[] => {
            const children = childrenOf(node)
            const childLeaves = children.flatMap(collect)
            const leaves = node.disabled ? [] : children.length ? childLeaves : [node.value]

            map.set(node.value, leaves)

            return leaves
        }

        props.nodes.forEach(collect)

        return map
    })

    const leafValues = (node: TreeViewNode) => leavesByValue.value.get(node.value) ?? []

    const isCheckDisabled = (node: TreeViewNode) => {
        return isDisabled(node) || (!props.checkStrictly && leafValues(node).length === 0)
    }

    const getCheckState = (node: TreeViewNode) => {
        if (props.checkStrictly) {
            return checkedSet.value.has(node.value) ? TriStateValue.CHECKED : TriStateValue.UNCHECKED
        }

        const leaves = leafValues(node)
        const checkedCount = leaves.filter(value => checkedSet.value.has(value)).length

        if (!leaves.length || checkedCount === 0) {
            return TriStateValue.UNCHECKED
        }

        return checkedCount === leaves.length ? TriStateValue.CHECKED : TriStateValue.INDETERMINATE
    }

    const toggleChecked = (node: TreeViewNode) => {
        if (isDisabled(node)) {
            return
        }

        const targets = props.checkStrictly ? [node.value] : leafValues(node)

        if (getCheckState(node) === TriStateValue.CHECKED) {
            checked.value = checked.value.filter(value => !targets.includes(value))
            return
        }

        checked.value = [...checked.value, ...targets.filter(value => !checkedSet.value.has(value))]
    }

    return { isCheckDisabled, getCheckState, toggleChecked }
}
