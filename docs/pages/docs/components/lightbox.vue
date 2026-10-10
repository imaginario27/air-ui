<template>
    <Section>
        <SectionBody>
            <ContentRenderer
                v-if="data"
                :value="data"
            />
            <ContentRenderFallback v-else />
        </SectionBody>
    </Section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Lightbox',
    layout: 'docs',
    overtitle: 'Components',
    description: 'A fullscreen image viewer with gallery navigation, swipe and keyboard support.',
})

const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>
