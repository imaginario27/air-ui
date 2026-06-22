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
            disabled ? 'opacity-disabled cursor-not-allowed' : '',
            'self-start',
            !transparent && 'bg-background-container-surface',
        ]"
        @click="emitClick"
    >
        <!-- Left icon -->
        <Icon
            :name="icon"
            :iconClass="iconSizeClass"
        />
    </button>
</template>
<script setup lang="ts">
// Props
const props = defineProps({
    size: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.LG,
        validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
    },
    icon: {
        type: String as PropType<string>,
        default: 'mdi:help',
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
        [ButtonSize.XS]: 'w-[24px] h-[24px]',
        [ButtonSize.SM]: 'w-[28px] h-[28px]',
        [ButtonSize.MD]: 'w-[32px] h-[32px]',
        [ButtonSize.LG]: 'w-[36px] h-[36px]',
        [ButtonSize.XL]: 'w-[40px] h-[40px]',
        [ButtonSize.XXL]: 'w-[48px] h-[48px]',
    }
    return sizeVariant[props.size as ButtonSize] || 'w-[36px] h-[36px]'
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
</script>
