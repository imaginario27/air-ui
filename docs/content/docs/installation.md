## AirUI installation guide

### Install Nuxt

If you're starting a new project, create a Nuxt application:

```bash
npm create nuxt@latest
```

Follow the CLI prompts to configure your project, then install dependencies:

```bash
cd my-app
npm install
```

Or using pnpm:

```bash
cd my-app
pnpm install
```

### Install Air UI packages

You can install Air UI packages using your preferred package manager.

#### Design System

Install the UI components, design tokens, composables and theming tools:

```bash
# npm
npm install @imaginario27/air-ui-ds

# pnpm
pnpm add @imaginario27/air-ui-ds

# yarn
yarn add @imaginario27/air-ui-ds
```

#### Utility Package

Install the reusable utility functions:

```bash
# npm
npm install @imaginario27/air-ui-utils

# pnpm
pnpm add @imaginario27/air-ui-utils

# yarn
yarn add @imaginario27/air-ui-utils
```

## Nuxt configuration

To enable full integration with components, composables, theming, and utilities, extend the default configurations provided by Air UI in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
    extends: [
        '@imaginario27/air-ui-ds/nuxt.config.ts',
        '@imaginario27/air-ui-utils/nuxt.config.ts',
    ],
})
```