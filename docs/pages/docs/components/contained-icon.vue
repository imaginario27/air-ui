<template>
    <Section>
        <SectionBody>
            <TabBar v-model="activeIndex" :tabs />
            <ContentRenderer 
                v-if="data" :value="data" 
            />
            <ContentRenderFallback v-else />
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
definePageMeta({
    title: 'Contained icon',
    layout: 'docs',
    overtitle: 'Components',
    description: 'A component for displaying icons inside a styled container with background and padding.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(1)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'Icon',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/icon`,
    },
    {
        text: 'ContainedIcon',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/contained-icon`,
    },
]
</script>