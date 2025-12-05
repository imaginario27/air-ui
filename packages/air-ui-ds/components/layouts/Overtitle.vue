<template>
    <span 
        :class="[
            'text-text-primary-brand-default',
            'text-sm',
            'font-medium',
            isUppercase && 'uppercase',
        ]"
    >
        {{ title }}
    </span>
</template>
<script setup lang="ts">
// Props
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Overtitle'
    },
    isUppercase: {
        type: Boolean as PropType<boolean>,
        default: true,
    }
})
</script>