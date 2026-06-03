<template>
    <div
        role="group"
        aria-label="Options"
        :class="[
            'flex',
            'flex-wrap gap-2',
        ]"
    >
        <OptionButton
            v-for="(button, index) in displayButtons"
            :key="index"
            :aria-pressed="isButtonActive(button)"
            :ariaLabel="button.ariaLabel"
            :active="isButtonActive(button)"
            :text="button.text"
            :size
            :isRounded
            :icon="button.icon"
            :iconPosition="button.iconPosition"
            :disabled="button.disabled"
            :styleType="getButtonStyleType(button)"
            :class="[isButtonActive(button) && 'border border-border-primary-brand-active']"
            @click="handleButtonClick(button)"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: [String, Number, Array] as PropType<string | number | string[]>,
        default: 'button-1',
    },
    buttons: {
        type: Array as PropType<OptionButton[]>,
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
    styleType: {
        type: String as PropType<
            ButtonStyleType.NEUTRAL_OUTLINED | ButtonStyleType.PRIMARY_BRAND_SOFT
        >,
        default: ButtonStyleType.NEUTRAL_OUTLINED,
        validator: (value: ButtonStyleType.NEUTRAL_OUTLINED | ButtonStyleType.PRIMARY_BRAND_SOFT) =>
            [ButtonStyleType.NEUTRAL_OUTLINED, ButtonStyleType.PRIMARY_BRAND_SOFT].includes(value),
    },
    size: String as PropType<ButtonSize>,
    isRounded: Boolean as PropType<boolean>,
    isMultiple: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasAllButton: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    allButtonText: {
        type: String as PropType<string>,
        default: 'All',
    },
    allButtonValue: {
        type: String as PropType<string>,
        default: 'all',
    },
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Create the dynamic "All" button using user props
const allButton = computed<OptionButton>(() => ({
    text: props.allButtonText,
    value: props.allButtonValue,
    size: props.size,
    action: () => {},
}))

// Computed list of buttons
const displayButtons = computed(() => {
    return props.hasAllButton
        ? [allButton.value, ...props.buttons]
        : props.buttons
})

// Active state logic
const isButtonActive = (button: OptionButton) => {
    if (props.isMultiple) {
        if (button.value === props.allButtonValue) {
            if (!Array.isArray(props.modelValue)) return false
            const selected = props.modelValue
            return selected.length === 0 || selected.length === props.buttons.length
        }

        if (Array.isArray(props.modelValue)) {
            return props.modelValue.includes(button.value)
        }

        return false
    }

    return button.value === props.modelValue
}


// Handlers
const getButtonStyleType = (button: OptionButton) => {
    if(props.styleType === ButtonStyleType.PRIMARY_BRAND_SOFT) {
        return isButtonActive(button) 
        ? ButtonStyleType.PRIMARY_BRAND_FILLED 
        : ButtonStyleType.PRIMARY_BRAND_SOFT
    }

    // Default style for outlined
    return isButtonActive(button) 
        ? ButtonStyleType.PRIMARY_BRAND_SOFT 
        : ButtonStyleType.NEUTRAL_OUTLINED
}

const handleButtonClick = (button: OptionButton) => {
    if (button?.action) {
        button.action()
    }

    const isAllButton = button.value === props.allButtonValue

    // Multiple select with "All" logic
    if (props.isMultiple) {
        if (isAllButton) {
            const allValues = props.buttons.map(b => b.value)
            const selected = props.modelValue as string[]
            const isAllSelected = selected.length === allValues.length
            emit('update:modelValue', isAllSelected ? [] : allValues)
            return
        }

        if (Array.isArray(props.modelValue)) {
            const isActive = props.modelValue.includes(button.value)
            const updated = isActive
                ? props.modelValue.filter(v => v !== button.value)
                : [...props.modelValue, button.value]
            emit('update:modelValue', updated)
        }
    } else {
        // Single-select: treat all buttons the same
        emit('update:modelValue', button.value)
    }
}
</script>
