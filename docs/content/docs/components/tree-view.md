## Component

::component-code
---
srcDir: 'tree-views/TreeView.vue'
model:
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
    disabled: false
    moreActionsItems:
        - text: New file
          icon: mdi:file-plus-outline
          type: icon
          actionType: action
        - text: Rename
          icon: mdi:pencil-outline
          type: icon
          actionType: action
        - text: Delete
          icon: mdi:trash-can-outline
          type: danger-icon
          actionType: action
          hasSeparator: true
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
enums:
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
        "name": "loadChildren",
        "default": "undefined",
        "type": "(node: TreeViewNode) => Promise<TreeViewNode[]>",
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

Sets the tree data. Each node has a unique `value` and a `label`, and can define `children`, a custom `icon`, `disabled`, or `hasChildren` for lazy loading (see [loadChildren](#loadchildren)).

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

Sets whether one or many nodes can be selected.

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

### loadChildren

Loads the children of a branch the first time it is opened. Mark the branch with `hasChildren: true` and no `children`. A spinner replaces the chevron while loading, the result is cached, and a failure emits `load-error` and keeps the branch closed.

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

## Accessibility

The tree uses `role="tree"` with `role="treeitem"` rows that expose `aria-level`, `aria-setsize`, `aria-posinset`, `aria-expanded` and `aria-selected`. Only one row is reachable with `Tab`, and the rest is navigated with the keyboard.

::options-table
---
options: [
    { value: "Arrow Down / Up", description: "Moves focus to the next or previous visible node." },
    { value: "Arrow Right", description: "Opens a closed branch, or moves focus to its first child when it is already open." },
    { value: "Arrow Left", description: "Closes an open branch, or moves focus to the parent node." },
    { value: "Home / End", description: "Moves focus to the first or last visible node." },
    { value: "Enter", description: "Selects the focused node." },
    { value: "Space", description: "Toggles the checkbox of the focused node when `showCheckboxes` is enabled, otherwise selects it." },
    { value: "Characters", description: "Typeahead: moves focus to the next node whose label starts with the typed text." },
]
---
::

## Emits

::options-table
---
options: [
    { value: "@update:expandedValue", description: "Emitted with the new list of open branches (`v-model:expandedValue`)." },
    { value: "@update:selectedValue", description: "Emitted with the new list of selected nodes (`v-model:selectedValue`)." },
    { value: "@update:checkedValue", description: "Emitted with the new list of checked leaves (`v-model:checkedValue`)." },
    { value: "@load-error", description: "Emitted with `{ value, error }` when `loadChildren` fails for a branch." },
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
