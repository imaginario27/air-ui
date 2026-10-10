## Component

::component-code
---
srcDir: 'tree-views/TreeView.vue'
model:
    nodes: update:nodes
    expandedValue: update:expandedValue
    selectedValue: update:selectedValue
    checkedValue: update:checkedValue
props:
    nodes:
        - value: src
          label: src
          children:
              - value: src/components
                label: components
                children:
                    - value: src/components/button
                      label: Button.tsx
                    - value: src/components/card
                      label: Card.tsx
                    - value: src/components/forms
                      label: forms
                      children:
                          - value: src/components/forms/input
                            label: Input.tsx
                          - value: src/components/forms/select
                            label: Select.tsx
              - value: src/hooks
                label: hooks
                children:
                    - value: src/hooks/use-auth
                      label: useAuth.ts
                    - value: src/hooks/use-theme
                      label: useTheme.ts
              - value: src/app
                label: app.tsx
              - value: src/index
                label: index.ts
        - value: public
          label: public
          children:
              - value: public/images
                label: images
                children:
                    - value: public/images/logo
                      label: logo.svg
              - value: public/favicon
                label: favicon.ico
        - value: package
          label: package.json
        - value: readme
          label: README.md
    expandedValue:
        - src
        - src/components
        - public
    selectedValue: []
    checkedValue: []
    color: "primary-brand"
    selectionMode: "single"
    showCheckboxes: false
    isAccordion: false
    expandOnClick: true
    showIcons: true
    showIndentGuides: true
    size: "md"
    checkStrictly: false
    defaultExpandAll: false
    defaultExpandedDepth: 0
    filter: ""
    sortOrder: "none"
    foldersFirst: false
    leafIcon: "mdi:file-outline"
    collapsedIcon: "mdi:folder-outline"
    expandedIcon: "mdi:folder-open-outline"
    isRenamable: false
    renameOnClick: false
    isReorderable: false
    readOnly: false
    disabled: false
    moreActionsItems:
        - text: New file
          icon: mdi:file-plus-outline
          type: icon
          actionType: action
        - text: Delete
          icon: mdi:trash-can-outline
          type: danger-icon
          actionType: action
    moreActionsPosition: "bottom"
    moreActionsPositionYOffset: 4
    moreActionsMenuWidth: 200
    moreActionsAriaLabel: "More options"
    ariaLabel: "Project files"
items:
    moreActionsPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
    color:
        - value: primary-brand
          text: PRIMARY_BRAND
        - value: secondary-brand
          text: SECONDARY_BRAND
        - value: neutral
          text: NEUTRAL
    selectionMode:
        - value: single
          text: SINGLE
        - value: multiple
          text: MULTIPLE
    sortOrder:
        - value: none
          text: NONE
        - value: asc
          text: ASC
        - value: desc
          text: DESC
    size:
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
enums:
    sortOrder: "SortOrder"
    size: "ControlFieldSize"
    moreActionsPosition: "Position"
    color: "ColorAccent"
    selectionMode: "TreeViewSelectionMode"
external:
  - nodes
  - expandedValue
  - selectedValue
  - checkedValue
  - moreActionsItems
externalTypes:
  - TreeViewNode[]
  - string[]
  - string[]
  - string[]
  - DropdownMenuItem[]
isPreviewContentBoxed: true
previewContentMaxWidth: 360
propsSettingsExcludedProps: ['nodes', 'expandedValue', 'selectedValue', 'checkedValue', 'moreActionsItems']
---
::

## Props

::props-table
---
props: [
    {
        "name": "nodes",
        "default": "[]",
        "type": "TreeViewNode[]",
    },
    {
        "name": "expandedValue",
        "default": "[]",
        "type": "string[]",
    },
    {
        "name": "selectedValue",
        "default": "[]",
        "type": "string[]",
    },
    {
        "name": "checkedValue",
        "default": "[]",
        "type": "string[]",
    },
    {
        "name": "color",
        "default": "ColorAccent.PRIMARY_BRAND",
        "type": "ColorAccent",
    },
    {
        "name": "selectionMode",
        "default": "TreeViewSelectionMode.SINGLE",
        "type": "TreeViewSelectionMode",
    },
    {
        "name": "showCheckboxes",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "isAccordion",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "expandOnClick",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "showIcons",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "showIndentGuides",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "size",
        "default": "ControlFieldSize.MD",
        "type": "ControlFieldSize",
    },
    {
        "name": "checkStrictly",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "defaultExpandAll",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "defaultExpandedDepth",
        "default": "0",
        "type": "number",
    },
    {
        "name": "filter",
        "default": "''",
        "type": "string | ((node: TreeViewNode) => boolean)",
    },
    {
        "name": "sortOrder",
        "default": "SortOrder.NONE",
        "type": "SortOrder",
    },
    {
        "name": "foldersFirst",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "sortCompare",
        "default": "undefined",
        "type": "(a: TreeViewNode, b: TreeViewNode) => number",
    },
    {
        "name": "leafIcon",
        "default": "'mdi:file-outline'",
        "type": "string",
    },
    {
        "name": "collapsedIcon",
        "default": "'mdi:folder-outline'",
        "type": "string",
    },
    {
        "name": "expandedIcon",
        "default": "'mdi:folder-open-outline'",
        "type": "string",
    },
    {
        "name": "isRenamable",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "renameOnClick",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "renameLabel",
        "default": "'Rename'",
        "type": "string",
    },
    {
        "name": "isReorderable",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "readOnly",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "loadChildren",
        "default": "undefined",
        "type": "(node: TreeViewNode) => Promise<TreeViewNode[]>",
    },
    {
        "name": "loadErrorLabel",
        "default": "'Failed to load. Click to retry.'",
        "type": "string",
    },
    {
        "name": "moreActionsItems",
        "default": "[]",
        "type": "DropdownMenuItem[] | TreeViewMoreActionsResolver",
    },
    {
        "name": "moreActionsPosition",
        "default": "Position.BOTTOM",
        "type": "Position",
    },
    {
        "name": "moreActionsPositionYOffset",
        "default": "4",
        "type": "number | string",
    },
    {
        "name": "moreActionsMenuWidth",
        "default": "200",
        "type": "number",
    },
    {
        "name": "moreActionsAriaLabel",
        "default": "'More options'",
        "type": "string",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "ariaLabel",
        "default": "'Tree view'",
        "type": "string",
    },
]
---
::

## Slots

::slots-table
---
slots: [
    {
        name: "label",
        description: "Replaces the label of every row. Receives the `node`, its `level`, and the `isBranch`, `isExpanded` and `isSelected` states as slot props. Icons, chevron and checkbox are kept.",
    },
    {
        name: "icon",
        description: "Replaces the icon of every row (only rendered when `showIcons` is enabled). Receives the same slot props as `label`.",
    },
    {
        name: "trailing",
        description: "Content shown at the end of every row, before the \"more actions\" button, such as badges or counters. Receives the same slot props as `label`.",
    },
    {
        name: "empty",
        description: "Content shown when there are no rows to display, for example when `nodes` is empty or `filter` matches nothing.",
    },
]
---
::

```vue
<template>
    <TreeView :nodes="nodes">
        <template #label="{ node, isBranch }">
            <span :class="isBranch && 'font-semibold'">{{ node.label }}</span>
        </template>
    </TreeView>
</template>
```

## Usage

### nodes

Sets the tree data. Each node has a unique `value` and a `label`, and can define `children`, a custom `icon`, `disabled`, `hasChildren` for lazy loading (see [loadChildren](#loadchildren)), or `meta` for your own data (see [Metadata](#metadata)).

```vue
<template>
    <TreeView :nodes="nodes" />
</template>

<script setup lang="ts">
const nodes: TreeViewNode[] = [
    {
        value: 'src',
        label: 'src',
        children: [
            { value: 'app', label: 'app.tsx' },
            { value: 'index', label: 'index.ts' },
        ],
    },
    { value: 'package', label: 'package.json', icon: 'mdi:npm' },
]
</script>
```

- **Type:** `TreeViewNode[]`
- **Default:** `[]`

#### TypeScript interface
```ts
interface TreeViewNode {
    value: string // Unique across the whole tree
    label: string
    icon?: string // Overrides the default folder/file icon
    disabled?: boolean
    children?: TreeViewNode[]
    hasChildren?: boolean // Branch whose children are loaded with `loadChildren`
    meta?: Record<string, unknown> // Free-form data for slots and sorting, such as a file size
}
```

### expandedValue

Sets which branches are open, by node `value`. Bind it with `v-model:expandedValue`.

```vue
<template>
    <TreeView :nodes="nodes" v-model:expandedValue="expanded" />
</template>

<script setup lang="ts">
const nodes: TreeViewNode[] = [
    {
        value: 'src',
        label: 'src',
        children: [
            { value: 'app', label: 'app.tsx' },
            { value: 'index', label: 'index.ts' },
        ],
    },
    { value: 'package', label: 'package.json' },
]

const expanded = ref<string[]>(['src'])
</script>
```

- **Type:** `string[]`
- **Default:** `[]`

### selectedValue

Sets the selected nodes, by node `value`. Bind it with `v-model:selectedValue`.

```vue
<template>
    <TreeView :nodes="nodes" v-model:selectedValue="selected" />
</template>

<script setup lang="ts">
const nodes: TreeViewNode[] = [
    {
        value: 'src',
        label: 'src',
        children: [
            { value: 'app', label: 'app.tsx' },
            { value: 'index', label: 'index.ts' },
        ],
    },
    { value: 'package', label: 'package.json' },
]

const selected = ref<string[]>(['package'])
</script>
```

- **Type:** `string[]`
- **Default:** `[]`

### checkedValue

Sets the checked nodes when `showCheckboxes` is enabled. Only enabled leaf nodes are stored: checking a branch checks all its leaves, and a branch shows a mixed state when only some of them are checked. Bind it with `v-model:checkedValue`.

```vue
<template>
    <TreeView :nodes="nodes" showCheckboxes v-model:checkedValue="checked" />
</template>

<script setup lang="ts">
const nodes: TreeViewNode[] = [
    {
        value: 'src',
        label: 'src',
        children: [
            { value: 'app', label: 'app.tsx' },
            { value: 'index', label: 'index.ts' },
        ],
    },
    { value: 'package', label: 'package.json' },
]

const checked = ref<string[]>(['app'])
</script>
```

- **Type:** `string[]`
- **Default:** `[]`

### color

Sets the color of the active node: only its icon and label change, never the chevron or the row background. A folder is active while it is the last folder opened, and any other node while it is selected. Supports `PRIMARY_BRAND`, `SECONDARY_BRAND` and `NEUTRAL` (which shows the label in semibold).

```vue
<template>
    <TreeView :nodes="nodes" :color="ColorAccent.SECONDARY_BRAND" />
</template>
```

- **Type:** `ColorAccent.PRIMARY_BRAND | ColorAccent.SECONDARY_BRAND | ColorAccent.NEUTRAL`
- **Default:** `ColorAccent.PRIMARY_BRAND`

### selectionMode

Sets whether one or many nodes can be selected. In `MULTIPLE` mode it works like a file explorer: a plain click selects only that node, `Ctrl` / `Cmd` + click toggles a node, and `Shift` + click selects the range from the last clicked node. Disabled nodes are skipped.

```vue
<template>
    <TreeView :nodes="nodes" :selectionMode="TreeViewSelectionMode.MULTIPLE" />
</template>

<script setup lang="ts">
const nodes: TreeViewNode[] = [
    {
        value: 'src',
        label: 'src',
        children: [
            { value: 'app', label: 'app.tsx' },
            { value: 'index', label: 'index.ts' },
        ],
    },
    { value: 'package', label: 'package.json' },
]
</script>
```

- **Type:** `TreeViewSelectionMode`
- **Default:** `TreeViewSelectionMode.SINGLE`

### showCheckboxes

Shows a checkbox on every node. Selection and checked state are independent.

```vue
<template>
    <TreeView :nodes="nodes" showCheckboxes />
</template>

<script setup lang="ts">
const nodes: TreeViewNode[] = [
    {
        value: 'src',
        label: 'src',
        children: [
            { value: 'app', label: 'app.tsx' },
            { value: 'index', label: 'index.ts' },
        ],
    },
    { value: 'package', label: 'package.json' },
]
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### isAccordion

Keeps a single folder open per level, root level included: opening a folder closes its open sibling folders, along with everything open inside them. It only applies when a folder is opened by the user, so an initial `expandedValue` with several open siblings is kept as is.

```vue
<template>
    <TreeView :nodes="nodes" isAccordion />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### expandOnClick

Opens or closes a branch when its row is clicked. When `false`, only the chevron toggles it.

```vue
<template>
    <TreeView :nodes="nodes" :expandOnClick="false" />
</template>

<script setup lang="ts">
const nodes: TreeViewNode[] = [
    {
        value: 'src',
        label: 'src',
        children: [
            { value: 'app', label: 'app.tsx' },
            { value: 'index', label: 'index.ts' },
        ],
    },
    { value: 'package', label: 'package.json' },
]
</script>
```

- **Type:** `boolean`
- **Default:** `true`

### showIcons

Shows the node icons: a folder for branches, a file for leaves, or the node's own `icon`.

```vue
<template>
    <TreeView :nodes="nodes" :showIcons="false" />
</template>

<script setup lang="ts">
const nodes: TreeViewNode[] = [
    {
        value: 'src',
        label: 'src',
        children: [
            { value: 'app', label: 'app.tsx' },
            { value: 'index', label: 'index.ts' },
        ],
    },
    { value: 'package', label: 'package.json' },
]
</script>
```

- **Type:** `boolean`
- **Default:** `true`

### showIndentGuides

Shows the vertical guide lines that connect nested nodes.

```vue
<template>
    <TreeView :nodes="nodes" :showIndentGuides="false" />
</template>

<script setup lang="ts">
const nodes: TreeViewNode[] = [
    {
        value: 'src',
        label: 'src',
        children: [
            { value: 'app', label: 'app.tsx' },
            { value: 'index', label: 'index.ts' },
        ],
    },
    { value: 'package', label: 'package.json' },
]
</script>
```

- **Type:** `boolean`
- **Default:** `true`

### size

Sets the row height, text size and indentation.

```vue
<template>
    <TreeView :nodes="nodes" :size="ControlFieldSize.LG" />
</template>
```

- **Type:** `ControlFieldSize`
- **Default:** `ControlFieldSize.MD`

### checkStrictly

Makes every node store its own checked state when `showCheckboxes` is enabled: checking a branch does not check its children, and a branch never shows a mixed state. Any node, branches included, can be in `checkedValue`.

```vue
<template>
    <TreeView :nodes="nodes" showCheckboxes checkStrictly v-model:checkedValue="checked" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### defaultExpandAll

Opens every branch on the first render. It is ignored when `expandedValue` already has values.

```vue
<template>
    <TreeView :nodes="nodes" defaultExpandAll />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### defaultExpandedDepth

Opens the branches down to this many levels on the first render (`1` opens only the root level folders). It is ignored when `expandedValue` already has values, and `defaultExpandAll` takes precedence.

```vue
<template>
    <TreeView :nodes="nodes" :defaultExpandedDepth="2" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### filter

Shows only the nodes that match, together with their ancestors, which are opened automatically while the filter is active. Pass a string to match labels case-insensitively, or a function for custom logic. Use the `empty` slot to show a message when nothing matches. Only loaded nodes are searched.

```vue
<template>
    <TreeView :nodes="nodes" :filter="search">
        <template #empty>No results</template>
    </TreeView>
</template>

<script setup lang="ts">
const search = ref('')
</script>
```

- **Type:** `string | ((node: TreeViewNode) => boolean)`
- **Default:** `''`

### sortOrder

Sorts the nodes of every level for display, by label, in a natural and case-insensitive way (`file2` comes before `file10`). `nodes` is never reordered, so turning the sort off brings the original order back. Sorting also applies to lazy-loaded children.

```vue
<template>
    <TreeView :nodes="nodes" :sortOrder="SortOrder.ASC" />
</template>
```

- **Type:** `SortOrder`
- **Default:** `SortOrder.NONE`

#### Options

::options-table
---
options: [
    {
        value: "NONE",
        description: "Keeps the order of `nodes`.",
    },
    {
        value: "ASC",
        description: "Sorts labels from A to Z.",
    },
    {
        value: "DESC",
        description: "Sorts labels from Z to A.",
    },
]
---
::

### foldersFirst

Shows the folders (empty ones included) above the files at every level. Within each group the order comes from `sortOrder`, `sortCompare` or `nodes`.

```vue
<template>
    <TreeView :nodes="nodes" :sortOrder="SortOrder.ASC" foldersFirst />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### sortCompare

Sets your own comparison, which replaces `sortOrder`. It receives two nodes and works like the callback of `Array.sort`. Combine it with `meta` to sort by data such as a file size.

```vue
<template>
    <TreeView :nodes="nodes" :sortCompare="bySize" />
</template>

<script setup lang="ts">
const bySize = (a: TreeViewNode, b: TreeViewNode) => {
    return Number(a.meta?.size ?? 0) - Number(b.meta?.size ?? 0)
}
</script>
```

- **Type:** `(a: TreeViewNode, b: TreeViewNode) => number`
- **Default:** `undefined`

### leafIcon

Sets the icon of nodes without children (files). A node's own `icon` still takes precedence.

```vue
<template>
    <TreeView :nodes="nodes" leafIcon="mdi:text-box-outline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:file-outline'`

### collapsedIcon

Sets the icon of closed branches (folders). A node's own `icon` still takes precedence.

```vue
<template>
    <TreeView :nodes="nodes" collapsedIcon="mdi:folder-plus-outline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:folder-outline'`

### expandedIcon

Sets the icon of open branches (folders). A node's own `icon` still takes precedence.

```vue
<template>
    <TreeView :nodes="nodes" expandedIcon="mdi:folder-minus-outline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:folder-open-outline'`

### isRenamable

Adds a "Rename" item at the top of the "more actions" menu of every enabled node, and enables `F2` on the focused node. The label turns into an input: `Enter` or leaving the field confirms, `Escape` cancels. The tree never edits `nodes` itself: bind `v-model:nodes` and it emits the renamed tree as `update:nodes`, or listen to `rename` to apply the change yourself. When the node was loaded with `loadChildren`, which `nodes` does not hold, only `rename` is emitted. It has no effect when `readOnly` or `disabled` is set. You can also start a rename yourself with the `startRename(value)` method. Do not add your own "Rename" item to `moreActionsItems` when using it, or the menu shows two.

```vue
<template>
    <TreeView :nodes="nodes" isRenamable @rename="({ value, label }) => rename(value, label)" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### renameOnClick

Starts a rename when the only selected node is clicked again, like a file explorer: the second click is not a double click, so after about 500 ms without another click the label turns into an input. A double click cancels it and emits `node-dblclick` instead. It needs `isRenamable`, and it does nothing with `readOnly`, `disabled`, with a modifier key held, or on a branch while `expandOnClick` is enabled (there the click opens or closes it).

```vue
<template>
    <TreeView :nodes="nodes" isRenamable renameOnClick @rename="onRename" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### renameLabel

Sets the text of the built-in rename menu item and the accessible label of the rename input. Override it for i18n.

```vue
<template>
    <TreeView :nodes="nodes" isRenamable renameLabel="Renombrar" />
</template>
```

- **Type:** `string`
- **Default:** `'Rename'`

### isReorderable

Lets the user drag nodes to reorder or move them. Dropping on the top or bottom quarter of a folder row, or on the upper or lower half of a file row, places the node before or after it; dropping on the middle of a folder places it inside. While dragging, a placeholder shows where the node will land: a line with a dot, indented at the level it will take, or a highlighted folder when it will go inside. A node cannot be dropped on itself, on its own descendants or on a disabled node. Folders can be dragged into other folders, and empty folders (`children: []`) accept drops too. While a sort is active (`sortOrder`, `foldersFirst` or `sortCompare`) the order is automatic, so a drop only chooses the list the node joins, and no line placeholder is shown: the list that will receive it is highlighted instead. Dropping on a folder row moves the node inside that folder, and dropping on a file moves it into the list that file belongs to, which is the parent folder or the root level. Dropping on the list the node already belongs to does nothing. It has no effect when `readOnly` or `disabled` is set.

The tree never edits `nodes` itself. Bind `v-model:nodes` and it emits the moved tree as `update:nodes` (and opens the folder a node was dropped into). To apply the move yourself instead, listen to `reorder`. When a move involves lazy-loaded nodes, which `nodes` does not hold, only `reorder` is emitted.

```vue
<template>
    <TreeView v-model:nodes="nodes" isReorderable />
</template>
```

```vue
<template>
    <TreeView :nodes="nodes" isReorderable @reorder="move" />
</template>

<script setup lang="ts">
const move = ({ value, targetValue, position, parentValue }: TreeViewReorderDetails) => {
    // Remove `value` from its old place and insert it relative to `targetValue`
}
</script>
```

- **Type:** `boolean`
- **Default:** `false`

#### TypeScript interface
```ts
interface TreeViewReorderDetails {
    value: string // Node being moved
    targetValue: string // Node it was dropped on
    position: TreeViewDropPosition // BEFORE | AFTER | INSIDE
    parentValue: string | null // New parent, null for the root level
}
```

### readOnly

Keeps the tree navigable and selectable but turns off renaming and reordering, even when `isRenamable` or `isReorderable` are set.

```vue
<template>
    <TreeView :nodes="nodes" isRenamable isReorderable readOnly />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### loadChildren

Loads the children of a branch the first time it is opened. Mark the branch with `hasChildren: true` and no `children`. A spinner replaces the chevron while loading and the result is cached. A failure emits `load-error`, keeps the branch closed and shows an error icon (see [loadErrorLabel](#loaderrorlabel)); opening the branch again retries. Call `reload(value)` to discard the cached children.

```vue
<template>
    <TreeView :nodes="nodes" :loadChildren="loadChildren" />
</template>

<script setup lang="ts">
const nodes: TreeViewNode[] = [
    { value: 'remote', label: 'remote', hasChildren: true },
]

const loadChildren = async (node: TreeViewNode) => {
    const response = await fetchChildren(node.value)
    return response.map(item => ({ value: item.id, label: item.name }))
}
</script>
```

- **Type:** `(node: TreeViewNode) => Promise<TreeViewNode[]>`
- **Default:** `undefined`

### loadErrorLabel

Sets the tooltip of the error icon shown on a branch whose `loadChildren` failed. Override it for i18n.

```vue
<template>
    <TreeView :nodes="nodes" :loadChildren="loadChildren" loadErrorLabel="Error al cargar. Haz clic para reintentar." />
</template>
```

- **Type:** `string`
- **Default:** `'Failed to load. Click to retry.'`

### moreActionsItems

Sets the items of the "more actions" dropdown, shown by a button on the right of every row when it is hovered or focused. The button stays hidden otherwise, is not rendered on disabled nodes, and clicking it does not select or toggle the node. The items are `DropdownMenuItem` objects, and each can define a `callback`; see the [DropdownMenu items](/docs/components/dropdown-menu#items) for the full interface.

Pass a list to use the same menu on every node:

```vue
<template>
    <TreeView :nodes="nodes" :moreActionsItems="items" />
</template>

<script setup lang="ts">
const items: DropdownMenuItem[] = [
    { text: 'Rename', icon: 'mdi:pencil-outline', type: DropdownItemType.ICON, callback: () => console.log('rename') },
    { text: 'Delete', icon: 'mdi:trash-can-outline', type: DropdownItemType.DANGER_ICON, hasSeparator: true },
]
</script>
```

Pass a function to resolve the menu per node, for example one menu for folders and another for files, or conditional items. It receives the node and `{ isBranch, level }`, and returns the items for that node. Return an empty array to hide the button on it.

```vue
<template>
    <TreeView :nodes="nodes" :moreActionsItems="getItems" />
</template>

<script setup lang="ts">
const getItems: TreeViewMoreActionsResolver = (node, { isBranch, level }) => {
    if (isBranch) {
        return [
            { text: 'New file', icon: 'mdi:file-plus-outline', type: DropdownItemType.ICON, callback: () => createFile(node.value) },
            // The root folder cannot be removed
            ...(level > 0 ? [{ text: 'Delete', type: DropdownItemType.DANGER_TEXT, callback: () => remove(node.value) }] : []),
        ]
    }

    // Files: only the ones that can be opened
    return node.label.endsWith('.json')
        ? [{ text: 'Open in editor', callback: () => open(node.value) }]
        : []
}
</script>
```

- **Type:** `DropdownMenuItem[] | TreeViewMoreActionsResolver`
- **Default:** `[]`

#### TypeScript interface
```ts
type TreeViewMoreActionsResolver = (
    node: TreeViewNode,
    details: { isBranch: boolean, level: number }, // level 0 is the root level
) => DropdownMenuItem[]
```

### moreActionsPosition

Sets the preferred vertical side of the "more actions" dropdown relative to its button. The menu is always right-aligned with the button. On hover or focus the row measures the space above and below and flips to the other side when the preferred one does not have enough room, so the menu never overflows the viewport.

```vue
<template>
    <TreeView :nodes="nodes" :moreActionsPosition="Position.TOP" />
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

#### Options

::options-table
---
options: [
    {
        value: "TOP",
        description: "Places the menu above the button; flips below it if there isn't enough room above.",
    },
    {
        value: "BOTTOM",
        description: "Places the menu below the button; flips above it if there isn't enough room below.",
    },
]
---
::

### moreActionsPositionYOffset

Sets the vertical offset of the "more actions" dropdown relative to its button. Positive values move the menu down, negative values move it up.

```vue
<template>
    <TreeView :nodes="nodes" :moreActionsPositionYOffset="8" />
</template>
```

- **Type:** `number | string`
- **Default:** `4`

### moreActionsMenuWidth

Sets the minimum width of the "more actions" dropdown, in pixels.

```vue
<template>
    <TreeView :nodes="nodes" :moreActionsMenuWidth="240" />
</template>
```

- **Type:** `number`
- **Default:** `200`

### moreActionsAriaLabel

Sets the accessible label of the "more actions" button. Override it for i18n.

```vue
<template>
    <TreeView :nodes="nodes" moreActionsAriaLabel="Acciones" />
</template>
```

- **Type:** `string`
- **Default:** `'More options'`

### disabled

Disables the whole tree. Set `disabled` on a single node to disable only that node.

```vue
<template>
    <TreeView :nodes="nodes" disabled />
</template>

<script setup lang="ts">
const nodes: TreeViewNode[] = [
    {
        value: 'src',
        label: 'src',
        children: [
            { value: 'app', label: 'app.tsx' },
            { value: 'index', label: 'index.ts' },
        ],
    },
    { value: 'package', label: 'package.json' },
]
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### ariaLabel

Sets the `aria-label` of the tree for screen readers.

```vue
<template>
    <TreeView :nodes="nodes" ariaLabel="Project files" />
</template>

<script setup lang="ts">
const nodes: TreeViewNode[] = [
    {
        value: 'src',
        label: 'src',
        children: [
            { value: 'app', label: 'app.tsx' },
            { value: 'index', label: 'index.ts' },
        ],
    },
    { value: 'package', label: 'package.json' },
]
</script>
```

- **Type:** `string`
- **Default:** `'Tree view'`

## Metadata

Each node can carry free-form data in `meta`. The tree does not read it; use it in the `trailing`, `label` and `icon` slots, or in `sortCompare`.

```vue
<template>
    <TreeView :nodes="nodes" :sortCompare="bySize">
        <template #trailing="{ node }">
            <span v-if="node.meta?.size" class="text-xs">{{ formatBytes(node.meta.size as number) }}</span>
        </template>
    </TreeView>
</template>

<script setup lang="ts">
const nodes: TreeViewNode[] = [
    { value: 'app', label: 'app.tsx', meta: { size: 2048 } },
    { value: 'index', label: 'index.ts', meta: { size: 512 } },
]

const bySize = (a: TreeViewNode, b: TreeViewNode) => Number(a.meta?.size) - Number(b.meta?.size)
</script>
```

## Accessibility

The tree uses `role="tree"` with `role="treeitem"` rows that expose `aria-level`, `aria-setsize`, `aria-posinset`, `aria-expanded` and `aria-selected`. Only one row is reachable with `Tab`, and the rest is navigated with the keyboard.

::options-table
---
options: [
    { value: "Arrow Down / Up", description: "Moves focus to the next or previous visible node." },
    { value: "Arrow Right", description: "Opens a closed branch, or moves focus to its first child when it is already open." },
    { value: "Arrow Left", description: "Closes an open branch, or moves focus to the parent node." },
    { value: "Home / End", description: "Moves focus to the first or last visible node." },
    { value: "Enter", description: "Same as clicking the node: selects it and opens or closes it when `expandOnClick` is enabled." },
    { value: "Space", description: "Toggles the checkbox of the focused node when `showCheckboxes` is enabled, otherwise toggles its selection. While typing a typeahead search it adds a space to the search." },
    { value: "Ctrl / Cmd + Space", description: "Toggles the selection of the focused node, even when `showCheckboxes` is enabled." },
    { value: "Shift + Arrow Down / Up", description: "Selects the range from the last selected node to the newly focused one (`MULTIPLE` mode)." },
    { value: "Ctrl / Cmd + A", description: "Selects every enabled visible node (`MULTIPLE` mode)." },
    { value: "*", description: "Opens every closed branch at the level of the focused node (not in accordion mode)." },
    { value: "F2", description: "Renames the focused node when `isRenamable` is enabled." },
    { value: "Characters", description: "Typeahead: moves focus to the next node whose label starts with the typed text." },
]
---
::

## Emits

::options-table
---
options: [
    { value: "@update:nodes", description: "Emitted with the updated tree after a valid drop when `isReorderable` is enabled, or after a confirmed rename (`v-model:nodes`)." },
    { value: "@update:expandedValue", description: "Emitted with the new list of open branches (`v-model:expandedValue`)." },
    { value: "@update:selectedValue", description: "Emitted with the new list of selected nodes (`v-model:selectedValue`)." },
    { value: "@update:checkedValue", description: "Emitted with the new list of checked leaves (`v-model:checkedValue`)." },
    { value: "@load-error", description: "Emitted with `{ value, error }` when `loadChildren` fails for a branch." },
    { value: "@node-dblclick", description: "Emitted with `{ node }` when a node is double clicked, so you can run your own action such as opening a file. It is not emitted for disabled nodes." },
    { value: "@rename", description: "Emitted with `{ value, label, previousLabel }` when a rename is confirmed with a new, non-empty label." },
    { value: "@reorder", description: "Emitted with `{ value, targetValue, position, parentValue }` when a node is dropped in a valid place." },
]
---
::

```vue
<template>
    <TreeView
        :nodes="nodes"
        :loadChildren="loadChildren"
        @load-error="({ value, error }) => console.error(value, error)"
    />
</template>
```

A double click does not toggle a branch twice: the second click of the pair is ignored, so a double click on a folder opens it once.

```vue
<template>
    <TreeView :nodes="nodes" @node-dblclick="({ node }) => openFile(node.value)" />
</template>
```

#### TypeScript interface
```ts
interface TreeViewNodeDetails {
    node: TreeViewNode
}
```

## Methods

Get a reference to the component to call these methods.

::options-table
---
options: [
    { value: "expandAll()", description: "Opens every branch that has loaded children." },
    { value: "collapseAll()", description: "Closes every branch." },
    { value: "expandTo(value)", description: "Opens all the ancestors of a node, loading them when needed, so its row becomes visible." },
    { value: "scrollToNode(value)", description: "Runs `expandTo` and scrolls the node into view without moving the focus." },
    { value: "startRename(value)", description: "Starts renaming a node. Requires `isRenamable` and no `readOnly`." },
    { value: "reload(value)", description: "Discards the cached children of a lazy branch and loads them again if it is open." },
]
---
::

```vue
<template>
    <TreeView ref="tree" :nodes="nodes" />
    <button @click="tree?.scrollToNode('src/hooks/use-auth')">Reveal</button>
</template>

<script setup lang="ts">
const tree = useTemplateRef('tree')
</script>
```
