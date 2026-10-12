import { toValue, type MaybeRefOrGetter } from 'vue'

// A panel flips to the other side when it does not fit in the window and there is more room there
export const shouldFlipVertically = (
    position: Position,
    anchor: { top: number; bottom: number },
    panelHeight: number,
    gap = 0,
    viewportHeight = window.innerHeight,
) => {
    // A panel with no size has not been laid out, so there is nothing to measure
    if (panelHeight <= 0) return false

    const spaceAbove = anchor.top
    const spaceBelow = viewportHeight - anchor.bottom
    const needed = panelHeight + gap

    if (position === Position.TOP) return needed > spaceAbove && spaceBelow > spaceAbove

    return needed > spaceBelow && spaceAbove > spaceBelow
}

// For the panels of the pickers: it measures the panel against the element it opens from and returns
// the side to use. The panel must be rendered (v-if) while it is open.
export const useAutoFlip = (
    panel: Ref<HTMLElement | null>,
    position: MaybeRefOrGetter<Position>,
    isEnabled: MaybeRefOrGetter<boolean>,
    isOpen: Ref<boolean>,
) => {
    const isFlipped = ref(false)

    const resolvedPosition = computed(() => {
        const base = toValue(position)
        if (!isFlipped.value) return base

        return base === Position.TOP ? Position.BOTTOM : Position.TOP
    })

    const measure = () => {
        const anchor = panel.value?.parentElement

        if (!panel.value || !anchor) return

        isFlipped.value = shouldFlipVertically(
            toValue(position),
            anchor.getBoundingClientRect(),
            panel.value.offsetHeight,
            4,
        )
    }

    watch(isOpen, async (open) => {
        isFlipped.value = false
        if (!open || !toValue(isEnabled)) return

        await nextTick()
        measure()
    })

    return { resolvedPosition }
}
