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
                :maxLength="FormFieldMaxLength.SEARCH"
                @close="updateModelValue(false)"
            />

            <!-- Recent searches -->
            <div
                v-if="recentSearches.length && searchValue === ''"
                :class="['pb-4', 'px-3', 'overflow-y-auto', 'max-h-[300px]']"
            >
                <section class="flex flex-col gap-1 pt-4">
                    <h2 class="px-3 pb-1 text-sm font-semibold text-text-neutral-subtle">
                        {{ recentsTitle }}
                    </h2>

                    <SearchModalRecentItem
                        v-for="(item, index) in recentSearches"
                        :key="item.to"
                        :text="item.text"
                        :breadcrumbs="item.breadcrumbs"
                        @remove-item="removeRecentSearchItem(index)"
                        @item-clicked="handleResultClick(item)"
                    />
                </section>
            </div>

            <!-- Results / Empty states -->
            <div v-else :class="['pb-4', 'px-3', 'overflow-y-auto', 'max-h-[300px]']">
                <!-- Empty state: no recents + not searching -->
                <div
                    v-if="searchValue === '' && !recentSearches.length"
                    :class="['flex', 'items-center', 'justify-center', 'py-16']"
                >
                    <p class="text-text-neutral-subtle text-center">
                        {{ noRecentsSearchesText }}
                    </p>
                </div>

                <!-- Searching / Results -->
                <template v-else>
                    <div v-if="results.length" class="flex flex-col gap-4 pt-4">
                        <section v-for="group in resultGroups" :key="group.title" class="flex flex-col gap-1">
                            <h2 class="px-3 pb-1 text-sm font-semibold text-text-neutral-subtle">
                                {{ group.title }}
                            </h2>

                            <SearchModalResultItem
                                v-for="item in group.items"
                                :key="item.to"
                                :text="item.text"
                                :breadcrumbs="item.breadcrumbs"
                                :to="item.to"
                                :sections="item.sections"
                                :query="debouncedSearchValue"
                                :activeTo
                                @item-clicked="selectResult"
                                @hover="activeTo = $event"
                            />
                        </section>
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

const { searchValue, debouncedSearchValue, recentSearches, results } = storeToRefs(searchStore)

const { setResults, clearResults, addToRecentSearch, removeRecentSearchItem } = searchStore

// Fuse composable
const { init, search } = useFuseContentSearch()

// Emits
const emit = defineEmits(['update:modelValue'])

const updateModelValue = (value: boolean) => {
    emit('update:modelValue', value)
}

// States
const activeTo = ref<string>()

// Computed
const resultGroups = computed(() => {
    const groups = new Map<string, SearchItem[]>()

    for (const item of results.value) {
        groups.set(item.badgeText, [...(groups.get(item.badgeText) ?? []), item])
    }

    return [...groups].map(([title, items]) => ({ title, items }))
})

const entries = computed(() =>
    resultGroups.value.flatMap((group) =>
        group.items.flatMap((item) => [
            { to: item.to, item },
            ...(item.sections ?? []).map((section) => ({
                to: section.to,
                item: { ...item, text: `${item.text} > ${section.text}`, to: section.to, sections: undefined },
            })),
        ]),
    ),
)

// Methods
const handleResultClick = async (item: SearchItem) => {
    if (!item.to) return

    addToRecentSearch(item)
    updateModelValue(false)

    await navigateTo(item.to)
}

const selectResult = (to: string) => {
    const entry = entries.value.find((e) => e.to === to)

    if (entry) handleResultClick({ ...entry.item, sections: undefined })
}

const moveActive = (step: 1 | -1) => {
    if (!entries.value.length) return

    const current = entries.value.findIndex((e) => e.to === activeTo.value)
    const next = (current + step + entries.value.length) % entries.value.length

    activeTo.value = entries.value[next]?.to

    nextTick(() => {
        document.querySelector(`[data-search-to="${CSS.escape(activeTo.value ?? '')}"]`)?.scrollIntoView({
            block: 'nearest',
        })
    })
}

const handleCloseSearchModalKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        event.preventDefault()
        updateModelValue(false)
        return
    }

    if (!props.modelValue || !searchValue.value || !results.value.length) return

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        moveActive(event.key === 'ArrowDown' ? 1 : -1)
    } else if (event.key === 'Enter' && activeTo.value) {
        event.preventDefault()
        selectResult(activeTo.value)
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

watch(results, () => {
    activeTo.value = entries.value[0]?.to
})

// Perform search
watch(debouncedSearchValue, async (value) => {
    if (!value) {
        clearResults()
        return
    }

    const items = await search(value)

    // Ignore the response if the user kept typing while searching
    if (value === debouncedSearchValue.value) {
        setResults(items)
    }
})
</script>
