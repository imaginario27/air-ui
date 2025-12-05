<template>
    <ModalDialog 
        :modelValue
        :closeOnClickOutside
        :hasCornerCloseButton
        :cardClasses
        @update:modelValue="updateModelValue"
    >
        <ModalContent class="!gap-6 items-center">   
            <template v-if="orientation === Orientation.VERTICAL">
                <ContainedIcon 
                    :color="ColorAccent.INFO"
                    :size="IconContainerSize.XL"
                    :icon
                />

                <ModalHeaderGroup centered>
                    <ModalTitle :title />
                    <ModalDescription v-if="description">
                        {{ description }}
                    </ModalDescription>
                </ModalHeaderGroup>
            </template>
            <template v-else>
                <div class="w-full flex gap-4 flex-col sm:flex-row items-center sm:items-start">
                    <ContainedIcon 
                        :color="ColorAccent.INFO"
                        :size="IconContainerSize.LG"
                        :icon
                    />
                    
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
                    :text="buttonCloseText"
                    :class="[
                        orientation === Orientation.HORIZONTAL ? 'w-full md:w-auto' : 'w-full',
                    ]"
                    @click="handleClose"
                />
                <ActionButton 
                    :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
                    :iconPosition="buttonActionIcon ? IconPosition.RIGHT : IconPosition.NONE"
                    :icon="buttonActionIcon"
                    :text="buttonActionText"
                    :isLoading
                    :loadingText
                    :class="[
                        orientation === Orientation.HORIZONTAL ? 'w-full md:w-auto' : 'w-full'
                    ]"
                    @click="handleMainAction"
                />
            </ModalActions>
        </ModalContent>
    </ModalDialog>
</template>

<script setup lang="ts">
// Props
defineProps({
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    icon: {
        type: String as PropType<any>,
        default: 'mdiInformationOutline',
    },
    title: {
        type: String as PropType<string>,
        default: 'Modal title',
    },
    description: String as PropType<string>,
    buttonCloseText: {
        type: String as PropType<string>,
        default: 'Close',
    },
    buttonActionText: String as PropType<string>,
    buttonActionIcon: String as PropType<any>,
    isLoading: { 
        type: Boolean as PropType<boolean>,
        default: false,
    },
    loadingText: { 
        type: String as PropType<string>,
        default: 'Processing...',
    },
    orientation: {
        type: String as PropType<Orientation>,
        default: Orientation.VERTICAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value),
    },
    cardClasses: {
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
})

// Emits
const emit = defineEmits(['update:modelValue', 'close', 'action'])

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
