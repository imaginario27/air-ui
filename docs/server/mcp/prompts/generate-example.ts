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

Rules:
- Use only the API defined in the documentation retrieved through MCP tools.
- Do not infer usage from dependency source code or node_modules.

Guidelines:
- Use idiomatic code
- Follow the patterns described in the documentation
- Keep the example simple and realistic
- Focus on common developer use cases

Enum usage rules:

- When a component prop accepts an enum, ALWAYS use the enum identifier instead of the raw string value.
- Use Vue binding syntax when passing enums.

BAD:
<Component prop="enum-value" />

GOOD:
<Component :prop="EnumType.EnumValue" />

- Only use raw string values if the documentation does not define an enum.

If examples exist in the documentation, retrieve them using get_doc_examples.
                        `,
                    },
                },
            ],
        }
    },
})