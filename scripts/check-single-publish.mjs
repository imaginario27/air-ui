#!/usr/bin/env node

import { execFileSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import readline from "node:readline"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, "..")

const packageName = process.argv[2]

if (!packageName) {
    console.error("Usage: check-single-publish <package-name>")
    console.error("Example: check-single-publish @imaginario27/air-ui-ds")
    process.exit(1)
}

function runGit(args) {
    try {
        return execFileSync("git", ["-C", repoRoot, ...args], {
            encoding: "utf8",
        }).trim()
    } catch {
        return ""
    }
}

function getLastPublishedPackage() {
    // Get the last 10 commit messages to find the last publish
    const log = runGit(["log", "--oneline", "-20"])
    
    if (!log) return null
    
    const lines = log.split("\n")
    
    for (const line of lines) {
        if (
            line.includes("release @imaginario27/air-ui-ds") &&
            line.includes("chore(")
        ) {
            return "@imaginario27/air-ui-ds"
        }
        if (
            line.includes("release @imaginario27/air-ui-utils") &&
            line.includes("chore(")
        ) {
            return "@imaginario27/air-ui-utils"
        }

        if (line.includes("chore: release @imaginario27/air-ui-ds")) {
            return "@imaginario27/air-ui-ds"
        }
        if (line.includes("chore: release @imaginario27/air-ui-utils")) {
            return "@imaginario27/air-ui-utils"
        }
    }
    
    return null
}

function getPackageDisplayName(pkg) {
    if (pkg === "@imaginario27/air-ui-ds") return "Design System (ds)"
    if (pkg === "@imaginario27/air-ui-utils") return "Utils (utils)"
    return pkg
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
        const lastPackage = getLastPublishedPackage()
        
        if (lastPackage === packageName) {
            console.error(`❌ Error: ${getPackageDisplayName(packageName)} was just published!`)
            console.error("\n📋 Publishing workflow:")
            console.error("   1. Publish one package (ds or utils)")
            console.error("   2. Push to GitHub")
            console.error("   3. Later: Publish the other package")
            console.error("\nThis prevents mixing changelogs and ensures clean release history.")
            process.exit(1)
        }
        
        if (lastPackage) {
            console.warn(`\n⚠️  Warning: ${getPackageDisplayName(lastPackage)} was published recently`)
            console.warn(`   Now publishing: ${getPackageDisplayName(packageName)}`)
            console.warn("\n📋 Remember to push to GitHub after this publish before publishing the other package!\n")
            
            const proceed = await askConfirmation("Proceed with publishing? (y/n): ")
            if (!proceed) {
                console.log("❌ Publishing cancelled.")
                process.exit(1)
            }
        } else {
            console.log("✅ No recent publish detected. Ready to publish.")
        }
        
    } catch (error) {
        console.error("Error checking publish history:", error.message)
        process.exit(1)
    }
}

await main()
