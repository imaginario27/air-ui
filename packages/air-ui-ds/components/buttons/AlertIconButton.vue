<template>
    <component
        :is="actionType === ButtonActionType.LINK ? NuxtLink : 'button'"
        :type="actionType === ButtonActionType.ACTION ? 'button' : undefined"
        :class="[
            'flex items-center justify-center',
            'text-nowrap',
            'w-[32px] h-[32px]',
            'self-start',
            'aspect-square',
            'hover:opacity-75',
            iconClass
        ]"
        v-bind="{
            ...componentProps,
            ...$attrs,
            ...(actionType === ButtonActionType.ACTION ? { onClick: emitClick } : {})
        }"
        :disabled
    >
        <Icon 
            v-if="icon"
            :name="icon"
            :iconClass
        />
    </component>
</template>

<script setup lang="ts">
// Imports
import { NuxtLink } from '#components'

 // Component options
defineOptions({
    inheritAttrs: false, // Prevents Vue from automatically applying attributes incorrectly
})

// Props
const props = defineProps({
    type: {
        type: String as PropType<AlertType>,
        default: AlertType.WARNING,
        validator: (value: AlertType) => Object.values(AlertType).includes(value),
    },
    actionType: {
        type: String as PropType<ButtonActionType>,
        default: ButtonActionType.ACTION,
        validator: (value: ButtonActionType) => Object.values(ButtonActionType).includes(value),
    },
    text: {
        type: String as PropType<string>,
        default: 'Button text'
    },
    icon: {
        type: String as PropType<string>,
        default: "mdi:help"
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    to: {
        type: String as PropType<string>,
        default: '/'
    },
    isExternal: {
        type: Boolean as PropType<boolean>,
        default: false
    },
})

// Emits
const emit = defineEmits(['click'])
const emitClick = () => {
    if (!props.disabled) {
        emit('click')
    }
}

// Computed classes
const iconClass = computed(() => {
    const variant = {
        [AlertType.WARNING]: 'text-icon-warning-on-bg',
        [AlertType.DANGER]: 'text-icon-danger',
        [AlertType.SUCCESS]: 'text-icon-success',
        [AlertType.INFO]: 'text-icon-info',
    }
    return variant[props.type as AlertType] || 'text-icon-warning-on-bg'
})

// Props for the dynamic component
const componentProps = computed(() => {
    if (props.actionType === ButtonActionType.LINK) {
        return {
            to: props.to,
            target: props.isExternal ? '_blank' : '_self',
            rel: props.isExternal ? 'noopener noreferrer' : undefined,
            external: props.isExternal,
        }
    } else {
        return {}
    }
})
</script>