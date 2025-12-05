<template>
    <div 
        :class="[
            'flex',
            'gap-4',
            'w-full',
            reverseOnMobile ? 'flex-col-reverse md:flex-row' : 'flex-col md:flex-row'
        ]"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
// Props
defineProps({
    reverseOnMobile: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
})
</script>
