
## Component

::component-code
---
srcDir: 'accordions/Accordion.vue'
props: 
    items:
        - id: 1
          title: "What is Nuxt?"
          content: "Nuxt is a Vue framework for building full-stack applications."
        - id: 2
          title: "What is Tailwind?"
          content: "Tailwind is a utility-first CSS framework for rapid UI development."
        - id: 3
          title: "Can I use them together?"
          content: "Yes! Nuxt 3 works great with Tailwind out of the box."
external:
  - items
externalTypes:
  - AccordionItem[]
previewBackground: 'white'
isPlaygroundEnabled: false
---
::

## Props

::props-table
---
props: [
    {
        "name": "items",
        "required": "true",
        "type": "AccordionItem[]",
    },
]
---
::

## Usage

### items
An array of objects used to render each accordion entry. Each object must follow the AccordionItem interface with at least `id`, `title`, and `content` fields. 
Optionally, you can include a `group` key to organize related items.

```vue
<template>
    <Accordion :items="items" />
</template>

<script setup lang="ts">
const items: AccordionItem[] = [
    {
        id: 1,
        title: 'Item one',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam!',
    },
    {
        id: 2,
        title: 'Item two',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam!',
    },
    {
        id: 3,
        title: 'Item three',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam!',
    },
    {
        id: 4,
        title: 'Item four',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam!',
    },
    {
        id: 5,
        title: 'Item five',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam!',
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
