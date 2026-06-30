<template>
    <component :is="headingTag" class="text-xl font-semibold">
        {{ title }}
    </component>
</template>
<script setup lang="ts">
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Title',
    },
    headingTag: {
        type: String as PropType<HeadingTag>,
        default: 'h2',
        validator: (value: string ) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value as string)
    },
})
</script>