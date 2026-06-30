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
        <Icon
            :name="icon"
            :mode
            :iconClass="finalIconClass"
            v-bind="iconSizeProps"
        />
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    icon: {
        type: String as PropType<string>,
        default: 'mdi:help',
    },
    styleType: {
        type: String as PropType<IconContainerStyleType>,
        default: IconContainerStyleType.FLAT,
        validator: (value: IconContainerStyleType) => Object.values(IconContainerStyleType).includes(value),
    },
    mode: {
        type: String as PropType<IconMode>,
        default: IconMode.CSS,
        validator: (value: IconMode) => Object.values(IconMode).includes(value),
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
    iconSize: {
        type: String as PropType<IconSize>,
        validator: (value: IconSize) => Object.values(IconSize).includes(value),
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
            : 'bg-background-neutral-subtler',
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
        : 'bg-background-neutral-subtler')
})

const iconColorClass = computed(() => {
    if (props.styleType === IconContainerStyleType.FILLED) return '!text-icon-neutral-on-filled-bg'

    const iconVariants = {
        [ColorAccent.NEUTRAL]: '!text-icon-neutral-subtle-on-subtler-bg',
        [ColorAccent.SUCCESS]: '!text-icon-success',
        [ColorAccent.WARNING]: '!text-icon-warning-on-bg',
        [ColorAccent.DANGER]: '!text-icon-danger',
        [ColorAccent.INFO]: '!text-icon-info',
        [ColorAccent.PRIMARY_BRAND]: '!text-icon-primary-brand-default',
        [ColorAccent.SECONDARY_BRAND]: '!text-icon-secondary-brand-default',
    }

    return iconVariants[props.color as ColorAccent] || '!text-icon-neutral-subtle-on-subtler-bg'
})

const iconContainerSizeClass = computed(() => {
    const sizeVariants = {
        [IconContainerSize.SM]: 'w-[24px] h-[24px]',
        [IconContainerSize.MD]: 'w-[32px] h-[32px]',
        [IconContainerSize.LG]: 'w-[40px] h-[40px]',
        [IconContainerSize.XL]: 'w-[48px] h-[48px]',
        [IconContainerSize.XXL]: 'w-[56px] h-[56px]',
        [IconContainerSize.XXXL]: 'w-[80px] h-[80px]',
    }

    return sizeVariants[props.size as IconContainerSize] || 'w-[48px] h-[48px]'
})

const iconSizeClass = computed(() => {
    const sizeVariants = {
        [IconContainerSize.SM]: 'w-[16px] h-[16px] min-w-[16px] min-h-[16px]',
        [IconContainerSize.MD]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        [IconContainerSize.LG]: 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]',
        [IconContainerSize.XL]: 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]',
        [IconContainerSize.XXL]: 'w-[40px] h-[40px] min-w-[40px] min-h-[40px]',
        [IconContainerSize.XXXL]: 'w-[48px] h-[48px] min-w-[48px] min-h-[48px]',
    }

    return sizeVariants[props.size as IconContainerSize] || 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]'
})

const finalIconClass = computed(() => props.iconSize
    ? [iconColorClass.value]
    : [iconSizeClass.value, iconColorClass.value]
)

const iconSizeProps = computed(() => (props.iconSize
    ? { size: props.iconSize }
    : {}
))
</script>