<template>
    <h3 
        :class="[
            'text-xl md:text-2xl',
            'font-semibold',
            'leading-snug',
            'mt-8',
            'mb-3',
            'text-text-default',
            isMobile ? 'scroll-mt-[88px]' : 'scroll-mt-[140px]',
        ]"
    >
        <slot />
    </h3>
</template>
<script lang="ts" setup>
// Composables
const { isMobile } = useIsMobile()
</script>
