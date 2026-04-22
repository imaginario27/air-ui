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
                disabled ? 'bg-background-neutral-disabled cursor-not-allowed' : 'bg-neutral-white',
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
                @click="clearField"
            />
        </div>

         <!-- Help Text -->
        <p 
            v-if="helpText"
            class="text-xs text-left text-text-neutral-subtle" 
        >
            {{ helpText }}
        </p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    id: { 
        type: String as PropType<string>, 
        required: true, 
    },
    label: String as PropType<string>,
    placeholder: { 
        type: String as PropType<string>, 
        default: 'Search', 
    },
    helpText: String as PropType<string>,
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
