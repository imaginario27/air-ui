
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
    title: 'Author',
    layout: 'docs',
    overtitle: 'Components',
    description: 'A reusable component for listing authors or contributors, showing their avatar, name, and role with support for flexible layout variations.'
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
        text: 'User',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/user`,
    },
    {
        text: 'Author',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/author`,
    },
]
</script>