<template>
    <div 
        :class="[
            'flex',
            groupStyle === ToggleButtonGroupStyle.GROUPED ? 'border border-border-default overflow-hidden' : 'flex-wrap gap-3',
            'w-fit',
            'rounded-button'
        ]"
    >
        <ToggleButton
            v-for="(button, index) in buttons"
            :key="index"
            :active="button.value === modelValue"
            :text="button.text"
            :size="button.size"
            :icon="button.icon"
            :iconPosition="button.iconPosition"
            :disabled
            :class="[
                groupStyle === ToggleButtonGroupStyle.SEGMENTED && hasButtonBorder && 'border border-border-default rounded',
                groupStyle === ToggleButtonGroupStyle.SEGMENTED && button.active && '!border-border-primary-brand-active',
                !hasButtonBorder && 'rounded-button',
            ]"
            @click="!disabled && handleButtonClick(button)"
        />
    </div>
</template>

<script setup lang="ts">
// Props
defineProps({
    modelValue: {
        type: String as PropType<string>,
        default: 'button-1',
    },
    buttons: {
        type: Array as PropType<ToggleButton[]>,
        default: () => [
            {
                text: 'Button 1',
                value: 'button-1',
                action: () => {},
            },
            {
                text: 'Button 2',
                value: 'button-2',
                action: () => {},
            },
        ],
    },
    groupStyle: {
        type: String as PropType<ToggleButtonGroupStyle>,
        default: ToggleButtonGroupStyle.GROUPED,
        validator: (value: ToggleButtonGroupStyle) => Object.values(ToggleButtonGroupStyle).includes(value),
    },
    hasButtonBorder: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Handlers
const handleButtonClick = (button: ToggleButton) => {
    if (button?.action) {
        button.action()
    }

    emit('update:modelValue', button.value)
}
</script>