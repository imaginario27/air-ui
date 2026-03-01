## Component

::component-code
---
srcDir: 'layouts/Overtitle.vue'
props: 
    title: "Overtitle"
    isUppercase: true
    color: "secondary-brand"
items:
    color:
        - value: primary-brand
          text: PRIMARY BRAND
        - value: secondary-brand
          text: SECONDARY BRAND
        - value: neutral
          text: NEUTRAL
enums:
    color: "ColorAccent"
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "title",
        "default": "'Overtitle'",
        "type": "string"
    },
    {
        "name": "isUppercase",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "color",
        "default": "ColorAccent.SECONDARY_BRAND",
        "type": "ColorAccent.PRIMARY_BRAND | ColorAccent.SECONDARY_BRAND | ColorAccent.NEUTRAL"
    }
]
---
::

## Usage
### title

Sets the text to be displayed as the overtitle.

```vue
<template>
  <Overtitle title="Section Title" />
</template>
```

- **Type:** `string`
- **Default:** `'Overtitle'`

### isUppercase

Determines whether the overtitle text should be displayed in uppercase letters.

```vue
<template>
  <Overtitle title="Section Title" :isUppercase="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### color

Sets the color of the overtitle text. Accepts predefined color accents.

```vue
<template>
  <Overtitle :color="ColorAccent.PRIMARY_BRAND" />
</template>
``` 

- **Type:** `ColorAccent.PRIMARY_BRAND | ColorAccent.SECONDARY_BRAND | ColorAccent.NEUTRAL`
- **Default:** `ColorAccent.SECONDARY_BRAND`


#### Options

::options-table
---
options: [
    {
        value: "NEUTRAL",
        description: "Neutral",
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