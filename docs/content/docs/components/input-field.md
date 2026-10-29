
## Component

::component-code
---
srcDir: 'forms/fields/InputField.vue'
props: 
    id: "field-id"
    label: "Label"
    type: "text"
    placeholder: "Placeholder"
    helpText: "Help text example"
    helpTextPosition: "bottom"
    autoFlip: true
    icon: null
    suffixIcon: null
    linkText: null
    linkUrl: null
    size: "md"
    responsiveSize: false
    modelValue: ""
    validator: null
    error: ""
    maxLength: null
    filterAlphabetic: false
    permitNegativeNumber: false
    hasShowPasswordButton: true
    locale: "en-US"
    hasDateTimeSegments: false
    hourFormat: null
    hasSeconds: false
    min: null
    max: null
    step: null
    pattern: null
    readonly: false
    autocomplete: "off"
    autofocus: false
    disabled: false
    transparent: false
    required: false
    showOptionalLabel: true
    optionalLabel: null
    inputClass: null
    glowColorMode: "none"
    glowTrigger: "focus"
    glowType: "inner"
    glowOpacity: 40
    glowSize: null
items:
    size: 
        - value: lg
          text: LG
        - value: md
          text: MD
    hourFormat:
        - value: "12"
          text: HOURS_12
        - value: "24"
          text: HOURS_24
    helpTextPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
    glowColorMode:
        - value: none
          text: NONE
        - value: both
          text: BOTH
        - value: light
          text: LIGHT
        - value: dark
          text: DARK
    glowTrigger:
        - value: always
          text: ALWAYS
        - value: hover
          text: HOVER
        - value: focus
          text: FOCUS
        - value: hoverFocus
          text: HOVER_FOCUS
    glowType:
        - value: outer
          text: OUTER
        - value: inner
          text: INNER
enums:
    size: "InputSize"
    hourFormat: "HourFormat"
    helpTextPosition: "Position"
    glowColorMode: "GlowColorMode"
    glowTrigger: "GlowTrigger"
    glowType: "GlowType"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
propsSettingsExcludedProps: ['validator']
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
        "name": "type",
        "default": "'text'",
        "type": "AllowedInputType",
    },
    {
        "name": "placeholder",
        "default": "'Placeholder'",
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
        "name": "autoFlip",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "icon",
        "type": "string",
    },
    {
        "name": "suffixIcon",
        "type": "string",
    },
    {
        "name": "linkText",
        "type": "string",
    },
    {
        "name": "linkUrl",
        "type": "string",
    },
    {
        "name": "size",
        "default": "InputSize.MD",
        "type": "InputSize",
    },
    {
        "name": "responsiveSize",
        "default": "null",
        "type": "boolean",
    },
    {
        "name": "modelValue",
        "default": "''",
        "type": "string | number | null",
    },
    {
        "name": "validator",
        "type": "Function",
    },
    {
        "name": "error",
        "type": "string",
    },
    {
        "name": "maxLength",
        "type": "number",
    },
    {
        "name": "filterAlphabetic",
        "type": "boolean",
    },
    {
        "name": "permitNegativeNumber",
        "type": "boolean",
    },
    {
        "name": "hasShowPasswordButton",
        "type": "boolean",
    },
    {
        "name": "togglePasswordAriaLabel",
        "type": "string",
    },
    {
        "name": "suffixActionAriaLabel",
        "type": "string",
    },
    {
        "name": "locale",
        "default": "'en-US'",
        "type": "string",
    },
    {
        "name": "displayFormat",
        "type": "Intl.DateTimeFormatOptions",
    },
    {
        "name": "hasDateTimeSegments",
        "type": "boolean",
        "default": "false",
    },
    {
        "name": "hourFormat",
        "type": "HourFormat",
    },
    {
        "name": "hasSeconds",
        "type": "boolean",
        "default": "false",
    },
    {
        "name": "min",
        "type": "string",
    },
    {
        "name": "max",
        "type": "string",
    },
    {
        "name": "step",
        "type": "string",
    },
    {
        "name": "pattern",
        "type": "string",
    },
    {
        "name": "readonly",
        default": "false",
        "type": "boolean",
    },
    {
        "name": "autocomplete",
        "default": "'off'",
        "type": "string",
    },
    {
        "name": "autofocus",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
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
        "name": "transparent",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "inputClass",
        "type": "string",
    },
    {
        "name": "glowColorMode",
        "default": "GlowColorMode.NONE",
        "type": "GlowColorMode",
    },
    {
        "name": "glowTrigger",
        "default": "GlowTrigger.FOCUS",
        "type": "GlowTrigger",
    },
    {
        "name": "glowType",
        "default": "GlowType.INNER",
        "type": "GlowType",
    },
    {
        "name": "glowOpacity",
        "default": "40",
        "type": "number",
    },
    {
        "name": "glowSize",
        "type": "number",
    },
]
---
::

## Usage
### id 

Sets the id of the field.

```vue
<template>
    <InputField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label 

Sets the label of the field.

```vue
<template>
    <InputField label="Label text" />
</template>
```

- **Type:** `string`

### type

Sets the type of the input field. It uses the `AllowedInputType` type.

For the rest of native HTML input types, please use the specific components provided by AirUI.

These types do not use the native browser picker. The field renders a custom one, so it looks the same in every browser, and the value keeps the format of the native input. They are built with [DatePickerField](/docs/components/date-picker-field) and [TimePickerField](/docs/components/time-picker-field):

::options-table
---
options: [
    { value: "date", description: ["Opens a calendar to pick a date. The value looks like", { type: "code", content: "2026-10-15" }] },
    { value: "month", description: ["Opens a calendar to pick a month. The value looks like", { type: "code", content: "2026-10" }] },
    { value: "week", description: ["Opens a calendar to pick a week. The value looks like", { type: "code", content: "2026-W41" }] },
    { value: "datetime-local", description: ["Opens a calendar and a time picker to pick a date and a time. The value looks like", { type: "code", content: "2026-10-15T19:30" }] },
    { value: "time", description: ["Opens a time picker. The value looks like", { type: "code", content: "19:30" }] },
]
---
::

<br />

The text shown follows the [locale](#locale), [min](#min) and [max](#max) limit the selectable values, and clearing the field emits an empty string. Click the input, or press `Enter`, `Space` or `ArrowDown`, to open the picker, and `Escape` to close it. Typing a value is not supported. Use `DatePickerField` or `TimePickerField` directly to control the picker (color, range, inline variant, seconds and more).

```vue
<template>
    <InputField v-model="birthDate" id="birth-date" type="date" label="Birth date" />
</template>

<script setup lang="ts">
const birthDate = ref('2026-10-15')
</script>
```

```vue
<template>
    <InputField type="text" />
</template>
```

- **Type:** `AllowedInputType`
    ```ts
    export type AllowedInputType =
        | 'color'
        | 'email'
        | 'number'
        | 'password'
        | 'tel'
        | 'text'
        | 'url'
        | 'date'
        | 'datetime-local'
        | 'time'
        | 'month'
        | 'week'
    ```

- **Default:** `'text'`

### placeholder

Sets the placeholder text of the input field.

```vue
<template>
    <InputField placeholder="Placeholder" />
</template>
```

- **Type:** `string`
- **Default:** `'Placeholder'`

### helpText

Sets the help text displayed below the input field.

```vue
<template>
    <InputField helpText="Help text example" />
</template>
```

- **Type:** `string`

### helpTextPosition

Sets the position of the help text relative to the input field. It uses the `Position` enum.

```vue
<template>
    <InputField helpTextPosition="top" helpText="Appears above the field" />
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

#### Options
::options-table
---
options: [
    {
        value: "TOP",
        description: "top",
    },
    {
        value: "BOTTOM",
        description: "bottom",
    },
]
---
::

### icon

Sets the icon of the input field.

```vue
<template>
    <InputField icon="mdi:account" />
</template>
```

- **Type:** `string`

### suffixIcon

Sets the suffix icon of the input field.

```vue
<template>
    <InputField suffixIcon="mdi:eye" />
</template>
```

- **Type:** `string`

### linkText

Sets the link text of the input field when the type is `password`.

```vue
<template>
    <InputField linkText="Forgot password?" />
</template>
```

- **Type:** `string`

### linkUrl

Sets the link URL of the input field when the type is `password`.

```vue
<template>
    <InputField linkUrl="/reset-password" />
</template>
```

- **Type:** `string`

### size

Sets the size of the input field. It uses the `InputSize` enum.

```vue
<template>
    <InputField :size="InputSize.MD" />
</template>
```

- **Type:** `InputSize`
- **Default:** `InputSize.MD`

#### Options
::options-table
---
options: [
    {
        value: "MD",
        description: "md",
    },
    {
        value: "LG",
        description: "lg",
    },
]
---
::

### responsiveSize

Makes the field taller on mobile so it is easier to tap. When `size` is `InputSize.MD`, it is `InputSize.LG` below the `lg` breakpoint and `InputSize.MD` from `lg` up. Other sizes do not change.

```vue
<template>
    <InputField :responsiveSize="true" />
</template>
```

When the prop is not set, it follows `forms.responsiveSize` of the DS config, which is `false` by default. Pass `false` to keep a single field at its own size on mobile even when the config turns it on for the whole project. See [Configuration](/docs/getting-started/configuration).

- **Type:** `boolean`
- **Default:** `null` (follows `forms.responsiveSize` of the DS config, `false` by default)

### modelValue

Sets the value of the input field.

```vue
<template>
    <InputField v-model="inputValue" />
</template>
<script setup lang="ts">
const inputValue = ref<string | number | null>('')
</script>
```

- **Type:** `string | number | null`
- **Default:** `''`

### validator

Sets the validator function for the field, which controls its internal validation state.

It uses the `validateField` utility to perform required field validation.

```vue
<template>
    <InputField :validator="validateField" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Sets the error message of the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <InputField v-model:error="errorMessage" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### maxLength

Sets the maximum length of the input field.

```vue
<template>
    <InputField :maxLength="10" />
</template>
```

- **Type:** `number`

### filterAlphabetic

Sets whether to filter alphabetic characters in the input field.

```vue
<template>
    <InputField filterAlphabetic />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### permitNegativeNumber

Sets whether to permit negative numbers in the input field (only for type `number`).

```vue
<template>
    <InputField permitNegativeNumber />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasShowPasswordButton

Sets whether to show the "show password" button (only for type `password`).

```vue
<template>
    <InputField hasShowPasswordButton />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### togglePasswordAriaLabel

Sets the accessible name of the show / hide password button. Falls back to `useDSConfig().forms.togglePasswordVisibilityText()`.

```vue
<template>
    <InputField togglePasswordAriaLabel="Custom text" />
</template>
```

- **Type:** `string`
- **Default:** `undefined`

### suffixActionAriaLabel

Sets the accessible name of the clickable suffix icon button. Falls back to `useDSConfig().forms.suffixActionText()`.

```vue
<template>
    <InputField suffixActionAriaLabel="Custom text" />
</template>
```

- **Type:** `string`
- **Default:** `undefined`

### autoFlip

Moves the picker to the other side when it does not fit in the window. If it would be cut off at the bottom of the screen and there is more room above, it opens above the input instead. Set it to `false` to always keep it below. Only applies to the date and time types (`date`, `month`, `week`, `datetime-local` and `time`).

```vue
<template>
    <InputField type="date" :autoFlip="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### locale

Sets the BCP 47 locale used to format the date shown in the field and the names in the calendar. Only applies to the date and time types (`date`, `month`, `week`, `datetime-local` and `time`).

```vue
<template>
    <InputField type="date" locale="es-ES" />
</template>
```

- **Type:** `string`
- **Default:** `'en-US'`

### displayFormat

Sets how the date is written in the field, using `Intl.DateTimeFormat` options. Names and order follow the [locale](#locale), so the same options work in any language. It defaults to a numeric `day/month/year` order that follows the locale. It applies to the `date` and `month` types and to the date part of `datetime-local`, and does not apply to `week` or `time`.

```vue
<template>
    <InputField type="date" locale="es-ES" :displayFormat="{ dateStyle: 'long' }" />
</template>
```

- **Type:** `Intl.DateTimeFormatOptions`

### hasDateTimeSegments

Writes the `date`, `month`, `week`, `datetime-local` and `time` types by typing them in segments, such as `mm / dd / yyyy`, instead of only picking them in the calendar. The order and the separators follow the [locale](#locale). The value is still the ISO string, and it is emitted only while it is complete and allowed by [min](#min) and [max](#max). See [DatePickerField](/docs/components/date-picker-field) and [TimePickerField](/docs/components/time-picker-field) for the details.

```vue
<template>
    <InputField type="date" locale="es-ES" hasDateTimeSegments />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hourFormat

Sets the 12 or 24 hour clock of the `time` and `datetime-local` types via the `HourFormat` enum. Defaults to the one of the [locale](#locale). The 12 hour clock adds a segment or a column for AM and PM.

```vue
<template>
    <InputField type="time" :hourFormat="HourFormat.HOURS_24" hasDateTimeSegments />
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

Adds the seconds to the `time` and `datetime-local` types.

```vue
<template>
    <InputField type="time" hasSeconds hasDateTimeSegments />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### min

Sets the minimum value of the input field (only for type `number`).

```vue
<template>
    <InputField :min="0" />
</template>
```

- **Type:** `string`

### max

Sets the maximum value of the input field (only for type `number`).

```vue
<template>
    <InputField :max="100" />
</template>
```

- **Type:** `string`

### step

Sets the step value of the input field (only for type `number`).

```vue
<template>
    <InputField :step="1" />
</template>
```

- **Type:** `string`

### pattern

Sets the pattern attribute of the input field.

```vue
<template>
    <InputField pattern="[A-Za-z]{3}" />
</template>
```

- **Type:** `string`

### readonly

Sets the readonly state of the field.

```vue
<template>
    <InputField readonly />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### autocomplete

Sets the autocomplete attribute of the input field.

```vue
<template>
    <InputField autocomplete="on" />
</template>
```

- **Type:** `string`
- **Default:** `'off'`

### autofocus

Sets the autofocus state of the field.

```vue
<template>
    <InputField autofocus />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### disabled

Sets the disabled state of the field.

```vue
<template>
    <InputField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### required

Sets the required state of the field.

```vue
<template>
    <InputField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showOptionalLabel

When the field is not `required`, shows an "(optional)" hint next to the label. Set to `false` to hide it.

```vue
<template>
    <InputField label="Middle name" :showOptionalLabel="false" />
</template>
```

The hint text defaults to a global setting that can be overridden project-wide, and can also be overridden per field with the `optionalLabel` prop.

- **Type:** `boolean`
- **Default:** `true`

### optionalLabel

Overrides the "(optional)" hint text for this specific field, taking priority over the global default.

```vue
<template>
    <InputField label="Middle name" optionalLabel="(not required)" />
</template>
```

- **Type:** `string`

### transparent

When `true`, removes the default `bg-background-field` background from the input container, making it transparent.

```vue
<template>
    <InputField transparent />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### inputClass

Applies additional CSS classes directly to the `<input>` element, appended last so they can override other classes.

```vue
<template>
    <InputField inputClass="text-right font-mono" />
</template>
```

- **Type:** `string`

### glowColorMode

Draws a glow around the input box only. The label and the help text do not glow. It is shown in light mode, dark mode, both or none, and it uses the `GlowColorMode` enum. It is `GlowColorMode.NONE` by default, so the field has no glow until you turn it on.

The glow uses the brand color and turns to the error color when the field has an error.

```vue
<template>
    <InputField :glowColorMode="GlowColorMode.DARK" />
</template>
```

- **Type:** `GlowColorMode`
- **Default:** `GlowColorMode.NONE` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

#### Options
::options-table
---
options: [
    {
        value: "NONE",
        description: "No glow.",
    },
    {
        value: "BOTH",
        description: "Glow in light and dark mode.",
    },
    {
        value: "LIGHT",
        description: "Glow in light mode only.",
    },
    {
        value: "DARK",
        description: "Glow in dark mode only.",
    },
]
---
::

### glowTrigger

Sets when the glow appears. It uses the `GlowTrigger` enum and works together with `glowColorMode`, which decides in which theme the glow shows. It is `GlowTrigger.FOCUS` by default.

`FOCUS` shows the glow while the input has focus. On touch screens there is no hover, so with `HOVER` the glow never shows.

```vue
<template>
    <InputField :glowColorMode="GlowColorMode.BOTH" :glowTrigger="GlowTrigger.FOCUS" />
</template>
```

- **Type:** `GlowTrigger`
- **Default:** `GlowTrigger.FOCUS` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

#### Options
::options-table
---
options: [
    {
        value: "ALWAYS",
        description: "The glow is always visible.",
    },
    {
        value: "HOVER",
        description: "The glow shows while the pointer is over the input.",
    },
    {
        value: "FOCUS",
        description: "The glow shows while the input has focus.",
    },
    {
        value: "HOVER_FOCUS",
        description: "The glow shows on hover and on focus.",
    },
]
---
::

### glowType

Sets where the glow is drawn. It uses the `GlowType` enum and works together with `glowColorMode`. It is `GlowType.INNER` by default.

```vue
<template>
    <InputField :glowColorMode="GlowColorMode.BOTH" :glowType="GlowType.INNER" />
</template>
```

- **Type:** `GlowType`
- **Default:** `GlowType.INNER` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

#### Options
::options-table
---
options: [
    {
        value: "OUTER",
        description: "The glow spreads around the outside of the element.",
    },
    {
        value: "INNER",
        description: "The glow is drawn inside the element, along its edges.",
    },
]
---
::

### glowOpacity

Sets how strong the glow is, from `0` (invisible) to `100` (full color). The default is `40`. Values move in steps of 5, so `42` is rounded to `40`. It has no effect while `glowColorMode` is `GlowColorMode.NONE`.

```vue
<template>
    <InputField :glowColorMode="GlowColorMode.BOTH" :glowOpacity="30" />
</template>
```

- **Type:** `number`
- **Default:** `40` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

### glowSize

Sets how far the glow spreads, in pixels. It is `null` by default, so each component keeps its own size (for example, buttons follow their `size`). Values move in steps of 2 from `0` to `64`, so `13` is rounded to `14`. It has no effect while `glowColorMode` is `GlowColorMode.NONE`.

```vue
<template>
    <InputField :glowColorMode="GlowColorMode.BOTH" :glowSize="32" />
</template>
```

- **Type:** `number`
- **Default:** `null` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

