<template>
    <main 
        :class="[
            'flex',
            'flex-col',
            'gap-3',
            'w-full',
            'scroll-smooth',
        ]"
        :style="!isMobile && `max-width: calc(100% - ${tocSidebarWidth}px)`"
    >
        <slot />
    </main>
</template>

<script setup lang="ts">
// Props
defineProps({
    tocSidebarWidth: {
        type: Number as PropType<number>,
        default: 240
    }
})

// Composable
const { isMobile } = useIsMobile()
</script>