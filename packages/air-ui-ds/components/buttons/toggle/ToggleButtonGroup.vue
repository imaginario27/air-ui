<template>
    <div
        :id="id"
        role="group"
        :aria-label="ariaLabel || 'Toggle options'"
        :class="[
            'flex',
            groupStyle === ToggleButtonGroupStyle.GROUPED ? '' : 'flex-wrap gap-3',
            'w-fit',
            'rounded-button'
        ]"
    >
        <template v-if="!onlyIcon">
            <ToggleButton
                v-for="(button, index) in buttons"
                :key="index"
                :active="button.value === modelValue"
                :ariaLabel="button.ariaLabel"
                :text="!onlyIcon && 'text' in button ? button.text : undefined"
                :size="buttonSize(button)"
                :icon="button.icon"
                :iconPosition="'iconPosition' in button ? button.iconPosition : undefined"
                :disabled
                :transparent
                :class="buttonItemClass(button)"
                @click="!disabled && handleButtonClick(button)"
            />
        </template>
        <template v-else>
            <ToggleIconButton
                v-for="(button, index) in buttons"
                :key="index"
                :active="button.value === modelValue"
                :ariaLabel="button.ariaLabel"
                :size="buttonSize(button)"
                :icon="button.icon"
                :disabled
                :transparent
                :class="buttonItemClass(button)"
                @click="!disabled && handleButtonClick(button)"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    id: String as PropType<string>,
    ariaLabel: String as PropType<string>,
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
    size: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.LG,
        validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
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
    transparent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Computed classes
const groupedButtonClass = computed(() =>
    props.groupStyle === ToggleButtonGroupStyle.GROUPED
        ? 'border-y border-r border-border-default rounded-none first:border-l first:rounded-l-button last:rounded-r-button'
        : false
)

const segmentedButtonClass = computed(() =>
    props.groupStyle === ToggleButtonGroupStyle.SEGMENTED && props.hasButtonBorder
        ? 'border border-border-default rounded-button'
        : false
)

const buttonSize = (button: ToggleButtonItem) => button.size ?? props.size

const buttonItemClass = (button: ToggleButtonItem) => [
    groupedButtonClass.value,
    segmentedButtonClass.value,
    props.groupStyle === ToggleButtonGroupStyle.SEGMENTED && button.active && '!border-border-primary-brand-active',
    !props.hasButtonBorder && 'rounded-button',
]

// Handlers
const handleButtonClick = (button: ToggleButtonItem) => {
    if (button?.action) {
        button.action()
    }

    emit('update:modelValue', button.value)
}
</script>