<template>
    <MdiIcon 
        :icon 
        :size="iconSize"
        preserveAspectRatio="xMidYMid meet"
        :class="[
            colorClass,
            isInteractive && 'hover:cursor-pointer'
        ]"
    />
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    icon: {
        type: String as PropType<any>,
        default: 'mdiStarOutline'
    },
    size: {
        type: String as PropType<RatingItemSize>,
        default: RatingItemSize.SM, 
        validator: (value: RatingItemSize) => Object.values(RatingItemSize).includes(value),
    },
    color: {
        type: String as PropType<RatingItemColor>,
        default: RatingItemColor.GOLD, 
        validator: (value: RatingItemColor) => Object.values(RatingItemColor).includes(value),
    },
    isInteractive: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

// Computed
const iconSize = computed(() => {
    const sizeVariant = {
        [RatingItemSize.SM]: '20',
        [RatingItemSize.MD]: '24',
        [RatingItemSize.LG]: '32',
        [RatingItemSize.XL]: '40',
        [RatingItemSize.XXL]: '48',
    }
    return sizeVariant[props.size as RatingItemSize] || '20'
})

const colorClass = computed(() => {
    const colorVariants = {
        [RatingItemColor.GOLD]: 'text-icon-rating',
        [RatingItemColor.PRIMARY_BRAND]: 'text-icon-primary-brand-rating',
    }
    return colorVariants[props.color as RatingItemColor] || 'text-icon-rating'
})
</script>