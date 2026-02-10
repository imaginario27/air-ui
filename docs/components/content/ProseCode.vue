<template>
    <code 
        :class="[
            'px-1 py-0.5',
            'rounded',
            'bg-background-neutral-subtlest',
            'border border-border-default/60',
            'text-sm font-mono',
            'text-text-default',
            textClass,
            colorClass,
            borderColorClass,
        ]"
    >
        <slot />
    </code>
</template>
<script setup lang="ts">
const props = defineProps({
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.NEUTRAL, 
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
})

// Computed classes
const colorClass = computed(() => {
    const variant: Record<ColorAccent, string> = {
        [ColorAccent.NEUTRAL]: "bg-background-neutral-sublter",
        [ColorAccent.SUCCESS]: "bg-background-success-subtler",
        [ColorAccent.WARNING]: "bg-background-warning-subtler",
        [ColorAccent.DANGER]: "bg-background-danger-subtler",
        [ColorAccent.INFO]: "bg-background-info-subtler",
        [ColorAccent.PRIMARY_BRAND]: "bg-background-primary-brand-soft",
        [ColorAccent.SECONDARY_BRAND]: "bg-background-secondary-brand-soft",
    }

    return variant[props.color as ColorAccent] || "bg-background-neutral-sublter"
})

const textClass = computed(() => {
    const variant: Record<ColorAccent, string> = {
        [ColorAccent.NEUTRAL]: "text-text-neutral-subtle",
        [ColorAccent.SUCCESS]: "text-text-success",
        [ColorAccent.WARNING]: "text-text-warning-on-bg",
        [ColorAccent.DANGER]: "text-text-danger",
        [ColorAccent.INFO]: "text-text-info",
        [ColorAccent.PRIMARY_BRAND]: "text-text-primary-brand-on-soft-bg",
        [ColorAccent.SECONDARY_BRAND]: "text-text-secondary-brand-on-soft-bg",
    }

    return variant[props.color as ColorAccent] || "text-text-neutral-subtle"
})

const borderColorClass = computed(() => {
    const variant: Record<ColorAccent, string> = {
        [ColorAccent.NEUTRAL]: "border-border-default",
        [ColorAccent.SUCCESS]: "border-border-success",
        [ColorAccent.WARNING]: "border-border-warning",
        [ColorAccent.DANGER]: "border-border-danger",
        [ColorAccent.INFO]: "border-border-info",
        [ColorAccent.PRIMARY_BRAND]: "border-border-primary-brand-default",
        [ColorAccent.SECONDARY_BRAND]: "border-border-secondary-brand",
    }

    return variant[props.color as ColorAccent] || "border-border-default"
})
</script>