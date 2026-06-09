import { z } from 'zod'
import { extractMinimarkText } from '../utils/extract-minimark-text'

export default defineMcpTool({
    name: 'get_doc_page',
    description: 'Get the full content of a documentation page',
    inputSchema: {
        path: z
            .string()
            .min(1)
            .max(200),
    },

    async handler(input: { path: string }) {
        const event = useEvent()

        const doc = await queryCollection(event, 'content')
            .path(input.path)
            .select('title', 'path', 'description', 'body')
            .first()

        if (!doc) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            error: 'Document not found',
                        }, null, 2),
                    },
                ],
            }
        }

        const bodyText = doc.body?.value
            ? extractMinimarkText(doc.body.value)
            : ''

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        title: doc.title,
                        path: doc.path,
                        description: doc.description,
                        body: bodyText,
                    }, null, 2),
                },
            ],
        }
    },
})
