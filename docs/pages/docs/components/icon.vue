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
    title: 'Icon',
    layout: 'docs',
    overtitle: 'Components',
    description: 'An Icon component to display various types of icons from Nuxt Mdi or Nuxt Icon module.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0]!.split('#')[0]!)

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(0)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'Icon',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/icon`,
    },
    {
        text: 'ContainedIcon',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/contained-icon`,
    },
]
</script>