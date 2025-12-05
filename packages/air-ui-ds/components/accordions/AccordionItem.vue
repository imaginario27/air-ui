<template>
    <div class="w-full flex flex-col gap-2 py-3">
        <div class="accordion-header flex justify-between gap-4 hover:cursor-pointer" @click="toggle">
            <span class="font-semibold mt-1">
                {{ title }}
            </span>
            
            <!-- This button does not have click event because the toggle is being controlled by the accordeon header div-->
            <ActionIconButton 
                :icon="isOpen ? 'mdiMinus' : 'mdiPlus'"
                :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                :size="ButtonSize.MD" 
            />
        </div>

        <VerticalExpansionTransition v-show="isOpen">
            <p class="text-sm">
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

// Composables
const { isOpen, toggle } = useAccordion()
</script>
