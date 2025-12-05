<template>
    <h5 
        :class="[
            'text-base md:text-lg',
            'font-medium',
            'leading-snug',
            'mt-5',
            'mb-2',
            'text-text-default',
            isMobile ? 'scroll-mt-[88px]' : 'scroll-mt-[140px]',
        ]"
    >
        <slot />
    </h5>
</template>
<script lang="ts" setup>
// Composables
const { isMobile } = useIsMobile()
</script>
