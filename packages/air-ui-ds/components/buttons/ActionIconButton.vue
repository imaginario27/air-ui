<template>
    <component
        :is="actionType === ButtonActionType.LINK ? (disabled ? 'span' : NuxtLink) : 'button'"
        :id
        :type="actionType === ButtonActionType.ACTION ? type : undefined"
        :class="[
            'flex items-center justify-center rounded-button',
            isRounded ? 'rounded-full' : 'rounded-button',
            'aspect-square',
            ...buttonStyleClass,
            buttonSizeClass,
            disabled && 'opacity-disabled cursor-not-allowed pointer-events-none',
        ]"
        v-bind="{
            ...componentProps,
            ...$attrs,
            ...(actionType === ButtonActionType.ACTION ? { onClick: emitClick } : {})
        }"
        :disabled="disabled"
        
    >
        <Icon 
            :name="icon"
            :iconClass="[
                iconSizeClass, 
                iconColorClass, 
                iconClass ? iconClass : ''
            ]"
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
    type: {
        type: String as PropType<'button' | 'submit' | 'reset'>,
        default: 'button',
        validator: (value: string) => 
            ['button', 'submit', 'reset'].includes(value),
    }, 
    size: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.LG,
        validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
    },
    icon: {
        type: String as PropType<string>,
        default: "mdi:help"
    },
    iconClass: String as PropType<string>,
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    to: {
        type: String as PropType<string>,
        default: '/'
    },
    isRounded: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    isExternal: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    id: String as PropType<string>,
})

// Emits
const emit = defineEmits(['click'])
const emitClick = (event: MouseEvent) => {
    if (!props.disabled) {
        emit('click', event)
    }
}

// Computed classes
const buttonStyleClass = computed(() => {
    const variant = {
        [ButtonStyleType.PRIMARY_BRAND_FILLED]: [
            'bg-background-primary-brand-default',
            !props.disabled && 'hover:bg-background-primary-brand-hover',
            'focus:ring-offset-2',
            'focus:ring-2',
            'focus:ring-border-primary-brand-default',
            'text-text-neutral-on-filled',
        ],
        [ButtonStyleType.PRIMARY_BRAND_SOFT]: [
            'bg-background-primary-brand-soft',
            !props.disabled && 'hover:bg-background-primary-brand-soft-hover',
            'focus:ring-offset-2',
            'focus:ring-2',
            'focus:ring-border-primary-brand-default',
            'text-icon-primary-brand-on-soft-bg',
        ],
        [ButtonStyleType.PRIMARY_BRAND_TRANSPARENT]: [
            'focus:ring-offset-2',
            'focus:ring-2',
            'focus:ring-border-primary-brand-default',
            'text-text-primary-brand-default',
            !props.disabled && 'hover:text-text-primary-brand-hover',
        ],
        [ButtonStyleType.SECONDARY_BRAND_FILLED]: [
            'bg-background-secondary-brand-default',
            !props.disabled && 'hover:bg-background-secondary-brand-hover',
            'focus:ring-offset-2',
            'focus:ring-2',
            'focus:ring-border-secondary-brand',
            'text-text-neutral-on-filled',
        ],
        [ButtonStyleType.NEUTRAL_FILLED]: [
            'bg-background-neutral-filled-default',
            !props.disabled && 'hover:bg-background-neutral-filled-hover',
            'focus:ring-offset-2',
            'focus:ring-2',
            'focus:ring-border-primary-brand-default',
            'text-text-neutral-on-neutral-filled-bg',
        ],
        [ButtonStyleType.NEUTRAL_OUTLINED]: [
            'border',
            'border-border-default',
            'bg-background-neutral-default',
            !props.disabled && 'hover:bg-background-neutral-hover',
            'focus:ring-offset-2',
            'focus:ring-2',
            'focus:ring-border-primary-brand-default',
            'text-text-default',
        ],
        [ButtonStyleType.NEUTRAL_TRANSPARENT]: [
            !props.disabled && 'hover:bg-background-neutral-hover',
            'focus:ring-offset-2',
            'focus:ring-2',
            'focus:ring-border-primary-brand-default',
            'text-text-default',
        ],
        [ButtonStyleType.NEUTRAL_TRANSPARENT_SUBTLE]: [
            !props.disabled && 'hover:bg-background-neutral-hover hover:text-text-default',
            'focus:ring-offset-2',
            'focus:ring-2',
            'focus:ring-border-primary-brand-default',
            'text-text-neutral-subtler',
        ],
        [ButtonStyleType.DELETE_FILLED]: [
            'bg-background-delete-default',
            !props.disabled && 'hover:bg-background-delete-hover',
            'focus:ring-offset-2',
            'focus:ring-2',
            'focus:ring-border-delete',
            'text-text-neutral-on-filled',
        ],
        [ButtonStyleType.DELETE_SOFT]: [
            'bg-background-delete-soft',
            !props.disabled && 'hover:bg-background-delete-soft-hover',
            'focus:ring-offset-2',
            'focus:ring-2',
            'focus:ring-border-delete',
            'text-text-delete',
        ],
        [ButtonStyleType.DELETE_OUTLINED]: [
            'border',
            'border-border-delete-subtle',
            'bg-background-neutral-default',
            !props.disabled && 'hover:bg-background-delete-on-neutral-hover',
            'focus:ring-offset-2',
            'focus:ring-2',
            'focus:ring-border-delete',
            'text-text-delete',
        ],
        [ButtonStyleType.DELETE_TRANSPARENT]: [
            !props.disabled && 'hover:bg-background-delete-on-neutral-hover',
            'focus:ring-offset-2',
            'focus:ring-2',
            'focus:ring-border-delete',
            'text-text-delete',
        ],
    }

    return variant[props.styleType as ButtonStyleType]?.filter(Boolean) || [
        'border',
        'border-border-default',
        'bg-background-neutral-default',
        !props.disabled && 'hover:bg-background-neutral-hover',
        'focus:ring-offset-2',
        'focus:ring-2',
        'focus:ring-border-primary-brand-default',
        'text-text-default',
    ].filter(Boolean)
})

const buttonSizeClass = computed(() => {
    const variant = {
        [ButtonSize.XS]: 'w-[24px] h-[24px]',
        [ButtonSize.SM]: 'w-[28px] h-[28px]',
        [ButtonSize.MD]: 'w-[32px] h-[32px]',
        [ButtonSize.LG]: 'w-[36px] h-[36px]',
        [ButtonSize.XL]: 'w-[40px] h-[40px]',
        [ButtonSize.XXL]: 'w-[48px] h-[48px]',
    }
    return variant[props.size as ButtonSize] || 'w-[36px] h-[36px]'
})

const iconSizeClass = computed(() => {
    const variant = {
        [ButtonSize.XS]: 'w-[16px] h-[16px] min-w-[16px] min-h-[16px]',
        [ButtonSize.SM]: 'w-[16px] h-[16px] min-w-[16px] min-h-[16px]',
        [ButtonSize.MD]: 'w-[16px] h-[16px] min-w-[16px] min-h-[16px]',
        [ButtonSize.LG]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        [ButtonSize.XL]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        [ButtonSize.XXL]: 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]',
    }
    return variant[props.size as ButtonSize] || 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]'
})

const iconColorClass = computed(() => {
    const variant = {
        [ButtonStyleType.PRIMARY_BRAND_FILLED]: '!text-text-neutral-on-filled',
        [ButtonStyleType.PRIMARY_BRAND_SOFT]: '!text-icon-primary-brand-on-soft-bg',
        [ButtonStyleType.PRIMARY_BRAND_TRANSPARENT]: '!text-text-primary-brand-default',
        [ButtonStyleType.SECONDARY_BRAND_FILLED]: '!text-text-neutral-on-filled',
        [ButtonStyleType.NEUTRAL_FILLED]: '!text-text-neutral-on-neutral-filled-bg',
        [ButtonStyleType.NEUTRAL_OUTLINED]: '!text-text-default',
        [ButtonStyleType.NEUTRAL_TRANSPARENT]: '!text-text-default',
        [ButtonStyleType.NEUTRAL_TRANSPARENT_SUBTLE]: '!text-text-neutral-subtler',
        [ButtonStyleType.DELETE_FILLED]: '!text-text-neutral-on-filled',
        [ButtonStyleType.DELETE_SOFT]: '!text-text-delete',
        [ButtonStyleType.DELETE_OUTLINED]: '!text-text-delete',
        [ButtonStyleType.DELETE_TRANSPARENT]: '!text-text-delete',
    }
    return variant[props.styleType as ButtonStyleType] || '!text-text-default'
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