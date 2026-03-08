export default defineMcpTool({
    name: 'list_doc_pages',
    description: 'List all documentation pages',
    inputSchema: {},

    async handler() {
        const event = useEvent()

        const allDocs = await queryCollection(event, 'content')
            .select('title', 'path', 'description')
            .all()

        const results = allDocs
            .slice(0, 20) // Limit pages returned to the LLM
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