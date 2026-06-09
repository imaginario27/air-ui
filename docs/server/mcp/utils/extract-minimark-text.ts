type MinimarkNode = string | [string, Record<string, unknown>, ...MinimarkNode[]]

export function extractMinimarkText(nodes: MinimarkNode[]): string {
    const parts: string[] = []

    for (const node of nodes) {
        if (typeof node === 'string') {
            parts.push(node)
            continue
        }

        if (!Array.isArray(node)) continue

        const [tag, attrs, ...children] = node

        if (tag === 'pre') {
            const code = (attrs as Record<string, string>).code
            if (code) {
                const language = (attrs as Record<string, string>).language || ''
                parts.push(`\`\`\`${language}\n${code}\`\`\`\n`)
            }
            continue
        }

        if (tag === 'style') continue

        const prefix =
            tag === 'h2' ? '\n## ' :
            tag === 'h3' ? '\n### ' :
            tag === 'h4' ? '\n#### ' :
            tag === 'li' ? '- ' :
            tag === 'p' ? '\n' :
            ''

        const suffix =
            tag.startsWith('h') ? '\n' :
            tag === 'p' ? '\n' :
            tag === 'li' ? '\n' :
            tag === 'code' ? '' :
            ''

        parts.push(prefix)

        if (tag === 'props-table' || tag === 'slots-table' || tag === 'options-table' || tag === 'component-code') {
            for (const [key, value] of Object.entries(attrs as Record<string, string>)) {
                const cleanKey = key.replace(/^:/, '')
                try {
                    const parsed = JSON.parse(value)
                    parts.push(`[${cleanKey}: ${JSON.stringify(parsed)}]\n`)
                } catch {
                    parts.push(`[${cleanKey}: ${value}]\n`)
                }
            }
            continue
        }

        if (children.length > 0) {
            parts.push(extractMinimarkText(children as MinimarkNode[]))
        }

        parts.push(suffix)
    }

    return parts.join('').replace(/\n{3,}/g, '\n\n').trim()
}
