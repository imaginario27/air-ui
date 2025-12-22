<template>
    <div :class="['flex flex-col', 'w-full', 'gap-2']">
        <div class="w-full flex gap-2 justify-between">
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
            <NavLink 
                v-if="linkText"
                :text="linkText"
                :to="linkUrl"
                textClass="font-normal"
            />
        </div>

        <!-- Input Container -->
        <div
            :class="[
                'flex gap-2',
                'items-center',
                'border',
                'rounded-md',
                'transition-all',
                icon ? 'pl-3' : 'pl-4',
                suffixIcon ? 'pr-3' : 'pr-4',
                inputSizeClass,
                type === 'color' && 'w-fit',
                hasError ? 'border-border-error text-text-error' : 'border-border-default',
                isFocused && 'ring-2 ring-border-primary-brand-default',
                filled ? 'text-text-default' : 'text-text-neutral-subtler',
                disabled ? 'bg-background-neutral-disabled' : 'bg-neutral-white',
                disabled && 'cursor-not-allowed',
            ]"
        >
            <!-- Icon -->
            <span
                v-if="icon"
                class="text-icon-neutral-subtler"
            >
                <MdiIcon
                    :icon="icon"
                    size="20"
                    preserveAspectRatio="xMidYMid meet"
                />
            </span>

            <!-- Input -->
            <input
                :id
                :type="props.type === 'password' ? passwordInputType : props.type"
                :placeholder
                :value="modelValue"
                :maxlength="maxLength"
                :readonly
                :autocomplete
                :autofocus
                :disabled
                :class="[
                    'w-full',
                    'outline-none',
                    'bg-transparent',
                    'text-sm',
                    type === 'color' && '!w-[40px] rounded-full border-0 hover:cursor-pointer',
                    disabled && 'cursor-not-allowed',
                ]"
                v-bind="{
                    ...dynamicProps,
                }"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="handleInput"
            >

            <!-- Color info -->
            <span 
                v-if="type === 'color'"
                class="text-sm"
            >
                {{ modelValue }}
            </span>

            <!-- Suffix Icon (clickable) -->
            <button
                v-if="suffixIcon"
                type="button"
                :class="[
                    'text-icon-default',
                    'hover:text-icon-neutral-subtle',
                    'focus:outline-none',
                    'transition-colors',
                    'cursor-pointer',
                ]"
                @click="handleSuffixClick"
            >
                <MdiIcon
                    :icon="suffixIcon"
                    size="20"
                    preserveAspectRatio="xMidYMid meet"
                />
            </button>

            <!-- Show / Hide password -->
            <button
                v-if="!suffixIcon && type === 'password' && hasShowPasswordButton"
                type="button"
                :class="[
                    'text-icon-default',
                    'hover:text-icon-neutral-subtle',
                    'focus:outline-none',
                    'transition-colors',
                    'cursor-pointer',
                ]"
                @click="() => showPassword = !showPassword"
            >
                <MdiIcon
                    :icon="showPassword ? 'mdiEyeOffOutline' : 'mdiEyeOutline'"
                    size="20"
                    preserveAspectRatio="xMidYMid meet"
                />
            </button>

            <!-- Error Icon -->
            <span
                v-if="hasError && !suffixIcon"
                class="text-icon-error"
            >
                <MdiIcon
                    icon="mdiAlertCircle"
                    size="20"
                    preserveAspectRatio="xMidYMid meet"
                />
            </span>
        </div>

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
    type: {
        type: String as PropType<AllowedInputType>,
        default: 'text',
    },
    placeholder: {
        type: String as PropType<string>,
        default: 'Placeholder',
    },
    helpText: String as PropType<string>,
    icon: String as PropType<any>,
    suffixIcon: String as PropType<any>,
    linkText: String as PropType<string>,
    linkUrl: String as PropType<string>,       
    size: {
        type: String as PropType<InputSize>,
        default: InputSize.MD,
        validator: (value: InputSize) => Object.values(InputSize).includes(value),
    },
    modelValue: {
        type: [String, Number, null] as PropType<string | number | null>,
        default: '',
    },
    validator: {
        type: Function as PropType<(value: unknown) => string | null>,
        default: () => null,
    },
    error: {
        type: String as PropType<string>,
        default: '',
    },
    maxLength: {
        type: Number as PropType<number>,
        required: false,
    },
    filterAlphabetic: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    permitNegativeNumber: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    hasShowPasswordButton: {
        type: Boolean as PropType<boolean>,
        default: true,
    }, 
    min: String as PropType<string>,
    max: String as PropType<string>,
    step: String as PropType<string>,
    pattern: String as PropType<string>,
    readonly: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    autocomplete: {
        type: String as PropType<string>,
        default: 'off',
    },
    autofocus: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'update:error', 'click:suffix'])

// States
const isFocused = ref(false)
const showPassword = ref(false)

// Composables
const validationMode = useInjectedValidationMode()

// Computed States
const hasError = computed(() => props.error !== '')
const filled = computed(() => {
    if (typeof props.modelValue === 'string') {
        return props.modelValue.trim().length > 0
    }
    if (typeof props.modelValue === 'number') {
        return true
    }
    return false
})

const passwordInputType = computed(() => {
    if (props.type !== 'password') return props.type
    return showPassword.value ? 'text' : 'password'
})

// Computed classes
const inputSizeClass = computed(() => {
    const sizeVariant = {
        [InputSize.MD]: 'h-[36px]',
        [InputSize.LG]: 'h-[44px]',
    }
    return sizeVariant[props.size as InputSize] || 'h-[36px]'
})

// Handlers
const handleFocus = () => {
    isFocused.value = true
}

const handleBlur = () => {
    isFocused.value = false

    if (validationMode.value === FormValidationMode.BLUR) {
        runValidation()
    }
}

const handleInput = (event: Event) => {
    if (props.disabled) return

    const target = event.target as HTMLInputElement
    let value = target.value

    // Apply filtering + autoformatting for phone type field
    if (props.pattern && props.type === 'tel') {
        // Remove all non-digit characters
        const rawValue = value.replace(/\D/g, '').slice(0, 10)

        // Autoformat: XXX-XXX-XXXX
        if (rawValue.length <= 3) {
            value = rawValue
        } else if (rawValue.length <= 6) {
            value = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`
        } else {
            value = `${rawValue.slice(0, 3)}-${rawValue.slice(3, 6)}-${rawValue.slice(6, 10)}`
        }
    }

    // Apply optional filtering
    if (props.filterAlphabetic) {
        value = filterAlphabetic(value)
        target.value = value
    }

    // Enforce non-negative numbers if applicable
    if (props.type === 'number') {
        let numericValue = Number.parseFloat(value)

        // Handle invalid number input (e.g. empty or non-numeric)
        if (Number.isNaN(numericValue)) {
            numericValue = 0
        }

        // Enforce min/max manually if provided
        const min = props.min === undefined ? undefined : Number.parseFloat(props.min)
        const max = props.max === undefined ? undefined : Number.parseFloat(props.max)

        if (!Number.isNaN(numericValue)) {
            if (min !== undefined && numericValue < min) {
                numericValue = min
            }

            if (max !== undefined && numericValue > max) {
                numericValue = max
            }

            value = numericValue.toString()
            target.value = value
        }

        // Prevent negative numbers if not permitted
        if (!props.permitNegativeNumber && numericValue < 0) {
            value = '0'
            target.value = value
        }
    }

    // Emit the updated value to the parent
    emit('update:modelValue', value)
}

const handleSuffixClick = () => {
    emit('click:suffix')
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
        if (validationMode.value === FormValidationMode.BLUR && props.validator) {
            const result = props.validator(value)
            emit('update:error', result ?? '')
        }
    }
)

// Props for the dynamic component
const dynamicProps = computed(() => {
    const specificFields = [
        'number',
        'date',
        'datetime-local',
        'time',
        'month',
        'week'
    ]

    if(specificFields.includes(props.type)) {
        return {
            type: props.type,
            placeholder: props.placeholder,
            min: props.min,
            max: props.max,
            step: props.step,
            pattern: props.pattern,
        }
    } else if(props.type === 'tel') {
        return {
            pattern: props.pattern,
        }
    } else {
        return {}
    }
})
</script>
