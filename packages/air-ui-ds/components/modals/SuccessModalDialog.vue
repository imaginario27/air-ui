<template>
    <ModalDialog
        :modelValue
        :closeOnClickOutside
        :hasCornerCloseButton
        :closeAriaLabel="resolvedCloseAriaLabel"
        :cardClass
        :glowColorMode
        :glowTrigger
        :glowType
        :glowOpacity
        :glowSize
        @update:modelValue="updateModelValue"
    >
        <ModalContent class="!gap-6 items-center">
            <ContainedIcon :color="ColorAccent.SUCCESS" :size="IconContainerSize.XL" :icon />

            <ModalHeaderGroup centered>
                <ModalTitle :title />
                <ModalDescription v-if="description">
                    {{ description }}
                </ModalDescription>
            </ModalHeaderGroup>

            <slot />

            <ModalActions v-if="showModalActions">
                <ActionButton
                    :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
                    :text="buttonText"
                    class="w-full"
                    @click="handleClose"
                />
            </ModalActions>
        </ModalContent>
    </ModalDialog>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    icon: {
        type: String as PropType<string>,
        default: 'mdi:check-bold',
    },
    title: {
        type: String as PropType<string>,
        default: 'Modal title',
    },
    description: String as PropType<string>,
    buttonText: {
        type: String as PropType<string>,
        default: 'Close',
    },
    cardClass: {
        type: String as PropType<string>,
        default: 'max-w-[400px]',
    },
    closeOnClickOutside: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasCornerCloseButton: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showModalActions: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    closeAriaLabel: String as PropType<string>,
    glowColorMode: {
        type: String as PropType<GlowColorMode>,
        validator: (value: GlowColorMode) => Object.values(GlowColorMode).includes(value),
    },
    glowTrigger: {
        type: String as PropType<GlowTrigger>,
        validator: (value: GlowTrigger) => Object.values(GlowTrigger).includes(value),
    },
    glowType: {
        type: String as PropType<GlowType>,
        validator: (value: GlowType) => Object.values(GlowType).includes(value),
    },
    glowOpacity: {
        type: Number as PropType<number>,
        validator: (value: number) => value >= 0 && value <= 100,
    },
    glowSize: {
        type: Number as PropType<number | null>,
        validator: (value: number | null) => value === null || value >= 0,
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'close'])

// Composables
const dsConfig = useDSConfig()

// Computed
const resolvedCloseAriaLabel = computed(() => props.closeAriaLabel ?? dsConfig.actions.closeText())

// Handlers
const updateModelValue = (value: boolean) => {
    emit('update:modelValue', value)
}

const handleClose = () => {
    // Emit the model update to close the modal
    updateModelValue(false)

    // Emit the custom "close" event for additional actions
    emit('close')
}
</script>
