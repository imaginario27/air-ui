<template>
    <div
        ref="dialRef"
        :class="[
            'relative select-none touch-none',
            disabled && 'cursor-not-allowed opacity-disabled',
        ]"
        :style="{ width: `${dialSizePx}px`, height: `${dialSizePx}px` }"
        data-testid="angle-slider-root"
        @pointerdown="handleDialPointerDown"
    >
        <svg
            :width="dialSizePx"
            :height="dialSizePx"
            :viewBox="`0 0 ${dialSizePx} ${dialSizePx}`"
            fill="none"
            aria-hidden="true"
        >
            <circle
                :cx="center"
                :cy="center"
                :r="radius"
                :stroke-width="trackThicknessPx"
                :class="incompleteTrackColorClass"
                data-testid="angle-slider-track"
            />
            <circle
                :cx="center"
                :cy="center"
                :r="radius"
                :stroke-width="trackThicknessPx"
                :stroke-dasharray="`${filledLength} ${circumference}`"
                :stroke-linecap="isRounded && normalizedValue > 0 ? 'round' : 'butt'"
                :transform="`rotate(-90 ${center} ${center})`"
                :class="completedTrackColorClass"
                data-testid="angle-slider-fill"
            />
            <line
                v-for="marker in markers"
                :key="marker.angle"
                :x1="marker.x1"
                :y1="marker.y1"
                :x2="marker.x2"
                :y2="marker.y2"
                stroke-width="2"
                stroke-linecap="round"
                class="stroke-border-default"
                data-testid="angle-slider-marker"
            />
        </svg>

        <div
            v-if="showValue || $slots.default"
            class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
            <slot :value="normalizedValue">
                <span
                    :class="[
                        'font-semibold text-text-default',
                        valueTextSizeClass,
                    ]"
                    data-testid="angle-slider-value"
                >
                    {{ normalizedValue }}°
                </span>
                <span
                    v-if="valueLabel"
                    :class="[
                        'text-text-neutral-subtle',
                        valueLabelSizeClass,
                    ]"
                    data-testid="angle-slider-value-label"
                >
                    {{ valueLabel }}
                </span>
            </slot>
        </div>

        <button
            type="button"
            role="slider"
            :class="[
                'absolute border-2 rounded-full shadow-sm',
                'bg-background-container-surface disabled:opacity-100!',
                thumbBorderColorClass,
                isInteractive ? 'cursor-grab active:cursor-grabbing' : 'cursor-not-allowed',
                'focus:outline-none focus:ring-2 focus:ring-border-primary-brand-default',
            ]"
            :style="thumbStyle"
            :disabled
            :aria-label="ariaLabelledby ? undefined : (ariaLabel || 'Angle slider')"
            :aria-labelledby="ariaLabelledby"
            :aria-valuemin="0"
            :aria-valuemax="MAX_ANGLE"
            :aria-valuenow="normalizedValue"
            :aria-valuetext="`${normalizedValue} degrees`"
            :aria-readonly="readOnly || undefined"
            data-testid="angle-slider-thumb"
            @pointerdown.stop.prevent="startDrag"
            @keydown="handleThumbKeydown"
        />
    </div>
</template>

<script setup lang="ts">
const MAX_ANGLE = 360

// Props
const props = defineProps({
    ariaLabel: String as PropType<string>,
    ariaLabelledby: String as PropType<string>,
    modelValue: {
        type: Number as PropType<number>,
        default: 0,
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.NEUTRAL,
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    size: {
        type: String as PropType<AngleSliderSize>,
        default: AngleSliderSize.MD,
        validator: (value: AngleSliderSize) => Object.values(AngleSliderSize).includes(value),
    },
    step: {
        type: Number as PropType<number>,
        default: 1,
    },
    isRounded: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showMarkers: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showValue: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    valueLabel: {
        type: String as PropType<string>,
        default: 'degrees',
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    readOnly: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'change-end'])

// States
const dialRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

// Computed
const isInteractive = computed(() => !props.disabled && !props.readOnly)

const dialSizePx = computed(() => {
    const variants = {
        [AngleSliderSize.XS]: 80,
        [AngleSliderSize.SM]: 112,
        [AngleSliderSize.MD]: 160,
        [AngleSliderSize.LG]: 208,
        [AngleSliderSize.XL]: 256,
        [AngleSliderSize.XXL]: 320,
    }

    return variants[props.size as AngleSliderSize] ?? 160
})

const trackThicknessPx = computed(() => {
    const variants = {
        [AngleSliderSize.XS]: 6,
        [AngleSliderSize.SM]: 8,
        [AngleSliderSize.MD]: 12,
        [AngleSliderSize.LG]: 16,
        [AngleSliderSize.XL]: 20,
        [AngleSliderSize.XXL]: 24,
    }

    return variants[props.size as AngleSliderSize] ?? 12
})

const thumbSizePx = computed(() => {
    const variants = {
        [AngleSliderSize.XS]: 14,
        [AngleSliderSize.SM]: 18,
        [AngleSliderSize.MD]: 24,
        [AngleSliderSize.LG]: 30,
        [AngleSliderSize.XL]: 36,
        [AngleSliderSize.XXL]: 44,
    }

    return variants[props.size as AngleSliderSize] ?? 24
})

const valueTextSizeClass = computed(() => {
    const variants = {
        [AngleSliderSize.XS]: 'text-base',
        [AngleSliderSize.SM]: 'text-xl',
        [AngleSliderSize.MD]: 'text-3xl',
        [AngleSliderSize.LG]: 'text-4xl',
        [AngleSliderSize.XL]: 'text-5xl',
        [AngleSliderSize.XXL]: 'text-6xl',
    }

    return variants[props.size as AngleSliderSize] ?? 'text-3xl'
})

const valueLabelSizeClass = computed(() => {
    const variants = {
        [AngleSliderSize.XS]: 'text-[10px]',
        [AngleSliderSize.SM]: 'text-xs',
        [AngleSliderSize.MD]: 'text-sm',
        [AngleSliderSize.LG]: 'text-sm',
        [AngleSliderSize.XL]: 'text-base',
        [AngleSliderSize.XXL]: 'text-lg',
    }

    return variants[props.size as AngleSliderSize] ?? 'text-sm'
})

const center = computed(() => dialSizePx.value / 2)
const radius = computed(() => (dialSizePx.value - thumbSizePx.value) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

// Ticks every 30° inside the ring; longer on the cardinal points (0°, 90°, 180°, 270°)
const markers = computed(() => {
    if (!props.showMarkers) {
        return []
    }

    const innerEdge = radius.value - trackThicknessPx.value / 2 - 4

    return Array.from({ length: 12 }, (_, index) => {
        const angle = index * 30
        const length = angle % 90 === 0 ? 8 : 4
        const sin = Math.sin((angle * Math.PI) / 180)
        const cos = Math.cos((angle * Math.PI) / 180)

        return {
            angle,
            x1: center.value + innerEdge * sin,
            y1: center.value - innerEdge * cos,
            x2: center.value + (innerEdge - length) * sin,
            y2: center.value - (innerEdge - length) * cos,
        }
    })
})

const stepPrecision = computed(() => {
    const [, decimals = ''] = String(props.step).split('.')
    return decimals.length
})

const clamp = (value: number) => Math.min(Math.max(value, 0), MAX_ANGLE)

const normalizeToStep = (value: number) => {
    if (props.step <= 0) {
        return Number(value.toFixed(stepPrecision.value))
    }

    return Number((Math.round(value / props.step) * props.step).toFixed(stepPrecision.value))
}

const normalizedValue = computed(() => clamp(normalizeToStep(Number(props.modelValue) || 0)))

const filledLength = computed(() => (normalizedValue.value / MAX_ANGLE) * circumference.value)

const thumbStyle = computed(() => {
    const radians = (normalizedValue.value * Math.PI) / 180
    const x = center.value + radius.value * Math.sin(radians)
    const y = center.value - radius.value * Math.cos(radians)

    return {
        width: `${thumbSizePx.value}px`,
        height: `${thumbSizePx.value}px`,
        left: `${x - thumbSizePx.value / 2}px`,
        top: `${y - thumbSizePx.value / 2}px`,
        zIndex: 20,
    }
})

const incompleteTrackColorClass = computed(() => {
    const variants = {
        [ColorAccent.NEUTRAL]: 'stroke-background-neutral-bold/30',
        [ColorAccent.SUCCESS]: 'stroke-background-success-bold/30',
        [ColorAccent.WARNING]: 'stroke-background-warning-bold/30',
        [ColorAccent.DANGER]: 'stroke-background-danger-bold/30',
        [ColorAccent.INFO]: 'stroke-background-info-bold/30',
        [ColorAccent.PRIMARY_BRAND]: 'stroke-background-primary-brand-default/30',
        [ColorAccent.SECONDARY_BRAND]: 'stroke-background-secondary-brand-default/30',
    }

    return variants[props.color as ColorAccent] ?? 'stroke-background-neutral-bold/30'
})

const completedTrackColorClass = computed(() => {
    const variants = {
        [ColorAccent.NEUTRAL]: 'stroke-background-neutral-bold',
        [ColorAccent.SUCCESS]: 'stroke-background-success-bold',
        [ColorAccent.WARNING]: 'stroke-background-warning-bold',
        [ColorAccent.DANGER]: 'stroke-background-danger-bold',
        [ColorAccent.INFO]: 'stroke-background-info-bold',
        [ColorAccent.PRIMARY_BRAND]: 'stroke-background-primary-brand-default',
        [ColorAccent.SECONDARY_BRAND]: 'stroke-background-secondary-brand-default',
    }

    return variants[props.color as ColorAccent] ?? 'stroke-background-neutral-bold'
})

const thumbBorderColorClass = computed(() => {
    const variants = {
        [ColorAccent.NEUTRAL]: 'border-border-neutral-bold',
        [ColorAccent.SUCCESS]: 'border-border-success-bold',
        [ColorAccent.WARNING]: 'border-border-warning-bold',
        [ColorAccent.DANGER]: 'border-border-danger-bold',
        [ColorAccent.INFO]: 'border-border-info-bold',
        [ColorAccent.PRIMARY_BRAND]: 'border-border-primary-brand-default',
        [ColorAccent.SECONDARY_BRAND]: 'border-border-secondary-brand-default',
    }

    return variants[props.color as ColorAccent] ?? 'border-border-default'
})

// Methods
const eventToAngle = (event: PointerEvent) => {
    const dial = dialRef.value
    if (!dial) {
        return 0
    }

    const rect = dial.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)

    // 0° at the top, increasing clockwise
    const degrees = (Math.atan2(dx, -dy) * 180) / Math.PI
    const angle = normalizeToStep((degrees + 360) % 360)

    return angle >= MAX_ANGLE ? 0 : angle
}

const updateFromPointer = (event: PointerEvent) => {
    emit('update:modelValue', eventToAngle(event))
}

const onPointerMove = (event: PointerEvent) => {
    if (isDragging.value) {
        updateFromPointer(event)
    }
}

const stopDragging = () => {
    if (isDragging.value) {
        emit('change-end', normalizedValue.value)
    }

    isDragging.value = false
    globalThis.removeEventListener('pointermove', onPointerMove)
    globalThis.removeEventListener('pointerup', stopDragging)
}

const startDrag = (event: PointerEvent) => {
    if (!isInteractive.value) {
        return
    }

    event.preventDefault()
    isDragging.value = true
    globalThis.addEventListener('pointermove', onPointerMove)
    globalThis.addEventListener('pointerup', stopDragging)
}

const handleDialPointerDown = (event: PointerEvent) => {
    if (!isInteractive.value) {
        return
    }

    updateFromPointer(event)
    startDrag(event)
}

const incrementForKey = (key: string) => {
    const baseStep = props.step > 0 ? props.step : 1

    if (key === 'PageUp') {
        return baseStep * 10
    }

    if (key === 'PageDown') {
        return -baseStep * 10
    }

    if (key === 'ArrowRight' || key === 'ArrowUp') {
        return baseStep
    }

    if (key === 'ArrowLeft' || key === 'ArrowDown') {
        return -baseStep
    }

    return 0
}

const commitValue = (value: number) => {
    emit('update:modelValue', value)
    emit('change-end', value)
}

const handleThumbKeydown = (event: KeyboardEvent) => {
    if (!isInteractive.value) {
        return
    }

    if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault()
        commitValue(event.key === 'Home' ? 0 : MAX_ANGLE)
        return
    }

    const delta = incrementForKey(event.key)

    if (delta === 0) {
        return
    }

    event.preventDefault()
    commitValue(clamp(normalizeToStep(normalizedValue.value + delta)))
}

onBeforeUnmount(() => {
    stopDragging()
})
</script>
