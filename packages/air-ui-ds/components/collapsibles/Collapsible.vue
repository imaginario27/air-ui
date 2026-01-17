<template>
    <div class="w-full flex flex-col gap-2 py-3">
        <div class="collapsible-header flex justify-between gap-4 hover:cursor-pointer" @click="toggle">
            <span class="font-semibold mt-1">
                {{ title }}
            </span>
            
            <!-- This button does not have click event because the toggle is being controlled by the accordeon header div-->
            <ActionIconButton 
                :icon="isOpen ? 'mdi:unfold-less-horizontal' : 'mdi:unfold-more-horizontal'"
                :styleType="ButtonStyleType.NEUTRAL_OUTLINED"
                :size="ButtonSize.MD" 
            />
        </div>

        <VerticalExpansionTransition v-show="isOpen">
            <slot />
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
})

// Composables
const { isOpen, toggle } = useAccordion()
</script>
