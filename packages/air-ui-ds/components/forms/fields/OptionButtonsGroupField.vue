<template>
    <div 
        :class="[ 
            'flex flex-col', 
            'w-full', 
            'gap-2' 
        ]"
    >
        <!-- Label -->
        <label
            v-if="label"
            :for="id"
            :class="[
                'text-sm',
                'font-semibold',
                'text-left',
                hasError && 'text-text-error',
            ]"
        >
            {{ label }}
        </label>

        <OptionButtonGroup 
            :buttons
            :modelValue
            :disabled
            :styleType="buttonStyle"
            :size="buttonSize"
            :isRounded
            :isMultiple
            :hasAllButton
            :allButtonText
            :allButtonValue
            @update:modelValue="emit('update:modelValue', $event)"
        />

        <!-- Help Text -->
        <p
            v-if="hasError || helpText"
            :class="[
                'text-xs text-left',
                hasError ? 'text-text-error' : 'text-text-neutral-subtle',
            ]"
        >
            {{ hasError ? error : helpText }}
        </p>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    id: { 
        type: String as PropType<string>, 
        required: true,
    },
    label: String as PropType<string>,
    helpText: String as PropType<string>,
    buttons: Array as PropType<ToggleButton[]>,
    modelValue: {
        type: [String, Array] as PropType<string | string[]>,
        required: true,
    },  
    validator: {
        type: Function as PropType<(value: unknown) => string | null>,
        default: () => null,
    },
    error: {
        type: String as PropType<string>,
        default: '',
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },   
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },   
    buttonStyle: {
        type: String as PropType<
            ButtonStyleType.NEUTRAL_OUTLINED | ButtonStyleType.PRIMARY_BRAND_SOFT
        >,
        default: ButtonStyleType.NEUTRAL_OUTLINED,
        validator: (value: ButtonStyleType.NEUTRAL_OUTLINED | ButtonStyleType.PRIMARY_BRAND_SOFT) =>
            [ButtonStyleType.NEUTRAL_OUTLINED, ButtonStyleType.PRIMARY_BRAND_SOFT].includes(value),
    },
    buttonSize: String as PropType<ButtonSize>,
    isRounded: Boolean as PropType<boolean>,
    isMultiple: Boolean as PropType<boolean>,
    hasAllButton: Boolean as PropType<boolean>,
    allButtonText: String as PropType<string>,
    allButtonValue: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue', 'update:error'])

// Composables
const validationMode = useInjectedValidationMode()

// Computed States
const hasError = computed(() => props.error !== '')

// Methods
const runValidation = () => {
    if (!props.required || !props.validator) return

    const result = props.validator(props.modelValue)

    emit('update:error', result ?? '')
}

// Watchers
watch(() => props.modelValue, () => {
    if (validationMode.value === FormValidationMode.BLUR) {
        runValidation()
    }
})
</script>
