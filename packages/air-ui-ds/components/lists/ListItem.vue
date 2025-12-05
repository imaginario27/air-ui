<template>
    <li 
        :class="[
            'flex gap-2',
            spaced && 'py-4'
        ]"
    >
        <span v-if="icon">
            <MdiIcon 
                :class="iconClass"
                :icon="icon"
                preserveAspectRatio="xMidYMid meet"
                :size="iconSize"
            />
        </span>
        <span :class="[contentSizeClass, 'w-full']">
            <slot />
        </span>
    </li>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    icon: String as PropType<any>,
    iconClass: {
        type: String as PropType<string>,
        default: 'text-icon-secondary-brand-default'
    },
    spaced: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    size: {
        type: String as PropType<ListItemSize>,
        default: ListItemSize.SM, 
        validator: (value: ListItemSize) => Object.values(ListItemSize).includes(value),
    },
})

// Computed
const iconSize = computed(() => {
    const sizeVariant = {
        [ListItemSize.XS]: '16',
        [ListItemSize.SM]: '20',
        [ListItemSize.MD]: '24',
    }
    return sizeVariant[props.size as ListItemSize] || '20'
})

const contentSizeClass = computed(() => {
    const sizeVariant = {
        [ListItemSize.XS]: 'text-xs',
        [ListItemSize.SM]: 'text-sm',
        [ListItemSize.MD]: 'text-md',
    }
    return sizeVariant[props.size as ListItemSize] || 'text-sm'
})
</script>