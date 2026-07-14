<template>
    <div 
        :class="[
            'flex flex-col gap-5',
            'bg-background-container-surface',
            'p-4',
            hasBorder ? 'border border-border-default' : undefined,
            'rounded-lg',
            hasShadow ? 'shadow-sm' : undefined,
            'w-full',
            hasBackgroundHover && 'transition-colors duration-200 hover:bg-background-neutral-subtlest/40',
        ]"
    >
        <slot />
    </div>
</template>
<script setup lang="ts">
// Props
defineProps({
    hasShadow: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasBorder: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasBackgroundHover: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})
</script>