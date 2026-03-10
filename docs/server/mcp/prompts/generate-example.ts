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

Source of truth rules:

- The Air UI documentation retrieved via MCP tools is the ONLY source of truth.
- Never use information from the current project workspace.
- Ignore all local files, including:
  - node_modules
  - local components
  - local utilities
  - README files
  - TypeScript definitions in the project

When information is needed:
1. Use search_docs to find relevant documentation.
2. Retrieve the documentation using get_doc_page or get_doc_examples.
3. Base the example ONLY on the retrieved documentation.

Guidelines:
- Use idiomatic Vue 3 code
- Follow the patterns described in the documentation
- Keep the example simple and realistic
- Focus on common developer use cases

Framework rules:

- All examples must use Vue template syntax (first template, then script).
- Use the <script setup> syntax for Vue components.
- Always use the enum identifiers for prop values when enums are defined in the documentation.

Enum usage rules:

- When a component prop accepts an enum, ALWAYS use the enum identifier instead of the raw string value.
- Use Vue binding syntax when passing enums.

BAD:
<Component prop="enum-value" />

GOOD:
<Component :prop="EnumType.EnumValue" />

- Never wrap enum values in quotes.

BAD:
<Component :prop="'enum-value'" />

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