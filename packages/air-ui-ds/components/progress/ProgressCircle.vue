<template>
    <div class="inline-flex flex-col items-center gap-1.5">
        <div
            v-if="showOutsideLabel && progressLabelPosition === ProgressCircleLabelPosition.TOP"
            class="text-xs text-text-neutral-subtle"
            data-testid="progress-circle-label"
        >
            {{ labelText }}
        </div>

        <div
            role="progressbar"
            :aria-valuenow="isIndeterminate ? undefined : normalizedProgress"
            :aria-valuemin="min"
            :aria-valuemax="max"
            :aria-valuetext="isIndeterminate ? resolvedLoadingText : undefined"
            :aria-label="ariaLabel"
            class="relative shrink-0"
            :style="{ width: `${diameterPx}px`, height: `${diameterPx}px` }"
            data-testid="progress-circle-root"
        >
            <svg
                :width="diameterPx"
                :height="diameterPx"
                :viewBox="`0 0 ${diameterPx} ${diameterPx}`"
                fill="none"
                aria-hidden="true"
                :class="isIndeterminate && 'animate-spin'"
            >
                <circle
                    :cx="center"
                    :cy="center"
                    :r="radius"
                    :stroke-width="thicknessPx"
                    :class="trackColorClass"
                    data-testid="progress-circle-track"
                />
                <circle
                    v-if="isIndeterminate || normalizedProgress > 0"
                    :cx="center"
                    :cy="center"
                    :r="radius"
                    :stroke-width="thicknessPx"
                    :stroke-dasharray="`${filledLength} ${circumference}`"
                    :stroke-linecap="isRounded ? 'round' : 'butt'"
                    :transform="`rotate(-90 ${center} ${center})`"
                    :class="[
                        'transition-[stroke-dasharray] duration-300 ease-in-out',
                        indicatorColorClass,
                    ]"
                    data-testid="progress-circle-indicator"
                />
            </svg>

            <div
                v-if="$slots.default || showCenterLabel"
                class="absolute inset-0 flex items-center justify-center"
            >
                <slot :progress="normalizedProgress">
                    <span
                        :class="[
                            'font-semibold leading-none text-text-default',
                            centerLabelSizeClass,
                        ]"
                        data-testid="progress-circle-label"
                    >
                        {{ labelText }}
                    </span>
                </slot>
            </div>
        </div>

        <div
            v-if="showOutsideLabel && progressLabelPosition === ProgressCircleLabelPosition.BOTTOM"
            class="text-xs text-text-neutral-subtle"
            data-testid="progress-circle-label"
        >
            {{ labelText }}
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
        type: String as PropType<ProgressCircleSize>,
        default: ProgressCircleSize.MD,
        validator: (value: ProgressCircleSize) => Object.values(ProgressCircleSize).includes(value),
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
        type: String as PropType<ProgressCircleLabelPosition>,
        default: ProgressCircleLabelPosition.CENTER,
        validator: (value: ProgressCircleLabelPosition) => Object.values(ProgressCircleLabelPosition).includes(value),
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
    loadingText: String as PropType<string>,
    ariaLabel: {
        type: String as PropType<string>,
        default: 'Progress',
    },
})

// Composables
const dsConfig = useDSConfig()

// Computed
const resolvedLoadingText = computed(() => props.loadingText ?? dsConfig.common.loadingText())

const normalizedProgress = computed(() => {
    if (props.max <= props.min) return 0

    const clamped = Math.min(Math.max(props.progress, props.min), props.max)

    return Math.round(((clamped - props.min) / (props.max - props.min)) * 100)
})

const labelText = computed(() => {
    return props.isIndeterminate ? resolvedLoadingText.value : `${normalizedProgress.value}%`
})

// The loading text is too long to fit inside the ring
const showCenterLabel = computed(() => {
    return props.showProgressLabel
        && props.progressLabelPosition === ProgressCircleLabelPosition.CENTER
        && !props.isIndeterminate
})

const showOutsideLabel = computed(() => {
    return props.showProgressLabel
        && props.progressLabelPosition !== ProgressCircleLabelPosition.CENTER
})

const diameterPx = computed(() => {
    const variants = {
        [ProgressCircleSize.XS]: 32,
        [ProgressCircleSize.SM]: 48,
        [ProgressCircleSize.MD]: 72,
        [ProgressCircleSize.LG]: 96,
        [ProgressCircleSize.XL]: 128,
        [ProgressCircleSize.XXL]: 160,
    }

    return variants[props.size as ProgressCircleSize] ?? 72
})

const thicknessPx = computed(() => {
    const variants = {
        [ProgressCircleSize.XS]: 3,
        [ProgressCircleSize.SM]: 4,
        [ProgressCircleSize.MD]: 6,
        [ProgressCircleSize.LG]: 8,
        [ProgressCircleSize.XL]: 10,
        [ProgressCircleSize.XXL]: 12,
    }

    return variants[props.size as ProgressCircleSize] ?? 6
})

const center = computed(() => diameterPx.value / 2)
const radius = computed(() => (diameterPx.value - thicknessPx.value) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

// Indeterminate shows a fixed quarter arc that spins
const filledLength = computed(() => {
    const ratio = props.isIndeterminate ? 0.25 : normalizedProgress.value / 100

    return ratio * circumference.value
})

const centerLabelSizeClass = computed(() => {
    const variants = {
        [ProgressCircleSize.XS]: 'text-[9px]',
        [ProgressCircleSize.SM]: 'text-[11px]',
        [ProgressCircleSize.MD]: 'text-sm',
        [ProgressCircleSize.LG]: 'text-lg',
        [ProgressCircleSize.XL]: 'text-2xl',
        [ProgressCircleSize.XXL]: 'text-3xl',
    }

    return variants[props.size as ProgressCircleSize] || 'text-sm'
})

const trackColorClass = computed(() => {
    const variants = {
        [ColorAccent.NEUTRAL]: 'stroke-background-neutral-default/10',
        [ColorAccent.SUCCESS]: 'stroke-background-success-bold/10',
        [ColorAccent.WARNING]: 'stroke-background-warning-bold/10',
        [ColorAccent.DANGER]: 'stroke-background-danger-bold/10',
        [ColorAccent.INFO]: 'stroke-background-info-bold/10',
        [ColorAccent.PRIMARY_BRAND]: 'stroke-background-primary-brand-default/10',
        [ColorAccent.SECONDARY_BRAND]: 'stroke-background-secondary-brand-default/10',
    }

    return variants[props.color as ColorAccent] || 'stroke-background-primary-brand-default/10'
})

const indicatorColorClass = computed(() => {
    const variants = {
        [ColorAccent.NEUTRAL]: 'stroke-background-neutral-default',
        [ColorAccent.SUCCESS]: 'stroke-background-success-bold',
        [ColorAccent.WARNING]: 'stroke-background-warning-bold',
        [ColorAccent.DANGER]: 'stroke-background-danger-bold',
        [ColorAccent.INFO]: 'stroke-background-info-bold',
        [ColorAccent.PRIMARY_BRAND]: 'stroke-background-primary-brand-default',
        [ColorAccent.SECONDARY_BRAND]: 'stroke-background-secondary-brand-default',
    }

    return variants[props.color as ColorAccent] || 'stroke-background-primary-brand-default'
})
</script>
