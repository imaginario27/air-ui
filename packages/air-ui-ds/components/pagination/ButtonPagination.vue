<template>
    <div 
        :class="[
            'flex',
            'justify-between',
            'items-center',
            'gap-3',
            isMobile ? 'flex-col-reverse' : 'flex-row',
            'w-full'
        ]"
    >
        <div
            :class="[
                'flex',
                'items-center',
                'justify-between',
                'gap-4',
                'w-full'
            ]"
        >
            <p class="text-text-neutral-subtle text-xs xs:text-sm">
                {{ renderedResultsText }}
            </p>
            <RowsPerPage 
                v-model="itemsPerPage" 
                :rowsLabel="rowsPerPageLabel"
                :rowsOptions="rowsPerPageOptions"
                :class="[isMobile ? 'flex' : 'hidden']"
            /> <!-- Mobile position -->
        </div>

        <div 
            v-if="totalItems > 5"
            :class="[
                'flex',
                'gap-6',
                isMobile ? 'flex-col w-full' : 'flex-row w-auto'
            ]"
        >
            <RowsPerPage 
                v-if="showRowsPerPage"
                v-model="itemsPerPage"
                :rowsLabel="rowsPerPageLabel"
                :rowsOptions="rowsPerPageOptions"
                :class="[isMobile ? 'hidden' : 'flex']"
            />
            <nav 
                v-if="totalItems > itemsPerPage"
                :class="[
                    'flex',
                    styleType === ButtonPaginationStyle.BUTTON && 'border border-border-default rounded',
                    'overflow-hidden'
                ]"
            >
                <!-- Previous Button -->
                <PaginationButton 
                    :styleType
                    :disabled="modelValue === 1" 
                    @click="goToPreviousPage"
                >
                    <Icon
                        name="mdi:chevron-left"
                        iconClass="text-icon-neutral-subtle"
                    />
                </PaginationButton>

                <!-- Pagination Button Loop -->
                <PaginationButton
                    v-for="page in visiblePages"
                    :key="page"
                    :styleType
                    :class="[
                        styleType === ButtonPaginationStyle.BUTTON && 'border border-border-default',
                        page === modelValue ? [
                            styleType === ButtonPaginationStyle.BUTTON && 'bg-background-primary-brand-active',
                            'text-text-neutral-on-filled',
                            'font-semibold',
                            styleType === ButtonPaginationStyle.OVERLINE && 'border-t-2',
                            styleType === ButtonPaginationStyle.BUTTON ? 
                                'hover:bg-background-primary-brand-hover' 
                                : 'hover:!bg-background-primary-brand-soft',
                            '!border-background-primary-brand-active'
                        ] : [
                            'hover:bg-background-neutral-subtle',
                            'hover:text-text-default'
                        ],
                        page === '...' ? 'cursor-default hover:!cursor-not-allowed hover:!bg-transparent' : 'cursor-pointer',
                    ]"
                    @click="() => handlePageClick(page)"
                >
                    <span 
                        v-if="page !== '...'"
                        :class="[
                            'transition-colors duration-200',
                            page === modelValue ? 
                                (
                                    styleType === ButtonPaginationStyle.BUTTON 
                                        ? 'text-text-on-filled' 
                                        : 'text-text-primary-brand-active'
                                ) 
                                : (
                                    styleType === ButtonPaginationStyle.BUTTON 
                                        ? 'text-text-default' 
                                        : 'text-text-neutral-inactive'
                                ) 
                        ]"
                    >
                        {{ page }}
                    </span>
                    <span v-else class="text-text-neutral-subtle opacity-50">...</span>
                </PaginationButton>

                <!-- Next Button -->
                <PaginationButton 
                    :styleType
                    :disabled="modelValue === totalPages"
                    @click="goToNextPage"
                >
                    <Icon 
                        name="mdi:chevron-right"
                        iconClass="text-icon-neutral-subtle"
                    />
                </PaginationButton>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    styleType: {
        type: String as PropType<ButtonPaginationStyle>,
        default: ButtonPaginationStyle.BUTTON,
        validator: (value: ButtonPaginationStyle) => Object.values(ButtonPaginationStyle).includes(value),
    },
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
        default: 10,
    },
    showRowsPerPage: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    rowsPerPageLabel: String as PropType<string>,
    rowsPerPageOptions: Array as PropType<PaginationRowPerPageOption[]>,
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
    mobileBreakpoint: {
        type: Number as PropType<number>,
        default: 1024,
    },
})

// Composables
const { isMobile } = useIsMobile(() => props.mobileBreakpoint)

// States
const itemsPerPage = ref(props.itemsPerPage)

// Emits
const emit = defineEmits(["update:modelValue", "update:itemsPerPage"])

// Computed
const totalPages = computed(() => Math.ceil(props.totalItems / itemsPerPage.value))

// Visible pages logic with ellipsis
const visiblePages = computed(() => {
    const pages = []
    const currentPage = props.modelValue
    const total = totalPages.value

    if (isMobile.value) {
        const startPage = Math.max(1, currentPage - 1)
        const endPage = Math.min(total, currentPage + 2)

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

    } else {
        // Desktop: Include ellipsis with a maximum of 7 pages
        const maxPagesDesktop = 7

        if (total <= maxPagesDesktop) {
            for (let i = 1; i <= total; i++) pages.push(i)
        } else {
            if (currentPage <= Math.floor(maxPagesDesktop / 2)) {
                for (let i = 1; i <= maxPagesDesktop - 2; i++) pages.push(i)
                pages.push('...', total)
            } else if (currentPage >= total - Math.floor(maxPagesDesktop / 2)) {
                pages.push(1, '...')
                for (let i = total - (maxPagesDesktop - 3); i <= total; i++) pages.push(i)
            } else {
                pages.push(1, '...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
                pages.push('...', total)
            }
        }
    }
    return pages
})

const from = computed(() => (props.modelValue - 1) * itemsPerPage.value + 1)
const to = computed(() => Math.min(props.modelValue * itemsPerPage.value, props.totalItems))

const renderedResultsText = computed(() => {
    // Multi-page case
    if (props.totalItems > itemsPerPage.value) {
        return props.resultTextMultiplePages
            .replace('{from}', from.value.toString())
            .replace('{to}', to.value.toString())
            .replace('{total}', props.totalItems.toString())
            .replace('{count}', props.totalItems === 1 ? 'result' : 'results')
    }

    // Single item case
    if (props.totalItems === 1) {
        return props.resultTextSingleItem
            .replace('{total}', '1')
            .replace('{count}', 'result')
    }

    // Single page with multiple results
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

const handlePageClick = (page: string | number) => {
    if (page === '...') return
    emit("update:modelValue", page)
}

// Watchers
watch(itemsPerPage, (newVal) => {
    emit('update:modelValue', 1) // Reset to page 1 when rows per page changes
    emit("update:itemsPerPage", newVal)
})
</script>