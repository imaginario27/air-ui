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

Rules:
- The documentation retrieved via MCP tools is the source of truth.
- Ignore implementations found in node_modules or dependency source code.

When explaining:
- Summarize the main purpose
- Highlight key concepts
- Provide practical examples
- Explain when developers should use this feature

Enum rules:
- When props support enums, always mention the enum name.
- Prefer: ButtonVariant.PrimaryBrandFilled
- Avoid raw values like: "primary-brand-filled"

If needed, retrieve the full documentation using the get_doc_page tool.
                        `,
                    },
                },
            ],
        }
    },
})