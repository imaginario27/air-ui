<template>
    <h6 
        :class="[
            'text-sm md:text-base',
            'font-medium',
            'uppercase',
            'tracking-wide',
            'mt-4',
            'mb-2',
            'text-text-neutral-subtle',
            isMobile ? 'scroll-mt-[88px]' : 'scroll-mt-[140px]',
        ]"
    >
        <slot />
    </h6>
</template>
<script lang="ts" setup>
// Composables
const { isMobile } = useIsMobile()
</script>

