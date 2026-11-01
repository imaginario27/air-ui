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
        <Icon :name="icon" :iconClass="iconSizeClass" />
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
    responsiveSize: {
        type: Boolean as PropType<boolean | null>,
        default: null,
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
        : ['text-text-neutral-inactive', !props.disabled && 'hover:text-text-primary-brand-hover'],
)

const { iconButtonSizeClass: buttonSizeClass, iconSizeClass } = useResponsiveSize({
    size: () => props.size,
    responsiveSize: () => props.responsiveSize,
})
</script>
