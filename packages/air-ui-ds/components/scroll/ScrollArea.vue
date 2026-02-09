<template>
    <div
        :class="[
            'scrollbar',
            'w-full',
            'flex flex-col',
            'relative',
            'overscroll-contain',
            'scroll-smooth',
            'p-4',
            orientationClasses,
            hasBorder && 'border border-border-default rounded-md',
        ]"
        :style="{ maxHeight: `${maxHeight}px` }"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    scrollOrientation: {
        type: String as PropType<ScrollOrientation>,
        default: ScrollOrientation.VERTICAL,
        validator: (value: ScrollOrientation) => Object.values(ScrollOrientation).includes(value),
    },
    maxHeight: {
        type: Number as PropType<number>,
        default: 300,
    },
    hasBorder: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
})

// Computed classes
const orientationClasses = computed(() => {
    const variant = {
        [ScrollOrientation.VERTICAL]: 'overflow-y-auto overflow-x-hidden',
        [ScrollOrientation.HORIZONTAL]: 'overflow-x-auto overflow-y-hidden',
        [ScrollOrientation.BOTH]: 'overflow-auto',
    }

    return variant[props.scrollOrientation as ScrollOrientation] || 'gap-2'
})
</script>

<style scoped>
/* WebKit browsers */
.scrollbar::-webkit-scrollbar {
    width: var(--scrollbar-width, 8px);
    height: var(--scrollbar-width, 8px);
}

.scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 9999px;
}

/* Firefox */
.scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.25) transparent;
}
</style>
