<template>
    <Section>
        <SectionBody>
            <!-- Filter -->
            <div>
                <Form>
                    <FormRow>
                        <SearchField 
                            id="search"
                            v-model="searchQuery"
                            placeholder="Search a component"
                            :size="InputSize.LG"
                            :maxLength="FieldMaxLength.SEARCH"
                        />
                    </FormRow>
                </Form>
            </div>

            <div 
                v-for="group in groupedComponents" 
                :key="group.title" 
                class="mb-12"
            >
                <h2 
                    :class="[
                        'text-2xl',
                        'font-bold',
                        'mb-8',
                        'flex',
                        'items-center',
                        'gap-2',
                    ]"
                >
                    <Icon
                        v-if="group.sectionIcon"
                        :name="group.sectionIcon"
                    />
                    {{ group.title }}
                </h2>

                <Grid :cols="4">
                    <ContentItem 
                        v-for="item in group.items"
                        :key="item.to"
                        :title="item.title"
                        :to="item.to"
                        :imgUrl="item.imgUrl"
                        :description="item.description"
                        imgHoverIconClass="text-icon-primary-brand-default"
                        imgContainerClass="bg-background-neutral-subtlest/60"
                        :imgHoverEffect="ImageHoverEffect.ZOOM_IN"
                        :hasImageHoverIcon="false"
                    />
                </Grid>
            </div>

            <EmptyState 
                v-if="!groupedComponents.length"
                :title="`No components found for ${searchQuery}`"
                icon="mdi:magnify"
                description="Try with another search input."
                hasContainer
                :containerStyle="EmptyPlaceholderContainerStyle.FILLED_NEUTRAL"
            />
          
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
definePageMeta({
    title: 'Components',
    layout: 'docs',
    description: 'Explore a growing collection of beautifully designed, fully responsive UI components built with Tailwind CSS — ready to copy, customize, and drop into your project with ease.',
})

// States
const searchQuery = ref('')

// Computed
const groupedComponents = computed<GroupedComponentPortfolioItem[]>(() => {
    const query = searchQuery.value.trim().toLowerCase()
    const groups: GroupedComponentPortfolioItem[] = []
    let currentGroup: GroupedComponentPortfolioItem | null = null

    for (const item of componentList) {
        if (item.isSectionTitle) {
            // Create a new group
            currentGroup = {
                title: item.title,
                sectionIcon: item.sectionIcon,
                items: [],
            }
            groups.push(currentGroup)
        } else if (currentGroup) {
            // Filter items by query match (title or description)
            const matches =
                !query ||
                item.title.toLowerCase().includes(query) ||
                item.description?.toLowerCase().includes(query)

            if (matches) {
                currentGroup.items.push(item)
            }
        }
    }

    // Sort only the items within each group alphabetically by title
    for (const group of groups) {
        group.items.sort((a, b) => a.title.localeCompare(b.title))
    }

    // Remove empty groups when search is active
    return query
        ? groups.filter(group => group.items.length > 0)
        : groups
})
</script>