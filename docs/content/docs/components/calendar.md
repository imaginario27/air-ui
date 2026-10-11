## Component

::component-code
---
srcDir: 'calendars/Calendar.vue'
props:
    modelValue: "2026-10-15"
    mode: "single"
    min: null
    max: null
    locale: "en-US"
    firstDayOfWeek: 0
    color: "primary-brand"
    hasYearControls: false
    hasOutsideDays: true
    hasWeekNumbers: false
    isRounded: false
    isNavigationLocked: false
    isBoxed: true
    disabled: false
    readonly: false
    ariaLabel: "Choose a date"
items:
    mode:
        - value: single
          text: SINGLE
        - value: multiple
          text: MULTIPLE
        - value: range
          text: RANGE
        - value: week
          text: WEEK
        - value: month
          text: MONTH
    color:
        - value: primary-brand
          text: PRIMARY_BRAND
        - value: secondary-brand
          text: SECONDARY_BRAND
enums:
    mode: "CalendarMode"
    color: "ColorAccent"
propsSettingsExcludedProps: ["modelValue", "isDateDisabled"]
---
::

## Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "default": "null",
        "type": "string | string[] | CalendarRange | null"
    },
    {
        "name": "mode",
        "default": "CalendarMode.SINGLE",
        "type": "CalendarMode"
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
        "default": "() => false",
        "type": "(date: string) => boolean"
    },
    {
        "name": "locale",
        "default": "'en-US'",
        "type": "string"
    },
    {
        "name": "firstDayOfWeek",
        "default": "0",
        "type": "number"
    },
    {
        "name": "color",
        "default": "ColorAccent.PRIMARY_BRAND",
        "type": "ColorAccent"
    },
    {
        "name": "hasYearControls",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "hasOutsideDays",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "hasWeekNumbers",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "isRounded",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "isNavigationLocked",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "isBoxed",
        "default": "true",
        "type": "boolean"
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
    {
        "name": "ariaLabel",
        "type": "string"
    },
    {
        "name": "previousMonthAriaLabel",
        "type": "string"
    },
    {
        "name": "nextMonthAriaLabel",
        "type": "string"
    },
    {
        "name": "previousYearAriaLabel",
        "type": "string"
    },
    {
        "name": "nextYearAriaLabel",
        "type": "string"
    },
]
---
::

## Usage

All dates are ISO strings (`YYYY-MM-DD`), the same format the native date input uses. No time or time zone is involved.

### modelValue

Sets the selected date. You can bind it with `v-model`. In `MULTIPLE` mode it is an array of dates, in `RANGE` mode it is a `CalendarRange` object, in `WEEK` mode an ISO week such as `2026-W41`, and in `MONTH` mode a month such as `2026-10` (see [mode](#mode)).

```vue
<template>
    <Calendar v-model="date" />
</template>

<script setup lang="ts">
const date = ref('2026-10-15')
</script>
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

Sets how dates are selected via the `CalendarMode` enum. In `MULTIPLE` mode, clicking a day adds it to the array and clicking it again removes it; the array is kept sorted. In `WEEK` mode, clicking a day selects its whole ISO week (Monday to Sunday), and the value is a string such as `2026-W41`. The week always starts on Monday, whatever [firstDayOfWeek](#firstdayofweek) says. In `MONTH` mode only the months and years are shown, and the value is a string such as `2026-10`. In `RANGE` mode, the first click sets `start`, the second sets `end`, and a click before the start (or after a complete range) starts a new range. The days between the hovered day and the start are previewed while picking.

```vue
<template>
    <Calendar v-model="range" :mode="CalendarMode.RANGE" />
    <Calendar v-model="days" :mode="CalendarMode.MULTIPLE" />
    <Calendar v-model="week" :mode="CalendarMode.WEEK" :hasWeekNumbers="true" />
    <Calendar v-model="month" :mode="CalendarMode.MONTH" />
</template>

<script setup lang="ts">
const range = ref({ start: '2026-10-10', end: '2026-10-14' })
const days = ref(['2026-10-10', '2026-10-15'])
const week = ref('2026-W41')
const month = ref('2026-10')
</script>
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
    { value: "WEEK", description: "week" },
    { value: "MONTH", description: "month" },
]
---
::

### min

Sets the earliest selectable date. Earlier days, months and years are disabled, and the previous buttons stop at this limit. It also accepts a month (`2026-10`) or a week (`2026-W41`), which mean the first day they cover.

```vue
<template>
    <Calendar v-model="date" min="2026-10-10" />
</template>
```

- **Type:** `string`

### max

Sets the latest selectable date. Later days, months and years are disabled, and the next buttons stop at this limit. It also accepts a month (`2026-10`) or a week (`2026-W41`), which mean the last day they cover.

```vue
<template>
    <Calendar v-model="date" max="2026-10-20" />
</template>
```

- **Type:** `string`

### isDateDisabled

Receives each day as an ISO string and returns `true` to disable it. Use it for weekends, holidays or booked days.

```vue
<template>
    <Calendar v-model="date" :isDateDisabled="isWeekend" />
</template>

<script setup lang="ts">
const isWeekend = (iso: string) => {
    const day = parseISODate(iso)!.getDay()
    return day === 0 || day === 6
}
</script>
```

- **Type:** `(date: string) => boolean`
- **Default:** `() => false`

### locale

Sets the BCP 47 locale used for month and weekday names. It defaults to a fixed value so server and client render the same markup.

```vue
<template>
    <Calendar v-model="date" locale="es-ES" :firstDayOfWeek="1" />
</template>
```

- **Type:** `string`
- **Default:** `'en-US'`

### firstDayOfWeek

Sets the first column of the week, from `0` (Sunday) to `6` (Saturday). It is ignored in `WEEK` mode, which always starts on Monday.

```vue
<template>
    <Calendar v-model="date" :firstDayOfWeek="1" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### color

Sets the accent color of the selected days and the focus ring via the `ColorAccent` enum. Only `PRIMARY_BRAND` and `SECONDARY_BRAND` are supported.

```vue
<template>
    <Calendar v-model="date" :color="ColorAccent.SECONDARY_BRAND" />
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

Shows buttons in the header of the days view to jump to the previous or next year, keeping the same month. They respect [min](#min) and [max](#max).

```vue
<template>
    <Calendar v-model="date" :hasYearControls="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasOutsideDays

Shows the days of the adjacent months that fill the six-week grid. When `false` they are left empty. The grid always has six rows, so the height never changes between months.

```vue
<template>
    <Calendar v-model="date" :hasOutsideDays="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### hasWeekNumbers

Shows the ISO week number of each row in a column before the days. The number is the one of the Thursday of the row, so it is right for Monday-first calendars (`firstDayOfWeek` of `1`) and for the `WEEK` mode. The header text comes from `useDSConfig().calendar.weekAbbreviationText()`.

```vue
<template>
    <Calendar v-model="date" :hasWeekNumbers="true" :firstDayOfWeek="1" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isRounded

Makes the days (and the month and year cells) fully round. In range mode only the two ends of the range are rounded, so the band stays continuous.

```vue
<template>
    <Calendar v-model="date" :isRounded="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isNavigationLocked

Locks the visible month. The previous and next buttons, the year controls and the month and year buttons in the header are disabled, so the user can only pick days of the month shown. Use it together with [modelValue](#modelvalue) to present a fixed month, such as a booking window.

Keyboard navigation stays inside the month, and the days of the adjacent months are disabled because picking one would change the month. The value can still change from outside, which moves the view as usual.

```vue
<template>
    <Calendar v-model="date" :isNavigationLocked="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isBoxed

Adds the border, radius, background and padding. Turn it off to embed the calendar inside another surface, such as a card or a popover.

```vue
<template>
    <Calendar v-model="date" :isBoxed="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### disabled

Disables the whole calendar, including the navigation. Nothing can be focused or selected.

```vue
<template>
    <Calendar v-model="date" :disabled="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### readonly

Keeps the selection fixed while still letting the user browse months, years and days. The grid is marked with `aria-readonly`.

```vue
<template>
    <Calendar v-model="date" :readonly="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### ariaLabel

Sets the accessible name of the calendar.

```vue
<template>
    <Calendar v-model="date" ariaLabel="Birth date" />
</template>
```

- **Type:** `string`

### previousMonthAriaLabel

Sets the `aria-label` of the previous button in the days view. Falls back to `useDSConfig().calendar.previousMonthText()`.

```vue
<template>
    <Calendar v-model="date" previousMonthAriaLabel="Mes anterior" />
</template>
```

- **Type:** `string`

### nextMonthAriaLabel

Sets the `aria-label` of the next button in the days view. Falls back to `useDSConfig().calendar.nextMonthText()`.

```vue
<template>
    <Calendar v-model="date" nextMonthAriaLabel="Mes siguiente" />
</template>
```

- **Type:** `string`

### previousYearAriaLabel

Sets the `aria-label` of the previous button in the months and years views. Falls back to `useDSConfig().calendar.previousYearText()`.

```vue
<template>
    <Calendar v-model="date" previousYearAriaLabel="Año anterior" />
</template>
```

- **Type:** `string`

### nextYearAriaLabel

Sets the `aria-label` of the next button in the months and years views. Falls back to `useDSConfig().calendar.nextYearText()`.

```vue
<template>
    <Calendar v-model="date" nextYearAriaLabel="Año siguiente" />
</template>
```

- **Type:** `string`

## Accessibility

The calendar is a `group` with a `grid` of days. Each day is a button with its full date as `aria-label`, and disabled days use `aria-disabled` so they stay reachable by keyboard. Today is marked with `aria-current="date"`. Set [ariaLabel](#arialabel) so the calendar has a name.

Only one day is in the tab order. Once the focus is on a day, these keys move it:

::options-table
---
options: [
    { value: "ArrowLeft / ArrowRight", description: "Moves one day backward or forward." },
    { value: "ArrowUp / ArrowDown", description: "Moves one week backward or forward." },
    { value: "Home / End", description: "Moves to the first or last day of the month." },
    { value: "PageUp / PageDown", description: "Moves one month backward or forward." },
    { value: "Shift + PageUp / PageDown", description: "Moves one year backward or forward." },
    { value: "Enter / Space", description: "Selects the focused day." },
]
---
::

Clicking the month in the header opens the months view, and clicking the year opens a page of years. Picking a month or a year goes straight back to the days. Navigation text comes from `useDSConfig().calendar`.

## Emits

::options-table
---
options: [
    { value: "@update:modelValue", description: "Emitted with the new ISO date when a day is selected. It is an array in `MULTIPLE` mode, a `CalendarRange` in `RANGE` mode, an ISO week in `WEEK` mode and a month in `MONTH` mode." },
]
---
::

#### Example

```vue
<template>
    <Calendar :modelValue="date" @update:modelValue="handleSelect" />
</template>

<script setup lang="ts">
const date = ref<string | null>(null)

const handleSelect = (value: string) => {
    date.value = value
}
</script>
```

## Methods

::options-table
---
options: [
    { value: "focus()", description: "Moves the focus to the selected day (or the last focused one) so keyboard navigation can start." },
]
---
::

```vue
<template>
    <Calendar ref="calendar" v-model="date" />
    <ActionButton text="Focus" @click="calendar?.focus()" />
</template>

<script setup lang="ts">
const calendar = ref()
</script>
```
