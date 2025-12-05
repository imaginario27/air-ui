<template>
    <div v-if="visible" class="flex items-center justify-center gap-3">
        <span class="text-sm">
            {{ rowsLabel }}
        </span>
        <DropdownSelect 
            :modelValue
            :options="rowsOptions" 
            class="w-full min-w-[80px]"
            :dropdownPosition="DropdownPosition.TOP"
            @update:modelValue="(value) => emit('update:modelValue', value)"
        />
    </div>
</template>

<script setup lang="ts">
// Props
defineProps({
    visible: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    modelValue: {
        type: Number as PropType<number>,
        default: 10,
    },
    rowsLabel: {
        type: String as PropType<string>,
        default: 'Rows',
    },
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
        ]
    }
})

// Emits
const emit = defineEmits(["update:modelValue"])
</script>
