
## Component

::component-code
---
srcDir: 'dividers/Divider.vue'
props: 
    orientation: "horizontal"
    hideOnMobile: false
items:
    orientation: 
        - value: horizontal
          text: HORIZONTAL
        - value: vertical
          text: VERTICAL
enums:
    orientation: "Orientation"
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "orientation",
        "default": "Orientation.HORIZONTAL",
        "type": "Orientation",
    },
    {
        "name": "hideOnMobile",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "dividerClass",
        "type": "string",
    },
]
---
::

## Usage
### orientation

Sets the orientation of the divider. Uses the `Orientation` enum.

```vue
<template>
    <Divider :orientation="Orientation.VERTICAL" />
</template>
```

- **Type:** `Orientation`
- **Default:** `Orientation.HORIZONTAL`

#### Options
::options-table
---
options: [
    {
        value: "HORIZONTAL",
        description: "horizontal",
    },
    {
        value: "VERTICAL",
        description: "vertical",
    },
]
---
::

### hideOnMobile

Hides the divider on mobile devices.

```vue
<template>
    <Divider :hideOnMobile="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### dividerClass

Overrides the divider's line class (color and thickness). Falls back to `border-border-default` (horizontal) / `bg-border-default` (vertical) when not set.

```vue
<template>
    <Divider dividerClass="border-border-neutral-subtle" />
</template>
```

- **Type:** `string`
- **Default:** `undefined`

## Custom styles

The divider can be styled by passing Tailwind classes through `class` prop.

```vue
<template>
    <Divider class="border-2 border-black" />
</template>
```