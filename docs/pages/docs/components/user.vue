
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
    title: 'User',
    layout: 'docs',
    overtitle: 'Components',
    description: 'A lightweight User component for displaying a user avatar and name. It is used to display users in tables, lists, and other places where user information is needed.'
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(0)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'User',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/user`,
    },
    {
        text: 'Author',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/author`,
    },
]
</script>