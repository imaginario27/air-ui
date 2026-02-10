<template>
    <aside 
        :class="[
            'flex',
            'flex-col',
            'gap-3',
            'w-full',
            'pt-12',
            'pb-8',
            'px-content-side-padding-mobile md:px-content-side-padding',
            'bg-background-surface',
            'fixed right-0',
            'overflow-y-auto',
        ]"
        :style="{
            maxWidth: maxWidth + 'px',
            height: `calc(100vh - ${topOffset}px)`,
        }"
    >
        <TableOfContents
            :title
            :links
        />
    </aside>
    
</template>
<script setup lang="ts">
defineProps({
    title: String as PropType<string>,
    links: Array as PropType<TOCLink[]>,
    maxWidth: {
        type: Number as PropType<number>,
        default: 240,
    },
    topOffset: {
        type: Number,
        default: 0,
    },
})
</script>