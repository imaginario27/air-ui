<template>
    <Section class="!gap-6 max-w-[1200px]">
        <SectionHeader v-if="utilList.length">
            <Form>
                <FormRow>
                    <SearchField 
                        id="search"
                        v-model="searchQuery"
                        placeholder="Search a util"
                        :size="InputSize.LG"
                        :maxLength="FieldMaxLength.SEARCH"
                        inputCustomClass="bg-background-neutral-subtlest/60"
                    />
                </FormRow>
            </Form>
        </SectionHeader>
        <SectionBody>
            <template v-if="groupedUtils.length">
                <div 
                    v-for="group in groupedUtils" 
                    :key="group.title"
                >
                    <Heading 
                        :size="HeadingSize.SM"
                        headingTag="h2"
                        :class="[
                            'mb-2',
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

                    <Table v-if="group.items.length">
                        <TableHeader>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Description</TableHeaderCell>
                        </TableHeader>
                        <TableBody>
                            <TableRow 
                                v-for="util in group.items" 
                                :key="util.title"
                            >
                                <TableCell fitToContent class="whitespace-nowrap">
                                    <ProseCode>
                                        <NavLink 
                                            :text="util.title"
                                            :to="util.to"
                                        >
                                            {{ util.title }}
                                        </NavLink>
                                    </ProseCode>
                                </TableCell>
                                <TableCell>
                                    {{ util.description }}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </template>

            <EmptyState 
                v-else-if="!groupedUtils.length"
                :title="`No utils found for ${searchQuery}`"
                icon="mdi:magnify"
                description="Try with another search input."
                hasContainer
                :containerStyle="EmptyPlaceholderContainerStyle.FILLED_NEUTRAL"
            />

            <EmptyState 
                v-else-if="!utilList.length"
                title="No utils available"
                icon="mdi:database-off"
                description="There are currently no utilities to display."
                hasContainer
                :containerStyle="EmptyPlaceholderContainerStyle.FILLED_NEUTRAL"
            />
        </SectionBody>
    </Section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Utils',
    layout: 'docs',
    description: 'Explore a growing collection of utility functions and helpers designed to simplify your development process and enhance your projects within Air UI.',
})

// States
const searchQuery = ref('')

// Computed
const groupedUtils = computed<GroupedUtilPortfolioItem[]>(() => {
    const query = searchQuery.value.trim().toLowerCase()
    const groups: GroupedUtilPortfolioItem[] = []
    let currentGroup: GroupedUtilPortfolioItem | null = null

    for (const item of utilList) {
        if (item.isSectionTitle) {
            currentGroup = {
                title: item.title,
                sectionIcon: item.sectionIcon,
                items: [],
            }
            groups.push(currentGroup)
        } else if (currentGroup) {
            const matches =
                !query ||
                item.title.toLowerCase().includes(query) ||
                item.description?.toLowerCase().includes(query)

            if (matches) {
                currentGroup.items.push(item)
            }
        }
    }

    for (const group of groups) {
        group.items.sort((a, b) => a.title.localeCompare(b.title))
    }

    return query
        ? groups.filter(group => group.items.length > 0)
        : groups
})
</script>
