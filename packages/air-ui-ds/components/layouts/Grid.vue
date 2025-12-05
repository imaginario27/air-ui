<template>
    <div :class="gridClasses">
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    cols: { // Desktop
        type: Number as PropType<number>,
        default: 3, 
    },
    tabletCols: {
        type: Number as PropType<number>,
        default: 2,
    },
    mobileCols: {
        type: Number as PropType<number>,
        default: 1,
    },
})

// Computed classes
const gridClasses = computed(() => getGridClasses(props.cols, props.tabletCols, props.mobileCols))
</script>
