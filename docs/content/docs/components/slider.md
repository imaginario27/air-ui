## Component

::component-code
---
srcDir: 'sliders/Slider.vue'
props:
    modelValue: 35
    type: single
    color: neutral
    size: md
    step: 1
    min: 0
    max: 100
    multiple: false
    orientation: horizontal
    hasTooltip: true
    disabled: false
    borderRadius: undefined
items:
    type:
        - value: single
          text: SINGLE
        - value: range
          text: RANGE
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
    size:
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
    orientation:
        - value: horizontal
          text: HORIZONTAL
        - value: vertical
          text: VERTICAL
enums:
    type: "SliderType"
    color: "ColorAccent"
    size: "SliderSize"
    orientation: "Orientation"
external:
  - modelValue
externalTypes:
  - number | [number, number]
isPreviewContentBoxed: true
previewContentMaxWidth: 460
propsSettingsExcludedProps: ['modelValue']
---
::

## Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "default": "0",
        "type": "number | [number, number]",
    },
    {
        "name": "type",
        "default": "SliderType.SINGLE",
        "type": "SliderType",
    },
    {
        "name": "color",
        "default": "ColorAccent.NEUTRAL",
        "type": "ColorAccent",
    },
    {
        "name": "size",
        "default": "SliderSize.MD",
        "type": "SliderSize",
    },
    {
        "name": "step",
        "default": "1",
        "type": "number",
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
        "name": "multiple",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "orientation",
        "default": "Orientation.HORIZONTAL",
        "type": "Orientation",
    },
    {
        "name": "hasTooltip",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "borderRadius",
        "type": "number",
    },
]
---
::

## Usage
### modelValue

Sets the slider value.

```vue
<template>
    <Slider v-model="value" />
</template>

<script setup lang="ts">
const value = ref(35)
</script>
```

- **Type:** `number | [number, number]`
- **Default:** `0`

### type

Sets slider mode. Use `SINGLE` for one thumb or `RANGE` for two thumbs.

```vue
<template>
    <Slider :type="SliderType.RANGE" v-model="range" />
</template>

<script setup lang="ts">
const range = ref<[number, number]>([20, 80])
</script>
```

- **Type:** `SliderType`
- **Default:** `SliderType.SINGLE`

### color

Sets slider accent color.

```vue
<template>
    <Slider :color="ColorAccent.PRIMARY_BRAND" />
</template>
```

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.NEUTRAL`

### size

Sets track thickness and thumb size variant.

```vue
<template>
    <Slider :size="SliderSize.LG" />
</template>
```

- **Type:** `SliderSize`
- **Default:** `SliderSize.MD`

### step

Sets numeric increment.

```vue
<template>
    <Slider :step="5" />
</template>
```

::content-alert
---
props:
    title: "Important"
    type: "info"
    description: "Use a dividable step value that fits within the min-max range to ensure the slider functions correctly."
---
::

- **Type:** `number`
- **Default:** `1`

### min

Sets minimum allowed value.

```vue
<template>
    <Slider :min="10" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### max

Sets maximum allowed value.

```vue
<template>
    <Slider :max="250" />
</template>
```

- **Type:** `number`
- **Default:** `100`

### multiple

Enables range behavior when used with array value.

```vue
<template>
    <Slider multiple v-model="range" />
</template>

<script setup lang="ts">
const range = ref<[number, number]>([30, 60])
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### orientation

Sets horizontal or vertical layout.

```vue
<template>
    <Slider :orientation="Orientation.VERTICAL" />
</template>
```

- **Type:** `Orientation`
- **Default:** `Orientation.HORIZONTAL`

### hasTooltip

Shows current value tooltip over thumb(s).

```vue
<template>
    <Slider hasTooltip />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### disabled

Disables slider interaction.

```vue
<template>
    <Slider disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### borderRadius

Overrides default rounded classes using a numeric radius in pixels.

```vue
<template>
    <Slider :borderRadius="8" />
</template>
```

- **Type:** `number`
- **Default:** `undefined`
