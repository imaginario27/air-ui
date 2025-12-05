<template>
    <Teleport to="body">
        <div
            v-if="modelValue"
            :id
            class="fixed inset-0 z-[9999] bg-background-overlay backdrop-blur-sm overflow-y-auto"
            
        >
            <div 
                class="modal-container min-h-full flex w-full items-center justify-center p-4"
                @click.self="closeModalOnClickOutside"
            >
                <div
                    :class="[
                        'bg-background-surface rounded-lg shadow-xl',
                        'relative w-full my-8',
                        'overflow-visible',
                        cardClasses,
                    ]"
                >
                    <ActionIconButton
                        v-if="hasCornerCloseButton"
                        :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                        :size="ButtonSize.MD"
                        icon="mdiClose"
                        class="absolute top-4 right-4 z-10"
                        @click="closeModal"
                    />

                    <div class="p-4 md:p-6">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    cardClasses: {
        type: String as PropType<string>,
        default: 'max-w-[600px]',
    },
    closeOnClickOutside: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasCornerCloseButton: {
        type: Boolean as PropType<boolean>,
        default: true,
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
    if (props.closeOnClickOutside && event.key === 'Escape') {
        closeModal()
    }
}

// Event listeners
const addEscListener = () => {
    window.addEventListener('keydown', handleEscKey)
}

const removeEscListener = () => {
    window.removeEventListener('keydown', handleEscKey)
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
