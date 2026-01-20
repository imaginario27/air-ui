<template>
    <ul 
        :class="[
            'w-full flex flex-col gap-2',
            hasSeparator && 'gap-0 divide-y divide-border-neutral-subtle border-y border-border-neutral-subtle',
            layout === ListLayout.GRID && gridClasses,
        ]"
    >
        <template v-if="items.length && !$slots.default">
            <ListItem 
                v-for="(item, index) in items" :key="index" 
                :markerIcon="listItemIcon"
                :markerIconClass="listItemIconClass"
                :size="listItemSize"
                :spaced="spaced"
            >
                {{ item }}
            </ListItem>
        </template>
        <slot v-else-if="$slots.default" />
    </ul>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    items: {
        type: Array as PropType<any>,
        default: () => ["Item 1", "Item 2", "Item 3"],
    },
    hasSeparator: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    layout: {
        type: String as PropType<ListLayout>,
        default: ListLayout.LIST,
        validator: (value: ListLayout) => Object.values(ListLayout).includes(value),
    },
    cols: { // Desktop
        type: Number as PropType<number>,
        default: 2, 
    },
    tabletCols: {
        type: Number as PropType<number>,
        default: 2,
    },
    mobileCols: {
        type: Number as PropType<number>,
        default: 1,
    },
    listItemIcon: String as PropType<string>,
    listItemIconClass: {
        type: String as PropType<string>,
        default: 'text-icon-secondary-brand-default'
    },
    listItemSize: {
        type: String as PropType<ListItemSize>,
        default: ListItemSize.SM, 
        validator: (value: ListItemSize) => Object.values(ListItemSize).includes(value),
    },
    spaced: {
        type: Boolean as PropType<boolean>,
        default: false
    },
})

// Computed classes
const gridClasses = computed(() => getGridClasses(props.cols, props.tabletCols, props.mobileCols))
</script>