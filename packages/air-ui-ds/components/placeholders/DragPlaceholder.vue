<template>
    <div
        :class="[
            'w-full',
            'flex items-center justify-center',
            'rounded-lg',
            'border border-dashed border-border-default',
            'p-2',
        ]"
    >
        <span
            v-if="showText && resolvedText"
            :class="['text-xs', 'text-text-neutral-subtle', 'select-none', textClass]"
        >
            {{ resolvedText }}
        </span>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    text: String as PropType<string>,
    showText: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    textClass: String as PropType<string>,
})

// Composables
const dsConfig = useDSConfig()

// Computed
const resolvedText = computed(() => props.text ?? dsConfig.common.dropHereText())
</script>
