<template>
    <div
        :class="[
            'flex flex-col',
            'w-full',
            'gap-2',
        ]"
    >
        <div
            v-if="label"
            class="flex items-center justify-between gap-2"
        >
            <label
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

            <span class="text-xs font-semibold text-text-neutral-subtle">
                {{ currentValueText }}
            </span>
        </div>

        <div
            v-if="showInputs && inputPosition === Position.TOP"
            class="grid grid-cols-1 gap-2 sm:grid-cols-2"
        >
            <InputField
                v-if="isRange"
                :id="`${id}-min-input`"
                :modelValue="rangeStartInput"
                type="number"
                :step="stepString"
                :min="minString"
                :max="maxString"
                :disabled="disabled"
                :label="showInputsLabel ? (minText.trim() || 'Min') : ''"
                @update:model-value="value => handleRangeInputChange(0, value)"
            />

            <InputField
                v-if="isRange"
                :id="`${id}-max-input`"
                :modelValue="rangeEndInput"
                type="number"
                :step="stepString"
                :min="minString"
                :max="maxString"
                :disabled="disabled"
                :label="showInputsLabel ? (maxText.trim() || 'Max') : ''"
                @update:model-value="value => handleRangeInputChange(1, value)"
            />

            <InputField
                v-else
                :id="`${id}-value-input`"
                :modelValue="singleInput"
                type="number"
                :step="stepString"
                :min="minString"
                :max="maxString"
                :disabled="disabled"
                :label="showInputsLabel ? (label || 'Value') : ''"
                @update:model-value="handleSingleInputChange"
            />
        </div>

        <Slider
            :modelValue="modelValue"
            :type="type"
            :color="color"
            :size="size"
            :step="step"
            :min="min"
            :max="max"
            :multiple="multiple"
            :orientation="orientation"
            :hasTooltip="hasTooltip"
            :disabled="disabled"
            :borderRadius="borderRadius"
            @update:model-value="handleValueUpdate"
        />

        <div
            v-if="showInputs && inputPosition === Position.BOTTOM"
            class="grid grid-cols-1 gap-2 sm:grid-cols-2"
        >
            <InputField
                v-if="isRange"
                :id="`${id}-min-input-bottom`"
                :modelValue="rangeStartInput"
                type="number"
                :step="stepString"
                :min="minString"
                :max="maxString"
                :disabled="disabled"
                :label="showInputsLabel ? (minText.trim() || 'Min') : ''"
                @update:model-value="value => handleRangeInputChange(0, value)"
            />

            <InputField
                v-if="isRange"
                :id="`${id}-max-input-bottom`"
                :modelValue="rangeEndInput"
                type="number"
                :step="stepString"
                :min="minString"
                :max="maxString"
                :disabled="disabled"
                :label="showInputsLabel ? (maxText.trim() || 'Max') : ''"
                @update:model-value="value => handleRangeInputChange(1, value)"
            />

            <InputField
                v-else
                :id="`${id}-value-input-bottom`"
                :modelValue="singleInput"
                type="number"
                :step="stepString"
                :min="minString"
                :max="maxString"
                :disabled="disabled"
                :label="showInputsLabel ? (label || 'Value') : ''"
                @update:model-value="handleSingleInputChange"
            />
        </div>

        <div class="flex items-center justify-between text-xs text-text-neutral-subtle">
            <span>{{ minText }}{{ formatValue(min) }}</span>
            <span>{{ maxText }}{{ formatValue(max) }}</span>
        </div>

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
import { SliderSize } from '@/models/enums/sliders'

const props = defineProps({
    id: {
        type: String as PropType<string>,
        required: true,
    },
    label: String as PropType<string>,
    helpText: String as PropType<string>,
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    modelValue: {
        type: [Number, Array] as PropType<number | [number, number]>,
        default: 0,
    },
    type: {
        type: String as PropType<SliderType>,
        default: SliderType.SINGLE,
        validator: (value: SliderType) => Object.values(SliderType).includes(value),
    },
    color: {
        type: String as PropType<ColorAccent>,
        default: ColorAccent.NEUTRAL,
        validator: (value: ColorAccent) => Object.values(ColorAccent).includes(value),
    },
    size: {
        type: String as PropType<SliderSize>,
        default: SliderSize.MD,
        validator: (value: SliderSize) => Object.values(SliderSize).includes(value),
    },
    step: {
        type: Number as PropType<number>,
        default: 1,
    },
    min: {
        type: Number as PropType<number>,
        default: 0,
    },
    max: {
        type: Number as PropType<number>,
        default: 100,
    },
    multiple: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    orientation: {
        type: String as PropType<Orientation>,
        default: Orientation.HORIZONTAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value),
    },
    hasTooltip: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showInputs: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    showInputsLabel: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    inputPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    borderRadius: Number as PropType<number | undefined>,
    minText: {
        type: String as PropType<string>,
        default: 'Min: ',
    },
    maxText: {
        type: String as PropType<string>,
        default: 'Max: ',
    },
    currentValuePrefix: String as PropType<string>,
    currentValueSuffix: String as PropType<string>,
    validator: {
        type: Function as PropType<(value: unknown) => string | null>,
        default: () => null,
    },
    error: {
        type: String as PropType<string>,
        default: '',
    },
})

const emit = defineEmits(['update:modelValue', 'update:error'])

const validationMode = useInjectedValidationMode()

const hasError = computed(() => props.error !== '')

const isRange = computed(() => {
    return props.type === SliderType.RANGE || props.multiple || Array.isArray(props.modelValue)
})

const minString = computed(() => String(props.min))
const maxString = computed(() => String(props.max))
const stepString = computed(() => String(props.step))

const normalizedRange = computed<[number, number]>(() => {
    if (!Array.isArray(props.modelValue)) {
        return [props.min, props.max]
    }

    const [start = props.min, end = props.max] = props.modelValue
    return [Math.min(start, end), Math.max(start, end)]
})

const rangeStartInput = computed(() => normalizedRange.value[0])
const rangeEndInput = computed(() => normalizedRange.value[1])
const singleInput = computed(() => {
    return Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue
})

const formatValue = (value: number) => {
    return `${props.currentValuePrefix ?? ''}${value}${props.currentValueSuffix ?? ''}`
}

const currentValueText = computed(() => {
    if (Array.isArray(props.modelValue)) {
        const [start = props.min, end = props.max] = props.modelValue
        return `${formatValue(start)} - ${formatValue(end)}`
    }

    return formatValue(props.modelValue)
})

const runValidation = (value: number | [number, number]) => {
    if (!props.required || !props.validator) {
        return
    }

    const result = props.validator(value)
    emit('update:error', result ?? '')
}

const clampValue = (value: number) => {
    return Math.min(Math.max(value, props.min), props.max)
}

const parseNumeric = (value: unknown) => {
    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : null
    }

    if (typeof value === 'string') {
        const trimmed = value.trim()
        if (trimmed === '') {
            return null
        }

        const parsed = Number(trimmed)
        return Number.isFinite(parsed) ? parsed : null
    }

    return null
}

const handleSingleInputChange = (value: unknown) => {
    const parsed = parseNumeric(value)
    if (parsed === null) {
        return
    }

    handleValueUpdate(clampValue(parsed))
}

const handleRangeInputChange = (index: 0 | 1, value: unknown) => {
    const parsed = parseNumeric(value)
    if (parsed === null) {
        return
    }

    const next = [...normalizedRange.value] as [number, number]
    next[index] = clampValue(parsed)

    if (next[0] > next[1]) {
        if (index === 0) {
            next[1] = next[0]
        } else {
            next[0] = next[1]
        }
    }

    handleValueUpdate(next)
}

const handleValueUpdate = (value: number | [number, number]) => {
    emit('update:modelValue', value)

    if (validationMode.value === FormValidationMode.BLUR) {
        runValidation(value)
    }
}

watch(
    () => props.modelValue,
    value => {
        if (validationMode.value === FormValidationMode.BLUR) {
            runValidation(value as number | [number, number])
        }
    }
)
</script>
