## Component

::component-code
---
srcDir: 'time-pickers/TimePicker.vue'
props:
    modelValue: "19:30"
    locale: "en-US"
    hourFormat: "12"
    hasSeconds: false
    minuteStep: 1
    secondStep: 1
    min: null
    max: null
    color: "primary-brand"
    isRounded: false
    isBoxed: true
    disabled: false
    readonly: false
    ariaLabel: "Choose a time"
items:
    hourFormat:
        - value: "12"
          text: HOURS_12
        - value: "24"
          text: HOURS_24
    color:
        - value: primary-brand
          text: PRIMARY_BRAND
        - value: secondary-brand
          text: SECONDARY_BRAND
enums:
    hourFormat: "HourFormat"
    color: "ColorAccent"
propsSettingsExcludedProps: ["modelValue"]
---
::

## Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "type": "string | null",
        "default": "null"
    },
    {
        "name": "locale",
        "type": "string",
        "default": "'en-US'"
    },
    {
        "name": "hourFormat",
        "type": "HourFormat"
    },
    {
        "name": "hasSeconds",
        "type": "boolean",
        "default": "false"
    },
    {
        "name": "minuteStep",
        "type": "number",
        "default": "1"
    },
    {
        "name": "secondStep",
        "type": "number",
        "default": "1"
    },
    {
        "name": "min",
        "type": "string"
    },
    {
        "name": "max",
        "type": "string"
    },
    {
        "name": "color",
        "type": "ColorAccent",
        "default": "ColorAccent.PRIMARY_BRAND"
    },
    {
        "name": "isRounded",
        "type": "boolean",
        "default": "false"
    },
    {
        "name": "isBoxed",
        "type": "boolean",
        "default": "true"
    },
    {
        "name": "disabled",
        "type": "boolean",
        "default": "false"
    },
    {
        "name": "readonly",
        "type": "boolean",
        "default": "false"
    },
    {
        "name": "ariaLabel",
        "type": "string"
    },
    {
        "name": "hoursAriaLabel",
        "type": "string"
    },
    {
        "name": "minutesAriaLabel",
        "type": "string"
    },
    {
        "name": "secondsAriaLabel",
        "type": "string"
    },
    {
        "name": "periodAriaLabel",
        "type": "string"
    }
]
---
::

## Usage

### modelValue

Sets the selected time as `HH:mm`, or `HH:mm:ss` when [hasSeconds](#hasseconds) is on. Always 24-hour, whatever [hourFormat](#hourformat) shows. Bind it with `v-model`.

```vue
<template>
    <TimePicker  v-model="time" />
</template>
```

- **Type:** `string | null`
- **Default:** `null`

### locale

Sets the BCP 47 locale used to write the time and the AM/PM text, and to choose the 12 or 24 hour clock when [hourFormat](#hourformat) is not set.

```vue
<template>
    <TimePicker  locale="es-ES" />
</template>
```

- **Type:** `string`
- **Default:** `'en-US'`

### hourFormat

Sets the 12 or 24 hour clock via the `HourFormat` enum. Defaults to the clock of the [locale](#locale). The 12-hour clock adds an AM/PM column.

```vue
<template>
    <TimePicker  :hourFormat="HourFormat.HOURS_12" />
</template>
```

- **Type:** `HourFormat`

#### Options

::options-table
---
options: [
    { value: "HOURS_12", description: "12" },
    { value: "HOURS_24", description: "24" },
]
---
::

### hasSeconds

Adds a seconds column and makes the value `HH:mm:ss`.

```vue
<template>
    <TimePicker  :hasSeconds="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### minuteStep

Sets the interval between the minutes, from `1` to `30`.

```vue
<template>
    <TimePicker  :minuteStep="15" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### secondStep

Sets the interval between the seconds, from `1` to `30`.

```vue
<template>
    <TimePicker  :hasSeconds="true" :secondStep="15" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### min

Sets the earliest selectable time (`HH:mm`). Hours, minutes and seconds before it are disabled.

```vue
<template>
    <TimePicker  min="09:00" />
</template>
```

- **Type:** `string`

### max

Sets the latest selectable time (`HH:mm`). Hours, minutes and seconds after it are disabled.

```vue
<template>
    <TimePicker  max="17:30" />
</template>
```

- **Type:** `string`

### color

Sets the accent color of the selected options and the focus ring. Supports `PRIMARY_BRAND` and `SECONDARY_BRAND`.

```vue
<template>
    <TimePicker  :color="ColorAccent.SECONDARY_BRAND" />
</template>
```

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.PRIMARY_BRAND`

#### Options

::options-table
---
options: [
    { value: "PRIMARY_BRAND", description: "primary-brand" },
    { value: "SECONDARY_BRAND", description: "secondary-brand" },
]
---
::

### isRounded

Makes the options fully round.

```vue
<template>
    <TimePicker  :isRounded="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isBoxed

Adds the border, background and padding. Turn it off to embed the time picker inside another surface.

```vue
<template>
    <TimePicker v-model="time" :isBoxed="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### disabled

Disables every option.

```vue
<template>
    <TimePicker v-model="time" :disabled="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### readonly

Keeps the value fixed while still showing it. The columns are marked with `aria-readonly`.

```vue
<template>
    <TimePicker v-model="time" :readonly="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### ariaLabel

Sets the accessible name of the time picker.

```vue
<template>
    <TimePicker v-model="time" ariaLabel="Start time" />
</template>
```

- **Type:** `string`

### hoursAriaLabel

Sets the accessible name of the hours column. Falls back to `useDSConfig().timePicker.hoursText()`.

```vue
<template>
    <TimePicker v-model="time" hoursAriaLabel="Horas" />
</template>
```

- **Type:** `string`

### minutesAriaLabel

Sets the accessible name of the minutes column. Falls back to `useDSConfig().timePicker.minutesText()`.

```vue
<template>
    <TimePicker v-model="time" minutesAriaLabel="Minutos" />
</template>
```

- **Type:** `string`

### secondsAriaLabel

Sets the accessible name of the seconds column. Falls back to `useDSConfig().timePicker.secondsText()`.

```vue
<template>
    <TimePicker v-model="time" :hasSeconds="true" secondsAriaLabel="Segundos" />
</template>
```

- **Type:** `string`

### periodAriaLabel

Sets the accessible name of the AM/PM column. Falls back to `useDSConfig().timePicker.periodText()`.

```vue
<template>
    <TimePicker v-model="time" :hourFormat="HourFormat.HOURS_12" periodAriaLabel="a. m. / p. m." />
</template>
```

- **Type:** `string`

## Accessibility

The time picker is a `group` with one `listbox` per column (hours, minutes, seconds and AM/PM). Each value is an `option` with `aria-selected`, and each column has one tab stop: the selected option, or the first enabled one. Set [ariaLabel](#arialabel) so the group has a name.

::options-table
---
options: [
    { value: "ArrowUp / ArrowDown", description: "Moves to the previous or next option of the column." },
    { value: "Home / End", description: "Moves to the first or last option of the column." },
    { value: "ArrowLeft / ArrowRight", description: "Moves to the selected option of the previous or next column." },
    { value: "Enter / Space", description: "Selects the focused option." },
]
---
::

Options outside [min](#min) and [max](#max) are disabled, so they cannot be focused.

## Emits

::options-table
---
options: [
    { value: "@update:modelValue", description: "Emitted with the new time (`HH:mm` or `HH:mm:ss`) when an option is selected. When there is no value yet, the other parts start at `00`." },
]
---
::

#### Example

```vue
<template>
    <TimePicker :modelValue="time" @update:modelValue="handleSelect" />
</template>

<script setup lang="ts">
const time = ref<string | null>(null)

const handleSelect = (value: string) => {
    time.value = value
}
</script>
```

## Methods

::options-table
---
options: [
    { value: "focus()", description: "Moves the focus to the selected hour (or the first enabled one) so keyboard navigation can start." },
]
---
::
