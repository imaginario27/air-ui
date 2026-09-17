<template>
    <div>
        <!-- Visually hidden native checkbox (remains accessible to screen readers) -->
        <input
            :id="id"
            type="checkbox"
            :checked="modelValue"
            class="sr-only"
            :aria-label="ariaLabel || 'Toggle'"
            :disabled="disabled"
            @change="handleNativeChange"
            @keydown.space.prevent="toggleSwitch"
        >

        <!-- Custom Switch -->
        <div
            role="switch"
            :aria-checked="modelValue"
            :aria-label="ariaLabel || 'Toggle'"
            :class="[
                'relative flex items-center',
                controlFieldSizeClass,
                'rounded-full transition-colors',
                'border border-border-default',
                modelValue ? checkedBackgroundClass : 'bg-background-neutral-subtle',
                disabled ? 'bg-background-neutral-disabled cursor-not-allowed opacity-disabled' : 'cursor-pointer'
            ]"
            @click="toggleSwitch"
        >
            <div
                :class="[
                    'absolute bg-icon-on-filled rounded-full shadow-md transform transition-transform',
                    'aspect-square',
                    controlFieldHandlerSizeClass,
                    modelValue ? controlFieldHandlerCheckedOffsetClass : controlFieldHandlerUncheckedOffsetClass,
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
    ariaLabel: String as PropType<string>,
    modelValue: {
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
    styleType: {
        type: String as PropType<SwitchStyle>,
        default: SwitchStyle.BRAND,
        validator: (value: SwitchStyle) => Object.values(SwitchStyle).includes(value),
    },
})

// Emits
const emit = defineEmits(['update:modelValue'])

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

const controlFieldHandlerUncheckedOffsetClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: 'translate-x-0.5',
        [ControlFieldSize.SM]: 'translate-x-0.5',
        [ControlFieldSize.MD]: 'translate-x-1',
        [ControlFieldSize.LG]: 'translate-x-1',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'translate-x-1'
})

const controlFieldHandlerCheckedOffsetClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: 'translate-x-[18px]',
        [ControlFieldSize.SM]: 'translate-x-[22px]',
        [ControlFieldSize.MD]: 'translate-x-6',
        [ControlFieldSize.LG]: 'translate-x-7',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'translate-x-6'
})

const checkedBackgroundClass = computed(() => {
    const backgroundVariant = {
        [SwitchStyle.BRAND]: 'bg-background-primary-brand-checked',
        [SwitchStyle.SUCCESS]: 'bg-background-success-bold',
    }
    return backgroundVariant[props.styleType as SwitchStyle] || 'bg-background-primary-brand-checked'
})

// Handlers
const toggleSwitch = () => {
    if (props.disabled) return

    emit('update:modelValue', !props.modelValue)
}

const handleNativeChange = () => {
    if (props.disabled) return

    emit('update:modelValue', !props.modelValue)
}
</script>
