<template>
    <Section>
        <SectionBody>
            <ContentRenderer 
                v-if="data" :value="data" 
            />
            <div v-else>Home not found</div>
        </SectionBody>
    </Section>
    
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Introduction',
    layout: 'docs',
    overtitle: 'Getting Started',
    description: 'Introduction to the documentation'
})

// Route
const route = useRoute()
const cleanPath = computed(() => route.path.split('?')[0].split('#')[0])

const { data } = await useAsyncData(() => queryCollection('content').path(cleanPath.value).first())

</script>