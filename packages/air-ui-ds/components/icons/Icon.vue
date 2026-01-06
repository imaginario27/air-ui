<template>
    <MdiIcon
        v-if="type === IconType.NATIVE"
        :icon
        preserveAspectRatio="xMidYMid meet"
        :class="[
            iconSizeClass,
            iconColorClass,
            iconClass,
        ]"
    />
    <NuxtIcon 
        v-else-if="type === IconType.COLLECTION"
        :name="icon"
        :mode
        :customize="svgCustomize"
        :class="[
            iconSizeClass,
            iconColorClass,
            iconClass,
        ]"
    />
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    icon: {
        type: String as PropType<any>,
        default: 'mdiHelp',
    },
    type: {
        type: String as PropType<IconType>,
        default: IconType.NATIVE, 
        validator: (value: IconType) => Object.values(IconType).includes(value),
    },
    mode: {
        type: String as PropType<IconMode>,
        default: IconMode.CSS,
        validator: (value: IconMode) => Object.values(IconMode).includes(value),
    },
    size: {
        type: String as PropType<IconSize>,
        default: IconSize.MD, 
        validator: (value: IconSize) => Object.values(IconSize).includes(value),
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.NEUTRAL, 
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    svgCustomize: Function as PropType<CollectionCustomizeCallback>,  
    iconClass: String as PropType<string>,    
})

// Computed classes
const iconSizeClass = computed(() => {
    const variants = {
        [IconSize.XS]: 'w-[12px] h-[12px] min-w-[12px] min-h-[12px]',
        [IconSize.SM]: 'w-[16px] h-[16px] min-w-[16px] min-h-[16px]',
        [IconSize.MD]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        [IconSize.LG]: 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]',
        [IconSize.XL]: 'w-[32px] h-[32px] min-w-[32px] min-h-[32px]',
        [IconSize.XXL]: 'w-[40px] h-[40px] min-w-[40px] min-h-[40px]',
    }

    return variants[props.size as IconSize] || 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]'
})

const iconColorClass = computed(() => {
    const variants = {
        [ColorAccent.NEUTRAL]: 'text-icon-default',
        [ColorAccent.SUCCESS]: 'text-icon-success',
        [ColorAccent.WARNING]: 'text-icon-warning',
        [ColorAccent.DANGER]: 'text-icon-danger',
        [ColorAccent.INFO]: 'text-icon-info',
        [ColorAccent.PRIMARY_BRAND]: 'text-icon-primary-brand-default',
        [ColorAccent.SECONDARY_BRAND]: 'text-icon-secondary-brand-default',
    }

    return variants[props.color as ColorAccent] || 'text-icon-default'
})
</script>