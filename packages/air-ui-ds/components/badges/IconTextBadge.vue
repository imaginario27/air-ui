<template>
    <div 
        :class="[ 
            'inline-flex items-center gap-2 font-semibold text-xs'
        ]"
    >
        <IconBadge 
            :color
            :icon
        />

        <!-- Text -->
        <span :class="textClass">
            {{ text }}
        </span>
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
    text: {
        type: String as PropType<string>,
        default: 'Badge text'
    },
    icon: {
        type: String as PropType<string>,
        default: 'mdi:help', 
    },
})

// Computed Classes
const textClass = computed(() => {
    const textVariants = {
        [ColorAccent.NEUTRAL]: 'text-text-neutral-subtle',
        [ColorAccent.SUCCESS]: 'text-text-success',
        [ColorAccent.WARNING]: 'text-text-warning',
        [ColorAccent.DANGER]: 'text-text-danger',
        [ColorAccent.INFO]: 'text-text-info',
        [ColorAccent.PRIMARY_BRAND]: 'text-text-primary-brand-default',
        [ColorAccent.SECONDARY_BRAND]: 'text-text-secondary-brand-default',
    }
    return textVariants[props.color as ColorAccent] || 'text-text-secondary'
})
</script>
