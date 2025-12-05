const mockHighlighter = {
    codeToHtml: vi.fn(),
}

// Mock `shiki` and spy on `createHighlighter`
vi.mock('shiki', async () => ({
    createHighlighter: vi.fn(async () => mockHighlighter),
}))

describe('useShikiHighlighter', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.resetModules() 
    })

    it('creates the highlighter on first call', async () => {
        const { useShikiHighlighter } = await import('@/composables/useShiki')
        const { createHighlighter } = await import('shiki')

        const result = await useShikiHighlighter()

        expect(createHighlighter).toHaveBeenCalledTimes(1)
        expect(result).toBe(mockHighlighter)
    })

    it('reuses the highlighter on subsequent calls', async () => {
        const { useShikiHighlighter } = await import('@/composables/useShiki')
        const { createHighlighter } = await import('shiki')

        const first = await useShikiHighlighter()
        const second = await useShikiHighlighter()

        expect(createHighlighter).toHaveBeenCalledTimes(1)
        expect(first).toBe(second)
    })
})
