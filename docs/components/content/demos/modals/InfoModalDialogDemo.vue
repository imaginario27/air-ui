<template>
    <InfoModalDialog 
        v-model="showModal"
        :icon
        :title
        :description
        :buttonCloseText
        :buttonActionText
        :buttonActionIcon
        :isLoading
        :loadingText
        :orientation
        :cardClasses
        :closeOnClickOutside
        :hasCornerCloseButton
    />
    <ActionButton 
        :styleType="ButtonStyleType.NEUTRAL_FILLED"
        text="Open Info Modal"
        @click="showModal = true"
    />
</template>
<script setup lang="ts">
// States
const showModal = ref(false)

// Props
defineProps({
    icon: {
        type: String as PropType<string>,
        default: 'mdi:information-outline',
    },
    title: {
        type: String as PropType<string>,
        default: 'Modal title',
    },
    description: {
        type: String as PropType<string>,
        default: 'Modal description',
    },
    buttonCloseText: {
        type: String as PropType<string>,
        default: 'Cancel',
    },
    buttonActionText: String as PropType<string>,
    buttonActionIcon: {
        type: String as PropType<string>,
        default: 'mdi:delete-forever-outline',
    },
    isLoading: { 
        type: Boolean as PropType<boolean>,
        default: false,
    },
    loadingText: String as PropType<string>,
    orientation: {
        type: String as PropType<Orientation>,
        default: Orientation.HORIZONTAL,
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
})
</script>