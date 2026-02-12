<template>
    <div 
        :class="[
            'flex flex-col gap-4 w-full pt-5',
            hasBorder && [
                'border-t',
                isDark ? 'border-border-default/70' : 'border-border-neutral-subtle',
            ]
        ]"
    >
        <slot />
    </div>
</template>
<script setup lang="ts">
// Props
defineProps({
    hasBorder: {
        type: Boolean as PropType<boolean>,
        default: true
    }
})

// Composables
const darkModeStore = useDarkMode()
const { isDark } = darkModeStore
</script>