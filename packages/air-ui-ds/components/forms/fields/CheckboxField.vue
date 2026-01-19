<template>
    <div :class="[ 'flex flex-col', 'w-full', 'gap-2' ]">
        <!-- Label -->
        <legend 
            v-if="legend"
            :class="[ 
                'text-sm', 
                'font-semibold', 
                'text-left',
            ]"
        >
            {{ legend }}
        </legend>
        <!-- Checkbox with Label -->
        <div 
            :class="[ 
                'flex items-center gap-3',
                'text-sm',
                hasError ? 'text-text-error' : 'text-text-default'
            ]"
        >
            <!-- Label (inverted)-->
            <label 
                v-if="inverse"
                :for="id" 
                :class="[
                    disabled && 'text-text-neutral-disabled',
                    labelSizeClass,
                ]" 
                v-html="label"
            />

            <!-- Hidden Native Checkbox -->
            <input 
                :id="id" 
                type="checkbox" 
                :checked="modelValue" 
                class="hidden" 
                :disabled="disabled"
                @change="handleChange"
            >
            
            <!-- Custom Checkbox -->
            <div
                :class="[ 
                    'flex items-center justify-center',
                    controlFieldSizeClass, 
                    'border', 
                    'rounded', 
                    'flex items-center justify-center',
                    'transition-colors',
                    modelValue ? 'bg-background-primary-brand-checked border-border-primary-brand-active' : 'bg-neutral-white border-border-default',
                    disabled ? 'bg-background-neutral-disabled cursor-not-allowed' : 'cursor-pointer'
                ]"
                @click="toggleCheckbox"
            >
                <Icon
                    v-if="modelValue" 
                    name="mdi:check-bold" 
                    :iconClass="[
                        checkboxIconSizeClass,
                        disabled ? '!text-icon-neutral-disabled' : '!text-icon-neutral-on-filled-bg'
                    ]"
                />
            </div>
            
            <!-- Label (natural position) -->
            <label 
                v-if="!inverse"
                :for="id" 
                :class="[
                    disabled && 'text-text-neutral-disabled',
                    labelSizeClass,
                ]"  
                v-html="label"
            />
        </div>

        <!-- Help Text -->
        <p 
            v-if="helpText || hasError" 
            :class="[ 
                'text-xs',
                'text-left', 
                hasError ? 'text-text-error' : 'text-text-neutral-subtler' 
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
    label: { 
        type: String as PropType<string>, 
        default: 'Text',
    },
    legend: String as PropType<string>,
    helpText: String as PropType<string>,
    modelValue: { 
        type: Boolean as PropType<boolean>, 
        default: false, 
    },
    validator: {
        type: Function as PropType<(value: boolean) => string | null>,
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
    size: {
        type: String as PropType<ControlFieldSize>,
        default: ControlFieldSize.MD,
        validator: (value: ControlFieldSize) => Object.values(ControlFieldSize).includes(value),
    },
    inverse: { // Sets the checkbox on the right side of the text
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'update:error'])

// Composables
const validationMode = useInjectedValidationMode()

// Computed
const hasError = computed(() => props.error !== '')

// Computed classes
const controlFieldSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.MD]: 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]',
        [ControlFieldSize.LG]: 'w-[32px] h-[32px] min-w-[32px] min-h-[32px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]'
})

const checkboxIconSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.MD]: '!w-[16px] !h-[16px] !min-w-[16px] !min-h-[16px]',
        [ControlFieldSize.LG]: '!w-[20px] !h-[20px] !min-w-[20px] !min-h-[20px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || '!w-[16px] !h-[16px] !min-w-[16px] !min-h-[16px]'
})

const labelSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.MD]: 'text-sm',
        [ControlFieldSize.LG]: 'text-base',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'text-sm'
})

// Handlers
const handleChange = () => {
    if (validationMode.value === FormValidationMode.BLUR) {
        runValidation()
    }
}

const toggleCheckbox = () => {
    if (props.disabled) return

    if (validationMode.value === FormValidationMode.BLUR) {
        runValidation()
    }

    emit('update:modelValue', !props.modelValue)
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