// Verifies every item in docs/data/portfolio/components.ts has an imgUrl whose
// file exists and whose name is the kebab-case of the item's title.
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const source = readFileSync(resolve(root, 'docs/data/portfolio/components.ts'), 'utf8')
const publicDir = resolve(root, 'docs/public')

const toKebab = (title) =>
    title
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])(?=[A-Z][a-z])/g, '$1-')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()

const errors = []
let checked = 0

for (const [, body] of source.matchAll(/^ {4}\{\r?\n([\s\S]*?)^ {4}\},?/gm)) {
    if (/isSectionTitle:\s*true/.test(body)) continue
    const title = body.match(/title:\s*'([^']+)'/)?.[1]
    if (!title) continue

    checked++
    const imgUrl = body.match(/imgUrl:\s*`([^`]+)`/)?.[1]
    if (!imgUrl) {
        errors.push(`${title}: missing imgUrl`)
        continue
    }
    if (!existsSync(resolve(publicDir, imgUrl.replace(/^\//, '')))) {
        errors.push(`${title}: image not found (${imgUrl})`)
    }
    const fileName = imgUrl.split('/').pop().replace(/\.[^.]+$/, '')
    if (fileName !== toKebab(title)) {
        errors.push(`${title}: image name "${fileName}" should be "${toKebab(title)}"`)
    }
}

if (errors.length) {
    console.error(`Component thumbnail check failed (${errors.length}):\n- ${errors.join('\n- ')}`)
    process.exit(1)
}
console.log(`Component thumbnails OK (${checked} items checked).`)
