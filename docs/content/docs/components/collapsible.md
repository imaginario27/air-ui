## Component

::component-code
---
srcDir: 'collapsibles/Collapsible.vue'
props: 
    modelValue: false
    title: "Item title"
slots:
    default: ""
slotComponents:
    default:
        srcDir: 'placeholders/ContentPlaceholder.vue'
        props:
            text: "Insert content here"
external:
  - modelValue
externalTypes:
  - boolean
---
::

## Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "default": false,
        "type": "boolean",
    },
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
### modelValue
Provides a way to control the open/closed state of the collapsible from a parent component. By default default, it handles open state internally.

`modelValue` is particularly useful when you want to trigger toggle state from outside of the collapsiable or from the slot itself.

```vue
<template>
    <Collapsible 
        v-model="isOpen" 
        title="My collapsible title"
    >
        <button @click="isOpen = false">Close from inside</button>
    </Collapsible>

    <button @click="isOpen = true">Open from outside</button>
</template>
<script setup lang="ts">
const isOpen = ref(false)
</script>

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