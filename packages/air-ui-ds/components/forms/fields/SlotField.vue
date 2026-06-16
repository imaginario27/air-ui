<template>
    <div :class="['flex flex-col', 'w-full', 'gap-2']">
        <!-- Label -->
        <label 
            v-if="label" 
            :for="id" 
                :class="[
                'text-sm',
                'font-semibold',
                'text-left',
                hasError && 'text-text-error',
            ]"
        >
            {{ label }}
        </label>

        <!-- Help Text (top) -->
        <HelpText
            v-if="helpTextPosition === Position.TOP"
            :text="helpText"
            :error="error"
        />

        <!-- Slot container -->
        <div
            :id
            :class="[disabled && 'cursor-not-allowed opacity-disabled']"
        >
            <slot 
                :id
                :ariaLabel
                :error
                :hasError 
                :helpText
                :disabled
                :required
            />
        </div>

        <!-- Help Text (bottom) -->
        <HelpText
            v-if="helpTextPosition === Position.BOTTOM"
            :text="helpText"
            :error="error"
        />
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
    helpText: String as PropType<string>,
    helpTextPosition: {
        type: String as PropType<Position>,
        default: Position.BOTTOM,
        validator: (value: Position) => Object.values(Position).includes(value),
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
})

// Computed
const hasError = computed(() => props.error !== '')
</script>