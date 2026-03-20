<template>
    <Section
        :spacing="SectionSpacing.XL"
        class="bg-background-primary-brand-soft/30"
    >
        <SectionBody>
            <Heading
                :title
                description="Stay up to date with the latest AirUI releases, improvements, and breaking changes."
                :align="Align.CENTER"
            />
        </SectionBody>
    </Section>

    <Section hasContentMaxWidth :spacing="SectionSpacing.MD">
        <SectionBody>
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <h2 class="text-xl font-semibold">
                        Select package
                    </h2>

                    <div class="flex flex-wrap gap-2">
                        <ActionButton
                            v-for="pkg in packageOptions"
                            :key="pkg.value"
                            :text="pkg.text"
                            :styleType="selectedPackageName === pkg.value
                                ? ButtonStyleType.PRIMARY_BRAND_FILLED
                                : ButtonStyleType.NEUTRAL_FILLED"
                            :size="ButtonSize.MD"
                            @click="selectedPackageName = pkg.value"
                        />
                    </div>
                </div>

                <div
                    v-if="selectedPackage"
                    class="flex flex-col gap-4"
                >
                    <Heading
                        title="Version range"
                        :size="HeadingSize.XS"
                    />

                    <Form class="max-w-3xl w-full">
                        <FormRow class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <SelectField
                                id="release-version-from"
                                v-model="selectedFromVersion"
                                :options="versionSelectOptions"
                                label="From"
                            />

                            <SelectField
                                id="release-version-to"
                                v-model="selectedToVersion"
                                :options="versionSelectOptions"
                                label="To"
                            />
                        </FormRow>
                    </Form>
                </div>

                <div
                    v-if="rangedEntries.length && selectedPackage"
                    class="flex flex-col gap-4"
                >
                    <p class="text-sm text-text-neutral-subtle">
                        Showing {{ rangedEntries.length }} versions from {{ rangedEntries[0]?.version }} to {{ rangedEntries[rangedEntries.length - 1]?.version }}.
                    </p>

                    <div
                        v-for="entry in rangedEntries"
                        :key="entry.version"
                        class="rounded-xl border border-border-neutral-subtle p-5 flex flex-col gap-4"
                    >
                        <div class="flex flex-wrap items-center gap-3">
                            <h3 class="text-lg font-semibold">
                                {{ selectedPackage.packageName }} {{ entry.version }}
                            </h3>
                            <Badge
                                :text="entry.releaseType"
                                :color="getReleaseTypeColor(entry.releaseType)"
                                :style="BadgeStyle.FLAT"
                                class="uppercase"
                            />
                            <span class="text-sm text-text-neutral-subtle">
                                {{ entry.publishedAt }}
                            </span>
                            <span
                                v-if="shouldShowCommitDetails"
                                class="text-sm text-text-neutral-subtle"
                            >
                                {{ entry.metadata?.commitCount ?? 0 }} commits
                            </span>
                        </div>

                        <div class="flex flex-col gap-4">
                            <div
                                v-for="section in getEntrySections(entry)"
                                :key="`${entry.version}-${section.title}`"
                                class="flex flex-col gap-2"
                            >
                                <div class="flex items-center gap-2">
                                    <Badge
                                        :text="section.title"
                                        :color="section.color"
                                        :style="BadgeStyle.FLAT"
                                    />
                                    <span class="text-sm text-text-neutral-subtle">
                                        {{ section.items.length }} items
                                    </span>
                                </div>

                                <ol class="list-decimal pl-5 space-y-1">
                                    <li
                                        v-for="item in section.items"
                                        :key="`${entry.version}-${section.title}-${item.label}`"
                                    >
                                        <span>{{ item.label }}</span>
                                        <span
                                            v-if="shouldShowCommitDetails"
                                            class="text-text-neutral-subtle"
                                        >
                                            ({{ item.sha }})
                                        </span>
                                        <NavLink
                                            v-if="shouldShowCommitDetails && item.url"
                                            :to="item.url"
                                            text="View"
                                            :size="NavLinkSize.SM"
                                            :iconPosition="IconPosition.RIGHT"
                                            icon="mdi:open-in-new"
                                            isExternal
                                            textClass="font-medium"
                                            class="ml-2"
                                        />
                                    </li>
                                </ol>
                            </div>
                        </div>

                        <NavLink
                            :to="`https://www.npmjs.com/package/${selectedPackage.packageName}/v/${entry.version}`"
                            text="View this version on npm"
                            :size="NavLinkSize.SM"
                            :iconPosition="IconPosition.RIGHT"
                            icon="mdi:open-in-new"
                            isExternal
                            textClass="font-medium"
                        />
                    </div>
                </div>

                <ContentPlaceholder
                    v-else
                    text="No release information available."
                    class="h-30"
                />
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
const title = computed(() => ('Releases'))

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
const shouldShowCommitDetails = ref(false)

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

const sectionConfig: Array<{ type: string, title: string, color: ColorAccent }> = [
    { type: 'breaking', title: 'Breaking Changes', color: ColorAccent.DANGER },
    { type: 'added', title: 'Added', color: ColorAccent.INFO },
    { type: 'fixed', title: 'Fixed', color: ColorAccent.SUCCESS },
    { type: 'changed', title: 'Changed', color: ColorAccent.NEUTRAL },
]

const getEntrySections = (entry: ReleaseEntry) => {
    const commits = entry.metadata?.commits ?? []

    if (!commits.length) {
        return [
            {
                title: 'Changed',
                color: ColorAccent.NEUTRAL,
                items: entry.notes.map((note, index) => ({
                    label: note,
                    sha: `note-${index + 1}`,
                    url: null,
                })),
            },
        ]
    }

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
                })),
        }))
        .filter((section) => section.items.length > 0)
}

definePageMeta({
    title: title.value,
})
</script>