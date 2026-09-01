<template>
    <nav
        :class="[
            'flex',
            'flex-col',
            'gap-1',
            'w-full',
            'px-6',
            !isCollapsed && 'overflow-y-auto scrollbar-gutter-stable',
        ]"
    >
        <slot />
    </nav>
</template>
<script setup lang="ts">
// Props
defineProps({
    isCollapsed: {
        type: Boolean as PropType<boolean>,
        default: false,
    }, 
})
</script>