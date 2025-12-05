<template>
    <h4 
        :class="[
            'text-lg md:text-xl',
            'font-medium',
            'leading-snug',
            'mt-6',
            'mb-2',
            'text-text-default',
            isMobile ? 'scroll-mt-[88px]' : 'scroll-mt-[140px]',
        ]"
    >
        <slot />
    </h4>
</template>
<script lang="ts" setup>
// Composables
const { isMobile } = useIsMobile()
</script>
