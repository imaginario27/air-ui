<template>
    <div
        :class="[
            'flex flex-col',
            'gap-2',
            'w-full',
        ]"
        :style="{ minWidth: `${minWidth}px` }"
        data-testid="signature-pad-root"
    >
        <div
            :class="[
                'relative',
                'w-full',
                'border rounded-lg',
                'overflow-hidden',
                hasError ? 'border-border-error' : 'border-border-default',
                disabled
                    ? 'bg-background-neutral-disabled cursor-not-allowed opacity-disabled'
                    : 'bg-background-container-surface',
            ]"
            :style="{ height: `${height}px` }"
        >
            <!-- Guide -->
            <div
                v-if="showGuide"
                :class="[
                    'absolute inset-x-4 bottom-8',
                    'flex items-end justify-center',
                    'border-b border-dashed border-border-default',
                    'pointer-events-none select-none',
                ]"
                data-testid="signature-pad-guide"
            >
                <span
                    v-if="placeholder && isEmpty"
                    class="mb-2 text-sm text-text-neutral-subtler"
                    data-testid="signature-pad-placeholder"
                >
                    {{ placeholder }}
                </span>
            </div>

            <!-- Drawing surface -->
            <svg
                ref="svgRef"
                role="img"
                :aria-label="ariaLabel"
                :aria-labelledby="ariaLabelledby"
                :aria-disabled="disabled || undefined"
                :aria-readonly="readOnly || undefined"
                :class="[
                    'absolute inset-0',
                    'w-full h-full',
                    'touch-none select-none',
                    isInteractive ? 'cursor-crosshair' : 'cursor-default',
                ]"
                fill="none"
                data-testid="signature-pad-surface"
                @pointerdown="handlePointerDown"
                @pointermove="handlePointerMove"
                @pointerup="handlePointerUp"
                @pointercancel="handlePointerUp"
            >
                <path
                    v-for="(path, index) in modelValue"
                    :key="index"
                    :d="path"
                    :stroke-width="strokeSize"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="stroke-text-default"
                    data-testid="signature-pad-path"
                />
                <path
                    v-if="currentPath"
                    :d="currentPath"
                    :stroke-width="strokeSize"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="stroke-text-default"
                    data-testid="signature-pad-current-path"
                />
            </svg>

            <!-- Clear button -->
            <div
                v-if="showClearButton && !isEmpty"
                class="absolute top-2 right-2"
            >
                <ActionIconButton
                    :icon="clearIcon"
                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                    :size="ButtonSize.SM"
                    :ariaLabel="clearAriaLabel"
                    :disabled="disabled || readOnly"
                    data-testid="signature-pad-clear"
                    @click="clear"
                />
            </div>
        </div>

        <input
            v-if="name"
            type="hidden"
            :name="name"
            :value="serializedValue"
            data-testid="signature-pad-hidden-input"
        >
    </div>
</template>

<script setup lang="ts">
interface SignaturePoint {
    x: number
    y: number
}

// Props
const props = defineProps({
    ariaLabel: {
        type: String as PropType<string>,
        default: 'Signature pad',
    },
    ariaLabelledby: String as PropType<string>,
    modelValue: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    name: String as PropType<string>,
    height: {
        type: Number as PropType<number>,
        default: 200,
    },
    minWidth: {
        type: Number as PropType<number>,
        default: 240,
    },
    strokeSize: {
        type: Number as PropType<number>,
        default: 2,
    },
    showGuide: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    placeholder: {
        type: String as PropType<string>,
        default: 'Sign here',
    },
    showClearButton: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    clearIcon: {
        type: String as PropType<string>,
        default: 'mdi:eraser',
    },
    clearAriaLabel: {
        type: String as PropType<string>,
        default: 'Clear signature',
    },
    hasError: {
        type: Boolean as PropType<boolean>,
        default: false,
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
const emit = defineEmits(['update:modelValue', 'draw', 'draw-end', 'clear'])

// States
const svgRef = ref<SVGSVGElement | null>(null)
const points = ref<SignaturePoint[]>([])
const isDrawing = ref(false)

// Computed
const isInteractive = computed(() => !props.disabled && !props.readOnly)
const currentPath = computed(() => pointsToPath(points.value))
const isEmpty = computed(() => props.modelValue.length === 0 && !currentPath.value)
const serializedValue = computed(() => JSON.stringify(props.modelValue))

// Methods
// Smooths the stroke with quadratic curves through the midpoints of consecutive points
function pointsToPath(list: SignaturePoint[]) {
    const [first, second] = list

    if (!first) {
        return ''
    }

    if (!second) {
        return `M ${first.x} ${first.y} L ${first.x} ${first.y}`
    }

    let path = `M ${first.x} ${first.y}`

    for (let index = 1; index < list.length - 1; index++) {
        const current = list[index]!
        const next = list[index + 1]!
        path += ` Q ${current.x} ${current.y} ${(current.x + next.x) / 2} ${(current.y + next.y) / 2}`
    }

    const last = list[list.length - 1]!
    return `${path} L ${last.x} ${last.y}`
}

const eventToPoint = (event: PointerEvent): SignaturePoint => {
    const rect = svgRef.value?.getBoundingClientRect()

    return {
        x: Number((event.clientX - (rect?.left ?? 0)).toFixed(2)),
        y: Number((event.clientY - (rect?.top ?? 0)).toFixed(2)),
    }
}

const handlePointerDown = (event: PointerEvent) => {
    if (!isInteractive.value) {
        return
    }

    event.preventDefault()
    svgRef.value?.setPointerCapture?.(event.pointerId)
    isDrawing.value = true
    points.value = [eventToPoint(event)]
    emit('draw', { paths: props.modelValue, currentPath: currentPath.value })
}

const handlePointerMove = (event: PointerEvent) => {
    if (!isDrawing.value) {
        return
    }

    points.value = [...points.value, eventToPoint(event)]
    emit('draw', { paths: props.modelValue, currentPath: currentPath.value })
}

const handlePointerUp = (event: PointerEvent) => {
    if (!isDrawing.value) {
        return
    }

    svgRef.value?.releasePointerCapture?.(event.pointerId)
    isDrawing.value = false

    const paths = [...props.modelValue, currentPath.value]
    points.value = []

    emit('update:modelValue', paths)
    emit('draw-end', { paths })
}

const clear = () => {
    if (!isInteractive.value) {
        return
    }

    points.value = []
    isDrawing.value = false
    emit('update:modelValue', [])
    emit('clear')
}

// Renders the committed strokes to a canvas and returns it as a data URL
const getDataUrl = (type = 'image/png', quality?: number) => {
    const svg = svgRef.value
    const width = svg?.clientWidth || 300
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = props.height

    const context = canvas.getContext('2d')

    if (!context) {
        return ''
    }

    // Reuse the token-resolved stroke color so the export matches the theme
    if (svg) {
        context.strokeStyle = getComputedStyle(svg.querySelector('path') ?? svg).stroke
    }
    context.lineWidth = props.strokeSize
    context.lineCap = 'round'
    context.lineJoin = 'round'

    props.modelValue.forEach(path => context.stroke(new Path2D(path)))

    return canvas.toDataURL(type, quality)
}

defineExpose({ clear, getDataUrl })
</script>
