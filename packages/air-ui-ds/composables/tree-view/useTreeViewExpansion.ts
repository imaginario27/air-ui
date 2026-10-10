// Open / close branches, lazy loading and the public expand helpers
export const useTreeViewExpansion = (
    props: TreeViewProps,
    emit: TreeViewEmit,
    structure: ReturnType<typeof useTreeViewStructure>,
    expanded: Ref<string[]>,
) => {
    const {
        loadedChildren,
        expandedSet,
        needsLoad,
        isBranch,
        isDisabled,
        isExpanded,
        findNode,
        findPath,
        collectBranchValues,
        descendantValues,
        siblingsOf,
        rowOf,
    } = structure

    const loadingValues = ref<string[]>([])
    const errorValues = ref<string[]>([])
    const lastOpenedValue = ref<string | null>(null)

    const isLoading = (node: TreeViewNode) => loadingValues.value.includes(node.value)
    const hasLoadError = (node: TreeViewNode) => errorValues.value.includes(node.value)

    // In accordion mode, opening a folder closes its open sibling folders at the same level
    const getSiblingsToClose = (node: TreeViewNode) => {
        const row = rowOf(node.value)

        if (!props.isAccordion || !row) {
            return []
        }

        return siblingsOf(row)
            .filter(sibling => sibling.value !== node.value)
            .flatMap(sibling => [sibling.value, ...descendantValues(sibling)])
    }

    const expandNode = async (node: TreeViewNode) => {
        errorValues.value = errorValues.value.filter(value => value !== node.value)

        if (needsLoad(node)) {
            if (isLoading(node)) {
                return
            }

            loadingValues.value = [...loadingValues.value, node.value]

            try {
                loadedChildren[node.value] = await props.loadChildren!(node)
            } catch (error) {
                errorValues.value = [...errorValues.value, node.value]
                emit('load-error', { value: node.value, error })
                return
            } finally {
                loadingValues.value = loadingValues.value.filter(value => value !== node.value)
            }
        }

        const closing = getSiblingsToClose(node)

        expanded.value = [...expanded.value.filter(value => !closing.includes(value)), node.value]
        lastOpenedValue.value = node.value
    }

    const collapseNode = (node: TreeViewNode) => {
        expanded.value = expanded.value.filter(value => value !== node.value)
    }

    const toggleExpanded = async (node: TreeViewNode) => {
        if (isDisabled(node) || !isBranch(node)) {
            return
        }

        if (isExpanded(node)) {
            collapseNode(node)
        } else {
            await expandNode(node)
        }
    }

    const expandAll = () => {
        expanded.value = [...new Set([...expanded.value, ...collectBranchValues(props.nodes, Infinity)])]
    }

    const collapseAll = () => {
        expanded.value = []
    }

    // Opens every ancestor of a node (loading them when needed) so its row becomes visible
    const expandTo = async (value: string) => {
        const path = findPath(value)

        for (const ancestor of path?.slice(0, -1) ?? []) {
            if (!expandedSet.value.has(ancestor.value)) {
                await expandNode(ancestor)
            }
        }
    }

    // Drops the cached children of a lazy branch and loads them again when it is open
    const reload = async (value: string) => {
        const node = findNode(value)

        if (!node) {
            return
        }

        const wasExpanded = expandedSet.value.has(value)

        Reflect.deleteProperty(loadedChildren, value)
        errorValues.value = errorValues.value.filter(item => item !== value)

        if (wasExpanded) {
            collapseNode(node)
            await expandNode(node)
        }
    }

    // Initial expansion, only when the parent does not provide any open branch
    const defaultDepth = props.defaultExpandAll ? Infinity : props.defaultExpandedDepth

    if (defaultDepth > 0 && !expanded.value.length) {
        expanded.value = collectBranchValues(props.nodes, defaultDepth)
    }

    return {
        lastOpenedValue,
        isLoading,
        hasLoadError,
        expandNode,
        collapseNode,
        toggleExpanded,
        expandAll,
        collapseAll,
        expandTo,
        reload,
    }
}
