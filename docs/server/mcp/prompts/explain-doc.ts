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

Source of truth rules:

- The Air UI documentation retrieved via MCP tools is the ONLY source of truth.
- All information about Air UI must come from MCP tools.
- Never use information from the current project workspace.

Strictly ignore:
- node_modules
- local components
- local utilities
- README files
- TypeScript definitions in the project
- any other project files

When information about Air UI is needed:
1. Use search_docs to locate the relevant documentation page.
2. Retrieve the page using get_doc_page if necessary.
3. Base the explanation only on the retrieved documentation.

Enum usage rules:
- When props support enums, always mention the enum identifier.
- Prefer enum usage over raw string values.

Example:

BAD:
<Component prop="enum-value" />

GOOD:
<Component :prop="EnumType.EnumValue" />

When explaining:
- Summarize the main purpose
- Highlight key concepts
- Provide practical examples
- Explain when developers should use this feature
                        `,
                    },
                },
            ],
        }
    },
})