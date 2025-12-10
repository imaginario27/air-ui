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
                            :to="`/${AppSlug.DOCS}/`"
                            isMobileFullWidth
                        />
                        <ActionButton 
                            :size="ButtonSize.XXL"
                            :actionType="ButtonActionType.LINK"
                            text="Explore components"
                            :iconPosition="IconPosition.RIGHT"
                            icon="mdiArrowRightThin"
                            :to="`/${AppSlug.DOCS}/${AppSlug.COMPONENTS}`"
                            isMobileFullWidth
                        />
                    </div>

                    <!-- <div 
                        :class="[
                            'flex',
                            'items-center',
                            'gap-2',
                            'border border-border-default',
                            'hover:border-border-neutral-hover',
                            'hover:cursor-copy',
                            'w-fit',
                            'py-1 px-3',
                            'rounded-md'
                        ]"
                    >
                        <MdiIcon 
                            icon="mdiConsoleLine" 
                            preserveAspectRatio="xMidYMid meet"
                            class="w-[20px] h-[20px] text-icon-neutral-subtle" 
                        />

                        <span class="font-medium">
                            npm create air-ui-app@latest my-test-app
                        </span>


                        <button 
                            class="flex items-center justify-center w-[20px] h-[20px]"
                        >
                            <MdiIcon 
                                icon="mdiContentCopy" 
                                preserveAspectRatio="xMidYMid meet"
                                class="w-[20px] h-[20px] text-icon-neutral-subtle" 
                            />
                        </button>
                        
                    </div> -->

                    <List class="gap-4 mt-8">
                        <ListItem>
                            <Feature 
                                title="Built with Tailwind CSS"
                                description="Utility-first styling with full design freedom."
                                icon="mdiTailwind"
                            />
                        </ListItem>
                        <ListItem>
                            <Feature 
                                title="Optimized for Nuxt"
                                description="Auto-imported components, composables, and stores — zero config needed."
                                icon="mdiLightningBoltOutline"
                            />
                        </ListItem>
                        <ListItem>
                            <Feature 
                                title="Type-safe with TypeScript"
                                description="Fully typed API surface for a smoother developer experience."
                                icon="mdiLanguageTypescript"
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
                    icon="mdiWeb"
                />
                <Feature 
                    title="Icon support"
                    description="Easy integration with thousands of icons out of the box."
                    icon="mdiImageSearchOutline"
                />
                <Feature 
                    title="Custom fonts"
                    description="Add or override fonts effortlessly via CSS variables."
                    icon="mdiFormatFont"
                />
                <Feature 
                    title="Light & dark themes"
                    description="Automatic and manual theme switching with semantic colors."
                    icon="mdiThemeLightDark"
                />
                <Feature 
                    title="Internationalization (i18n) ready"
                    description="Built with internationalization in mind."
                    icon="mdiTranslate"
                />
                <Feature 
                    title="Production-ready"
                    description="Fast, lightweight, and scalable by default."
                    icon="mdiRocketLaunchOutline"
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
                                icon="mdiPaletteOutline"
                            />
                        </ListItem>
                        <ListItem>
                            <Feature 
                                title="Semantic color system"
                                description="Design with clarity using meaningful color names."
                                icon="mdiFormatColorFill"
                            />
                        </ListItem>
                        <ListItem>
                            <Feature 
                                title="Fast theme sync from Figma"
                                description="Import Figma's project theme tokens and quickly update your app's styles via script — no rebuild required."
                                icon="mdiSync"
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
                                icon="mdiCheckAll"
                            />
                        </ListItem>
                        <ListItem>
                            <Feature 
                                title="Tailwind-first customization"
                                description="Override styles using utility classes or extend with your own Tailwind config — no friction."
                                icon="mdiTune"
                            />
                        </ListItem>
                        <ListItem>
                            <Feature 
                                title="Flexible by design"
                                description="Every component is built to be composable, prop-driven, and adaptable to your specific UI needs."
                                icon="mdiShapeOutline"
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

// States
/* const currentCopyButtonIcon = ref("mdiContentCopy")
const createAppCommand = ref("npm create air-ui-app@latest <project_name>")


const handleCopyScript = async () => {
    try {
        await navigator.clipboard.writeText(createAppCommand.value)
    } catch {
   
    }

    currentCopyButtonIcon.value = "mdiCheck"

    setTimeout(() => {
        currentCopyButtonIcon.value = "mdiContentCopy"
    }, 1500)

} */
</script>