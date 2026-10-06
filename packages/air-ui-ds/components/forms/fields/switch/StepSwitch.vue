<template>
    <div class="relative inline-flex">
        <!-- Visually hidden native range input (keyboard + screen reader support) -->
        <input
            :id="id"
            type="range"
            min="0"
            :max="Math.max(visibleSteps.length - 1, 0)"
            step="1"
            :value="selectedIndex"
            class="peer sr-only"
            :aria-label="ariaLabel || 'Select step'"
            :aria-valuetext="selectedStep?.label ?? String(selectedStep?.value ?? '')"
            :disabled="disabled"
            @input="handleNativeInput"
        >

        <!-- Custom Step Switch -->
        <div
            ref="trackRef"
            aria-hidden="true"
            :class="[
                'relative flex items-center',
                'rounded-full overflow-hidden',
                'touch-none select-none',
                'border border-border-default',
                'bg-background-neutral-subtle',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-border-primary-brand-default',
                disabled ? 'bg-background-neutral-disabled cursor-not-allowed opacity-disabled' : 'cursor-pointer'
            ]"
            :style="{
                width: `${trackWidth}px`,
                height: `${dimensions.track}px`,
            }"
            @pointerdown="handlePointerDown"
            @pointermove="handlePointerMove"
            @pointerup="handlePointerEnd"
            @pointercancel="handlePointerEnd"
        >
            <!-- Filled progress -->
            <div
                :class="[
                    'absolute left-0 inset-y-0 rounded-full',
                    !isDragging && 'transition-all',
                    checkedBackgroundClass,
                ]"
                :style="{ width: `${fillWidth}px` }"
            />

            <!-- Steps -->
            <div
                v-for="(step, index) in visibleSteps"
                :key="step.value"
                data-step
                class="relative flex items-center justify-center"
                :style="{ width: `${dimensions.cell}px`, height: '100%' }"
            >
                <span
                    :class="[
                        'rounded-full',
                        index <= selectedIndex ? 'bg-icon-neutral-on-filled-bg opacity-60' : 'bg-icon-neutral-subtlest',
                        dotSizeClass,
                    ]"
                />
            </div>

            <!-- Handle -->
            <div
                data-handle
                :class="[
                    'absolute top-1/2 -translate-y-1/2',
                    'rounded-full shadow-md',
                    !isDragging && 'transition-all',
                    'bg-icon-neutral-on-filled-bg',
                ]"
                :style="{
                    width: `${dimensions.handle}px`,
                    height: `${dimensions.handle}px`,
                    left: `${handleLeft}px`,
                }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    id: {
        type: String as PropType<string>,
        required: true,
    },
    ariaLabel: String as PropType<string>,
    modelValue: {
        type: [String, Number] as PropType<string | number>,
        default: undefined,
    },
    steps: {
        type: Array as PropType<StepSwitchOption[]>,
        default: () => [],
    },
    maxSteps: {
        type: Number as PropType<number>,
        default: 5,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    size: {
        type: String as PropType<ControlFieldSize>,
        default: ControlFieldSize.MD,
        validator: (value: ControlFieldSize) => Object.values(ControlFieldSize).includes(value),
    },
    styleType: {
        type: String as PropType<SwitchStyle>,
        default: SwitchStyle.BRAND,
        validator: (value: SwitchStyle) => Object.values(SwitchStyle).includes(value),
    },
})

// Emits
const emit = defineEmits(['update:modelValue'])

// State
const trackRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const dragCenter = ref(0)

// Computed
const visibleSteps = computed(() => props.steps.slice(0, props.maxSteps))

const selectedIndex = computed(() => {
    const index = visibleSteps.value.findIndex(step => step.value === props.modelValue)
    return Math.max(index, 0)
})

const selectedStep = computed(() => visibleSteps.value[selectedIndex.value])

// Sizes in px. Track width depends on the number of steps, so it is applied inline.
const dimensions = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: { track: 16, cell: 20, handle: 12 },
        [ControlFieldSize.SM]: { track: 20, cell: 24, handle: 16 },
        [ControlFieldSize.MD]: { track: 24, cell: 28, handle: 16 },
        [ControlFieldSize.LG]: { track: 32, cell: 36, handle: 24 },
    }
    return sizeVariant[props.size as ControlFieldSize] || sizeVariant[ControlFieldSize.MD]
})

const innerWidth = computed(() => visibleSteps.value.length * dimensions.value.cell)

// Includes the 2px border so the inner area is exactly (steps * cell) wide
const trackWidth = computed(() => innerWidth.value + 2)

// While dragging, the handle follows the pointer; otherwise it rests centered on the selected step
const handleLeft = computed(() => {
    const { cell, handle } = dimensions.value
    if (isDragging.value) return dragCenter.value - handle / 2
    return selectedIndex.value * cell + (cell - handle) / 2
})

const fillWidth = computed(() => {
    const { cell } = dimensions.value
    if (isDragging.value) return Math.min(dragCenter.value + cell / 2, innerWidth.value)
    return (selectedIndex.value + 1) * cell
})

// Computed classes
const dotSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: 'w-[3px] h-[3px]',
        [ControlFieldSize.SM]: 'w-[4px] h-[4px]',
        [ControlFieldSize.MD]: 'w-[4px] h-[4px]',
        [ControlFieldSize.LG]: 'w-[5px] h-[5px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'w-[4px] h-[4px]'
})

const checkedBackgroundClass = computed(() => {
    const backgroundVariant = {
        [SwitchStyle.BRAND]: 'bg-background-primary-brand-checked',
        [SwitchStyle.SUCCESS]: 'bg-background-success-bold',
    }
    return backgroundVariant[props.styleType as SwitchStyle] || 'bg-background-primary-brand-checked'
})

// Handlers
const selectStep = (index: number) => {
    if (props.disabled) return

    const step = visibleSteps.value[index]
    if (!step || step.value === props.modelValue) return

    emit('update:modelValue', step.value)
}

// Maps the pointer position to a step and keeps the handle under the pointer while dragging
const updateFromPointer = (event: PointerEvent) => {
    if (!trackRef.value || !visibleSteps.value.length) return

    const { cell } = dimensions.value
    const rect = trackRef.value.getBoundingClientRect()
    // Subtract the 1px border so x is relative to the inner track
    const x = Math.min(Math.max(event.clientX - rect.left - 1, 0), innerWidth.value)

    dragCenter.value = Math.min(Math.max(x, cell / 2), innerWidth.value - cell / 2)
    selectStep(Math.min(Math.floor(x / cell), visibleSteps.value.length - 1))
}

const handlePointerDown = (event: PointerEvent) => {
    if (props.disabled) return

    isDragging.value = true
    trackRef.value?.setPointerCapture?.(event.pointerId)
    updateFromPointer(event)
}

const handlePointerMove = (event: PointerEvent) => {
    if (!isDragging.value) return

    updateFromPointer(event)
}

const handlePointerEnd = (event: PointerEvent) => {
    if (!isDragging.value) return

    isDragging.value = false
    trackRef.value?.releasePointerCapture?.(event.pointerId)
}

const handleNativeInput = (event: Event) => {
    selectStep(Number((event.target as HTMLInputElement).value))
}
</script>
