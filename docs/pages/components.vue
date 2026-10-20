<template>
    <PageHero
        :title="title"
        description="Explore the official AirUI component library, including buttons, forms, modals, and more."
        badge="Component library"
        badgeIcon="mdi:cube-outline"
        backgroundImage="/images/components-hero-bg.webp"
    >
        <!-- Category chips -->
        <div v-if="categories.length" class="flex flex-wrap gap-2">
            <button
                v-for="category in categories"
                :key="category"
                type="button"
                class="cursor-pointer rounded-full border border-text-neutral-on-filled/20 bg-text-neutral-on-filled/10 px-3 py-1 text-sm font-medium text-text-neutral-on-filled backdrop-blur-md transition-colors hover:bg-text-neutral-on-filled/25"
                @click="scrollToCategory(category)"
            >
                {{ category }}
            </button>
        </div>

        <!-- Stats -->
        <dl class="flex flex-wrap gap-x-8 gap-y-2 pt-2 text-text-neutral-on-filled">
            <div v-for="stat in stats" :key="stat.label" class="flex items-baseline gap-2">
                <dt class="text-2xl font-bold">{{ stat.value }}</dt>
                <dd class="text-sm text-text-neutral-on-filled/70">{{ stat.label }}</dd>
            </div>
        </dl>
    </PageHero>

    <div class="flex justify-center px-4 pt-[5vh]">
        <ComponentsPage class="max-w-300 px-0!" />
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    title: 'Components',
})

// States
const title = ref('Components')
const searchQuery = useState<string>('components-search', () => '')

// Computed
const categories = computed(() => componentList.filter((item) => item.isSectionTitle).map((item) => item.title))

const stats = computed(() => [
    { value: componentList.filter((item) => !item.isSectionTitle).length, label: 'components' },
    { value: categories.value.length, label: 'categories' },
])

// Methods
const scrollToCategory = (category: string) => {
    searchQuery.value = ''
    nextTick(() => {
        document
            .getElementById(`component-group-${category.toLowerCase().replace(/\s+/g, '-')}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
}
</script>
