<template>
    <h2 class="font-bold pr-10">
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
