## Component

::component-code
---
srcDir: 'progress/ProgressCircle.vue'
props:
    progress: 27
    color: "primary-brand"
    size: "md"
    isRounded: true
    showProgressLabel: true
    progressLabelPosition: "center"
    min: 0
    max: 100
    isIndeterminate: false
    loadingText: "Loading..."
    ariaLabel: "Progress"
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
    progressLabelPosition:
        - value: center
          text: CENTER
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
enums:
    color: "ColorAccent"
    size: "ProgressCircleSize"
    progressLabelPosition: "ProgressCircleLabelPosition"
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
        "default": "ProgressCircleSize.MD",
        "type": "ProgressCircleSize",
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
        "default": "ProgressCircleLabelPosition.CENTER",
        "type": "ProgressCircleLabelPosition",
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
        "name": "ariaLabel",
        "default": "'Progress'",
        "type": "string",
    },
]
---
::

## Slots

::slots-table
---
slots: [
    {
        name: "default",
        description: "Replaces the content shown at the center of the ring. Receives the current percentage as the `progress` slot prop. Takes precedence over the built-in center label.",
    },
]
---
::

```vue
<template>
    <ProgressCircle :progress="100" color="success">
        <template #default>
            <Icon name="mdi:check" />
        </template>
    </ProgressCircle>
</template>
```

## Usage
### progress

Sets the current progress. It is clamped between `min` and `max`.

```vue
<template>
    <ProgressCircle :progress="75" />
</template>
```

- **Type:** `number`
- **Default:** `50`

### color

Sets the accent color of the indicator and its track.

```vue
<template>
    <ProgressCircle :color="ColorAccent.SUCCESS" />
</template>
```

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.PRIMARY_BRAND`

### size

Sets the diameter and thickness of the ring (`XS` to `XXL`).

```vue
<template>
    <ProgressCircle :size="ProgressCircleSize.XL" />
</template>
```

- **Type:** `ProgressCircleSize`
- **Default:** `ProgressCircleSize.MD`

### isRounded

Rounds the ends of the indicator arc.

```vue
<template>
    <ProgressCircle :isRounded="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### showProgressLabel

Shows the progress percentage, or the loading text when indeterminate.

```vue
<template>
    <ProgressCircle showProgressLabel />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### progressLabelPosition

Sets where the label is shown: inside the ring (`CENTER`) or above or below it. The center label is not shown while indeterminate because the loading text does not fit inside the ring.

```vue
<template>
    <ProgressCircle showProgressLabel :progressLabelPosition="ProgressCircleLabelPosition.BOTTOM" />
</template>
```

- **Type:** `ProgressCircleLabelPosition`
- **Default:** `ProgressCircleLabelPosition.CENTER`

### min

Sets the minimum value of the range.

```vue
<template>
    <ProgressCircle :min="10" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### max

Sets the maximum value of the range.

```vue
<template>
    <ProgressCircle :max="250" />
</template>
```

- **Type:** `number`
- **Default:** `100`

### isIndeterminate

Shows a spinning arc for tasks without a known duration.

```vue
<template>
    <ProgressCircle isIndeterminate />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### loadingText

Sets the text announced to screen readers (and shown as label when enabled) while indeterminate.

```vue
<template>
    <ProgressCircle isIndeterminate loadingText="Please wait..." />
</template>
```

- **Type:** `string`
- **Default:** `'Loading...'`

### ariaLabel

Sets the `aria-label` attribute for screen readers.

```vue
<template>
    <ProgressCircle ariaLabel="Upload progress" :progress="45" />
</template>
```

- **Type:** `string`
- **Default:** `'Progress'`

## Accessibility

The ring uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`. While indeterminate, `aria-valuenow` is omitted and `aria-valuetext` carries the loading text. Set `ariaLabel` to describe what is progressing.
