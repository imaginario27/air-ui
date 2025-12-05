<template>
 <div 
        :class="[ 
            'flex',
            'items-center',
            'justify-center',
            'rounded-full',
            'aspect-square',
            iconContainerClass,
            iconContainerShapeClass,
            iconContainerSizeClass,
        ]"
    >
        <MdiIcon 
            :icon="icon" 
            :size="iconSizeClass"
            preserveAspectRatio="xMidYMid meet"
            :class="iconColorClass"
        />
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    styleType: {
        type: String as PropType<IconContainerStyleType>,
        default: IconContainerStyleType.FLAT,
        validator: (value: IconContainerStyleType) => Object.values(IconContainerStyleType).includes(value),
    },
    icon: {
        type: String as PropType<any>,
        default: 'mdiHelp',
    },
    shape: {
        type: String as PropType<IconContainerShape>,
        default: IconContainerShape.CIRCLE,
        validator: (value: IconContainerShape) => Object.values(IconContainerShape).includes(value),
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.NEUTRAL, 
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    size: {
        type: String as PropType<IconContainerSize>,
        default: IconContainerSize.XL, 
        validator: (value: IconContainerSize) => Object.values(IconContainerSize).includes(value),
    },
})

// Computed classes
const iconContainerShapeClass = computed(() => {
    const shapeVariants = {
        [IconContainerShape.CIRCLE]: 'rounded-full',
        [IconContainerShape.SQUARE]: 'rounded-lg',
    }
    return shapeVariants[props.shape as IconContainerShape] || 'rounded-full'
})

const iconContainerClass = computed(() => {
    const filled = props.styleType === IconContainerStyleType.FILLED

    const colorVariants: Record<ColorAccent, string> = {
        [ColorAccent.NEUTRAL]: filled
            ? 'bg-background-neutral-bold'
            : 'bg-background-neutral-sublter',
        [ColorAccent.SUCCESS]: filled
            ? 'bg-background-success-bold'
            : 'bg-background-success-subtler',
        [ColorAccent.WARNING]: filled
            ? 'bg-background-warning-bold'
            : 'bg-background-warning-subtler',
        [ColorAccent.DANGER]: filled
            ? 'bg-background-danger-bold'
            : 'bg-background-danger-subtler',
        [ColorAccent.INFO]: filled
            ? 'bg-background-info-bold'
            : 'bg-background-info-subtler',
        [ColorAccent.PRIMARY_BRAND]: filled
            ? 'bg-background-primary-brand-default'
            : 'bg-background-primary-brand-soft',
        [ColorAccent.SECONDARY_BRAND]: filled
            ? 'bg-background-secondary-brand-default'
            : 'bg-background-secondary-brand-soft',
    }

    return colorVariants[props.color as ColorAccent] || (filled
        ? 'bg-background-neutral-bold'
        : 'bg-background-neutral-sublter')
})

const iconColorClass = computed(() => {
    if (props.styleType === IconContainerStyleType.FILLED) return 'text-icon-neutral-on-filled-bg'

    const iconVariants = {
        [ColorAccent.NEUTRAL]: 'text-icon-neutral-subtle-on-subtler-bg',
        [ColorAccent.SUCCESS]: 'text-icon-success',
        [ColorAccent.WARNING]: 'text-icon-warning-on-bg',
        [ColorAccent.DANGER]: 'text-icon-danger',
        [ColorAccent.INFO]: 'text-icon-info',
        [ColorAccent.PRIMARY_BRAND]: 'text-icon-primary-brand-default',
        [ColorAccent.SECONDARY_BRAND]: 'text-icon-secondary-brand-default',
    }
    return iconVariants[props.color as ColorAccent] || 'text-icon-neutral-subtle-on-subtler-bg'

})

const iconContainerSizeClass = computed(() => {
    const sizeVariants = {
        [IconContainerSize.LG]: 'w-[40px] h-[40px]',
        [IconContainerSize.XL]: 'w-[48px] h-[48px]',
        [IconContainerSize.XXL]: 'w-[56px] h-[56px]',
        [IconContainerSize.XXXL]: 'w-[80px] h-[80px]',
    }

    return sizeVariants[props.size as IconContainerSize] || 'w-[48px] h-[48px]'
})

const iconSizeClass = computed(() => {
    const sizeVariants = {
        [IconContainerSize.LG]: '24',
        [IconContainerSize.XL]: '24',
        [IconContainerSize.XXL]: '40',
        [IconContainerSize.XXXL]: '48',
    }

    return sizeVariants[props.size as IconContainerSize] || '24'
})
    
</script>