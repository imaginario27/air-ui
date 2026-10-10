## What is Air UI?

Air UI is a component and utility framework built on **Vue**, **Nuxt**, and **Tailwind CSS**. It provides:

- A themeable design system based on semantic tokens
- Typed, reusable components and utilities
- Auto-imported composables and helpers in Nuxt

### Built on two packages

Air UI is split into two packages, so you can install only the part you need:



::grid
---
cols: 2
---
::feature-card
---
title: '@imaginario27/air-ui-ds'
description: 'Typed component library, design tokens, themes, and composables for Vue and Nuxt projects.'
---
#footer
::card-actions
---
class: 'justify-end'
---
::action-button
---
text: 'Visit npm package'
actionType: 'link'
isExternal: true
to: 'https://www.npmjs.com/package/@imaginario27/air-ui-ds'
icon: 'mdi:external-link'
iconPosition: 'left'
---
::

::feature-card
---
title: '@imaginario27/air-ui-utils'
description: 'Standalone, type-safe utilities and composables. Built for Nuxt, usable in any JavaScript or TypeScript project.'
---
#footer
::card-actions
---
class: 'justify-end'
---
::action-button
---
text: 'Visit npm package'
actionType: 'link'
isExternal: true
to: 'https://www.npmjs.com/package/@imaginario27/air-ui-utils'
icon: 'mdi:external-link'
iconPosition: 'left'
---
::
::


## Core technologies

::grid

::feature-card
---
title: 'Vue + Composition API'
description: 'Written with Vue 3’s Composition API and TypeScript, and auto-imported in Nuxt.'
icon: 'mdi:vuejs'
containedIconStyleType: 'flat'
---
::

::feature-card
---
title: 'Nuxt integration'
description: 'All components and composables are auto-imported, with no extra configuration.'
icon: 'mdi:nuxt'
containedIconStyleType: 'flat'
---
::

::feature-card
---
title: 'Tailwind CSS'
description: 'Built on Tailwind CSS v4. Components use utility classes, and themes are customized through CSS variables.'
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

- Vue components with typed props, slots, and emits
- Auto-imported in Nuxt

### Utility-first architecture

- Type-safe, reusable helper functions and composables
- Common utilities for:

  - **Form validation and filters**
  - **Date and string formatting**
  - **Navigation and page helpers**
  - **PDF generation**
  - **User and password utilities**
- Auto-imported in Nuxt, so you only use what you need


### Developer experience

- TypeScript support with IntelliSense
- Tested with Vitest and Vue Test Utils


## TypeScript support

Both packages are written in TypeScript:

* **Props, slots, and events** are typed
* **Composables** return typed reactive values
* **Design tokens** are exposed as typed CSS variables
* **IntelliSense** works in Nuxt and Vue projects
