import { execFileSync } from "node:child_process"
import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"

const DS_DIR = "packages/air-ui-ds"
const UTILS_DIR = "packages/air-ui-utils"

// Words that only look like code when they have an inner capital (camelCase / PascalCase).
const hasInnerCapital = (name) => /[a-z][A-Z]/.test(name)

const listFiles = (dir, extension) => {
    try {
        return readdirSync(dir, { recursive: true })
            .filter((file) => String(file).endsWith(extension))
            .map((file) => path.join(dir, String(file)))
    } catch {
        return []
    }
}

const matchAll = (text, regex) => [...text.matchAll(regex)].map((match) => match[1])

// Every component and composable that ever existed, so renamed or removed ones are still recognized.
const getHistoricalFileNames = (repoRoot) => {
    const paths = execFileSync(
        "git",
        [
            "-C",
            repoRoot,
            "log",
            "--name-only",
            "--pretty=format:",
            "--",
            `${DS_DIR}/components`,
            `${DS_DIR}/composables`,
            `${UTILS_DIR}/composables`,
        ],
        { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
    )

    const names = new Set()

    for (const line of paths.split("\n")) {
        const name = line.match(/([^/]+)\.(?:vue|ts)$/)?.[1]

        if (name && (/^[A-Z]/.test(name) || /^use[A-Z]/.test(name))) {
            names.add(name)
        }
    }

    return names
}

// Names that exist in the design system and utils today: types, enums and members, utils, props and slots.
const getCurrentNames = (repoRoot) => {
    const names = new Set()
    const read = (file) => readFileSync(file, "utf8")

    for (const packageDir of [DS_DIR, UTILS_DIR]) {
        for (const file of listFiles(path.join(repoRoot, packageDir, "models"), ".ts")) {
            const content = read(file)

            for (const name of matchAll(content, /export (?:enum|interface|type) (\w+)/g)) {
                if (hasInnerCapital(name)) names.add(name)
            }

            // Enum members such as NONE, GRAYSCALE or SPLIT_ZOOM
            for (const name of matchAll(content, /^\s+([A-Z][A-Z0-9_]+) =/gm)) {
                names.add(name)
            }
        }

        for (const folder of ["utils", "composables"]) {
            for (const file of listFiles(path.join(repoRoot, packageDir, folder), ".ts")) {
                const exported = matchAll(
                    read(file),
                    /export (?:async )?(?:const|function) (\w+)/g,
                )

                for (const name of exported) {
                    if (hasInnerCapital(name) || /^use[A-Z]/.test(name)) names.add(name)
                }
            }
        }
    }

    for (const file of listFiles(path.join(repoRoot, DS_DIR, "components"), ".vue")) {
        const content = read(file)
        const propsBlock = content.match(/defineProps\(\{([\s\S]*?)\n\}\)/)?.[1] ?? ""

        for (const name of matchAll(propsBlock, /^ {4}(\w+):/gm)) {
            if (hasInnerCapital(name)) names.add(name)
        }

        for (const name of matchAll(content, /<slot[^>]*\sname="(\w+)"/g)) {
            if (hasInnerCapital(name)) names.add(name)
        }
    }

    return names
}

// File paths, file names and attributes that are code regardless of the inventory.
const GENERIC_PATTERNS = [
    String.raw`[A-Z][A-Za-z]+\.[A-Z][A-Z0-9_]+`,
    String.raw`(?:docs|packages|scripts|components|composables|utils|models|assets|tests|pages|content)(?:\/[\w-]+(?:\.[\w-]+)*)+`,
    String.raw`[\w-]+(?:\.[\w-]+)*\.(?:vue|ts|mjs|md|json|css)\b`,
    String.raw`:[a-z][\w-]*`,
    String.raw`aria-[a-z]+`,
    String.raw`v-model(?::\w+)?`,
    String.raw`update:\w+`,
]

const escapeRegex = (text) => text.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)

// Returns a function that wraps known design system / utils names in backticks (existing backticks are kept).
export const createCodeHighlighter = (repoRoot) => {
    const names = new Set([
        ...getHistoricalFileNames(repoRoot),
        ...getCurrentNames(repoRoot),
    ])

    const nameAlternatives = [...names]
        .sort((a, b) => b.length - a.length)
        .map(escapeRegex)

    // Enum members written together, such as XS/SM (only real members, so UI/UX is left alone).
    const members = [...names]
        .filter((name) => /^[A-Z][A-Z0-9_]+$/.test(name))
        .map(escapeRegex)
        .join("|")
    const memberPairs = members
        ? [String.raw`(?:${members})(?:\/(?:${members}))+`]
        : []

    const regex = new RegExp(
        String.raw`(?<![\w\`/.-])(?:${[...memberPairs, ...GENERIC_PATTERNS, ...nameAlternatives].join("|")})(?![\w\`/-])`,
        "g",
    )

    return (text) => {
        return text
            .split(/(`[^`]*`)/)
            .map((part, index) => (index % 2 === 1 ? part : part.replace(regex, "`$&`")))
            .join("")
    }
}
