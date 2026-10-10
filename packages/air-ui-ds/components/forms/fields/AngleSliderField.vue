<template>
    <div
        :class="[
            'flex flex-col',
            'items-start',
            'gap-2',
        ]"
    >
        <label
            v-if="label"
            :id="`${id}-label`"
            :class="[
                'text-sm',
                'font-semibold',
                'text-left',
                hasError && 'text-text-error',
            ]"
        >
            {{ label }}
            <span
                v-if="!required && showOptionalLabel"
                class="font-normal text-text-neutral-subtler"
            >
                {{ optionalLabelText }}
            </span>
        </label>

        <!-- Help Text (top) -->
        <HelpText
            v-if="helpTextPosition === Position.TOP"
            :text="helpText"
            :error="error"
        />

        <AngleSlider
            :modelValue="modelValue"
            :ariaLabel="ariaLabel"
            :ariaLabelledby="label ? `${id}-label` : undefined"
            :color="color"
            :size="size"
            :step="step"
            :isRounded="isRounded"
            :showMarkers="showMarkers"
            :showValue="showValue"
            :valueLabel="valueLabel"
            :disabled="disabled"
            :readOnly="readOnly"
            @update:model-value="handleValueUpdate"
            @change-end="value => emit('change-end', value)"
        />

        <!-- Help Text (bottom) -->
        <HelpText
            v-if="helpTextPosition === Position.BOTTOM"
            :text="helpText"
            :error="error"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    id: {
        type: String as PropType<string>,
        required: true,
    },
    label: String as PropType<string>,
    ariaLabel: String as PropType<string>,
    helpText: String as PropType<string>,
    helpTextPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showOptionalLabel: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    optionalLabel: {
        type: String as PropType<string>,
        default: undefined,
    },
    modelValue: {
        type: Number as PropType<number>,
        default: 0,
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.NEUTRAL,
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    size: {
        type: String as PropType<AngleSliderSize>,
        default: AngleSliderSize.MD,
        validator: (value: AngleSliderSize) => Object.values(AngleSliderSize).includes(value),
    },
    step: {
        type: Number as PropType<number>,
        default: 1,
    },
    isRounded: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showMarkers: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showValue: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    valueLabel: {
        type: String as PropType<string>,
        default: 'degrees',
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    readOnly: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    validator: {
        type: Function as PropType<(value: unknown) => string | null>,
        default: () => null,
    },
    error: {
        type: String as PropType<string>,
        default: '',
    },
})

const emit = defineEmits(['update:modelValue', 'update:error', 'change-end'])

const validationMode = useInjectedValidationMode()
const dsConfig = useDSConfig()

const hasError = computed(() => props.error !== '')
const optionalLabelText = computed(() => props.optionalLabel ?? dsConfig.forms.optionalLabelText())

const runValidation = (value: number) => {
    if (!props.required || !props.validator) {
        return
    }

    const result = props.validator(value)
    emit('update:error', result ?? '')
}

const handleValueUpdate = (value: number) => {
    emit('update:modelValue', value)

    if (validationMode.value === FormValidationMode.BLUR) {
        runValidation(value)
    }
}
</script>
