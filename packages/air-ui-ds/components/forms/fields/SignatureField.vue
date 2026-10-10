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

        <SignaturePad
            ref="padRef"
            :modelValue="modelValue"
            :name="name"
            :ariaLabel="ariaLabel"
            :ariaLabelledby="label ? `${id}-label` : undefined"
            :height="height"
            :minWidth="minWidth"
            :strokeSize="strokeSize"
            :showGuide="showGuide"
            :placeholder="placeholder"
            :showClearButton="showClearButton"
            :clearIcon="clearIcon"
            :clearAriaLabel="clearAriaLabel"
            :hasError="hasError"
            :disabled="disabled"
            :readOnly="readOnly"
            @update:model-value="handleValueUpdate"
            @draw="(payload: unknown) => emit('draw', payload)"
            @draw-end="(payload: unknown) => emit('draw-end', payload)"
            @clear="emit('clear')"
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
        type: Array as PropType<string[]>,
        default: () => [],
    },
    name: String as PropType<string>,
    height: {
        type: Number as PropType<number>,
        default: 200,
    },
    minWidth: {
        type: Number as PropType<number>,
        default: 240,
    },
    strokeSize: {
        type: Number as PropType<number>,
        default: 2,
    },
    showGuide: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    placeholder: {
        type: String as PropType<string>,
        default: 'Sign here',
    },
    showClearButton: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    clearIcon: {
        type: String as PropType<string>,
        default: 'mdi:eraser',
    },
    clearAriaLabel: {
        type: String as PropType<string>,
        default: 'Clear signature',
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

const emit = defineEmits(['update:modelValue', 'update:error', 'draw', 'draw-end', 'clear'])

const validationMode = useInjectedValidationMode()
const dsConfig = useDSConfig()

const padRef = ref<{ clear: () => void, getDataUrl: (type?: string, quality?: number) => string } | null>(null)

const hasError = computed(() => props.error !== '')
const optionalLabelText = computed(() => props.optionalLabel ?? dsConfig.forms.optionalLabelText())

const runValidation = (value: string[]) => {
    if (!props.required || !props.validator) {
        return
    }

    const result = props.validator(value)
    emit('update:error', result ?? '')
}

const handleValueUpdate = (value: string[]) => {
    emit('update:modelValue', value)

    if (validationMode.value === FormValidationMode.BLUR) {
        runValidation(value)
    }
}

defineExpose({
    clear: () => padRef.value?.clear(),
    getDataUrl: (type?: string, quality?: number) => padRef.value?.getDataUrl(type, quality) ?? '',
})
</script>
