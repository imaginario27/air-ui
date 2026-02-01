<template>
    <div
        :class="[
            'flex flex-col pb-8 transition-all duration-300',
        ]"
        :style="containerStyle"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    hasSidebar: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    sidebarWidth: {
        type: Number as PropType<number>,
        default: 240,
    },
})

// Composables
const { isMobileSidebarOpen } = useMobileSidebar()
const { isMobile } = useIsMobile()

// Computed dynamic style
const containerStyle = computed(() => {
    if (!props.hasSidebar) return {}

    if (isMobile.value) {
        return {
            transform: isMobileSidebarOpen.value
                ? `translateX(${props.sidebarWidth}px)`
                : 'translateX(0)',
        }
    }

    return {
        marginLeft: `${props.sidebarWidth}px`,
    }
})
</script>
