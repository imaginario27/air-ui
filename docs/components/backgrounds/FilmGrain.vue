<template>
    <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/><feColorMatrix type=%22saturate%22 values=%220%22/><feComponentTransfer><feFuncA type=%22linear%22 slope=%221.4%22/></feComponentTransfer></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]"
        :style="{ opacity }"
    />
</template>
<script setup lang="ts">
defineProps({
    opacity: {
        type: Number,
        default: 0.8,
    },
})
</script>
