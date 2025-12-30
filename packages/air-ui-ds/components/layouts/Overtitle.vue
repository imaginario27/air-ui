<template>
    <span 
        :class="[
            colorClass,
            'text-sm',
            'font-medium',
            isUppercase && 'uppercase',
        ]"
    >
        {{ title }}
    </span>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Overtitle'
    },
    isUppercase: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    color: {
        type: String as PropType<
            ColorAccent.PRIMARY_BRAND
            | ColorAccent.SECONDARY_BRAND
            | ColorAccent.NEUTRAL
        >,
        default: ColorAccent.SECONDARY_BRAND,
        validator: (value: unknown): value is ColorAccent => {
            return typeof value === 'string' &&
                [
                    ColorAccent.PRIMARY_BRAND,
                    ColorAccent.SECONDARY_BRAND,
                    ColorAccent.NEUTRAL,
                ].includes(value as ColorAccent)
        },
    },
})

const colorClass = computed(() => {
    const variant: Partial<Record<ColorAccent, string>> = {
        [ColorAccent.NEUTRAL]: 'text-text-default',
        [ColorAccent.PRIMARY_BRAND]: 'text-text-primary-brand-default',
        [ColorAccent.SECONDARY_BRAND]: 'text-text-secondary-brand-default',
    }

    return variant[props.color as ColorAccent] || 'text-text-secondary-brand-default'
})
</script>