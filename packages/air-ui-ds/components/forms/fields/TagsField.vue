<template>
    <div :class="['flex flex-col', 'w-full', 'gap-2']">
        <div class="w-full flex gap-2 justify-between">
            <!-- Label -->
            <label
                v-if="label"
                :for="id"
                :class="['text-sm', 'font-semibold', 'text-left', hasError && 'text-text-error']"
            >
                {{ label }}
                <span v-if="!required && showOptionalLabel" class="font-normal text-text-neutral-subtler">
                    {{ optionalLabelText }}
                </span>
            </label>
            <button
                v-if="showClearButton"
                type="button"
                class="text-sm font-medium text-text-neutral-subtle hover:text-text-default transition-colors"
                @click="handleClear"
            >
                {{ resolvedClearText }}
            </button>
        </div>

        <!-- Help Text (top) -->
        <HelpText v-if="helpTextPosition === Position.TOP" :text="helpText" :error="error" />

        <!-- Input Container -->
        <div
            :class="[
                'flex gap-2 w-full',
                'border',
                'rounded-md',
                'transition-all',
                'text-text-default',
                inputSizeClass,
                icon ? 'pl-3' : 'pl-4',
                hasError ? 'pr-3' : 'pr-4',
                hasError ? 'border-border-error text-text-error' : 'border-border-default',
                isFocused && 'ring-2 focus-within:ring-inset focus-within:ring-border-primary-brand-default',
                ...glowClass,
                disabled ? 'bg-background-neutral-disabled' : !transparent && 'bg-background-field',
                disabled && 'cursor-not-allowed',
            ]"
        >
            <!-- Icon -->
            <span v-if="icon" class="mt-1.75">
                <Icon :name="icon" iconClass="text-icon-neutral-subtler" />
            </span>

            <!-- Tags -->
            <div class="flex flex-wrap w-full items-center gap-2 py-1.5">
                <Badge
                    v-for="tag in modelValue"
                    :key="tag"
                    :text="tag"
                    :closeable="!disabled && !readonly"
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
                    :readonly
                    :class="[
                        'flex-1',
                        'min-w-16',
                        'self-center',
                        'outline-none',
                        'bg-transparent',
                        'text-sm',
                        'placeholder-text-neutral-subtler',
                        (disabled || isMaxTagsReached) && 'cursor-not-allowed',
                        inputClass,
                    ]"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @input="handleInput"
                    @keydown="handleKeydown"
                />
            </div>

            <!-- Error Icon -->
            <span class="mt-1.75">
                <Icon v-if="hasError" name="mdi:alert-circle-outline" iconClass="text-icon-error" />
            </span>
        </div>

        <!-- Help Text (bottom) -->
        <HelpText v-if="helpTextPosition === Position.BOTTOM" :text="helpText" :error="error" />
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
    placeholder: String as PropType<string>,
    clearText: String as PropType<string>,
    helpText: String as PropType<string>,
    helpTextPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    icon: String as PropType<string>,
    size: {
        type: String as PropType<InputSize>,
        default: InputSize.MD,
        validator: (value: InputSize) => Object.values(InputSize).includes(value),
    },
    responsiveSize: {
        type: Boolean as PropType<boolean | null>,
        default: null,
    },
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
    readonly: {
        type: Boolean as PropType<boolean>,
        default: false,
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
    transparent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    inputClass: String as PropType<string>,
    glowColorMode: {
        type: String as PropType<GlowColorMode>,
        validator: (value: GlowColorMode) => Object.values(GlowColorMode).includes(value),
    },
    glowTrigger: {
        type: String as PropType<GlowTrigger>,
        validator: (value: GlowTrigger) => Object.values(GlowTrigger).includes(value),
    },
    glowType: {
        type: String as PropType<GlowType>,
        validator: (value: GlowType) => Object.values(GlowType).includes(value),
    },
    glowOpacity: {
        type: Number as PropType<number>,
        validator: (value: number) => value >= 0 && value <= 100,
    },
    glowSize: {
        type: Number as PropType<number | null>,
        validator: (value: number | null) => value === null || value >= 0,
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
const dsConfig = useDSConfig()
const resolvedPlaceholder = computed(() => props.placeholder ?? dsConfig.forms.tagsPlaceholderText())
const resolvedClearText = computed(() => props.clearText ?? dsConfig.actions.clearText())

// Computed States
const hasError = computed(() => props.error !== '')
const isResponsive = computed(() => props.responsiveSize ?? dsConfig.forms.responsiveSize)

const inputSizeClass = computed(() => {
    if (isResponsive.value && props.size === InputSize.MD) return 'min-h-[44px] lg:min-h-[36px]'

    return props.size === InputSize.LG ? 'min-h-[44px]' : 'min-h-[36px]'
})

// Glow
const { glowClass } = useFieldGlow(props, hasError)
const optionalLabelText = computed(() => props.optionalLabel ?? dsConfig.forms.optionalLabelText())
const isMaxTagsReached = computed(
    () => Number.isFinite(props.maxTags) && props.modelValue.length >= (props.maxTags as number),
)
const showClearButton = computed(
    () => !props.disabled && !props.readonly && (props.modelValue.length > 0 || inputValue.value.trim().length > 0),
)

const computedPlaceholder = computed(() => {
    if (props.modelValue.length > 0) return undefined

    if (isMaxTagsReached.value) {
        return `Maximum of ${props.maxTags} tags reached`
    }

    return resolvedPlaceholder.value
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
        .map((value) => value.trim())
        .filter(Boolean)

    if (!candidates.length || props.readonly) return

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
    if (props.disabled || props.readonly || isMaxTagsReached.value) return

    const target = event.target as HTMLInputElement
    inputValue.value = target.value
}

const handleKeydown = (event: KeyboardEvent) => {
    if (props.disabled || props.readonly) return

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
    if (props.disabled || props.readonly) return

    const updatedTags = props.modelValue.filter((tag) => tag !== tagToRemove)
    updateTags(updatedTags)
}

const handleClear = () => {
    if (props.disabled || props.readonly) return

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
    (value) => {
        if (validationMode.value === FormValidationMode.BLUR && props.validator) {
            const result = props.validator(value)
            emit('update:error', result ?? '')
        }
    },
)
</script>
