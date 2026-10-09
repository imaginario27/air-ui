## Component

::component-code
---
srcDir: 'sliders/AngleSlider.vue'
props:
    modelValue: 90
    color: neutral
    size: md
    step: 1
    isRounded: false
    showMarkers: false
    showValue: true
    valueLabel: degrees
    disabled: false
    readOnly: false
items:
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
        - value: xl
          text: XL
        - value: 2xl
          text: XXL
enums:
    color: "ColorAccent"
    size: "AngleSliderSize"
external:
  - modelValue
externalTypes:
  - number
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
        "name": "ariaLabel",
        "type": "string",
    },
    {
        "name": "ariaLabelledby",
        "type": "string",
    },
    {
        "name": "modelValue",
        "default": "0",
        "type": "number",
    },
    {
        "name": "color",
        "default": "ColorAccent.NEUTRAL",
        "type": "ColorAccent",
    },
    {
        "name": "size",
        "default": "AngleSliderSize.MD",
        "type": "AngleSliderSize",
    },
    {
        "name": "step",
        "default": "1",
        "type": "number",
    },
    {
        "name": "isRounded",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "showMarkers",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "showValue",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "valueLabel",
        "default": "'degrees'",
        "type": "string",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "readOnly",
        "default": "false",
        "type": "boolean",
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
        description: "Replaces the content shown at the center of the dial. Receives the current angle as the `value` slot prop. Rendered even when `showValue` is false.",
    },
]
---
::

```vue
<template>
    <AngleSlider v-model="angle">
        <template #default="{ value }">
            <span class="text-lg font-semibold">{{ value }} deg</span>
        </template>
    </AngleSlider>
</template>

<script setup lang="ts">
const angle = ref(120)
</script>
```

## Usage
### ariaLabel

Accessible label for the slider thumb. Defaults to `Angle slider`.

```vue
<template>
    <AngleSlider ariaLabel="Rotation" />
</template>
```

- **Type:** `string`

### ariaLabelledby

Id of the element that labels the slider thumb. Takes precedence over `ariaLabel`.

```vue
<template>
    <AngleSlider ariaLabelledby="rotation-label" />
</template>
```

- **Type:** `string`

### modelValue

Current angle in degrees, clamped between `0` and `360`. `0` points up and the value grows clockwise.

```vue
<template>
    <AngleSlider v-model="angle" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### color

Sets the accent color of the filled arc and thumb.

```vue
<template>
    <AngleSlider :color="ColorAccent.PRIMARY_BRAND" />
</template>
```

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.NEUTRAL`

### size

Sets the dial diameter, track thickness and thumb size (`XS` to `XXL`).

```vue
<template>
    <AngleSlider :size="AngleSliderSize.XL" />
</template>
```

- **Type:** `AngleSliderSize`
- **Default:** `AngleSliderSize.MD`

### step

Sets the angle increment applied while dragging and with the keyboard.

```vue
<template>
    <AngleSlider :step="15" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### isRounded

Rounds the start of the filled arc.

```vue
<template>
    <AngleSlider isRounded />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showMarkers

Shows tick marks around the inside of the ring every 30°, with longer ticks at 0°, 90°, 180° and 270°.

```vue
<template>
    <AngleSlider showMarkers />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showValue

Shows the current value at the center of the dial.

```vue
<template>
    <AngleSlider :showValue="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### valueLabel

Sets the small caption shown below the value. Use an empty string to hide it.

```vue
<template>
    <AngleSlider valueLabel="deg" />
</template>
```

- **Type:** `string`
- **Default:** `'degrees'`

### disabled

Disables interaction and focus.

```vue
<template>
    <AngleSlider disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### readOnly

Shows the value but prevents changing it. The thumb stays focusable.

```vue
<template>
    <AngleSlider readOnly />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

## Accessibility

The thumb uses `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and `aria-valuetext`. It is keyboard operable:


::options-table
---
options: [
    { value: "Arrow Right / Up", description: "Increases the angle by `step`." },
    { value: "Arrow Left / Down", description: "Decreases the angle by `step`." },
    { value: "Page Up / Page Down", description: "Changes the angle by `step` x 10." },
    { value: "Home / End", description: "Sets the angle to `0` / `360`." },
]
---
::

## Emits

::options-table
---
options: [
    {
        value: "@update:modelValue",
        description: "Emitted on every angle change while dragging or using the keyboard (v-model).",
    },
    {
        value: "@change-end",
        description: "Emitted with the final angle when the pointer is released or after a keyboard change.",
    },
]
---
::

```vue
<template>
    <AngleSlider v-model="angle" @change-end="saveAngle" />
</template>

<script setup lang="ts">
const angle = ref(0)
const saveAngle = (value: number) => console.log(value)
</script>
```
