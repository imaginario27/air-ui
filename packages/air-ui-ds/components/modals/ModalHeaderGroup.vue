<template>
    <div 
        :class="[
            'flex flex-col gap-2', 
            centered && 'text-center'
        ]"
    >
        <slot />
    </div>
</template>
<script setup lang="ts">
// Props
defineProps({
    centered: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})
</script>