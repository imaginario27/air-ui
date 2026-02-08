<template>
    <li>
        <a
            href="#"
            :class="[
                'hover:text-text-primary-brand-hover',
                'font-medium text-text-neutral-subtle',
                link.depth !== 2 && 'pl-4',
                activeId === link.id && 'text-text-primary-brand-active font-semibold',
            ]"
            @click.prevent="handleClick"
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
                @click="emit('itemClick')"
            />
        </ul>
    </li>
</template>

<script setup lang="ts">
const props = defineProps({
    link: {
        type: Object as PropType<TOCLink>,
        required: true,
    },
    activeId: {
        type: String as PropType<string | null>,
        default: null,
    },
})

// Emits
const emit = defineEmits(['itemClick'])

// Methods
const handleClick = () => {
    const el = document.getElementById(props.link.id)

    if (el) {
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })

        // Update the hash in the URL
        history.replaceState(history.state, '', `#${props.link.id}`)
    }

    emit('itemClick')
}
</script>
