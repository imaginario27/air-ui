## Demo

::component-code
---
srcDir: 'content/demos/tables/TableDemo.vue'
previewBackground: "white"
isCodePreviewEnabled: false
componentSource: 'docs'
---
::

```vue
<template>
    <TableWrapper v-if="exampleTableData.length">
        <Table>
            <TableHeader>
                <TableHeaderCell>Column 1</TableHeaderCell>
                <TableHeaderCell>Column 2</TableHeaderCell>
                <TableHeaderCell>Column 3</TableHeaderCell>
                <TableHeaderCell><!-- Cell actions --></TableHeaderCell>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(item, index) in paginatedData" :key="index">
                    <TableCell>{{ item.col1 }}</TableCell>
                    <TableCell>{{ item.col2 }}</TableCell>
                    <TableCell>{{ item.col3 }}</TableCell>
                    <TableCellActions>
                        <ActionIconButton 
                            :size="ButtonSize.MD"
                            icon="mdi:eye-outline"
                        />
                    </TableCellActions>
                </TableRow>
            </TableBody>
        </Table>
        <ButtonPagination 
            v-model:modelValue="currentPage"
            v-model:items-per-page="currentItemsPerPage"
            :totalItems="exampleTableData.length"
        />
    </TableWrapper>
    <EmptyState v-else />
</template>

<script setup lang="ts">
// States
const currentPage = ref(1)
const currentItemsPerPage = ref(10)

// Static example data
const exampleTableData = [
   ...
]

// Computed
const paginatedData = computed(() =>
    getPaginatedData(exampleTableData, currentPage.value, currentItemsPerPage.value)
)
</script>
```

## Architecture
To build a flexible and reusable table layout, you can structure your component as follows. This approach separates concerns clearly, supports pagination, and includes an empty state fallback to improve UX:

```vue
<template>
    <TableWrapper v-if="exampleTableData.length">
        <Table>
            <TableHeader>
                <TableHeaderCell>
                    <!-- Column name -->
                </TableHeaderCell>
                ....
            </TableHeader>
            <TableBody>
                <!-- Use the data array to render all the rows -->
                <TableRow v-for="(item, index) in paginatedData" :key="index">
                    <TableCell>{{ item.col1 }}</TableCell>
                    ....

                    <!-- In case you need to use actions, use this component for a proper layout -->
                    <TableCellActions>
                        <ActionIconButton 
                            :size="ButtonSize.MD"
                            icon="mdi:eye-outline"
                        />
                    </TableCellActions>
                </TableRow>
            </TableBody>
        </Table>
        <!-- Optional pagination -->
        <ButtonPagination 
            v-model:modelValue="currentPage"
            v-model:items-per-page="currentItemsPerPage"
            :totalItems="exampleTableData.length"
        />
    </TableWrapper>
    <!-- Recommended empty state -->
    <EmptyState v-else />
<template>
```

## Components
This set of components are used when creating tables.

::components-table
---
components: [
    {
        name: "<TableWrapper>",
        description: "Provides a container for all the table components and pagination which is usefull to set the layout correctly.",
    },
    {
        name: "<Table>",
        description: "Represents the table. Under the hood, it provides an overflow scrollable container.",
    },
    {
        name: "<TableHeader>",
        description: "Represents the head of the table.",
    },
    {
        name: "<TableHeaderCell>",
        description: "Represents a cell in the table header.",
    },
    {
        name: "<TableBody>",
        description: "Represents the body of the table.",
    },
    {
        name: "<TableRow>",
        description: "Represents a table row.",
    },
    {
        name: "<TableCell>",
        description: "Represents the cell inside a table row.",
    },
    {
        name: "<TableCellActions>",
        description: "It is a predesigned and use-specific case cell, which provides an suitable layout for actions",
    },
]
---
::


## Usage
### Paginated data
In the event of using pagined data, please follow this steps:
1. Create local current page and and current items per page states in case you do not use any composables or stores.
2. Create a computed function which calls the `getPaginatedData()' utils function.

This function requires:

``` ts
data: T[],
currentPage: number,
itemsPerPage: number,
itemsLimit?: number
```

Consider using `itemsLimit` if you want to limit the amount of items you want to handle.

```vue
<script setup lang="ts">
// States
const currentPage = ref(1)
const currentItemsPerPage = ref(10)

// Static example data
const exampleTableData = [
   ...
]

// Computed
const paginatedData = computed(() =>
    getPaginatedData(exampleTableData, currentPage.value, currentItemsPerPage.value)
)
</script>
```

### TableCell
The `TableCell` components accept some props:

::props-table
---
props: [
    {
        "name": "fitToContent",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "to",
        "type": "string"
    },
]
---
::


#### fitToContent

Forces the cell and the column to fit is width to the content of the cell. Usefull when using badges for instance.

```vue
<template>
    ...
    <TableCell fitToContent>
        ...
    </TableCell>
    ...
</template>
```

- **Type:** `boolean`
- **Default:** `false`

#### to

The `to` prop is used to set the `href` attribute of the `a` tag inside the `TableCell` component. It is useful when you want to link to another page or resource.



```vue
<template>
    ...
    <TableCell to="/some-page">
        ...
    </TableCell>
    ...
</template>
```

::content-alert
---
props:
    title: "Important"
    description: "When linking table rows to a specific route, make sure all relevant cells include the same <strong>to</strong> prop. This ensures consistent behavior. Some cells, such as action cells, should remain unlinked, which is why this approach provides more granular control."
---
::

**UX imprevement**: When using the `to` prop, provide the `<TableRow>` component the `isHoverable` prop to ensure a better UX experience.

### TableRow

The `TableRow` component is used to render a table row. It accepts the following props:

::props-table
---
props: [
    {
        "name": "isHoverable",
        "default": "false",
        "type": "boolean"
    },
]
---
::

#### isHoverable

Displays a hover effect on the row if it is `true`.

```vue
<template>
    ...
    <TableRow isHoverable>
        ...
    </TableRow>
    ...
</template>
```

- **Type:** `boolean`
- **Default:** `false`