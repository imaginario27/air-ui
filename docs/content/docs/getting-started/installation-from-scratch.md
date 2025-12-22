## Nuxt + AirUI installation guide from scratch

Create a new Nuxt project using the Air UI app template:

```bash
npm npm create air-ui-app@latest your-project-name
```

Follow the CLI prompts to configure your project, selecting the default options or customizing them as needed. 

## Project configuration options

During the setup, the CLI will ask you a few questions to tailor the project to your needs. All options are optional and can be safely enabled or disabled depending on your project requirements:

| Option                   | What it does                                                                    | When to enable it                                                             |
| ------------------------ | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Internationalization** | Adds support for multiple languages in your app.                                | If your project needs translations or will support more than one language.    |
| **VueUse utilities**     | Includes a collection of useful Vue composables (state, browser APIs, helpers). | Recommended for most projects to speed up development and reduce boilerplate. |
| **Markdown content**     | Allows you to manage content using Markdown files.                              | Ideal for documentation, content-driven pages, or text-heavy sections.        |



