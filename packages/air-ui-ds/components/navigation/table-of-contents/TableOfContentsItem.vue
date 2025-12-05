<template>
    <li>
        <a
            :href="`#${link.id}`"
            :class="[
                'hover:text-text-primary-brand-hover',
                'font-medium text-text-neutral-subtle',
                link.depth !== 2 && 'pl-4',
                activeId === link.id && 'text-text-primary-brand-active font-semibold',
            ]"
        >
            {{ link.text }}
        </a>
        <ul
            v-if="link.children?.length"
            class="mt-1 space-y-1"
        >
            <TableOfContentsItem
                v-for="(child, index) in link.children"
                :key="index"
                :link="child"
                :activeId
            />
        </ul>
    </li>
</template>

<script setup lang="ts">
// Props
defineProps({
    link: {
        type: Object as PropType<TOCLink>,
        required: true,
    },
    activeId: {
        type: String as PropType<string | null>,
        default: null,
    },
})
</script>
