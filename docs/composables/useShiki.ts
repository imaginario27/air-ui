import { createHighlighter, type Highlighter } from 'shiki'

let highlighter: Highlighter | null = null

export const useDocsShikiHighlighter = async () => {
    highlighter ??= await createHighlighter({
        themes: ['github-light', 'github-dark'],
        langs: ['vue'],
    })

    return highlighter
}
