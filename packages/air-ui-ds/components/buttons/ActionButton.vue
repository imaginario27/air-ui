<template>
    <component
        :is="actionType === ButtonActionType.LINK ? (disabled ? 'span' : NuxtLink) : 'button'"
        :id
        :type="actionType === ButtonActionType.ACTION ? type : undefined"
        :class="[
            'flex items-center justify-center',
            isRounded ? 'rounded-full' : 'rounded-button',
            'text-nowrap',
            glowClass.length ? 'transition-[color,background-color,border-color,box-shadow]' : 'transition-colors',
            'duration-200 ease-out',
            ...buttonStyleClass,
            buttonSizeClass,
            horizontalPaddingClass,
            gapClass,
            'self-start',
            !hasFocusRing && 'focus-visible:!ring-0 focus-visible:!ring-offset-0',
            isFullWidth && 'w-full',
            isMobileFullWidth && 'w-full md:w-auto',
            ...glowClass,
            disabled && 'opacity-disabled cursor-not-allowed pointer-events-none',
        ]"
        v-bind="{
            ...componentProps,
            ...$attrs,
            ...(actionType === ButtonActionType.ACTION ? { onClick: emitClick } : {}),
        }"
        :disabled="(ButtonActionType.ACTION && isLoading) || disabled"
    >
        <!-- Loading State -->
        <template v-if="isLoading">
            <Spinner :class="[iconSizeClass, spinnerColorClass]" />

            <span
                :class="[
                    'font-semibold',
                    'leading-none',
                    '[text-box:trim-both_cap_alphabetic]',
                    'select-none',
                    textSizeClass,
                    textClass,
                ]"
            >
                {{ resolvedLoadingText }}
            </span>
        </template>

        <!-- Normal Content -->
        <template v-else>
            <!-- Left icon -->
            <template v-if="iconPosition === IconPosition.LEFT">
                <Icon
                    v-if="icon"
                    :name="icon"
                    :iconClass="[iconSizeClass, iconColorClass, iconClass ? iconClass : '']"
                />
            </template>

            <span
                :class="[
                    'font-semibold',
                    'leading-none',
                    '[text-box:trim-both_cap_alphabetic]',
                    'select-none',
                    textSizeClass,
                    textClass,
                ]"
            >
                {{ text }}
            </span>

            <!-- Right icon -->
            <template v-if="iconPosition === IconPosition.RIGHT">
                <Icon
                    v-if="icon"
                    :name="icon"
                    :iconClass="[iconSizeClass, iconColorClass, iconClass ? iconClass : '']"
                />
            </template>
        </template>
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
        validator: (value: string) => ['button', 'submit', 'reset'].includes(value),
    },
    text: {
        type: String as PropType<string>,
        default: 'Button text',
    },
    textClass: String as PropType<string>,
    size: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.LG,
        validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
    },
    icon: {
        type: String as PropType<string>,
        default: 'mdi:help',
    },
    iconPosition: {
        type: String as PropType<IconPosition>,
        default: IconPosition.NONE,
        validator: (value: IconPosition) => Object.values(IconPosition).includes(value),
    },
    iconClass: String as PropType<string>,
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    to: {
        type: String as PropType<string>,
        default: '/',
    },
    isExternal: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isRounded: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasFocusRing: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
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
    isFullWidth: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    isMobileFullWidth: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    responsiveSize: {
        type: Boolean as PropType<boolean | null>,
        default: null,
    },
    isLoading: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    loadingText: String as PropType<string>,
    id: String as PropType<string>,
})

// Composables
const dsConfig = useDSConfig()

// Computed
const resolvedLoadingText = computed(() => props.loadingText ?? dsConfig.actions.processingText())

// Size classes
const { buttonSizeClass, iconSizeClass, textSizeClass, horizontalPaddingClass, gapClass } = useResponsiveSize({
    size: () => props.size,
    responsiveSize: () => props.responsiveSize,
    iconPosition: () => props.iconPosition,
})

// Glow
const { glowClass } = useButtonGlow(props)

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
            'focus-visible:ring-offset-2',
            'focus-visible:ring-2',
            'focus-visible:ring-border-primary-brand-default',
            'text-text-neutral-on-filled',
        ],
        [ButtonStyleType.PRIMARY_BRAND_SOFT]: [
            'bg-background-primary-brand-soft',
            !props.disabled && 'hover:bg-background-primary-brand-soft-hover',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-2',
            'focus-visible:ring-border-primary-brand-default',
            'text-icon-primary-brand-on-soft-bg',
        ],
        [ButtonStyleType.PRIMARY_BRAND_TRANSPARENT]: [
            'focus-visible:ring-offset-2',
            'focus-visible:ring-2',
            'focus-visible:ring-border-primary-brand-default',
            'text-text-primary-brand-default',
            !props.disabled && 'hover:text-text-primary-brand-hover',
        ],
        [ButtonStyleType.SECONDARY_BRAND_FILLED]: [
            'bg-background-secondary-brand-default',
            !props.disabled && 'hover:bg-background-secondary-brand-hover',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-2',
            'focus-visible:ring-border-secondary-brand',
            'text-text-neutral-on-filled',
        ],
        [ButtonStyleType.NEUTRAL_FILLED]: [
            'bg-background-neutral-filled-default',
            !props.disabled && 'hover:bg-background-neutral-filled-hover',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-2',
            'focus-visible:ring-border-primary-brand-default',
            'text-text-neutral-on-neutral-filled-bg',
        ],
        [ButtonStyleType.NEUTRAL_OUTLINED]: [
            'border',
            'border-border-default',
            'bg-background-neutral-default',
            !props.disabled && 'hover:bg-background-neutral-hover',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-2',
            'focus-visible:ring-border-primary-brand-default',
            'text-text-default',
        ],
        [ButtonStyleType.NEUTRAL_TRANSPARENT]: [
            !props.disabled && 'hover:bg-background-neutral-hover',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-2',
            'focus-visible:ring-border-primary-brand-default',
            'text-text-default',
        ],
        [ButtonStyleType.NEUTRAL_TRANSPARENT_SUBTLE]: [
            !props.disabled && 'hover:bg-background-neutral-hover hover:text-text-default',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-2',
            'focus-visible:ring-border-primary-brand-default',
            'text-text-neutral-subtler',
        ],
        [ButtonStyleType.DELETE_FILLED]: [
            'bg-background-delete-default',
            !props.disabled && 'hover:bg-background-delete-hover',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-2',
            'focus-visible:ring-border-delete',
            'text-text-neutral-on-filled',
        ],
        [ButtonStyleType.DELETE_SOFT]: [
            'bg-background-delete-soft',
            !props.disabled && 'hover:bg-background-delete-soft-hover',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-2',
            'focus-visible:ring-border-delete',
            'text-text-delete',
        ],
        [ButtonStyleType.DELETE_OUTLINED]: [
            'border',
            'border-border-delete-subtle',
            'bg-background-neutral-default',
            !props.disabled && 'hover:bg-background-delete-on-neutral-hover',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-2',
            'focus-visible:ring-border-delete',
            'text-text-delete',
        ],
        [ButtonStyleType.DELETE_TRANSPARENT]: [
            !props.disabled && 'hover:bg-background-delete-on-neutral-hover',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-2',
            'focus-visible:ring-border-delete',
            'text-text-delete',
        ],
    }

    return (
        variant[props.styleType as ButtonStyleType]?.filter(Boolean) ||
        [
            'border',
            'border-border-default',
            'bg-background-neutral-default',
            !props.disabled && 'hover:bg-background-neutral-hover',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-2',
            'focus-visible:ring-border-primary-brand-default',
            'text-text-default',
        ].filter(Boolean)
    )
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

const spinnerColorClass = computed(() => {
    const variant = {
        [ButtonStyleType.PRIMARY_BRAND_FILLED]: 'border-x-border-neutral-on-filled! border-b-border-neutral-on-filled!',
        [ButtonStyleType.PRIMARY_BRAND_SOFT]:
            'border-x-border-primary-brand-default! border-b-border-primary-brand-default!',
        [ButtonStyleType.PRIMARY_BRAND_TRANSPARENT]:
            'border-x-border-primary-brand-default! border-b-border-primary-brand-default!',
        [ButtonStyleType.SECONDARY_BRAND_FILLED]:
            'border-x-border-neutral-on-filled! border-b-border-neutral-on-filled!',
        [ButtonStyleType.NEUTRAL_FILLED]: 'border-x-border-neutral-on-filled! border-b-border-neutral-on-filled!',
        [ButtonStyleType.NEUTRAL_OUTLINED]:
            'border-x-border-primary-brand-default! border-b-border-primary-brand-default!',
        [ButtonStyleType.NEUTRAL_TRANSPARENT]:
            'border-x-border-primary-brand-default! border-b-border-primary-brand-default!',
        [ButtonStyleType.NEUTRAL_TRANSPARENT_SUBTLE]:
            'border-x-border-primary-brand-default! border-b-border-primary-brand-default!',
        [ButtonStyleType.DELETE_FILLED]: 'border-x-border-neutral-on-filled! border-b-border-neutral-on-filled!',
        [ButtonStyleType.DELETE_SOFT]: 'border-x-border-delete-default! border-b-border-delete-default!',
        [ButtonStyleType.DELETE_OUTLINED]: 'border-x-border-delete-default! border-b-border-delete-default!',
        [ButtonStyleType.DELETE_TRANSPARENT]: 'border-x-border-delete-default! border-b-border-delete-default!',
    }
    return variant[props.styleType as ButtonStyleType] || 'border-border-primary-brand-default'
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
