<template>
    <button
        type="button"
        :disabled="disabled"
        :class="[
            'flex items-center justify-center',
            'aspect-square',
            'text-nowrap',
            ...buttonStyleClass,
            buttonSizeClass,
            horizontalPaddingClass,
            gapClass,
            disabled ? 'opacity-disabled cursor-not-allowed' : '',
            'self-start',
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
        : ['text-text-neutral-inactive', 'hover:text-text-primary-brand-hover']
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
    const sizeVariant = {
        [ButtonSize.XS]: '16px',
        [ButtonSize.SM]: '16px',
        [ButtonSize.MD]: '16px',
        [ButtonSize.LG]: '20px',
        [ButtonSize.XL]: '20px',
        [ButtonSize.XXL]: '24px',
    }
    return sizeVariant[props.size as ButtonSize] || '20px'
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
