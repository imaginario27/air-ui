<template>
    <Section>
        <SectionBody>
            <div
                :class="[
                    'flex',
                    'flex-col',
                    'gap-6',
                    'border-t border-border-neutral-subtle',
                    'pt-6',
                ]"
            >
                <div
                    :class="[
                        'flex',
                        'flex-col',
                        'gap-2',
                    ]"
                >
                    <Heading 
                        :size="HeadingSize.XS"
                        title="Help improve the product"
                        headingTag="h3"
                    />
 
                    <p
                        :class="[
                            'text-sm',
                            'text-text-neutral-subtle',
                        ]"
                    >
                        Share your ideas or report issues to help make the product better.
                    </p>
                </div>

                <div
                    :class="[
                        'flex',
                        'flex-col',
                        'sm:flex-row',
                        'gap-3',
                    ]"
                >
                    <ActionButton
                        icon="mdi-lightbulb-on-outline"
                        :iconPosition="IconPosition.LEFT"
                        text="Have suggestions?"
                        :size="ButtonSize.LG"
                        isRounded
                        class="w-full sm:w-auto"
                        @click="handleOpenFeedbackModal(FeedbackType.SUGGESTION)"
                    />

                    <ActionButton
                        icon="mdi-alert-circle-outline"
                        :iconPosition="IconPosition.LEFT"
                        text="Report an issue"
                        :size="ButtonSize.LG"
                        isRounded
                        class="w-full sm:w-auto"
                        @click="handleOpenFeedbackModal(FeedbackType.BUG)"
                    />
                </div>
            </div>
        </SectionBody>
    </Section>

    <FeedbackModalDialog 
        v-if="feedbackModalType"
        v-model="showSuggestionModal"
        :type="feedbackModalType"
    />
</template>
<script setup lang="ts">
// States
const showSuggestionModal = ref(false)
const feedbackModalType = ref<FeedbackType | null>(null)

// Handlers
const handleOpenFeedbackModal = (type: FeedbackType) => {
    feedbackModalType.value = type
    showSuggestionModal.value = true
}
</script>