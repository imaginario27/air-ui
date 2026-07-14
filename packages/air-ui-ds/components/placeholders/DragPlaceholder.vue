<template>
    <div
        :class="[
            'w-full',
            'flex items-center justify-center',
            'rounded-lg',
            'border border-dashed border-border-default',
            'p-2'
        ]"
    >
        <span
            v-if="showText && text"
            :class="['text-xs', 'text-text-neutral-subtle', 'select-none', textClass]"
        >
            {{ text }}
        </span>
    </div>
</template>

<script setup lang="ts">
// Props
defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Drop here',
    },
    showText: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    textClass: String as PropType<string>,
})
</script>
