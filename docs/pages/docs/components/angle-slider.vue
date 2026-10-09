<template>
    <Section>
        <SectionBody>
            <ContentRenderer
                v-if="data" :value="data"
            />
            <ContentRenderFallback v-else />
        </SectionBody>
    </Section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'AngleSlider',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Circular dial slider that selects an angle from 0 to 360 degrees by dragging a thumb around a ring.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>
