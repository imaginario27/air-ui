
## Component

::component-code
---
srcDir: 'dividers/TextLineDivider.vue'
props: 
    text: "Text"
    styleType: "neutral"
    size: "xs"
    align: "center"
items:
    styleType: 
        - value: neutral
          text: NEUTRAL
        - value: primary-brand
          text: PRIMARY_BRAND
        - value: secondary-brand
          text: SECONDARY_BRAND
    size: 
        - value: xs
          text: XS
        - value: sm
          text: SM
    align: 
        - value: left
          text: LEFT
        - value: center
          text: CENTER

previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "text",
        "default": "'Text'",
        "type": "string",
    },
    {
        "name": "styleType",
        "default": "DividerStyle.NEUTRAL",
        "type": "DividerStyle",
    },
    {
        "name": "size",
        "default": "DividerSize.XS",
        "type": "DividerSize",
    },
    {
        "name": "align",
        "default": "Align.CENTER",
        "type": "Align",    
    },
]
---
::

## Usage

### text

Sets the text of the divider.

```vue
<template>
    <Divider text="Example text" />
</template>
```

- **Type:** `'Text'`
- **Default:** `string`

### styleType

Sets the style of the divider. Uses the `DividerStyle` enum.

```vue
<template>
    <Divider :styleType="DividerStyle.PRIMARY_BRAND" />
</template>
```

#### Options
::options-table
---
options: [
    {
        value: "DividerStyle.NEUTRAL",
        description: "The text has a neutral color.",
    },
    {
        value: "DividerStyle.PRIMARY_BRAND",
        description: "The text has a primary-brand color.",
    },
    {
        value: "DividerStyle.SECONDARY_BRAND",
        description: "The text has a secondary-brand color.",
    },
]
---
::

### size

Sets the size of the divider. Uses the `DividerSize` enum.

```vue
<template>
    <Divider :size="DividerSize.SM" />
</template>
```

#### Options
::options-table
---
options: [
    {
        value: "DividerSize.XS",
        description: "Uses a small text size.",
    },
    {
        value: "DividerSize.SM",
        description: "Uses a medium text size.",
    },
]
---
::

### align

Sets the alignment of the divider. Uses the `Align` enum.

```vue
<template>
    <Divider :align="Align.LEFT" />
</template>
```

#### Options
::options-table
---
options: [
    {
        value: "Align.LEFT",
        description: "Displays the text aligned to the left with a right line divider.",
    },
    {
        value: "Align.CENTER",
        description: "Displays the text aligned to the center with line dividers at both sides.",
    },
]
---
::