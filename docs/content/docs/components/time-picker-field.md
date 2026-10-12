## Component

::component-code
---
srcDir: 'forms/fields/TimePickerField.vue'
props:
    id: "field-id"
    label: "Label"
    helpText: "Help text example"
    helpTextPosition: "bottom"
    variant: "input"
    modelValue: null
    placeholder: "Select a time"
    icon: null
    size: "md"
    clearable: true
    pickerPosition: "bottom"
    autoFlip: true
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
    error: ""
    disabled: false
    readonly: false
    required: false
    showOptionalLabel: true
    transparent: false
items:
    variant:
        - value: input
          text: INPUT
        - value: inline
          text: INLINE
    size:
        - value: md
          text: MD
        - value: lg
          text: LG
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
    helpTextPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
    pickerPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
enums:
    variant: "PickerVariant"
    size: "InputSize"
    hourFormat: "HourFormat"
    color: "ColorAccent"
    helpTextPosition: "Position"
    pickerPosition: "Position"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
propsSettingsExcludedProps: ['modelValue', 'validator']
---
::

## Props

::props-table
---
props: [
    {
        "name": "id",
        "type": "string",
        "required": "true"
    },
    {
        "name": "label",
        "type": "string"
    },
    {
        "name": "ariaLabel",
        "type": "string"
    },
    {
        "name": "helpText",
        "type": "string"
    },
    {
        "name": "helpTextPosition",
        "type": "Position",
        "default": "Position.BOTTOM"
    },
    {
        "name": "variant",
        "type": "PickerVariant",
        "default": "PickerVariant.INPUT"
    },
    {
        "name": "modelValue",
        "type": "string | null",
        "default": "null"
    },
    {
        "name": "placeholder",
        "type": "string"
    },
    {
        "name": "icon",
        "type": "string"
    },
    {
        "name": "size",
        "type": "InputSize",
        "default": "InputSize.MD"
    },
    {
        "name": "clearable",
        "type": "boolean",
        "default": "true"
    },
    {
        "name": "pickerPosition",
        "type": "Position",
        "default": "Position.BOTTOM"
    },
    {
        "name": "autoFlip",
        "default": "true",
        "type": "boolean"
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
        "name": "validator",
        "type": "(value: unknown) => string | null",
        "default": "() => null"
    },
    {
        "name": "error",
        "type": "string",
        "default": "''"
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
        "name": "required",
        "type": "boolean",
        "default": "false"
    },
    {
        "name": "showOptionalLabel",
        "type": "boolean",
        "default": "true"
    },
    {
        "name": "optionalLabel",
        "type": "string"
    },
    {
        "name": "transparent",
        "type": "boolean",
        "default": "false"
    },
    {
        "name": "clearAriaLabel",
        "type": "string"
    },
    {
        "name": "openAriaLabel",
        "type": "string"
    }
]
---
::

## Usage

### id

Sets the `id` of the input (and the `for` of the label). Required.

```vue
<template>
    <TimePickerField id="start-time" />
</template>
```

- **Type:** `string`

### label

Sets the label shown above the field. In the `INLINE` variant it also names the time picker.

```vue
<template>
    <TimePickerField id="time" label="Starts at" />
</template>
```

- **Type:** `string`

### ariaLabel

Sets the accessible name when there is no visible [label](#label).

```vue
<template>
    <TimePickerField id="time" ariaLabel="Start time" />
</template>
```

- **Type:** `string`

### helpText

Sets the help text. When there is an [error](#error), the error is shown instead.

```vue
<template>
    <TimePickerField id="time" helpText="Local time" />
</template>
```

- **Type:** `string`

### helpTextPosition

Sets where the help text is shown, via the `Position` enum.

```vue
<template>
    <TimePickerField id="time" :helpTextPosition="Position.TOP" helpText="Hint" />
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

#### Options

::options-table
---
options: [
    { value: "TOP", description: "top" },
    { value: "BOTTOM", description: "bottom" },
]
---
::

### variant

Sets how the time picker is shown via the `PickerVariant` enum. `INPUT` shows a field that opens the time picker in a popup, and `INLINE` shows the time picker itself in place of the field. The label, help text and error are shown in both.

```vue
<template>
    <TimePickerField id="time" :variant="PickerVariant.INLINE" label="Starts at" />
</template>
```

- **Type:** `PickerVariant`
- **Default:** `PickerVariant.INPUT`

#### Options

::options-table
---
options: [
    { value: "INPUT", description: "input" },
    { value: "INLINE", description: "inline" },
]
---
::

### modelValue

Sets the selected time as `HH:mm`, or `HH:mm:ss` when [hasSeconds](#hasseconds) is on. Always 24-hour, whatever [hourFormat](#hourformat) shows. Bind it with `v-model`.

```vue
<template>
    <TimePickerField id="time"  v-model="time" />
</template>
```

- **Type:** `string | null`
- **Default:** `null`

### placeholder

Sets the placeholder of the input. Falls back to `useDSConfig().timePicker.placeholderText()`. Only applies to the `INPUT` variant.

```vue
<template>
    <TimePickerField id="time" placeholder="Choose a time" />
</template>
```

- **Type:** `string`

### icon

Sets an icon shown at the start of the input. Only applies to the `INPUT` variant.

```vue
<template>
    <TimePickerField id="time" icon="mdi:alarm" />
</template>
```

- **Type:** `string`

### size

Sets the height of the input via the `InputSize` enum. Only applies to the `INPUT` variant.

```vue
<template>
    <TimePickerField id="time" :size="InputSize.LG" />
</template>
```

- **Type:** `InputSize`
- **Default:** `InputSize.MD`

#### Options

::options-table
---
options: [
    { value: "MD", description: "md" },
    { value: "LG", description: "lg" },
]
---
::

### clearable

Shows a button to clear the value while there is one.

```vue
<template>
    <TimePickerField id="time" :clearable="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### pickerPosition

Sets whether the popup opens below or above the input, via the `Position` enum.

```vue
<template>
    <TimePickerField id="time" :pickerPosition="Position.TOP" />
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

#### Options

::options-table
---
options: [
    { value: "TOP", description: "top" },
    { value: "BOTTOM", description: "bottom" },
]
---
::


### autoFlip

Moves the picker to the other side when it does not fit in the window. If it would be cut off at the bottom or the top edge of the screen and there is more room on the other side, it opens there instead. The position is checked when it opens, and `pickerPosition` is only the starting point. Set it to `false` to always keep the position as given.

```vue
<template>
    <TimePickerField v-model="time" id="time" :autoFlip="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### locale

Sets the BCP 47 locale used to write the time and the AM/PM text, and to choose the 12 or 24 hour clock when [hourFormat](#hourformat) is not set.

```vue
<template>
    <TimePickerField id="time"  locale="es-ES" />
</template>
```

- **Type:** `string`
- **Default:** `'en-US'`

### hourFormat

Sets the 12 or 24 hour clock via the `HourFormat` enum. Defaults to the clock of the [locale](#locale). The 12-hour clock adds an AM/PM column.

```vue
<template>
    <TimePickerField id="time"  :hourFormat="HourFormat.HOURS_12" />
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
    <TimePickerField id="time"  :hasSeconds="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### minuteStep

Sets the interval between the minutes, from `1` to `30`.

```vue
<template>
    <TimePickerField id="time"  :minuteStep="15" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### secondStep

Sets the interval between the seconds, from `1` to `30`.

```vue
<template>
    <TimePickerField id="time"  :hasSeconds="true" :secondStep="15" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### min

Sets the earliest selectable time (`HH:mm`). Hours, minutes and seconds before it are disabled.

```vue
<template>
    <TimePickerField id="time"  min="09:00" />
</template>
```

- **Type:** `string`

### max

Sets the latest selectable time (`HH:mm`). Hours, minutes and seconds after it are disabled.

```vue
<template>
    <TimePickerField id="time"  max="17:30" />
</template>
```

- **Type:** `string`

### color

Sets the accent color of the selected options and the focus ring. Supports `PRIMARY_BRAND` and `SECONDARY_BRAND`.

```vue
<template>
    <TimePickerField id="time"  :color="ColorAccent.SECONDARY_BRAND" />
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
    <TimePickerField id="time"  :isRounded="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isBoxed

Adds the border, background and padding to the time picker. Only applies to the `INLINE` variant, since the popup is always boxed.

```vue
<template>
    <TimePickerField id="time" :variant="PickerVariant.INLINE" :isBoxed="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### validator

Validates the value and returns an error message, or `null`. It runs only when the field is [required](#required), whenever the value changes and when the popup closes.

```vue
<template>
    <TimePickerField id="time" required :validator="validateField" />
</template>
```

- **Type:** `(value: unknown) => string | null`
- **Default:** `() => null`

### error

Sets the error message. The field and the help text switch to the error style.

```vue
<template>
    <TimePickerField id="time" error="Required field" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### disabled

Disables the field and the time picker.

```vue
<template>
    <TimePickerField id="time" :disabled="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### readonly

Shows the value without letting the user change it. The popup does not open.

```vue
<template>
    <TimePickerField id="time" :readonly="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### required

Marks the field as required: hides the optional label and enables the [validator](#validator).

```vue
<template>
    <TimePickerField id="time" label="Time" :required="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showOptionalLabel

Shows the optional text next to the label when the field is not required.

```vue
<template>
    <TimePickerField id="time" label="Time" :showOptionalLabel="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### optionalLabel

Sets the optional text. Falls back to `useDSConfig().forms.optionalLabelText()`.

```vue
<template>
    <TimePickerField id="time" label="Hora" optionalLabel="(opcional)" />
</template>
```

- **Type:** `string`

### transparent

Removes the background of the input.

```vue
<template>
    <TimePickerField id="time" :transparent="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### clearAriaLabel

Sets the `aria-label` of the clear button. Falls back to `useDSConfig().forms.clearSelectionText()`.

```vue
<template>
    <TimePickerField id="time" clearAriaLabel="Borrar hora" />
</template>
```

- **Type:** `string`

### openAriaLabel

Sets the `aria-label` of the clock button. Falls back to `useDSConfig().timePicker.openText()`.

```vue
<template>
    <TimePickerField id="time" openAriaLabel="Abrir selector de hora" />
</template>
```

- **Type:** `string`

## Accessibility

In the `INPUT` variant the field is a read-only text input with `aria-haspopup="dialog"` and `aria-expanded`. Focus moves into the time picker when it opens and returns to the input when it closes.

::options-table
---
options: [
    { value: "Enter / Space / ArrowDown", description: "Opens the time picker from the input." },
    { value: "Escape", description: "Closes the time picker and returns the focus to the input." },
]
---
::

The popup stays open after a pick, since a time takes an hour and a minute. Close it with `Escape` or by clicking outside. See the [TimePicker accessibility notes](/docs/components/time-picker#accessibility) for the keys inside it.

## Emits

::options-table
---
options: [
    { value: "@update:modelValue", description: "Emitted with the new time (`HH:mm` or `HH:mm:ss`) when it changes, or `null` when it is cleared." },
    { value: "@update:error", description: "Emitted with the validation message, or an empty string, when the validator runs." },
]
---
::

#### Example

```vue
<template>
    <TimePickerField :modelValue="time" id="time" @update:modelValue="handleChange" />
</template>

<script setup lang="ts">
const time = ref<string | null>(null)

const handleChange = (value: string | null) => {
    time.value = value
}
</script>
```

## Methods

::options-table
---
options: [
    { value: "open()", description: "Opens the popup. Does nothing when the field is disabled, readonly or inline." },
    { value: "close()", description: "Closes the popup and returns the focus to the input." },
]
---
::
