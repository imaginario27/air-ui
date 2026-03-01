
## Component

::component-code
---
srcDir: 'progress/ProgressBar.vue'
props:
    progress: 50
    color: "primary-brand"
    size: "sm"
    isRounded: true
    showProgressLabel: false
    progressLabelPosition: "top"
    progressLabelAlignment: "center"
    min: 0
    max: 100
    isIndeterminate: false
    loadingText: "Loading..."
    progressClass: ""
    progressLabelClass: ""
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
    progressLabelPosition: 
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
    progressLabelAlignment: 
        - value: left
          text: LEFT
        - value: center
          text: CENTER
        - value: right
          text: RIGHT
enums:
    color: "ColorAccent"
    size: "ProgressBarSize"
    progressLabelPosition: "Position"
    progressLabelAlignment: "Align"
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "progress",
        "default": "50",
        "type": "number",
    },
    {
        "name": "color",
        "default": "ColorAccent.PRIMARY_BRAND",
        "type": "ColorAccent",
    },
    {
        "name": "size",
        "default": "ProgressBarSize.SM",
        "type": "ProgressBarSize",
    },
    {
        "name": "isRounded",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "showProgressLabel",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "progressLabelPosition",
        "default": "Position.TOP",
        "type": "Position",
    },
    {
        "name": "progressLabelAlignment",
        "default": "Align.CENTER",
        "type": "Align",
    },
    {
        "name": "min",
        "default": "0",
        "type": "number",
    },
    {
        "name": "max",
        "default": "100",
        "type": "number",
    },
    {
        "name": "isIndeterminate",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "loadingText",
        "default": "'Loading...'",
        "type": "string",
    },
    {
        "name": "progressClass",
        "type": "string",
    },
    {
        "name": "progressLabelClass",
        "type": "string",
    },
]
---
::

## Usage
### progress

Sets the current progress value of the progress bar.

```vue
<template>
    <ProgressBar :progress="75" />
</template>
```

- **Type:** `number`
- **Default:** `50`

### color

Sets the color of the progress bar. Uses the `ColorAccent` enum.

```vue
<template>
    <ProgressBar :color="ColorAccent.SUCCESS" />
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

### size

Sets the size of the progress bar. Uses the `ProgressBarSize` enum.

```vue
<template>
    <ProgressBar :size="ProgressBarSize.LG" />
</template>
```

- **Type:** `ProgressBarSize`
- **Default:** `ProgressBarSize.SM`

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
]
---
::

### isRounded

If `true`, applies rounded corners to the progress bar.

```vue
<template>
    <ProgressBar :isRounded="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### showProgressLabel

If `true`, displays the progress label.

```vue
<template>
    <ProgressBar :showProgressLabel="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### progressLabelPosition

Sets the position of the progress label. Uses the `Position` enum.

```vue
<template>
    <ProgressBar :progressLabelPosition="Position.BOTTOM" />
</template>
```

- **Type:** `Position`
- **Default:** `Position.TOP`

#### Options
::options-table
---
options: [
    {
        value: "TOP",
        description: "Position the label above the progress bar.",
    },
    {
        value: "BOTTOM",
        description: "Position the label below the progress bar.",
    },
]
---
::

### progressLabelAlignment

Sets the horizontal alignment of the progress label. Uses the `Align` enum.

```vue
<template>
    <ProgressBar :progressLabelAlignment="Align.RIGHT" />
</template>
```

- **Type:** `Align`
- **Default:** `Align.CENTER`

#### Options
::options-table
---
options: [
    {
        value: "LEFT",
        description: "Align the label to the left.",
    },
    {
        value: "CENTER",
        description: "Center the label.",
    },
    {
        value: "RIGHT",
        description: "Align the label to the right.",
    },
]
---
::

### min

Sets the minimum value of the progress bar.

```vue
<template>
    <ProgressBar :min="0" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### max

Sets the maximum value of the progress bar.

```vue
<template>
    <ProgressBar :max="100" />
</template>
```

- **Type:** `number`
- **Default:** `100`

### isIndeterminate

If `true`, the progress bar will display an indeterminate loading state.

```vue
<template>
    <ProgressBar :isIndeterminate="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### loadingText

Sets the text to display when the progress bar is in an indeterminate state.

```vue
<template>
    <ProgressBar :isIndeterminate="true" loadingText="Please wait..." />
</template>
```

- **Type:** `string`
- **Default:** `'Loading...'`

### progressClass

Allows you to add custom classes to the progress bar element.

```vue
<template>
    <ProgressBar progressClass="bg-gradient-to-r from-green-400 to-blue-500" />
</template>
```

- **Type:** `string`

### progressLabelClass

Allows you to add custom classes to the progress label element.

```vue
<template>
    <ProgressBar progressLabelClass="font-bold text-lg" />
</template>
```

- **Type:** `string`