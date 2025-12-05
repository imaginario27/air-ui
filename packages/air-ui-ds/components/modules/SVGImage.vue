<template>
    <div
        class="responsive-svg w-full"
        :aria-label="alt"
        :class="colorClass"
        v-html="processedSvg"
    />
</template>

<script setup lang="ts">
const props = defineProps({
    src: {
        type: String as PropType<string>,
        required: true
    },
    alt: {
        type: String as PropType<string>,
        default: 'Vector image'
    },
    color: {
        type: String as PropType<string>,
        default: ''
    },
})

// Dynamically process the SVG
const processedSvg = computed(() => {
    let svg = props.src
        .replace(/width="\d+"/g, '')
        .replace(/height="\d+"/g, '')

    // Only replace fills/strokes if a color was provided
    if (props.color) {
        svg = svg
            .replace(/fill="(.*?)"/g, 'fill="currentColor"')
            .replace(/stroke="(.*?)"/g, 'stroke="currentColor"')
    }

    return svg
})

// Apply color class if defined
const colorClass = computed(() => props.color || '')
</script>
