<template>
    <Section 
        :spacing="SectionSpacing.XL" 
        hasContentMaxWidth
    >
        <SectionBody>
            <div class="flex flex-col md:flex-row gap-10">
                <div class="w-full flex flex-col gap-8">
                    <h1 
                        :class="[
                            'text-5xl',
                            'sm:text-7xl',
                            'tracking-tight',
                            'font-bold',
                        ]"
                    >
        
                        Build modern Nuxt apps — faster with
                        <span class="text-text-primary-brand-default">AirUI</span>
                    </h1>

                    <p 
                        :class="[
                            'text-text-neutral-subtle',
                            'text-lg',
                            'sm:text-xl/8',
                        ]"
                    >
                        A lightweight, flexible UI framework for Nuxt, powered by Tailwind CSS.  
                        Fully customizable and built for speed.
                    </p>

                    <div class="flex flex-col sm:flex-row gap-4">
                        <ActionButton 
                            :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
                            :size="ButtonSize.XXL"
                            :actionType="ButtonActionType.LINK"
                            text="Get started"
                            :to="`/${AppSlug.DOCS}/${AppSlug.GETTING_STARTED}`"
                            isMobileFullWidth
                        />
                        <ActionButton 
                            :size="ButtonSize.XXL"
                            :actionType="ButtonActionType.LINK"
                            text="Explore components"
                            :iconPosition="IconPosition.RIGHT"
                            icon="mdi:arrow-right-thin"
                            :to="`/${AppSlug.DOCS}/${AppSlug.COMPONENTS}`"
                            isMobileFullWidth
                        />
                    </div>

                    <!-- <CodeSnippet 
                        code="npm create air-ui-app@latest <project_name>"
                    />
 -->
                    <List class="gap-4 mt-8">
                        <ListItem>
                            <Feature 
                                title="Built with Tailwind CSS"
                                description="Utility-first styling with full design freedom."
                                icon="mdi:tailwind"
                            />
                        </ListItem>
                        <ListItem>
                            <Feature 
                                title="Optimized for Nuxt"
                                description="Auto-imported components, composables, and stores — zero config needed."
                                icon="mdi:lightning-bolt-outline"
                            />
                        </ListItem>
                        <ListItem>
                            <Feature 
                                title="Type-safe with TypeScript"
                                description="Fully typed API surface for a smoother developer experience."
                                icon="mdi:language-typescript"
                            />
                        </ListItem>
                    </List>
                </div>
                <ContentPlaceholder />
            </div>
        </SectionBody>
    </Section>

    <Divider />

    <Section 
        :spacing="SectionSpacing.LG"
        hasContentMaxWidth
    >
        <SectionBody>
            <Grid>
                <Feature 
                    title="Modern web standards"
                    description="Built using the latest Vue and Nuxt features."
                    icon="mdi:web"
                />
                <Feature 
                    title="Icon support"
                    description="Easy integration with thousands of icons out of the box."
                    icon="mdi:image-search-outline"
                />
                <Feature 
                    title="Custom fonts"
                    description="Add or override fonts effortlessly via CSS variables."
                    icon="mdi:format-font"
                />
                <Feature 
                    title="Light & dark themes"
                    description="Automatic and manual theme switching with semantic colors."
                    icon="mdi:theme-light-dark"
                />
                <Feature 
                    title="Internationalization (i18n) ready"
                    description="Built with internationalization in mind."
                    icon="mdi:translate"
                />
                <Feature 
                    title="Production-ready"
                    description="Fast, lightweight, and scalable by default."
                    icon="mdi:rocket-launch-outline"
                />
            </Grid>
        </SectionBody>
    </Section>

    <Divider />

    <Section 
        :spacing="SectionSpacing.XL"
        hasContentMaxWidth
    >
        <SectionBody>
            <div class="flex flex-col md:flex-row gap-8">
                <div class="w-full flex flex-col gap-8">
                    <Heading 
                        headingTag="h2"
                        title="Consistent design system"
                        description="A powerful foundation of tokens, themes, and design rules that ensures visual consistency across your app."
                    />

                    <List class="gap-4">
                        <ListItem>
                            <Feature 
                                title="CSS variables & theming"
                                description="Customize spacing, typography, and color tokens with ease."
                                icon="mdi:palette-outline"
                            />
                        </ListItem>
                        <ListItem>
                            <Feature 
                                title="Semantic color system"
                                description="Design with clarity using meaningful color names."
                                icon="mdi:format-color-fill"
                            />
                        </ListItem>
                        <ListItem>
                            <Feature 
                                title="Fast theme sync from Figma"
                                description="Import Figma's project theme tokens and quickly update your app's styles via script — no rebuild required."
                                icon="mdi:sync"
                            />
                        </ListItem>
                    </List>
                </div>

                <ContentPlaceholder />
            </div>
        </SectionBody>
    </Section>

    <Divider />

    <Section 
        :spacing="SectionSpacing.XL"
        hasContentMaxWidth
    >
        <SectionBody>
            <div class="flex flex-col md:flex-row gap-8">
                <div class="w-full flex flex-col gap-8">
                    <Heading 
                        headingTag="h2"
                        title="Flexible & customizable components"
                        description="A rich set of production-ready UI components built for Nuxt and styled with Tailwind. Easy to adapt to any project."
                    />

                    <List class="gap-4">
                        <ListItem>
                            <Feature 
                                title="Complete component library"
                                description="Forms, tables, modals, alerts, menus, tabs, and more — ready to drop into your project."
                                icon="mdi:check-all"
                            />
                        </ListItem>
                        <ListItem>
                            <Feature 
                                title="Tailwind-first customization"
                                description="Override styles using utility classes or extend with your own Tailwind config — no friction."
                                icon="mdi:tailwind"
                            />
                        </ListItem>
                        <ListItem>
                            <Feature 
                                title="Flexible by design"
                                description="Every component is built to be composable, prop-driven, and adaptable to your specific UI needs."
                                icon="mdi:shape-outline"
                            />
                        </ListItem>
                    </List>
                </div>

                <ContentPlaceholder />
            </div>
        </SectionBody>
    </Section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Welcome',
})
</script>