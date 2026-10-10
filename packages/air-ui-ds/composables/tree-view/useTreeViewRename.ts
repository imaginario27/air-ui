// Inline rename. The tree never edits `nodes`: it emits `rename` and the parent applies it.
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
        }

        finishRename(restoreFocus)
    }

    const cancelRename = (restoreFocus: boolean) => {
        finishRename(restoreFocus)
    }

    return { canRename, renamingValue, renameDraft, startRename, commitRename, cancelRename }
}
