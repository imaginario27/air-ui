<template>
    <div 
        :class="[
            'flex',
            'flex-col',
            'gap-4',
            'w-full',
            hasOverflow && 'overflow-x-auto',
            'pb-3',
        ]"
    >
        <table class="table-auto w-full border-collapse">
            <slot />
        </table>
    </div>
</template>

<script setup>
// Props
defineProps({
    hasOverflow: {
        type: Boolean,
        default: true,
    },
})
</script>
