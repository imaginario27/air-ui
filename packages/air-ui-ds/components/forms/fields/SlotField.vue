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

        <!-- Slot container -->
        <div 
            :id
            :class="[disabled && 'cursor-not-allowed opacity-disabled']"
        >
            <slot 
                :id
                :error
                :hasError 
                :helpText
                :disabled
                :required
            />
        </div>

        <!-- Help / Error -->
        <p 
            v-if="hasError || helpText" 
            :class="[
                'text-xs text-left',
                hasError ? 'text-text-error' : 'text-text-neutral-subtle',
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
    helpText: String as PropType<string>,
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