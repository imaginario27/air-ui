## What is Air UI?

Air UI is a modern component and utility framework built on **Vue**, **Nuxt**, and **Tailwind CSS**, designed to accelerate development while maintaining full design freedom. It provides:

- A consistent and themeable design system
- Fully typed, reusable components and utilities
- Auto-imported composables and helpers in Nuxt
- Optimized setup for performance and scalability

### Built on modular packages

Air UI is composed of two focused, modular packages — each designed to serve a specific purpose in your application architecture:

* **[`@imaginario27/air-ui-ds`](https://www.npmjs.com/package/@imaginario27/air-ui-ds)**
  Provides a fully typed component library, design tokens, themes, and composables tailored for Vue and Nuxt projects. Ideal for building consistent UI across applications.

* **[`@imaginario27/air-ui-utils`](https://www.npmjs.com/package/@imaginario27/air-ui-utils)**
  A standalone utility package offering reusable, type-safe logic and composables. Designed for Nuxt but suitable for any modern JavaScript or TypeScript project.

## Core technologies

::grid

::feature-card
---
title: 'Vue + Composition API'
description: 'Built entirely with Vue 3’s Composition API and TypeScript. Designed for modular, reactive architecture with auto-imported support in Nuxt.'
icon: 'mdi:vuejs'
containedIconStyleType: 'flat'
---
::

::feature-card
---
title: 'Nuxt integration'
description: 'Air UI is optimized for Nuxt, supporting auto-import of all components and composables, with zero configuration required.'
icon: 'mdi:nuxt'
containedIconStyleType: 'flat'
---
::

::feature-card
---
title: 'Tailwind CSS'
description: 'Air UI uses the latest Tailwind CSS, enabling full design flexibility via utility classes, and supporting custom themes via CSS variables.'
icon: 'mdi:tailwind'
containedIconStyleType: 'flat'
---
::

::

## Key features

### Design System

- Design tokens for color, spacing, typography, and themes
- Light and dark theme support with semantic variables
- Built-in script to generate theme tokens and CSS variables

### Component Library

- Ready-to-use Vue components
- Fully typed with TS support
- Drop-in integration with Nuxt auto-import

### Utility-first architecture

- Type-safe, reusable helper functions and composables
- Common utilities for:

  - **Form validation and filters**
  - **Date and string formatting**
  - **Navigation and page helpers**
  - **PDF generation**
  - **User and password utilities**
- Fully compatible with Nuxt's auto-import system
- Modular by design — use only what you need


### Developer experience

- Full TypeScript support with IntelliSense
- Tested with Vitest, Vue Test Utils, and Nuxt Test Utils
- Consistent, composable API design


## TypeScript support

Air UI provides a complete type-safe experience across both UI components and utilities:

* **Props, slots, and events** are fully typed
* **Composables** return strongly-typed reactive values
* **Design tokens** are generated and typed automatically
* Supports **IntelliSense** in both Nuxt and Vue projects
