<template>
    <div
        :class="[
            'flex items-center gap-3 w-full',
            'px-3 py-2',
            'text-sm font-semibold text-text-neutral-subtle',
            'border-b border-border-default',
            'select-none',
        ]"
    >
        <Icon
            v-if="icon"
            :name="icon"
            iconClass="!text-icon-neutral-subtle"
        />

        <span>{{ text }}</span>
    </div>
</template>
<script setup lang="ts">
defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Section title',
    },
    icon: String as PropType<string>,
})
</script>
