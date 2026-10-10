<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-300 motion-reduce:transition-none"
            leave-active-class="transition-opacity duration-200 motion-reduce:transition-none"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
        >
            <dialog
                v-if="modelValue"
                ref="rootEl"
                open
                aria-modal="true"
                tabindex="-1"
                :class="[
                    'fixed inset-0 z-9999 m-0 flex flex-col',
                    'h-full max-h-none w-full max-w-none p-0',
                    'border-none bg-background-neutral-filled-transparent',
                    'text-text-neutral-on-filled',
                    lightboxClass,
                ]"
                :aria-label="ariaLabel ?? dsConfig.lightbox.dialogText()"
                @keydown.escape.stop.prevent="close"
                @keydown.left.prevent="prev"
                @keydown.right.prevent="next"
            >
                <div class="pointer-events-none absolute inset-x-0 top-0 z-10 flex w-full items-center justify-between px-4 py-3">
                    <span
                        v-if="hasMultipleImages"
                        class="text-sm opacity-80"
                    >
                        {{ currentIndex + 1 }} / {{ images.length }}
                    </span>
                    <span v-else />

                    <div class="pointer-events-auto flex items-center gap-2">
                        <button
                            type="button"
                            :class="toolbarButtonClass"
                            :aria-label="fullscreenLabel ?? dsConfig.lightbox.fullscreenText()"
                            @click="toggleFullscreen"
                        >
                            <Icon
                                :name="isFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'"
                                :size="IconSize.MD"
                            />
                        </button>
                        <button
                            type="button"
                            :class="toolbarButtonClass"
                            :aria-label="closeLabel ?? dsConfig.actions.closeText()"
                            @click="close"
                        >
                            <Icon
                                name="mdi:close"
                                :size="IconSize.MD"
                            />
                        </button>
                    </div>
                </div>

                <div
                    ref="swipeAreaEl"
                    :class="[
                        'relative flex min-h-0 flex-1 touch-none items-center justify-center',
                        hasMultipleImages && isDragging && 'cursor-grabbing',
                        hasMultipleImages && !isDragging && 'cursor-grab',
                    ]"
                    @click.self="onOverlayClick"
                    @pointerdown="onPointerDown"
                    @pointermove="onPointerMove"
                    @pointerup="onPointerUp"
                    @pointercancel="onPointerUp"
                >
                    <Transition
                        :enter-active-class="slideEnterActive"
                        :leave-active-class="slideLeaveActive"
                        :enter-from-class="slideEnterFrom"
                        :leave-to-class="slideLeaveTo"
                        mode="out-in"
                    >
                        <div
                            v-if="current"
                            :key="current.id"
                            :class="[
                                'pointer-events-none flex h-full w-full select-none items-center justify-center',
                                imagePaddingClass,
                            ]"
                            :style="slideOffsetStyle"
                        >
                            <img
                                :src="current.src"
                                :alt="cleanImageAlt(current.alt)"
                                :width="current.width"
                                :height="current.height"
                                class="h-full w-full object-contain"
                                draggable="false"
                            />
                        </div>
                    </Transition>

                    <button
                        v-if="hasMultipleImages"
                        type="button"
                        :class="['absolute top-1/2 left-2 -translate-y-1/2 md:left-4', navButtonClass]"
                        :aria-label="prevLabel ?? dsConfig.lightbox.previousText()"
                        @click="prev"
                    >
                        <Icon
                            name="mdi:chevron-left"
                            :size="IconSize.LG"
                        />
                    </button>

                    <button
                        v-if="hasMultipleImages"
                        type="button"
                        :class="['absolute top-1/2 right-2 -translate-y-1/2 md:right-4', navButtonClass]"
                        :aria-label="nextLabel ?? dsConfig.lightbox.nextText()"
                        @click="next"
                    >
                        <Icon
                            name="mdi:chevron-right"
                            :size="IconSize.LG"
                        />
                    </button>
                </div>

                <div
                    v-if="showCaption && current?.caption"
                    class="px-4 pt-2 pb-4 text-center text-sm opacity-80"
                >
                    {{ current.caption }}
                </div>
            </dialog>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    images: {
        type: Array as PropType<GalleryImage[]>,
        required: true,
    },
    initialIndex: {
        type: Number as PropType<number>,
        default: 0,
    },
    loop: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    showCaption: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    closeOnClickOutside: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    lightboxClass: String as PropType<string>,
    ariaLabel: String as PropType<string>,
    prevLabel: String as PropType<string>,
    nextLabel: String as PropType<string>,
    closeLabel: String as PropType<string>,
    fullscreenLabel: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue', 'update:index', 'close'])

// Composables
const dsConfig = useDSConfig()

// Refs
const rootEl = ref<HTMLDialogElement | null>(null)
const swipeAreaEl = ref<HTMLElement | null>(null)
const previouslyFocusedElement = ref<HTMLElement | null>(null)

// State
const currentIndex = ref(props.initialIndex)
const slideDirection = ref<'left' | 'right'>('left')
const isFullscreen = ref(false)
const isDragging = ref(false)
const dragOffsetX = ref(0)
const previousBodyOverflow = ref<string | null>(null)

// Swipe tracking (non-reactive)
const SWIPE_THRESHOLD = 40
let startX = 0
let startY = 0
let pointerId: number | null = null
let wasInteracting = false

// Computed
const current = computed(() => props.images[currentIndex.value])
const hasMultipleImages = computed(() => props.images.length > 1)

const imagePaddingClass = computed(() =>
    isFullscreen.value ? 'px-4 py-4 md:px-6 md:py-6' : 'px-12 py-8 md:px-16 md:py-12'
)

const slideEnterFrom = computed(() =>
    slideDirection.value === 'left' ? 'translate-x-24 opacity-0' : '-translate-x-24 opacity-0'
)

const slideLeaveTo = computed(() =>
    slideDirection.value === 'left' ? '-translate-x-24 opacity-0' : 'translate-x-24 opacity-0'
)

const slideOffsetStyle = computed(() => {
    if (!dragOffsetX.value) return undefined
    return { transform: `translateX(${dragOffsetX.value}px)` }
})

// Classes
const slideEnterActive = 'transition-all duration-250 ease-out motion-reduce:transition-none'
const slideLeaveActive = 'transition-all duration-200 ease-in motion-reduce:transition-none'

const navButtonClass = [
    'flex h-10 w-10 items-center justify-center rounded-full',
    'cursor-pointer bg-text-neutral-on-filled/10 text-text-neutral-on-filled',
    'hover:bg-text-neutral-on-filled/25',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-neutral-on-filled',
    'transition-colors duration-150',
]

const toolbarButtonClass = [
    'flex h-9 w-9 items-center justify-center rounded-full',
    'cursor-pointer text-text-neutral-on-filled/80 hover:text-text-neutral-on-filled',
    'hover:bg-text-neutral-on-filled/10',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-neutral-on-filled',
    'transition-colors duration-150',
]

// Slide navigation
const setIndex = (position: number) => {
    const length = props.images.length
    if (!length) return

    const normalizedIndex = props.loop
        ? ((position % length) + length) % length
        : Math.max(0, Math.min(length - 1, position))

    if (normalizedIndex === currentIndex.value) return
    currentIndex.value = normalizedIndex
    emit('update:index', normalizedIndex)
}

const next = () => {
    slideDirection.value = 'left'
    setIndex(currentIndex.value + 1)
}

const prev = () => {
    slideDirection.value = 'right'
    setIndex(currentIndex.value - 1)
}

// Swipe handling
const onPointerDown = (event: PointerEvent) => {
    // Nothing to swipe to with a single image
    if (!hasMultipleImages.value) return
    if ((event.target as HTMLElement).closest('button')) return

    isDragging.value = true
    wasInteracting = false
    startX = event.clientX
    startY = event.clientY
    pointerId = event.pointerId
    swipeAreaEl.value?.setPointerCapture(event.pointerId)
}

const onPointerMove = (event: PointerEvent) => {
    if (!isDragging.value || event.pointerId !== pointerId) return

    const deltaX = event.clientX - startX
    const deltaY = event.clientY - startY

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        dragOffsetX.value = deltaX
    }
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        wasInteracting = true
    }
}

const onPointerUp = (event: PointerEvent) => {
    if (!isDragging.value || event.pointerId !== pointerId) return
    isDragging.value = false

    if (Math.abs(dragOffsetX.value) > SWIPE_THRESHOLD) {
        wasInteracting = true
        if (dragOffsetX.value < 0) {
            next()
        } else {
            prev()
        }
    }

    dragOffsetX.value = 0
    pointerId = null
}

// Close handling
const close = () => {
    emit('update:modelValue', false)
    emit('close')
}

const onOverlayClick = () => {
    // The click that ends a drag must not close the lightbox
    if (wasInteracting) {
        wasInteracting = false
        return
    }
    if (props.closeOnClickOutside) {
        close()
    }
}

// Scroll lock
const lockScroll = () => {
    if (previousBodyOverflow.value === null) {
        previousBodyOverflow.value = document.body.style.overflow
    }
    document.body.style.overflow = 'hidden'
}

const unlockScroll = () => {
    if (previousBodyOverflow.value === null) return
    document.body.style.overflow = previousBodyOverflow.value
    previousBodyOverflow.value = null
}

// Fullscreen handling
const exitFullscreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    }
}

const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
        await document.exitFullscreen()
    } else {
        await document.documentElement.requestFullscreen()
    }
}

const onFullscreenChange = () => {
    isFullscreen.value = Boolean(document.fullscreenElement)
}

// Watchers
watch(
    () => props.initialIndex,
    index => {
        currentIndex.value = index
    }
)

watch(
    () => props.modelValue,
    (isOpen, wasOpen) => {
        if (isOpen) {
            currentIndex.value = props.initialIndex
            previouslyFocusedElement.value = document.activeElement as HTMLElement
            lockScroll()
            nextTick(() => rootEl.value?.focus())
        } else if (wasOpen) {
            unlockScroll()
            exitFullscreen()
            previouslyFocusedElement.value?.focus()
        }
    },
    { immediate: true }
)

// Lifecycle
onMounted(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange)
})

onBeforeUnmount(() => {
    document.removeEventListener('fullscreenchange', onFullscreenChange)
    unlockScroll()
    exitFullscreen()
})
</script>
