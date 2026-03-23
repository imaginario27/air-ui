## Component

::component-code
---
srcDir: 'icons/ContainedIcon.vue'
props: 
    icon: "mdi:help"
    styleType: "flat"
    mode: "css"
    shape: "circle"
    color: "neutral"
    size: "lg"
    iconSize: ""
items:
    styleType:
        - value: flat
          text: FLAT
        - value: filled
          text: FILLED
    mode:
        - value: css
          text: CSS
        - value: svg
          text: SVG
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
    iconSize:
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
        - value: xl
          text: XL
        - value: 2xl
          text: XXL
enums:
    styleType: "IconContainerStyleType"
    mode: "IconMode"
    shape: "IconContainerShape"
    color: "ColorAccent"
    size: "IconContainerSize"
    iconSize: "IconSize"
previewBackground: 'white'
---
::

## Setup

The `Icon` component uses the **Nuxt Icon module** to render icons. 

Please, make sure you have the Nuxt Icon module installed and configured in your Nuxt project.

In order to use icon collections, decide whether you want to use local setup or server-served icons.

### Local setup

Install the desired icon collection:

```bash
npm install @iconify-json/collection-name
```

### Server-served icons

Configure the server bundle to include the desired icon collections:

```ts
export default defineNuxtConfig({
    icon: {
        serverBundle: {
            collections: ['mdi'] 
        }
    }
})
```

## Props

::props-table
---
props: [
    {
        "name": "icon",
        "default": "mdi:help",
        "type": "string",
    },
    {
        "name": "styleType",
        "default": "IconContainerStyleType.FLAT",
        "type": "IconContainerStyleType",
    },
    {
        "name": "mode",
        "default": "IconMode.CSS",
        "type": "IconMode",
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
    {
        "name": "iconSize",
        "type": "IconSize",
    }
]
---
::

## Usage
### icon 

Sets the icon to be displayed. 

```vue
<template>
    <ContainedIcon icon="mdi:account" />
</template>
``` 

- **Type:** `string`
- **Default:** `'mdi:help'`

<br />

::content-alert
---
props:
    title: "Important"
    description: "The Nuxt Icon module component is renamed to 'NuxtIcon' (original name: 'Icon') by the design system to avoid conflicts. So take this into account when reviewing the docs pages and if you are using it directly without the design system 'Icon' component."
---
::

#### Custom icon collections

To use custom icon collections, you need to configure them in your `nuxt.config.ts` file. Here's an example of how to add a custom icon collection:

```ts
export default defineNuxtConfig({
    modules: [
    '@nuxt/icon'
    ],
    icon: {
        customCollections: [
            {
                prefix: 'my-icon',
                dir: './assets/my-icons',
                // if you want to include all the icons in nested directories:
                // recursive: true,
            },
        ],
    },
})
```

::content-alert
---
props:
    title: "Important"
    description: "To ensure that the custom icons use the correct colors, make sure to set the `fill` and/or `stroke` attributes in your SVG files to `currentColor`."
---
::

For further information, please refer to the [Nuxt Icon module documentation](https://nuxt.com/modules/icon){:target="_blank"}.

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

### mode

Sets the rendering mode of the icon. It uses the `IconMode` enum.

Only works when using `IconType.COLLECTION`.

```vue
<template>
    <ContainedIcon 
        :mode="IconMode.CSS" 
        icon="mdi:account" 
    />
</template>
```

- **Type:** `IconMode`
- **Default:** `IconMode.CSS`

#### Options
::options-table
---
options: [
    {
        value: "CSS",
        description: "Renders the icon using CSS background-image",
    },
    {
        value: "SVG",
        description: "Renders the icon as inline SVG",
    },
]
---
::

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

### iconSize
Defines the contained icon size. It uses the `IconSize` enum.

```vue
<template>
    <ContainedIcon :iconSize="IconSize.LG" />
</template>
```

- **Type:** `IconSize`

## Documentation pages
- [Docs](https://nuxt.com/modules/icon){:target="_blank"}
- [Icon library](https://icones.js.org/){:target="_blank"}