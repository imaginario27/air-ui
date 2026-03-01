<template>
    <Teleport to="body">
        <!-- Overlay -->
        <Transition
            enter-active-class="transition-opacity duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isOpen && hasOverlay"
                :class="[
                    'fixed',
                    'inset-0',
                    'bg-background-overlay',
                    'backdrop-blur-sm',
                    'z-[10000]',
                    overlayClass,
                ]"
                @click="closeOnOverlayClick ? close() : null"
            />
        </Transition>

        <!-- Drawer -->
        <Transition
            :enter-active-class="transitionClasses.enterActive"
            :enter-from-class="transitionClasses.enterFrom"
            :enter-to-class="transitionClasses.enterTo"
            :leave-active-class="transitionClasses.leaveActive"
            :leave-from-class="transitionClasses.leaveFrom"
            :leave-to-class="transitionClasses.leaveTo"
        >
            <aside
                v-if="isOpen"
                :class="[
                    'fixed',
                    'bg-background-container-surface',
                    'shadow-xl',
                    'z-[10000]',
                    'p-4',
                    'flex',
                    'flex-col',
                    'gap-4',
                    positionClasses,
                    sizeClasses,
                    drawerClass,
                    borderClass,
                ]"
                :style="drawerInlineStyle"
            >
                <!-- Header -->
                <div
                    v-if="hasHeader"
                    :class="[
                        'flex',
                        'items-center',
                        'justify-between',
                        'gap-3',
                        headerClass,
                    ]"
                >
                    <component
                        :is="titleHeadingTag"
                        :class="['text-lg', 'font-semibold', titleClass]"
                    >
                        {{ title }}
                    </component>

                    <ActionIconButton
                        v-if="hasCloseButton"
                        :icon="buttonCloseIcon"
                        :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                        @click="close"
                    />
                </div>

                <!-- Content -->
                <div :class="['flex-1', 'overflow-y-auto', drawerContentClass]">
                    <slot />
                </div>
            </aside>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    modelValue: {
        type: Boolean as PropType<boolean>,
        required: true,
    },
    direction: {
        type: String as PropType<Direction>,
        default: Direction.RIGHT,
        validator: (value: Direction) => Object.values(Direction).includes(value),
    },
    maxSize: {
        type: Number as PropType<number>,
        default: 320,
    },
    hasHeader: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasCloseButton: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasOverlay: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    closeOnOverlayClick: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    title: {
        type: String as PropType<string>,
        default: 'Drawer',
    },
    titleHeadingTag: {
        type: String as PropType<'h2' | 'h3' | 'h4' | 'h5' | 'h6'>,
        default: 'h2',
    },
    buttonCloseIcon: {
        type: String as PropType<string>,
        default: 'mdi:close',
    },
    hasBorder: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    lockBodyScroll: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    drawerClass: String as PropType<string>,
    drawerContentClass: String as PropType<string>,
    overlayClass: String as PropType<string>,
    headerClass: String as PropType<string>,
    titleClass: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue'])

const isOpen = computed(() => props.modelValue)

// Computed classes
const positionClasses = computed(() => {
    const map: Record<Direction, string[]> = {
        [Direction.RIGHT]: ['top-0', 'right-0', 'h-full'],
        [Direction.LEFT]: ['top-0', 'left-0', 'h-full'],
        [Direction.TOP]: ['top-0', 'left-0', 'w-full'],
        [Direction.BOTTOM]: ['bottom-0', 'left-0', 'w-full'],
    }

    return map[props.direction]
})

const sizeClasses = computed(() => {
    if (props.direction === Direction.LEFT || props.direction === Direction.RIGHT) {
        return ['w-full']
    }

    return []
})

const drawerInlineStyle = computed(() => {
    if (props.direction === Direction.LEFT || props.direction === Direction.RIGHT) {
        return { maxWidth: props.maxSize + 'px' }
    }

    return { maxHeight: props.maxSize + 'px' }
})

const transitionClasses = computed(() => {
    const base = 'transform transition-transform duration-300 ease-out'
    const leaveBase = 'transform transition-transform duration-300 ease-in'

    const map: Record<
        Direction,
        {
            enterActive: string
            enterFrom: string
            enterTo: string
            leaveActive: string
            leaveFrom: string
            leaveTo: string
        }
    > = {
        [Direction.RIGHT]: {
            enterActive: base,
            enterFrom: 'translate-x-full',
            enterTo: 'translate-x-0',
            leaveActive: leaveBase,
            leaveFrom: 'translate-x-0',
            leaveTo: 'translate-x-full',
        },
        [Direction.LEFT]: {
            enterActive: base,
            enterFrom: '-translate-x-full',
            enterTo: 'translate-x-0',
            leaveActive: leaveBase,
            leaveFrom: 'translate-x-0',
            leaveTo: '-translate-x-full',
        },
        [Direction.TOP]: {
            enterActive: base,
            enterFrom: '-translate-y-full',
            enterTo: 'translate-y-0',
            leaveActive: leaveBase,
            leaveFrom: 'translate-y-0',
            leaveTo: '-translate-y-full',
        },
        [Direction.BOTTOM]: {
            enterActive: base,
            enterFrom: 'translate-y-full',
            enterTo: 'translate-y-0',
            leaveActive: leaveBase,
            leaveFrom: 'translate-y-0',
            leaveTo: 'translate-y-full',
        },
    }

    return map[props.direction]
})

const borderClass = computed(() => {
    if (!props.hasBorder) return ''

    const colorClass = 'border-border-default'

    switch (props.direction) {
        case Direction.RIGHT:
            return `border-l ${colorClass}`
        case Direction.LEFT:
            return `border-r ${colorClass}`
        case Direction.TOP:
            return `border-b ${colorClass}`
        case Direction.BOTTOM:
            return `border-t ${colorClass}`
        default:
            return ''
    }
})

// Handlers
const close = () => {
    emit('update:modelValue', false)
}

// Locks and unlocks the background scroll while modal is open
useHead(() => {
    return props.modelValue && props.lockBodyScroll
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