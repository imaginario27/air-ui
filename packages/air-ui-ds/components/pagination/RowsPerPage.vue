<template>
    <div v-if="visible" class="flex items-center justify-center gap-3">
        <span class="text-sm">
            {{ resolvedRowsLabel }}
        </span>
        <DropdownSelect
            :modelValue
            :options="rowsOptions"
            class="w-full min-w-[80px]"
            :dropdownPosition="Position.TOP"
            @update:modelValue="(value) => emit('update:modelValue', value)"
        />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    visible: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    modelValue: {
        type: Number as PropType<number>,
        default: 10,
    },
    rowsLabel: String as PropType<string>,
    rowsOptions: {
        type: Array as PropType<PaginationRowPerPageOption[]>,
        default: () => [
            {
                text: '5',
                value: 5,
            },
            {
                text: '10',
                value: 10,
            },
            {
                text: '25',
                value: 25,
            },
            {
                text: '50',
                value: 50,
            },
            {
                text: '100',
                value: 100,
            },
        ],
    },
})

// Composables
const dsConfig = useDSConfig()

// Computed
const resolvedRowsLabel = computed(() => props.rowsLabel ?? dsConfig.pagination.rowsText())

// Emits
const emit = defineEmits(['update:modelValue'])
</script>
