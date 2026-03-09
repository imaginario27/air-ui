
## What is MCP?

MCP (Model Context Protocol) is a standard way for AI assistants to access external tools and data.

The Air UI MCP server exposes documentation search and retrieval tools so assistants can answer with project-specific, up-to-date information instead of generic guesses.

## Endpoint

Air UI docs exposes MCP over this public endpoint:

```text
https://air-ui.netlify.app/mcp
```

## Available tools

The current server provides these tools:

::generic-table
---
headers: ['Tool', 'What it does']
codeColumns: ['tool']
items:
  - tool: "list_doc_pages"
    what-it-does: "Lists available docs pages with title, path, and description."

  - tool: "search_docs"
    what-it-does: "Searches docs pages by keyword."

  - tool: "get_doc_page"
    what-it-does: "Fetches full content for a specific docs path."
---
::


## Available prompts

The server also includes guided prompts for common workflows:

::generic-table
---
headers: ['Prompt', 'What it does']
codeColumns: ['prompt']
items:
- prompt: "list-doc-pages"
  what-it-does: "Get a list of all available documentation pages with their titles and descriptions."

- prompt: "navigate-docs"
  what-it-does: "Helps the model find relevant docs efficiently."

- prompt: "explain-doc"
  what-it-does: "Explains a doc page in developer-friendly language."

- prompt: "generate-example"
  what-it-does: "Generates practical examples from documentation context."
---
::


## Configuration

### Visual Studio Code

#### Quick install

Use this deeplink to install directly in VS Code:

::action-button
---
text: "Install MCP in VS Code"
actionType: "link"
isExternal: true
to: "https://air-ui.netlify.app/mcp/deeplink?ide=vscode"
styleType: "neutral-filled"
icon: "mdi:microsoft-visual-studio-code"
iconPosition: "left"
size: "xl"
class: "w-fit"
---
::

#### Manual setup

Create or update `.vscode/mcp.json` in your project:

```json
{
	"servers": {
		"airui": {
			"type": "http",
			"url": "https://air-ui.netlify.app/mcp"
		}
	},
	"inputs": []
}
```

### Claude Code

#### Quick install

Run this command:

```bash
claude mcp add --transport http airui https://air-ui.netlify.app/mcp
```

#### Manual setup

You can also add the same server from your Claude MCP configuration file.

### Cursor

#### Quick install

Use this deeplink to install directly in Cursor:

::action-button
---
text: "Install MCP in Cursor"
actionType: "link"
isExternal: true
to: "https://air-ui.netlify.app/mcp/deeplink?ide=cursor"
styleType: "neutral-filled"
icon: "mdi:cursor-default"
iconPosition: "left"
size: "xl"
class: "w-fit"
---
::

#### Manual setup

Create or update `.cursor/mcp.json` in your project root:

```json
{
	"mcpServers": {
		"airui": {
			"type": "http",
			"url": "https://air-ui.netlify.app/mcp"
		}
	}
}
```

### Gemini CLI

Add this to your Gemini CLI settings file (usually `~/.gemini/settings.json`):

```json
{
	"mcpServers": {
		"airui": {
			"url": "https://air-ui.netlify.app/mcp"
		}
	}
}
```

### Google Antigravity

Open MCP settings in Antigravity and add this server to your raw MCP config:

```json
{
	"mcpServers": {
		"airui": {
			"serverUrl": "https://air-ui.netlify.app/mcp"
		}
	}
}
```

## Usage examples

After configuration, try prompts like:

- "List all Air UI documentation pages"
- "Search docs for MCP server"
- "Get the full page for `/docs/getting-started/installation-from-existing`"
- "Explain how to install Air UI in an existing Nuxt project"
- "Generate a practical example from the installation docs"