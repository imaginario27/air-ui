## Component

::component-code
---
srcDir: 'icons/ContainedIcon.vue'
props: 
    icon: "mdi:help"
    styleType: "flat"
    type: "collection"
    mode: "css"
    shape: "circle"
    color: "neutral"
    size: "lg"
items:
    styleType:
        - value: flat
          text: FLAT
        - value: filled
          text: FILLED
    type:
        - value: native
          text: NATIVE
        - value: collection
          text: COLLECTION
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
previewBackground: 'white'
---
::

## Setup

By default, the `Icon` component uses the **Nuxt Mdi module** to render icons. Additionally, it supports iconify collections provided by the **Nuxt Icon module**.

In the event of using the iconify collections by using the type `IconType.COLLECTION`, ensure that you have the Nuxt Icon module installed and configured in your Nuxt project.

### Iconify collection usage

First and foremost, add the module to your `nuxt.config.ts` file:

```ts
export default defineNuxtConfig({
    modules: ['@nuxt/icon'],
})
```

Secondly, decide whether you want to use local setup or server-served icons.

### Local setup

Install the desired icon collection:

```bash
npm install @iconify-json/collection-name
```

### Server-served icons

Add the Nuxt Icon module to your `nuxt.config.ts` file and configure the server bundle to include the desired icon collections:

```ts
export default defineNuxtConfig({
    modules: ['@nuxt/icon'],
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
        "default": "mdiHelp",
        "type": "any",
    },
    {
        "name": "styleType",
        "default": "IconContainerStyleType.FLAT",
        "type": "IconContainerStyleType",
    },
    {
        "name": "type",
        "default": "IconType.NATIVE",
        "type": "IconType",
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
]
---
::

## Usage
### icon 

Sets the icon to be displayed. 

- For **native icons** (e.g., Material Design Icons), use the PascalCase format — for example: `mdiAccount`.
- For **collection-based icons**, use the standard format: `collectionName:iconName` — for example: `mdi:account`.

```vue
<template>
    <ContainedIcon icon="mdiAccount" />
</template>
``` 

- **Type:** `string`
- **Default:** `'mdiHelp'`

<br />

::content-alert
---
props:
    title: "Important"
    description: "The Nuxt Icon module component is renamed to 'NuxtIcon' (original name: 'Icon') by the design system to avoid conflicts. So take this into account when reviewing the docs pages and if you are using it directly without the design system 'Icon' component."
---
::

#### Custom icon collections

By using the `IconType.COLLECTION` type, you can leverage custom icon collections.

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

### type

Sets the type of icon to be used. It uses the `IconType` enum.

```vue
<template>
    <ContainedIcon 
        :type="IconType.NATIVE" 
        icon="mdiAccount" 
    />
</template>
```

- **Type:** `IconType`
- **Default:** `IconType.NATIVE`

#### Options
::options-table
---
options: [
    {
        value: "NATIVE",
        description: "Native Icon",
    },
    {
        value: "COLLECTION",
        description: "Collection-based Icon",
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
        icon="mdiAccount" 
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
