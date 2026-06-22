<template>
    <button
        type="button"
        :aria-pressed="active"
        :aria-label="ariaLabel"
        :disabled
        :class="[
            'flex items-center justify-center',
            'text-nowrap',
            ...buttonStyleClass,
            buttonSizeClass,
            horizontalPaddingClass,
            gapClass,
            disabled ? 'opacity-disabled cursor-not-allowed' : '',
            'self-start',
            !transparent && 'bg-background-container-surface',
        ]"
        @click="emitClick"
    >
        <!-- Left icon -->
        <Icon
            v-if="iconPosition === IconPosition.LEFT"
            :name="icon"
            :iconClass="iconSizeClass"
        />
        <span :class="['font-semibold', textSizeClass]">
            {{ text }}
        </span>
        <!-- Right icon -->
        <Icon
            v-if="iconPosition === IconPosition.RIGHT"
            :name="icon"
            :iconClass="iconSizeClass"
        />
    </button>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Button text',
    },
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
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    active: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    ariaLabel: String as PropType<string>,
    transparent: {
        type: Boolean as PropType<boolean>,
        default: false,
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
const buttonStyleClass = computed(() =>
    props.active
        ? ['bg-background-primary-brand-subtle-active', 'text-text-primary-brand-on-soft-bg']
        : ['text-text-neutral-inactive', !props.disabled && 'hover:text-text-primary-brand-hover']
)

const buttonSizeClass = computed(() => {
    const sizeVariant = {
        [ButtonSize.XS]: 'h-[24px]',
        [ButtonSize.SM]: 'h-[28px]',
        [ButtonSize.MD]: 'h-[32px]',
        [ButtonSize.LG]: 'h-[36px]',
        [ButtonSize.XL]: 'h-[40px]',
        [ButtonSize.XXL]: 'h-[48px]',
    }
    return sizeVariant[props.size as ButtonSize] || 'h-[36px]'
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

const textSizeClass = computed(() => {
    const sizeVariant = {
        [ButtonSize.XS]: 'text-xs',
        [ButtonSize.SM]: 'text-sm',
        [ButtonSize.MD]: 'text-sm',
        [ButtonSize.LG]: 'text-sm',
        [ButtonSize.XL]: 'text-sm',
        [ButtonSize.XXL]: 'text-base',
    }
    return sizeVariant[props.size as ButtonSize] || 'text-sm'
})

const horizontalPaddingClass = computed(() => {
    const sizeVariant = {
        [ButtonSize.XS]: 'px-2',
        [ButtonSize.SM]: 'px-2',
        [ButtonSize.MD]: 'px-2.5',
        [ButtonSize.LG]: 'px-3',
        [ButtonSize.XL]: 'px-3.5',
        [ButtonSize.XXL]: 'px-4',
    }
    return sizeVariant[props.size as ButtonSize] || 'px-3'
})

const gapClass = computed(() => {
    const sizeVariant = {
        [ButtonSize.XS]: 'gap-1',
        [ButtonSize.SM]: 'gap-1.5',
        [ButtonSize.MD]: 'gap-2',
        [ButtonSize.LG]: 'gap-2',
        [ButtonSize.XL]: 'gap-2',
        [ButtonSize.XXL]: 'gap-2',
    }
    return sizeVariant[props.size as ButtonSize] || 'gap-2'
})
</script>
