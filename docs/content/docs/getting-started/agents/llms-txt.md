## What is LLMs.txt?

`llms.txt` is a machine-readable index of your documentation for AI assistants.

It gives models a compact map of your docs plus links to raw markdown pages, so they can retrieve the right source content before answering.

## Endpoint

Air UI docs exposes `llms.txt` at:

```text
https://air-ui.netlify.app/llms.txt
```

## What this file includes

Air UI currently exposes these documentation sections:

::generic-table
---
headers: ['Section', 'What it covers']
items:
  - section: "Getting Started"
    what-it-covers: "Introduction and setup instructions for AirUI."

  - section: "Components"
    what-it-covers: "Documentation for Air UI components."

  - section: "Utilities"
    what-it-covers: "Documentation for Air UI utilities."
---
::

<br>

Each entry points to docs pages and raw markdown resources that assistants can consume directly.

## Raw markdown access

In addition to `llms.txt`, Air UI exposes raw markdown pages through:

```text
https://air-ui.netlify.app/raw/<doc-path>.md
```

Example:

```text
https://air-ui.netlify.app/raw/docs/getting-started/installation-from-existing.md
```

This is useful when your AI tool reads `llms.txt` first, then fetches full markdown for selected pages.

## Usage examples

After pointing your assistant to the URL, try prompts like:

- "Use https://air-ui.netlify.app/llms.txt to understand the Air UI documentation structure."
- "Find setup guides in Air UI docs and summarize the installation steps."
- "Retrieve the raw markdown for a relevant Air UI page and explain it for a Nuxt project."
- "Compare the Components and Utilities sections from Air UI docs and give me quick recommendations."

## Notes

- `llms.txt` is optimized for discovery and navigation.
- Raw markdown endpoints are better for detailed explanations and code-level answers.
- For tool-based integration (search/retrieve prompts and tools), use the Air UI MCP server at `https://air-ui.netlify.app/mcp`.
