## Component

::component-code
---
srcDir: 'rating/Rating.vue'
props:
    modelValue: 5
    size: "md"
    color: "gold"
    emptyIndicatorIcon: "mdi:star-outline"
    halfIndicatorIcon: "mdi:star-half-full"
    fullIndicatorIcon: "mdi:star"
    isInteractive: false
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
        "name": "isInteractive",
        "default": "false",
        "type": "boolean",
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

Sets the value of the rating. Must be between `0` and `5`. Supports `v-model` when `isInteractive` is enabled.

```vue
<template>
    <Rating :modelValue="4" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### size

Sets the size of the rating. Uses the `RatingItemSize` enum.

```vue
<template>
    <Rating :size="RatingItemSize.LG" />
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
    <Rating :color="RatingItemColor.PRIMARY_BRAND" />
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
    <Rating emptyIndicatorIcon="mdi:star-outline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:star-outline'`

### halfIndicatorIcon

Sets the icon of the half rating indicator.

```vue
<template>
    <Rating halfIndicatorIcon="mdi:star-half-full" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:star-half-full'`

### fullIndicatorIcon

Sets the icon of the full rating indicator.

```vue
<template>
    <Rating fullIndicatorIcon="mdi:star" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:star'`

### isInteractive

When set to `true`, the rating becomes interactive: items show a hand cursor, clicking sets the value (clicking the current value resets it to `0`), and `v-model` updates are emitted.

```vue
<template>
    <Rating v-model="rating" isInteractive />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hoverPreview

When `isInteractive` is enabled, sets whether the rating should show a preview when hovered.

```vue
<template>
    <Rating v-model="rating" isInteractive hoverPreview />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

## RatingItem
The `<RatingItem />` component is used to render a single rating indicator. It is used by the `<Rating />` component.

::component-code
---
srcDir: 'rating/RatingItem.vue'
props:
    icon: "mdi:star-outline"
    size: "md"
    color: "gold"
    isInteractive: false
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
enums:
    size: "RatingItemSize"
    color: "RatingItemColor"
previewBackground: 'white'
---
::

### Props

::props-table
---
props: [
    {
        "name": "icon",
        "default": "'mdi:star-outline'",
        "type": "string",
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
        "name": "isInteractive",
        "default": "false",
        "type": "boolean",
    },
]
---
::

### icon

Sets the icon of the rating indicator.

```vue
<template>
    <RatingItem icon="mdi:star-outline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:star-outline'`

### size and color

The use of `size` and `color` props is exactly the same as in the `Rating` component props.

```vue
<template>
    <RatingItem
        :color="RatingItemColor.GOLD"
        :size="RatingItemSize.SM"
    />
</template>
```

### isInteractive

Sets the interactive state of the rating indicator. If set to `true`, the rating indicator will display a hand cursor when hovered.
