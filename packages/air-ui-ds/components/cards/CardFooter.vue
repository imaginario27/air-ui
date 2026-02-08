<template>
    <div 
        :class="[
            'flex flex-col gap-4 w-full pt-5',
            hasBorder && 'border-t border-border-neutral-subtle'
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
</script>