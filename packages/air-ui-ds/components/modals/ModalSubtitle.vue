<template>
    <h3 class="font-semibold text-text-neutral-subtle">
        {{ title }}
    </h3>
</template>
<script setup lang="ts">
// Props
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Modal subtitle',
    },
})
</script>