## Component

::component-code
---
srcDir: 'forms/fields/SliderField.vue'
props:
    id: slider-field-id
    label: Price range
    helpText: Pick your preferred range
    required: false
    modelValue:
        - 20
        - 80
    type: range
    color: primary-brand
    size: md
    step: 1
    min: 0
    max: 100
    multiple: true
    orientation: horizontal
    hasTooltip: true
    showInputs: false
    showInputsLabel: false
    inputPosition: bottom
    disabled: false
    borderRadius: undefined
    minText: "Min: "
    maxText: "Max: "
    currentValuePrefix: "$"
    currentValueSuffix: " USD"
    error: ""
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
    inputPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
enums:
    type: "SliderType"
    color: "ColorAccent"
    size: "SliderSize"
    orientation: "Orientation"
    inputPosition: "Position"
external:
  - modelValue
  - error
externalTypes:
  - number | [number, number]
  - string
isPreviewContentBoxed: true
previewContentMaxWidth: 500
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
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "required",
        "default": "false",
        "type": "boolean",
    },
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
        "name": "showInputs",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "showInputsLabel",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "inputPosition",
        "default": "Position.BOTTOM",
        "type": "Position",
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
    {
        "name": "minText",
        "default": "'Min: '",
        "type": "string",
    },
    {
        "name": "maxText",
        "default": "'Max: '",
        "type": "string",
    },
    {
        "name": "currentValuePrefix",
        "type": "string",
    },
    {
        "name": "currentValueSuffix",
        "type": "string",
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
    }
]
---
::

## Usage
### id

Sets the field identifier.

```vue
<template>
    <SliderField id="price-range" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label

Sets field label.

```vue
<template>
    <SliderField id="price-range" label="Price" />
</template>
```

- **Type:** `string`

### helpText

Sets helper text below the field.

```vue
<template>
    <SliderField id="price-range" helpText="Choose a valid range." />
</template>
```

- **Type:** `string`

### required

Marks the field as required for validation.

```vue
<template>
    <SliderField id="price-range" required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### modelValue

Sets the current value (single or range).

```vue
<template>
    <SliderField id="price-range" v-model="value" />
</template>

<script setup lang="ts">
const value = ref<[number, number]>([20, 80])
</script>
```

- **Type:** `number | [number, number]`
- **Default:** `0`

### type

Sets slider mode.

```vue
<template>
    <SliderField id="price-range" :type="SliderType.RANGE" />
</template>
```

- **Type:** `SliderType`
- **Default:** `SliderType.SINGLE`

### color

Sets accent color.

```vue
<template>
    <SliderField id="price-range" :color="ColorAccent.PRIMARY_BRAND" />
</template>
```

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.NEUTRAL`

### size

Sets slider size variant.

```vue
<template>
    <SliderField id="price-range" :size="SliderSize.LG" />
</template>
```

- **Type:** `SliderSize`
- **Default:** `SliderSize.MD`

### step

Sets numeric increment.

```vue
<template>
    <SliderField id="price-range" :step="5" />
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

Sets minimum value.

```vue
<template>
    <SliderField id="price-range" :min="10" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### max

Sets maximum value.

```vue
<template>
    <SliderField id="price-range" :max="250" />
</template>
```

- **Type:** `number`
- **Default:** `100`

### multiple

Enables range behavior when using array values.

```vue
<template>
    <SliderField id="price-range" multiple v-model="range" />
</template>

<script setup lang="ts">
const range = ref<[number, number]>([30, 70])
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### orientation

Sets horizontal or vertical direction.

```vue
<template>
    <SliderField id="price-range" :orientation="Orientation.VERTICAL" />
</template>
```

- **Type:** `Orientation`
- **Default:** `Orientation.HORIZONTAL`

### hasTooltip

Shows value tooltips on thumbs.

```vue
<template>
    <SliderField id="price-range" hasTooltip />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showInputs

Displays `InputField` controls for exact numeric entry.

```vue
<template>
    <SliderField id="price-range" showInputs />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showInputsLabel

Displays labels for the exact-value input controls.

```vue
<template>
    <SliderField id="price-range" showInputs :showInputsLabel="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### inputPosition

Sets whether exact-value inputs render above or below slider.

```vue
<template>
    <SliderField id="price-range" showInputs :inputPosition="Position.TOP" />
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

### disabled

Disables field interaction.

```vue
<template>
    <SliderField id="price-range" disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### borderRadius

Overrides default rounded classes with a numeric radius in pixels.

```vue
<template>
    <SliderField id="price-range" :borderRadius="8" />
</template>
```

- **Type:** `number`
- **Default:** `undefined`

### minText

Sets prefix label for minimum helper value.

```vue
<template>
    <SliderField id="price-range" minText="Minimum: " />
</template>
```

- **Type:** `string`
- **Default:** `'Min: '`

### maxText

Sets prefix label for maximum helper value.

```vue
<template>
    <SliderField id="price-range" maxText="Maximum: " />
</template>
```

- **Type:** `string`
- **Default:** `'Max: '`

### currentValuePrefix

Sets prefix for displayed current value.

```vue
<template>
    <SliderField id="price-range" currentValuePrefix="$" />
</template>
```

- **Type:** `string`

### currentValueSuffix

Sets suffix for displayed current value.

```vue
<template>
    <SliderField id="price-range" currentValueSuffix=" USD" />
</template>
```

- **Type:** `string`

### validator

Sets custom validator function.

```vue
<template>
    <SliderField id="price-range" :validator="validateRange" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error

Sets or binds validation error message.

```vue
<template>
    <SliderField id="price-range" v-model:error="error" />
</template>

<script setup lang="ts">
const error = ref('')
</script>
```

- **Type:** `string`
- **Default:** `''`
