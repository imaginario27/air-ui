<template>
    <div
        class="w-full space-y-1.5"
    >
        <div
            v-if="showProgressLabel && progressLabelPosition === Position.TOP"
            :class="[
                'text-xs text-text-neutral-subtle',
                labelAlignmentClass,
                progressLabelClass,
            ]"
        >
            {{ isIndeterminate ? loadingText : `${normalizedProgress}%` }}
        </div>

        <div
            role="progressbar"
            :aria-valuenow="isIndeterminate ? undefined : normalizedProgress"
            :aria-valuemin="min"
            :aria-valuemax="max"
            :aria-valuetext="isIndeterminate ? loadingText : undefined"
            :aria-label="ariaLabel"
            :class="[
                'w-full',
                'overflow-hidden',
                barSizeClass,
                incompleteBackgroundColorClass,
                isRounded && 'rounded-full',
                'relative',
            ]"
        >
            <div
                v-if="!isIndeterminate && normalizedProgress > 0"
                :class="[
                    'h-full',
                    'transition-all',
                    'duration-300',
                    'ease-in-out',
                    isRounded && 'rounded-full',
                    completedBackgroundColorClass,
                    progressClass,
                ]"
                :style="{ width: `${normalizedProgress}%` }"
            />

            <div
                v-else-if="isIndeterminate"
                :class="[
                    'absolute top-0 left-0 h-full w-1/3',
                    'indeterminate-bar',
                    isRounded && 'rounded-full',
                    completedBackgroundColorClass,
                    progressClass,
                ]"
            />
        </div>

        <div
            v-if="showProgressLabel && progressLabelPosition === Position.BOTTOM"
            :class="[
                'text-xs text-text-neutral-subtle',
                labelAlignmentClass,
                progressLabelClass,
            ]"
        >
            {{ isIndeterminate ? loadingText : `${normalizedProgress}%` }}
        </div>
    </div>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    progress: {
        type: Number as PropType<number>,
        default: 50,
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.PRIMARY_BRAND, 
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    size: {
        type: String as PropType<ProgressBarSize>,
        default: ProgressBarSize.SM, 
        validator: (value: ProgressBarSize) => Object.values(ProgressBarSize).includes(value),
    },
    isRounded: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showProgressLabel: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    progressLabelPosition: {
        type: String as PropType<Position>,
        default: Position.TOP,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    progressLabelAlignment: {
        type: String as PropType<Align>,
        default: Align.CENTER,
        validator: (value: Align) => Object.values(Align).includes(value),
    },
    min: {
        type: Number as PropType<number>,
        default: 0,
    },
    max: {
        type: Number as PropType<number>,
        default: 100,
    },
    isIndeterminate: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    loadingText: {
        type: String as PropType<string>,
        default: 'Loading...',
    },
    progressClass: String as PropType<string>,
    progressLabelClass: String as PropType<string>,
    ariaLabel: {
        type: String as PropType<string>,
        default: 'Progress',
    },
})

// Computed
const normalizedProgress = computed(() => {
    if (props.isIndeterminate) return 100

    const clamped = Math.min(Math.max(props.progress, props.min), props.max)
    const percent = ((clamped - props.min) / (props.max - props.min)) * 100

    return Math.round(percent)
})

// Computed classes
const barSizeClass = computed(() => {
    const variants = {
        [ProgressBarSize.XS]: 'h-[4px]',
        [ProgressBarSize.SM]: 'h-[8px]',
        [ProgressBarSize.MD]: 'h-[12px]',
        [ProgressBarSize.LG]: 'h-[16px]',
        [ProgressBarSize.XL]: 'h-[20px]',
    }

    return variants[props.size as ProgressBarSize] || 'h-[8px]'
})

const incompleteBackgroundColorClass = computed(() => {
    const variants = {
        [ColorAccent.NEUTRAL]: 'bg-background-neutral-default/10',
        [ColorAccent.SUCCESS]: 'bg-background-success-bold/10',
        [ColorAccent.WARNING]: 'bg-background-warning-bold/10',
        [ColorAccent.DANGER]: 'bg-background-danger-bold/10',
        [ColorAccent.INFO]: 'bg-background-info-bold/10',
        [ColorAccent.PRIMARY_BRAND]: 'bg-background-primary-brand-default/10',
        [ColorAccent.SECONDARY_BRAND]: 'bg-background-secondary-brand-default/10',
    }

    return variants[props.color as ColorAccent] || 'bg-background-primary-brand-default/10'
})

const completedBackgroundColorClass = computed(() => {
    const variants = {
        [ColorAccent.NEUTRAL]: 'bg-background-neutral-default',
        [ColorAccent.SUCCESS]: 'bg-background-success-bold',
        [ColorAccent.WARNING]: 'bg-background-warning-bold',
        [ColorAccent.DANGER]: 'bg-background-danger-bold',
        [ColorAccent.INFO]: 'bg-background-info-bold',
        [ColorAccent.PRIMARY_BRAND]: 'bg-background-primary-brand-default',
        [ColorAccent.SECONDARY_BRAND]: 'bg-background-secondary-brand-default',
    }

    return variants[props.color as ColorAccent] || 'bg-background-primary-brand-default'
})

const labelAlignmentClass = computed(() => {
    const variants = {
        [Align.LEFT]: 'text-left',
        [Align.CENTER]: 'text-center',
        [Align.RIGHT]: 'text-right',
    }

    return variants[props.progressLabelAlignment as Align] || 'text-center'
})
</script>

<style scoped>
@keyframes indeterminate-slide {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(300%);
    }
}

.indeterminate-bar {
    animation: indeterminate-slide 2s ease-in-out infinite;
}
</style>
