## Component

::component-code
---
srcDir: 'rating/InteractiveRating.vue'
props: 
    modelValue: 5
    size: "md"
    color: "gold"
    emptyIndicatorIcon: "mdiStarOutline"
    halfIndicatorIcon: "mdiStarHalfFull"
    fullIndicatorIcon: "mdiStar"
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
        "default": "'mdiStarOutline'",
        "type": "string",
    },
    {
        "name": "halfIndicatorIcon",
        "default": "'mdiStarHalfFull'",
        "type": "string",
    },
    {
        "name": "fullIndicatorIcon",
        "default": "'mdiStar'",
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

Sets the icon of the empty rating indicator. Uses the `mdi` icon library.

```vue
<template>
    <InteractiveRating emptyIndicatorIcon="mdiStarOutline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdiStarOutline'`

### halfIndicatorIcon

Sets the icon of the half rating indicator. Uses the `mdi` icon library.

```vue
<template>
    <InteractiveRating halfIndicatorIcon="mdiStarHalfFull" />
</template>
```

- **Type:** `string`
- **Default:** `'mdiStarHalfFull'`

### fullIndicatorIcon

Sets the icon of the full rating indicator. Uses the `mdi` icon library.

```vue
<template>
    <InteractiveRating fullIndicatorIcon="mdiStar" />
</template>
```

- **Type:** `string`
- **Default:** `'mdiStar'`

### hoverPreview

Sets whether the rating should show a preview when hovered.

```vue
<template>
    <InteractiveRating hoverPreview />
</template>
```
- **Type:** `boolean`
- **Default:** `true`
