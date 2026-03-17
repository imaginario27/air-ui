<template>
    <NuxtLink :to="to">
        <span 
            :class="[
                'font-medium',
                'transition-colors',
                'duration-150',
                activeClass
            ]"
        >
            {{ text }}
        </span>
    </NuxtLink>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Menu item',
    },
    to: {
        type: String as PropType<string>,
        default: '/',
    },
    detectActive: {
        type: Boolean,
        default: true,
    },
})

// Composables
const route = useRoute()

// Computed — return the class directly
const activeClass = computed(() => {
    const isActive = props.detectActive && route.path === props.to

    return isActive
        ? 'text-text-primary-brand-active'
        : 'hover:text-text-primary-brand-active text-text-default'
})
</script>
