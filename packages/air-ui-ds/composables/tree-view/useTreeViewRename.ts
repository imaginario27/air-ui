// Returns the tree with the new label, or null for nodes that `nodes` does not hold (lazy-loaded ones)
const withLabel = (nodes: TreeViewNode[], value: string, label: string): TreeViewNode[] | null => {
    let found = false

    const walk = (list: TreeViewNode[]): TreeViewNode[] => {
        return list.map(node => {
            if (node.value === value) {
                found = true

                return { ...node, label }
            }

            return node.children ? { ...node, children: walk(node.children) } : node
        })
    }

    const result = walk(nodes)

    return found ? result : null
}

// Inline rename. The tree never edits `nodes`: it emits `rename` and the renamed tree as `update:nodes`,
// and the parent decides whether to apply them.
export const useTreeViewRename = (
    props: TreeViewProps,
    emit: TreeViewEmit,
    rootRef: Ref<{ $el: HTMLElement } | null>,
    structure: ReturnType<typeof useTreeViewStructure>,
    expansion: ReturnType<typeof useTreeViewExpansion>,
    focus: ReturnType<typeof useTreeViewFocus>,
) => {
    const { findNode, isDisabled } = structure

    const renamingValue = ref<string | null>(null)
    const renameDraft = ref('')

    const canRename = computed(() => props.isRenamable && !props.readOnly && !props.disabled)

    const startRename = async (value: string) => {
        const node = findNode(value)

        if (!node || !canRename.value || isDisabled(node)) {
            return
        }

        await expansion.expandTo(value)

        renamingValue.value = value
        renameDraft.value = node.label

        await nextTick()

        // Deferred so the closing "more actions" menu does not take the focus back
        setTimeout(() => {
            const input = rootRef.value?.$el
                ?.querySelector<HTMLInputElement>(`[data-value="${CSS.escape(value)}"] input`)

            input?.focus()
            input?.select()
        }, 0)
    }

    const finishRename = (restoreFocus: boolean) => {
        const value = renamingValue.value

        renamingValue.value = null

        if (restoreFocus) {
            focus.focusRow(value)
        }
    }

    const commitRename = (value: string, restoreFocus: boolean) => {
        if (renamingValue.value !== value) {
            return
        }

        const node = findNode(value)
        const label = renameDraft.value.trim()

        if (node && label && label !== node.label) {
            emit('rename', { value, label, previousLabel: node.label })

            const renamed = withLabel(props.nodes, value, label)

            if (renamed) {
                emit('update:nodes', renamed)
            }
        }

        finishRename(restoreFocus)
    }

    const cancelRename = (restoreFocus: boolean) => {
        finishRename(restoreFocus)
    }

    return { canRename, renamingValue, renameDraft, startRename, commitRename, cancelRename }
}
