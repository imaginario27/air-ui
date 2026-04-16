<template>
    <kbd
        :class="[
            'inline-flex',
            'items-center',
            'justify-center',
            'rounded',
            'border',
            'border-border-default',
            'px-1.5',
            'py-0.5',
            'text-xs',
            'font-semibold',
            'leading-none',
            'text-text-neutral-subtle',
            'whitespace-nowrap',
            'select-none',
        ]"
    >
        {{ text }}
    </kbd>
</template>

<script setup lang="ts">
// Props
defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Enter',
    },
})
</script>