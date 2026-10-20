<template>
    <button
        :class="[
            styleType === ButtonPaginationStyle.BUTTON ? 'border' : 'border-t',
            'border-border-default',
            styleType === ButtonPaginationStyle.BUTTON && 'first:rounded-l last:rounded-r',
            'min-w-[40px] h-[36px] w-full',
            'flex',
            'items-center',
            'justify-center',
            'text-sm',
            'text-text-default',
            'font-semibold',
            'transition-colors duration-200 ease-out',
            'hover:bg-background-neutral-hover',
            props.disabled ? 'opacity-50 hover:cursor-not-allowed hover:bg-transparent' : 'hover:cursor-pointer',
        ]"
        :disabled="props.disabled"
        :aria-label="resolvedAriaLabel"
        @click="emitClick"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    styleType: {
        type: String as PropType<ButtonPaginationStyle>,
        default: ButtonPaginationStyle.BUTTON,
        validator: (value: ButtonPaginationStyle) => Object.values(ButtonPaginationStyle).includes(value),
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    ariaLabel: String as PropType<string>,
})

// Composables
const dsConfig = useDSConfig()

// Computed
const resolvedAriaLabel = computed(() => props.ariaLabel ?? dsConfig.accessibility.navigationButtonText())

// Emits
const emit = defineEmits(['click'])
const emitClick = () => {
    if (!props.disabled) {
        emit('click')
    }
}
</script>
