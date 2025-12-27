## Component

::component-code
---
srcDir: 'icons/ContainedIcon.vue'
props: 
    styleType: "flat"
    icon: "mdiHelp"
    shape: "circle"
    color: "neutral"
    size: "lg"
items:
    styleType:
        - value: flat
          text: FLAT
        - value: filled
          text: FILLED
    shape: 
        - value: circle
          text: CIRCLE
        - value: square
          text: SQUARE
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
    size:
        - value: 3xl
          text: XXXL
        - value: 2xl
          text: XXL
        - value: xl
          text: XL
        - value: lg
          text: LG
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "styleType",
        "default": "IconContainerStyleType.FLAT",
        "type": "IconContainerStyleType",
    },
    {
        "name": "icon",
        "default": "mdiHelp",
        "type": "any",
    },
    {
        "name": "shape",
        "default": "IconContainerShape.CIRCLE",
        "type": "IconContainerShape",
    },
    {
        "name": "color",
        "default": "ColorAccent.NEUTRAL",
        "type": "ColorAccent",
    },
    {
        "name": "size",
        "default": "IconContainerSize.XL", 
        "type": "IconContainerSize",
    },   
]
---
::

## Usage
### styleType

The `styleType` prop defines the contained icon appearance. It uses the `IconContainerStyleType` enum.

```vue
<template>
    <ContainedIcon 
        :styleType="IconContainerStyleType.FLAT"
    />
</template>
```

- **Type:** `IconContainerStyleType`
- **Default:** `IconContainerStyleType.FLAT`

#### Options

::options-table
---
options: [
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

## icon

Defines the icon to be displayed on the contained icon. 

```vue
<template>
    <ContainedIcon :icon="mdiHelp" />
</template>
```

- **Type:** `string`
- **Default:** `'mdiHelp'`

### shape

Defines the contained icon shape. It uses the `IconContainerShape` enum.

```vue
<template>
    <ContainedIcon :shape="IconContainerShape.CIRCLE" />
</template>
```

- **Type:** `IconContainerShape`
- **Default:** `IconContainerShape.CIRCLE`

#### Options

::options-table
---
options: [
    {
        value: "CIRCLE",
        description: "Circle-shaped format",
    },
    {
        value: "SQUARE",
        description: "Square-shaped format",
    },
]
---
::

## color

Defines the contained icon color. It uses the `ColorAccent` enum.

```vue
<template>
    <ContainedIcon :color="ColorAccent.SUCCESS" />
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

### size

Defines the contained icon size. It uses the `IconContainerSize` enum.

```vue
<template>
    <ContainedIcon :size="IconContainerSize.XL" />
</template>
```

- **Type:** `IconContainerSize`
- **Default:** `IconContainerSize.XL`

#### Options

::options-table
---
options: [
    {
        value: "XXXL",
        description: "xxxl",
    },
    {
        value: "XXL",
        description: "XXL",
    },
    {
        value: "XL",
        description: "XL",
    },
    {
        value: "LG",
        description: "LG",
    },
]
---
::
