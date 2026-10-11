<template>
    <Section>
        <SectionBody>
            <ContentRenderer v-if="data" :value="data" />
            <ContentRenderFallback v-else />
        </SectionBody>
    </Section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Calendar',
    layout: 'docs',
    overtitle: 'Components',
    description:
        'Displays a month grid to pick a single date or a date range, with day, month and year views, limits and keyboard navigation.',
})

const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())
</script>
