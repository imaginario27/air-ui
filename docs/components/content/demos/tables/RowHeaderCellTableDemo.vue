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
