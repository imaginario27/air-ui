<template>
    <ModalDialog 
        :modelValue
        :closeOnClickOutside
        :hasCornerCloseButton
        :cardClass
        @update:modelValue="updateModelValue"
    >
        <ModalContent class="!gap-6 items-center">   
            <template v-if="orientation === Orientation.VERTICAL">
                <ContainedIcon
                    :color="ColorAccent.DANGER"
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
                        :color="ColorAccent.DANGER"
                        :size="IconContainerSize.LG"
                        :icon
                    />
                    
                    <ModalHeaderGroup centered class="sm:text-left">
                        <ModalTitle :title class="sm:max-w-[450px]" />
                        <ModalDescription v-if="description">
                            {{ description }}
                        </ModalDescription>
                    </ModalHeaderGroup>
                </div>
            </template>

            <slot />

            <ModalActions 
                v-if="showModalActions"
                :class="[
                    orientation === Orientation.HORIZONTAL ? 'justify-end' : '',
                ]"
            >
                <ActionButton 
                    :text="buttonCloseText"
                    :class="[
                        orientation === Orientation.HORIZONTAL ? 'w-full md:w-auto' : 'w-full'
                    ]" 
                    @click="handleClose"
                />
                <ActionButton 
                    :styleType="ButtonStyleType.DELETE_FILLED"
                    :iconPosition="buttonActionIcon ? IconPosition.LEFT : IconPosition.NONE"
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
        type: String as PropType<string>,
        default: 'mdi:alert-outline',
    },
    title: {
        type: String as PropType<string>,
        default: 'Modal title',
    },
    description: String as PropType<string>,
    buttonCloseText: {
        type: String as PropType<string>,
        default: 'Cancel',
    },
    buttonActionText: {
        type: String as PropType<string>,
        default: 'Delete',
    },
    buttonActionIcon: {
        type: String as PropType<string>,
        default: 'mdi:delete-forever-outline',
    },
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
        default: Orientation.HORIZONTAL,
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