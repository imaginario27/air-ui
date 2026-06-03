<template>
    <div
        v-if="isLoading"
        role="status"
        aria-live="polite"
        class="flex flex-col items-center gap-4"
    >
        <Spinner :class="[spinnerSizeClass, spinnerClass]" />
        <span>{{ animatedText }}</span>
    </div>
</template>
<script setup lang="ts">

// Props
const props = defineProps({
    isLoading: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    text: {
        type: String as PropType<string>,
        default: "Loading",
    },
    spinnerSize: {
        type: String as PropType<LoadingSpinnerSize>,
        default: LoadingSpinnerSize.LG,
        validator: (value: LoadingSpinnerSize) => Object.values(LoadingSpinnerSize).includes(value),
    },
    spinnerClass: String as PropType<string>,
})

// Computed classes
const spinnerSizeClass = computed(() => {
    const variants = {
        [LoadingSpinnerSize.XS]: 'w-[24px] h-[24px] border-2',
        [LoadingSpinnerSize.SM]: 'w-[28px] h-[28px] border-2',
        [LoadingSpinnerSize.MD]: 'w-[32px] h-[32px] border-3',
        [LoadingSpinnerSize.LG]: 'w-[36px] h-[36px] border-3',
        [LoadingSpinnerSize.XL]: 'w-[40px] h-[40px] border-3',
        [LoadingSpinnerSize.XXL]: 'w-[44px] h-[44px] border-4',
        [LoadingSpinnerSize.XXXL]: 'w-[48px] h-[48px] border-4',
    }
    return variants[props.spinnerSize as LoadingSpinnerSize] || 'w-[36px] h-[36px] border-2'
})


// Reactive state for animated ellipsis
const animatedText = ref(props.text)
let intervalId: ReturnType<typeof setInterval> | null = null

// Methods
const startAnimation = () => {
    if (intervalId !== null) return // Prevent multiple intervals

    let dotCount = 0
    intervalId = setInterval(() => {
        dotCount = (dotCount + 1) % 4 // Cycles through 0, 1, 2, 3
        animatedText.value = props.text + '.'.repeat(dotCount)
    }, 500) // Update every 500ms
}

const stopAnimation = () => {
    if (intervalId !== null) {
        clearInterval(intervalId)
        intervalId = null
        animatedText.value = props.text // Reset to base text
    }
}

// Watch 
watch(
    () => props.isLoading,
    (newLoading) => {
        if (newLoading) {
            startAnimation()
        } else {
            stopAnimation()
        }
    },
    { immediate: true }
)

// Clear interval on unmount
onUnmounted(() => stopAnimation())
</script>