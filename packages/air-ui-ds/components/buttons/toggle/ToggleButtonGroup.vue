<template>
    <div 
        :class="[
            'flex',
            groupStyle === ToggleButtonGroupStyle.GROUPED ? 'border border-border-default' : 'flex-wrap gap-3',
            'w-fit',
            'rounded-button'
        ]"
    >
        <template v-if="!onlyIcon">
            <ToggleButton
                v-for="(button, index) in buttons"
                :key="index"
                :active="button.value === modelValue"
                :text="!onlyIcon && 'text' in button ? button.text : undefined"
                :size="button.size"
                :icon="button.icon"
                :iconPosition="'iconPosition' in button ? button.iconPosition : undefined"
                :disabled
                :class="[
                    groupStyle === ToggleButtonGroupStyle.SEGMENTED && hasButtonBorder && 'border border-border-default rounded-button',
                    groupStyle === ToggleButtonGroupStyle.SEGMENTED && button.active && '!border-border-primary-brand-active',
                    !hasButtonBorder && 'rounded-button',
                ]"
                @click="!disabled && handleButtonClick(button)"
            />
        </template>
        <template v-else>
            <ToggleIconButton
                v-for="(button, index) in buttons"
                :key="index"
                :active="button.value === modelValue"
                :size="button.size"
                :icon="button.icon"
                :disabled
                :class="[
                    groupStyle === ToggleButtonGroupStyle.SEGMENTED && hasButtonBorder && 'border border-border-default rounded-button',
                    groupStyle === ToggleButtonGroupStyle.SEGMENTED && button.active && '!border-border-primary-brand-active',
                    !hasButtonBorder && 'rounded-button',
                ]"
                @click="!disabled && handleButtonClick(button)"
            />
        </template>
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
        type: Array as PropType<ToggleButtonItem[]>,
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
    onlyIcon: {
        type: Boolean as PropType<boolean>, 
        default: false, 
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
const handleButtonClick = (button: ToggleButtonItem) => {
    if (button?.action) {
        button.action()
    }

    emit('update:modelValue', button.value)
}
</script>