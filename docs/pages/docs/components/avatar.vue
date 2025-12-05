
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
    title: 'Avatar',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Displays a user image or fallback initials, commonly used in user interfaces to represent a person or account.'
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
        text: 'Avatar',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/avatar`,
    },
    {
        text: 'Avatar stack',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/avatar-stack`,
    },
]
</script>