<template>
    <td 
        :class="[
            'px-3',
            'py-3.5',
            'border-t',
            'border-border-neutral-subtle',
            'text-sm',
            fitToContent ? 'w-[1%]' : 'w-auto',
            to ? 'hover:cursor-pointer' : undefined
        ]"
        @click="handleNavigation"
    >
        <slot />
    </td>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    fitToContent: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    to: String as PropType<string>,
})

// Navigation handler
const handleNavigation = () => {
    if (props.to) {
        navigateTo(props.to)
    }
}
</script>