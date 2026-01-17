<template>
    <div 
        :class="[ 
            'w-[24px] h-[24px] flex justify-center items-center rounded-full', 
            colorClass 
        ]" 
    >
        <Icon 
            v-if="icon"
            :name="icon"
            :size="IconSize.SM"
            :iconClass="iconColorClass"
        />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.NEUTRAL,
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    icon: {
        type: String as PropType<string>,
        default: 'mdi:help', 
    },
})

// Computed Classes
const colorClass = computed(() => {
    const colorVariants = {
        [ColorAccent.NEUTRAL]: 'bg-background-neutral-sublter',
        [ColorAccent.SUCCESS]: 'bg-background-success-subtler',
        [ColorAccent.WARNING]: 'bg-background-warning-subtler',
        [ColorAccent.DANGER]: 'bg-background-danger-subtler',
        [ColorAccent.INFO]: 'bg-background-info-subtler',
        [ColorAccent.PRIMARY_BRAND]: 'bg-background-primary-brand-soft',
        [ColorAccent.SECONDARY_BRAND]: 'bg-background-secondary-brand-soft',
    }
    return colorVariants[props.color as ColorAccent] || 'bg-background-neutral-sublter'
})

const iconColorClass = computed(() => {
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
</script>
