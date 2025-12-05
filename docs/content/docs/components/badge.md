::component-code
---
srcDir: 'badges/Badge.vue'
props: 
    styleType: "border"
    shape: "badge"
    color: "success"
    showDot: false
    closeable: false
    isTransparent: false
    showIcon: false
    text: "Badge"
    icon: "mdiHelp"
items:
    styleType:
        - value: border
          text: BORDER
        - value: flat
          text: FLAT
        - value: filled
          text: FILLED
    shape: 
        - value: badge
          text: BADGE
        - value: pill
          text: PILL
    color: 
        - value: neutral
          text: NEUTRAL
        - value: success
          text: SUCCESS
        - value: warning
          text: WARNING
        - value: danger
          text: DANGER
        - value: info
          text: INFO
        - value: primary-brand
          text: PRIMARY_BRAND
        - value : secondary-brand
          text: SECONDARY_BRAND
emits:
    close: "() => console.log('Badge clicked')"
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "styleType",
        "default": "BadgeStyle.BORDER",
        "type": "BadgeStyle",
    },
    {
        "name": "shape",
        "default": "BadgeShape.BADGE",
        "type": "BadgeShape",
    },
    {
        "name": "color",
        "default": "ColorAccent.NEUTRAL",
        "type": "ColorAccent",
    },
    {
        "name": "showDot",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "closeable",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "isTransparent",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "showIcon",
        "default": "false",
        "type": "boolean", 
    },
    {
        "name": "text",
        "default": "Badge",
        "type": "string",
    },
    {
        "name": "icon",
        "default": "mdiHelp",
        "type": "string",
    }
]
---
::

## Usage
### styleType

The `styleType` prop defines the badge appearance. It uses the `BadgeStyle` enum.

```vue
<template>
    <Badge :styleType="BadgeStyle.BORDER" />
</template>
```

#### Options

::options-table
---
options: [
    {
        value: "BORDER",
        description: "Applies an outline border with a subtle background"
    },
    {
        value: "FLAT",
        description: "Uses a borderless style with a subtle background"
    },
    {
        value: "FILLED",
        description: "Applies a bold background"
    },
]
---
::

### shape

The `shape` prop defines the badge shape. It uses the `BadgeShape` enum.

```vue
<template>
    <Badge :shape="BadgeShape.BADGE" />
</template>
```

#### Options

::options-table
---
options: [
    {
        value: "BADGE",
        description: "Badge-shaped format",
    },
    {
        value: "PILL",
        description: "Pill-shaped format",
    },
]
---
::

### color

Applies a color to the badge. It uses the `ColorAccent` enum.

```vue
<template>
    <Badge :color="ColorAccent.NEUTRAL" />
</template>
```

#### Options

::options-table
---
options: [
    {
        value: "NEUTRAL",
        description: "Neutral",
    },
    {
        value: "SUCCESS",
        description: "Success",
    },
    {
        value: "WARNING",
        description: "Warning",
    },
    {
        value: "DANGER",
        description: "Danger",
    },
    {
        value: "INFO",
        description: "Info",
    },
    {
        value: "PRIMARY_BRAND",
        description: "Primary Brand",
    },
    {
        value: "SECONDARY_BRAND",
        description: "Secondary Brand",
    },
]
---
::

### showDot

Displays a dot on the badge on the left side. 

```vue
<template>
    <Badge :showDot="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### closeable

Allows the badge to be closed by clicking on it. Uses the '@close' event.

```vue
<template>
    <Badge :closeable="true" @close="handleClose" />
</template>
<script setup lang="ts">
const handleClose = () => {
    console.log('Badge closed')
}
</script>
```

- **Type:** `boolean`
- **Default:** `false`
- **Emmiter:** `@close`

### isTransparent

Applies a transparent background to the badge. 

```vue
<template>
    <Badge :isTransparent="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showIcon

Displays an icon on the badge on the left side. In case of using `showDot`, the icon will appear on the right side of the dot. 
It can be combined with the `icon` to display a MDI icon.

```vue
<template>
    <Badge :showIcon="true" icon="mdiHelp" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### text

The text displayed on the badge. 

```vue
<template>
    <Badge text="I am a badge" />
</template>
```

- **Type:** `string`
- **Default:** `'Badge'`


### icon

The icon displayed on the badge. It requires the `showIcon` to be true.

```vue
<template>
    <Badge :showIcon="true" icon="mdiHelp" />
</template>
```

- **Type:** `string`
- **Default:** `'mdiHelp'`

## Emits
::options-table
---
options: [
    {
        value: "@close",
        description: Triggers a callback function while using closeable.,
    },
]
---
::

#### Example
```vue
<template>
    <Badge :closeable="true" @close="handleClose" />
</template>
<script setup lang="ts">
const handleClose = () => {
    console.log('Badge closed')
}
</script>
```
