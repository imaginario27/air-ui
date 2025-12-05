import { createHighlighter, type Highlighter } from 'shiki'

let highlighter: Highlighter | null = null

export const useShikiHighlighter = async () => {
    highlighter ??= await createHighlighter({
        themes: ['github-light', 'github-dark'],
        langs: ['vue'],
    })

    return highlighter
}
