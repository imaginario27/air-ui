<template>
    <div class="w-full flex flex-col gap-2">
        <!-- Label -->
        <div 
            v-if="label"
            :class="[ 
                'text-sm', 
                'font-semibold', 
                'text-left',
                hasError ? 'text-text-error' : undefined  
            ]"
        >
            {{ label }}
        </div>
        <div 
            :class="[
                orientation === Orientation.VERTICAL 
                    ? 'flex flex-col gap-4' 
                    : [
                        'w-full',
                        'grid gap-4',
                        'grid-cols-1',
                        'sm:grid-cols-2',
                    ]
            ]"
        >
            <template v-if="type === RadioType.DEFAULT">
                <RadioField
                    v-for="option in options" 
                    :id="option.id.toString()"
                    :key="option.id"
                    v-model="selectedOption" 
                    :name
                    :value="option.value"
                    :label="option.label"
                    :ariaLabel="option.ariaLabel"
                    :required
                    :disabled="option.disabled ? option.disabled : disabled"
                    :helpText="option.helpText"
                    :inverse="inverse"
                />
            </template>
            
            <template v-if="type === RadioType.BUTTON">
                <RadioButtonField
                    v-for="option in options" 
                    :id="option.id.toString()"
                    :key="option.id"
                    v-model="selectedOption" 
                    :name
                    :value="option.value"
                    :label="option.label"
                    :ariaLabel="option.ariaLabel"
                    :required
                    :helpText="option.helpText"
                    :disabled="option.disabled ? option.disabled : disabled"
                    :type="option.type"
                    :icon="option.icon"
                />
            </template>
        </div>

        <!-- Help Text or Error Message -->
        <p
            v-if="hasError || helpText"
            :class="[ 
                'text-xs text-left', 
                hasError ? 'text-text-error' : 'text-text-neutral-subtle' 
            ]" 
        >
            {{ hasError ? error : helpText }}
        </p>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    label: String,
    name: {
        type: String as PropType<string>,
        required: true,
    },
    options: {
        type: Array as PropType<RadioOption[]>,
        required: true,
        validator: (value: RadioOption[]) =>
            value.every((option) => option.id !== undefined && option.value !== undefined && (option.label !== undefined || option.ariaLabel !== undefined)),
    },
    modelValue: {
        type: [String, Number, Boolean, null] as PropType<string | number | boolean | null>,
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
    type: {
        type: String as PropType<RadioType>,
        default: RadioType.DEFAULT,
        validator: (value: RadioType) => Object.values(RadioType).includes(value),
    },
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    helpText: String as PropType<string>,
    inverse: { // Sets the radio button on the right side of the text
        type: Boolean as PropType<boolean>,
        default: false,
    },
    orientation: {
        type: String as PropType<Orientation>,
        default: Orientation.VERTICAL,
        validator: (value: Orientation) => Object.values(Orientation).includes(value),
    },
})

// States
const hasError = computed(() => props.error !== '')
const selectedOption = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
        runValidation()
    },
})

// Composables
const validationMode = useInjectedValidationMode()

// Emits
const emit = defineEmits(['update:modelValue', 'update:error'])

// Methods
const runValidation = () => {
    if (!props.required || !props.validator || validationMode.value !== FormValidationMode.BLUR) return

    const result = props.validator(props.modelValue)

    emit('update:error', result ?? '')
}

// Watchers
// Watch for changes in local selectedOption and emit upward
watch(
    selectedOption,
    () => {
        runValidation()
    },
)
</script>
