## Component

::component-code
---
srcDir: 'badges/BadgeStack.vue'
props: 
    items: 
        - text: "Badge 1"
        - text: "Badge 2"
        - text: "Badge 3"
        - text: "Badge 4"
        - text: "Badge 5"
    styleType: "border"
    shape: "badge"
    color: "neutral"
    showDot: false
    closeable: false
    isTransparent: false
    showIcon: false
    itemsLimit: 3
    counterType: "ellipsis"
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
        - value: secondary-brand
          text: SECONDARY_BRAND
    counterType:
        - value: ellipsis
          text: ELLIPSIS
        - value: counter
          text: COUNTER
external:
  - items
externalTypes:
  - Badge[]
propsSettingsExcludedProps: ['items']
---
::

## Props

::props-table
---
props: [
    {
        "name": "items",
        "default": "An example array",
        "type": "Badge[]"
    },
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
        "name": "itemsLimit",
        "default": "null",
        "type": "number | null",
    },
    {
        "name": "counterType",
        "default": "StackCounterType.ELLIPSIS",
        "type": "StackCounterType",
    },
]
---
::

## Usage
### items
The `items` prop defines the badges to be displayed.

```vue
<template>
    <BadgeStack :items="items" />
</template>
<script setup lang="ts">
const items = [
    { text: "Badge 1" },
    { text: "Badge 2" },
    { text: "Badge 3" },
    { text: "Badge 4" },
    { text: "Badge 5" },
]
</script>
```

#### TypeScript interface
```ts
interface Badge {
    text: string 
    icon?: string 
}
```

### styleType

The `styleType` prop defines the badge appearance. It uses the `BadgeStyle` enum.

```vue
<template>
    <Badge :styleType="BadgeStyle.BORDER" />
</template>
```

- **Type:** `BadgeStyle`
- **Default:** `BadgeStyle.BORDER`

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

- **Type:** `BadgeShape`
- **Default:** `BadgeShape.BADGE`

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

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.NEUTRAL`

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

### itemsLimit
The `itemsLimit` prop sets the maximum number of items displayed in the badge stack.

```vue
<template>
    <BadgeStack :itemsLimit="3" />
</template>
```

- **Type:** `number | null`
- **Default:** `null`

### counterType

Sets the counter type. It will only appear if the `itemsLimit` prop is set to a value lower than the amount of items. It uses the `StackCounterType` enum.

```vue
<template>
    <BadgeStack :itemsLimit="3" :counterType="StackCounterType.COUNTER" />
</template>
```

- **Type:** `StackCounterType`
- **Default:** `StackCounterType.ELLIPSIS`

#### Options

::options-table
---
options: [
    {
        value: "COUNTER",
        description: [
            "If the total amount of items is higher than: ",
            { type: "code", content: "itemsLimit" },
            "it will display a counter with the amount of items that are remaining from the total. In case of having more than 9 items, it will display '+9'.",
        ],
    },
    {
        value: "ELLIPSIS",
        description: "In the event of more items than the limit or the base limit (9 items), it will display an ellipsis (...).",
    },
]
---
::