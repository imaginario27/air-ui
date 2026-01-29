<template>
    <AppHeader :showMobileSidebarToggle="false" />
    <MainContent :tocSidebarWidth="0">
        <slot />
    </MainContent>
    <Footer
        :class="[
            'border-t',
            'border-t-border-default',
        ]"
    >
        <span class="text-sm text-text-neutral-subtle">
            © 2025 
            <a 
                href="https://imaginario27.com/en" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="font-bold hover:text-text-primary-brand-default transition-colors"
            >
                Imaginario27
            </a>. Crafted with Nuxt & Tailwind CSS.
        </span>
    </Footer>
</template>