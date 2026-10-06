#!/usr/bin/env node

import { execSync } from "node:child_process"

// Fails fast if the npm token is missing or expired, so the version is not bumped for a publish that cannot succeed.
try {
    const user = execSync("npm whoami", {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        shell: true,
    }).trim()

    console.log(`✅ npm token is valid (logged in as ${user}).`)
} catch (error) {
    const output = `${error.stderr ?? ""}${error.stdout ?? ""}`.trim()

    console.error("❌ Error: npm authentication failed. The token is missing or has expired.")
    if (output) console.error(`\n${output}`)
    console.error("\nRun `npm login` (or refresh the token in your .npmrc / NPM_TOKEN) and try again.")
    process.exit(1)
}
