<template>
    <ActionIconButton 
        v-if="buttonType === ButtonType.ACTION_ICON_BUTTON"
        :styleType="buttonStyleType"
        :size
        :icon="currentCopyButtonIcon"
        :disabled
        @click="handleCopy"
    />
    <ActionButton 
        v-else
        :styleType="buttonStyleType"
        :size
        :text="currentCopyButtonText"
        :icon="currentCopyButtonIcon"
        :iconPosition
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
    copySuccessText: {
        type: String as PropType<string>,
        default: 'Copied to clipboard!',
    },
    copyErrorText: {
        type: String as PropType<string>,
        default: 'Failed to copy to clipboard.',
    },
    notificationType: {
        type: String as PropType<NotificationType>,
        default: NotificationType.INLINE,
        validator: (value: NotificationType) => Object.values(NotificationType).includes(value),
    },
    timeout: {
        type: Number as PropType<number>,
        default: 1500,
    },
    buttonType: {
        type: String as PropType<ButtonType>,
        default: ButtonType.ACTION_ICON_BUTTON,
        validator: (value: ButtonType) => Object.values(ButtonType).includes(value),
    },
    buttonStyleType: {
    type: String as PropType<
        ButtonStyleType.NEUTRAL_FILLED
        | ButtonStyleType.NEUTRAL_OUTLINED
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
                ButtonStyleType.PRIMARY_BRAND_FILLED,
                ButtonStyleType.PRIMARY_BRAND_SOFT,
                ButtonStyleType.PRIMARY_BRAND_TRANSPARENT,
                ButtonStyleType.SECONDARY_BRAND_FILLED,
            ].includes(value as ButtonStyleType),
    },
    text: {
        type: String as PropType<string>,
        default: 'Button text'
    },
    size: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.LG,
        validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
    },
    icon: {
        type: String as PropType<any>,
        default: "mdiContentCopy",
    },
    iconPosition: {
        type: String as PropType<IconPosition>,
        default: IconPosition.NONE,
        validator: (value: IconPosition) => Object.values(IconPosition).includes(value),
    },
    svgIcon: String as PropType<string>,
    useSVGIconColor: Boolean as PropType<boolean>,
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// States
const currentCopyButtonIcon = ref<any>(props.icon)
const currentCopyButtonText = ref<string>(props.text)

// Emits
const emit = defineEmits(['success', 'error'])

// Initialize toast
const { $toast } = useNuxtApp()

// Methods
const handleCopy = async () => {
    const success = await copyToClipboard(props.textToCopy)

    if(success) {
        currentCopyButtonIcon.value = "mdiCheck"
        currentCopyButtonText.value = props.copySuccessText

        if(props.notificationType === NotificationType.TOAST) {
            $toast.success(props.copySuccessText, {
                toastId: 'copy-button-success',
            })
        }
        
        emit('success')

        setTimeout(() => {
            currentCopyButtonIcon.value = props.icon
            currentCopyButtonText.value = props.text
        }, props.timeout)
    }
    else {
        currentCopyButtonIcon.value = "mdiAlertCircleOutline"
        currentCopyButtonText.value = props.copyErrorText

        if(props.notificationType === NotificationType.TOAST) {
            $toast.error(props.copyErrorText, {
                toastId: 'copy-button-error',
            })
        }
        
        emit('error')

        setTimeout(() => {
            currentCopyButtonIcon.value = props.icon
            currentCopyButtonText.value = props.text
        }, props.timeout)
    }
}
</script>