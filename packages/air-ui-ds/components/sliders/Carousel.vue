<template>
    <section
        aria-roledescription="carousel"
        :aria-label="ariaLabel"
        :class="[
            'relative',
            'flex',
            'flex-col',
            'gap-3',
        ]"
        @keydown.left.prevent="prev"
        @keydown.right.prevent="next"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
        @focusin="isHovering = true"
        @focusout="isHovering = false"
    >
        <div class="relative">
            <div class="overflow-hidden">
                <ul
                    :class="[
                        isStacked ? 'grid' : 'flex',
                        'm-0',
                        'p-0',
                        'list-none',
                        'touch-pan-y',
                        'motion-reduce:!transition-none',
                    ]"
                    :style="trackStyle"
                    aria-live="polite"
                    @pointerdown="onPointerDown"
                    @pointermove="onPointerMove"
                    @pointerup="onPointerEnd"
                    @pointercancel="onPointerEnd"
                >
                    <li
                        v-for="(item, index) in items"
                        :key="index"
                        aria-roledescription="slide"
                        :aria-label="`${index + 1} / ${items.length}`"
                        :aria-hidden="isSlideVisible(index) ? undefined : 'true'"
                        :class="[
                            'shrink-0',
                            'select-none',
                            'motion-reduce:!transition-none',
                            ...slideStateClass(index),
                        ]"
                        :style="slideStyle"
                    >
                        <slot
                            :item="item"
                            :index="index"
                        />
                    </li>
                </ul>
            </div>

            <template v-if="hasArrows && pageCount > 1">
                <ActionIconButton
                    icon="mdi:chevron-left"
                    class="absolute left-2 top-1/2 -translate-y-1/2"
                    :size="ButtonSize.MD"
                    :isRounded="true"
                    :hasFocusRing="false"
                    :disabled="!canGoPrev"
                    :ariaLabel="previousAriaLabel"
                    @click="prev"
                />
                <ActionIconButton
                    icon="mdi:chevron-right"
                    class="absolute right-2 top-1/2 -translate-y-1/2"
                    :size="ButtonSize.MD"
                    :isRounded="true"
                    :hasFocusRing="false"
                    :disabled="!canGoNext"
                    :ariaLabel="nextAriaLabel"
                    @click="next"
                />
            </template>
        </div>

        <div
            v-if="hasDots && pageCount > 1"
            class="flex items-center justify-center gap-2"
        >
            <button
                v-for="page in pageCount"
                :key="page"
                type="button"
                :aria-label="`${dotAriaLabel} ${page}`"
                :aria-current="current === page - 1 ? 'true' : undefined"
                :class="[
                    'h-2',
                    'rounded-full',
                    'transition-all duration-200 ease-out',
                    'focus-visible:ring-2',
                    'focus-visible:ring-offset-2',
                    'focus-visible:ring-border-primary-brand-default',
                    current === page - 1
                        ? 'w-6 bg-background-primary-brand-default'
                        : 'w-2 bg-background-neutral-filled-default hover:bg-background-neutral-filled-hover',
                ]"
                @click="goTo(page - 1)"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    modelValue: {
        type: Number as PropType<number>,
        default: 0,
    },
    items: {
        type: Array as PropType<unknown[]>,
        default: () => [],
    },
    slidesPerView: {
        type: Number as PropType<number>,
        default: 1,
    },
    gap: {
        type: String as PropType<string>,
        default: '1rem',
    },
    hasArrows: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasDots: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    isLoop: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    autoplay: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    autoplayInterval: {
        type: Number as PropType<number>,
        default: 4000,
    },
    transition: {
        type: String as PropType<CarouselTransition>,
        default: CarouselTransition.SLIDE,
        validator: (value: CarouselTransition) => Object.values(CarouselTransition).includes(value),
    },
    easing: {
        type: String as PropType<CarouselEasing>,
        default: CarouselEasing.SMOOTH,
        validator: (value: CarouselEasing) => Object.values(CarouselEasing).includes(value),
    },
    speed: {
        type: Number as PropType<number>,
        default: 500,
    },
    pauseOnHover: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    previousAriaLabel: {
        type: String as PropType<string>,
        default: 'Previous slide',
    },
    nextAriaLabel: {
        type: String as PropType<string>,
        default: 'Next slide',
    },
    dotAriaLabel: {
        type: String as PropType<string>,
        default: 'Go to slide',
    },
    ariaLabel: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue', 'change'])

// State
const current = ref(0)
const isHovering = ref(false)
const isDragging = ref(false)
const dragOffset = ref(0)
let dragStartX = 0
let dragWidth = 0
let timer: ReturnType<typeof setInterval> | undefined

// Computed
// Fade and zoom stack the slides in one cell, so only one slide is shown at a time
const isStacked = computed(() => [CarouselTransition.FADE, CarouselTransition.ZOOM].includes(props.transition))
const perView = computed(() => isStacked.value ? 1 : Math.max(1, Math.floor(props.slidesPerView)))
const duration = computed(() => props.transition === CarouselTransition.NONE ? 0 : props.speed)

const easingValue = computed(() => {
    const easing = {
        [CarouselEasing.SMOOTH]: 'cubic-bezier(0.22, 1, 0.36, 1)',
        [CarouselEasing.EASE_IN_OUT]: 'ease-in-out',
        [CarouselEasing.LINEAR]: 'linear',
        [CarouselEasing.BOUNCE]: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    }
    return easing[props.easing] || easing[CarouselEasing.SMOOTH]
})

const pageCount = computed(() => Math.max(1, props.items.length - perView.value + 1))
const canGoPrev = computed(() => props.isLoop || current.value > 0)
const canGoNext = computed(() => props.isLoop || current.value < pageCount.value - 1)

// Slide width: the viewport minus the gaps, divided by the slides per view
const slideWidth = computed(() => `((100% - ${props.gap} * ${perView.value - 1}) / ${perView.value})`)

const slideStyle = computed(() => ({
    ...(isStacked.value
        ? { gridArea: '1 / 1' }
        : { flex: `0 0 calc${slideWidth.value}`, marginRight: props.gap }),
    transition: `opacity ${duration.value}ms ${easingValue.value}, transform ${duration.value}ms ${easingValue.value}`,
}))

const trackStyle = computed(() => ({
    transition: isDragging.value ? 'none' : `transform ${duration.value}ms ${easingValue.value}`,
    ...(!isStacked.value && {
        transform: `translateX(calc(${current.value} * -1 * (${slideWidth.value} + ${props.gap}) + ${dragOffset.value}px))`,
    }),
}))

// Navigation
const goTo = (index: number) => {
    const target = Math.min(Math.max(index, 0), pageCount.value - 1)
    if (target === current.value) return
    current.value = target
    emit('update:modelValue', target)
    emit('change', target)
}

const next = () => {
    if (current.value < pageCount.value - 1) {
        goTo(current.value + 1)
    } else if (props.isLoop) {
        goTo(0)
    }
}

const prev = () => {
    if (current.value > 0) {
        goTo(current.value - 1)
    } else if (props.isLoop) {
        goTo(pageCount.value - 1)
    }
}

const isSlideVisible = (index: number) => index >= current.value && index < current.value + perView.value

// Classes per transition for the visible and hidden slides
const slideStateClass = (index: number) => {
    const visible = isSlideVisible(index)
    const classes = {
        [CarouselTransition.SLIDE]: visible ? ['opacity-100', 'scale-100'] : ['opacity-40', 'scale-95'],
        [CarouselTransition.FADE]: visible ? ['opacity-100'] : ['opacity-0', 'pointer-events-none'],
        [CarouselTransition.ZOOM]: visible ? ['opacity-100', 'scale-100'] : ['opacity-0', 'scale-90', 'pointer-events-none'],
        [CarouselTransition.NONE]: [],
    }
    return classes[props.transition] || classes[CarouselTransition.SLIDE]
}

// Swipe
const onPointerDown = (event: PointerEvent) => {
    if (pageCount.value <= 1) return
    isDragging.value = true
    dragStartX = event.clientX
    const track = event.currentTarget as HTMLElement
    dragWidth = track.clientWidth
    track.setPointerCapture?.(event.pointerId)
}

const onPointerMove = (event: PointerEvent) => {
    if (!isDragging.value) return
    dragOffset.value = event.clientX - dragStartX
}

const onPointerEnd = () => {
    if (!isDragging.value) return
    const threshold = Math.min(dragWidth * 0.15, 80)
    if (dragOffset.value <= -threshold) {
        next()
    } else if (dragOffset.value >= threshold) {
        prev()
    }
    isDragging.value = false
    dragOffset.value = 0
}

// Autoplay
const stopAutoplay = () => {
    clearInterval(timer)
    timer = undefined
}

const startAutoplay = () => {
    stopAutoplay()
    if (!props.autoplay || pageCount.value <= 1) return
    timer = setInterval(() => {
        if (props.pauseOnHover && (isHovering.value || isDragging.value)) return
        if (!props.isLoop && current.value >= pageCount.value - 1) return
        next()
    }, props.autoplayInterval)
}

// Sync
watch(() => props.modelValue, (value) => {
    current.value = Math.min(Math.max(value, 0), pageCount.value - 1)
}, { immediate: true })

watch(pageCount, (count) => {
    if (current.value > count - 1) goTo(count - 1)
})

watch(() => [props.autoplay, props.autoplayInterval, pageCount.value], startAutoplay)

onMounted(startAutoplay)
onBeforeUnmount(stopAutoplay)

// Expose
defineExpose({ next, prev, goTo })
</script>
