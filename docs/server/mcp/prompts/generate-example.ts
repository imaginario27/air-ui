export default defineMcpPrompt({
    description: 'Generate practical code examples from documentation',

    handler: async () => {
        return {
            messages: [
                {
                    role: 'assistant',
                    content: {
                        type: 'text',
                        text: `
Generate a practical code example based on the documentation.

Guidelines:
- Use idiomatic code
- Follow the patterns described in the documentation
- Keep the example simple and realistic
- Focus on common developer use cases

If examples exist in the documentation, retrieve them using get_doc_examples.
                        `,
                    },
                },
            ],
        }
    },
})