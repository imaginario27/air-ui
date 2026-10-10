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
        :class="[
            'flex w-full flex-col select-none',
            isRootDropContainer && 'rounded ring-2 ring-inset ring-border-primary-brand-default',
        ]"
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
                isDropContainer(row.node)
                    && 'bg-background-primary-brand-soft ring-2 ring-inset ring-border-primary-brand-default',
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

            <!-- Drop placeholder: a line with a dot, aligned to the indent level of the drop -->
            <span
                v-if="dropLine?.value === row.node.value"
                :class="[
                    'pointer-events-none absolute right-0 z-10 flex items-center',
                    dropLine.position === TreeViewDropPosition.BEFORE
                        ? 'top-0 -translate-y-1/2'
                        : 'bottom-0 translate-y-1/2',
                ]"
                :style="{ left: `${BASE_PADDING_PX + row.level * sizeConfig.indent}px` }"
                data-testid="tree-view-drop-indicator"
            >
                <span class="h-[8px] w-[8px] shrink-0 rounded-full border-2 border-border-primary-brand-default bg-background-surface" />
                <span class="h-[2px] flex-1 bg-border-primary-brand-default" />
            </span>

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
    sortOrder: {
        type: String as PropType<SortOrder>,
        default: SortOrder.NONE,
        validator: (value: SortOrder) => Object.values(SortOrder).includes(value),
    },
    foldersFirst: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    sortCompare: Function as PropType<(a: TreeViewNode, b: TreeViewNode) => number>,
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
    'update:nodes',
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

// Logic, grouped under composables/tree-view
const structure = useTreeViewStructure(props, expanded)
const expansion = useTreeViewExpansion(props, emit, structure, expanded)
const focus = useTreeViewFocus(rootRef, structure, selected)
const selection = useTreeViewSelection(props, structure, expansion, focus, selected)
const checkboxes = useTreeViewCheckboxes(props, structure, checked)
const rename = useTreeViewRename(props, emit, rootRef, structure, expansion, focus)
const dragDrop = useTreeViewDragDrop(props, emit, structure, expanded, rename.renamingValue)
const appearance = useTreeViewAppearance(props, structure, expansion, selection)
const moreActions = useTreeViewMoreActions(props, structure, focus, appearance, rename)
const { handleKeydown } = useTreeViewKeyboard(props, structure, focus, expansion, selection, checkboxes, rename)

const { rows, isBranch, isDisabled, isExpanded } = structure
const { isLoading, hasLoadError, toggleExpanded } = expansion
const { focusedValue, tabbableValue } = focus
const { isMultiple, isSelected, handleRowClick } = selection
const { isCheckDisabled, getCheckState, toggleChecked } = checkboxes
const { renamingValue, renameDraft, startRename, commitRename, cancelRename } = rename
const {
    draggedValue,
    dropLine,
    isDropContainer,
    isRootDropContainer,
    isDraggable,
    resetDrag,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
} = dragDrop
const { sizeConfig, isActive, activeLabelClass, activeIconColorClass, getIcon, animateRow } = appearance
const {
    moreActionsPositions,
    moreActionsByValue,
    toDropdownPosition,
    isActionsArmed,
    activateActions,
} = moreActions

const scrollToNode = async (value: string) => {
    await expansion.expandTo(value)
    await nextTick()

    rootRef.value?.$el
        ?.querySelector<HTMLElement>(`[data-value="${CSS.escape(value)}"]`)
        ?.scrollIntoView?.({ block: 'nearest' })
}

defineExpose({
    expandAll: expansion.expandAll,
    collapseAll: expansion.collapseAll,
    expandTo: expansion.expandTo,
    scrollToNode,
    startRename,
    reload: expansion.reload,
})
</script>
