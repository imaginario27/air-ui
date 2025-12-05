<template>
     <NuxtLink 
        v-if="redirectToHome"
        :to
    >
        <SVGImage 
            :src
            :alt="ariaLabel"
            :class="logoClass"
        />
    </NuxtLink>
    <div 
        v-else
        :class="logoClass" 
        :aria-label="ariaLabel"
        v-html="src" 
    />
</template>
<script setup lang="ts">
// Imports
import logo from '@/public/images/logo/air-ui-logo-color.svg?raw'

// Props
defineProps({
    src: {
        type: String as PropType<string>,
        default: logo
    },
    ariaLabel: {
        type: String as PropType<string>,
        default: 'App logo'
    },
    redirectToHome: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    to: {
        type: String as PropType<string>,
        default: '/',
    },
    logoClass: {
        type: String as PropType<string>,
        default: 'max-w-[118px]',
    }
})
</script>