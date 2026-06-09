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
    title: 'Kbd',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Displays keyboard shortcuts as compact keycaps for command hints and context actions.',
})

const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>