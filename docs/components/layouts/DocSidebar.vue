<template>
    <aside 
        v-bind="attrs"
        :class="[
            'flex',
            'flex-col',
            'gap-6',
            'w-full',
            'pt-12',
            'pb-8',
            'px-content-side-padding-mobile md:px-content-side-padding',
            'bg-background-surface',
            'fixed right-0',
            'overflow-y-auto',
        ]"
        :style="{
            maxWidth: maxWidth + 'px',
            height: `calc(100vh - ${topOffset}px)`,
        }"
    >
        <TableOfContents
            :title="tocTitle"
            :links="tocLinks"
            class="gap-0!"
        />

        <!-- Community -->
        <div 
            :class="[
                'flex flex-col',
                'gap-4',
                'text-sm'
            ]"
        >
            <span
                class="font-semibold text-text-default"
            >
                Community
            </span>

            <ul class="w-full flex flex-col gap-2">
                <DocSidebarListItem 
                    text="Suggestions & Feedback"
                    icon="mdi-lightbulb-on-outline"
                    :actionType="ListItemActionType.ACTION"
                    @click="handleOpenFeedbackModal(FeedbackType.SUGGESTION)"
                />
                <DocSidebarListItem 
                    text="Report an issue"
                    icon="mdi-alert-circle-outline"
                    :actionType="ListItemActionType.ACTION"
                    @click="handleOpenFeedbackModal(FeedbackType.BUG)"
                />
            </ul>
        </div>
    </aside>
    
    <FeedbackModalDialog 
        v-if="feedbackModalType"
        v-model="showSuggestionModal"
        :type="feedbackModalType"
    />
</template>º
<script setup lang="ts">
// Options
defineOptions({
    inheritAttrs: false,
})

// Props
defineProps({
    tocTitle: String as PropType<string>,
    tocLinks: Array as PropType<TOCLink[]>,
    maxWidth: {
        type: Number as PropType<number>,
        default: 240,
    },
    topOffset: {
        type: Number,
        default: 0,
    },
})

// States
const showSuggestionModal = ref(false)
const feedbackModalType = ref<FeedbackType | null>(null)

// Composables
const attrs = useAttrs()

// Handlers
const handleOpenFeedbackModal = (type: FeedbackType) => {
    feedbackModalType.value = type
    showSuggestionModal.value = true
}
</script>