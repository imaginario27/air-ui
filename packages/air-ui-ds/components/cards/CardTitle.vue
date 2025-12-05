<template>
    <h3 class="font-semibold w-full">
        {{ title }}
    </h3>
</template>
<script setup lang="ts">
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Card title'
    }
})
</script>