<template>
    <nav class="flex items-center justify-center gap-2">
        <ActionIconButton
            icon="mdi:chevron-left"
            :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
            :disabled="modelValue === 1"
            :ariaLabel="previousPageAriaLabel"
            :class="[
                'bg-transparent transition-colors duration-200 ease-out',
                modelValue > 1 && 'hover:border border-border-default',
            ]"
            @click="goToPreviousPage"
        />
        <p class="text-sm">
            {{ computedResultsText }}
        </p>
        <ActionIconButton
            icon="mdi:chevron-right"
            :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
            :disabled="modelValue === totalPages"
            :ariaLabel="nextPageAriaLabel"
            :class="[
                'bg-transparent transition-colors duration-200 ease-out',
                modelValue < totalPages && 'hover:border border-border-default',
            ]"
            @click="goToNextPage"
        />
    </nav>
</template>

<script setup lang="ts">

// Props
const props = defineProps({
    modelValue: {
        type: Number as PropType<number>,
        required: true,
    },
    totalItems: {
        type: Number as PropType<number>,
        required: true,
    },
    itemsPerPage: {
        type: Number as PropType<number>,
        required: true,
    },
    resultTextMultiplePages: {
        type: String as PropType<string>,
        default: 'Showing {from} to {to} of {total} results',
    },
    resultTextSinglePage: {
        type: String as PropType<string>,
        default: 'Showing {total} results',
    },
    resultTextSingleItem: {
        type: String as PropType<string>,
        default: 'Showing {total} result',
    },
    previousPageAriaLabel: {
        type: String as PropType<string>,
        default: 'Previous page',
    },
    nextPageAriaLabel: {
        type: String as PropType<string>,
        default: 'Next page',
    },
})

// Emits
const emit = defineEmits(["update:modelValue"])

// Computed
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const from = computed(() => (props.modelValue - 1) * props.itemsPerPage + 1)
const to = computed(() => Math.min(props.modelValue * props.itemsPerPage, props.totalItems))

const computedResultsText = computed(() => {
    if (props.totalItems > props.itemsPerPage) {
        return props.resultTextMultiplePages
            .replace('{from}', from.value.toString())
            .replace('{to}', to.value.toString())
            .replace('{total}', props.totalItems.toString())
    }

    if (props.totalItems === 1) {
        return props.resultTextSingleItem
            .replace('{total}', '1')
    }

    return props.resultTextSinglePage
        .replace('{total}', props.totalItems.toString())
})

// Handlers
const goToPreviousPage = () => {
    if (props.modelValue > 1) {
        emit("update:modelValue", props.modelValue - 1)
    }
}

const goToNextPage = () => {
    if (props.modelValue < totalPages.value) {
        emit("update:modelValue", props.modelValue + 1)
    }
}
</script>