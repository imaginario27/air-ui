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
                label || icon || customIcon ? 'justify-between' : 'justify-end',
                'text-sm w-full',
                hasError ? 'text-text-error' : 'text-text-default',
                checkboxWrapperClass && checkboxWrapperClass
            ]"
        >
            <!-- Label + Icon block (only if present) -->
            <div 
                v-if="label || icon || customIcon"
                class="flex gap-2.5 w-full"
            >
                <!-- Icon -->
                <template v-if="icon || customIcon">
                    <MdiIcon 
                        v-if="icon && !customIcon" 
                        :icon="icon" 
                        :size="iconSize" 
                        preserveAspectRatio="xMidYMid meet"
                        class="text-icon-default" 
                    />
                    <div
                        v-else
                        :class="[
                            customIconSizeClass,
                            'text-icon-default'
                        ]"
                        v-html="customIcon" 
                    />
                </template>

                <!-- Label -->
                <label 
                    v-if="label"
                    :for="id" 
                    :class="[
                        disabled && 'text-text-neutral-disabled',
                        labelSizeClass,
                        customIcon && 'mt-1',
                        labelClass && labelClass
                    ]" 
                    v-html="label"
                />
            </div>

            <!-- Hidden native checkbox -->
            <input 
                :id="id" 
                type="checkbox" 
                :checked="modelValue" 
                class="hidden" 
                :disabled="disabled"
                @change="handleChange" 
            >

            <!-- Custom Switch -->
            <div 
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
        <p 
            v-if="helpText || hasError" 
            :class="[ 
                'text-xs',
                'text-left',
                hasError ? 'text-text-error' : 'text-text-neutral-subtle'
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
    legend: String as PropType<string>,
    helpText: String as PropType<string>,
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
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
    size: {
        type: String as PropType<ControlFieldSize>,
        default: ControlFieldSize.MD,
        validator: (value: ControlFieldSize) => Object.values(ControlFieldSize).includes(value),
    },
    icon: String as PropType<any>,
    customIcon: String as PropType<any>,
    styleType: {
        type: String as PropType<SwitchStyle>,
        default: SwitchStyle.BRAND,
        validator: (value: SwitchStyle) => Object.values(SwitchStyle).includes(value),
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
        [ControlFieldSize.MD]: 'w-[44px] h-[24px] min-w-[44px] min-h-[24px]',
        [ControlFieldSize.LG]: 'w-[56px] h-[32px] min-w-[56px] min-h-[32px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'w-[44px] h-[24px] min-w-[44px] min-h-[24px]'
})

const controlFieldHandlerSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.MD]: 'w-[16px] h-[16px]',
        [ControlFieldSize.LG]: 'w-[24px] h-[24px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'w-[16px] h-[16px]'
})

const labelSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.MD]: 'text-sm',
        [ControlFieldSize.LG]: 'text-base',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'text-sm'
})

const iconSize = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.MD]: '20',
        [ControlFieldSize.LG]: '24',
    }
    return sizeVariant[props.size as ControlFieldSize] || '20'
})

const customIconSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.MD]: 'w-[20px] h-[20px]',
        [ControlFieldSize.LG]: 'w-[24px] h-[24px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'w-[20px] h-[20px]'
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
