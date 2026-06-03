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
            <button
                v-if="showClearButton"
                type="button"
                class="text-sm font-medium text-text-neutral-subtle hover:text-text-default transition-colors"
                @click="handleClear"
            >
                {{ clearText }}
            </button>
        </div>

        <!-- Input Container -->
        <div
            :class="[
                'flex gap-2 w-full',
                'border',
                'rounded-md',
                'transition-all',
                'text-text-default',
                'min-h-[36px]',
                icon ? 'pl-3' : 'pl-4',
                hasError ? 'pr-3' : 'pr-4',
                hasError ? 'border-border-error text-text-error' : 'border-border-default',
                isFocused && 'ring-2 focus-within:ring-inset focus-within:ring-border-primary-brand-default',
                disabled ? 'bg-background-neutral-disabled' : 'bg-neutral-white',
                disabled && 'cursor-not-allowed',
            ]"
        >
            <!-- Icon -->
            <span v-if="icon" class="mt-1.75">
                <Icon
                    :name="icon"
                    iconClass="text-icon-neutral-subtler"
                />
            </span>

            <!-- Tags -->
            <div class="flex flex-wrap w-full items-center gap-2 py-1.5">
                <Badge
                    v-for="tag in modelValue"
                    :key="tag"
                    :text="tag"
                    :closeable="!disabled"
                    :class="badgeContainerClass"
                    @close="handleBadgeRemove(tag)"
                />

                <input
                    :id
                    ref="inputRef"
                    type="text"
                    :aria-label="!label ? ariaLabel : undefined"
                    :value="inputValue"
                    :placeholder="computedPlaceholder"
                    :autofocus
                    :disabled="disabled || isMaxTagsReached"
                    :class="[
                        'flex-1',
                        'min-w-16',
                        'self-center',
                        'outline-none',
                        'bg-transparent',
                        'text-sm',
                        'placeholder-text-neutral-subtler',
                        (disabled || isMaxTagsReached) && 'cursor-not-allowed',
                    ]"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @input="handleInput"
                    @keydown="handleKeydown"
                >
            </div>

            <!-- Error Icon -->
            <span class="mt-1.75">
                <Icon
                    v-if="hasError"
                    name="mdi:alert-circle-outline"
                    iconClass="text-icon-error"
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
    ariaLabel: String as PropType<string>,
    placeholder: {
        type: String as PropType<string>,
        default: 'Enter values separated by commas',
    },
    clearText: {
        type: String as PropType<string>,
        default: 'Clear',
    },
    helpText: String as PropType<string>,
    icon: String as PropType<string>,    
    modelValue: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    validator: {
        type: Function as PropType<(value: string[]) => string | null>,
        default: () => null,
    },
    error: {
        type: String as PropType<string>,
        default: '',
    },
    maxTags: Number as PropType<number>,
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
const emit = defineEmits(['update:modelValue', 'update:error'])

// States
const isFocused = ref(false)
const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

// Composables
const validationMode = useInjectedValidationMode()

// Computed States
const hasError = computed(() => props.error !== '')
const isMaxTagsReached = computed(() => Number.isFinite(props.maxTags) && props.modelValue.length >= (props.maxTags as number))
const showClearButton = computed(() => !props.disabled && (props.modelValue.length > 0 || inputValue.value.trim().length > 0))

const computedPlaceholder = computed(() => {
    if (props.modelValue.length > 0) return undefined

    if (isMaxTagsReached.value) {
        return `Maximum of ${props.maxTags} tags reached`
    }

    return props.placeholder
})

const badgeContainerClass = computed(() => {
    const baseClasses = 'border-border-default'

    if (props.disabled) {
        return `border-border-neutral-on-disabled-bg cursor-not-allowed`
    }

    return baseClasses
})

// Methods
const updateTags = (tags: string[]) => {
    emit('update:modelValue', tags)
}

const addTagsFromRawValue = (rawValue: string) => {
    const candidates = rawValue
        .split(/[\n,]/)
        .map(value => value.trim())
        .filter(Boolean)

    if (!candidates.length) return

    const uniqueTags = new Set(props.modelValue)

    for (const candidate of candidates) {
        if (isMaxTagsReached.value || (props.maxTags && uniqueTags.size >= props.maxTags)) {
            break
        }

        uniqueTags.add(candidate)
    }

    updateTags(Array.from(uniqueTags))
    inputValue.value = ''
}

const handleFocus = () => {
    isFocused.value = true
}

const handleBlur = () => {
    isFocused.value = false
    addTagsFromRawValue(inputValue.value)

    if (validationMode.value === FormValidationMode.BLUR) {
        runValidation()
    }
}

const handleInput = (event: Event) => {
    if (props.disabled || isMaxTagsReached.value) return

    const target = event.target as HTMLInputElement
    inputValue.value = target.value
}

const handleKeydown = (event: KeyboardEvent) => {
    if (props.disabled) return

    if (event.key === 'Enter' || event.key === ',') {
        event.preventDefault()
        addTagsFromRawValue(inputValue.value)
        return
    }

    if (event.key === 'Backspace' && inputValue.value.trim() === '' && props.modelValue.length > 0) {
        const updatedTags = props.modelValue.slice(0, -1)
        updateTags(updatedTags)
    }
}

const handleBadgeRemove = (tagToRemove: string) => {
    const updatedTags = props.modelValue.filter(tag => tag !== tagToRemove)
    updateTags(updatedTags)
}

const handleClear = () => {
    if (props.disabled) return

    inputValue.value = ''
    updateTags([])
    emit('update:error', '')

    nextTick(() => {
        inputRef.value?.focus()
    })
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
</script>
