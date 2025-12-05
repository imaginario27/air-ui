<template>
    <div
        v-if="isLoading"
        :class="[ 
            'w-full', 
            isFullScreen && 'h-screen', 
            'flex', 
            'justify-center', 
            'items-center',
            'px-content-side-padding',
            'py-4',
            containerClass
        ]"
    >
        <Loading 
            :isLoading
            :text="loadingText"
            :spinnerSize
        />
    </div>
    <div 
        v-if="!isLoading && error"
        :class="[
            'w-full',
            'px-content-side-padding',
             isFullScreen ? 'py-[10vw] md:py-[20vw]' : 'px-content-side-padding py-8',
            'flex',
            'flex-col',
            isSpaced ? 'gap-4' : 'gap-2',
            'items-center',
            'justify-center',
            containerClass
        ]"
    >
        <ContainedIcon 
            v-if="!$slots['graphic']"
            :color="ColorAccent.DANGER"
            icon="mdiAlertCircleOutline"
            :size="iconContainerSize"
        />

        <!-- Can be used to replace default content icon -->
        <slot name="graphic" />

        <div
            :class="[
                'flex',
                'flex-col',
                isSpaced ? 'gap-3' : 'gap-2',
                'items-center',
                'w-full',
                'max-w-[800px]',
            ]"
        >
            <h1 :class="titleClass">
                {{ title }}
            </h1>
            <p :class="errorTextClass">
                {{ error }}
            </p>
        </div>

        <p :class="helpTextClass">
            {{ helpText }}
        </p>

        <div 
            :class="[
                'w-full',
                'flex',
                'gap-3',
                isSpaced ? 'mt-6' : 'mt-4',
                'items-center',
                'justify-center',
                'flex-col',
                'md:flex-row'
            ]"
        >
            <template v-if="!$slots['actions']">
                <ActionButton 
                    v-if="hasGoBackButton"
                    :actionType="ButtonActionType.LINK"
                    :styleType="hasRetryButton ? ButtonStyleType.NEUTRAL_FILLED : undefined"
                    :text="goBackText"
                    :icon="goBackIcon"
                    :iconPosition="IconPosition.LEFT"
                    :size="buttonSize"
                    :to="goBackLink"
                    isMobileFullWidth
                />

                <template v-if="hasRetryButton">
                    <ActionButton 
                        v-if="!retryLocked"
                        :text="retryButtonText"
                        :size="buttonSize"
                        :iconPosition="IconPosition.LEFT"
                        icon="mdiRefresh"
                        class="self-center"
                        :disabled="isRetryButtonDisabled"
                        isMobileFullWidth
                        @click="handleRetry"
                    />
    
                    <p v-else class="text-xs text-text-neutral-subtle mt-4">
                        {{ retryLimitReachedText }}
                    </p>
                </template>
            </template>

            <!-- Can be used to replace default actions -->
            <slot name="actions" />
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    isLoading: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    loadingText: {
        type: String as PropType<string>,
        default: "Loading",
    },
    error: {
        type: [String, null] as PropType<string | null>,
        default: null,
    },
    title: {
        type: String as PropType<string>,
        default: "Oops! Something went wrong!",
    },
    helpText: {
        type: String as PropType<string>,
        default: "Please try again or report the error to us. Thank you!",
    },
    hasGoBackButton: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    goBackText: {
        type: String as PropType<string>,
        default: "Go back",
    },
    goBackLink: {
        type: String as PropType<string>,
        default: "/",
    },
    goBackIcon: {
        type: String as PropType<string>,
        default: "mdiKeyboardBackspace",
    },
    hasRetryButton: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    retryText: {
        type: String as PropType<string>,
        default: 'Try again',
    },
    retryLimitReachedText: {
        type: String as PropType<string>,
        default: 'Retry limit reached. Please refresh the page or contact support.',
    },
    cooldownText: {
        type: String as PropType<string>,
        default: 'Retry in',
    },
    maxRetryCycles: {
        type: Number as PropType<number>,
        default: 2,
    },
    maxRetries: {
        type: Number as PropType<number>,
        default: 3,
    },
    cooldownSeconds: {
        type: Number as PropType<number>,
        default: 60,
    },
    isFullScreen: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    spinnerSize: String as PropType<LoadingSpinnerSize>,
    iconContainerSize: {
        type: String as PropType<IconContainerSize>,
        default: IconContainerSize.XXL, 
        validator: (value: IconContainerSize) => Object.values(IconContainerSize).includes(value),
    },
    buttonSize: String as PropType<ButtonSize>,
    isSpaced: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    titleClass: {
        type: String as PropType<string>,
        default: 'font-semibold text-xl md:text-2xl text-center leading-6',
    },
    errorTextClass: {
        type: String as PropType<string>,
        default: 'text-text-neutral-subtle font-semibold text-center',
    },
    helpTextClass: {
        type: String as PropType<string>,
        default: 'text-center',
    },
    containerClass: {
        type: String as PropType<string>,
        default: "py-20",
    },
})

// Emits
const emit = defineEmits(['retry'])

// Retry state
const { count: retryCount, inc: incrementRetry, reset: resetRetry } = useCounter()
const cycleCount = ref(0)
const isCoolingDown = ref(false)
const retryLocked = computed(() => cycleCount.value >= props.maxRetryCycles)
const remainingSeconds = ref(props.cooldownSeconds)
const temporarilyDisabled = ref(false)

// Retry button text
const retryButtonText = computed(() => {
    if (isCoolingDown.value) {
        return `${props.cooldownText} ${remainingSeconds.value}s`
    }

    return props.retryText
})

// Combined disabled state
const isRetryButtonDisabled = computed(() =>
    isCoolingDown.value ||
    retryCount.value >= props.maxRetries ||
    temporarilyDisabled.value
)

// Cooldown countdown timer
const { pause, resume } = useIntervalFn(() => {
    if (remainingSeconds.value <= 1) {
        pause()
        isCoolingDown.value = false
        remainingSeconds.value = props.cooldownSeconds
        resetRetry()
        cycleCount.value++
    } else {
        remainingSeconds.value--
    }
}, 1000, { immediate: false })

// Retry click handler
const handleRetryInternal = () => {
    if (isRetryButtonDisabled.value || retryLocked.value) return

    incrementRetry()
    emit('retry')

    // UX lockout for 1s after click
    temporarilyDisabled.value = true
    setTimeout(() => {
        temporarilyDisabled.value = false
    }, 1000)

    if (retryCount.value >= props.maxRetries) {
        isCoolingDown.value = true
        remainingSeconds.value = props.cooldownSeconds
        resume()
    }
}

// Debounced handler to prevent spam clicking
const handleRetry = useDebounceFn(handleRetryInternal, 500, {
    maxWait: 500,
})

onUnmounted(() => {
    pause()
})
</script>
