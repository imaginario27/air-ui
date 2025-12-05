<template>
    <aside 
        :class="[
            'flex',
            'flex-col',
            'gap-3',
            'w-full',
            'max-w-[240px]',
            'pt-12',
            'pb-8',
            'px-content-side-padding-mobile md:px-content-side-padding',
            'bg-background-container-surface',
            'h-screen',
            'fixed right-0'
        ]"
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
})
</script>