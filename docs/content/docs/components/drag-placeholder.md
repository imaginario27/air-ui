## Component

::component-code
---
srcDir: 'placeholders/DragPlaceholder.vue'
props: 
    text: "Drop here"
    showText: true
previewBackground: "white"
---
::

## Props

::props-table
---
props: [
    {
        "name": "text",
        "default": "Drop here",
        "type": "string",
    },
    {
        "name": "showText",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "textClass",
        "type": "string",
    },
]
---
::

## Usage
### text

Displays a custom text in the middle of the placeholder.

```vue
<template>
    <DragPlaceholder text="Drop here" />
</template>
```

- **Type:** `string`
- **Default:** `Drop here`

### showText

Toggles whether the text is rendered inside the placeholder. Set it to `false` for a plain dashed slot with no label, such as the drop indicator used internally by `RulesField`.

```vue
<template>
    <DragPlaceholder :showText="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### textClass

The class of the text, which can be used to override the default styles.

```vue
<template>
    <DragPlaceholder textClass="text-sm font-semibold" />
</template>
```

- **Type:** `string`

## Field behavior

- Renders a full-width dashed drop zone with rounded corners, using the `border-border-default` token so it stays theme-aware in light and dark mode.
- Any native listeners or attributes (such as `@dragover`, `@drop`, or `aria-hidden`) passed to `DragPlaceholder` fall through to its root element, so it can be wired into a drag-and-drop list the same way a regular row would be.
