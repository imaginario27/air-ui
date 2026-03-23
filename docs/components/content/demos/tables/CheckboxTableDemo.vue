<template>
    <TableWrapper v-if="exampleTableData.length">
        <!-- Batch Actions Form -->
        <Form>
            <FormRow class="gap-2">
                <SelectField
                    id="batch-action"
                    v-model="selectedAction"
                    :options="batchActions"
                    placeholder="Select an action"
                    :disabled="selectedRows.size === 0"
                    selectBoxClass="!max-w-[200px]"
                />
                <ActionButton
                    v-if="selectedRows.size > 0"
                    text="Apply"
                    :styleType="ButtonStyleType.NEUTRAL_FILLED"
                    @click="handleBatchAction"
                />
            </FormRow>
        </Form>

        <!-- Table -->
        <Table>
            <TableHeader>
                <TableHeaderCell>
                    <Checkbox
                        id="header-select-all"
                        :modelValue="isAllSelected"
                        :size="ControlFieldSize.SM"
                        @update:modelValue="toggleSelectAll"
                    />
                </TableHeaderCell>
                <TableHeaderCell>Column 1</TableHeaderCell>
                <TableHeaderCell>Column 2</TableHeaderCell>
                <TableHeaderCell>Column 3</TableHeaderCell>
                <TableHeaderCell><!-- Cell actions --></TableHeaderCell>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(item, index) in paginatedData" :key="index">
                    <TableCell fitToContent>
                        <Checkbox
                            :id="`row-checkbox-${index}`"
                            :modelValue="selectedRows.has(getItemKey(item))"
                            :size="ControlFieldSize.SM"
                            @update:modelValue="toggleRowSelection(getItemKey(item), $event)"
                        />
                    </TableCell>
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
const selectedRows = ref<Set<string>>(new Set())
const selectedAction = ref<string | null>(null)

// Batch actions
const batchActions = [
    { label: 'Archive', value: 'archive', text: 'Archive' },
    { label: 'Delete', value: 'delete', text: 'Delete' },
    { label: 'Move to folder', value: 'move', text: 'Move to folder' },
    { label: 'Change status', value: 'status', text: 'Change status' },
]

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
    { col1: 'James Green', col2: 'james.green@example.com', col3: 'Active' },
    { col1: 'Harper Adams', col2: 'harper.adams@example.com', col3: 'Inactive' },
    { col1: 'Benjamin Baker', col2: 'benjamin.baker@example.com', col3: 'Active' },
    { col1: 'Ella Perez', col2: 'ella.perez@example.com', col3: 'Pending' },
    { col1: 'Lucas Campbell', col2: 'lucas.campbell@example.com', col3: 'Active' },
]

// Computed
const paginatedData = computed(() =>
    getPaginatedData(exampleTableData, currentPage.value, currentItemsPerPage.value)
)

const isAllSelected = computed(() => {
    if (exampleTableData.length === 0) return false
    return exampleTableData.every(item => selectedRows.value.has(getItemKey(item)))
})

// Helpers
const getItemKey = (item: any) => `${item.col1}-${item.col2}`

const toggleSelectAll = (shouldSelect: boolean) => {
    if (shouldSelect) {
        exampleTableData.forEach(item => {
            selectedRows.value.add(getItemKey(item))
        })
    } else {
        selectedRows.value.clear()
    }
}

const toggleRowSelection = (key: string, isSelected: boolean) => {
    if (isSelected) {
        selectedRows.value.add(key)
    } else {
        selectedRows.value.delete(key)
    }
}

const handleBatchAction = () => {
    if (!selectedAction.value) return

    const actionMap: Record<string, string> = {
        archive: 'archived',
        delete: 'deleted',
        move: 'moved',
        status: 'status changed',
    }

    const action = actionMap[selectedAction.value] || 'processed'
    const message = `${selectedRows.value.size} item(s) ${action}`

    console.log(message)
    console.log('Selected action:', selectedAction.value)
    console.log('Selected items:', Array.from(selectedRows.value))

    // Reset after action
    selectedRows.value.clear()
    selectedAction.value = null
}
</script>
