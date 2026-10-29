## Component

::component-code
---
srcDir: 'segmented-inputs/DateTimeSegments.vue'
props:
    id: "date"
    type: "date"
    modelValue: "2026-10-15"
    locale: "en-US"
    hourFormat: null
    hasSeconds: false
    ariaLabel: "Date"
    disabled: false
    readonly: false
items:
    type:
        - value: date
          text: DATE
        - value: month
          text: MONTH
        - value: week
          text: WEEK
        - value: datetime-local
          text: DATETIME_LOCAL
        - value: time
          text: TIME
    hourFormat:
        - value: "12"
          text: HOURS_12
        - value: "24"
          text: HOURS_24
enums:
    type: "DateSegmentsType"
    hourFormat: "HourFormat"
isPreviewContentBoxed: true
previewContentMaxWidth: 300
propsSettingsExcludedProps: ['modelValue', 'isAllowed']
---
::

## Props

::props-table
---
props: [
    {
        "name": "id",
        "type": "string"
    },
    {
        "name": "type",
        "default": "DateSegmentsType.DATE",
        "type": "DateSegmentsType"
    },
    {
        "name": "modelValue",
        "default": "''",
        "type": "string | null"
    },
    {
        "name": "locale",
        "default": "'en-US'",
        "type": "string"
    },
    {
        "name": "hourFormat",
        "type": "HourFormat"
    },
    {
        "name": "hasSeconds",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "isAllowed",
        "default": "() => true",
        "type": "(value: string) => boolean"
    },
    {
        "name": "ariaLabel",
        "type": "string"
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "readonly",
        "default": "false",
        "type": "boolean"
    },
]
---
::

## Usage

### id

Sets the `id` of the first segment, so a `label` with `for` focuses the input when it is clicked.

```vue
<template>
    <label for="birth-date">Birth date</label>
    <DateTimeSegments id="birth-date" v-model="birthDate" />
</template>
```

- **Type:** `string`

### type

Sets what the input writes. It uses the `DateSegmentsType` enum, and each type has its own ISO value: `YYYY-MM-DD`, `YYYY-MM`, `YYYY-Www`, `YYYY-MM-DDTHH:mm` and `HH:mm`.

```vue
<template>
    <DateTimeSegments :type="DateSegmentsType.TIME" v-model="startsAt" />
</template>
```

- **Type:** `DateSegmentsType`
- **Default:** `DateSegmentsType.DATE`

#### Options

::options-table
---
options: [
    { value: "DATE", description: "date" },
    { value: "MONTH", description: "month" },
    { value: "WEEK", description: "week" },
    { value: "DATETIME_LOCAL", description: "datetime-local" },
    { value: "TIME", description: "time" },
]
---
::

### modelValue

Sets the value of the input as an ISO string. It is bindable via `v-model`. It is empty while the segments are incomplete, or when they are not a real date or time, or are not allowed by [isAllowed](#isallowed).

```vue
<template>
    <DateTimeSegments v-model="birthDate" />
</template>

<script setup lang="ts">
const birthDate = ref('2026-10-15')
</script>
```

- **Type:** `string | null`
- **Default:** `''`

### locale

Sets the BCP 47 locale that decides the order of the segments, the separators and the 12 or 24 hour clock. `es-ES` writes `dd / mm / yyyy`, `en-US` writes `mm / dd / yyyy` and `ja-JP` writes `yyyy / mm / dd`. The digits are always Latin and the calendar Gregorian.

```vue
<template>
    <DateTimeSegments locale="es-ES" />
</template>
```

- **Type:** `string`
- **Default:** `'en-US'`

### hourFormat

Sets the 12 or 24 hour clock via the `HourFormat` enum. Defaults to the one of the [locale](#locale). With the 12 hour clock there is a segment for AM and PM. It only applies to the `TIME` and `DATETIME_LOCAL` types.

```vue
<template>
    <DateTimeSegments :type="DateSegmentsType.TIME" :hourFormat="HourFormat.HOURS_24" />
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

Adds a segment for the seconds. It only applies to the `TIME` and `DATETIME_LOCAL` types.

```vue
<template>
    <DateTimeSegments :type="DateSegmentsType.TIME" hasSeconds />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isAllowed

Sets a function that decides whether a complete value can be used, such as one between two limits. A value that is not allowed is not emitted and the segments are marked as invalid.

```vue
<template>
    <DateTimeSegments v-model="date" :isAllowed="(value) => value >= '2026-10-10'" />
</template>
```

- **Type:** `(value: string) => boolean`
- **Default:** `() => true`

### ariaLabel

Sets the accessible name of the group of segments.

```vue
<template>
    <DateTimeSegments ariaLabel="Birth date" />
</template>
```

- **Type:** `string`

### disabled

Disables the segments so they cannot be focused or changed.

```vue
<template>
    <DateTimeSegments disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### readonly

Keeps the segments focusable but stops them from changing.

```vue
<template>
    <DateTimeSegments readonly />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

## Accessibility

The input is a `fieldset` named by [ariaLabel](#arialabel), and each segment is a `spinbutton` with its own label (day, month, year, hours, minutes, seconds and AM/PM) and its range in `aria-valuemin` and `aria-valuemax`. The segments are marked with `aria-invalid` while they are complete but not a real or allowed value. The separators are hidden from assistive technology.

The segments use a numeric keyboard on mobile, and each digit goes through the rules of its segment, so the keyboard cannot write a value that does not exist.

::options-table
---
options: [
    { value: "0-9", description: "Types the digits of the segment. It moves to the next one when no other digit could follow, such as `4` in the day." },
    { value: "/ . - : , Space", description: "Completes the segment, for example `1` as `01`, and moves to the next one." },
    { value: "ArrowUp / ArrowDown", description: "Raises or lowers the segment, and goes round at the ends of its range. In an empty segment it starts from the lowest or highest number, or from the current year." },
    { value: "ArrowLeft / ArrowRight", description: "Moves to the previous or next segment." },
    { value: "Backspace / Delete", description: "Clears the segment." },
    { value: "a / p", description: "Chooses AM or PM, with the first letter of how the locale writes them." },
    { value: "Alt + ArrowDown", description: "Asks to open the picker, through the `@open` event." },
]
---
::

You can paste an ISO value, such as `2026-10-15` or `19:30`, to fill all the segments at once.

## Emits

::options-table
---
options: [
    { value: "@update:modelValue", description: "Emitted with the ISO value when every segment is complete and the value is real and allowed, and with an empty string when it stops being so. It waits until a segment is complete or loses the focus, so a year typed as `2026` never emits `0202`." },
    { value: "@focus", description: "Emitted when the focus enters the input." },
    { value: "@blur", description: "Emitted when the focus leaves the input, not when it moves between two segments." },
    { value: "@open", description: "Emitted when `Alt` + `ArrowDown` is pressed, so the field can open its picker." },
]
---
::

#### Example

```vue
<template>
    <DateTimeSegments
        v-model="birthDate"
        locale="es-ES"
        @focus="isFocused = true"
        @blur="isFocused = false"
    />
</template>

<script setup lang="ts">
const birthDate = ref('')
const isFocused = ref(false)
</script>
```

## Methods

::options-table
---
options: [
    { value: "focus()", description: "Moves the focus to the first segment." },
]
---
::

```vue
<template>
    <DateTimeSegments ref="segments" v-model="birthDate" />
    <ActionButton text="Edit" @click="segments?.focus()" />
</template>

<script setup lang="ts">
const birthDate = ref('')
const segments = ref<{ focus: () => void } | null>(null)
</script>
```
