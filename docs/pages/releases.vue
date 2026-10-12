<template>
    <Section :spacing="SectionSpacing.XL" class="bg-background-primary-brand-soft/30">
        <SectionBody>
            <Heading
                :title
                description="Stay up to date with the latest AirUI releases, improvements, and breaking changes."
                :align="Align.CENTER"
                headingTag="h1"
            />
        </SectionBody>
    </Section>

    <Section hasContentMaxWidth :spacing="SectionSpacing.MD">
        <SectionBody>
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <h2 class="text-xl font-semibold">Select package</h2>

                    <div class="flex flex-wrap gap-2">
                        <ActionButton
                            v-for="pkg in packageOptions"
                            :key="pkg.value"
                            :text="pkg.text"
                            :styleType="
                                selectedPackageName === pkg.value
                                    ? ButtonStyleType.PRIMARY_BRAND_FILLED
                                    : ButtonStyleType.NEUTRAL_FILLED
                            "
                            :size="ButtonSize.MD"
                            @click="selectedPackageName = pkg.value"
                        />
                    </div>
                </div>

                <div v-if="selectedPackage" class="flex flex-col gap-4">
                    <Heading title="Version range" :size="HeadingSize.XS" headingTag="h1" />

                    <Form class="max-w-3xl w-full">
                        <FormRow class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <SelectField
                                id="release-version-from"
                                v-model="selectedFromVersion"
                                :options="versionSelectOptions"
                                filterable
                                label="From"
                            />

                            <SelectField
                                id="release-version-to"
                                v-model="selectedToVersion"
                                :options="versionSelectOptions"
                                filterable
                                label="To"
                            />
                        </FormRow>
                    </Form>
                </div>

                <div v-if="rangedEntries.length && selectedPackage" class="flex flex-col gap-4">
                    <p class="text-sm text-text-neutral-subtle">
                        Showing {{ rangedEntries.length }} versions from {{ rangedEntries[0]?.version }} to
                        {{ rangedEntries[rangedEntries.length - 1]?.version }}.
                    </p>

                    <section
                        v-for="(entry, entryIndex) in rangedEntries"
                        :key="entry.version"
                        :class="[
                            'flex flex-col gap-5',
                            entryIndex > 0 && 'pt-12 mt-8 border-t border-border-neutral-subtle',
                        ]"
                    >
                        <div class="flex items-start justify-between gap-3">
                            <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
                                <h3 class="text-lg font-semibold">
                                    {{ selectedPackage.packageName }}
                                    <span class="text-text-primary-brand-default">{{ entry.version }}</span>
                                </h3>
                                <Badge
                                    :text="entry.releaseType"
                                    :color="getReleaseTypeColor(entry.releaseType)"
                                    :style="BadgeStyle.FILLED"
                                    :shape="BadgeShape.PILL"
                                    class="uppercase"
                                />
                                <span class="text-sm text-text-neutral-subtle">
                                    {{ entry.publishedAt }}
                                    <template v-if="entry.metadata?.commitCount"
                                        >· {{ formatCommitCount(entry.metadata.commitCount) }}</template
                                    >
                                </span>
                            </div>

                            <NavLink
                                :to="`https://www.npmjs.com/package/${selectedPackage.packageName}/v/${entry.version}`"
                                text="npm"
                                :size="NavLinkSize.SM"
                                :iconPosition="IconPosition.RIGHT"
                                icon="mdi:open-in-new"
                                isExternal
                                textClass="font-medium"
                                class="shrink-0"
                            />
                        </div>

                        <div class="flex flex-col gap-5">
                            <div
                                v-if="!getEntrySections(entry).length && getPublishedChangeGroups(entry).length"
                                class="flex flex-col gap-3"
                            >
                                <div
                                    v-for="group in getPublishedChangeGroups(entry)"
                                    :key="`${entry.version}-published-${group.title}`"
                                    class="flex flex-wrap items-center gap-1.5"
                                >
                                    <Badge :text="group.title" :color="group.color" :style="BadgeStyle.FLAT" />
                                    <Badge
                                        v-for="label in group.labels.slice(0, MAX_PUBLISHED_LABELS)"
                                        :key="label"
                                        :text="label"
                                        :color="ColorAccent.NEUTRAL"
                                        :style="BadgeStyle.BORDER"
                                        class="font-mono"
                                    />
                                    <span
                                        v-if="group.labels.length > MAX_PUBLISHED_LABELS"
                                        class="text-xs text-text-neutral-subtle"
                                    >
                                        +{{ group.labels.length - MAX_PUBLISHED_LABELS }} more
                                    </span>
                                </div>

                                <p class="text-sm text-text-neutral-subtle">
                                    No commits were recorded for this release. Changes were detected by comparing the
                                    published package with the previous version.
                                </p>
                            </div>

                            <p v-else-if="!getEntrySections(entry).length" class="text-sm text-text-neutral-subtle">
                                {{ entry.notes[0] }}
                            </p>

                            <div
                                v-for="section in getEntrySections(entry)"
                                :key="`${entry.version}-${section.title}`"
                                class="flex flex-col gap-2"
                            >
                                <div class="flex items-center gap-2">
                                    <Badge :text="section.title" :color="section.color" :style="BadgeStyle.FLAT" />
                                    <span class="text-sm text-text-neutral-subtle">
                                        {{ section.items.length }}
                                        {{ section.items.length === 1 ? 'change' : 'changes' }}
                                    </span>
                                </div>

                                <div class="flex flex-col gap-3">
                                    <Card
                                        v-for="item in section.items"
                                        :key="`${entry.version}-${section.title}-${item.label}`"
                                        :hasShadow="false"
                                        class="gap-2!"
                                    >
                                        <div class="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                                            <span class="font-medium">
                                                <template
                                                    v-for="(part, partIndex) in splitInlineCode(item.label)"
                                                    :key="partIndex"
                                                >
                                                    <ProseCode v-if="part.isCode" :class="INLINE_CODE_CLASS">
                                                        {{ part.text }}
                                                    </ProseCode>
                                                    <template v-else>{{ part.text }}</template>
                                                </template>
                                            </span>
                                            <div class="flex items-center gap-2 shrink-0">
                                                <NavLink
                                                    v-if="item.url"
                                                    :to="item.url"
                                                    :text="item.sha"
                                                    :size="NavLinkSize.SM"
                                                    :iconPosition="IconPosition.RIGHT"
                                                    icon="mdi:open-in-new"
                                                    isExternal
                                                    textClass="font-mono"
                                                />
                                                <ActionIconButton
                                                    v-if="hasItemDetails(item)"
                                                    :icon="
                                                        isItemCollapsed(item) ? 'mdi:chevron-down' : 'mdi:chevron-up'
                                                    "
                                                    :styleType="ButtonStyleType.NEUTRAL_TRANSPARENT"
                                                    :size="ButtonSize.XS"
                                                    :ariaLabel="
                                                        isItemCollapsed(item) ? 'Expand details' : 'Collapse details'
                                                    "
                                                    @click="toggleItem(item)"
                                                />
                                            </div>
                                        </div>

                                        <div
                                            v-if="item.affected.length && !isItemCollapsed(item)"
                                            class="flex flex-wrap items-center gap-1.5"
                                        >
                                            <Badge
                                                v-for="name in item.affected.slice(0, MAX_AFFECTED_TAGS)"
                                                :key="name"
                                                :text="name"
                                                :color="ColorAccent.NEUTRAL"
                                                :style="BadgeStyle.BORDER"
                                                class="font-mono"
                                            />
                                            <span
                                                v-if="item.affected.length > MAX_AFFECTED_TAGS"
                                                class="text-xs text-text-neutral-subtle"
                                            >
                                                +{{ item.affected.length - MAX_AFFECTED_TAGS }} more
                                            </span>
                                        </div>

                                        <List v-if="item.body.length && !isItemCollapsed(item)">
                                            <ListItem
                                                v-for="line in item.body"
                                                :key="line"
                                                markerIcon="mdi:circle-small"
                                                :size="ListItemSize.SM"
                                            >
                                                <template
                                                    v-for="(part, partIndex) in splitInlineCode(line)"
                                                    :key="partIndex"
                                                >
                                                    <ProseCode v-if="part.isCode" :class="INLINE_CODE_CLASS">
                                                        {{ part.text }}
                                                    </ProseCode>
                                                    <template v-else>{{ part.text }}</template>
                                                </template>
                                            </ListItem>
                                        </List>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <ContentPlaceholder v-else text="No release information available." class="h-30" />
            </div>
        </SectionBody>
    </Section>
</template>
<script setup lang="ts">
import releaseHistory from '@/data/releases/release-history.json'

type ReleaseEntry = {
    packageName: string
    version: string
    publishedAt: string
    releaseType: string
    notes: string[]
    publishedChanges?: {
        added: string[]
        changed: string[]
        removed: string[]
    }
    metadata?: {
        commitCount: number
        commits: ReleaseCommit[]
        groups: {
            added: number
            fixed: number
            changed: number
            breaking: number
        }
    }
}

type ReleaseCommit = {
    sha: string
    shortSha: string
    date: string
    subject: string
    normalizedSubject: string
    type: string
    body: string[]
    affected: string[]
    prNumber: string | null
    url: string | null
    prUrl: string | null
}

type ReleasePackage = {
    packageName: string
    latestVersion: string | null
    entries: ReleaseEntry[]
}

// Computed
const title = computed(() => 'Releases')

const packages = computed<ReleasePackage[]>(() => releaseHistory.packages ?? [])

const packageOptions = computed(() => {
    return packages.value.map((pkg) => ({
        text: pkg.packageName,
        value: pkg.packageName,
    }))
})

const selectedPackageName = ref<string>(packageOptions.value[0]?.value ?? '')

const selectedPackage = computed<ReleasePackage | null>(() => {
    return packages.value.find((pkg) => pkg.packageName === selectedPackageName.value) ?? null
})

const versionOptions = computed<string[]>(() => {
    return selectedPackage.value?.entries.map((entry) => entry.version) ?? []
})

const selectedFromVersion = ref<string>(versionOptions.value[0] ?? '')
const selectedToVersion = ref<string>(versionOptions.value[0] ?? '')
const MAX_AFFECTED_TAGS = 4
const MAX_PUBLISHED_LABELS = 12

const formatCommitCount = (count: number) => `${count} ${count === 1 ? 'commit' : 'commits'}`

// Items are expanded by default; this holds the ones the user collapsed.
const collapsedItems = ref<Set<string>>(new Set())

// Neutral inline code with a softer background; [&&] raises specificity over ProseCode's own important classes.
const INLINE_CODE_CLASS = '[&&]:bg-background-neutral-subtler/40!'

// Splits text on `backticks` so the code parts can be rendered as inline code.
const splitInlineCode = (text: string) => {
    return text
        .split(/`([^`]+)`/)
        .map((part, index) => ({ text: part, isCode: index % 2 === 1 }))
        .filter((part) => part.text)
}

const hasItemDetails = (item: { affected: string[]; body: string[] }) => {
    return item.affected.length > 0 || item.body.length > 0
}

const isItemCollapsed = (item: { sha: string }) => collapsedItems.value.has(item.sha)

const toggleItem = (item: { sha: string }) => {
    if (collapsedItems.value.has(item.sha)) {
        collapsedItems.value.delete(item.sha)
    } else {
        collapsedItems.value.add(item.sha)
    }
}

watch(selectedPackageName, () => {
    selectedFromVersion.value = versionOptions.value[0] ?? ''
    selectedToVersion.value = versionOptions.value[0] ?? ''
})

const selectedFromIndex = computed<number>(() => {
    if (!selectedPackage.value) return -1

    return selectedPackage.value.entries.findIndex((entry) => entry.version === selectedFromVersion.value)
})

const selectedToIndex = computed<number>(() => {
    if (!selectedPackage.value) return -1

    return selectedPackage.value.entries.findIndex((entry) => entry.version === selectedToVersion.value)
})

const rangedEntries = computed<ReleaseEntry[]>(() => {
    if (!selectedPackage.value) return []
    if (selectedFromIndex.value < 0 || selectedToIndex.value < 0) return []

    const startIndex = Math.min(selectedFromIndex.value, selectedToIndex.value)
    const endIndex = Math.max(selectedFromIndex.value, selectedToIndex.value)

    return selectedPackage.value.entries.slice(startIndex, endIndex + 1)
})

const versionSelectOptions = computed(() => {
    return versionOptions.value.map((version) => ({
        text: version,
        value: version,
    }))
})

const getReleaseTypeColor = (releaseType: string): ColorAccent => {
    switch (releaseType) {
        case 'major':
            return ColorAccent.DANGER
        case 'minor':
            return ColorAccent.INFO
        case 'initial':
            return ColorAccent.SECONDARY_BRAND
        default:
            return ColorAccent.NEUTRAL
    }
}

const sectionConfig: Array<{ type: string; title: string; color: ColorAccent }> = [
    { type: 'breaking', title: 'Breaking Changes', color: ColorAccent.DANGER },
    { type: 'added', title: 'Added', color: ColorAccent.INFO },
    { type: 'fixed', title: 'Fixed', color: ColorAccent.SUCCESS },
    { type: 'changed', title: 'Changed', color: ColorAccent.NEUTRAL },
    { type: 'maintenance', title: 'Maintenance', color: ColorAccent.WARNING },
]

const publishedChangeConfig: Array<{ key: 'added' | 'changed' | 'removed'; title: string; color: ColorAccent }> = [
    { key: 'added', title: 'Added', color: ColorAccent.INFO },
    { key: 'changed', title: 'Changed', color: ColorAccent.NEUTRAL },
    { key: 'removed', title: 'Removed', color: ColorAccent.DANGER },
]

const getPublishedChangeGroups = (entry: ReleaseEntry) => {
    const changes = entry.publishedChanges

    if (!changes) return []

    return publishedChangeConfig
        .map((group) => ({ ...group, labels: changes[group.key] }))
        .filter((group) => group.labels.length > 0)
}

const getEntrySections = (entry: ReleaseEntry) => {
    const commits = entry.metadata?.commits ?? []

    if (!commits.length) return []

    return sectionConfig
        .map((section) => ({
            title: section.title,
            color: section.color,
            items: commits
                .filter((commit) => commit.type === section.type)
                .map((commit) => ({
                    label: commit.normalizedSubject,
                    sha: commit.shortSha,
                    url: commit.url,
                    body: commit.body ?? [],
                    affected: commit.affected ?? [],
                })),
        }))
        .filter((section) => section.items.length > 0)
}

definePageMeta({
    title: title.value,
})
</script>
