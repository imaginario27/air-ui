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
    gapClass: {
        type: String as PropType<string>,
        default: 'gap-6',
    },
})

// Computed classes
const gridClasses = computed(() => getGridClasses(props.cols, props.tabletCols, props.mobileCols, props.gapClass))
</script>
