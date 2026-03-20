#!/usr/bin/env node

import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import readline from "node:readline"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, "..")

const packageName = process.argv[2]

if (!packageName) {
    console.error("Usage: finalize-release <package-name>")
    console.error("Example: finalize-release @imaginario27/air-ui-ds")
    process.exit(1)
}

function runGit(args) {
    return execFileSync("git", ["-C", repoRoot, ...args], {
        encoding: "utf8",
    }).trim()
}

function getPackageVersion(pkgName) {
    const wsName = pkgName.split("/")[1] // air-ui-ds o air-ui-utils
    const pkgJsonPath = path.join(repoRoot, "packages", wsName, "package.json")
    const pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf8"))
    return pkgJson.version
}

async function askConfirmation(message) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise((resolve) => {
        rl.question(message, (answer) => {
            rl.close()
            resolve(answer.toLowerCase() === "y")
        })
    })
}

async function main() {
    try {
        // Mostrar cambios pendientes
        const status = runGit(["status", "--short"])
        console.log("\n📝 Changes to commit:\n")
        console.log(status)

        const version = getPackageVersion(packageName)
        const commitMessage = `chore: release ${packageName} v${version}`

        const proceed = await askConfirmation(
            `\n✅ Commit message: "${commitMessage}"\nProceed? (y/n): `
        )

        if (!proceed) {
            console.log("❌ Cancelled.")
            process.exit(0)
        }

        runGit(["add", "."])
        runGit(["commit", "-m", commitMessage])

        console.log("✅ Changes committed successfully!")
    } catch (error) {
        console.error("Error:", error.message)
        process.exit(1)
    }
}

main()
