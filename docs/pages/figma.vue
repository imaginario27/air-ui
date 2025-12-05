<template>
    <Section 
        :spacing="SectionSpacing.XL"
        class="bg-background-primary-brand-soft/30"
    >
        <SectionBody>
            <Heading 
                :title
                description="Explore the official AirUI design system in Figma — including components, tokens, and layout guidelines."
                :align="Align.CENTER"
            />
        </SectionBody>
    </Section>
    <Section>
        <SectionBody>
            <ContentPlaceholder 
                text="Under construction"
                class="h-[200px]"
            />
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
const title = ref('Figma')

useHead(() => ({
    title: pageTitle(title.value, App.NAME),
}))
</script>