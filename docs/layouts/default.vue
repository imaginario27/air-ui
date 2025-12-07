<template>
    <AppHeader :showMobileSidebarToggle="false"/>
    <MainContent :tocSidebarWidth="0">
        <slot />
    </MainContent>
</template>