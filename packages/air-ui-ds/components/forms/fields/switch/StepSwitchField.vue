<template>
    <div
        :class="[
            'flex flex-col',
            'w-full',
            'gap-2',
        ]"
    >
        <!-- Legend -->
        <legend
            v-if="legend"
            :class="[
                'text-sm',
                'font-semibold',
                'text-left',
            ]"
        >
            {{ legend }}
            <span
                v-if="!required && showOptionalLabel"
                class="font-normal text-text-neutral-subtler"
            >
                {{ optionalLabelText }}
            </span>
        </legend>

        <!-- Main wrapper -->
        <div
            :class="[
                'flex items-center gap-3',
                ($slots.label || label) || icon ? 'justify-between' : 'justify-end',
                fitToContent && 'w-max',
                'text-sm w-full',
                hasError ? 'text-text-error' : 'text-text-default',
                checkboxWrapperClass && checkboxWrapperClass
            ]"
        >
            <!-- Label + Icon block (only if present) -->
            <div
                v-if="$slots.label || label || icon"
                class="flex gap-2.5 w-full"
            >
                <!-- Icon -->
                <Icon
                    v-if="icon"
                    :name="icon"
                    :iconClass="iconSizeClass"
                />

                <!-- Label -->
                <label
                    v-if="$slots.label || label"
                    :for="id"
                    :class="[
                        disabled && 'text-text-neutral-disabled',
                        labelSizeClass,
                        labelClass && labelClass
                    ]"
                >
                    <slot name="label">{{ label }}</slot>
                </label>
            </div>

            <StepSwitch
                :id
                :ariaLabel="ariaLabel || label || legend || 'Select step'"
                :modelValue
                :steps
                :maxSteps
                :disabled
                :size
                :styleType
                @update:modelValue="handleSwitchUpdate"
            />
        </div>

        <!-- Help Text -->
        <HelpText :text="helpText" :error="error" />
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
    ariaLabel: String as PropType<string>,
    legend: String as PropType<string>,
    helpText: String as PropType<string>,
    modelValue: {
        type: [String, Number] as PropType<string | number>,
        default: undefined,
    },
    steps: {
        type: Array as PropType<StepSwitchOption[]>,
        default: () => [],
    },
    maxSteps: {
        type: Number as PropType<number>,
        default: 5,
    },
    validator: {
        type: Function as PropType<(value: string | number | undefined) => string | null>,
        default: () => null,
    },
    error: {
        type: String as PropType<string>,
        default: '',
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
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    size: {
        type: String as PropType<ControlFieldSize>,
        default: ControlFieldSize.MD,
        validator: (value: ControlFieldSize) => Object.values(ControlFieldSize).includes(value),
    },
    icon: String as PropType<string>,
    styleType: {
        type: String as PropType<SwitchStyle>,
        default: SwitchStyle.BRAND,
        validator: (value: SwitchStyle) => Object.values(SwitchStyle).includes(value),
    },
    fitToContent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    checkboxWrapperClass: String as PropType<string>,
    labelClass: String as PropType<string>,
})

// Emits
const emit = defineEmits(['update:modelValue', 'update:error'])

// Composables
const validationMode = useInjectedValidationMode()
const dsConfig = useDSConfig()

// Computed
const hasError = computed(() => props.error !== '')
const optionalLabelText = computed(() => props.optionalLabel ?? dsConfig.forms.optionalLabelText())

// Computed classes
const labelSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: 'text-xs',
        [ControlFieldSize.SM]: 'text-xs',
        [ControlFieldSize.MD]: 'text-sm',
        [ControlFieldSize.LG]: 'text-base',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'text-sm'
})

const iconSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: 'w-[16px] h-[16px] min-w-[16px] min-h-[16px]',
        [ControlFieldSize.SM]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        [ControlFieldSize.MD]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        [ControlFieldSize.LG]: 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]'
})

// Handlers
const handleSwitchUpdate = (value: string | number) => {
    if (props.disabled) return

    if (validationMode.value === FormValidationMode.BLUR) {
        runValidation()
    }

    emit('update:modelValue', value)
}

const runValidation = () => {
    if (!props.required || !props.validator) return

    const result = props.validator(props.modelValue)

    emit('update:error', result ?? '')
}

// Watchers
watch(
    () => props.modelValue,
    value => {
        if (validationMode.value === FormValidationMode.BLUR && props.validator && props.required) {
            const result = props.validator(value)
            emit('update:error', result ?? '')
        }
    }
)
</script>
