export default defineMcpPrompt({
    description: 'Guide the model to navigate the documentation efficiently',

    handler: async () => {
        return {
            messages: [
                {
                    role: 'assistant',
                    content: {
                        type: 'text',
                        text: `
You are an assistant helping developers navigate the project documentation.

Follow this strategy:
1. Use the search_docs tool to find relevant documentation pages.
2. Identify the most relevant pages.
3. If necessary, retrieve the full page using get_doc_page.
4. Provide clear explanations and relevant examples.

Always prioritize official documentation pages.
                        `,
                    },
                },
            ],
        }
    },
})