<template>
    <p
        v-if="error || text"
        :class="[
            'text-xs text-left',
            error ? 'text-text-error' : 'text-text-neutral-subtle',
        ]"
    >
        {{ error || text }}
    </p>
</template>

<script setup lang="ts">
defineProps({
    text: String as PropType<string>,
    error: {
        type: String as PropType<string>,
        default: '',
    },
})
</script>
