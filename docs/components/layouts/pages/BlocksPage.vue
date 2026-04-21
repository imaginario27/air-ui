<template>
    <Section class="!gap-6">
        <SectionHeader v-if="blockList.length">
            <Form>
                <FormRow>
                    <SearchField 
                        id="search"
                        v-model="searchQuery"
                        placeholder="Search a block"
                        :size="InputSize.LG"
                        :maxLength="FormFieldMaxLength.SEARCH"
                        inputCustomClass="bg-background-neutral-subtlest/60"
                    />
                </FormRow>
            </Form>
        </SectionHeader>
        <SectionBody>
            <template v-if="groupedBlocks.length">
                <div 
                    v-for="group in groupedBlocks" 
                    :key="group.title" 
                    class="mb-12"
                >
                    <Heading 
                        :size="HeadingSize.SM"
                        headingTag="h2"
                        :class="[
                            'mb-8',
                            'flex',
                            'items-center',
                            'gap-2',
                        ]"
                    >
                        <template #title>
                            <Icon
                                v-if="group.sectionIcon"
                                :name="group.sectionIcon"
                                class="relative top-[2px]"
                            />
                            {{ group.title }}
                        </template>
                    </Heading>
    
                    <Grid :cols="4">
                        <ContentItem 
                            v-for="item in group.items"
                            :key="item.to"
                            :title="item.title"
                            :to="item.to"
                            :imgUrl="item.imgUrl"
                            :description="item.description"
                            imgHoverIconClass="text-icon-primary-brand-default"
                            :imgContainerClass="isDark ? 'bg-theme-neutral-950' : 'bg-background-neutral-subtlest/60'"
                            :imgHoverEffect="ImageHoverEffect.ZOOM_IN"
                            :hasImageHoverIcon="false"
                        />
                    </Grid>
                </div>
            </template>

            <EmptyState 
                v-else-if="!groupedBlocks.length"
                :title="`No blocks found for ${searchQuery}`"
                icon="mdi:magnify"
                description="Try with another search input."
                hasContainer
                :containerStyle="EmptyPlaceholderContainerStyle.FILLED_NEUTRAL"
            />

            <EmptyState 
                v-else-if="!blockList.length"
                title="No blocks available"
                icon="mdi:database-off"
                description="There are currently no blocks to display."
                hasContainer
                :containerStyle="EmptyPlaceholderContainerStyle.FILLED_NEUTRAL"
            />
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
// States
const searchQuery = ref('')

// Stores
const darkModeStore = useDarkMode()
const { isDark } = darkModeStore

// Computed
const groupedBlocks = computed<GroupedBlockPortfolioItem[]>(() => {
    const query = searchQuery.value.trim().toLowerCase()
    const groups: GroupedBlockPortfolioItem[] = []
    let currentGroup: GroupedBlockPortfolioItem | null = null

    for (const item of blockList) {
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