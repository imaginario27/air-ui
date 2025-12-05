<template>
    <h1 
        :class="[
            'text-3xl md:text-4xl', 
            'font-semibold',
            'leading-tight',
            'mt-12 first:mt-0',
            'mb-6',
            'text-text-default',
            isMobile ? 'scroll-mt-[88px]' : 'scroll-mt-[140px]',
        ]"
    >
        <slot />
    </h1>
</template>
<script lang="ts" setup>
// Composables
const { isMobile } = useIsMobile()
</script>