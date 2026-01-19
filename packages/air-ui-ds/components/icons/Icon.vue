<template>
    <NuxtIcon 
        :name
        :mode
        :customize="svgCustomize"
        :class="[
            iconSizeClass,
            iconColorClass,
            ...normalizedIconClass,
        ]"
    />
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    name: {
        type: String as PropType<string>,
        default: 'mdi:help',
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
    color: String as PropType<ColorAccent>,
    svgCustomize: Function as PropType<CollectionCustomizeCallback>,  
    iconClass: [String, Array] as PropType<string | string[]>,    
})

// Computed function
const normalizedIconClass = computed(() => {
    return Array.isArray(props.iconClass)
        ? props.iconClass
        : props.iconClass?.split(' ').filter(Boolean) || []
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
    if (!props.color) return 'text-inherit'

    const variants = {
        [ColorAccent.NEUTRAL]: 'text-icon-default',
        [ColorAccent.SUCCESS]: 'text-icon-success',
        [ColorAccent.WARNING]: 'text-icon-warning',
        [ColorAccent.DANGER]: 'text-icon-danger',
        [ColorAccent.INFO]: 'text-icon-info',
        [ColorAccent.PRIMARY_BRAND]: 'text-icon-primary-brand-default',
        [ColorAccent.SECONDARY_BRAND]: 'text-icon-secondary-brand-default',
    }

    return variants[props.color] || 'text-inherit'
})
</script>