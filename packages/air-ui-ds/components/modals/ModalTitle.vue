<template>
    <h2 class="font-bold">
        {{ title }}
    </h2>
</template>
<script setup lang="ts">
// Props
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Modal title',
    },
})
</script>