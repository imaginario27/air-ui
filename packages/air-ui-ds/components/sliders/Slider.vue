<template>
    <div
        :class="[
            'relative select-none',
            orientationContainerClass,
            disabled && 'cursor-not-allowed',
        ]"
        data-testid="slider-root"
    >
        <div
            ref="trackRef"
            :class="[
                'relative touch-none',
                trackContainerClass,
            ]"
            @pointerdown="handleTrackPointerDown"
        >
            <div
                :class="[
                    'absolute',
                    !hasCustomRadius && 'rounded-full',
                    incompleteTrackColorClass,
                ]"
                :style="[baseTrackStyle, radiusStyle]"
                data-testid="slider-track"
            />

            <div
                :class="[
                    'absolute',
                    !hasCustomRadius && 'rounded-full',
                    completedTrackColorClass,
                ]"
                :style="[filledTrackStyle, radiusStyle]"
                data-testid="slider-fill"
            />

            <button
                v-for="(value, index) in thumbValues"
                :key="`thumb-${index}`"
                type="button"
                :class="[
                    'absolute border-2 bg-neutral-white shadow-sm',
                    !hasCustomRadius && 'rounded-full',
                    thumbBorderColorClass,
                    'bg-background-container-surface',
                    disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing',
                    'focus:outline-none focus:ring-2 focus:ring-border-primary-brand-default',
                ]"
                :style="[thumbStyle(index, value), radiusStyle]"
                :disabled
                :aria-label="getThumbAriaLabel(index)"
                :aria-orientation="orientation"
                :data-testid="`slider-thumb-${index}`"
                @pointerdown.stop.prevent="startThumbDrag(index, $event)"
                @keydown="handleThumbKeydown($event, index)"
            >
                <span
                    v-if="hasTooltip"
                    :class="[
                        'absolute left-1/2 -translate-x-1/2 -top-8',
                        'px-2 py-1 rounded text-xs font-semibold whitespace-nowrap',
                        'bg-background-neutral-filled-default/85 text-text-neutral-on-filled',
                        disabled ? 'hidden' : 'block',
                    ]"
                    :data-testid="`slider-tooltip-${index}`"
                >
                    {{ formatValue(value) }}
                </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    ariaLabel: String as PropType<string>,
    modelValue: {
        type: [Number, Array] as PropType<number | [number, number]>,
        default: 0,
    },
    type: {
        type: String as PropType<SliderType>,
        default: SliderType.SINGLE,
        validator: (value: SliderType) => Object.values(SliderType).includes(value),
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.NEUTRAL,
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    size: {
        type: String as PropType<SliderSize>,
        default: SliderSize.MD,
        validator: (value: SliderSize) => Object.values(SliderSize).includes(value),
    },
    step: {
        type: Number as PropType<number>,
        default: 1,
    },
    min: {
        type: Number as PropType<number>,
        default: 0,
    },
    max: {
        type: Number as PropType<number>,
        default: 100,
    },
    multiple: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    orientation: {
        type: String as PropType<Orientation>,
        default: Orientation.HORIZONTAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value),
    },
    hasTooltip: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    borderRadius: {
        type: [Number, String] as PropType<number | string | undefined>,
        default: undefined,
    },
})

// Emits
const emit = defineEmits(['update:modelValue'])

// States
const trackRef = ref<HTMLElement | null>(null)
const activeThumbIndex = ref<number | null>(null)

// Computed
const isRange = computed(() => {
    return props.type === SliderType.RANGE || props.multiple || Array.isArray(props.modelValue)
})

const getThumbAriaLabel = (index: number) => {
    const baseLabel = props.ariaLabel || 'Slider'

    if (!isRange.value) {
        return `${baseLabel} thumb`
    }

    return `${baseLabel} thumb ${index + 1}`
}

const safeMax = computed(() => {
    if (props.max <= props.min) {
        return props.min + 1
    }

    return props.max
})

const span = computed(() => safeMax.value - props.min)

const stepPrecision = computed(() => {
    const stepText = String(props.step)
    const [, decimals = ''] = stepText.split('.')

    return decimals.length
})

const trackThicknessPx = computed(() => {
    const variants = {
        [SliderSize.XS]: 6,
        [SliderSize.SM]: 8,
        [SliderSize.MD]: 12,
        [SliderSize.LG]: 16,
    }

    return variants[props.size as SliderSize] ?? 12
})

const thumbSizePx = computed(() => {
    const variants = {
        [SliderSize.XS]: 12,
        [SliderSize.SM]: 16,
        [SliderSize.MD]: 20,
        [SliderSize.LG]: 24,
    }

    return variants[props.size as SliderSize] ?? 20
})

const numericBorderRadius = computed(() => {
    const parsed = Number(props.borderRadius)
    return Number.isFinite(parsed) ? Math.max(parsed, 0) : null
})

const hasCustomRadius = computed(() => {
    return numericBorderRadius.value !== null
})

const radiusStyle = computed(() => {
    if (!hasCustomRadius.value) {
        return {}
    }

    return {
        borderRadius: `${numericBorderRadius.value}px`,
    }
})

const orientationContainerClass = computed(() => {
    const variants = {
        [Orientation.HORIZONTAL]: 'w-full py-2',
        [Orientation.VERTICAL]: 'h-[240px] w-[44px] flex items-center justify-center',
    }

    return variants[props.orientation as Orientation] ?? 'w-full py-2'
})

const trackContainerClass = computed(() => {
    const variants = {
        [Orientation.HORIZONTAL]: 'w-full h-[32px]',
        [Orientation.VERTICAL]: 'h-full w-[32px]',
    }

    return variants[props.orientation as Orientation] ?? 'w-full h-[32px]'
})

const incompleteTrackColorClass = computed(() => {
    const variants = {
        [ColorAccent.NEUTRAL]: 'bg-background-neutral-bold/30',
        [ColorAccent.SUCCESS]: 'bg-background-success-bold/30',
        [ColorAccent.WARNING]: 'bg-background-warning-bold/30',
        [ColorAccent.DANGER]: 'bg-background-danger-bold/30',
        [ColorAccent.INFO]: 'bg-background-info-bold/30',
        [ColorAccent.PRIMARY_BRAND]: 'bg-background-primary-brand-default/30',
        [ColorAccent.SECONDARY_BRAND]: 'bg-background-secondary-brand-default/30',
    }

    return variants[props.color as ColorAccent] ?? 'bg-background-neutral-bold/30'
})

const completedTrackColorClass = computed(() => {
    const variants = {
        [ColorAccent.NEUTRAL]: 'bg-background-neutral-bold',
        [ColorAccent.SUCCESS]: 'bg-background-success-bold',
        [ColorAccent.WARNING]: 'bg-background-warning-bold',
        [ColorAccent.DANGER]: 'bg-background-danger-bold',
        [ColorAccent.INFO]: 'bg-background-info-bold',
        [ColorAccent.PRIMARY_BRAND]: 'bg-background-primary-brand-default',
        [ColorAccent.SECONDARY_BRAND]: 'bg-background-secondary-brand-default',
    }

    return variants[props.color as ColorAccent] ?? 'bg-background-neutral-default'
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

const normalizeToStep = (value: number) => {
    if (props.step <= 0) {
        return Number(value.toFixed(stepPrecision.value))
    }

    const stepped = Math.round((value - props.min) / props.step) * props.step + props.min
    return Number(stepped.toFixed(stepPrecision.value))
}

const clamp = (value: number) => {
    return Math.min(Math.max(value, props.min), safeMax.value)
}

const normalizedSingleValue = computed(() => {
    const rawValue = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue
    return clamp(normalizeToStep(Number(rawValue) || 0))
})

const normalizedRangeValue = computed<[number, number]>(() => {
    const fallback: [number, number] = [props.min, safeMax.value]

    if (!Array.isArray(props.modelValue)) {
        return fallback
    }

    const [first = props.min, second = safeMax.value] = props.modelValue
    const start = clamp(normalizeToStep(Math.min(first, second)))
    const end = clamp(normalizeToStep(Math.max(first, second)))

    return [start, end]
})

const thumbValues = computed(() => {
    return isRange.value ? normalizedRangeValue.value : [normalizedSingleValue.value]
})

const valueToPercent = (value: number) => {
    if (span.value <= 0) {
        return 0
    }

    return ((value - props.min) / span.value) * 100
}

const percentToValue = (percent: number) => {
    const raw = props.min + (span.value * percent) / 100
    return clamp(normalizeToStep(raw))
}

const baseTrackStyle = computed(() => {
    if (props.orientation === Orientation.VERTICAL) {
        return {
            width: `${trackThicknessPx.value}px`,
            height: '100%',
            left: '50%',
            bottom: '0',
            transform: 'translateX(-50%)',
        }
    }

    return {
        height: `${trackThicknessPx.value}px`,
        width: '100%',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
    }
})

const filledTrackStyle = computed(() => {
    if (isRange.value) {
        const [start, end] = normalizedRangeValue.value
        const startPercent = valueToPercent(start)
        const endPercent = valueToPercent(end)

        if (props.orientation === Orientation.VERTICAL) {
            return {
                width: `${trackThicknessPx.value}px`,
                height: `${Math.max(endPercent - startPercent, 0)}%`,
                left: '50%',
                bottom: `${startPercent}%`,
                transform: 'translateX(-50%)',
            }
        }

        return {
            height: `${trackThicknessPx.value}px`,
            width: `${Math.max(endPercent - startPercent, 0)}%`,
            left: `${startPercent}%`,
            top: '50%',
            transform: 'translateY(-50%)',
        }
    }

    const endPercent = valueToPercent(normalizedSingleValue.value)

    if (props.orientation === Orientation.VERTICAL) {
        return {
            width: `${trackThicknessPx.value}px`,
            height: `${Math.max(endPercent, 0)}%`,
            left: '50%',
            bottom: '0',
            transform: 'translateX(-50%)',
        }
    }

    return {
        height: `${trackThicknessPx.value}px`,
        width: `${Math.max(endPercent, 0)}%`,
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
    }
})

const thumbStyle = (index: number, value: number) => {
    const thumbSize = `${thumbSizePx.value}px`
    const percent = valueToPercent(value)
    const zIndex = activeThumbIndex.value === index ? 30 : 20 + index

    if (props.orientation === Orientation.VERTICAL) {
        return {
            width: thumbSize,
            height: thumbSize,
            left: '50%',
            bottom: `calc(${percent}% - ${thumbSizePx.value / 2}px)`,
            transform: 'translateX(-50%)',
            zIndex,
        }
    }

    return {
        width: thumbSize,
        height: thumbSize,
        top: '50%',
        left: `calc(${percent}% - ${thumbSizePx.value / 2}px)`,
        transform: 'translateY(-50%)',
        zIndex,
    }
}

const formatValue = (value: number) => {
    if (stepPrecision.value === 0) {
        return String(Math.round(value))
    }

    return String(Number(value.toFixed(stepPrecision.value)))
}

const emitSingle = (value: number) => {
    emit('update:modelValue', value)
}

const emitRange = (start: number, end: number) => {
    emit('update:modelValue', [start, end])
}

const updateValueByThumb = (thumbIndex: number, nextValue: number) => {
    if (isRange.value) {
        const [start, end] = normalizedRangeValue.value

        if (thumbIndex === 0) {
            emitRange(Math.min(nextValue, end), end)
            return
        }

        emitRange(start, Math.max(nextValue, start))
        return
    }

    emitSingle(nextValue)
}

const eventToPercent = (event: PointerEvent) => {
    const track = trackRef.value
    if (!track) {
        return 0
    }

    const rect = track.getBoundingClientRect()

    if (props.orientation === Orientation.VERTICAL) {
        const raw = ((rect.bottom - event.clientY) / rect.height) * 100
        return Math.min(Math.max(raw, 0), 100)
    }

    const raw = ((event.clientX - rect.left) / rect.width) * 100
    return Math.min(Math.max(raw, 0), 100)
}

const findClosestThumbIndex = (nextValue: number) => {
    if (!isRange.value) {
        return 0
    }

    const [start, end] = normalizedRangeValue.value
    const startDistance = Math.abs(start - nextValue)
    const endDistance = Math.abs(end - nextValue)

    return startDistance <= endDistance ? 0 : 1
}

const onPointerMove = (event: PointerEvent) => {
    if (activeThumbIndex.value === null) {
        return
    }

    const percent = eventToPercent(event)
    const nextValue = percentToValue(percent)
    updateValueByThumb(activeThumbIndex.value, nextValue)
}

const stopDragging = () => {
    activeThumbIndex.value = null
    globalThis.removeEventListener('pointermove', onPointerMove)
    globalThis.removeEventListener('pointerup', stopDragging)
}

const startThumbDrag = (index: number, event: PointerEvent) => {
    if (props.disabled) {
        return
    }

    event.preventDefault()
    activeThumbIndex.value = index
    globalThis.addEventListener('pointermove', onPointerMove)
    globalThis.addEventListener('pointerup', stopDragging)
}

const handleTrackPointerDown = (event: PointerEvent) => {
    if (props.disabled) {
        return
    }

    const percent = eventToPercent(event)
    const nextValue = percentToValue(percent)
    const targetThumb = findClosestThumbIndex(nextValue)

    updateValueByThumb(targetThumb, nextValue)
    startThumbDrag(targetThumb, event)
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

const handleThumbKeydown = (event: KeyboardEvent, index: number) => {
    if (props.disabled) {
        return
    }

    if (event.key === 'Home') {
        event.preventDefault()
        updateValueByThumb(index, props.min)
        return
    }

    if (event.key === 'End') {
        event.preventDefault()
        updateValueByThumb(index, safeMax.value)
        return
    }

    const delta = incrementForKey(event.key)

    if (delta === 0) {
        return
    }

    event.preventDefault()
    const current = thumbValues.value[index] ?? props.min
    updateValueByThumb(index, clamp(normalizeToStep(current + delta)))
}

onBeforeUnmount(() => {
    stopDragging()
})
</script>
