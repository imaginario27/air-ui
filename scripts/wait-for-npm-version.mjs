#!/usr/bin/env node

import { execSync } from "node:child_process"
import { readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const packageName = process.argv[2]
const TIMEOUT_MS = 5 * 60 * 1000
const INTERVAL_MS = 5000

if (!packageName) {
    console.error("Usage: wait-for-npm-version <package-name>")
    process.exit(1)
}

const wsName = packageName.split("/")[1]
const { version } = JSON.parse(
    readFileSync(path.join(repoRoot, "packages", wsName, "package.json"), "utf8"),
)

// The registry can take a few seconds to list a version right after `npm publish`; rebuilding the release history before then reads stale data.
const isPublished = () => {
    try {
        const out = execSync(
            `npm view ${packageName}@${version} version --json --prefer-online`,
            { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
        ).trim()

        return [].concat(JSON.parse(out)).includes(version)
    } catch {
        return false
    }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const start = Date.now()
console.log(`⏳ Waiting for ${packageName}@${version} to appear on npm...`)

while (!isPublished()) {
    if (Date.now() - start > TIMEOUT_MS) {
        console.error(`❌ Timed out: ${packageName}@${version} is not on the npm registry. Check that \`npm publish\` succeeded.`)
        process.exit(1)
    }
    await sleep(INTERVAL_MS)
}

console.log(`✅ ${packageName}@${version} is available on npm.`)
