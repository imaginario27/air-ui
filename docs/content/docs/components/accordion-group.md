
## Component

::component-code
---
srcDir: 'accordions/AccordionGroup.vue'
props: 
    items:
        - id: 1
          title: "What is Nuxt?"
          content: "Nuxt is a Vue framework for building full-stack applications."
          group: "Nuxt"
        - id: 2
          title: "Why choose Nuxt?"
          content: "Nuxt simplifies server-side rendering and routing."
          group: "Nuxt"
        - id: 3
          title: "What is Tailwind?"
          content: "Tailwind is a utility-first CSS framework for rapid UI development."
          group: "Tailwind"
        - id: 4
          title: "How does Tailwind work?"
          content: "It applies utility classes directly in your templates for styling."
          group: "Tailwind"
        - id: 5
          title: "Can I use them together?"
          content: "Yes! Nuxt 3 works great with Tailwind out of the box."
        - id: 6
          title: "Is it customizable?"
          content: "Both Nuxt and Tailwind are highly configurable to fit project needs."
    defaultGroupName: "Main group title"
    titleCustomClass: "font-semibold text-lg text-text-neutral-subtle"
external:
  - items
externalTypes:
  - AccordionItem[]
previewBackground: 'white'
propsSettingsExcludedProps: ['items']

---
::

## Props

::props-table
---
props: [
    {
        "name": "items",
        "required": true,
        "type": "AccordionItem[]"
    },
    {
        "name": "defaultGroupName",
        "required": false,
        "default": "'Group title'",
        "type": "string"
    },
    {
        "name": "defaultGroupPosition",
        "required": false,
        "default": "OrderPosition.START",
        "type": "'start' | 'end'"
    },
    {
        "name": "titleCustomClass",
        "required": false,
        "default": "'font-semibold text-lg text-text-neutral-subtle'",
        "type": "string"
    },
    {
        "name": "titleTag",
        "required": false,
        "default": "'h3'",
        "type": "'h3' | 'h4' | 'h5' | 'h6'"
    }
]
---
::

## Usage

### items
An array of objects used to render each accordion entry. Each object must follow the AccordionItem interface with at least `id`, `title`, and `content` fields. 
Items can be grouped by providing a `group` key. If not provided, they will be grouped under the `defaultGroupName` prop.

```vue
<template>
    <AccordionGroup :items="items" />
</template>

<script setup lang="ts">
const items: AccordionItem[] = [
    {
        id: 1,
        title: 'What is Nuxt?',
        content: 'Nuxt is a Vue framework for building full-stack applications.',
        group: 'Nuxt',
    },
    {
        id: 2,
        title: 'Why choose Nuxt?',
        content: 'Nuxt simplifies server-side rendering and routing.',
        group: 'Nuxt',
    },
    {
        id: 3,
        title: 'What is Tailwind?',
        content: 'Tailwind is a utility-first CSS framework for rapid UI development.',
        group: 'Tailwind',
    },
    {
        id: 4,
        title: 'How does Tailwind work?',
        content: 'It applies utility classes directly in your templates for styling.',
        group: 'Tailwind',
    },
    {
        id: 5,
        title: 'Can I use them together?',
        content: 'Yes! Nuxt 3 works great with Tailwind out of the box.',
    },
    {
        id: 6,
        title: 'Is it customizable?',
        content: 'Both Nuxt and Tailwind are highly configurable to fit project needs.',
    },
]
</script>
```

#### TypeScript interface
```ts
interface AccordionItem {
    id: number
    title: string
    content: string
    group?: string
}
```

### defaultGroupName
Defines the fallback group label for items that do not have an explicit `group` property.
This label will be used to group all ungrouped accordion items.

- **Type:** `string`
- **Default:** `'Group title'`

---

### defaultGroupPosition
Controls the position of the default group in the rendered list of grouped accordions. Uses the `OrderPosition` enum as value.

#### Options
::options-table
---
options: [
    {
        value: "OrderPosition.START",
        description: "The default group appears first",
    },
    {
        value: "OrderPosition.END",
        description: "The default group appears after all named groups",
    },
]
---
::

---

### titleCustomClass
Allows you to override the Tailwind CSS classes applied to the group title (`<h3>` or dynamic tag).
Useful for customizing typography, spacing, or color per project requirements.

- **Type:** `string`
- **Default:** `'font-semibold text-lg text-text-neutral-subtle'`

---

### titleTag
Specifies the HTML tag to be used for each group heading.
This is useful for maintaining semantic structure (e.g., `h3`, `h4`) in larger documents or pages.

- **Type:** `'h3' | 'h4' | 'h5' | 'h6'`
- **Default:** `'h3'`