## Component

::component-code
---
srcDir: 'content/Kbd.vue'
props:
    text: 'Ctrl'
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "text",
        "default": "'Enter'",
        "type": "string",
    },
]
---
::

## Usage
### text

Sets the label shown inside the keyboard keycap.

```vue
<template>
    <Kbd text="Ctrl" />
</template>
```

- **Type:** `string`
- **Default:** `'Enter'`