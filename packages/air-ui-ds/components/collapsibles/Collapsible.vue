<template>
    <div class="w-full flex flex-col gap-2 py-3">
        <button
            :id="headerId"
            type="button"
            class="collapsible-header w-full flex justify-between gap-4 hover:cursor-pointer text-left"
            :aria-expanded="isOpen"
            :aria-controls="panelId"
            @click="toggle"
        >
            <span :class="['font-semibold mt-1', titleClass]">
                {{ title }}
            </span>

            <ActionIconButton
                :icon="isOpen ? 'mdi:unfold-less-horizontal' : 'mdi:unfold-more-horizontal'"
                :styleType="ButtonStyleType.NEUTRAL_OUTLINED"
                :size="buttonSize"
                tabindex="-1"
                aria-hidden="true"
            />
        </button>

        <VerticalExpansionTransition v-show="isOpen">
            <div :id="panelId" role="region" :aria-labelledby="headerId">
                <slot />
            </div>
        </VerticalExpansionTransition>
    </div>
</template>

<script setup lang="ts">
// IDs
const headerId = useId()
const panelId = useId()

// Props
const props = defineProps({
    title: {
        type: String as PropType<string>,
        default: 'Item title',
    },
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    titleClass: String as PropType<string>,
    buttonSize: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.MD,
        validator: (value: ButtonSize) => Object.values(ButtonSize).includes(value),
    },
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Composable
const { isOpen, toggle } = useAccordion()

// Sync external modelValue → internal state
watch(
    () => props.modelValue,
    (val) => {
        if (val !== isOpen.value) {
            isOpen.value = val
        }
    },
    { immediate: true },
)

// Emit internal state changes → parent
watch(
    () => isOpen.value,
    (val) => {
        emit('update:modelValue', val)
    },
)
</script>
