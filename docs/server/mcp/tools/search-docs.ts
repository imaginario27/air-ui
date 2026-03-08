import { z } from 'zod'

export default defineMcpTool({
    name: 'search_docs',
    description: 'Search documentation pages by keyword',
    inputSchema: {
        query: z
            .string()
            .min(1)
            .max(200),
    },

    async handler(input) {
        const event = useEvent()

        const allDocs = await queryCollection(event, 'content')
            .select('title', 'path', 'description')
            .all()

        const query = input.query.toLowerCase()

        const results = allDocs
            .filter(doc => {
                const title = (doc.title || '').toLowerCase()
                const description = (doc.description || '').toLowerCase()
                const path = (doc.path || '').toLowerCase()

                return (
                    title.includes(query) ||
                    description.includes(query) ||
                    path.includes(query)
                )
            })
            .slice(0, 8) // Limit results returned to the LLM
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