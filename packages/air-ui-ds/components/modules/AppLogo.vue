<template>
    <NuxtLink
        :to
    >
        <SVGImage 
            :src
            :alt="ariaLabel"
            :class="logoClass"
        />
    </NuxtLink>
</template>
<script setup lang="ts">
// Props
defineProps({
    src: {
        type: String as PropType<string>,
        required: true
    },
    ariaLabel: {
        type: String as PropType<string>,
        default: 'App logo'
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