<template>
    <output
        :aria-label="ariaLabel ?? dsConfig.accessibility.spinnerText()"
        :class="[
            'animate-spin',
            'rounded-full',
            'h-4',
            'w-4',
            'border-2',
            'border-border-primary-brand-default',
            'border-t-transparent',
        ]"
    />
</template>

<script setup lang="ts">
defineProps({
    ariaLabel: String as PropType<string>,
})

const dsConfig = useDSConfig()
</script>
