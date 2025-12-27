<template>
    <div 
        :class="[
            'flex',
            'flex-col',
            'gap-4',
            'mt-2',
        ]"
    >
    <h3
        :class="[
            'form-field-group-title',
            'font-semibold',
            'text-text-neutral-subtle',
        ]"
    >
            {{ title }}
        </h3>
        <slot />
    </div>
</template>
<script setup lang="ts">
// Props
defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Group title',
    },
})
</script>
