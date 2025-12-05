<template>
    <h2 
        :class="[
            'text-2xl md:text-3xl',
            'font-semibold',
            'leading-snug',
            'mt-10 first:mt-0',
            'mb-4',
            'text-text-default',
            isMobile ? 'scroll-mt-[88px]' : 'scroll-mt-[140px]',
        ]"
    >
        <slot />
    </h2>
</template>
<script lang="ts" setup>
// Composables
const { isMobile } = useIsMobile()
</script>
