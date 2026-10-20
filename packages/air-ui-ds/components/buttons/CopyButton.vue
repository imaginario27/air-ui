<template>
    <ActionIconButton
        v-if="buttonType === ButtonType.ACTION_ICON_BUTTON"
        :styleType
        :size
        :icon="currentCopyButtonIcon"
        :iconClass="currentIconClass"
        :disabled
        :ariaLabel="currentCopyButtonText"
        @click="handleCopy"
    />
    <ActionButton
        v-else
        :styleType
        :size
        :text="currentCopyButtonText"
        :icon="currentCopyButtonIcon"
        :iconPosition
        :iconClass="currentIconClass"
        :disabled
        @click="handleCopy"
    />
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    textToCopy: {
        type: String as PropType<string>,
        required: true,
    },
    copySuccessText: String as PropType<string>,
    copyErrorText: String as PropType<string>,
    showToast: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    resetAfter: {
        type: Number as PropType<number>,
        default: 1500,
    },
    buttonType: {
        type: String as PropType<ButtonType>,
        default: ButtonType.ACTION_ICON_BUTTON,
        validator: (value: ButtonType) => Object.values(ButtonType).includes(value),
    },
    styleType: {
        type: String as PropType<
            | ButtonStyleType.NEUTRAL_FILLED
            | ButtonStyleType.NEUTRAL_OUTLINED
            | ButtonStyleType.NEUTRAL_TRANSPARENT
            | ButtonStyleType.NEUTRAL_TRANSPARENT_SUBTLE
            | ButtonStyleType.PRIMARY_BRAND_FILLED
            | ButtonStyleType.PRIMARY_BRAND_SOFT
            | ButtonStyleType.PRIMARY_BRAND_TRANSPARENT
            | ButtonStyleType.SECONDARY_BRAND_FILLED
        >,
        default: ButtonStyleType.NEUTRAL_OUTLINED,
        validator: (value: unknown) =>
            typeof value === 'string' &&
            [
                ButtonStyleType.NEUTRAL_FILLED,
                ButtonStyleType.NEUTRAL_OUTLINED,
                ButtonStyleType.NEUTRAL_TRANSPARENT,
                ButtonStyleType.NEUTRAL_TRANSPARENT_SUBTLE,
                ButtonStyleType.PRIMARY_BRAND_FILLED,
                ButtonStyleType.PRIMARY_BRAND_SOFT,
                ButtonStyleType.PRIMARY_BRAND_TRANSPARENT,
                ButtonStyleType.SECONDARY_BRAND_FILLED,
            ].includes(value as ButtonStyleType),
    },
    text: String as PropType<string>,
    size: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.SM,
        validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
    },
    icon: {
        type: String as PropType<string>,
        default: 'mdi:content-copy',
    },
    iconPosition: {
        type: String as PropType<IconPosition>,
        default: IconPosition.RIGHT,
        validator: (value: IconPosition) => Object.values(IconPosition).includes(value),
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Composables
const dsConfig = useDSConfig()

// Computed
const resolvedCopySuccessText = computed(() => props.copySuccessText ?? dsConfig.common.copiedText())
const resolvedCopyErrorText = computed(() => props.copyErrorText ?? dsConfig.common.copyFailedText())
const resolvedText = computed(() => props.text ?? dsConfig.actions.copyText())

// States
const currentCopyButtonIcon = ref<string>(props.icon)
const copyState = ref<'idle' | 'success' | 'error'>('idle')
const currentCopyButtonText = computed(() => {
    if (copyState.value === 'success') return resolvedCopySuccessText.value
    if (copyState.value === 'error') return resolvedCopyErrorText.value
    return resolvedText.value
})
const currentIconClass = ref<string | undefined>(undefined)

// Emits
const emit = defineEmits(['success', 'error'])

// Initialize toast
const { $toast } = useNuxtApp()

// Methods
const handleCopy = useThrottleFn(
    async () => {
        const success = await copyToClipboard(props.textToCopy)

        if (success) {
            currentCopyButtonIcon.value = 'mdi:check'
            copyState.value = 'success'

            if (
                props.styleType === ButtonStyleType.NEUTRAL_OUTLINED ||
                props.styleType === ButtonStyleType.NEUTRAL_TRANSPARENT ||
                props.styleType === ButtonStyleType.NEUTRAL_TRANSPARENT_SUBTLE
            ) {
                currentIconClass.value = 'text-icon-success'
            }

            if (props.showToast) {
                $toast.success(resolvedCopySuccessText.value, {
                    toastId: 'copy-button-success',
                })
            }

            emit('success')
        } else {
            currentCopyButtonIcon.value = 'mdi:alert-circle-outline'
            copyState.value = 'error'

            if (props.showToast) {
                $toast.error(resolvedCopyErrorText.value, {
                    toastId: 'copy-button-error',
                })
            }

            emit('error')
        }

        // Reset UI after delay
        setTimeout(() => {
            currentCopyButtonIcon.value = props.icon
            copyState.value = 'idle'
            currentIconClass.value = undefined
        }, props.resetAfter)
    },
    props.resetAfter,
    true, // trailing only
)
</script>
