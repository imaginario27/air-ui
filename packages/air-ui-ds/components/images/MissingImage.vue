<template>
    <div
        role="img"
        :aria-label="alt"
        :class="[
            'flex items-center justify-center shrink-0 overflow-hidden',
            'bg-background-neutral-subtle border border-border-default',
            'text-icon-default',
        ]"
    >
        <Icon name="mdi:image-off-outline" :iconClass="['w-3/5', 'h-3/5', 'min-w-0', 'min-h-0']" />
    </div>
</template>

<script setup lang="ts">
// Props
defineProps({
    alt: {
        type: String as PropType<string>,
        default: undefined,
    },
})
</script>
