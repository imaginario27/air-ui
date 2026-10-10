export interface TreeViewNode {
    value: string
    label: string
    icon?: string
    disabled?: boolean
    children?: TreeViewNode[]
    // Marks a branch whose children are fetched with `loadChildren` on first expand
    hasChildren?: boolean
    // Free-form data for slots and sorting, such as a file size
    meta?: Record<string, unknown>
}

export interface TreeRow {
    node: TreeViewNode
    level: number
    parentValue: string | null
    setSize: number
    position: number
}

export interface TreeViewRenameDetails {
    value: string
    label: string
    previousLabel: string
}

export interface TreeViewReorderDetails {
    // Node being moved
    value: string
    // Node it was dropped on
    targetValue: string
    position: TreeViewDropPosition
    // New parent of the moved node, `null` for the root level
    parentValue: string | null
}

export interface TreeViewDropTarget {
    value: string
    position: TreeViewDropPosition
}

export interface TreeViewMoreActionsDetails {
    isBranch: boolean
    level: number
}

export type TreeViewMoreActionsResolver = (
    node: TreeViewNode,
    details: TreeViewMoreActionsDetails,
) => DropdownMenuItem[]

export type TreeViewEvent =
    | 'update:nodes'
    | 'update:expandedValue'
    | 'update:selectedValue'
    | 'update:checkedValue'
    | 'load-error'
    | 'rename'
    | 'reorder'

export type TreeViewEmit = (event: TreeViewEvent, ...args: unknown[]) => void

// The props the tree view composables read
export interface TreeViewProps {
    readonly nodes: TreeViewNode[]
    readonly selectionMode: TreeViewSelectionMode
    readonly checkStrictly: boolean
    readonly isAccordion: boolean
    readonly expandOnClick: boolean
    readonly defaultExpandAll: boolean
    readonly defaultExpandedDepth: number
    readonly showCheckboxes: boolean
    readonly filter: string | ((node: TreeViewNode) => boolean)
    readonly sortOrder: SortOrder
    readonly foldersFirst: boolean
    readonly sortCompare?: (a: TreeViewNode, b: TreeViewNode) => number
    readonly loadChildren?: (node: TreeViewNode) => Promise<TreeViewNode[]>
    readonly isRenamable: boolean
    readonly renameLabel: string
    readonly isReorderable: boolean
    readonly readOnly: boolean
    readonly disabled: boolean
    readonly moreActionsItems: DropdownMenuItem[] | TreeViewMoreActionsResolver
    readonly moreActionsPosition: Position
    readonly size: ControlFieldSize
    readonly color: ColorAccent
    readonly leafIcon: string
    readonly collapsedIcon: string
    readonly expandedIcon: string
}
