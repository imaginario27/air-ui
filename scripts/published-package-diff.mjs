import { createHash } from "node:crypto"
import { gunzipSync } from "node:zlib"

const TAR_BLOCK_SIZE = 512

// Files whose content always differs between versions and says nothing about the code.
const IGNORED_FILES = new Set(["CHANGELOG.md"])

const readTarString = (header, start, end) => {
    const text = header.toString("utf8", start, end)
    const terminator = text.indexOf("\0")

    return terminator === -1 ? text : text.slice(0, terminator)
}

// Minimal tar reader: returns Map<path, { hash, content }> for regular files.
const parseTar = (buffer) => {
    const files = new Map()
    let offset = 0

    while (offset + TAR_BLOCK_SIZE <= buffer.length) {
        const header = buffer.subarray(offset, offset + TAR_BLOCK_SIZE)

        if (header.every((byte) => byte === 0)) break

        const name = readTarString(header, 0, 100)
        const prefix = readTarString(header, 345, 500)
        const size = Number.parseInt(readTarString(header, 124, 136).trim() || "0", 8)
        const type = String.fromCodePoint(header[156])

        offset += TAR_BLOCK_SIZE

        if (type === "0" || type === "\0") {
            const fullName = (prefix ? `${prefix}/${name}` : name).replace(
                /^package\//,
                "",
            )
            const content = buffer.subarray(offset, offset + size)

            files.set(fullName, {
                hash: createHash("sha256").update(content).digest("hex"),
                content,
            })
        }

        offset += Math.ceil(size / TAR_BLOCK_SIZE) * TAR_BLOCK_SIZE
    }

    return files
}

const tarballCache = new Map()

const fetchTarballFiles = (url) => {
    if (!tarballCache.has(url)) {
        tarballCache.set(
            url,
            fetch(url).then(async (response) => {
                if (!response.ok) {
                    throw new Error(`Failed to download ${url}: ${response.status}`)
                }

                return parseTar(gunzipSync(Buffer.from(await response.arrayBuffer())))
            }),
        )
    }

    return tarballCache.get(url)
}

// package.json always changes with the version; only report it when something else changed.
const packageJsonChanged = (oldFile, newFile) => {
    const strip = (file) => {
        const { version, gitHead, ...rest } = JSON.parse(file.content.toString("utf8"))

        return JSON.stringify(rest)
    }

    return strip(oldFile) !== strip(newFile)
}

// Turns a published file path into the name a reader recognizes (component, composable, util...).
const labelForPath = (filePath) => {
    const modelFile = filePath.match(/^models\/(enums|types)\/(?:.+\/)?([^/]+)\.ts$/)

    if (modelFile) {
        return `${modelFile[2]} (${modelFile[1] === "enums" ? "enums" : "types"})`
    }

    const named = filePath.match(
        /^(?:components|composables|utils)\/(?:.+\/)?([^/]+)\.(?:vue|ts)$/,
    )

    return named ? named[1] : filePath
}

const toLabels = (paths) => [...new Set(paths.map(labelForPath))].sort((a, b) => a.localeCompare(b))

// Compares two published tarballs and groups the differences by added / changed / removed.
export const diffPublishedPackages = async (olderUrl, newerUrl) => {
    const [older, newer] = await Promise.all([
        fetchTarballFiles(olderUrl),
        fetchTarballFiles(newerUrl),
    ])

    const added = []
    const changed = []
    const removed = []

    for (const [filePath, file] of newer) {
        if (IGNORED_FILES.has(filePath)) continue

        const previous = older.get(filePath)

        if (!previous) {
            added.push(filePath)
        } else if (previous.hash !== file.hash) {
            if (filePath === "package.json" && !packageJsonChanged(previous, file)) {
                continue
            }
            changed.push(filePath)
        }
    }

    for (const filePath of older.keys()) {
        if (!IGNORED_FILES.has(filePath) && !newer.has(filePath)) {
            removed.push(filePath)
        }
    }

    return {
        added: toLabels(added),
        changed: toLabels(changed),
        removed: toLabels(removed),
    }
}
