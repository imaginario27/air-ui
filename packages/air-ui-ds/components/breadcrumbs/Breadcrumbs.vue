<template>
    <nav aria-label="breadcrumb">
        <ul
            :class="[
                'flex items-center space-x-2 text-icon-neutral-subtle font-medium',
            ]"
        >
            <!-- Home Link -->
            <li v-if="showHome">
                <NuxtLink to="/" class="flex items-center space-x-1">
                    <Icon 
                        :name="homeIcon"
                        :iconClass="[
                            'text-icon-neutral-subtle hover:text-icon-neutral-on-monochrome-hover-bg',
                            homeIconClass,
                        ]"
                    />
                </NuxtLink>
            </li>

            <!-- Dynamic Breadcrumbs -->
            <li
                v-for="(crumb, index) in displayedBreadcrumbs"
                :key="index"
                class="flex items-center space-x-2"
            >
                <!-- Chevron Separator -->
                <Icon
                    v-if="index > 0 || showHome"
                    :name="separatorIcon"
                    :iconClass="[
                        'text-icon-neutral-subtle',
                        separatorClass,
                    ]"
                />

                <!-- Breadcrumb (active or not) -->
                <component
                    :is="crumb.isCurrent ? 'span' : NuxtLink"
                    :to="!crumb.isCurrent ? crumb.to : undefined"
                    :class="[
                        'text-sm',
                        crumb.isCurrent
                            ? currentCrumbClass || 'text-text-default'
                            : 'text-text-neutral-subtle hover:text-text-default',
                        crumbClass,
                    ]"
                >
                    {{ crumb.label }}
                </component>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
// Imports
import { NuxtLink } from '#components'

// Props
const props = defineProps({
    showHome: {
        type: Boolean as PropType<boolean>,
        default: true,
    },
    homeIcon: {
        type: String as PropType<string>,
        default: 'mdi:home-outline',
    },
    separatorIcon: {
        type: String as PropType<string>,
        default: 'mdi:chevron-right',
    },
    includeCurrent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    homeIconClass: {
        type: String as PropType<string>,
        default: '',
    },
    separatorClass: {
        type: String as PropType<string>,
        default: '',
    },
    crumbClass: {
        type: String as PropType<string>,
        default: '',
    },
    currentCrumbClass: {
        type: String as PropType<string>,
        default: '',
    },
})

// Route
const route = useRoute()

// Generate all breadcrumbs from route segments
const allCrumbs = computed(() => {
    const pathSegments = route.path.split('/').filter(Boolean)

    return pathSegments.map((segment, index) => {
        return {
            label: segment
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            to: '/' + pathSegments.slice(0, index + 1).join('/'),
            isCurrent: index === pathSegments.length - 1,
        }
    })
})

// Filter crumbs based on `includeCurrent`
const displayedBreadcrumbs = computed(() => {
    if (props.includeCurrent) return allCrumbs.value
    return allCrumbs.value.slice(0, -1)
})
</script>
