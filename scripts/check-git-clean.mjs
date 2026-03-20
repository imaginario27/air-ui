#!/usr/bin/env node

import { execFileSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, "..")

function runGit(args) {
    return execFileSync("git", ["-C", repoRoot, ...args], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
    }).trim()
}

try {
    const status = runGit(["status", "--porcelain"])
    
    if (status) {
        console.error("❌ Error: Uncommitted changes detected. Please commit all changes before publishing.")
        console.error("\nUncommitted files:")
        console.error(status)
        process.exit(1)
    }
    
    console.log("✅ Git working tree is clean. Ready to publish.")
} catch (error) {
    console.error("Error checking git status:", error.message)
    process.exit(1)
}
