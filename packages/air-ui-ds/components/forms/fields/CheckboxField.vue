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

            <Checkbox
                :id="id"
                :modelValue="modelValue"
                :disabled="disabled"
                :size="size"
                @update:modelValue="handleCheckboxUpdate"
            />
            
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
const labelSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: 'text-xs',
        [ControlFieldSize.SM]: 'text-sm',
        [ControlFieldSize.MD]: 'text-sm',
        [ControlFieldSize.LG]: 'text-base',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'text-sm'
})

// Handlers
const handleCheckboxUpdate = (value: boolean) => {
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
        if (validationMode.value === FormValidationMode.BLUR && props.validator) {
            const result = props.validator(value)
            emit('update:error', result ?? '')
        }
    }
)
</script>