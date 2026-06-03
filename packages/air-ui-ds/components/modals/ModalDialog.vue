<template>
    <Teleport to="body">
        <Transition
            appear
            enter-active-class="transition-opacity duration-300 ease-out"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-200 ease-in"
            leave-to-class="opacity-0"
        >
            <div
                v-if="modelValue"
                :id
                :class="[
                    'fixed',
                    'inset-0',
                    'z-9999',
                    'bg-background-overlay',
                    'backdrop-blur-sm',
                    'overflow-y-auto',
                    overlayClass,
                ]"
            >
                <div 
                    :class="[
                        'modal-container',
                        'min-h-full',
                        'flex',
                        'w-full',
                        'items-center',
                        'justify-center',
                        'p-4',
                        containerClass,
                    ]"
                    @click.self="closeModalOnClickOutside"
                >
                    <Transition
                        appear
                        enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 scale-95"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-to-class="opacity-0 scale-95"
                    >
                        <div
                            v-show="modelValue"
                            ref="dialogRef"
                            role="dialog"
                            aria-modal="true"
                            :aria-labelledby="ariaLabelledby"
                            :class="[
                                'bg-background-surface rounded-lg shadow-xl',
                                'relative w-full my-8',
                                'overflow-visible',
                                cardClass,
                            ]"
                        >
                            <ActionIconButton
                                v-if="hasCornerCloseButton"
                                :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                                :size="ButtonSize.MD"
                                icon="mdi:close"
                                ariaLabel="Close"
                                class="absolute top-4 right-4 z-10"
                                @click="closeModal"
                            />

                            <div :class="['p-4 md:p-6', cardClass]">
                                <slot />
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
// Refs
const dialogRef = ref<HTMLElement | null>(null)
const previouslyFocusedElement = ref<HTMLElement | null>(null)

// State
const previousBodyOverflow = ref<string | null>(null)
const previousBodyPaddingRight = ref<string | null>(null)

// Props
const props = defineProps({
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    closeOnClickOutside: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasCornerCloseButton: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    overlayClass: String as PropType<string>,
    containerClass: String as PropType<string>,
    cardClass: {
        type: String as PropType<string>,
        default: 'max-w-[600px]',
    },
    id: String as PropType<string>,
    ariaLabelledby: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue', 'close'])

// Handlers
const closeModal = () => {
    emit('update:modelValue', false)
    emit('close') // Useful for triggering actions on close
}

const closeModalOnClickOutside = () => {
    if (props.closeOnClickOutside) {
        closeModal()
    }
}

const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        closeModal()
    }
}

const handleFocusTrap = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !dialogRef.value) return

    const focusableElements = dialogRef.value.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    if (focusableElements.length === 0) return

    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
        if (document.activeElement === first) {
            event.preventDefault()
            last.focus()
        }
    } else {
        if (document.activeElement === last) {
            event.preventDefault()
            first.focus()
        }
    }
}

// Event listeners
const addEscListener = () => {
    globalThis.addEventListener('keydown', handleEscKey)
    globalThis.addEventListener('keydown', handleFocusTrap)
}

const removeEscListener = () => {
    globalThis.removeEventListener('keydown', handleEscKey)
    globalThis.removeEventListener('keydown', handleFocusTrap)
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

// Watch for `modelValue` changes
watch(
    () => props.modelValue,
    newValue => {
        if (newValue) {
            previouslyFocusedElement.value = document.activeElement as HTMLElement
            addEscListener()
            lockScroll()
            nextTick(() => {
                const firstFocusable = dialogRef.value?.querySelector<HTMLElement>(
                    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )
                firstFocusable?.focus()
            })
        } else {
            removeEscListener()
            unlockScroll()
            previouslyFocusedElement.value?.focus()
        }
    },
    { immediate: true },
)

// Cleanup on component unmount
onUnmounted(() => {
    removeEscListener()
    unlockScroll()
})
</script>
