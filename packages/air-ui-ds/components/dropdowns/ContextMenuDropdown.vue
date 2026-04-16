<template>
    <template v-if="shouldTeleport">
        <teleport :to="teleportTo">
            <Transition
                appear
                enter-active-class="transition-opacity duration-200 ease-out"
                enter-from-class="opacity-0"
                leave-active-class="transition-opacity duration-150 ease-in"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="modelValue"
                    ref="menuPanel"
                    data-context-menu-panel
                    data-dropdown-menu-panel
                    :class="[
                        'bg-background-surface',
                        'py-1',
                        'rounded',
                        hasShadow && 'shadow-lg',
                        'flex flex-col',
                        hasBorder && 'border border-border-default',
                        dropdownClass,
                    ]"
                    :style="panelStyle"
                    @contextmenu.prevent
                >
                    <slot
                        v-if="$slots.items"
                        name="items"
                        :onClose="close"
                    />
                    <slot
                        v-else
                        :onClose="close"
                    />
                </div>
            </Transition>
        </teleport>
    </template>

    <Transition
        v-else
        appear
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-to-class="opacity-0"
    >
        <div
            v-if="modelValue"
            ref="menuPanel"
            data-context-menu-panel
            data-dropdown-menu-panel
            :class="[
                'bg-background-surface',
                'py-1',
                'rounded',
                hasShadow && 'shadow-lg',
                'flex flex-col',
                hasBorder && 'border border-border-default',
                dropdownClass,
            ]"
            :style="panelStyle"
            @contextmenu.prevent
        >
            <slot
                v-if="$slots.items"
                name="items"
                :onClose="close"
            />
            <slot
                v-else
                :onClose="close"
            />
        </div>
    </Transition>
</template>

<script setup lang="ts">
// Imports
import type { CSSProperties } from 'vue'

// Props
const props = defineProps({
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    width: {
        type: Number as PropType<number>,
        default: 240,
    },
    x: {
        type: Number as PropType<number>,
        default: 0,
    },
    y: {
        type: Number as PropType<number>,
        default: 0,
    },
    positionXOffset: {
        type: [Number, String] as PropType<number | string>,
        default: 0,
    },
    positionYOffset: {
        type: [Number, String] as PropType<number | string>,
        default: 0,
    },
    hasShadow: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasBorder: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    dropdownClass: String as PropType<string>,
    shouldTeleport: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    teleportTo: {
        type: String as PropType<string>,
        default: 'body',
    },
    zIndex: {
        type: String as PropType<string>,
        default: '50',
    },
})

// Emits
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

// States
const menuPanel = ref<HTMLElement | null>(null)
const resolvedPosition = ref({ left: 0, top: 0 })
const previousBodyOverflow = ref<string | null>(null)
const previousBodyPaddingRight = ref<string | null>(null)

// Methods
const close = () => {
    emit('update:modelValue', false)
}

const lockScroll = () => {
    if (previousBodyOverflow.value === null) {
        previousBodyOverflow.value = document.body.style.overflow
    }

    if (previousBodyPaddingRight.value === null) {
        previousBodyPaddingRight.value = document.body.style.paddingRight
    }

    const previousViewportWidth = document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    const currentViewportWidth = document.documentElement.clientWidth
    const layoutShiftWidth = Math.max(0, currentViewportWidth - previousViewportWidth)

    const computedPaddingRight = Number.parseFloat(getComputedStyle(document.body).paddingRight)
    const currentPaddingRight = Number.isNaN(computedPaddingRight) ? 0 : computedPaddingRight

    if (layoutShiftWidth > 0) {
        document.body.style.paddingRight = `${currentPaddingRight + layoutShiftWidth}px`
    }
}

const unlockScroll = () => {
    document.body.style.overflow = previousBodyOverflow.value ?? ''
    document.body.style.paddingRight = previousBodyPaddingRight.value ?? ''

    previousBodyOverflow.value = null
    previousBodyPaddingRight.value = null
}

const toOffsetNumber = (value: number | string) => {
    if (typeof value === 'number') return value
    const parsed = Number.parseFloat(value)
    return Number.isNaN(parsed) ? 0 : parsed
}

const updatePosition = () => {
    const panel = menuPanel.value
    if (!panel) return

    const x = props.x + toOffsetNumber(props.positionXOffset)
    const y = props.y + toOffsetNumber(props.positionYOffset)
    const rect = panel.getBoundingClientRect()

    const maxLeft = Math.max(0, window.innerWidth - rect.width)
    const maxTop = Math.max(0, window.innerHeight - rect.height)

    resolvedPosition.value = {
        left: Math.min(Math.max(0, x), maxLeft),
        top: Math.min(Math.max(0, y), maxTop),
    }
}

const schedulePositionUpdate = () => {
    nextTick(() => {
        requestAnimationFrame(updatePosition)
    })
}

const handlePointerDown = (event: MouseEvent) => {
    if (!props.modelValue || !menuPanel.value) return

    const target = event.target as Node | null
    if (!target) return

    if (!menuPanel.value.contains(target)) {
        close()
    }
}

const handleWindowResize = () => {
    if (!props.modelValue) return

    updatePosition()
}

const handleKeydown = (event: KeyboardEvent) => {
    if (!props.modelValue) return

    if (event.key === 'Escape') {
        close()
    }
}

// Watchers
watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) {
            schedulePositionUpdate()
            lockScroll()
        } else {
            unlockScroll()
        }
    },
)

watch(
    () => [props.x, props.y, props.positionXOffset, props.positionYOffset],
    () => {
        if (props.modelValue) {
            schedulePositionUpdate()
        }
    },
)

const panelStyle = computed<CSSProperties>(() => {
    return {
        position: 'fixed',
        left: `${resolvedPosition.value.left}px`,
        top: `${resolvedPosition.value.top}px`,
        width: `${props.width}px`,
        zIndex: props.zIndex,
    }
})

onMounted(() => {
    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('resize', handleWindowResize)
    document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    unlockScroll()
    document.removeEventListener('mousedown', handlePointerDown)
    window.removeEventListener('resize', handleWindowResize)
    document.removeEventListener('keydown', handleKeydown)
})

defineExpose({
    close,
})
</script>