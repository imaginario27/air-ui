<template>
    <div
        :class="[ 
            'inline-flex items-center gap-2 font-semibold text-xs px-2 h-[24px] w-fit',
            styleClass,
            shapeClass,
            colorClass,
            borderColorClass,
            isTransparent ? 'bg-transparent' : undefined,
            showDot ? 'pl-3' : undefined
        ]"
    >
        <!-- Dot -->
        <span
            v-if="showDot"
            :class="['w-1.5 h-1.5 rounded-full', dotColorClass]"
        />

        <!-- Icon -->
        <Icon 
            v-if="showIcon"
            :name="icon"
            :size="IconSize.XS"
            :iconClass="iconColorClass" 
        />

        <!-- Text -->
        <span :class="textClass">{{ text }}</span>

        <!-- Close button -->
        <div 
            v-if="closeable"
            class="ml-1 h-[24px] flex items-center"
        >
            <button
                class="flex items-center justify-center h-full w-[20px]"
                :class="[
                    textClass,
                    'hover:opacity-75 focus:outline-none',
                ]"
                @click="emitClose"
            >
                <Icon 
                    name="mdi:close"
                    :size="IconSize.SM"
                    :iconClass="iconColorClass"
                />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    styleType: {
        type: String as PropType<BadgeStyle>,
        default: BadgeStyle.BORDER,
        validator: (value: BadgeStyle) => Object.values(BadgeStyle).includes(value),
    },
    shape: {
        type: String as PropType<BadgeShape>,
        default: BadgeShape.BADGE, 
        validator: (value: BadgeShape) => Object.values(BadgeShape).includes(value),
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.NEUTRAL, 
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    showDot: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    closeable: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isTransparent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showIcon: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    text: {
        type: String as PropType<string>,
        default: 'Badge',
    },
    icon: {
        type: String as PropType<string>,
        default: 'mdi:help',
    },
})

// Emits
const emit = defineEmits(['close'])
const emitClose = () => {
    emit('close')
}

// Computed classes
const styleClass = computed(() => {
    if (props.styleType === BadgeStyle.FLAT) {
        return ''
    }

    return {
        [BadgeStyle.BORDER]: 'border',
        [BadgeStyle.FILLED]: 'bg-filled'
    }[props.styleType] || 'border'
})

const shapeClass = computed(() => {
    const shapeVariants = {
        [BadgeShape.BADGE]: 'rounded',
        [BadgeShape.PILL]: 'rounded-full',
    }
    return shapeVariants[props.shape as BadgeShape] || 'rounded'
})

const colorClass = computed(() => {
    if (props.styleType === BadgeStyle.FLAT) {
        const flatColorVariant: Record<ColorAccent, string> = {
            [ColorAccent.NEUTRAL]: "bg-background-neutral-sublter",
            [ColorAccent.SUCCESS]: "bg-background-success-subtler",
            [ColorAccent.WARNING]: "bg-background-warning-subtler",
            [ColorAccent.DANGER]: "bg-background-danger-subtler",
            [ColorAccent.INFO]: "bg-background-info-subtler",
            [ColorAccent.PRIMARY_BRAND]: "bg-background-primary-brand-soft",
            [ColorAccent.SECONDARY_BRAND]: "bg-background-secondary-brand-soft",
        }

        return flatColorVariant[props.color as ColorAccent] || "bg-transparent text-secondary-700"
    }

    const colorVariant: Record<ColorAccent, string> = {
        [ColorAccent.NEUTRAL]: props.styleType === BadgeStyle.FILLED
            ? "bg-background-neutral-bold"
            : "bg-background-neutral-sublter",
        [ColorAccent.SUCCESS]: props.styleType === BadgeStyle.FILLED
            ? "bg-background-success-bold"
            : "bg-background-success-subtlest",
        [ColorAccent.WARNING]: props.styleType === BadgeStyle.FILLED
            ? "bg-background-warning-bold"
            : "bg-background-warning-subtlest",
        [ColorAccent.DANGER]: props.styleType === BadgeStyle.FILLED
            ? "bg-background-danger-bold"
            : "bg-background-danger-subtlest",
        [ColorAccent.INFO]: props.styleType === BadgeStyle.FILLED
            ? "bg-background-info-bold"
            : "bg-background-info-subtlest",
        [ColorAccent.PRIMARY_BRAND]: props.styleType === BadgeStyle.FILLED
            ? "bg-background-primary-brand-default"
            : "bg-background-primary-brand-soft",
        [ColorAccent.SECONDARY_BRAND]: props.styleType === BadgeStyle.FILLED
            ? "bg-background-secondary-brand-default"
            : "bg-background-secondary-brand-soft",
    }

    return colorVariant[props.color as ColorAccent] || "bg-background-neutral-sublter"
})

const textClass = computed(() => {
    if (props.styleType === BadgeStyle.FILLED) return "text-text-neutral-on-filled"

    const textVariant: Record<ColorAccent, string> = {
        [ColorAccent.NEUTRAL]: "text-text-neutral-subtle",
        [ColorAccent.SUCCESS]: "text-text-success",
        [ColorAccent.WARNING]: props.isTransparent ? "text-text-warning" : "text-text-warning-on-bg",
        [ColorAccent.DANGER]: "text-text-danger",
        [ColorAccent.INFO]: "text-text-info",
        [ColorAccent.PRIMARY_BRAND]: "text-text-primary-brand-on-soft-bg",
        [ColorAccent.SECONDARY_BRAND]: "text-text-secondary-brand-on-soft-bg",
    }

    return textVariant[props.color as ColorAccent] || "text-text-neutral-subtle"
})

const iconColorClass = computed(() => {
    if (props.styleType === BadgeStyle.FILLED) return "!text-text-neutral-on-filled"

    const iconVariant: Record<ColorAccent, string> = {
        [ColorAccent.NEUTRAL]: "!text-icon-neutral-subtle",
        [ColorAccent.SUCCESS]: "!text-icon-success",
        [ColorAccent.WARNING]: props.isTransparent ? "!text-icon-warning" : "!text-icon-warning-on-bg",
        [ColorAccent.DANGER]: "!text-icon-danger",
        [ColorAccent.INFO]: "!text-icon-info",
        [ColorAccent.PRIMARY_BRAND]: "!text-icon-primary-brand-default",
        [ColorAccent.SECONDARY_BRAND]: "!text-icon-secondary-brand-default",
    }

    return iconVariant[props.color as ColorAccent] || "!text-icon-secondary"
})

const dotColorClass = computed(() => {
    if (props.styleType === BadgeStyle.FILLED) return "bg-text-on-filled"

    const dotVariant: Record<ColorAccent, string> = {
        [ColorAccent.NEUTRAL]: "bg-icon-neutral-subtle",
        [ColorAccent.SUCCESS]: "bg-icon-success",
        [ColorAccent.WARNING]: "bg-icon-warning",
        [ColorAccent.DANGER]: "bg-icon-danger",
        [ColorAccent.INFO]: "bg-icon-info",
        [ColorAccent.PRIMARY_BRAND]: "bg-icon-primary-brand-default",
        [ColorAccent.SECONDARY_BRAND]: "bg-icon-secondary-brand-default",
    }

    return dotVariant[props.color as ColorAccent] || "bg-icon-neutral-subtle"
})

const borderColorClass = computed(() => {
    if (props.styleType !== BadgeStyle.BORDER) return ""

    const borderVariant: Record<ColorAccent, string> = {
        [ColorAccent.NEUTRAL]: "border-border-default",
        [ColorAccent.SUCCESS]: "border-border-success",
        [ColorAccent.WARNING]: "border-border-warning",
        [ColorAccent.DANGER]: "border-border-danger",
        [ColorAccent.INFO]: "border-border-info",
        [ColorAccent.PRIMARY_BRAND]: "border-border-primary-brand-default",
        [ColorAccent.SECONDARY_BRAND]: "border-border-secondary-brand",
    }

    return borderVariant[props.color as ColorAccent] || "border-border-default"
})
</script>
