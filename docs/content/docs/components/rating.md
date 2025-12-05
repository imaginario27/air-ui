::component-code
---
srcDir: 'rating/Rating.vue'
props: 
    value: 5
    size: "md"
    color: "gold"
    emptyIndicatorIcon: "mdiStarOutline"
    halfIndicatorIcon: "mdiStarHalfFull"
    fullIndicatorIcon: "mdiStar"
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

previewBackground: 'white'
---
::


## Props

::props-table
---
props: [
    {
        "name": "value",
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
]
---
::

## Usage
### value

Sets the value of the rating. Must be between `0` and `5`.

```vue
<template>
    <Rating :value="4" />
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
    <Rating emptyIndicatorIcon="mdiStarOutline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdiStarOutline'`

### halfIndicatorIcon

Sets the icon of the half rating indicator. Uses the `mdi` icon library.

```vue
<template>
    <Rating halfIndicatorIcon="mdiStarHalfFull" />
</template>
```

- **Type:** `string`
- **Default:** `'mdiStarHalfFull'`

### fullIndicatorIcon

Sets the icon of the full rating indicator. Uses the `mdi` icon library.

```vue
<template>
    <Rating fullIndicatorIcon="mdiStar" />
</template>
```

- **Type:** `string`
- **Default:** `'mdiStar'`

## RatingItem
The `<RatingItem />` component is used to render a single rating indicator. It used by the `<Rating />` and `<InteractiveRating />` component.

::component-code
---
srcDir: 'rating/RatingItem.vue'
props: 
    icon: "mdiStarOutline"
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

previewBackground: 'white'
---
::

### Props

::props-table
---
props: [
    {
        "name": "icon",
        "default": "'mdiStarOutline'",
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

Sets the icon of the rating indicator. Uses the `mdi` icon library.

```vue
<template>
    <RatingItem icon="mdiStarOutline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdiStarOutline'`

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