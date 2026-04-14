
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
    title: 'Avatar stack',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Displays a group of user avatars in a stacked layout, often used to represent a list of participants, collaborators, or team members.'
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
        text: 'Avatar',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/avatar`,
    },
    {
        text: 'Avatar stack',
        to: `/${DocsAppSlug.DOCS}/${DocsAppSlug.COMPONENTS}/avatar-stack`,
    },
]
</script>