<template>
    <div 
        :class="[
            'flex',
            'gap-column-gap',
            'flex-col',
            'md:flex-row',
            spaced && 'py-6'
        ]"
    >
        <slot />
    </div>
</template>
<script setup lang="ts">
// Props
defineProps({
    spaced: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})
</script>