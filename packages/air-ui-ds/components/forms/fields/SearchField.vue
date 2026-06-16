<template>
    <div 
        :class="[
            'flex flex-col',
            'w-full', 
            'gap-2' 
        ]"
    >
        <!-- Label -->
        <label
            v-if="label"
            :for="id"
            :class="[
                'text-sm',
                'font-semibold',
                'text-left',
            ]"
        >
            {{ label }}
        </label>

        <!-- Help Text (top) -->
        <HelpText
            v-if="helpTextPosition === Position.TOP"
            :text="helpText"
        />

        <!-- Input Container -->
        <div 
            :class="[ 
                'flex gap-2',
                'items-center',
                'border',
                'rounded-full',
                'transition-all',
                'pl-3 pr-4',
                inputSizeClass,
                'text-text-default',
                'border-border-default',
                inputCustomClass,
                isFocused && 'ring-2 ring-inset ring-border-primary-brand-default',
                disabled ? 'bg-background-neutral-disabled cursor-not-allowed' : (!transparent && 'bg-background-container-surface'),
            ]"
        >
            <!-- Icon -->
            <Icon
                :name="icon"
                iconClass="text-icon-neutral-subtler"
            />

            <!-- Input -->
            <input 
                :id 
                :aria-label="!label ? ariaLabel : undefined"
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
                    'placeholder-text-neutral-subtler',
                    'text-sm',
                    disabled ? 'cursor-not-allowed' : undefined,
                inputClass,
                ]"
                @focus="handleFocus" 
                @blur="handleBlur"
                @input="handleInput"
            >

            <!-- Clear button -->
            <ActionIconButton
                v-if="filled"
                :size="ButtonSize.SM"
                :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT_SUBTLE"
                icon="mdi:close-circle"
                :ariaLabel="clearAriaLabel"
                @click="clearField"
            />
        </div>

        <!-- Help Text (bottom) -->
        <HelpText
            v-if="helpTextPosition === Position.BOTTOM"
            :text="helpText"
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
    placeholder: { 
        type: String as PropType<string>, 
        default: 'Search', 
    },
    helpText: String as PropType<string>,
    helpTextPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
    },
    icon: {
        type: String as PropType<string>,
        default: 'mdi:magnify',
    },
    size: {
        type: String as PropType<InputSize>,
        default: InputSize.MD,
        validator: (value: InputSize) => Object.values(InputSize).includes(value),
    },
    modelValue: { 
        type: String as PropType<string>, 
        default: '',
    },
    maxLength: {
        type: Number as PropType<number>,
        required: true,
    },
    filterAlphabetic: { 
        type: Boolean as PropType<boolean>, 
        default: false,
    },
    readonly: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    autocomplete: {
        type: String as PropType<'on' | 'off'>,
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
    inputCustomClass: String as PropType<string>,
    clearAriaLabel: {
        type: String as PropType<string>,
        default: 'Clear search',
    },
    transparent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    inputClass: String as PropType<string>,
})

// States
const isFocused = ref(false)

// Emits
const emit = defineEmits(['update:modelValue'])

// Computed classes
const inputSizeClass = computed(() => {
    const sizeVariant = {
        [InputSize.MD]: 'h-[36px]',
        [InputSize.LG]: 'h-[44px]',
    }
    return sizeVariant[props.size as InputSize] || 'h-[36px]'
})

// Computed states
const filled = computed(() => !!props.modelValue.trim())

// Methods
const handleInput = (event: Event) => {
    if (props.disabled) return
    
    const target = event.target as HTMLInputElement
    let value = target.value 

    // Apply optional filtering
    if (props.filterAlphabetic) {
        value = filterAlphabetic(value)
    }

    // Emit the updated value to the parent
    emit('update:modelValue', value)
}

const handleFocus = () => {
    isFocused.value = true
}

const handleBlur = () => {
    isFocused.value = false
}

const clearField = () => {
    emit('update:modelValue', '')
}
</script>
