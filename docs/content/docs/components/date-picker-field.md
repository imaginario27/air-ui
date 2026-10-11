## Component

::component-code
---
srcDir: 'forms/fields/DatePickerField.vue'
props:
    id: "field-id"
    label: "Label"
    helpText: "Help text example"
    helpTextPosition: "bottom"
    variant: "input"
    modelValue: null
    mode: "single"
    placeholder: "Select a date"
    icon: null
    size: "md"
    closeOnSelect: true
    clearable: true
    calendarPosition: "bottom"
    min: null
    max: null
    locale: "en-US"
    firstDayOfWeek: 0
    color: "primary-brand"
    hasYearControls: false
    hasOutsideDays: true
    isRounded: false
    isNavigationLocked: false
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
    mode:
        - value: single
          text: SINGLE
        - value: multiple
          text: MULTIPLE
        - value: range
          text: RANGE
    size:
        - value: md
          text: MD
        - value: lg
          text: LG
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
    calendarPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
enums:
    variant: "DatePickerVariant"
    mode: "CalendarMode"
    size: "InputSize"
    color: "ColorAccent"
    helpTextPosition: "Position"
    calendarPosition: "Position"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
propsSettingsExcludedProps: ['modelValue', 'validator', 'isDateDisabled', 'displayFormat']
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
        "type": "DatePickerVariant",
        "default": "DatePickerVariant.INPUT"
    },
    {
        "name": "modelValue",
        "type": "string | string[] | CalendarRange | null",
        "default": "null"
    },
    {
        "name": "mode",
        "type": "CalendarMode",
        "default": "CalendarMode.SINGLE"
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
        "name": "displayFormat",
        "type": "Intl.DateTimeFormatOptions"
    },
    {
        "name": "closeOnSelect",
        "type": "boolean",
        "default": "true"
    },
    {
        "name": "clearable",
        "type": "boolean",
        "default": "true"
    },
    {
        "name": "calendarPosition",
        "type": "Position",
        "default": "Position.BOTTOM"
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
        "name": "isDateDisabled",
        "type": "(date: string) => boolean",
        "default": "() => false"
    },
    {
        "name": "locale",
        "type": "string",
        "default": "'en-US'"
    },
    {
        "name": "firstDayOfWeek",
        "type": "number",
        "default": "0"
    },
    {
        "name": "color",
        "type": "ColorAccent",
        "default": "ColorAccent.PRIMARY_BRAND"
    },
    {
        "name": "hasYearControls",
        "type": "boolean",
        "default": "false"
    },
    {
        "name": "hasOutsideDays",
        "type": "boolean",
        "default": "true"
    },
    {
        "name": "isRounded",
        "type": "boolean",
        "default": "false"
    },
    {
        "name": "isNavigationLocked",
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
    <DatePickerField id="birth-date" />
</template>
```

- **Type:** `string`

### label

Sets the label shown above the field. In the `INLINE` variant it also names the calendar.

```vue
<template>
    <DatePickerField id="date" label="Birth date" />
</template>
```

- **Type:** `string`

### ariaLabel

Sets the accessible name when there is no visible [label](#label).

```vue
<template>
    <DatePickerField id="date" ariaLabel="Birth date" />
</template>
```

- **Type:** `string`

### helpText

Sets the help text. When there is an [error](#error), the error is shown instead.

```vue
<template>
    <DatePickerField id="date" helpText="Pick your birth date" />
</template>
```

- **Type:** `string`

### helpTextPosition

Sets where the help text is shown, via the `Position` enum.

```vue
<template>
    <DatePickerField id="date" :helpTextPosition="Position.TOP" helpText="Hint" />
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

Sets how the calendar is shown via the `DatePickerVariant` enum. `INPUT` shows a field that opens the calendar in a popup, and `INLINE` shows the calendar itself in place of the field. The label, help text and error are shown in both.

```vue
<template>
    <DatePickerField id="date" :variant="DatePickerVariant.INLINE" label="Date" />
</template>
```

- **Type:** `DatePickerVariant`
- **Default:** `DatePickerVariant.INPUT`

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

Sets the selected date(s). It is an ISO date (`YYYY-MM-DD`) in `SINGLE` mode, an array in `MULTIPLE` mode and a `CalendarRange` in `RANGE` mode. Bind it with `v-model`.

```vue
<template>
    <DatePickerField v-model="date" id="date" />
</template>
```

- **Type:** `string | string[] | CalendarRange | null`
- **Default:** `null`

#### TypeScript Interface

```ts
export interface CalendarRange {
    start: string | null
    end: string | null
}
```

### mode

Sets how dates are selected, via the `CalendarMode` enum. See the [Calendar](/docs/components/calendar#mode) for how each mode behaves.

```vue
<template>
    <DatePickerField v-model="range" id="range" :mode="CalendarMode.RANGE" />
</template>
```

- **Type:** `CalendarMode`
- **Default:** `CalendarMode.SINGLE`

#### Options

::options-table
---
options: [
    { value: "SINGLE", description: "single" },
    { value: "MULTIPLE", description: "multiple" },
    { value: "RANGE", description: "range" },
]
---
::

### placeholder

Sets the placeholder of the input. Falls back to `useDSConfig().calendar.placeholderText()`. Only applies to the `INPUT` variant.

```vue
<template>
    <DatePickerField id="date" placeholder="Choose a day" />
</template>
```

- **Type:** `string`

### icon

Sets an icon shown at the start of the input. Only applies to the `INPUT` variant.

```vue
<template>
    <DatePickerField id="date" icon="mdi:cake-variant-outline" />
</template>
```

- **Type:** `string`

### size

Sets the height of the input via the `InputSize` enum. Only applies to the `INPUT` variant.

```vue
<template>
    <DatePickerField id="date" :size="InputSize.LG" />
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

### displayFormat

Sets how dates are written in the input, using `Intl.DateTimeFormat` options. Defaults to a numeric `day/month/year` order that follows the [locale](#locale).

```vue
<template>
    <DatePickerField id="date" :displayFormat="{ dateStyle: 'long' }" />
</template>
```

- **Type:** `Intl.DateTimeFormatOptions`

### closeOnSelect

Closes the popup once the selection is complete: after one date in `SINGLE` mode and after the end date in `RANGE` mode. `MULTIPLE` mode never closes on its own.

```vue
<template>
    <DatePickerField id="date" :closeOnSelect="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### clearable

Shows a button to clear the value while there is one.

```vue
<template>
    <DatePickerField id="date" :clearable="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### calendarPosition

Sets whether the popup opens below or above the input, via the `Position` enum.

```vue
<template>
    <DatePickerField id="date" :calendarPosition="Position.TOP" />
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

### min

Sets the earliest selectable date (ISO).

```vue
<template>
    <DatePickerField id="date" min="2026-10-10" />
</template>
```

- **Type:** `string`

### max

Sets the latest selectable date (ISO).

```vue
<template>
    <DatePickerField id="date" max="2026-10-20" />
</template>
```

- **Type:** `string`

### isDateDisabled

Receives each day as an ISO string and returns `true` to disable it.

```vue
<template>
    <DatePickerField id="date" :isDateDisabled="isWeekend" />
</template>
```

- **Type:** `(date: string) => boolean`
- **Default:** `() => false`

### locale

Sets the BCP 47 locale used for the text in the input and the calendar.

```vue
<template>
    <DatePickerField id="date" locale="es-ES" :firstDayOfWeek="1" />
</template>
```

- **Type:** `string`
- **Default:** `'en-US'`

### firstDayOfWeek

Sets the first column of the calendar, from `0` (Sunday) to `6` (Saturday).

```vue
<template>
    <DatePickerField id="date" :firstDayOfWeek="1" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### color

Sets the accent color of the calendar. Supports `PRIMARY_BRAND` and `SECONDARY_BRAND`.

```vue
<template>
    <DatePickerField id="date" :color="ColorAccent.SECONDARY_BRAND" />
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

### hasYearControls

Shows buttons to jump a year in the calendar header.

```vue
<template>
    <DatePickerField id="date" :hasYearControls="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasOutsideDays

Shows the days of the adjacent months in the calendar.

```vue
<template>
    <DatePickerField id="date" :hasOutsideDays="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### isRounded

Makes the calendar cells fully round.

```vue
<template>
    <DatePickerField id="date" :isRounded="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isNavigationLocked

Locks the calendar to the visible month. See the [Calendar](/docs/components/calendar#isnavigationlocked).

```vue
<template>
    <DatePickerField id="date" :isNavigationLocked="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isBoxed

Adds the border, background and padding to the calendar. Only applies to the `INLINE` variant, since the popup is always boxed.

```vue
<template>
    <DatePickerField id="date" :variant="DatePickerVariant.INLINE" :isBoxed="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### validator

Validates the value and returns an error message, or `null`. It runs only when the field is [required](#required), whenever the value changes and when the popup closes.

```vue
<template>
    <DatePickerField id="date" required :validator="validateField" />
</template>
```

- **Type:** `(value: unknown) => string | null`
- **Default:** `() => null`

### error

Sets the error message. The field and the help text switch to the error style.

```vue
<template>
    <DatePickerField id="date" error="Required field" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### disabled

Disables the field and the calendar.

```vue
<template>
    <DatePickerField id="date" :disabled="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### readonly

Shows the value without letting the user change it. The popup does not open, and an inline calendar can be browsed but not selected.

```vue
<template>
    <DatePickerField id="date" :readonly="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### required

Marks the field as required: hides the optional label and enables the [validator](#validator).

```vue
<template>
    <DatePickerField id="date" label="Date" :required="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showOptionalLabel

Shows the optional text next to the label when the field is not required.

```vue
<template>
    <DatePickerField id="date" label="Date" :showOptionalLabel="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### optionalLabel

Sets the optional text. Falls back to `useDSConfig().forms.optionalLabelText()`.

```vue
<template>
    <DatePickerField id="date" label="Fecha" optionalLabel="(opcional)" />
</template>
```

- **Type:** `string`

### transparent

Removes the background of the input.

```vue
<template>
    <DatePickerField id="date" :transparent="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### clearAriaLabel

Sets the `aria-label` of the clear button. Falls back to `useDSConfig().forms.clearSelectionText()`.

```vue
<template>
    <DatePickerField id="date" clearAriaLabel="Borrar fecha" />
</template>
```

- **Type:** `string`

### openAriaLabel

Sets the `aria-label` of the calendar button. Falls back to `useDSConfig().calendar.openText()`.

```vue
<template>
    <DatePickerField id="date" openAriaLabel="Abrir calendario" />
</template>
```

- **Type:** `string`

## Accessibility

In the `INPUT` variant the field is a read-only text input with `aria-haspopup="dialog"` and `aria-expanded`. Focus moves into the calendar when it opens and returns to the input when it closes.

::options-table
---
options: [
    { value: "Enter / Space / ArrowDown", description: "Opens the calendar from the input." },
    { value: "Escape", description: "Closes the calendar and returns the focus to the input." },
]
---
::

Inside the calendar, the arrow keys, `Home`, `End` and `PageUp` / `PageDown` move between days. See the [Calendar accessibility notes](/docs/components/calendar#accessibility) for the full list.

## Emits

::options-table
---
options: [
    { value: "@update:modelValue", description: "Emitted with the new value when it changes: an ISO date, an array of dates or a `CalendarRange`, depending on the mode. Clearing emits `null`, `[]` or `{ start: null, end: null }`." },
    { value: "@update:error", description: "Emitted with the validation message, or an empty string, when the validator runs." },
]
---
::

#### Example

```vue
<template>
    <DatePickerField :modelValue="date" id="date" @update:modelValue="handleChange" />
</template>

<script setup lang="ts">
const date = ref<string | null>(null)

const handleChange = (value: string | null) => {
    date.value = value
}
</script>
```

## Methods

::options-table
---
options: [
    { value: "open()", description: "Opens the calendar popup. Does nothing when the field is disabled, readonly or inline." },
    { value: "close()", description: "Closes the calendar popup and returns the focus to the input." },
]
---
::
