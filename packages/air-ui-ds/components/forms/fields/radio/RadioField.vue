<template>
    <div :class="[ 'flex flex-col', 'w-full', 'gap-2' ]">
        <!-- Radio Button with Label -->
        <div 
            :class="[ 
                'flex items-center gap-3',
                'text-sm',
                'text-text-default'
            ]"
        >
            <!-- Label (inverted position) -->
            <label 
                v-if="inverse"
                :for="id" 
                :class="[ 
                    disabled && 'text-text-neutral-disabled',
                    labelSizeClass 
                ]" 
                v-html="label"
            />

            <!-- Hidden Native Radio Button -->
            <input 
                :id="id" 
                type="radio" 
                :name="name"
                :value="value"
                :checked="modelValue === value" 
                class="hidden" 
                :disabled="disabled"
                @change="selectRadio"
            >
            
            <!-- Custom Radio Button -->
            <div
                :class="[ 
                    radioSizeClass, 
                    'aspect-square',
                    'border', 
                    'rounded-full', 
                    'flex items-center justify-center',
                    'transition-colors',
                    modelValue === value ? 'bg-background-primary-brand-checked border-0' : 'bg-neutral-white border-border-default',
                    modelValue === value && disabled && '!bg-background-neutral-disabled !border-border-neutral-disabled',
                    disabled ? 'bg-background-neutral-disabled cursor-not-allowed' : 'cursor-pointer'
                ]"
                @click="selectRadio"
            >
                <div
                    v-if="modelValue === value"
                    :class="[ 
                        'rounded-full',
                        'w-[50%] h-[50%]', 
                        disabled ? 'bg-icon-neutral-disabled' : 'bg-icon-neutral-on-filled-bg' 
                    ]"
                />
            </div>
            
            <!-- Label (natural position) -->
            <label 
                v-if="!inverse"
                :for="id" 
                :class="[ 
                    disabled ? 'text-text-neutral-disabled' : undefined,
                    labelSizeClass 
                ]"  
                v-html="label"
            />
        </div>

        <!-- Help Text -->
        <p 
            v-if="helpText" 
            :class="[ 
                'text-xs',
                'text-left', 
                'text-text-neutral-subtle'
            ]"
        >
            {{ helpText }}
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
    name: { // Group name for radio buttons
        type: String as PropType<string>,
        required: true,
    },
    value: { // Value of the radio button
        type: [String, Number, Boolean] as PropType<string | number | boolean>,
        required: true,
    },
    label: { 
        type: String as PropType<string>, 
        default: 'Text',
    },
    helpText: String as PropType<string>,
    required: { 
        type: Boolean as PropType<boolean>, 
        default: false,
    },
    modelValue: {
        type: [String, Number, Boolean, null] as PropType<string | number | boolean | null>,
        default: null,
    },
    validator: {
        type: Function as PropType<(value: any) => boolean>,
        default: () => null,
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
    inverse: { // Sets the radio button on the right side of the text
        type: Boolean as PropType<boolean>,
        default: false,
    },
})

// Emits
const emit = defineEmits(['update:modelValue', 'validate'])

// Computed classes
const radioSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: 'w-[16px] h-[16px]',
        [ControlFieldSize.SM]: 'w-[20px] h-[20px]',
        [ControlFieldSize.MD]: 'w-[24px] h-[24px]',
        [ControlFieldSize.LG]: 'w-[32px] h-[32px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'w-[24px] h-[24px]'
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

// Handlers
const selectRadio = () => {
    if (props.disabled) return
    emit('update:modelValue', props.value)
}
</script>
