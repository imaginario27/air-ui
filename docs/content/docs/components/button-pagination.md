## Component

::component-code
---
srcDir: 'pagination/ButtonPagination.vue'
props: 
    styleType: "button"
    modelValue: 5
    totalItems: 200
    itemsPerPage: 10
    showRowsPerPage: true
    rowsPerPageLabel: "Rows"
    rowsPerPageOptions: 
      - text: "5"
        value: 5
      - text: "10"
        value: 10
      - text: "25"
        value: 25
      - text: "50"
        value: 50
      - text: "100"
        value: 100
    resultTextMultiplePages: "Showing {from} to {to} of {total} results"
    resultTextSinglePage: "Showing {total} results"
    resultTextSingleItem: "Showing {total} result"
items:
    styleType: 
        - value: button
          text: BUTTON
        - value: overline
          text: OVERLINE
external:
  - modelValue
  - totalItems
  - itemsPerPage
  - rowsPerPageOptions
externalTypes:
    - number
    - number
    - number
    - PaginationRowPerPageOption[]
propsSettingsExcludedProps: ['modelValue', 'itemsPerPage', 'rowsPerPageOptions']
previewBackground: 'white'
---
::

## Demo with table

::component-code
---
srcDir: 'content/demos/tables/ButtonPaginationTableDemo.vue'
previewBackground: 'white'
isCodePreviewEnabled: false
componentSource: 'docs'
---
::

```vue
<template>
    <TableWrapper>
        <Table>
            <TableHeader>
                <TableHeaderCell>Column 1</TableHeaderCell>
                <TableHeaderCell>Column 2</TableHeaderCell>
                <TableHeaderCell>Column 3</TableHeaderCell>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(item, index) in paginatedData" :key="index">
                    <TableCell>{{ item.col1 }}</TableCell>
                    <TableCell>{{ item.col2 }}</TableCell>
                    <TableCell>{{ item.col3 }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <ButtonPagination 
            v-model:modelValue="currentPage"
            v-model:items-per-page="currentItemsPerPage"
            :totalItems="exampleTableData.length"
        />
    </TableWrapper>
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

## Props

::props-table
---
props: [
    {
        "name": "styleType",
        "default": "ButtonPaginationStyle.BUTTON",
        "type": "ButtonPaginationStyle",
    },
    {
        "name": "modelValue",
        "required": true,
        "type": "number",
    }, 
    {
        "name": "totalItems",
        "required": true,
        "type": "number",
    }, 
    {
        "name": "itemsPerPage",
        "default": "10",
        "type": "number"
    },
    {
        "name": "showRowsPerPage",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "rowsPerPageLabel",
        "type": "string"
    },
    {
        "name": "rowsPerPageOptions",
        "type": "PaginationRowPerPageOption[]"
    },
    {
        "name": "resultTextMultiplePages",
        "default": "'Showing {from} to {to} of {total} results'",
        "type": "string"
    },
    {
        "name": "resultTextSinglePage",
        "default": "'Showing {total} results'",
        "type": "string"
    },
    {
        "name": "resultTextSingleItem",
        "default": "'Showing {total} result'",
        "type": "string"
    },
]
---
::


### styleType

Sets the style for the page button navigation. It uses the `ButtonPaginationStyle` enum.

```vue
<template>
    <ButtonPagination :styleType="ButtonPaginationStyle.BUTTON"/>
</template>
```

#### Options

::options-table
---
options: [
    {
        value: "BUTTON",
        description: "The navigation bar uses button-styled pagination items."
    },
    {
        value: "OVERLINE",
        description: "The navigation bar uses overline-styled buttons as pagination items."
    },
]
---
::

### modelValue

The v-model value of the component used to control the current page of the pagination.

```vue
<template>
    <ButtonPagination v-model:modelValue="currentPage" />
</template>

<script setup lang="ts">
const currentPage = ref(1)
</script>
```

- **Type:** `number`
- **Required:** `true`

### totalItems

Sets the total number of items to be displayed in the pagination.

```vue
<template>
    <ButtonPagination 
        :totalItems="data.length"
    />
</template>

<script setup lang="ts">
const data = [...]
</script>
```

- **Type:** `number`
- **Required:** `true`

### itemsPerPage

The v-model value of the component used to control the number of items to be displayed per page.

```vue
<template>
    <ButtonPagination 
        v-model:items-per-page="currentItemsPerPage"
    />
</template>

<script setup lang="ts">
const currentItemsPerPage = ref(10)
</script>
```

- **Type:** `number`
- **Default:** `10`

### showRowsPerPage

If set to true, the component will display the rows per page dropdown. 

```vue
<template>
    <ButtonPagination 
        :showRowsPerPage="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### rowsPerPageLabel

Sets the label for the rows per page dropdown.

```vue
<template>
    <ButtonPagination 
        rowsPerPageLabel="Rows"
    />
</template>
```

- **Type:** `string`

### rowsPerPageOptions

Sets the options for the rows per page dropdown.

By default, it uses this following options:
- 5
- 10
- 25
- 50
- 100

```vue
<template>
    <ButtonPagination 
        :rowsPerPageOptions="customRowsPerPageOptions"
    />
</template>

<script setup lang="ts">
const customRowsPerPageOptions: PaginationRowPerPageOption[] = [
    {
        text: "5",
        value: 5
    },
    {
        text: "10",
        value: 10
    },
    {
        text: "25",
        value: 25
    },
]
</script>
```

- **Type:** `PaginationRowPerPageOption[]`

#### TypeScript interface
```ts
interface PaginationRowPerPageOption {
    text: string
    value: number
}
```

### resultTextMultiplePages

Sets the result text for multiple pages.

```vue
<template>
    <ButtonPagination 
        :resultTextMultiplePages="Showing {from} to {to} of {total} results"
    />
</template>
```

- **Type:** `string`

### resultTextSinglePage

Sets the result text for a single page.

```vue
<template>
    <ButtonPagination 
        :resultTextSinglePage="Showing {total} results"
    />
</template>
```

- **Type:** `string`

### resultTextSingleItem

Sets the result text for a single item.

```vue
<template>
    <ButtonPagination 
        :resultTextSingleItem="Showing {total} result"
    />
</template>
```

- **Type:** `string`