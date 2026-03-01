## Component

::component-code
---
srcDir: 'rating/InteractiveRating.vue'
props: 
    modelValue: 5
    size: "md"
    color: "gold"
    emptyIndicatorIcon: "mdi:star-outline"
    halfIndicatorIcon: "mdi:star-half-full"
    fullIndicatorIcon: "mdi:star"
    hoverPreview: true
items:
    size: 
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
        - value: xl
          text: XL
        - value: xxl
          text: XXL
    color: 
        - value: gold
          text: GOLD
        - value: primary-brand
          text: PRIMARY_BRAND
external:
  - modelValue
enums:
    size: "RatingItemSize"
    color: "RatingItemColor"
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "default": "0",
        "type": "number",
    },
    {
        "name": "size",
        "default": "RatingItemSize.SM",
        "type": "RatingItemSize",
    },
    {
        "name": "color",
        "default": "RatingItemColor.GOLD",
        "type": "RatingItemColor",
    },
    {
        "name": "emptyIndicatorIcon",
        "default": "'mdi:star-outline'",
        "type": "string",
    },
    {
        "name": "halfIndicatorIcon",
        "default": "'mdi:star-half-full'",
        "type": "string",
    },
    {
        "name": "fullIndicatorIcon",
        "default": "'mdi:star'",
        "type": "string",
    },
    {
        "name": "hoverPreview",
        "default": "true",
        "type": "boolean",
    },
]
---
::

## Usage
### modelValue

Sets the value of the rating. Must be between `0` and `5`.

```vue
<template>
    <InteractiveRating :modelValue="4" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### size

Sets the size of the rating. Uses the `RatingItemSize` enum.

```vue
<template>
    <InteractiveRating :size="RatingItemSize.LG" />
</template>
```

- **Type:** `RatingItemSize`
- **Default:** `RatingItemSize.SM`

#### Options
::options-table
---
options: [
    {
        value: "SM",
        description: "sm",
    },
    {
        value: "MD",
        description: "md",
    },
    {
        value: "LG",
        description: "lg",
    },
    {
        value: "XL",
        description: "xl",
    },
    {
        value: "XXL",
        description: "xxl",
    },
]
---
::

### color

Sets the color of the rating. Uses the `RatingItemColor` enum.

```vue
<template>
    <InteractiveRating :color="RatingItemColor.PRIMARY_BRAND" />
</template>
```

- **Type:** `RatingItemColor`
- **Default:** `RatingItemColor.GOLD`

#### Options
::options-table
---
options: [
    {
        value: "GOLD",
        description: "Stars with gold color",
    },
    {
        value: "PRIMARY_BRAND",
        description: "Stars with primary brand color",
    },
]
---
::

### emptyIndicatorIcon

Sets the icon of the empty rating indicator.

```vue
<template>
    <InteractiveRating emptyIndicatorIcon="mdi:star-outline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:star-outline'`

### halfIndicatorIcon

Sets the icon of the half rating indicator. 

```vue
<template>
    <InteractiveRating halfIndicatorIcon="mdi:star-half-full" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:star-half-full'`

### fullIndicatorIcon

Sets the icon of the full rating indicator.

```vue
<template>
    <InteractiveRating fullIndicatorIcon="mdi:star" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:star'`

### hoverPreview

Sets whether the rating should show a preview when hovered.

```vue
<template>
    <InteractiveRating hoverPreview />
</template>
```
- **Type:** `boolean`
- **Default:** `true`
