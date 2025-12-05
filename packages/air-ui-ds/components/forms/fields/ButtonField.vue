<template>
    <div :class="[ 'flex flex-col', 'w-full', 'gap-2' ]">
        <!-- Label -->
        <label 
            v-if="label"
            :for="id" 
            :class="[ 
                'text-sm', 
                'font-semibold', 
                'text-left', 
            ]"
        >
            {{ label }}
        </label>
        <ActionButton 
            :text
            :size
            :icon
            :iconPosition
            :disabled
            :isLoading
            :loadingText
            :styleType
            :actionType
            :svgIcon
            :useSVGIconColor
            :isRounded
            :isFullWidth
            :isMobileFullWidth
            :to
            :isExternal
            @click="emitClick"
        />
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    id: { 
        type: String as PropType<string>, 
        required: true,
    },
    label: String as PropType<string>,
    actionType: {
        type: String as PropType<ButtonActionType>,
        default: ButtonActionType.ACTION,
        validator: (value: ButtonActionType) => Object.values(ButtonActionType).includes(value),
    },
    styleType: {
        type: String as PropType<ButtonStyleType>,
        default: ButtonStyleType.NEUTRAL_OUTLINED,
        validator: (value: ButtonStyleType) => Object.values(ButtonStyleType).includes(value),
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
        default: "mdiHelp"
    },
    iconPosition: {
        type: String as PropType<IconPosition>,
        default: IconPosition.NONE,
        validator: (value: IconPosition) => Object.values(IconPosition).includes(value),
    },
    svgIcon: String as PropType<string>,
    useSVGIconColor: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    to: {
        type: String as PropType<string>,
        default: ''
    },
    isExternal: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    isRounded: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    isFullWidth: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    isMobileFullWidth: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    isLoading: { 
        type: Boolean as PropType<boolean>,
        default: false,
    },
    loadingText: { 
        type: String as PropType<string>,
        default: 'Processing...',
    }, 
})

// Emits
const emit = defineEmits(['click'])
const emitClick = () => {
    if (!props.disabled) {
        emit('click')
    }
}
</script>