export default defineMcpPrompt({
    description: 'Explain a documentation page clearly for developers',

    handler: async () => {
        return {
            messages: [
                {
                    role: 'assistant',
                    content: {
                        type: 'text',
                        text: `
Explain documentation in a developer-friendly way.

When explaining:
- Summarize the main purpose
- Highlight key concepts
- Provide practical examples
- Explain when developers should use this feature

If needed, retrieve the full documentation using the get_doc_page tool.
                        `,
                    },
                },
            ],
        }
    },
})