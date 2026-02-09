<template>
    <tr 
        :class="[
            isHoverable && 'hover:bg-background-neutral-subtlest',
            isStripped && 'even:bg-background-neutral-subtlest',
        ]">
        <slot />
    </tr>
</template>
<script setup lang="ts">
// Props
defineProps({
    isHoverable: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isStripped: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})
</script>