## Component

::component-code
---
srcDir: 'badges/IconTextBadge.vue'
props: 
    color: "success"
    text: "Badge"
    icon: "mdi:help"
items:
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
enums:
    color: "ColorAccent"
---
::

## Props
::props-table
---
props: [
    {
        "name": "color",
        "default": "ColorAccent.NEUTRAL",
        "type": "ColorAccent",
    },
    {
        "name": "text",
        "default": "Badge",
        "type": "string",
    },
    {
        "name": "icon",
        "default": "mdi:help",
        "type": "string",
    }
]
---
::

## Usage
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

The icon displayed on the badge. 

```vue
<template>
    <Badge :showIcon="true" icon="mdi:help" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:help'`