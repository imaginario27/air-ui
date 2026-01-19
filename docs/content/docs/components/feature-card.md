## Component

::component-code
---
srcDir: 'cards/specific/FeatureCard.vue'
props: 
    title: "Feature title"
    description: "Feature description"
    icon: "mdi:help"
    containedIconShape: "circle"
    containedIconStyleType: "filled"
    containedIconColor: "secondary-brand"
    align: "left"
items:
    containedIconShape: 
        - value: square
          text: SQUARE
        - value: circle
          text: CIRCLE
    containedIconStyleType: 
        - value: flat
          text: FLAT
        - value: filled
          text: FILLED
    containedIconColor: 
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
    align: 
        - value: left
          text: LEFT
        - value: center
          text: CENTER
---
::

## Props

::props-table
---
props: [
    {
        "name": "title",
        "default": "Feature title",
        "type": "string",
    },
    {
        "name": "description",
        "default": "Feature description",
        "type": "string",
    },
    {
        "name": "icon",
        "default": "mdi:help",
        "type": "string",
    },
    {
        "name": "containedIconShape",
        "default": "IconContainerShape.CIRCLE",
        "type": "IconContainerShape",
    },
    {
        "name": "containedIconStyleType",
        "default": "IconContainerStyleType.FILLED",
        "type": "IconContainerStyleType",
    },
    {
        "name": "containedIconColor",
        "default": "ColorAccent.SECONDARY_BRAND",
        "type": "ColorAccent",
    },
    {
        "name": "align",
        "default": "Align.LEFT",
        "type": "Align",
    },
]
---
::


## Usage
### title
Sets the title of the feature.

```vue
<template>
    <FeatureCard 
        title="Feature title"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Feature title'`

### description
Sets the description of the feature.

```vue
<template>
    <FeatureCard 
        description="Feature description"
    />
</template>
``` 

- **Type:** `string`
- **Default:** `'Feature description'`

### icon
Sets the icon of the feature.

```vue
<template>
    <FeatureCard 
        icon="mdi:help"
    />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:help'`

### containedIconShape
Stablishes the shape of the contained icon. Uses the `IconContainerShape` enum.

```vue
<template>
    <FeatureCard 
        :containedIconShape="IconContainerShape.CIRCLE"
    />
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
        description: "Rounded icon container shape",
    },
    {
        value: "SQUARE",
        description: "Square icon container shape",
    },
]
---
::

### containedIconStyleType
Configures the style type of the contained icon. Uses the `IconContainerStyleType` enum.

```vue
<template>
    <FeatureCard 
        :containedIconStyleType="IconContainerStyleType.FILLED"
    />
</template>
```

- **Type:** `IconContainerStyleType`
- **Default:** `IconContainerStyleType.FILLED`

#### Options

::options-table
---
options: [
    {
        value: "FLAT",
        description: "Uses a soft background for the icon container",
    },
    {
        value: "FILLED",
        description: "Uses a bold background for the icon container",
    },
]
---
::

### containedIconColor
Configures the color of the contained icon. Uses the `ColorAccent` enum.

```vue
<template>
    <FeatureCard 
        :containedIconColor="ColorAccent.SECONDARY_BRAND"
    />
</template>
```

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.SECONDARY_BRAND`

#### Options

::options-table
---
options: [
    {
        value: "neutral",
        description: "Neutral",
    },
    {
        value: "success",
        description: "Success",
    },
    {
        value: "warning",
        description: "Warning",
    },
    {
        value: "danger",
        description: "Danger",
    },
    {
        value: "info",
        description: "Info",
    },
    {
        value: "primary-brand",
        description: "Primary Brand",
    },
    {
        value: "secondary-brand",
        description: "Secondary Brand",
    },
]
---
::

### align
Sets the horizontal alignment of the content. Uses the `Align` enum.

```vue
<template>
    <FeatureCard 
        :align="Align.LEFT"
    />
</template>
```

- **Type:** `Align`
- **Default:** `Align.LEFT`

#### Options

::options-table
---
options: [
    {
        value: "LEFT",
        description: "Content aligns to the left side of the card.",
    },
    {
        value: "CENTER",
        description: "Content aligns to the center of the card.",
    },
]
---
::