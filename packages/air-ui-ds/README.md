# @imaginario27/air-ui-ds

A modular Design System and UI component library built for Vue and Nuxt. It provides a scalable architecture for building consistent interfaces, theme management, and reusable components powered by Tailwind CSS and TypeScript.

Documentation: [https://air-ui.netlify.app/](https://air-ui.netlify.app/)

## Features

* Vue and Nuxt compatibility
* Design System tokens for colors, spacing, typography, and themes
* Reusable and typed UI components
* Light and dark theme system with automatic CSS variable generation
* Tailwind CSS latest version integration
* Auto-import support for components and composables in Nuxt
* Utilities for i18n, file uploads, images, PDF generation, and QR codes
* Full testing setup with Vitest, Vue Test Utils, and Nuxt Test Utils


## Installation

Install using npm:

```bash
npm install @imaginario27/air-ui-ds
```

Using pnpm:

```bash
pnpm add @imaginario27/air-ui-ds
```

Using yarn:

```bash
yarn add @imaginario27/air-ui-ds
```

## Theme Generation

You can generate theme tokens and CSS variables using the built-in script:

```bash
npm run generate-theme
```

This regenerates the theme files used by Tailwind CSS and the Design System.

## Testing

This package includes a complete testing environment using:

* Vitest
* Vue Test Utils
* Nuxt Test Utils
* Happy DOM

Run the tests with:

```bash
npm run test
```