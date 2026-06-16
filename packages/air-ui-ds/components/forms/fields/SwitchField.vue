<template>
    <div 
        :class="[
            'flex flex-col',
            'w-full',
            'gap-2',
        ]"
    >
        <!-- Legend -->
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

        <!-- Main wrapper -->
        <div 
            :class="[ 
                'flex items-center gap-3',
                label || icon ? 'justify-between' : 'justify-end',
                fitToContent && 'w-max',
                'text-sm w-full',
                hasError ? 'text-text-error' : 'text-text-default',
                checkboxWrapperClass && checkboxWrapperClass
            ]"
        >
            <!-- Label + Icon block (only if present) -->
            <div 
                v-if="label || icon"
                class="flex gap-2.5 w-full"
            >
                <!-- Icon -->
                <Icon
                    v-if="icon"
                    :name="icon"
                    :iconClass="iconSizeClass" 
                />

                <!-- Label -->
                <label 
                    v-if="label"
                    :for="id" 
                    :class="[
                        disabled && 'text-text-neutral-disabled',
                        labelSizeClass,
                        labelClass && labelClass
                    ]" 
                    v-html="label"
                />
            </div>

            <!-- Visually hidden native checkbox (remains accessible to screen readers) -->
            <input
                :id="id"
                type="checkbox"
                :checked="modelValue"
                class="sr-only"
                :aria-label="ariaLabel || label || legend || 'Toggle'"
                :disabled="disabled"
                @change="handleChange"
                @keydown.space.prevent="toggleCheckbox"
            >

            <!-- Custom Switch -->
            <div
                role="switch"
                :aria-checked="modelValue"
                :aria-label="ariaLabel || label || legend || 'Toggle'"
                :class="[
                    'relative flex items-center',
                    controlFieldSizeClass,
                    'rounded-full transition-colors',
                    'border border-border-default',
                    modelValue ? checkedBackgroundClass : 'bg-background-neutral-subtle',
                    disabled ? 'bg-background-neutral-disabled cursor-not-allowed opacity-disabled' : 'cursor-pointer'
                ]"
                @click="toggleCheckbox"
            >
                <div 
                    :class="[ 
                        'absolute bg-icon-on-filled rounded-full shadow-md transform transition-transform',
                        'aspect-square',
                        controlFieldHandlerSizeClass,
                        modelValue ? 'translate-x-6' : 'translate-x-1',
                        'bg-icon-neutral-on-filled-bg'
                    ]" 
                />
            </div>
        </div>

        <!-- Help Text -->
        <HelpText :text="helpText" :error="error" />
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
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    size: {
        type: String as PropType<ControlFieldSize>,
        default: ControlFieldSize.MD,
        validator: (value: ControlFieldSize) => Object.values(ControlFieldSize).includes(value),
    },
    icon: String as PropType<string>,
    styleType: {
        type: String as PropType<SwitchStyle>,
        default: SwitchStyle.BRAND,
        validator: (value: SwitchStyle) => Object.values(SwitchStyle).includes(value),
    },    
    fitToContent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    checkboxWrapperClass: String as PropType<string>,
    labelClass: String as PropType<string>,
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
        [ControlFieldSize.XS]: 'w-[32px] h-[16px] min-w-[32px] min-h-[16px]',
        [ControlFieldSize.SM]: 'w-[40px] h-[20px] min-w-[40px] min-h-[20px]',
        [ControlFieldSize.MD]: 'w-[44px] h-[24px] min-w-[44px] min-h-[24px]',
        [ControlFieldSize.LG]: 'w-[56px] h-[32px] min-w-[56px] min-h-[32px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'w-[44px] h-[24px] min-w-[44px] min-h-[24px]'
})

const controlFieldHandlerSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: 'w-[12px] h-[12px]',
        [ControlFieldSize.SM]: 'w-[16px] h-[16px]',
        [ControlFieldSize.MD]: 'w-[16px] h-[16px]',
        [ControlFieldSize.LG]: 'w-[24px] h-[24px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'w-[16px] h-[16px]'
})

const labelSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: 'text-xs',
        [ControlFieldSize.SM]: 'text-xs',
        [ControlFieldSize.MD]: 'text-sm',
        [ControlFieldSize.LG]: 'text-base',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'text-sm'
})

const iconSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: 'w-[16px] h-[16px] min-w-[16px] min-h-[16px]',
        [ControlFieldSize.SM]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        [ControlFieldSize.MD]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        [ControlFieldSize.LG]: 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]'
})

const checkedBackgroundClass = computed(() => {
    const backgroundVariant = {
        [SwitchStyle.BRAND]: 'bg-background-primary-brand-checked',
        [SwitchStyle.SUCCESS]: 'bg-background-success-bold',
    }
    return backgroundVariant[props.styleType as SwitchStyle] || 'bg-background-primary-brand-checked'
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
        if (validationMode.value === FormValidationMode.BLUR && props.validator && props.required) {
            const result = props.validator(value)
            emit('update:error', result ?? '')
        }
    }
)
</script>
