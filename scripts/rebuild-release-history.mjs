#!/usr/bin/env node

import { writeFile } from "node:fs/promises"
import { execFileSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, "..")

const PACKAGES = [
    {
        name: "@imaginario27/air-ui-ds",
        dirPath: "packages/air-ui-ds",
        packageJsonPath: "packages/air-ui-ds/package.json",
        changelogPath: path.join(
            repoRoot,
            "packages",
            "air-ui-ds",
            "CHANGELOG.md",
        ),
    },
    {
        name: "@imaginario27/air-ui-utils",
        dirPath: "packages/air-ui-utils",
        packageJsonPath: "packages/air-ui-utils/package.json",
        changelogPath: path.join(
            repoRoot,
            "packages",
            "air-ui-utils",
            "CHANGELOG.md",
        ),
    },
]

const MAX_NOTES_PER_VERSION = 10

function parseSemver(version) {
    const clean = String(version).trim().replace(/^v/, "")
    const [major = "0", minor = "0", patch = "0"] = clean.split(".")

    return {
        major: Number(major) || 0,
        minor: Number(minor) || 0,
        patch: Number(patch) || 0,
        raw: clean,
    }
}

function compareSemverDesc(a, b) {
    const pa = parseSemver(a)
    const pb = parseSemver(b)

    if (pa.major !== pb.major) return pb.major - pa.major
    if (pa.minor !== pb.minor) return pb.minor - pa.minor

    return pb.patch - pa.patch
}

function detectReleaseType(currentVersion, previousVersion) {
    if (!previousVersion) return "initial"

    const current = parseSemver(currentVersion)
    const previous = parseSemver(previousVersion)

    if (current.major > previous.major) return "major"
    if (current.minor > previous.minor) return "minor"

    return "patch"
}

function formatDate(isoDate) {
    if (!isoDate) return "Unknown date"

    return String(isoDate).slice(0, 10)
}

function runGit(args) {
    return execFileSync("git", ["-C", repoRoot, ...args], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
    }).trim()
}

function getGithubBaseUrl() {
    const remote = runGit(["remote", "get-url", "origin"])
    const sshMatch = remote.match(/github.com[:/](.+?)(?:\.git)?$/)
    const httpsMatch = remote.match(/https:\/\/github.com\/(.+?)(?:\.git)?$/)
    const repoSlug = sshMatch?.[1] ?? httpsMatch?.[1]

    return repoSlug ? `https://github.com/${repoSlug}` : null
}

function stripConventionalPrefix(subject) {
    return subject.replace(/^\w+(\([^)]+\))?!?:\s*/i, "").trim()
}

function classifyCommit(subject) {
    const lower = subject.toLowerCase()

    if (lower.startsWith("chore")) return null
    if (lower.includes("breaking") || /!:\s/.test(subject)) return "breaking"
    if (lower.startsWith("feat")) return "added"
    if (lower.startsWith("fix")) return "fixed"

    return "changed"
}

function extractPrNumber(subject) {
    const match = subject.match(/#(\d+)/)

    return match?.[1] ?? null
}

function shouldIncludeCommit(subject) {
    // Extraer el scope: type(scope):
    const scopeMatch = subject.match(/^\w+\(([^)]+)\):/)
    if (!scopeMatch) return true

    const scope = scopeMatch[1].toLowerCase()

    // Excluir solo si el scope es EXCLUSIVAMENTE "docs"
    // Incluir si es "docs+design system", "design system+docs", etc.
    if (scope === "docs") {
        return false
    }

    return true
}

function parseGitCommits(raw, githubBaseUrl) {
    if (!raw) return []

    const lines = raw.split("\n").filter(Boolean)

    return lines
        .map((line) => {
            const [sha, date, subject] = line.split("\x1f")
            const type = classifyCommit(subject)

            if (type === null || !shouldIncludeCommit(subject)) return null

            const prNumber = extractPrNumber(subject)

            return {
                sha,
                shortSha: sha.slice(0, 7),
                date,
                subject,
                normalizedSubject: stripConventionalPrefix(subject),
                type,
                prNumber,
                url: githubBaseUrl ? `${githubBaseUrl}/commit/${sha}` : null,
                prUrl:
                    prNumber && githubBaseUrl
                        ? `${githubBaseUrl}/pull/${prNumber}`
                        : null,
            }
        })
        .filter(Boolean)
}

function getGitCommitsForRange({
    packagePath,
    olderPublishedAt,
    newerPublishedAt,
    githubBaseUrl,
}) {
    const args = [
        "log",
        "--no-merges",
        "--date=short",
        "--pretty=format:%H%x1f%ad%x1f%s",
    ]

    if (olderPublishedAt) args.push(`--since=${olderPublishedAt}`)
    if (newerPublishedAt) args.push(`--until=${newerPublishedAt}`)

    args.push("--", packagePath)

    const raw = runGit(args)

    return parseGitCommits(raw, githubBaseUrl)
}

function buildNotesFromCommits(commits) {
    if (!commits.length) {
        return {
            notes: [
                "Historical release reconstructed from npm publish metadata (no package commits found in this publish window).",
            ],
            grouped: {
                added: [],
                fixed: [],
                changed: [],
                breaking: [],
            },
        }
    }

    const grouped = {
        added: commits.filter((commit) => commit.type === "added"),
        fixed: commits.filter((commit) => commit.type === "fixed"),
        changed: commits.filter((commit) => commit.type === "changed"),
        breaking: commits.filter((commit) => commit.type === "breaking"),
    }

    const ordered = [
        ...grouped.breaking,
        ...grouped.added,
        ...grouped.fixed,
        ...grouped.changed,
    ]

    const notes = ordered
        .slice(0, MAX_NOTES_PER_VERSION)
        .map((commit) => commit.normalizedSubject)

    return {
        notes,
        grouped,
    }
}

async function fetchPackageTime(packageName) {
    const encoded = encodeURIComponent(packageName)
    const url = `https://registry.npmjs.org/${encoded}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(
            `Failed to fetch npm metadata for ${packageName}: ${response.status}`,
        )
    }

    const metadata = await response.json()
    const time = metadata?.time || {}
    const versions = Object.keys(metadata?.versions || {})

    return {
        versions,
        time,
    }
}

function buildEntries({
    packageName,
    packagePath,
    versions,
    time,
    githubBaseUrl,
}) {
    const sorted = [...versions].sort(compareSemverDesc)

    return sorted.map((version, index) => {
        const olderVersion = sorted[index + 1]
        const olderPublishedAt = olderVersion ? time[olderVersion] : null
        const newerPublishedAt = time[version] ?? null

        const commits = getGitCommitsForRange({
            packagePath,
            olderPublishedAt,
            newerPublishedAt,
            githubBaseUrl,
        })

        const { notes, grouped } = buildNotesFromCommits(commits)

        return {
            packageName,
            version,
            publishedAt: formatDate(newerPublishedAt),
            releaseType: detectReleaseType(version, olderVersion),
            notes,
            metadata: {
                commitCount: commits.length,
                commits,
                groups: {
                    added: grouped.added.length,
                    fixed: grouped.fixed.length,
                    changed: grouped.changed.length,
                    breaking: grouped.breaking.length,
                },
            },
        }
    })
}

function buildCommitLine(commit) {
    const commitLabel = commit.url
        ? `[${commit.shortSha}](${commit.url})`
        : commit.shortSha
    const prLabel = commit.prUrl
        ? ` (PR [#${commit.prNumber}](${commit.prUrl}))`
        : ""
    const details = `${commitLabel}${prLabel}`

    return `${commit.normalizedSubject} (${details})`
}

function appendNumberedSection(lines, title, items) {
    if (!items.length) return

    lines.push(`### ${title}`, "")
    for (const [index, item] of items.entries()) {
        lines.push(`${index + 1}. ${item}`)
    }
    lines.push("")
}

function appendFallbackNotesSection(lines, notes) {
    if (!notes.length) {
        lines.push(
            "### Changed",
            "",
            "1. No detailed notes available for this version range.",
            "",
        )
        return
    }

    lines.push("### Changed", "")
    for (const [index, note] of notes.entries()) {
        lines.push(`${index + 1}. ${note}`)
    }
    lines.push("")
}

function appendEntrySection(lines, packageName, entry) {
    const commitCount = entry.metadata?.commitCount ?? 0
    const commits =
        entry.metadata?.commits?.slice(0, MAX_NOTES_PER_VERSION) ?? []
    const breaking = commits
        .filter((commit) => commit.type === "breaking")
        .map(buildCommitLine)
    const added = commits
        .filter((commit) => commit.type === "added")
        .map(buildCommitLine)
    const fixed = commits
        .filter((commit) => commit.type === "fixed")
        .map(buildCommitLine)
    const changed = commits
        .filter((commit) => commit.type === "changed")
        .map(buildCommitLine)

    lines.push(
        `## ${entry.version} - ${entry.publishedAt}`,
        "",
        `Release type: ${entry.releaseType}.`,
        `Commits found in range: ${commitCount}.`,
        "",
    )

    if (commits.length) {
        appendNumberedSection(lines, "Breaking Changes", breaking)
        appendNumberedSection(lines, "Added", added)
        appendNumberedSection(lines, "Fixed", fixed)
        appendNumberedSection(lines, "Changed", changed)
    } else {
        appendFallbackNotesSection(lines, entry.notes)
    }

    lines.push(`- Package: ${packageName}.`, "")
}

function buildChangelogMarkdown(packageName, entries) {
    const lines = []

    lines.push(
        "# Changelog",
        "",
        "All notable changes to this package are documented in this file.",
        "",
        "Historical releases were reconstructed from git history (GitHub repository) and npm publish dates.",
        "Future releases will include detailed entries generated with Changesets.",
        "",
    )

    for (const entry of entries) {
        appendEntrySection(lines, packageName, entry)
    }

    return `${lines.join("\n")}\n`
}

async function main() {
    const packagesForDocs = []
    const githubBaseUrl = getGithubBaseUrl()

    for (const pkg of PACKAGES) {
        const { versions, time } = await fetchPackageTime(pkg.name)
        const entries = buildEntries({
            packageName: pkg.name,
            packagePath: pkg.dirPath,
            versions,
            time,
            githubBaseUrl,
        })
        const markdown = buildChangelogMarkdown(pkg.name, entries)

        await writeFile(pkg.changelogPath, markdown, "utf8")

        packagesForDocs.push({
            packageName: pkg.name,
            latestVersion: entries[0]?.version ?? null,
            entries,
        })
    }

    const docsPayload = {
        generatedAt: new Date().toISOString(),
        source: "github-git-history+npm-publish-dates",
        githubBaseUrl,
        packages: packagesForDocs,
    }

    const docsJsonPath = path.join(
        repoRoot,
        "docs",
        "data",
        "releases",
        "release-history.json",
    )

    await writeFile(
        docsJsonPath,
        `${JSON.stringify(docsPayload, null, 2)}\n`,
        "utf8",
    )

    console.log("Release history rebuilt successfully.")
    console.log(
        `Updated ${packagesForDocs.length} package changelogs and docs release data.`,
    )
}

try {
    await main()
} catch (error) {
    console.error(error)
    process.exit(1)
}
