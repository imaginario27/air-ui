## Usage
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
]

// Computed
const paginatedData = computed(() =>
    getPaginatedData(exampleTableData, currentPage.value, currentItemsPerPage.value)
)
</script>
```

## Type definition
```ts
/**
 * Returns a paginated subset of an array.
 *
 * @template T - The type of items in the array.
 * @param data - The full array of data items.
 * @param currentPage - The current page number (1-based).
 * @param itemsPerPage - The number of items per page.
 * @param itemsLimit - Optional maximum number of items to consider before pagination.
 * @returns The paginated array of items.
 */
export declare function getPaginatedData<T>(
    data: T[],
    currentPage: number,
    itemsPerPage: number,
    itemsLimit?: number,
): T[]
```