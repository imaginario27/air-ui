<template>
    <div 
        :class="[
            'flex',
            'flex-col',
            'gap-4',
            dividedRows && '!gap-0 divide-y divide-border-neutral-subtle border-b border-border-neutral-subtle'
        ]"
    >
    <h3
        :class="[
            'form-field-group-title',
            'font-semibold',
            'text-text-neutral-subtle',
            dividedRows && 'mb-4'
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
    dividedRows: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})
</script>
