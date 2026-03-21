#!/usr/bin/env node

import { execFileSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, "..")

function runGit(args) {
    try {
        return execFileSync("git", ["-C", repoRoot, ...args], {
            encoding: "utf8",
        }).trim()
    } catch {
        return ""
    }
}

function areaFromFile(filePath) {
    const normalizedPath = filePath.replace(/\\\\/g, "/")

    if (normalizedPath.startsWith("docs/")) return "docs"
    if (normalizedPath.startsWith("packages/air-ui-ds/")) return "ds"
    if (normalizedPath.startsWith("packages/air-ui-utils/")) return "utils"

    return null
}

function isGeneralRootChange(filePath) {
    const normalizedPath = filePath.replace(/\\\\/g, "/")

    if (normalizedPath.includes("/")) return false
    return true
}

function main() {
    const output = runGit(["diff", "--cached", "--name-only", "--diff-filter=ACMR"])

    if (!output) process.exit(0)

    const stagedFiles = output.split("\n").filter(Boolean)
    const touchedAreas = new Set()
    let hasGeneralRootChanges = false

    for (const filePath of stagedFiles) {
        const area = areaFromFile(filePath)
        if (area) touchedAreas.add(area)
        if (isGeneralRootChange(filePath)) hasGeneralRootChanges = true
    }

    if (touchedAreas.size <= 1) process.exit(0)

    const areaList = [...touchedAreas].sort().join(", ")

    console.error("ERROR: Commit blocked: mixed areas in one commit.")
    console.error(`   Detected areas: ${areaList}`)
    console.error("   Allowed: only one of [docs, ds, utils] per commit.")
    if (hasGeneralRootChanges) {
        console.error("   Note: root/general changes are allowed, but area mixing is not.")
    }
    console.error("\n   Tip: split with git add -p or separate commits by area.")
    process.exit(1)
}

main()
