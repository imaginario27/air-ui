<template>
    <div 
        :class="[ 
            'flex flex-col pb-8 transition-all duration-300',
            hasSidebar && (
                isMobile
                    ? isMobileSidebarOpen
                        ? 'translate-x-[240px]'
                        : 'translate-x-0'
                    : 'ml-[240px]'
            ),
        ]"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
// Props
defineProps({
    hasSidebar: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

// Composables
const { isMobileSidebarOpen } = useMobileSidebar()
const { isMobile } = useIsMobile()
</script>
