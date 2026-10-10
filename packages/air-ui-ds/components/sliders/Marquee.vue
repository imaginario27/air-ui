<template>
    <div
        ref="viewportRef"
        role="group"
        :aria-label="ariaLabel"
        :data-orientation="orientation"
        :class="[
            'flex',
            'overflow-hidden',
            'select-none',
            isVertical ? 'flex-col h-full' : 'flex-row w-full',
        ]"
        :style="viewportStyle"
        @mouseenter="isInteracting = true"
        @mouseleave="isInteracting = false"
        @focusin="isInteracting = true"
        @focusout="isInteracting = false"
    >
        <div
            v-for="index in copies"
            :key="index"
            ref="contentRefs"
            :aria-hidden="index > 1 ? 'true' : undefined"
            :class="[
                'flex',
                'shrink-0',
                'items-center',
                'motion-reduce:[animation-play-state:paused]',
                isVertical ? 'flex-col' : 'flex-row',
            ]"
            :style="contentStyle"
            @animationiteration="index === 1 && emit('loopComplete')"
            @animationend="index === 1 && emit('complete')"
        >
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    orientation: {
        type: String as PropType<Orientation>,
        default: Orientation.HORIZONTAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value),
    },
    speed: {
        type: Number as PropType<number>,
        default: 50,
    },
    gap: {
        type: String as PropType<string>,
        default: '1rem',
    },
    isReversed: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    autoFill: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    pauseOnHover: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isPaused: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasFadeEdges: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    fadeSize: {
        type: Number as PropType<number>,
        default: 10,
    },
    delay: {
        type: Number as PropType<number>,
        default: 0,
    },
    loopCount: {
        type: Number as PropType<number>,
        default: 0,
    },
    ariaLabel: String as PropType<string>,
})

// Emits
const emit = defineEmits(['loopComplete', 'complete'])

// State
const viewportRef = ref<HTMLElement | null>(null)
const contentRefs = ref<HTMLElement[]>([])
const viewportSize = ref(0)
const loopSize = ref(0)
const isInteracting = ref(false)

// Computed
const isVertical = computed(() => props.orientation === Orientation.VERTICAL)

const copies = computed(() => {
    if (!props.autoFill || !loopSize.value) return 2
    return Math.max(2, Math.ceil(viewportSize.value / loopSize.value) + 1)
})

const duration = computed(() => {
    if (!loopSize.value || props.speed <= 0) return 0
    return loopSize.value / props.speed
})

// fadeSize is the percentage of the container faded at each end
const viewportStyle = computed(() => {
    const size = Math.min(Math.max(props.fadeSize, 0), 50)
    const direction = isVertical.value ? 'to bottom' : 'to right'

    return {
        gap: props.gap,
        ...(props.hasFadeEdges && {
            maskImage: `linear-gradient(${direction}, transparent, black ${size}%, black ${100 - size}%, transparent)`,
        }),
    }
})

const isPlaying = computed(() => !props.isPaused && !(props.pauseOnHover && isInteracting.value))

const contentStyle = computed(() => ({
    gap: props.gap,
    '--marquee-gap': props.gap,
    animationName: isVertical.value ? 'air-marquee-vertical' : 'air-marquee-horizontal',
    animationDuration: `${duration.value}s`,
    animationDelay: `${props.delay}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: props.loopCount > 0 ? props.loopCount : 'infinite',
    animationDirection: props.isReversed ? 'reverse' : 'normal',
    animationPlayState: isPlaying.value ? 'running' : 'paused',
}))

// Measuring: loopSize is the distance of one full loop (content size plus gap)
const measure = () => {
    const viewport = viewportRef.value
    const content = contentRefs.value[0]
    if (!viewport || !content) return

    const style = getComputedStyle(viewport)
    const gapPx = Number.parseFloat(isVertical.value ? style.rowGap : style.columnGap) || 0
    viewportSize.value = isVertical.value ? viewport.clientHeight : viewport.clientWidth
    loopSize.value = (isVertical.value ? content.offsetHeight : content.offsetWidth) + gapPx
}

let observer: ResizeObserver | null = null

onMounted(() => {
    measure()
    if (typeof ResizeObserver === 'undefined') return
    observer = new ResizeObserver(measure)
    if (viewportRef.value) observer.observe(viewportRef.value)
    if (contentRefs.value[0]) observer.observe(contentRefs.value[0])
})

onBeforeUnmount(() => observer?.disconnect())

watch(() => [props.orientation, props.gap], () => nextTick(measure))
</script>

<style>
/* Each content copy slides by its own size plus the gap for a seamless loop */
@keyframes air-marquee-horizontal {
    to {
        transform: translateX(calc(-100% - var(--marquee-gap)));
    }
}

@keyframes air-marquee-vertical {
    to {
        transform: translateY(calc(-100% - var(--marquee-gap)));
    }
}
</style>
