<template>
    <SuccessModalDialog 
        v-model="showModal"
        :icon
        :title
        :description
        :buttonText
        :cardClasses
        :closeOnClickOutside
        :hasCornerCloseButton
    />
    <ActionButton 
        :styleType="ButtonStyleType.NEUTRAL_FILLED"
        text="Open Success Modal"
        @click="showModal = true"
    />
</template>
<script setup lang="ts">
// States
const showModal = ref(false)

// Props
defineProps({
    icon: {
        type: String as PropType<any>,
        default: 'mdiCheckBold',
    },
    title: {
        type: String as PropType<string>,
        default: 'Modal title',
    },
    description: {
        type: String as PropType<string>,
        default: 'Modal description',
    },
    buttonText: {
        type: String as PropType<string>,
        default: 'Close window',
    },
    cardClasses: {
        type: String as PropType<string>,
        default: 'max-w-[400px]',
    },
    closeOnClickOutside: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    hasCornerCloseButton: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})
</script>