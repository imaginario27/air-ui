## Component

::component-code
---
srcDir: 'lists/List.vue'
props: 
    items:
        - "Item 1"
        - "Item 2"
        - "Item 3"
    hasSeparator: false
    layout: "list"
    cols: 2
    tabletCols: 2
    mobileCols: 1
    gapClass: "gap-6"
    listItemIcon: "mdi:check"
    listItemIconClass: "text-icon-secondary-brand-default"
    listItemSize: "sm"
    spaced: false
items:
    layout:
        - value: list
          text: LIST
        - value: grid
          text: GRID
    listItemSize:
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
external:
  - items
propsSettingsExcludedProps: ['items']
---
::

## Props

::props-table
---
props: [
    {
        "name": "items",
        "default": "An example array",
        "type": "any[]",
    },
    {
        "name": "hasSeparator",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "layout",
        "default": "ListLayout.LIST",
        "type": "ListLayout",
    },
    {
        "name": "cols",
        "default": "2",
        "type": "number",
    },
    {
        "name": "tabletCols",
        "default": "2",
        "type": "number",
    },
    {
        "name": "mobileCols",
        "default": "1",
        "type": "number",
    },
    {
        "name": "gapClass",
        "default": "'gap-6'",
        "type": "string",
    },
    {
        "name": "listItemIcon",
        "default": "mdi:check",
        "type": "string",
    },
    {
        "name": "listItemIconClass",
        "default": "text-icon-secondary-brand-default",
        "type": "string",
    },
    {
        "name": "listItemSize",
        "default": "ListItemSize.SM",
        "type": "ListItemSize",
    },
    {
        "name": "spaced",
        "default": "false",
        "type": "boolean",
    },
]
---
::

## Slots
::slots-table
---
slots: [
    {
        name: "default",
        description: "Default slot to insert items.",
    },
]
---
::

```vue
<template>
    <List>
        <ListItem 
            v-for="(item, index) in items" :key="index" 
        >
            {{ item }}
        </ListItem>
    </List>
</template>

<script setup lang="ts">
const items = ref<DropdownMenuItem[]>([
    {
        text: "Item 1",
    },
    {
        text: "Item 2",
    },
    {
        text: "Item 3",
    },
])
</script>
```

## Components
::components-table
---
components: [
    {
        name: "<ListItem>",
        description: "The component to display in the list.",
    },
]
---
::

## Usage
### items
List of items to display in the list. It can be used instead of the `default` slot.

```vue
<template>
    <List
        :items="exampleItems"
    />
</template>

<script setup lang="ts">
const exampleItems = ref(["Item 1", "Item 2", "Item 3"])
</script>
```

### hasSeparator
If set to `true`, a separator will be displayed at the top and bottom of each item.

```vue
<template>
    <List
        :hasSeparator="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`


### layout
The layout of the list. In case of using grid layout, the number of columns can be customized by using the `cols`, `tabletCols` and `mobileCols` props. 
Uses the `ListLayout` enum.

```vue
<template>
    <List
        :layout="ListLayout.LIST"
    />
</template>
```

- **Type:** `ListLayout`
- **Default:** `ListLayout.LIST`

#### Options

::options-table
---
options: [
    {
        value: "LIST",
        description: "List",
    },
    {
        value: "GRID",
        description: "Grid",
    },
]
---
::

### cols, tabletCols and mobileCols
The number of columns in the grid layout.

```vue
<template>
    <List
        :layout="ListLayout.GRID"
        :cols="2"
        :tabletCols="2"
        :mobileCols="1"
    />
</template>
```
- **Type:** `number`

### gapClass
The gap class applied to the list when using grid layout.

```vue
<template>
    <List
        :layout="ListLayout.GRID"
        gapClass="gap-4"
    />
</template>
```

- **Type:** `string`
- **Default:** `'gap-6'`

### listItemIcon
The icon displayed as the marker on the list item. If it is not provided, the list item will not use any icon.

```vue
<template>
    <List
        listItemIcon="mdi:check"
    />
</template>
```

- **Type:** `string`

### listItemIconClass
The class applied to the icon displayed as the marker on the list item.

```vue
<template>
    <List
        listItemIcon="mdi:check"
        listItemIconClass="text-icon-secondary-brand-default"
    />
</template>
```

- **Type:** `string`
- **Default:** `'text-icon-secondary-brand-default'`

### listItemSize
The size of the list item. Uses the `ListItemSize` enum.

```vue
<template>
    <List
        :listItemSize="ListItemSize.SM"
    />
</template>
```

- **Type:** `ListItemSize`
- **Default:** `ListItemSize.SM`

#### Options

::options-table
---
options: [
    {
        value: "xs",
        description: "XS",
    },
    {
        value: "sm",
        description: "SM",
    },
    {
        value: "md",
        description: "MD",
    },
]
---
::

### spaced
If set to `true`, the list items will be have more vertical spaced

```vue
<template>
    <List
        spaced
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

## ListItem
`<ListItem>` represents the individual item within the `<List>` component. 

### Props

::props-table
---
props: [
    {
        "name": "markerIcon",
        "type": "string",
    },
    {
        "name": "markerIconClass",
        "default": "'text-icon-secondary-brand-default'",
        "type": "string",
    },
    {
        "name": "spaced",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "size",
        "default": "ListItemSize.SM",
        "type": "ListItemSize",
    },
]
---
::

### Usage
The `<ListItem>` component props shares some props with the `<List>` component. 
 
They work the same with the difference of some props naming. 

Please have a look at the usage of the similar props in the `<List>` component.