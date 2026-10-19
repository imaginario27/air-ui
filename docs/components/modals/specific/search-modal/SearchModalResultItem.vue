<template>
    <div class="flex flex-col">
        <button
            type="button"
            :data-search-to="to"
            :class="[rowClass, 'py-2.5 pl-3 pr-2', isActive(to) && activeClass]"
            @click="emit('item-clicked', to)"
            @mouseenter="emit('hover', to)"
        >
            <span :class="iconBoxClass">
                <Icon name="mdi:file-document-outline" iconClass="w-[18px] h-[18px]" />
            </span>

            <span class="flex flex-col min-w-0 flex-1">
                <span class="truncate text-sm font-semibold">
                    <template v-for="(part, index) in highlight(text)" :key="index">
                        <mark v-if="part.isMatch" :class="markClass">{{ part.text }}</mark>
                        <template v-else>{{ part.text }}</template>
                    </template>
                </span>
                <span v-if="breadcrumbs" class="truncate text-xs text-text-neutral-subtle">
                    {{ breadcrumbs }}
                </span>
            </span>

            <Icon name="mdi:chevron-right" iconClass="w-[18px] h-[18px] shrink-0" />
        </button>

        <div
            v-if="sections.length"
            class="ml-7 mt-1 pl-3 flex flex-col gap-1 border-l border-border-neutral-subtle [.dark_&]:border-border-default"
        >
            <button
                v-for="section in sections"
                :key="section.to"
                type="button"
                :data-search-to="section.to"
                :class="[rowClass, 'items-start py-2 pl-2 pr-2', isActive(section.to) && activeClass]"
                @click="emit('item-clicked', section.to)"
                @mouseenter="emit('hover', section.to)"
            >
                <Icon name="mdi:pound" iconClass="w-[16px] h-[16px] shrink-0 mt-0.5" />

                <span class="flex flex-col min-w-0 flex-1 gap-0.5">
                    <span class="truncate text-sm font-medium">
                        <template v-for="(part, index) in highlight(section.text)" :key="index">
                            <mark v-if="part.isMatch" :class="markClass">{{ part.text }}</mark>
                            <template v-else>{{ part.text }}</template>
                        </template>
                    </span>

                    <span v-if="section.excerpt" class="line-clamp-2 text-xs text-text-neutral-subtle">
                        <template v-for="(part, index) in highlight(section.excerpt)" :key="index">
                            <mark v-if="part.isMatch" :class="markClass">{{ part.text }}</mark>
                            <template v-else>{{ part.text }}</template>
                        </template>
                    </span>
                </span>

                <Icon name="mdi:chevron-right" iconClass="w-[16px] h-[16px] shrink-0 mt-0.5" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
    text: {
        type: String as PropType<string>,
        default: 'Result text',
    },
    breadcrumbs: String as PropType<string>,
    to: {
        type: String as PropType<string>,
        required: true,
    },
    sections: {
        type: Array as PropType<SearchSectionItem[]>,
        default: () => [],
    },
    query: {
        type: String as PropType<string>,
        default: '',
    },
    activeTo: String as PropType<string>,
})

// Emits
const emit = defineEmits(['item-clicked', 'hover'])

// Classes
const rowClass = 'w-full flex items-center gap-3 text-left text-text-default rounded-md transition-colors duration-150'
const activeClass = 'bg-background-neutral-subtler [.dark_&]:bg-background-surface'
const iconBoxClass =
    'flex items-center justify-center shrink-0 w-8 h-8 rounded-lg border bg-background-surface border-border-default'
const markClass = 'bg-background-primary-brand-soft text-text-primary-brand-default font-bold rounded-sm'

// Methods
const isActive = (to: string) => props.activeTo === to

const highlight = (value: string) => {
    const terms = props.query
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`))

    if (!terms.length) return [{ text: value, isMatch: false }]

    const pattern = new RegExp(`(${terms.join('|')})`, 'gi')

    // Splitting with a capture group puts every match at an odd index
    return value
        .split(pattern)
        .map((part, index) => ({ text: part, isMatch: index % 2 === 1 }))
        .filter((part) => part.text)
}
</script>
