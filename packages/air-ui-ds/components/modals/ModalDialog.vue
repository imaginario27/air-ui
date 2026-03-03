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
                    'z-[9999]',
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
})

// Emits
const emit = defineEmits(['update:modelValue', 'close'])

// Watch for `modelValue` changes
watch(
    () => props.modelValue,
    newValue => {
        if (newValue) {
            addEscListener() // Add Esc key listener
        } else {
            removeEscListener() // Remove Esc key listener
        }
    }
)

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

// Event listeners
const addEscListener = () => {
    globalThis.addEventListener('keydown', handleEscKey)
}

const removeEscListener = () => {
    globalThis.removeEventListener('keydown', handleEscKey)
}

// Cleanup on component unmount
onUnmounted(() => {
    removeEscListener()
})

// Locks and unlocks the background scroll while modal is open
useHead(() => {
    return props.modelValue
        ? {
              bodyAttrs: {
                  class: 'modal-open',
              },
          }
        : {
              bodyAttrs: {
                  class: '',
              },
          }
})
</script>
