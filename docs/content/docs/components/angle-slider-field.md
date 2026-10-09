## Component

::component-code
---
srcDir: 'forms/fields/AngleSliderField.vue'
props:
    id: angle-slider-field-id
    label: Rotation
    helpText: Drag the handle to rotate
    helpTextPosition: bottom
    required: false
    showOptionalLabel: true
    optionalLabel: null
    modelValue: 90
    color: neutral
    size: md
    step: 1
    showMarkers: false
    showValue: true
    valueLabel: degrees
    disabled: false
    readOnly: false
    error: ""
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
    helpTextPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
enums:
    color: "ColorAccent"
    size: "AngleSliderSize"
    helpTextPosition: "Position"
external:
  - modelValue
  - error
externalTypes:
  - number
  - string
isPreviewContentBoxed: true
previewContentMaxWidth: 460
propsSettingsExcludedProps: ['validator', 'modelValue']
---
::

## Props

::props-table
---
props: [
    {
        "name": "id",
        "required": "true",
        "type": "string",
    },
    {
        "name": "label",
        "type": "string",
    },
    {
        "name": "ariaLabel",
        "type": "string",
    },
    {
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "helpTextPosition",
        "default": "Position.BOTTOM",
        "type": "Position",
    },
    {
        "name": "required",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "showOptionalLabel",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "optionalLabel",
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
    {
        "name": "validator",
        "default": "null",
        "type": "function",
    },
    {
        "name": "error",
        "default": "''",
        "type": "string",
    },
]
---
::

## Usage
### id

Unique identifier. Used to link the label with the slider (`{id}-label`).

```vue
<template>
    <AngleSliderField id="rotation" />
</template>
```

- **Type:** `string`

### label

Sets the field label.

```vue
<template>
    <AngleSliderField id="rotation" label="Rotation" />
</template>
```

- **Type:** `string`

### ariaLabel

Accessible label for the thumb when no `label` is set.

```vue
<template>
    <AngleSliderField id="rotation" ariaLabel="Rotation" />
</template>
```

- **Type:** `string`

### helpText

Sets the help text.

```vue
<template>
    <AngleSliderField id="rotation" helpText="Drag the handle to rotate" />
</template>
```

- **Type:** `string`

### helpTextPosition

Sets the help text position (`TOP` or `BOTTOM`).

```vue
<template>
    <AngleSliderField id="rotation" :helpTextPosition="Position.TOP" />
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

### required

Marks the field as required and enables validation.

```vue
<template>
    <AngleSliderField id="rotation" required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showOptionalLabel

Shows the optional label when the field is not required.

```vue
<template>
    <AngleSliderField id="rotation" label="Rotation" :showOptionalLabel="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### optionalLabel

Overrides the optional label text.

```vue
<template>
    <AngleSliderField id="rotation" label="Rotation" optionalLabel="(Optional)" />
</template>
```

- **Type:** `string`

### modelValue

Current angle in degrees, clamped between `0` and `360`. `0` points up and the value grows clockwise.

```vue
<template>
    <AngleSliderField id="rotation" v-model="angle" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### color

Sets the accent color of the filled arc and thumb.

```vue
<template>
    <AngleSliderField id="rotation" :color="ColorAccent.PRIMARY_BRAND" />
</template>
```

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.NEUTRAL`

### size

Sets the dial diameter, track thickness and thumb size (`XS` to `XXL`).

```vue
<template>
    <AngleSliderField id="rotation" :size="AngleSliderSize.XL" />
</template>
```

- **Type:** `AngleSliderSize`
- **Default:** `AngleSliderSize.MD`

### step

Sets the angle increment applied while dragging and with the keyboard.

```vue
<template>
    <AngleSliderField id="rotation" :step="15" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### showMarkers

Shows tick marks around the inside of the ring every 30°, with longer ticks at 0°, 90°, 180° and 270°.

```vue
<template>
    <AngleSliderField id="rotation" showMarkers />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showValue

Shows the current value at the center of the dial.

```vue
<template>
    <AngleSliderField id="rotation" :showValue="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### valueLabel

Sets the small caption shown below the value. Use an empty string to hide it.

```vue
<template>
    <AngleSliderField id="rotation" valueLabel="deg" />
</template>
```

- **Type:** `string`
- **Default:** `'degrees'`

### disabled

Disables interaction and focus.

```vue
<template>
    <AngleSliderField id="rotation" disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### readOnly

Shows the value but prevents changing it. The thumb stays focusable.

```vue
<template>
    <AngleSliderField id="rotation" readOnly />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### validator

Sets a custom validator returning an error message or `null`.

```vue
<template>
    <AngleSliderField id="rotation" required :validator="validateAngle" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Sets the error message of the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <AngleSliderField id="rotation" v-model:error="errorMessage" />
</template>
```

- **Type:** `string`
- **Default:** `''`

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
        value: "@update:error",
        description: "Emitted with the validation message when the validator runs.",
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
    <AngleSliderField id="rotation" v-model="angle" @change-end="saveAngle" />
</template>

<script setup lang="ts">
const angle = ref(0)
const saveAngle = (value: number) => console.log(value)
</script>
```
