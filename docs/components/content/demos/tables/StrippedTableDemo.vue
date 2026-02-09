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
]

// Computed
const paginatedData = computed(() =>
    getPaginatedData(exampleTableData, currentPage.value, currentItemsPerPage.value)
)
</script>
