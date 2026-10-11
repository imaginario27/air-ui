<template>
    <Transition
        enterActiveClass="transition duration-200"
        enterFromClass="opacity-0 translate-y-2"
        leaveActiveClass="transition duration-200"
        leaveToClass="opacity-0 translate-y-2"
    >
        <ActionIconButton
            v-if="isVisible"
            icon="mdi:chevron-up"
            ariaLabel="Go to top"
            :size="ButtonSize.LG"
            :styleType="ButtonStyleType.NEUTRAL_FILLED"
            isRounded
            :class="['fixed bottom-4 right-4 z-40', 'shadow-lg', 'lg:hidden']"
            @click="scrollToTop"
        />
    </Transition>
</template>
<script setup lang="ts">
const SHOW_AFTER_PX = 1000

// States
const { y } = useWindowScroll()

// Computed states
const isVisible = computed(() => y.value > SHOW_AFTER_PX)

// Handlers
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
