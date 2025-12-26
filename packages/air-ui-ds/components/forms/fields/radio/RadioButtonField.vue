<template>
    <div 
        :class="[ 
            'flex', 
            'w-full', 
            'gap-4',
            'justify-between',
            'items-center',
            'border border-border-default',
            'px-3',
            'py-4',
            'rounded-lg',
            'hover:cursor-pointer',
            modelValue === value && selectedBackgroundColorClass,
            disabled && 'opacity-disabled'
        ]"
        @click="selectRadio"
    >
        <!-- Radio Button with Label -->
        <div 
            :class="[ 
                'flex items-center gap-3',
                'text-sm',
                'text-text-default'
            ]"
        >
            <!-- Icon -->
            <div 
                :class="[
                    'flex',
                    'justify-center',
                    'items-center',
                    'w-[40px]',
                    'h-[40px]',
                    'rounded-full',
                    'aspect-square',
                    modelValue === value ? selectedIconBackgroundColorClass : 'bg-background-neutral-sublter'
                ]"
            >
                <MdiIcon 
                    :icon="icon"
                    size="24"
                    preserveAspectRatio="xMidYMid meet"
                    :class="modelValue === value ? selectedIconColorClass : 'text-icon-neutral-subtle'"
                />
            </div>
            <!-- Label with help text -->
            <div class="flex flex-col gap-1.5">
                <label 
                    v-if="label"
                    :for="id" 
                    :class="[ 
                        modelValue === value ? selectedIconColorClass : 'text-text-neutral-default',
                        labelSizeClass, 
                    ]" 
                    v-html="label"
                />
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
        </div>

        <!-- Hidden Native Radio Button -->
        <input 
            :id="id" 
            type="radio" 
            :name="name"
            :value="value"
            :checked="modelValue === value" 
            class="hidden" 
            :disabled
            @change="selectRadio"
        >

        <!-- Custom Radio Button -->
        <div
            :class="[ 
                'w-[24px] h-[24px]', 
                'aspect-square',
                'border', 
                'rounded-full', 
                'flex items-center justify-center',
                'transition-colors',
                modelValue === value ? selectedCheckboxBackgroundColorClass : 'bg-neutral-white border-border-default',
                modelValue === value && disabled && 'border-0',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            ]"
            @click="selectRadio"
        >
            <div
                v-if="modelValue === value"
                :class="[ 
                    'rounded-full',
                    'w-[50%] h-[50%]', 
                    'bg-icon-neutral-on-filled-bg' 
                ]"
            />
        </div>
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
    label: String as PropType<string>,
    helpText: String as PropType<string>,
    value: { // Value of the radio button
        type: [String, Number, Boolean] as PropType<string | number | boolean>,
        required: true,
    },
    icon: {
        type: String as PropType<any>,
        default: 'mdiHelp',
    },
    type: {
        type: String as PropType<
            ColorAccent.INFO | ColorAccent.WARNING| ColorAccent.SUCCESS | ColorAccent.DANGER | ColorAccent.PRIMARY_BRAND | ColorAccent.SECONDARY_BRAND
        >,
        default: ColorAccent.PRIMARY_BRAND,
        validator: (value: ColorAccent) => [
            ColorAccent.INFO, 
            ColorAccent.WARNING, 
            ColorAccent.DANGER, 
            ColorAccent.SUCCESS,
            ColorAccent.PRIMARY_BRAND,
            ColorAccent.SECONDARY_BRAND,
        ].includes(value)
    },
    size: {
        type: String as PropType<ControlFieldSize>,
        default: ControlFieldSize.MD,
        validator: (value: ControlFieldSize) => Object.values(ControlFieldSize).includes(value),
    },
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
})

// Emits
const emit = defineEmits(['update:modelValue', 'validate'])

// Computed classes
const labelSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.MD]: 'text-sm',
        [ControlFieldSize.LG]: 'text-base',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'text-sm'
})

const selectedBackgroundColorClass = computed(() => {
    const colorVariant = {
        [ColorAccent.INFO]: 'bg-background-info-subtlest',
        [ColorAccent.WARNING]: 'bg-background-warning-subtlest',
        [ColorAccent.DANGER]: 'bg-background-danger-subtlest',
        [ColorAccent.SUCCESS]: 'bg-background-success-subtlest',
        [ColorAccent.NEUTRAL]: 'bg-background-primary-brand-checked-subtlest',
        [ColorAccent.PRIMARY_BRAND]: 'bg-background-primary-brand-checked-subtlest',
        [ColorAccent.SECONDARY_BRAND]: 'bg-background-secondary-brand-checked-subtlest',
    }
    return colorVariant[props.type as ColorAccent] || 'bg-background-primary-brand-checked-subtlest'
})

const selectedIconBackgroundColorClass = computed(() => {
    const colorVariant = {
        [ColorAccent.INFO]: 'bg-background-info-subtlest',
        [ColorAccent.WARNING]: 'bg-background-warning-subtle-plus',
        [ColorAccent.DANGER]: 'bg-background-danger-subtle-plus',
        [ColorAccent.SUCCESS]: 'bg-background-success-subtle-plus',
        [ColorAccent.PRIMARY_BRAND]: 'bg-background-primary-brand-on-checked-subtle-bg',
        [ColorAccent.SECONDARY_BRAND]: 'bg-background-secondary-brand-on-checked-subtle-bg',
        [ColorAccent.NEUTRAL]: undefined,
    }
    return colorVariant[props.type as ColorAccent] || 'bg-background-primary-brand-on-checked-subtle-bg'
})

const selectedIconColorClass = computed(() => {
    const colorVariant = {
        [ColorAccent.INFO]: 'text-icon-info',
        [ColorAccent.WARNING]: 'text-icon-warning',
        [ColorAccent.DANGER]: 'text-icon-danger',
        [ColorAccent.SUCCESS]: 'text-icon-success',
        [ColorAccent.PRIMARY_BRAND]: 'text-icon-primary-brand-active',
        [ColorAccent.SECONDARY_BRAND]: 'text-icon-secondary-brand-active',
        [ColorAccent.NEUTRAL]: undefined,
    }
    return colorVariant[props.type as ColorAccent] || 'text-icon-primary-brand-active'
})

const selectedCheckboxBackgroundColorClass = computed(() => {
    const colorVariant = {
        [ColorAccent.INFO]: 'bg-background-info-bold',
        [ColorAccent.WARNING]: 'bg-background-warning-bold',
        [ColorAccent.DANGER]: 'bg-background-danger-bold',
        [ColorAccent.SUCCESS]: 'bg-background-success-bold',
        [ColorAccent.PRIMARY_BRAND]: 'bg-background-primary-brand-checked',
        [ColorAccent.SECONDARY_BRAND]: 'bg-background-secondary-brand-checked',
        [ColorAccent.NEUTRAL]: undefined,
    }
    return colorVariant[props.type as ColorAccent] || 'bg-background-primary-brand-checked'
})

// Handlers
const selectRadio = () => {
    if (props.disabled) return
    emit('update:modelValue', props.value)
}
</script>
