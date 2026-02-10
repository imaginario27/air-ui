<template>
    <NuxtLoadingIndicator :color="indicatorColor"/>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<script setup lang="ts">
// Composables
const darkModeStore = useDarkMode()
const { isDark } = darkModeStore

// Computed
const indicatorColor = computed(() => isDark ? '#687cff' : '#2319e9')
</script>