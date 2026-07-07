<template>
    <Icon
        :name="icon"
        :class="[
            iconSizeClass,
            colorClass,
            isInteractive && 'hover:cursor-pointer hover:scale-110 transition-transform duration-150 ease-out'
        ]"
    />
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    icon: {
        type: String as PropType<string>,
        default: 'mdi:star-outline'
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
const iconSizeClass = computed(() => {
    const sizeVariant = {
        [RatingItemSize.SM]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        [RatingItemSize.MD]: 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]',
        [RatingItemSize.LG]: 'w-[32px] h-[32px] min-w-[32px] min-h-[32px]',
        [RatingItemSize.XL]: 'w-[40px] h-[40px] min-w-[40px] min-h-[40px]',
        [RatingItemSize.XXL]: 'w-[48px] h-[48px] min-w-[48px] min-h-[48px]',
    }
    return sizeVariant[props.size as RatingItemSize] || 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]'
})

const colorClass = computed(() => {
    const colorVariants = {
        [RatingItemColor.GOLD]: '!text-icon-rating',
        [RatingItemColor.PRIMARY_BRAND]: '!text-icon-primary-brand-rating',
    }
    return colorVariants[props.color as RatingItemColor] || '!text-icon-rating'
})
</script>