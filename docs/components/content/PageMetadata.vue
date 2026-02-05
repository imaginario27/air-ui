<template>
    <div class="mt-4">
        <table class="table-auto w-full">
            <tbody>
                <tr v-if="data.category">
                    <td :class="[labelCellClass, cellClass]">Category:</td>
                    <td :class="cellClass">
                        <Badge :text="data.category" />
                    </td>
                </tr>

                <tr v-if="data.tags?.length">
                    <td :class="[labelCellClass, cellClass]">Tags:</td>
                    <td :class="cellClass">
                        <span>{{ data.tags.join(', ') }}</span>
                    </td>
                </tr>

                <tr v-if="data.updatedAt">
                    <td :class="[labelCellClass, cellClass]">Updated:</td>
                    <td :class="cellClass">
                        <span>{{ data.updatedAt }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
// Props
defineProps({
    data: {
        type: Object as PropType<PageMetadata>,
        default: () => ({}),
    },
})

// Shared classes
const labelCellClass = [
    'pr-4',
    'align-top',
    'font-semibold',
    'text-left',
    'whitespace-nowrap',
    'w-[1%]',
]

const cellClass = [
    'py-1.5',
]
</script>
