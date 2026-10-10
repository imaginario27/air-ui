<template>
    <Lightbox
        v-model="showLightbox"
        :images
    />
    <ActionButton
        :styleType="ButtonStyleType.NEUTRAL_FILLED"
        text="Open lightbox"
        @click="showLightbox = true"
    />
</template>
<script setup lang="ts">
const showLightbox = ref(false)

const images: GalleryImage[] = [
    { id: '1', src: 'https://picsum.photos/id/1015/1200/800', alt: 'Image of a river between mountains', caption: 'River valley' },
    { id: '2', src: 'https://picsum.photos/id/1018/1200/800', alt: 'Image of a green mountain range', caption: 'Mountain range' },
    { id: '3', src: 'https://picsum.photos/id/1043/1200/800', alt: 'Image of a quiet lake', caption: 'Quiet lake' },
]
</script>
