## Component

::component-code
---
srcDir: 'collapsibles/Collapsible.vue'
props: 
    title: "Item title"
slots:
  default: ""
slotComponents:
  default:
    srcDir: 'placeholders/ContentPlaceholder.vue'
    props:
        text: "Insert content here"
---
::

## Props

::props-table
---
props: [
    {
        "name": "title",
        "default": "'Item title'",
        "type": "string",
    },
]
---
::

## Slots
::slots-table
---
slots: [
    {
        name: "default",
        description: "Slot to render the collapsible content",
    },
]
---
::

```vue
<template>
    <Collapsible
        title="My collapsible title"
    >
        <!-- Insert content here -->
    </ActionPanel>
</template>
```


## Usage
### title
Collapsible item title.

```vue
<template>
    <Collapsible
        title="My collapsible title"
    >
        <!-- Insert content here -->
    </ActionPanel>
</template>
```

- **Type:** `string`
- **Default:** `'Item title'`