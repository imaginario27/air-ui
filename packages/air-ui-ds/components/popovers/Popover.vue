<template>
    <div
        ref="popoverContainer"
        class="relative popover-container"
    >
        <Transition
            :enter-from-class="transitionEnterFromClass"
            :leave-to-class="transitionLeaveToClass"
            enter-active-class="transition ease-out duration-200"
            leave-active-class="transition ease-in duration-150"
            enter-to-class="opacity-100 translate-y-0"
            leave-from-class="opacity-100 translate-y-0"
        >
            <Card
                v-if="isOpen"
                :class="[
                    'absolute',
                    'z-10',
                    position === Position.TOP ? 'bottom-full mb-2' : 'top-full mt-2',
                    alignClass,
                    popoverClass,
                    '!shadow-md'
                ]"
            >
                <CardBody>
                    <slot 
                        name="content"
                        :onClose="toggle"
                    />
                </CardBody>  
            </Card>
        </Transition>

        <!-- Activator -->
        <div
            class="popover-activator"
            @click="handleClick"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
        >
            <slot 
                name="activator"
                :onClick="toggle"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    position: {
        type: String as PropType<Position>,
        default: Position.TOP,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    align: {
        type: String as PropType<Align>,
        default: Align.CENTER,
        validator: (value: Align) => Object.values(Align).includes(value),
    },
    trigger: {
        type: String as PropType<Trigger>,
        default: Trigger.HOVER,
        validator: (value: Trigger) => Object.values(Trigger).includes(value),
    },
    popoverClass: {
        type: String as PropType<string>,
        default: 'min-w-[300px]'
    }
})

// Computed classes
const alignClass = computed(() => {
    const alignVariant: Record<Align, string> = {
        [Align.LEFT]: "left-0",
        [Align.CENTER]: "left-1/2 -translate-x-1/2",
        [Align.RIGHT]: "right-0",
    }

    return alignVariant[props.align as Align] || "left-1/2 -translate-x-1/2"
})

const transitionEnterFromClass = computed(() => {
    return props.position === Position.TOP
        ? 'opacity-0 translate-y-2'
        : 'opacity-0 -translate-y-2'
})

const transitionLeaveToClass = computed(() => {
    return props.position === Position.TOP
        ? 'opacity-0 translate-y-2'
        : 'opacity-0 -translate-y-2'
})

// Refs
const popoverContainer = ref(null)

// Composables
const [isOpen, toggle] = useToggle(false)
let hoverTimeout: ReturnType<typeof setTimeout>

onClickOutside(popoverContainer, () => {
    isOpen.value = false
})

// Handlers
const handleClick = () => {
    if (props.trigger === Trigger.CLICK) {
        toggle()
    }
}

const handleMouseEnter = () => {
    if (props.trigger === Trigger.HOVER) {
        clearTimeout(hoverTimeout)
        isOpen.value = true
    }
}

const handleMouseLeave = () => {
    if (props.trigger === Trigger.HOVER) {
        hoverTimeout = setTimeout(() => {
            isOpen.value = false
        }, 200)
    }
}
</script>
