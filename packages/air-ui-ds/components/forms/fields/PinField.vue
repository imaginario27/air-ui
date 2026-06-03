<template>
    <div :class="['flex flex-col', 'gap-2']">
        <!-- Label -->
        <label
            v-if="label"
            :for="id"
            :class="[
                'text-sm',
                'font-semibold',
                hasError && 'text-text-error',
            ]"
        >
            {{ label }}
        </label>

        <!-- Inputs -->
        <div
            :id
            :class="[
                'flex',
                fieldsGapClass,
                hasError && 'text-text-error',
            ]"
        >
            <input
                v-for="(value, index) in values"
                :key="index"
                :ref="el => setInputRef(el, index)"
                type="text"
                :aria-label="getInputAriaLabel(index)"
                :inputmode="type === 'number' ? 'numeric' : 'text'"
                maxlength="1"
                :value="displayValue(value)"
                :disabled
                :placeholder
                :autocomplete="otp && index === 0 ? 'one-time-code' : 'off'"
                :class="[
                    inputSizeClass,
                    'text-center text-sm',
                    'border rounded-md',
                    'outline-none',
                    'transition-all',
                    'placeholder-text-neutral-subtler',
                    hasError
                        ? 'border-border-error'
                        : 'border-border-default',
                    focusedIndex === index && 'ring-2 focus-within:ring-inset focus-within:ring-border-primary-brand-default',
                    disabled
                        ? 'bg-background-neutral-disabled cursor-not-allowed'
                        : 'bg-neutral-white',
                ]"
                @focus="handleFocus(index)"
                @blur="handleBlur"
                @input="onInput($event, index)"
                @keydown.backspace="onBackspace($event, index)"
            >
        </div>

        <!-- Help / Error -->
        <p
            v-if="hasError || helpText"
            :class="[
                'text-xs',
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
    modelValue: {
        type: String as PropType<string>,
        default: '',
    },
    type: {
        type: String as PropType<'string' | 'number'>,
        default: 'string',
    },
    length: {
        type: Number as PropType<number>,
        default: 4,
    },
    size: {
        type: String as PropType<InputSize>,
        default: InputSize.MD,
        validator: (value: InputSize) => Object.values(InputSize).includes(value),
    },
    label: String as PropType<string>,
    ariaLabel: String as PropType<string>,
    placeholder: String as PropType<string>,
    helpText: String as PropType<string>,
    mask: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    maskCharacter: {
        type: String as PropType<string>,
        default: '•',
    },
    uppercase: {
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
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    autofocus: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    otp: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'update:error'])

// Refs
const inputs = ref<HTMLInputElement[]>([])

// State
const values = ref<string[]>(Array.from({ length: props.length }, () => ''))
const focusedIndex = ref<number | null>(null)

// Composables
const validationMode = useInjectedValidationMode()

// Computed
const hasError = computed(() => props.error !== '')

// Computed classes
const inputSizeClass = computed(() => {
    const sizeVariant = {
        [InputSize.MD]: 'w-[36px] h-[36px]',
        [InputSize.LG]: 'w-[44px] h-[44px]',
    }

    return sizeVariant[props.size as InputSize] || 'w-[36px] h-[36px]'
})

const fieldsGapClass = computed(() => {
    const sizeVariant = {
        [InputSize.MD]: 'gap-2',
        [InputSize.LG]: 'gap-3',
    }

    return sizeVariant[props.size as InputSize] || 'gap-2'
})

// Sync v-model → inputs
watch(
    () => props.modelValue,
    value => {
        const chars = value.split('').slice(0, props.length)

        values.value = Array.from(
            { length: props.length },
            (_, i) => chars[i] ?? '',
        )
    },
    { immediate: true },
)

// Handlers
const handleFocus = (index: number) => {
    focusedIndex.value = index
}

const handleBlur = () => {
    focusedIndex.value = null

    if (validationMode.value === FormValidationMode.BLUR) {
        runValidation()
    }
}

const onInput = (event: Event, index: number) => {
    if (props.disabled) return

    const target = event.target as HTMLInputElement
    const value = target.value

    // OTP autofill / paste
    if (props.otp && value.length > 1) {
        const chars = value
            .slice(0, props.length)
            .split('')
            .map(char => {
                let result = char

                if (props.type === 'number') {
                    result = result.replace(/\D/g, '')
                }

                if (props.uppercase) {
                    result = result.toUpperCase()
                }

                return result
            })

        values.value = Array.from(
            { length: props.length },
            (_, i) => chars[i] ?? '',
        )

        emit('update:modelValue', values.value.join(''))

        nextTick(() => {
            inputs.value[Math.min(chars.length, props.length) - 1]?.focus()
        })

        return
    }

    let char = value.slice(-1)

    if (props.type === 'number') {
        char = char.replace(/\D/g, '')
    }

    if (props.uppercase) {
        char = char.toUpperCase()
    }

    values.value[index] = char
    target.value = displayValue(char)

    emit('update:modelValue', values.value.join(''))

    if (char && index < props.length - 1) {
        inputs.value[index + 1]?.focus()
    }
}

const onBackspace = (_event: KeyboardEvent, index: number) => {
    if (values.value[index]) {
        values.value[index] = ''
        emit('update:modelValue', values.value.join(''))
        return
    }

    if (index > 0) {
        inputs.value[index - 1]?.focus()
    }
}

const displayValue = (value: string) => {
    if (!value) return ''

    if (props.mask) {
        return props.maskCharacter
    }

    if (props.uppercase) {
        return value.toUpperCase()
    }

    return value
}

const getInputAriaLabel = (index: number) => {
    const baseLabel = props.label || props.ariaLabel || 'PIN code'
    return `${baseLabel} ${index + 1}`
}

const setInputRef = (el: Element | ComponentPublicInstance | null, index: number) => {
    if (!el) return
    inputs.value[index] = el as HTMLInputElement
}

const focusFirst = () => {
    if (!import.meta.client || props.disabled) return

    nextTick(() => {
        requestAnimationFrame(() => {
            inputs.value[0]?.focus()
        })
    })
}

// Validation
const runValidation = () => {
    if (!props.required || !props.validator) return

    const result = props.validator(values.value.join(''))
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
    },
)

watch(
    () => props.length,
    newLength => {
        const current = values.value.join('')

        values.value = Array.from(
            { length: newLength },
            (_, i) => current[i] ?? '',
        )

        emit('update:modelValue', values.value.join(''))
    },
)

onMounted(() => {
    if (props.autofocus) {
        focusFirst()
    }
})

watch(
    () => props.autofocus,
    enabled => {
        if (!enabled) return
        focusFirst()
    },
    { flush: 'post' },
)
</script>
