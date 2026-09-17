<template>
    <div>
        <input
            :id="id"
            type="checkbox"
            :checked="modelValue === TriStateValue.CHECKED"
            class="sr-only"
            :aria-label="ariaLabel || id"
            :disabled="disabled"
            @change="toggleCheckbox"
            @keydown.space.prevent="toggleCheckbox"
        >

        <div
            role="checkbox"
            :aria-checked="ariaCheckedValue"
            :aria-label="ariaLabel || id"
            :class="[
                'flex items-center justify-center',
                controlFieldSizeClass,
                'border',
                'rounded',
                'transition-colors',
                modelValue !== TriStateValue.UNCHECKED ? 'bg-background-primary-brand-checked border-border-primary-brand-active' : 'bg-neutral-white border-border-default',
                disabled ? 'bg-background-neutral-disabled cursor-not-allowed' : 'cursor-pointer'
            ]"
            @click="toggleCheckbox"
        >
            <Icon
                v-if="modelValue === TriStateValue.CHECKED"
                name="mdi:check-bold"
                :iconClass="[
                    checkboxIconSizeClass,
                    disabled ? '!text-icon-neutral-disabled' : '!text-icon-neutral-on-filled-bg'
                ]"
            />
            <Icon
                v-else-if="modelValue === TriStateValue.INDETERMINATE"
                name="mdi:minus-thick"
                :iconClass="[
                    checkboxIconSizeClass,
                    disabled ? '!text-icon-neutral-disabled' : '!text-icon-neutral-on-filled-bg'
                ]"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
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
})

const emit = defineEmits(['update:modelValue'])

const ariaCheckedValue = computed(() => {
    if (props.modelValue === TriStateValue.INDETERMINATE) return 'mixed'
    return props.modelValue === TriStateValue.CHECKED
})

const controlFieldSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: 'w-[16px] h-[16px] min-w-[16px] min-h-[16px]',
        [ControlFieldSize.SM]: 'w-[20px] h-[20px] min-w-[20px] min-h-[20px]',
        [ControlFieldSize.MD]: 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]',
        [ControlFieldSize.LG]: 'w-[32px] h-[32px] min-w-[32px] min-h-[32px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || 'w-[24px] h-[24px] min-w-[24px] min-h-[24px]'
})

const checkboxIconSizeClass = computed(() => {
    const sizeVariant = {
        [ControlFieldSize.XS]: '!w-[12px] !h-[12px] !min-w-[12px] !min-h-[12px]',
        [ControlFieldSize.SM]: '!w-[14px] !h-[14px] !min-w-[14px] !min-h-[14px]',
        [ControlFieldSize.MD]: '!w-[16px] !h-[16px] !min-w-[16px] !min-h-[16px]',
        [ControlFieldSize.LG]: '!w-[20px] !h-[20px] !min-w-[20px] !min-h-[20px]',
    }
    return sizeVariant[props.size as ControlFieldSize] || '!w-[16px] !h-[16px] !min-w-[16px] !min-h-[16px]'
})

// A click/toggle always resolves to an explicit checked/unchecked value.
// Indeterminate is only ever entered by the consumer via modelValue.
const toggleCheckbox = () => {
    if (props.disabled) return

    const nextValue = props.modelValue === TriStateValue.CHECKED
        ? TriStateValue.UNCHECKED
        : TriStateValue.CHECKED

    emit('update:modelValue', nextValue)
}
</script>
