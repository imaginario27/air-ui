## Nuxt + AirUI installation guide from scratch

Create a new Nuxt project using the Air UI app template:

```bash
npm create air-ui-app@latest your-project-name
```

Follow the CLI prompts to configure your project, selecting the default options or customizing them as needed. 

## Project configuration options

During the setup, the CLI will ask you a few questions to tailor the project to your needs. All options are optional and can be safely enabled or disabled depending on your project requirements:

::generic-table
---
headers: ['Option', 'What it does', 'When to enable it']
boldColumns: ['option']
items:
  - option: "Internationalization"
    what-it-does: "Adds support for multiple languages in your app."
    when-to-enable-it: "If your project needs translations or will support more than one language."

  - option: "VueUse utilities"
    what-it-does: "Includes a collection of useful Vue composables (state, browser APIs, helpers)."
    when-to-enable-it: "Recommended for most projects to speed up development and reduce boilerplate."

  - option: "Markdown content"
    what-it-does: "Allows you to manage content using Markdown files."
    when-to-enable-it: "Ideal for documentation, content-driven pages, or text-heavy sections."
---
::
