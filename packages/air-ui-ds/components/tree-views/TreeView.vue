<template>
    <TransitionGroup
        ref="rootRef"
        tag="div"
        :css="false"
        role="tree"
        :aria-label="ariaLabel"
        :aria-multiselectable="selectionMode === TreeViewSelectionMode.MULTIPLE || undefined"
        :aria-disabled="disabled || undefined"
        class="flex w-full flex-col select-none"
        data-testid="tree-view-root"
        @keydown="handleKeydown"
        @enter="(element, done) => animateRow(element, true, done)"
        @leave="(element, done) => animateRow(element, false, done)"
    >
        <div
            v-for="row in rows"
            :key="row.node.value"
            role="treeitem"
            :tabindex="row.node.value === tabbableValue ? 0 : -1"
            :aria-level="row.level + 1"
            :aria-setsize="row.setSize"
            :aria-posinset="row.position"
            :aria-expanded="isBranch(row.node) ? isExpanded(row.node) : undefined"
            :aria-selected="isSelected(row.node)"
            :aria-disabled="isDisabled(row.node) || undefined"
            :data-value="row.node.value"
            :class="[
                'group relative flex items-center gap-2',
                'h-[32px] pr-2',
                'rounded text-sm',
                'transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-border-primary-brand-default',
                isDisabled(row.node)
                    ? 'opacity-disabled cursor-not-allowed'
                    : 'cursor-pointer',
                !isDisabled(row.node) && 'hover:bg-background-neutral-subtlest',
            ]"
            :style="{ paddingLeft: `${BASE_PADDING_PX + row.level * INDENT_PX}px` }"
            data-testid="tree-view-item"
            @click="handleRowClick(row.node)"
            @focus="focusedValue = row.node.value"
        >
            <template v-if="showIndentGuides">
                <span
                    v-for="guideLevel in row.level"
                    :key="guideLevel"
                    class="absolute top-0 bottom-0 w-px bg-border-neutral-subtle"
                    :style="{ left: `${BASE_PADDING_PX + (guideLevel - 1) * INDENT_PX + CHEVRON_SIZE_PX / 2}px` }"
                    data-testid="tree-view-indent-guide"
                />
            </template>

            <span
                class="flex h-[16px] w-[16px] shrink-0 items-center justify-center"
                @click.stop="toggleExpanded(row.node)"
            >
                <Spinner v-if="isLoading(row.node)" />
                <Icon
                    v-else-if="isBranch(row.node)"
                    name="mdi:chevron-right"
                    :iconClass="[
                        'transition-transform duration-200',
                        isExpanded(row.node) ? 'rotate-90' : '',
                    ]"
                />
            </span>

            <span
                v-if="showCheckboxes"
                class="flex shrink-0"
                @click.stop
            >
                <TriStateCheckbox
                    :id="`${baseId}-check-${row.node.value}`"
                    :modelValue="getCheckState(row.node)"
                    :ariaLabel="row.node.label"
                    :size="ControlFieldSize.XS"
                    :disabled="isDisabled(row.node) || leafValues(row.node).length === 0"
                    @update:model-value="toggleChecked(row.node)"
                />
            </span>

            <Icon
                v-if="showIcons"
                :name="getIcon(row.node)"
                :iconClass="[
                    'shrink-0',
                    isActive(row.node) ? activeIconColorClass : 'text-icon-default',
                ]"
            />

            <span
                :class="[
                    'min-w-0 flex-1 truncate',
                    isActive(row.node) && activeLabelClass,
                ]"
                data-testid="tree-view-label"
            >
                <slot
                    name="label"
                    :node="row.node"
                    :level="row.level"
                    :isBranch="isBranch(row.node)"
                    :isExpanded="isExpanded(row.node)"
                    :isSelected="isSelected(row.node)"
                >
                    {{ row.node.label }}
                </slot>
            </span>

            <div
                v-if="moreActionsByValue[row.node.value]?.length"
                :class="[
                    'flex shrink-0 items-center',
                    'opacity-0 transition-opacity duration-150',
                    'group-hover:opacity-100 group-focus-within:opacity-100',
                ]"
                data-testid="tree-view-more-actions"
                @click.stop.prevent
                @keydown.stop
                @mouseenter="updateMoreActionsPosition($event, row.node)"
                @focusin="updateMoreActionsPosition($event, row.node)"
            >
                <DropdownMenu
                    :items="moreActionsByValue[row.node.value]"
                    :position="moreActionsPositions[row.node.value] ?? toDropdownPosition(moreActionsPosition)"
                    :positionYOffset="moreActionsPositionYOffset"
                    :style="{ minWidth: `${moreActionsMenuWidth}px` }"
                >
                    <template #activator>
                        <button
                            type="button"
                            :aria-label="moreActionsAriaLabel"
                            :class="[
                                'flex items-center justify-center rounded-button',
                                'h-[24px] w-[24px]',
                                'text-icon-default hover:bg-background-neutral-active',
                                'transition-colors duration-150',
                            ]"
                        >
                            <Icon
                                name="mdi:dots-vertical"
                                iconClass="w-[16px] h-[16px]"
                            />
                        </button>
                    </template>
                </DropdownMenu>
            </div>
        </div>
    </TransitionGroup>
</template>

<script setup lang="ts">
const INDENT_PX = 20
const BASE_PADDING_PX = 8
const CHEVRON_SIZE_PX = 16
const TYPEAHEAD_RESET_MS = 500
const TRANSITION_DURATION_MS = 180

// Rough size of the more-actions dropdown panel, used to flip it near the viewport edge
const MORE_ACTIONS_ITEM_HEIGHT = 36
const MORE_ACTIONS_MENU_PADDING = 8

// Props
const props = defineProps({
    nodes: {
        type: Array as PropType<TreeViewNode[]>,
        default: () => [],
    },
    expandedValue: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    selectedValue: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    checkedValue: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    color: {
        type: String as PropType<
            ColorAccent.PRIMARY_BRAND
            | ColorAccent.SECONDARY_BRAND
            | ColorAccent.NEUTRAL
        >,
        default: ColorAccent.PRIMARY_BRAND,
        validator: (value: unknown) =>
            typeof value === 'string' &&
            [
                ColorAccent.PRIMARY_BRAND,
                ColorAccent.SECONDARY_BRAND,
                ColorAccent.NEUTRAL,
            ].includes(value as ColorAccent),
    },
    selectionMode: {
        type: String as PropType<TreeViewSelectionMode>,
        default: TreeViewSelectionMode.SINGLE,
        validator: (value: TreeViewSelectionMode) => Object.values(TreeViewSelectionMode).includes(value),
    },
    showCheckboxes: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isAccordion: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    expandOnClick: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showIcons: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showIndentGuides: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    loadChildren: Function as PropType<(node: TreeViewNode) => Promise<TreeViewNode[]>>,
    moreActionsItems: {
        type: [Array, Function] as PropType<DropdownMenuItem[] | TreeViewMoreActionsResolver>,
        default: () => [],
    },
    moreActionsAriaLabel: {
        type: String as PropType<string>,
        default: 'More options',
    },
    moreActionsMenuWidth: {
        type: Number as PropType<number>,
        default: 200,
    },
    moreActionsPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    moreActionsPositionYOffset: {
        type: [Number, String] as PropType<number | string>,
        default: 4,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    ariaLabel: {
        type: String as PropType<string>,
        default: 'Tree view',
    },
})

// Emits
const emit = defineEmits([
    'update:expandedValue',
    'update:selectedValue',
    'update:checkedValue',
    'load-error',
])

// States
const rootRef = ref<{ $el: HTMLElement } | null>(null)
const baseId = useId()
const expanded = useVModel(props, 'expandedValue', emit, { passive: true })
const selected = useVModel(props, 'selectedValue', emit, { passive: true })
const checked = useVModel(props, 'checkedValue', emit, { passive: true })
const loadedChildren = reactive<Record<string, TreeViewNode[]>>({})
const loadingValues = ref<string[]>([])
const focusedValue = ref<string | null>(null)
const lastOpenedValue = ref<string | null>(null)
const moreActionsPositions = reactive<Record<string, DropdownPosition>>({})

let typeaheadBuffer = ''
let typeaheadTimer: ReturnType<typeof setTimeout> | null = null

// Tree structure
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

const isExpanded = (node: TreeViewNode) => expanded.value.includes(node.value)
const isSelected = (node: TreeViewNode) => selected.value.includes(node.value)
const isLoading = (node: TreeViewNode) => loadingValues.value.includes(node.value)
const isDisabled = (node: TreeViewNode) => props.disabled || !!node.disabled

// Folders are active while they are the last opened one, other nodes while they are selected
const isActive = (node: TreeViewNode) => {
    return isBranch(node)
        ? lastOpenedValue.value === node.value && isExpanded(node)
        : isSelected(node)
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

// Flat list of the rows that are currently visible
const rows = computed<TreeRow[]>(() => {
    const result: TreeRow[] = []

    const walk = (nodes: TreeViewNode[], level: number, parentValue: string | null) => {
        nodes.forEach((node, index) => {
            result.push({ node, level, parentValue, setSize: nodes.length, position: index + 1 })

            if (isBranch(node) && isExpanded(node)) {
                walk(childrenOf(node), level + 1, node.value)
            }
        })
    }

    walk(props.nodes, 0, null)

    return result
})

// Roving tabindex: only one row is reachable with Tab
const tabbableValue = computed(() => {
    const visible = rows.value.map(row => row.node.value)

    if (focusedValue.value && visible.includes(focusedValue.value)) {
        return focusedValue.value
    }

    return visible.find(value => selected.value.includes(value)) ?? visible[0] ?? null
})

const getIcon = (node: TreeViewNode) => {
    if (node.icon) {
        return node.icon
    }

    if (!isBranch(node)) {
        return 'mdi:file-outline'
    }

    return isExpanded(node) ? 'mdi:folder-open-outline' : 'mdi:folder-outline'
}

// Expand / collapse transition: rows grow in and shrink out. Skipped for reduced motion.
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

// More actions
const toDropdownPosition = (position: Position) => {
    return position === Position.TOP ? DropdownPosition.TOP_RIGHT : DropdownPosition.BOTTOM_RIGHT
}

// Same items for every node, or resolved per node when a function is given
const moreActionsByValue = computed<Record<string, DropdownMenuItem[]>>(() => {
    const resolve = props.moreActionsItems

    return Object.fromEntries(rows.value.map(row => {
        const items = isDisabled(row.node)
            ? []
            : typeof resolve === 'function'
                ? resolve(row.node, { isBranch: isBranch(row.node), level: row.level })
                : resolve

        return [row.node.value, items ?? []]
    }))
})

// The dropdown always anchors to the right; only top/bottom flips based on the available space
const updateMoreActionsPosition = (event: Event, node: TreeViewNode) => {
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

// Expand / collapse
const descendantValues = (node: TreeViewNode): string[] => {
    return childrenOf(node).flatMap(child => [child.value, ...descendantValues(child)])
}

// In accordion mode, opening a folder closes its open sibling folders at the same level
const getSiblingsToClose = (node: TreeViewNode) => {
    const row = rows.value.find(item => item.node.value === node.value)

    if (!props.isAccordion || !row) {
        return []
    }

    const parent = rows.value.find(item => item.node.value === row.parentValue)?.node
    const siblings = parent ? childrenOf(parent) : props.nodes

    return siblings
        .filter(sibling => sibling.value !== node.value)
        .flatMap(sibling => [sibling.value, ...descendantValues(sibling)])
}

const expandNode = async (node: TreeViewNode) => {
    if (needsLoad(node)) {
        if (isLoading(node)) {
            return
        }

        loadingValues.value = [...loadingValues.value, node.value]

        try {
            loadedChildren[node.value] = await props.loadChildren!(node)
        } catch (error) {
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

// Selection
const selectNode = (node: TreeViewNode) => {
    if (isDisabled(node)) {
        return
    }

    if (props.selectionMode === TreeViewSelectionMode.MULTIPLE) {
        selected.value = isSelected(node)
            ? selected.value.filter(value => value !== node.value)
            : [...selected.value, node.value]
        return
    }

    selected.value = [node.value]
}

// Checkboxes. Only enabled leaves are stored in `checkedValue`; branches derive their state.
const leafValues = (node: TreeViewNode): string[] => {
    if (node.disabled) {
        return []
    }

    const children = childrenOf(node)

    return children.length ? children.flatMap(leafValues) : [node.value]
}

const getCheckState = (node: TreeViewNode) => {
    const leaves = leafValues(node)
    const checkedCount = leaves.filter(value => checked.value.includes(value)).length

    if (!leaves.length || checkedCount === 0) {
        return TriStateValue.UNCHECKED
    }

    return checkedCount === leaves.length ? TriStateValue.CHECKED : TriStateValue.INDETERMINATE
}

const toggleChecked = (node: TreeViewNode) => {
    if (isDisabled(node)) {
        return
    }

    const leaves = leafValues(node)

    if (getCheckState(node) === TriStateValue.CHECKED) {
        checked.value = checked.value.filter(value => !leaves.includes(value))
        return
    }

    checked.value = [...checked.value, ...leaves.filter(value => !checked.value.includes(value))]
}

// Focus and keyboard
const focusRow = async (value: string | null | undefined) => {
    if (!value) {
        return
    }

    focusedValue.value = value
    await nextTick()

    rootRef.value?.$el
        ?.querySelector<HTMLElement>(`[data-value="${CSS.escape(value)}"]`)
        ?.focus()
}

const handleRowClick = async (node: TreeViewNode) => {
    selectNode(node)

    if (props.expandOnClick) {
        await toggleExpanded(node)
    }
}

const handleTypeahead = (key: string, currentIndex: number) => {
    typeaheadBuffer += key.toLowerCase()

    if (typeaheadTimer) {
        clearTimeout(typeaheadTimer)
    }

    typeaheadTimer = setTimeout(() => {
        typeaheadBuffer = ''
    }, TYPEAHEAD_RESET_MS)

    const ordered = [...rows.value.slice(currentIndex + 1), ...rows.value.slice(0, currentIndex + 1)]
    const match = ordered.find(row => row.node.label.toLowerCase().startsWith(typeaheadBuffer))

    focusRow(match?.node.value)
}

const handleKeydown = async (event: KeyboardEvent) => {
    if (props.disabled) {
        return
    }

    const index = rows.value.findIndex(row => row.node.value === focusedValue.value)
    const row = rows.value[index]

    if (!row) {
        return
    }

    const { node } = row

    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault()
            await focusRow(rows.value[Math.min(index + 1, rows.value.length - 1)]?.node.value)
            break
        case 'ArrowUp':
            event.preventDefault()
            await focusRow(rows.value[Math.max(index - 1, 0)]?.node.value)
            break
        case 'Home':
            event.preventDefault()
            await focusRow(rows.value[0]?.node.value)
            break
        case 'End':
            event.preventDefault()
            await focusRow(rows.value[rows.value.length - 1]?.node.value)
            break
        case 'ArrowRight':
            event.preventDefault()

            if (!isBranch(node) || isDisabled(node)) {
                break
            }

            if (isExpanded(node)) {
                await focusRow(rows.value[index + 1]?.node.value)
            } else {
                await expandNode(node)
            }
            break
        case 'ArrowLeft':
            event.preventDefault()

            if (isBranch(node) && isExpanded(node) && !isDisabled(node)) {
                collapseNode(node)
            } else {
                await focusRow(row.parentValue)
            }
            break
        case 'Enter':
            event.preventDefault()
            selectNode(node)
            break
        case ' ':
            event.preventDefault()

            if (props.showCheckboxes) {
                toggleChecked(node)
            } else {
                selectNode(node)
            }
            break
        default:
            if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
                handleTypeahead(event.key, index)
            }
    }
}

onBeforeUnmount(() => {
    if (typeaheadTimer) {
        clearTimeout(typeaheadTimer)
    }
})
</script>
