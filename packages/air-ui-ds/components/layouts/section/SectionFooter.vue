<template>
    <div 
        :class="[
            'flex', 
            'flex-col md:flex-row',
            'w-full',
            'justify-between',
            'gap-4',
            hasBorder && [
                'pt-4 mt-4',
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
        default: false
    }
})

// Composables
const darkModeStore = useDarkMode()
const { isDark } = darkModeStore
</script>