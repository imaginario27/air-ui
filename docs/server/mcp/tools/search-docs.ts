import { z } from 'zod'
import { extractMinimarkText } from '../utils/extract-minimark-text'

export default defineMcpTool({
    name: 'search_docs',
    description: 'Search documentation pages by keyword',
    inputSchema: {
        query: z
            .string()
            .min(1)
            .max(200),
    },

    async handler(input: { query: string }) {
        const event = useEvent()

        const allDocs = await queryCollection(event, 'content')
            .select('title', 'path', 'description', 'body')
            .all()

        const query = input.query.toLowerCase()

        const results = allDocs
            .filter(doc => {
                const title = (doc.title || '').toLowerCase()
                const description = (doc.description || '').toLowerCase()
                const path = (doc.path || '').toLowerCase()

                if (title.includes(query) || description.includes(query) || path.includes(query)) {
                    return true
                }

                if (doc.body?.value) {
                    const bodyText = extractMinimarkText(doc.body.value).toLowerCase()
                    return bodyText.includes(query)
                }

                return false
            })
            .slice(0, 10)
            .map(doc => ({
                title: doc.title,
                path: doc.path,
                description: doc.description,
            }))

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(results, null, 2),
                },
            ],
        }
    },
})
