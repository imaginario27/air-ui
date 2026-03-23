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

### TableHeaderCell
The `TableHeaderCell` component accepts some props:
::props-table
---
props: [
    {
        "name": "scope",
        "default": "TableHeaderCellScope.COL",
        "type": "TableHeaderCellScope"
    },
    {
        "name": "sorteable",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "columnKey",
        "type": "string"
    },
    {
        "name": "sortKey",
        "type": "string"
    },
    {
        "name": "sortAsc",
        "type": "boolean"
    },
    {
        "name": "onToggleSort",
        "type": "() => void"
    },
    {
        "name": "fitToContent",
        "type": "boolean",
        "default": "false"
    },
    {
        "name": "to",
        "type": "string"
    },  
]
---
::

#### scope
The `scope` prop is used to set the scope of the header cell. It uses the `TableHeaderCellScope` enum.

- **Type:** `TableHeaderCellScope`
- **Default:** `TableHeaderCellScope.COL`

##### Options
::options-table
---
options: [
    {
        value: "COL",
        description: "Indicates that the header cell is a column header.",
    },
    {
        value: "ROW",
        description: "Indicates that the header cell is a row header.",
    },
]
---
::

##### Note about scope

::content-alert
---
props:
    title: "Important"
    description: "When scope is set to <strong>COL</strong>, the fitToContent and to props are ignored and have no effect on the header cell. When scope is set to <strong>ROW</strong>, sorting is disabled. In this case, the following props should not be used, as they will not apply: sorteable, columnKey, sortKey, sortAsc, and onToggleSort."
---
::

#### sorteable
When `true`, it indicates that the column is sortable. 

It is recommended to use this prop together with `columnKey`, `sortKey`, `sortAsc` and `onToggleSort` props.

```vue
<template>
    ...
    <TableHeaderCell
        sorteable
        columnKey="col1"
        :sortKey
        :sortAsc
        :onToggleSort="() => toggleSort('col1')"
    >
        Column 1
    </TableHeaderCell>
    ...
</template>
```

- **Type:** `boolean`
- **Default:** `false`

#### columnKey
The `columnKey` prop is used to set the key of the column. It is useful when you want to sort the column.

- **Type:** `string`
- **Default:** `''`

#### sortKey
The `sortKey` prop is used to set the current sort key. It is useful when you want to sort the column.

- **Type:** `string`
- **Default:** `''`

#### sortAsc
The `sortAsc` prop is used to set the current sort direction. It is useful when you want to sort the column.

- **Type:** `boolean`
- **Default:** `true`

#### onToggleSort
The `onToggleSort` prop is used to set the function that will be called when the user clicks on the header cell to toggle the sort direction. It is useful when you want to sort the column.

- **Type:** `() => void`
- **Default:** `undefined`

#### fitToContent / to
These props have the same behavior as in the `TableCell` component, but in this case they will be applied to the header cell.

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
    {
        "name": "isStripped",
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

#### isStripped

When `true`, it applies a different background color to even rows, creating a stripped effect.

```vue
<template>
    ...
    <TableRow isStripped>
        ...
    </TableRow>
    ...
</template>
```

- **Type:** `boolean`
- **Default:** `false`


## Table examples

### Stripped

::component-code
---
srcDir: 'content/demos/tables/StrippedTableDemo.vue'
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
                <TableRow v-for="(item, index) in paginatedData" :key="index" isStripped>
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
    { col1: 'John Doe', col2: 'johndoe@example.com', col3: 'Active' },
    ...
]

// Computed
const paginatedData = computed(() =>
    getPaginatedData(exampleTableData, currentPage.value, currentItemsPerPage.value)
)
</script>
```

### Sorteable

::component-code
---
srcDir: 'content/demos/tables/SorteableTableDemo.vue'
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
                <TableHeaderCell
                    sorteable
                    columnKey="col1"
                    :sortKey
                    :sortAsc
                    :onToggleSort="() => toggleSort('col1')"
                >
                    Column 1
                </TableHeaderCell>

                <TableHeaderCell
                    sorteable
                    columnKey="col2"
                    :sortKey
                    :sortAsc
                    :onToggleSort="() => toggleSort('col2')"
                >
                    Column 2
                </TableHeaderCell>

                <TableHeaderCell
                    sorteable
                    columnKey="col3"
                    :sortKey
                    :sortAsc
                    :onToggleSort="() => toggleSort('col3')"
                >
                    Column 3
                </TableHeaderCell>

                <TableHeaderCell><!-- Actions --></TableHeaderCell>
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
type ExampleTableDataItem = {
    col1: string
    col2: string
    col3: string
}

const exampleTableData = ref<ExampleTableDataItem[]>([
    { col1: 'John Doe', col2: 'johndoe@example.com', col3: 'Active' },
    { col1: 'Jane Smith', col2: 'janesmith@example.com', col3: 'Inactive' },
    { col1: 'Alice Johnson', col2: 'alice.j@example.com', col3: 'Pending' },
    { col1: 'Bob Brown', col2: 'bob.brown@example.com', col3: 'Active' },
    { col1: 'Charlie Davis', col2: 'charlie.davis@example.com', col3: 'Inactive' },
    { col1: 'Emma Wilson', col2: 'emma.wilson@example.com', col3: 'Pending' },
    { col1: 'Liam Taylor', col2: 'liam.taylor@example.com', col3: 'Active' },
    { col1: 'Olivia Moore', col2: 'olivia.moore@example.com', col3: 'Inactive' },
    { col1: 'Noah Miller', col2: 'noah.miller@example.com', col3: 'Active' },
    { col1: 'Ava Martin', col2: 'ava.martin@example.com', col3: 'Pending' },
    { col1: 'Sophia Clark', col2: 'sophia.clark@example.com', col3: 'Active' },
    { col1: 'Mason Lewis', col2: 'mason.lewis@example.com', col3: 'Inactive' },
    { col1: 'Isabella Young', col2: 'isabella.young@example.com', col3: 'Active' },
    { col1: 'Logan Hall', col2: 'logan.hall@example.com', col3: 'Pending' },
    { col1: 'Mia Allen', col2: 'mia.allen@example.com', col3: 'Active' },
    { col1: 'Ethan Wright', col2: 'ethan.wright@example.com', col3: 'Inactive' },
    { col1: 'Amelia Scott', col2: 'amelia.scott@example.com', col3: 'Pending' },
])

// Composables
const {
    sortKey,
    sortAsc,
    toggleSort,
    sortedData,
} = useTable(exampleTableData)

// Computed
const paginatedData = computed(() =>
    getPaginatedData(sortedData.value, currentPage.value, currentItemsPerPage.value)
)
</script>
```

### Row header cell

::component-code
---
srcDir: 'content/demos/tables/RowHeaderCellTableDemo.vue'
previewBackground: "white"
isCodePreviewEnabled: false
componentSource: 'docs'
---
::

```vue
<template>
    <TableWrapper v-if="exampleTableData.length">
        <Table>
            <TableBody>
                <TableRow v-for="(item, index) in paginatedData" :key="index">
                    <TableHeaderCell :scope="TableHeaderCellScope.ROW">
                        {{ item.colHeader }}
                    </TableHeaderCell>
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
    { colHeader: 'Col1', col1: 'John Doe', col2: 'johndoe@example.com', col3: 'Active' },
    { colHeader: 'Col2', col1: 'Jane Smith', col2: 'janesmith@example.com', col3: 'Inactive' },
    { colHeader: 'Col3', col1: 'Alice Johnson', col2: 'alice.j@example.com', col3: 'Pending' },
    { colHeader: 'Col4', col1: 'Bob Brown', col2: 'bob.brown@example.com', col3: 'Active' },
    { colHeader: 'Col5', col1: 'Charlie Davis', col2: 'charlie.davis@example.com', col3: 'Inactive' },
    { colHeader: 'Col6', col1: 'Emma Wilson', col2: 'emma.wilson@example.com', col3: 'Pending' },
    { colHeader: 'Col7', col1: 'Liam Taylor', col2: 'liam.taylor@example.com', col3: 'Active' },
]

// Computed
const paginatedData = computed(() =>
    getPaginatedData(exampleTableData, currentPage.value, currentItemsPerPage.value)
)
</script>
```

### Checkbox row selection

::component-code
---
srcDir: 'content/demos/tables/CheckboxTableDemo.vue'
previewBackground: "white"
isCodePreviewEnabled: false
componentSource: 'docs'
---
::