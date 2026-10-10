const TRANSITION_DURATION_MS = 180

// Row size, active colors, icons and the expand / collapse transition
export const useTreeViewAppearance = (
    props: TreeViewProps,
    structure: ReturnType<typeof useTreeViewStructure>,
    expansion: ReturnType<typeof useTreeViewExpansion>,
    selection: ReturnType<typeof useTreeViewSelection>,
) => {
    const { isBranch, isExpanded } = structure

    const sizeConfig = computed(() => {
        const variants = {
            [ControlFieldSize.XS]: { row: 'h-[24px]', text: 'text-xs', indent: 16, checkbox: ControlFieldSize.XS },
            [ControlFieldSize.SM]: { row: 'h-[28px]', text: 'text-sm', indent: 18, checkbox: ControlFieldSize.XS },
            [ControlFieldSize.MD]: { row: 'h-[32px]', text: 'text-sm', indent: 20, checkbox: ControlFieldSize.XS },
            [ControlFieldSize.LG]: { row: 'h-[40px]', text: 'text-base', indent: 24, checkbox: ControlFieldSize.SM },
        }

        return variants[props.size as keyof typeof variants] || variants[ControlFieldSize.MD]
    })

    // Folders are active while they are the last opened one, other nodes while they are selected
    const isActive = (node: TreeViewNode) => {
        return isBranch(node)
            ? expansion.lastOpenedValue.value === node.value && isExpanded(node)
            : selection.isSelected(node)
    }

    const activeLabelClass = computed(() => {
        const variants = {
            [ColorAccent.PRIMARY_BRAND]: 'text-text-primary-brand-on-soft-bg',
            [ColorAccent.SECONDARY_BRAND]: 'text-text-secondary-brand-on-soft-bg',
            [ColorAccent.NEUTRAL]: 'font-semibold',
        }

        return variants[props.color as keyof typeof variants] || 'text-text-primary-brand-on-soft-bg'
    })

    const activeIconColorClass = computed(() => {
        const variants = {
            [ColorAccent.PRIMARY_BRAND]: 'text-icon-primary-brand-on-soft-bg',
            [ColorAccent.SECONDARY_BRAND]: 'text-icon-secondary-brand-default',
            [ColorAccent.NEUTRAL]: 'text-icon-default',
        }

        return variants[props.color as keyof typeof variants] || 'text-icon-primary-brand-on-soft-bg'
    })

    const getIcon = (node: TreeViewNode) => {
        if (node.icon) {
            return node.icon
        }

        if (!isBranch(node)) {
            return props.leafIcon
        }

        return isExpanded(node) ? props.expandedIcon : props.collapsedIcon
    }

    // Rows grow in and shrink out. Skipped for reduced motion.
    const animateRow = (element: Element, isEntering: boolean, done: () => void) => {
        const row = element as HTMLElement
        const prefersReducedMotion = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches

        if (typeof row.animate !== 'function' || prefersReducedMotion) {
            done()
            return
        }

        const frames = [
            { height: '0px', opacity: 0 },
            { height: `${row.offsetHeight}px`, opacity: 1 },
        ]

        row.style.overflow = 'hidden'

        const animation = row.animate(isEntering ? frames : frames.reverse(), {
            duration: TRANSITION_DURATION_MS,
            easing: 'ease-out',
            fill: isEntering ? 'none' : 'forwards',
        })

        const finish = () => {
            row.style.overflow = ''
            done()
        }

        animation.onfinish = finish
        animation.oncancel = finish
    }

    return { sizeConfig, isActive, activeLabelClass, activeIconColorClass, getIcon, animateRow }
}
