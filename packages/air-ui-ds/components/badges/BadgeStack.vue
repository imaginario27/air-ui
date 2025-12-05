<template>
    <div
        class="flex flex-wrap gap-2"
    >
        <Badge 
            v-for="(item, index) in visibleBadges" 
            :key="item.text || index" 
            :text="item.text"
            :styleType
            :shape
            :color
            :isTransparent
            :showDot
            :closeable
            :showIcon
            :icon="item.icon"
            @close="() => emit('close', item)"
        />
        <Badge 
            v-if="showEllipsisBadge" 
            :text="counterContent"
            :style="BadgeStyle.BORDER"
            :shape="BadgeShape.BADGE"
            :color="ColorAccent.NEUTRAL"
            :isTransparent
        />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    items: {
        type: Array as PropType<Badge[]>,
            default: () => [
            {
                text: 'Badge 1',
            },
            {
                text: 'Badge 2',
            },
            {
                text: 'Badge 3'
            },
            {
                text: 'Badge 4'
            },
            {
                text: 'Badge 5'
            }, 
        ]
    },
    styleType: {
        type: String as PropType<BadgeStyle>,
        default: BadgeStyle.BORDER,
        validator: (value: BadgeStyle) => Object.values(BadgeStyle).includes(value),
    },
    shape: {
        type: String as PropType<BadgeShape>,
        default: BadgeShape.BADGE, 
        validator: (value: BadgeShape) => Object.values(BadgeShape).includes(value),
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.NEUTRAL, 
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    showDot: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    closeable: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isTransparent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showIcon: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    itemsLimit: {
        type: Number as PropType<number>,
        default: null,
    },
    counterType: {
        type: String as PropType<StackCounterType>,
        default: StackCounterType.ELLIPSIS,
        validator: (value: StackCounterType) => Object.values(StackCounterType).includes(value),
    },
})

// Emits
const emit = defineEmits(['close'])

// Computed functions
const visibleBadges = computed(() => 
    // Only apply slicing if itemsLimit is provided and is a valid number
    Number.isFinite(props.itemsLimit) ? props.items.slice(0, props.itemsLimit) : props.items
)

const showEllipsisBadge = computed(() => 
    // Only show ellipsis if itemsLimit is provided and the items exceeds the max itemsLimit
    Number.isFinite(props.itemsLimit) && props.items.length > props.itemsLimit
)

const counterContent = computed(() => getStackCounterContent(props.items, props.counterType, props.itemsLimit ? props.itemsLimit : null))
</script>