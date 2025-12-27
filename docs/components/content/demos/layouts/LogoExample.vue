<template>
    <AppLogo
        :src="isDark ? logoDark : logoLight"
        to=""
        class="max-w-[80px]"
    />
</template>
<script setup lang="ts">
// Imports
import logoLight from '@/public/images/logo/air-ui-logo-color.svg?raw'
import logoDark from '@/public/images/logo/air-ui-logo-white.svg?raw'

// Stores
const darkModeStore = useDarkMode()
const { isDark } = darkModeStore
</script>