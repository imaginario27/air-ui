<template>
    <nav class="w-full flex flex-col gap-2 text-sm" :aria-label="resolvedAriaLabel">
        <span v-if="title" class="font-semibold text-text-default mb-4">
            {{ title }}
        </span>
        <ul class="w-full flex flex-col gap-2">
            <TableOfContentsItem
                v-for="(link, index) in links"
                :key="index"
                :link="link"
                :activeId
                @itemClick="$emit('itemClick')"
            />
        </ul>
    </nav>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    title: String as PropType<string>,
    links: {
        type: Array as PropType<TOCLink[]>,
        default: () => [],
    },
    ariaLabel: String as PropType<string>,
})

// Composables
const dsConfig = useDSConfig()

// Computed
const resolvedAriaLabel = computed(() => props.ariaLabel ?? dsConfig.navigation.tableOfContentsText())

// Emits
defineEmits(['itemClick'])

// Composable
const { activeId } = useTableOfContents()
</script>
