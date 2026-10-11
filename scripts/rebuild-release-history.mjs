#!/usr/bin/env node

import { readFileSync } from "node:fs"
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

const targetPackageName = process.argv[2] ?? null

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

const AFFECTED_FILE_REGEX =
    /^packages\/[^/]+\/(?:components|composables|utils)\/(?:.+\/)?([^/]+?)\.(?:vue|ts)$/

function extractAffected(files) {
    const names = files
        .map((file) => file.trim().match(AFFECTED_FILE_REGEX)?.[1])
        .filter(Boolean)

    return [...new Set(names)]
}

// Keeps the bullet/prose lines of a commit body; drops section headings ("Docs:"), trailers and version-bump noise.
function extractBodyLines(body) {
    return body
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.endsWith(":"))
        .map((line) => line.replace(/^[-*]\s*/, "").trim())
        .filter(
            (line) =>
                line &&
                !/^co-authored-by:/i.test(line) &&
                !/^bumps?\b.*\bversion\b/i.test(line),
        )
}

function parseGitCommits(raw, githubBaseUrl) {
    if (!raw) return []

    // Records start with \x1e; fields are separated by \x1f; changed files follow the last field.
    return raw
        .split("\x1e")
        .filter((record) => record.trim())
        .map((record) => {
            const [sha, date, subject, body = "", files = ""] =
                record.split("\x1f")
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
                body: extractBodyLines(body),
                affected: extractAffected(files.split("\n")),
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

// Maps version -> sha of its "chore(scope): release <pkg> v<version>" commit.
function getReleaseCommits(packageName) {
    const raw = runGit([
        "log",
        "--format=%H%x1f%s",
        `--grep=release ${packageName} v`,
    ])
    const releaseCommits = {}
    const ambiguous = new Set()
    const subjectRegex = new RegExp(
        `^chore\\(\\w+\\): release ${packageName} v(\\d+\\.\\d+\\.\\d+)$`,
    )

    for (const line of raw.split("\n").filter(Boolean)) {
        const [sha, subject] = line.split("\x1f")
        const version = subject.match(subjectRegex)?.[1]

        if (!version) continue
        if (releaseCommits[version]) ambiguous.add(version)
        releaseCommits[version] = sha
    }

    // Early history has duplicate release commits (branch syncs); those versions use the date window.
    for (const version of ambiguous) delete releaseCommits[version]

    return releaseCommits
}

function getGitCommitsForRange({
    packagePath,
    olderRef,
    newerRef,
    olderPublishedAt,
    newerPublishedAt,
    githubBaseUrl,
}) {
    const args = [
        "log",
        "--no-merges",
        "--date=short",
        "--name-only",
        "--pretty=tformat:%x1e%H%x1f%ad%x1f%s%x1f%b%x1f",
    ]

    if (newerRef) {
        // Exact range between release commits.
        args.push(olderRef ? `${olderRef}..${newerRef}` : newerRef)
    } else {
        // Fallback for releases without a release commit: npm publish window.
        if (olderPublishedAt) args.push(`--since=${olderPublishedAt}`)
        if (newerPublishedAt) args.push(`--until=${newerPublishedAt}`)
    }

    args.push("--", packagePath)

    const raw = runGit(args)

    return parseGitCommits(raw, githubBaseUrl)
}

function buildNotesFromCommits(commits) {
    if (!commits.length) {
        return {
            notes: [
                "No user-facing changes were recorded for this release (version bump, or only chore and docs commits).",
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

const FETCH_MAX_ATTEMPTS = 10
const FETCH_RETRY_DELAY_MS = 3000

function getLocalPackageVersion(packageJsonPath) {
    return JSON.parse(readFileSync(path.join(repoRoot, packageJsonPath), "utf8"))
        .version
}

// The npm registry metadata lags right after a publish, so when we know which
// version was just published we retry until it shows up instead of writing stale data.
async function fetchPackageTime(packageName, expectedVersion = null) {
    const encoded = encodeURIComponent(packageName)
    const url = `https://registry.npmjs.org/${encoded}`

    for (let attempt = 1; attempt <= FETCH_MAX_ATTEMPTS; attempt++) {
        const response = await fetch(url, {
            headers: { "cache-control": "no-cache" },
        })

        if (!response.ok) {
            throw new Error(
                `Failed to fetch npm metadata for ${packageName}: ${response.status}`,
            )
        }

        const metadata = await response.json()
        const time = metadata?.time || {}
        const versions = Object.keys(metadata?.versions || {})

        if (!expectedVersion || (versions.includes(expectedVersion) && time[expectedVersion])) {
            return {
                versions,
                time,
            }
        }

        if (attempt < FETCH_MAX_ATTEMPTS) {
            console.log(
                `Waiting for ${packageName}@${expectedVersion} to appear on npm (attempt ${attempt}/${FETCH_MAX_ATTEMPTS})...`,
            )
            await new Promise((resolve) => setTimeout(resolve, FETCH_RETRY_DELAY_MS))
        }
    }

    throw new Error(
        `${packageName}@${expectedVersion} is not visible on the npm registry yet. Re-run: npm run rebuild-release-history -- ${packageName}`,
    )
}

function buildEntries({
    packageName,
    packagePath,
    versions,
    time,
    releaseCommits,
    githubBaseUrl,
}) {
    const sorted = [...versions].sort(compareSemverDesc)

    return sorted.map((version, index) => {
        const olderVersion = sorted[index + 1]
        const olderPublishedAt = olderVersion ? time[olderVersion] : null
        const newerPublishedAt = time[version] ?? null

        // The newest version's release commit doesn't exist yet during publish, so use HEAD.
        const newerRef = releaseCommits[version] ?? (index === 0 ? "HEAD" : null)
        const olderRef = olderVersion ? releaseCommits[olderVersion] : null
        const useRefs = newerRef && (olderRef || !olderVersion)

        const commits = getGitCommitsForRange({
            packagePath,
            olderRef: useRefs ? olderRef : null,
            newerRef: useRefs ? newerRef : null,
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
    const packagesToWrite = targetPackageName
        ? PACKAGES.filter((pkg) => pkg.name === targetPackageName)
        : PACKAGES

    if (targetPackageName && packagesToWrite.length === 0) {
        throw new Error(`Unknown package name: ${targetPackageName}`)
    }

    for (const pkg of PACKAGES) {
        // Only the package that was just published is guaranteed to be on npm.
        const expectedVersion =
            pkg.name === targetPackageName
                ? getLocalPackageVersion(pkg.packageJsonPath)
                : null
        const { versions, time } = await fetchPackageTime(
            pkg.name,
            expectedVersion,
        )
        const entries = buildEntries({
            packageName: pkg.name,
            packagePath: pkg.dirPath,
            versions,
            time,
            releaseCommits: getReleaseCommits(pkg.name),
            githubBaseUrl,
        })

        if (packagesToWrite.some((targetPkg) => targetPkg.name === pkg.name)) {
            const markdown = buildChangelogMarkdown(pkg.name, entries)
            await writeFile(pkg.changelogPath, markdown, "utf8")
        }

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
        `Updated ${packagesToWrite.length} package changelog(s) and docs release data.`,
    )
}

try {
    await main()
} catch (error) {
    console.error(error)
    process.exit(1)
}
