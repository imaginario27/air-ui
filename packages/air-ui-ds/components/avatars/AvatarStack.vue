<template>
    <div class="flex gap-2">
        <Avatar
            v-for="(avatar, index) in filteredItems"
            :key="avatar.displayName"
            :displayName="avatar.displayName"
            :imgUrl="avatar.imgUrl"
            hasBorder
            :isInteractive
            :shape
            :size
            :class="[
                index !== 0 && '-ml-4',
                'border-2',
                isInteractive && hoveredIndex === index
                    ? 'border-border-primary-brand-hover'
                    : '!border-border-neutral-stacked',
            ]"
            @mouseenter="onMouseEnter(index)"
            @mouseleave="onMouseLeave"
        />
        <AvatarStackCounter 
            v-if="Number.isFinite(itemsLimit) && itemsLimit && items.length > itemsLimit"
            :text="counterContent"
            :shape
            :size
            class="-ml-4"
        />
    </div>
    
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    items: {
        type: Array as PropType<Avatar[]>,
        default: () => [
            {
                displayName: 'John Doe',
            },
            {
                displayName: 'Sarah Penny',
            },
            {
                displayName: 'Rachel Kross'
            },
            {
                displayName: 'Jadie Miller'
            },
            {
                displayName: 'Alicia Mels',
            }, 
        ]
    },
    shape: {
        type: String as PropType<AvatarShape>,
        default: AvatarShape.CIRCLE,
        validator: (value: AvatarShape) => Object.values(AvatarShape).includes(value),
    },
    size: {
        type: String as PropType<AvatarStackSize>,
        default: AvatarStackSize.SM,
        validator: (value: AvatarStackSize) => Object.values(AvatarStackSize).includes(value),
    },
    isInteractive: Boolean as PropType<boolean>,
    itemsLimit: {
        type: Number as PropType<number | null>,
        default: null
    },
    counterType: {
        type: String as PropType<StackCounterType>,
        default: StackCounterType.ELLIPSIS,
        validator: (value: StackCounterType) => Object.values(StackCounterType).includes(value),
    }
})

// Computed
const filteredItems = computed(() => {
    return props.itemsLimit !== null && props.itemsLimit !== undefined
        ? props.items.filter((_, index) => index < props.itemsLimit!)
        : props.items
})

const counterContent = computed(() => getStackCounterContent(props.items, props.counterType, props.itemsLimit ? props.itemsLimit : null))

// States
const hoveredIndex = ref<number | null>(null)

// Handlers
const onMouseEnter = (index: number) => {
    hoveredIndex.value = index
}

const onMouseLeave = () => {
    hoveredIndex.value = null
}
</script>
