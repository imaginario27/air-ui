

## Component

::component-code
---
srcDir: 'icons/Icon.vue'
props:
    icon: "mdi:help"
    type: "collection"
    mode: "css"
    size: "md"
    color: "neutral"
    svgCustomize: false
    iconClass: ""
items:
    size:
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
previewBackground: 'white'
propsSettingsExcludedProps: ['svgCustomize']
---
::

## Setup

By default, the `Icon` component uses the **Nuxt Mdi module** to render icons. Additionally, it supports iconify collections provided by the **Nuxt Icon module**.

In the event of using the iconify collections by using the type `IconType.COLLECTION`, ensure that you have the Nuxt Icon module installed and configured in your Nuxt project.

### Iconify collection usage

Decide whether you want to use local setup or server-served icons.

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
        "default": "'mdiHelp'",
        "type": "string",
    },
    {
        "name": "type",
        "default": "IconType.COLLECTION",
        "type": "IconType",
    },
    {
        "name": "mode",
        "default": "IconMode.CSS",
        "type": "IconMode",
    },
    {
        "name": "size",
        "default": "IconSize.MD",
        "type": "IconSize",
    },
    {
        "name": "color",
        "default": "ColorAccent.NEUTRAL",
        "type": "ColorAccent",
    },
    {
        "name": "svgCustomize",
        "type": "CollectionCustomizeCallback",
    },
    {
        "name": "iconClass",
        "type": "string",
    }
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
    <Icon icon="mdiAccount" />
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

### type

Sets the type of icon to be used. It uses the `IconType` enum.

```vue
<template>
    <Icon 
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
    <Icon 
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

### size

Sets the size of the icon. Uses the `IconSize` enum.

```vue
<template>
    <Icon :size="IconSize.LG" />
</template>
```

- **Type:** `IconSize`
- **Default:** `IconSize.MD`

#### Options
::options-table
---
options: [
    {
        value: "XS",
        description: "Extra Small",
    },
    {
        value: "SM",
        description: "Small",
    },
    {
        value: "MD",
        description: "Medium",
    },
    {
        value: "LG",
        description: "Large",
    },
    {
        value: "XL",
        description: "Extra Large",
    },
    {
        value: "2XL",
        description: "2 Extra Large",
    },
]
---
::

### color

Sets the color of the icon. Uses the `ColorAccent` enum.

```vue
<template>
    <Icon :color="ColorAccent.SUCCESS" />
</template>
```

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.PRIMARY_BRAND`

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

### svgCustomize

A callback function that allows you to customize the SVG content of the icon before it is rendered. This function receives the SVG string as an argument and should return the modified SVG string.

It only works when using `IconType.COLLECTION` with `mode="svg"`.

```vue
<template>
    <Icon 
        icon="mdiAccount" 
        :svgCustomize="customizeSVG" 
        type="collection" 
        mode="svg" 
    />
</template>
<script setup lang="ts">
// Define the customize function to modify SVG content
const customizeSVG = (content: string, name: string, prefix: string, provider: string) => {
  if (prefix !== 'tabler') return content // Ignore Prefix

  return content
    .replace(/stroke-width="[^"]*"/g, `stroke-width="2"`) // Change stroke width to 2
    .replace(/stroke="[^"]*"/g, `stroke="#FF5733"`) // Change stroke color to red
    .replace(/fill="[^"]*"/g, `fill="#FF5733"`) // Change fill color to red
    .replace(/animation-duration="[^"]*"/g, `animation-duration="1s"`) // Change animation duration to 1s (for animated icons)
    .replace(/opacity="[^"]*"/g, `opacity="0.8"`);// Change opacity to 0.8
}
</script>
```

- **Type:** `CollectionCustomizeCallback`

#### CollectionCustomizeCallback type
```ts
type CollectionCustomizeCallback = (
    svg: string,
    name?: string,
    prefix?: string,
    provider?: string,
) => string
```

### iconClass

Adds custom CSS classes to the icon element.

```vue
<template>
    <Icon icon="mdiAccount" iconClass="custom-icon-class" />
</template>
```

- **Type:** `string`

## Documentation pages
### Nuxt Mdi
- [Docs](https://nuxt.com/modules/nuxt-mdi){:target="_blank"}
- [Icon library](https://pictogrammers.com/library/mdi/){:target="_blank"}

### Collection icons
- [Docs](https://nuxt.com/modules/icon){:target="_blank"}
- [Icon library](https://icones.js.org/){:target="_blank"}