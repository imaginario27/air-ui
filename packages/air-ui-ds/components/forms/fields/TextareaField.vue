<template>
    <div :class="[ 'flex flex-col', 'w-full', 'gap-2' ]">
        <!-- Label -->
        <label 
            v-if="label"
            :for="id" 
            :class="[ 
                'text-sm',
                'font-semibold',
                'text-left',
                hasError && 'text-text-error'
            ]"
        >
            {{ label }}
        </label>

        <!-- Textarea Container -->
        <div 
            :class="[ 
                'flex gap-2',
                'border',
                'rounded-md',
                'transition-all',
                'p-4',
                'relative',
                minHeightClass,
                hasError ? 'border-border-error text-text-error' : 'border-border-default',
                isFocused && 'ring-2 ring-border-primary-brand-default',
                filled ? 'text-text-default' : 'text-text-neutral-subtler',
            ]"
        >
            <!-- Textarea -->
            <textarea 
                :id
                :placeholder
                :value="modelValue"
                :maxlength="maxLength"
                :readonly
                :autocomplete
                :autofocus
                :wrap
                :spellcheck
                :disabled
                :class="[ 
                    'w-full',
                    'outline-none',
                    'bg-transparent',
                    'text-sm',
                    'resize-none',
                ]"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="handleInput"
            />

            <!-- Error Icon -->
            <span v-if="hasError" class="text-icon-error absolute top-4 right-4">
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
                hasError ? 'text-text-error' : 'text-text-neutral-subtle'
            ]" 
        >
            {{ hasError ? error : helpText }}
        </p>

        <!-- Character Counter -->
        <p v-if="hasCharCounter && maxLength" class="text-xs text-right text-text-neutral-subtle">
            {{ modelValue.length }} / {{ maxLength }}
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
    placeholder: { 
        type: String as PropType<string>, 
        default: 'Placeholder', 
    },
    helpText: String as PropType<string>,
    minHeightClass: {
        type: String as PropType<string>,
        default: 'min-h-[150px]',
    },
    modelValue: { 
        type: String as PropType<string>, 
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
        required: true,
    },
    hasCharCounter: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
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
    wrap: {
        type: String as PropType<'soft' | 'hard'>,
        default: 'soft',
    },
    spellcheck: {
        type: Boolean,
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
const emit = defineEmits(['update:modelValue', 'update:error'])

// Composables
const validationMode = useInjectedValidationMode()

// States
const isFocused = ref(false)

// Computed States
const hasError = computed(() => props.error !== '')
const filled = computed(() => !!props.modelValue.trim())

// Methods
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
    const value = target.value 

    // Emit the updated value to the parent
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
