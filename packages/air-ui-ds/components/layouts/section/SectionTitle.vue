<template>
    <h2 class="text-xl font-semibold">
        {{ title }}
    </h2>
</template>
<script setup lang="ts">
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Title',
    },
})
</script>