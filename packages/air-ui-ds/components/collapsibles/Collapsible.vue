<template>
    <div class="w-full flex flex-col gap-2 py-3">
        <div
            class="collapsible-header flex justify-between gap-4 hover:cursor-pointer"
            @click="toggle"
        >
            <span class="font-semibold mt-1">
                {{ title }}
            </span>

            <ActionIconButton 
                :icon="isOpen ? 'mdi:unfold-less-horizontal' : 'mdi:unfold-more-horizontal'"
                :styleType="ButtonStyleType.NEUTRAL_OUTLINED"
                :size="ButtonSize.MD" 
            />
        </div>

        <VerticalExpansionTransition v-show="isOpen">
            <slot />
        </VerticalExpansionTransition>
    </div>
</template>

<script setup lang="ts">
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
