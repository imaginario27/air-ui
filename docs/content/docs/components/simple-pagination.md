## Component

::component-code
---
srcDir: 'pagination/SimplePagination.vue'
props: 
    modelValue: 5
    totalItems: 200
    itemsPerPage: 10
    resultTextMultiplePages: "Showing {from} to {to} of {total} results"
    resultTextSinglePage: "Showing {total} results"
    resultTextSingleItem: "Showing {total} result"
    previousPageAriaLabel: "Previous page"
    nextPageAriaLabel: "Next page"
external:
  - modelValue
  - totalItems
  - itemsPerPage
externalTypes:
    - number
    - number
    - number
propsSettingsExcludedProps: ['modelValue', 'itemsPerPage']
previewBackground: 'white'
---
::

## Demo with table

::component-code
---
srcDir: 'content/demos/tables/SimplePaginationTableDemo.vue'
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
        <SimplePagination 
            v-model="currentPage"
            :itemsPerPage="currentItemsPerPage"
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
    ....
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
        "required": true,
        "type": "number"
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
    {
        "name": "previousPageAriaLabel",
        "default": "'Previous page'",
        "type": "string"
    },
    {
        "name": "nextPageAriaLabel",
        "default": "'Next page'",
        "type": "string"
    },
]
---
::


### modelValue

The v-model value of the component used to control the current page of the pagination.

```vue
<template>
    <SimplePagination v-model="currentPage" />
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
    <SimplePagination 
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

Seths the the number of items to be displayed per page.

```vue
<template>
    <SimplePagination 
        :itemsPerPage="currentItemsPerPage"
    />
</template>

<script setup lang="ts">
const currentItemsPerPage = ref(10)
</script>
```

- **Type:** `number`
- **Required:** `true`

### resultTextMultiplePages

Sets the result text for multiple pages.

```vue
<template>
    <SimplePagination 
        :resultTextMultiplePages="Showing {from} to {to} of {total} results"
    />
</template>
```

- **Type:** `string`

### resultTextSinglePage

Sets the result text for a single page.

```vue
<template>
    <SimplePagination 
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

### previousPageAriaLabel

The `previousPageAriaLabel` prop sets the accessible label for the previous page button. Override it for i18n.

```vue
<template>
    <SimplePagination 
        previousPageAriaLabel="Pagina anterior"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Previous page'`

### nextPageAriaLabel

The `nextPageAriaLabel` prop sets the accessible label for the next page button. Override it for i18n.

```vue
<template>
    <SimplePagination 
        nextPageAriaLabel="Pagina siguiente"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Next page'`