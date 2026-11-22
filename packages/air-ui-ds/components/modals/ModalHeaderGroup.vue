<template>
    <div :class="['flex flex-col gap-2', centered && 'text-center [&>h2]:pl-10']">
        <slot />
    </div>
</template>
<script setup lang="ts">
// Props
defineProps({
    centered: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
})
</script>
