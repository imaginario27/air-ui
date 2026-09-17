<template>
    <div>
        <!-- Visually hidden native checkbox (remains accessible to screen readers) -->
        <input
            :id="id"
            type="checkbox"
            :checked="modelValue === TriStateValue.CHECKED"
            class="sr-only"
            :aria-label="ariaLabel || 'Toggle'"
            :disabled="disabled"
            @change="toggleSwitch"
            @keydown.space.prevent="toggleSwitch"
        >

        <!-- Custom Switch -->
        <div
            role="switch"
            :aria-checked="ariaCheckedValue"
            :aria-label="ariaLabel || 'Toggle'"
            :class="[
                'relative flex items-center',
                controlFieldSizeClass,
                'rounded-full transition-colors',
                'border border-border-default',
                modelValue !== TriStateValue.UNCHECKED ? checkedBackgroundClass : 'bg-background-neutral-subtle',
                disabled ? 'bg-background-neutral-disabled cursor-not-allowed opacity-disabled' : 'cursor-pointer'
            ]"
            @click="toggleSwitch"
        >
            <div
                :class="[
                    'absolute bg-icon-on-filled rounded-full shadow-md transform transition-all',
                    'bg-icon-neutral-on-filled-bg',
                    handlerSizeClass,
                    handlerOffsetClass,
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
        type: String as PropType<TriStateValue>,
        default: TriStateValue.UNCHECKED,
        validator: (value: TriStateValue) => Object.values(TriStateValue).includes(value),
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

// Computed
const ariaCheckedValue = computed(() => {
    if (props.modelValue === TriStateValue.INDETERMINATE) return 'mixed'
    return props.modelValue === TriStateValue.CHECKED
})

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

const handlerSizeClass = computed(() => {
    return props.modelValue === TriStateValue.INDETERMINATE
        ? indeterminateHandlerSizeClass.value
        : controlFieldHandlerSizeClass.value
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

const indeterminateHandlerSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: 'w-[8px] h-[3px]',
        [ControlFieldSize.SM]: 'w-[10px] h-[3px]',
        [ControlFieldSize.MD]: 'w-[12px] h-[4px]',
        [ControlFieldSize.LG]: 'w-[16px] h-[5px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'w-[12px] h-[4px]'
})

// Centers the indeterminate pill within the track: (track width - pill width) / 2
const controlFieldHandlerIndeterminateOffsetClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: 'translate-x-[12px]',
        [ControlFieldSize.SM]: 'translate-x-[15px]',
        [ControlFieldSize.MD]: 'translate-x-[16px]',
        [ControlFieldSize.LG]: 'translate-x-[20px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'translate-x-[16px]'
})

const handlerOffsetClass = computed(() => {
    if (props.modelValue === TriStateValue.INDETERMINATE) return controlFieldHandlerIndeterminateOffsetClass.value
    return props.modelValue === TriStateValue.CHECKED
        ? controlFieldHandlerCheckedOffsetClass.value
        : controlFieldHandlerUncheckedOffsetClass.value
})

const checkedBackgroundClass = computed(() => {
    const backgroundVariant = {
        [SwitchStyle.BRAND]: 'bg-background-primary-brand-checked',
        [SwitchStyle.SUCCESS]: 'bg-background-success-bold',
    }
    return backgroundVariant[props.styleType as SwitchStyle] || 'bg-background-primary-brand-checked'
})

// Handlers
// A click/toggle always resolves to an explicit checked/unchecked value.
// Indeterminate is only ever entered by the consumer via modelValue.
const toggleSwitch = () => {
    if (props.disabled) return

    const nextValue = props.modelValue === TriStateValue.CHECKED
        ? TriStateValue.UNCHECKED
        : TriStateValue.CHECKED

    emit('update:modelValue', nextValue)
}
</script>
