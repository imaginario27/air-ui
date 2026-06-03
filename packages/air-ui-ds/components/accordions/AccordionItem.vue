<template>
    <div class="w-full flex flex-col gap-2 py-3">
        <button
            type="button"
            :id="headerId"
            class="accordion-header w-full flex justify-between gap-4 hover:cursor-pointer text-left"
            :aria-expanded="isOpen"
            :aria-controls="panelId"
            @click="toggle"
        >
            <span class="font-semibold mt-1">
                {{ title }}
            </span>

            <ActionIconButton
                :icon="isOpen ? 'mdi:minus' : 'mdi:plus'"
                :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                :size="ButtonSize.MD"
                tabindex="-1"
                aria-hidden="true"
            />
        </button>

        <VerticalExpansionTransition v-show="isOpen">
            <p :id="panelId" role="region" :aria-labelledby="headerId" class="text-sm">
                {{ content }}
            </p>
        </VerticalExpansionTransition>
    </div>
</template>

<script setup lang="ts">
// Props
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Item title'
    },
    content: {
        type: String as PropType<string>,
        default: 'Item content'
    }
})

// IDs
const headerId = useId()
const panelId = useId()

// Composables
const { isOpen, toggle } = useAccordion()
</script>
