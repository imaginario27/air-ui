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
            <template v-if="orientation === Orientation.VERTICAL">
                <ContainedIcon :color="ColorAccent.INFO" :size="IconContainerSize.XL" :icon />

                <ModalHeaderGroup centered>
                    <ModalTitle :title />
                    <ModalDescription v-if="description">
                        {{ description }}
                    </ModalDescription>
                </ModalHeaderGroup>
            </template>
            <template v-else>
                <div class="w-full flex gap-4 flex-col sm:flex-row items-center sm:items-start">
                    <ContainedIcon :color="ColorAccent.INFO" :size="IconContainerSize.LG" :icon />

                    <ModalHeaderGroup centered class="sm:text-left">
                        <ModalTitle :title />
                        <ModalDescription v-if="description">
                            {{ description }}
                        </ModalDescription>
                    </ModalHeaderGroup>
                </div>
            </template>

            <slot />

            <ModalActions
                v-if="showModalActions"
                :class="{
                    'justify-end': orientation === Orientation.HORIZONTAL,
                }"
            >
                <ActionButton
                    :text="resolvedButtonCloseText"
                    :class="[orientation === Orientation.HORIZONTAL ? 'w-full md:w-auto' : 'w-full']"
                    @click="handleClose"
                />
                <ActionButton
                    :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
                    :iconPosition="buttonActionIcon ? IconPosition.RIGHT : IconPosition.NONE"
                    :icon="buttonActionIcon"
                    :text="buttonActionText"
                    :isLoading
                    :loadingText="resolvedLoadingText"
                    :class="[orientation === Orientation.HORIZONTAL ? 'w-full md:w-auto' : 'w-full']"
                    @click="handleMainAction"
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
        default: 'mdi:information-outline',
    },
    title: {
        type: String as PropType<string>,
        default: 'Modal title',
    },
    description: String as PropType<string>,
    buttonCloseText: String as PropType<string>,
    buttonActionText: String as PropType<string>,
    buttonActionIcon: String as PropType<string>,
    isLoading: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    loadingText: String as PropType<string>,
    orientation: {
        type: String as PropType<Orientation>,
        default: Orientation.VERTICAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value),
    },
    cardClass: {
        type: String as PropType<string>,
        default: 'max-w-[520px]',
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
const emit = defineEmits(['update:modelValue', 'close', 'action'])

// Composables
const dsConfig = useDSConfig()
const resolvedButtonCloseText = computed(() => props.buttonCloseText ?? dsConfig.actions.closeText())
const resolvedLoadingText = computed(() => props.loadingText ?? dsConfig.actions.processingText())

// Computed
const resolvedCloseAriaLabel = computed(() => props.closeAriaLabel ?? dsConfig.actions.closeText())

// Handlers
const updateModelValue = (value: boolean) => {
    emit('update:modelValue', value)
}

const handleClose = () => {
    updateModelValue(false)
    emit('close')
}

const handleMainAction = () => {
    emit('action')
    updateModelValue(false)
}
</script>
