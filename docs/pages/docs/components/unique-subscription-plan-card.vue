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
    title: 'Unique subscription plan card',
    layout: 'docs',
    overtitle: 'Components',
    description: 'Displays a detailed unique subscription plan with a list of features and a prominently styled pricing panel—ideal for showcasing tiered pricing options in comparison sections.',
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

// States
const activeIndex = ref(2)

// Tabs
const tabs: TabItem[] = [
    {
        text: 'CurrentActiveSubscriptionCard',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/current-active-subscription-card`,
    },
    {
        text: 'SubscriptionPlanCard',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/subscription-plan-card`,
    },
    {
        text: 'UniqueSubscriptionPlanCard',
        to: `/${AppSlug.DOCS}/${AppSlug.COMPONENTS}/unique-subscription-plan-card`,
    },
]
</script>