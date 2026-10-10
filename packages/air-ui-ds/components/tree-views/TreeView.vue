<template>
    <TransitionGroup
        ref="rootRef"
        tag="div"
        :css="false"
        role="tree"
        :aria-label="ariaLabel"
        :aria-multiselectable="isMultiple || undefined"
        :aria-disabled="disabled || undefined"
        :aria-readonly="readOnly || undefined"
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
            :draggable="isDraggable(row.node)"
            :aria-level="row.level + 1"
            :aria-setsize="row.setSize"
            :aria-posinset="row.position"
            :aria-expanded="isBranch(row.node) ? isExpanded(row.node) : undefined"
            :aria-selected="isSelected(row.node)"
            :aria-disabled="isDisabled(row.node) || undefined"
            :data-value="row.node.value"
            :class="[
                'group relative flex items-center gap-2',
                'pr-2',
                sizeConfig.row,
                sizeConfig.text,
                'rounded',
                'transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-border-primary-brand-default',
                isDisabled(row.node)
                    ? 'opacity-disabled cursor-not-allowed'
                    : 'cursor-pointer',
                !isDisabled(row.node) && 'hover:bg-background-neutral-subtlest',
                draggedValue === row.node.value && 'opacity-50',
                dropTarget?.value === row.node.value
                    && dropTarget.position === TreeViewDropPosition.INSIDE
                    && 'ring-2 ring-inset ring-border-primary-brand-default',
            ]"
            :style="{ paddingLeft: `${BASE_PADDING_PX + row.level * sizeConfig.indent}px` }"
            data-testid="tree-view-item"
            @click="handleRowClick(row.node, $event)"
            @focus="focusedValue = row.node.value"
            @mouseenter="activateActions($event, row.node)"
            @focusin="activateActions($event, row.node)"
            @dragstart="handleDragStart($event, row.node)"
            @dragover="handleDragOver($event, row)"
            @dragleave="handleDragLeave($event, row.node)"
            @drop="handleDrop($event, row)"
            @dragend="resetDrag"
        >
            <template v-if="showIndentGuides">
                <span
                    v-for="guideLevel in row.level"
                    :key="guideLevel"
                    class="absolute top-0 bottom-0 w-px bg-border-neutral-subtle"
                    :style="{ left: `${BASE_PADDING_PX + (guideLevel - 1) * sizeConfig.indent + CHEVRON_SIZE_PX / 2}px` }"
                    data-testid="tree-view-indent-guide"
                />
            </template>

            <span
                v-if="dropTarget?.value === row.node.value && dropTarget.position !== TreeViewDropPosition.INSIDE"
                :class="[
                    'pointer-events-none absolute inset-x-0 z-10 h-[2px] bg-border-primary-brand-default',
                    dropTarget.position === TreeViewDropPosition.BEFORE ? 'top-0' : 'bottom-0',
                ]"
                data-testid="tree-view-drop-indicator"
            />

            <span
                class="flex h-[16px] w-[16px] shrink-0 items-center justify-center"
                :title="hasLoadError(row.node) ? loadErrorLabel : undefined"
                @click.stop="toggleExpanded(row.node)"
            >
                <Spinner v-if="isLoading(row.node)" />
                <Icon
                    v-else-if="hasLoadError(row.node)"
                    name="mdi:alert-circle-outline"
                    iconClass="text-icon-danger"
                    data-testid="tree-view-load-error"
                />
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
                    :size="sizeConfig.checkbox"
                    :disabled="isCheckDisabled(row.node)"
                    @update:model-value="toggleChecked(row.node)"
                />
            </span>

            <template v-if="showIcons">
                <slot
                    name="icon"
                    :node="row.node"
                    :level="row.level"
                    :isBranch="isBranch(row.node)"
                    :isExpanded="isExpanded(row.node)"
                    :isSelected="isSelected(row.node)"
                >
                    <Icon
                        :name="getIcon(row.node)"
                        :iconClass="[
                            'shrink-0',
                            isActive(row.node) ? activeIconColorClass : 'text-icon-default',
                        ]"
                    />
                </slot>
            </template>

            <input
                v-if="renamingValue === row.node.value"
                v-model="renameDraft"
                type="text"
                :aria-label="renameLabel"
                :class="[
                    'min-w-0 flex-1 h-[24px] rounded px-1',
                    'bg-background-surface text-text-default',
                    'border border-border-primary-brand-default',
                    'focus:outline-none',
                ]"
                data-testid="tree-view-rename-input"
                @click.stop
                @keydown.stop
                @keydown.enter.prevent="commitRename(row.node.value, true)"
                @keydown.esc.prevent="cancelRename(true)"
                @blur="commitRename(row.node.value, false)"
            >
            <span
                v-else
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

            <span
                v-if="$slots.trailing"
                class="flex shrink-0 items-center"
                data-testid="tree-view-trailing"
            >
                <slot
                    name="trailing"
                    :node="row.node"
                    :level="row.level"
                    :isBranch="isBranch(row.node)"
                    :isExpanded="isExpanded(row.node)"
                    :isSelected="isSelected(row.node)"
                />
            </span>

            <div
                v-if="moreActionsByValue[row.node.value]?.length"
                :class="[
                    'flex shrink-0 items-center',
                    'opacity-0 transition-opacity duration-150',
                    'group-hover:opacity-100 group-focus-within:opacity-100',
                    // Touch devices have no hover, so the active row always shows its actions
                    isActive(row.node) && '[@media(hover:none)]:opacity-100',
                ]"
                data-testid="tree-view-more-actions"
                @click.stop.prevent
                @keydown.stop
            >
                <!-- The menu is only mounted on the row that is hovered, focused or active -->
                <DropdownMenu
                    v-if="isActionsArmed(row.node)"
                    :items="moreActionsByValue[row.node.value]"
                    :position="moreActionsPositions[row.node.value] ?? toDropdownPosition(moreActionsPosition)"
                    :positionYOffset="moreActionsPositionYOffset"
                    :style="{ minWidth: `${moreActionsMenuWidth}px` }"
                >
                    <template #activator>
                        <button
                            type="button"
                            :aria-label="moreActionsAriaLabel"
                            :class="moreActionsButtonClass"
                        >
                            <Icon
                                name="mdi:dots-vertical"
                                iconClass="w-[16px] h-[16px]"
                            />
                        </button>
                    </template>
                </DropdownMenu>
                <button
                    v-else
                    type="button"
                    tabindex="-1"
                    aria-hidden="true"
                    :class="moreActionsButtonClass"
                >
                    <Icon
                        name="mdi:dots-vertical"
                        iconClass="w-[16px] h-[16px]"
                    />
                </button>
            </div>
        </div>

        <div
            v-if="!rows.length && $slots.empty"
            key="__empty__"
            class="px-2 py-2 text-sm"
            data-testid="tree-view-empty"
        >
            <slot name="empty" />
        </div>
    </TransitionGroup>
</template>

<script setup lang="ts">
const BASE_PADDING_PX = 8
const CHEVRON_SIZE_PX = 16
const TYPEAHEAD_RESET_MS = 500
const TRANSITION_DURATION_MS = 180

// Rough size of the more-actions dropdown panel, used to flip it near the viewport edge
const MORE_ACTIONS_ITEM_HEIGHT = 36
const MORE_ACTIONS_MENU_PADDING = 8

const moreActionsButtonClass = [
    'flex items-center justify-center rounded-button',
    'h-[24px] w-[24px]',
    'text-icon-default hover:bg-background-neutral-active',
    'transition-colors duration-150',
]

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
    size: {
        type: String as PropType<ControlFieldSize>,
        default: ControlFieldSize.MD,
        validator: (value: ControlFieldSize) => Object.values(ControlFieldSize).includes(value),
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
    checkStrictly: {
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
    defaultExpandAll: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    defaultExpandedDepth: {
        type: Number as PropType<number>,
        default: 0,
    },
    showIcons: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    leafIcon: {
        type: String as PropType<string>,
        default: 'mdi:file-outline',
    },
    collapsedIcon: {
        type: String as PropType<string>,
        default: 'mdi:folder-outline',
    },
    expandedIcon: {
        type: String as PropType<string>,
        default: 'mdi:folder-open-outline',
    },
    showIndentGuides: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    filter: {
        type: [String, Function] as PropType<string | ((node: TreeViewNode) => boolean)>,
        default: '',
    },
    loadChildren: Function as PropType<(node: TreeViewNode) => Promise<TreeViewNode[]>>,
    loadErrorLabel: {
        type: String as PropType<string>,
        default: 'Failed to load. Click to retry.',
    },
    isRenamable: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    renameLabel: {
        type: String as PropType<string>,
        default: 'Rename',
    },
    isReorderable: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
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
    readOnly: {
        type: Boolean as PropType<boolean>,
        default: false,
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
    'rename',
    'reorder',
])

// States
const rootRef = ref<{ $el: HTMLElement } | null>(null)
const baseId = useId()
const expanded = useVModel(props, 'expandedValue', emit, { passive: true })
const selected = useVModel(props, 'selectedValue', emit, { passive: true })
const checked = useVModel(props, 'checkedValue', emit, { passive: true })
const loadedChildren = reactive<Record<string, TreeViewNode[]>>({})
const loadingValues = ref<string[]>([])
const errorValues = ref<string[]>([])
const focusedValue = ref<string | null>(null)
const lastOpenedValue = ref<string | null>(null)
const anchorValue = ref<string | null>(null)
const actionsValue = ref<string | null>(null)
const moreActionsPositions = reactive<Record<string, DropdownPosition>>({})
const renamingValue = ref<string | null>(null)
const renameDraft = ref('')
const draggedValue = ref<string | null>(null)
const dropTarget = ref<{ value: string, position: TreeViewDropPosition } | null>(null)

let typeaheadBuffer = ''
let typeaheadTimer: ReturnType<typeof setTimeout> | null = null

// Lookups are Sets so rows can check their state in O(1)
const expandedSet = computed(() => new Set(expanded.value))
const selectedSet = computed(() => new Set(selected.value))
const checkedSet = computed(() => new Set(checked.value))

const isMultiple = computed(() => props.selectionMode === TreeViewSelectionMode.MULTIPLE)
const canRename = computed(() => props.isRenamable && !props.readOnly && !props.disabled)
const canReorder = computed(() => props.isReorderable && !props.readOnly && !props.disabled)

const sizeConfig = computed(() => {
    const variants = {
        [ControlFieldSize.XS]: { row: 'h-[24px]', text: 'text-xs', indent: 16, checkbox: ControlFieldSize.XS },
        [ControlFieldSize.SM]: { row: 'h-[28px]', text: 'text-sm', indent: 18, checkbox: ControlFieldSize.XS },
        [ControlFieldSize.MD]: { row: 'h-[32px]', text: 'text-sm', indent: 20, checkbox: ControlFieldSize.XS },
        [ControlFieldSize.LG]: { row: 'h-[40px]', text: 'text-base', indent: 24, checkbox: ControlFieldSize.SM },
    }

    return variants[props.size as keyof typeof variants] || variants[ControlFieldSize.MD]
})

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
const isSelected = (node: TreeViewNode) => selectedSet.value.has(node.value)
const isLoading = (node: TreeViewNode) => loadingValues.value.includes(node.value)
const hasLoadError = (node: TreeViewNode) => errorValues.value.includes(node.value)
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
    const visible = filterState.value?.visible

    const walk = (nodes: TreeViewNode[], level: number, parentValue: string | null) => {
        const list = visible ? nodes.filter(node => visible.has(node.value)) : nodes

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

// Roving tabindex: only one row is reachable with Tab
const tabbableValue = computed(() => {
    const visible = rows.value.map(row => row.node.value)

    if (focusedValue.value && rowIndexByValue.value.has(focusedValue.value)) {
        return focusedValue.value
    }

    return visible.find(value => selectedSet.value.has(value)) ?? visible[0] ?? null
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
            callback: () => startRename(row.node.value),
        }

        return [row.node.value, canRename.value ? [renameItem, ...custom] : custom]
    }))
})

// Only one row at a time mounts its dropdown: the hovered / focused one, plus the active ones for touch
const isActionsArmed = (node: TreeViewNode) => {
    return actionsValue.value === node.value
        || focusedValue.value === node.value
        || isActive(node)
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

// Expand / collapse
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

// In accordion mode, opening a folder closes its open sibling folders at the same level
const getSiblingsToClose = (node: TreeViewNode) => {
    const row = rows.value[rowIndexByValue.value.get(node.value) ?? -1]

    if (!props.isAccordion || !row) {
        return []
    }

    const parentIndex = rowIndexByValue.value.get(row.parentValue ?? '')
    const parent = parentIndex === undefined ? undefined : rows.value[parentIndex]?.node
    const siblings = parent ? childrenOf(parent) : props.nodes

    return siblings
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

// Selection. Single mode always replaces the selection. In multiple mode a plain click replaces it,
// Ctrl / Cmd toggles a node and Shift selects the range from the last clicked node.
const selectNode = (node: TreeViewNode) => {
    if (isDisabled(node)) {
        return
    }

    anchorValue.value = node.value
    selected.value = [node.value]
}

const toggleSelection = (node: TreeViewNode) => {
    if (isDisabled(node)) {
        return
    }

    if (!isMultiple.value) {
        selectNode(node)
        return
    }

    anchorValue.value = node.value
    selected.value = isSelected(node)
        ? selected.value.filter(value => value !== node.value)
        : [...selected.value, node.value]
}

const selectRange = (targetIndex: number, fallbackIndex: number) => {
    const anchorIndex = rowIndexByValue.value.get(anchorValue.value ?? '') ?? fallbackIndex

    anchorValue.value ??= rows.value[fallbackIndex]?.node.value ?? null

    selected.value = rows.value
        .slice(Math.min(anchorIndex, targetIndex), Math.max(anchorIndex, targetIndex) + 1)
        .filter(item => !isDisabled(item.node))
        .map(item => item.node.value)
}

// Checkboxes. Only enabled leaves are stored in `checkedValue`; branches derive their state.
// With `checkStrictly` every node is stored on its own and nothing cascades.
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

const handleRowClick = async (node: TreeViewNode, event?: MouseEvent) => {
    if (isMultiple.value && !isDisabled(node)) {
        if (event?.shiftKey) {
            selectRange(rowIndexByValue.value.get(node.value) ?? 0, rowIndexByValue.value.get(focusedValue.value ?? '') ?? 0)
            return
        }

        if (event?.ctrlKey || event?.metaKey) {
            toggleSelection(node)
            return
        }
    }

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

// `*`: opens every closed folder at the focused row's level
const expandSiblings = async (row: TreeRow) => {
    if (props.isAccordion) {
        return
    }

    const parentIndex = rowIndexByValue.value.get(row.parentValue ?? '')
    const parent = parentIndex === undefined ? undefined : rows.value[parentIndex]?.node
    const siblings = parent ? childrenOf(parent) : props.nodes

    const closed = siblings.filter(sibling => isBranch(sibling) && !isExpanded(sibling) && !isDisabled(sibling))

    await Promise.all(closed.map(expandNode))
}

const handleKeydown = async (event: KeyboardEvent) => {
    if (props.disabled) {
        return
    }

    const index = rowIndexByValue.value.get(focusedValue.value ?? '') ?? -1
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

            if (event.shiftKey && isMultiple.value) {
                selectRange(target, index)
            }

            await focusRow(rows.value[target]?.node.value)
            break
        }
        case '*':
            event.preventDefault()
            await expandSiblings(row)
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
            await handleRowClick(node)
            break
        case 'F2':
            event.preventDefault()
            await startRename(node.value)
            break
        case ' ':
            event.preventDefault()

            if (typeaheadBuffer && !event.ctrlKey) {
                handleTypeahead(' ', index)
            } else if (props.showCheckboxes && !event.ctrlKey) {
                toggleChecked(node)
            } else {
                toggleSelection(node)
            }
            break
        default:
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a' && isMultiple.value) {
                event.preventDefault()
                selected.value = rows.value.filter(item => !isDisabled(item.node)).map(item => item.node.value)
                break
            }

            if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
                handleTypeahead(event.key, index)
            }
    }
}

// Rename
const startRename = async (value: string) => {
    const node = findNode(value)

    if (!node || !canRename.value || isDisabled(node)) {
        return
    }

    await expandTo(value)

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
        focusRow(value)
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

// Drag and drop reorder. The tree never mutates `nodes`: it emits `reorder` and the parent applies it.
const isDraggable = (node: TreeViewNode) => {
    return canReorder.value && !isDisabled(node) && renamingValue.value !== node.value
}

const resetDrag = () => {
    draggedValue.value = null
    dropTarget.value = null
}

const handleDragStart = (event: DragEvent, node: TreeViewNode) => {
    if (!isDraggable(node)) {
        event.preventDefault()
        return
    }

    draggedValue.value = node.value

    if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('text/plain', node.value)
    }
}

// Top / bottom quarter of a folder drops before / after it, the middle drops inside it
const getDropPosition = (event: DragEvent, row: TreeRow) => {
    const dragged = draggedValue.value
    const draggedNode = dragged ? findNode(dragged) : undefined

    if (!draggedNode || row.node.value === draggedNode.value || isDisabled(row.node)) {
        return null
    }

    if (descendantValues(draggedNode).includes(row.node.value)) {
        return null
    }

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const ratio = rect.height ? (event.clientY - rect.top) / rect.height : 0.5

    if (isBranch(row.node)) {
        if (ratio < 0.25) {
            return TreeViewDropPosition.BEFORE
        }

        return ratio > 0.75 ? TreeViewDropPosition.AFTER : TreeViewDropPosition.INSIDE
    }

    return ratio < 0.5 ? TreeViewDropPosition.BEFORE : TreeViewDropPosition.AFTER
}

const handleDragOver = (event: DragEvent, row: TreeRow) => {
    const position = getDropPosition(event, row)

    if (!position) {
        dropTarget.value = null
        return
    }

    event.preventDefault()

    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
    }

    if (dropTarget.value?.value !== row.node.value || dropTarget.value.position !== position) {
        dropTarget.value = { value: row.node.value, position }
    }
}

const handleDragLeave = (event: DragEvent, node: TreeViewNode) => {
    const rowElement = event.currentTarget as HTMLElement

    if (dropTarget.value?.value === node.value && !rowElement.contains(event.relatedTarget as Node | null)) {
        dropTarget.value = null
    }
}

const handleDrop = (event: DragEvent, row: TreeRow) => {
    const position = getDropPosition(event, row)
    const value = draggedValue.value

    if (position && value) {
        event.preventDefault()

        emit('reorder', {
            value,
            targetValue: row.node.value,
            position,
            parentValue: position === TreeViewDropPosition.INSIDE ? row.node.value : row.parentValue,
        })
    }

    resetDrag()
}

// Public API
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

const scrollToNode = async (value: string) => {
    await expandTo(value)
    await nextTick()

    rootRef.value?.$el
        ?.querySelector<HTMLElement>(`[data-value="${CSS.escape(value)}"]`)
        ?.scrollIntoView?.({ block: 'nearest' })
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

defineExpose({ expandAll, collapseAll, expandTo, scrollToNode, startRename, reload })

// Initial expansion, only when the parent does not provide any open branch
const defaultDepth = props.defaultExpandAll ? Infinity : props.defaultExpandedDepth

if (defaultDepth > 0 && !expanded.value.length) {
    expanded.value = collectBranchValues(props.nodes, defaultDepth)
}

onBeforeUnmount(() => {
    if (typeaheadTimer) {
        clearTimeout(typeaheadTimer)
    }
})
</script>
