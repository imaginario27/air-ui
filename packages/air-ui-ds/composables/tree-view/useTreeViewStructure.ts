// Tree data: children, lookups, filter, sorting and the flat list of visible rows
export const useTreeViewStructure = (props: TreeViewProps, expanded: Ref<string[]>) => {
    const loadedChildren = reactive<Record<string, TreeViewNode[]>>({})
    const expandedSet = computed(() => new Set(expanded.value))

    const childrenOf = (node: TreeViewNode): TreeViewNode[] => {
        return node.children ?? loadedChildren[node.value] ?? []
    }

    const needsLoad = (node: TreeViewNode) => {
        return !!props.loadChildren
            && !!node.hasChildren
            && !node.children
            && !(node.value in loadedChildren)
    }

    const isBranch = (node: TreeViewNode) => {
        return childrenOf(node).length > 0 || needsLoad(node)
    }

    // Folders also include the empty ones, which can still receive nodes
    const isFolder = (node: TreeViewNode) => isBranch(node) || Array.isArray(node.children)

    const isDisabled = (node: TreeViewNode) => props.disabled || !!node.disabled

    const findPath = (
        value: string,
        nodes: TreeViewNode[] = props.nodes,
        trail: TreeViewNode[] = [],
    ): TreeViewNode[] | null => {
        for (const node of nodes) {
            if (node.value === value) {
                return [...trail, node]
            }

            const found = findPath(value, childrenOf(node), [...trail, node])

            if (found) {
                return found
            }
        }

        return null
    }

    const findNode = (value: string) => {
        const path = findPath(value)

        return path ? path[path.length - 1] : undefined
    }

    const descendantValues = (node: TreeViewNode): string[] => {
        return childrenOf(node).flatMap(child => [child.value, ...descendantValues(child)])
    }

    // Values of every branch that has loaded children, down to `maxDepth` levels
    const collectBranchValues = (nodes: TreeViewNode[], maxDepth: number, level = 0): string[] => {
        return nodes.flatMap(node => {
            const children = childrenOf(node)

            return children.length && level < maxDepth
                ? [node.value, ...collectBranchValues(children, maxDepth, level + 1)]
                : []
        })
    }

    // Filter: keeps matching nodes and their ancestors, and forces those ancestors open
    const filterState = computed(() => {
        const filter = props.filter
        const query = typeof filter === 'string' ? filter.trim().toLowerCase() : ''
        const predicate = typeof filter === 'function'
            ? filter
            : query ? (node: TreeViewNode) => node.label.toLowerCase().includes(query) : null

        if (!predicate) {
            return null
        }

        const visible = new Set<string>()
        const open = new Set<string>()

        const walk = (node: TreeViewNode): boolean => {
            const hasMatchingChild = childrenOf(node).map(walk).some(Boolean)
            const matches = hasMatchingChild || predicate(node)

            if (matches) {
                visible.add(node.value)
            }

            if (hasMatchingChild) {
                open.add(node.value)
            }

            return matches
        }

        props.nodes.forEach(walk)

        return { visible, open }
    })

    const isExpanded = (node: TreeViewNode) => {
        return expandedSet.value.has(node.value) || !!filterState.value?.open.has(node.value)
    }

    // Sorting is display only: `nodes` is never reordered
    const isSortActive = computed(() => {
        return props.sortOrder !== SortOrder.NONE || !!props.sortCompare || props.foldersFirst
    })

    const compareNodes = computed(() => {
        if (props.sortCompare) {
            return props.sortCompare
        }

        if (props.sortOrder === SortOrder.NONE) {
            return null
        }

        const direction = props.sortOrder === SortOrder.DESC ? -1 : 1

        return (a: TreeViewNode, b: TreeViewNode) => {
            return direction * a.label.localeCompare(b.label, undefined, { numeric: true, sensitivity: 'base' })
        }
    })

    const sortNodes = (nodes: TreeViewNode[]) => {
        const compare = compareNodes.value

        if (!compare && !props.foldersFirst) {
            return nodes
        }

        return [...nodes].sort((a, b) => {
            if (props.foldersFirst) {
                const difference = Number(isFolder(b)) - Number(isFolder(a))

                if (difference) {
                    return difference
                }
            }

            return compare ? compare(a, b) : 0
        })
    }

    // Flat list of the rows that are currently visible
    const rows = computed<TreeRow[]>(() => {
        const result: TreeRow[] = []
        const visible = filterState.value?.visible

        const walk = (nodes: TreeViewNode[], level: number, parentValue: string | null) => {
            const list = sortNodes(visible ? nodes.filter(node => visible.has(node.value)) : nodes)

            list.forEach((node, index) => {
                result.push({ node, level, parentValue, setSize: list.length, position: index + 1 })

                if (isBranch(node) && isExpanded(node)) {
                    walk(childrenOf(node), level + 1, node.value)
                }
            })
        }

        walk(props.nodes, 0, null)

        return result
    })

    const rowIndexByValue = computed(() => {
        return new Map(rows.value.map((row, index) => [row.node.value, index]))
    })

    const rowOf = (value: string | null | undefined) => {
        return rows.value[rowIndexByValue.value.get(value ?? '') ?? -1]
    }

    // Nodes that share the parent of a row
    const siblingsOf = (row: TreeRow) => {
        const parent = rowOf(row.parentValue)?.node

        return parent ? childrenOf(parent) : props.nodes
    }

    return {
        loadedChildren,
        expandedSet,
        childrenOf,
        needsLoad,
        isBranch,
        isFolder,
        isDisabled,
        findPath,
        findNode,
        descendantValues,
        collectBranchValues,
        filterState,
        isExpanded,
        isSortActive,
        rows,
        rowIndexByValue,
        rowOf,
        siblingsOf,
    }
}
