<template>
    <nav aria-label="breadcrumb">
        <ul class="flex items-center space-x-2 text-gray-500">
            <!-- Home Link -->
            <li>
                <NuxtLink to="/" class="flex items-center space-x-1">
                    <MdiIcon 
                        icon="mdiHomeOutline" 
                        size="20" 
                        preserveAspectRatio="xMidYMid meet"
                        class="text-icon-neutral-subtler hover:text-icon-neutral-on-monochrome-hover-bg"
                    />
                </NuxtLink>
            </li>

            <!-- Dynamic Breadcrumbs (Stop at Previous Level) -->
            <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center space-x-2">
                <!-- Chevron Separator -->
                <MdiIcon 
                    icon="mdiChevronRight" 
                    size="20" 
                    preserveAspectRatio="xMidYMid meet"
                    class="text-icon-neutral-subtler"
                />

                <!-- Breadcrumb Link -->
                <NuxtLink 
                    :to="crumb.to" 
                    class="text-sm text-text-neutral-subtler hover:text-text-neutral-on-monochrome-hover-bg"
                >
                    {{ crumb.label }}
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>
<script setup lang="ts">
// Route
const route = useRoute()

// Generate breadcrumbs from route path, stopping at the previous level
const breadcrumbs = computed(() => {
    const pathSegments = route.path.split('/').filter(Boolean) // Remove empty values

    if (pathSegments.length <= 1) return [] // Stop at Home if only 1 segment

    return pathSegments.slice(0, -1).map((segment, index) => { // Exclude last segment
        return {
            label: segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), // Format text
            to: '/' + pathSegments.slice(0, index + 1).join('/') // Build breadcrumb path
        }
    })
})
</script>
