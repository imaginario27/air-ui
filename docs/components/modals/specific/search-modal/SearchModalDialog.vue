<template>
    <ModalDialog 
        :modelValue="modelValue" 
        cardClass="!p-0 max-w-[700px] max-h-[400px]"
        containerClass="items-start md:items-center"
        :hasCornerCloseButton="false"
        @update:modelValue="updateModelValue"
    >
        <div class="flex flex-col gap-6">   
            <!-- Search Input -->
            <SearchModalInput
                v-model="searchValue"
                :isOpen="modelValue"
                :maxLength="FieldMaxLength.SEARCH"
                @close="updateModelValue(false)"
            />

            <!-- Recent searches -->
            <div
                v-if="recentSearches.length && searchValue === ''"
                :class="[
                    'pb-6',
                    'overflow-y-auto',
                    'max-h-[300px]',
                ]"
            >
                <h2 class="font-semibold mb-6 px-6">
                    {{ recentsTitle }}
                </h2>

                <SearchModalRecentItem
                    v-for="(item, index) in recentSearches"
                    :key="index"
                    :text="item.text"
                    :breadcrumbs="item.breadcrumbs"
                    :badgeText="item.badgeText"
                    :to="item.to"
                    @remove-item="removeRecentSearchItem(index)"
                />
            </div>

            <!-- Results / Empty states -->
            <div
                v-else
                :class="[
                    'pb-6',
                    'px-6',
                    'overflow-y-auto',
                    'max-h-[300px]',
                ]"
            >
                <!-- Empty state: no recents + not searching -->
                <div
                    v-if="searchValue === '' && !recentSearches.length"
                    :class="[
                        'flex',
                        'items-center',
                        'justify-center',
                        'py-16',
                    ]"
                >
                    <p class="text-text-neutral-subtle text-center">
                        {{ noRecentsSearchesText }}
                    </p>
                </div>

                <!-- Searching / Results -->
                <template v-else>
                    <h2 class="font-semibold mb-6">
                        {{ resultsTitle }}
                    </h2>

                    <div v-if="results.length" class="flex flex-col gap-3">
                        <SearchModalResultItem
                            v-for="(item, index) in results"
                            :key="index"
                            :text="item.text"
                            :breadcrumbs="item.breadcrumbs"
                            :badgeText="item.badgeText"
                            :to="item.to"
                            @item-clicked="handleResultClick(item)"
                        />
                    </div>

                    <p v-else class="text-center py-6">
                        {{ noResultsFoundText }}
                    </p>
                </template>
            </div>
        </div>
    </ModalDialog>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    recentsTitle: {
        type: String as PropType<string>,
        default: 'Recents',
    },
    resultsTitle: {
        type: String as PropType<string>,
        default: 'Results',
    },
    noResultsFoundText: {
        type: String as PropType<string>,
        default: 'No results found...',
    },
    noRecentsSearchesText: {
        type: String as PropType<string>,
        default: 'No recent searches',
    },
})

// Store
const searchStore = useSearchStore()

const {
    searchValue,
    debouncedSearchValue,
    recentSearches,
    results,
} = storeToRefs(searchStore)

const {
    setResults,
    clearResults,
    addToRecentSearch,
    removeRecentSearchItem,
} = searchStore

// Fuse composable
const { init, search } = useFuseContentSearch()

// Emits
const emit = defineEmits(['update:modelValue'])

const updateModelValue = (value: boolean) => {
    emit('update:modelValue', value)
}

// Methods
const handleResultClick = async (item: SearchItem) => {
    if (!item.to) return

    addToRecentSearch(item)
    updateModelValue(false)

    await navigateTo(item.to)
}


const handleCloseSearchModalKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        event.preventDefault()
        updateModelValue(false)
    }
}

const addCloseSearchModalKeyListener = () => {
    globalThis.addEventListener('keydown', handleCloseSearchModalKey)
}

const removeCloseSearchModalKeyListener = () => {
    globalThis.removeEventListener('keydown', handleCloseSearchModalKey)
}

onMounted(() => {
    addCloseSearchModalKeyListener()
})

onUnmounted(() => {
    removeCloseSearchModalKeyListener()
})

// Initialize Fuse only when modal opens
watch(
    () => props.modelValue,
    async (isOpen) => {
        if (isOpen) {
            await init()
        } else {
            clearResults()
        }
    },
)

// Perform search
watch(debouncedSearchValue, (value) => {
    if (!value) {
        clearResults()
        return
    }

    const items = search(value)
    setResults(items)
})
</script>