<template>
    <div class="flex gap-2.5">
        <div v-if="icon">
            <MdiIcon
                v-if="icon && !svgIcon"
                :icon
                preserveAspectRatio="xMidYMid meet"
                :class="[
                    'w-[24px] h-[24px] min-w-[24px] min-h-[24px]',
                    iconColorClass,
                ]"
            />
            <span
                v-else-if="svgIcon"
                class="w-[24px] h-[24px] min-w-[24px] min-h-[24px]"
            >
                <SVGImage
                    :src="svgIcon"
                    :color="resolvedSvgIconColor?.value"
                />
            </span>
        </div>

        <div class="w-full flex flex-col gap-1">
            <div class="text-base font-semibold">
                {{ title }}
            </div>
            <p 
                v-if="description" 
                class="text-base text-text-neutral-subtle"
            >
                {{ description }}
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Title',
    },
    description: String as PropType<string>,
    icon: String as PropType<any>,
    iconColor: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.SECONDARY_BRAND, 
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    svgIcon: String as PropType<string>,
    useSVGIconColor: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Computed functions
const resolvedSvgIconColor = computed(() => {
    return props.useSVGIconColor ? undefined : iconColorClass
})

// Class
const iconColorClass = computed(() => {
    const variant = {
        [ColorAccent.NEUTRAL]: "text-icon-neutral-subtle",
        [ColorAccent.SUCCESS]: "text-icon-success",
        [ColorAccent.WARNING]:  "text-icon-warning",
        [ColorAccent.DANGER]: "text-icon-danger",
        [ColorAccent.INFO]: "text-icon-info",
        [ColorAccent.PRIMARY_BRAND]: "text-icon-primary-brand-default",
        [ColorAccent.SECONDARY_BRAND]: "text-icon-secondary-brand-default",
    }
    return variant[props.iconColor as ColorAccent] || 'text-icon-secondary-brand-default"'
})

</script>