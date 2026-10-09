export interface TreeViewNode {
    value: string
    label: string
    icon?: string
    disabled?: boolean
    children?: TreeViewNode[]
    // Marks a branch whose children are fetched with `loadChildren` on first expand
    hasChildren?: boolean
}

export interface TreeRow {
    node: TreeViewNode
    level: number
    parentValue: string | null
    setSize: number
    position: number
}

export interface TreeViewMoreActionsDetails {
    isBranch: boolean
    level: number
}

export type TreeViewMoreActionsResolver = (
    node: TreeViewNode,
    details: TreeViewMoreActionsDetails,
) => DropdownMenuItem[]
