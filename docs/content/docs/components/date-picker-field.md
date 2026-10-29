## Component

::component-code
---
srcDir: 'forms/fields/DatePickerField.vue'
props:
    id: "field-id"
    label: "Label"
    helpText: "Help text example"
    helpTextPosition: "bottom"
    type: "date"
    variant: "input"
    modelValue: null
    mode: "single"
    placeholder: "Select a date"
    icon: null
    size: null
    closeOnSelect: true
    clearable: true
    calendarPosition: "bottom"
    autoFlip: true
    min: null
    max: null
    locale: "en-US"
    hourFormat: "12"
    firstDayOfWeek: 0
    color: "primary-brand"
    hasYearControls: false
    hasOutsideDays: true
    hasWeekNumbers: false
    isRounded: false
    isNavigationLocked: false
    isBoxed: true
    error: ""
    disabled: false
    readonly: false
    required: false
    showOptionalLabel: true
    transparent: false
    glowColorMode: "none"
    glowTrigger: "focus"
    glowType: "inner"
    glowOpacity: 40
    glowSize: null
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
    calendarPosition:
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
    glowColorMode: "GlowColorMode"
    glowTrigger: "GlowTrigger"
    glowType: "GlowType"
    type: "DatePickerType"
    variant: "PickerVariant"
    mode: "CalendarMode"
    size: "InputSize"
    hourFormat: "HourFormat"
    color: "ColorAccent"
    helpTextPosition: "Position"
    calendarPosition: "Position"
isPreviewContentBoxed: true
previewContentMaxWidth: 600
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
        "name": "type",
        "type": "DatePickerType",
        "default": "DatePickerType.DATE"
    },
    {
        "name": "variant",
        "type": "PickerVariant",
        "default": "PickerVariant.INPUT"
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
        "name": "autoFlip",
        "default": "true",
        "type": "boolean"
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
        "name": "hasWeekNumbers",
        "type": "boolean",
        "default": "false"
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
        "name": "markers",
        "default": "{}",
        "type": "Record<string, CalendarMarker[]>"
    },
    {
        "name": "maxMarkers",
        "default": "3",
        "type": "number"
    },
    {
        "name": "dayPopoverTrigger",
        "default": "Trigger.MANUAL",
        "type": "Trigger"
    },
    {
        "name": "hasDayPopover",
        "type": "(date: string) => boolean"
    },
    {
        "name": "dayPopoverPosition",
        "default": "Position.BOTTOM",
        "type": "Position"
    },
    {
        "name": "dayPopoverAlign",
        "type": "Align"
    },
    {
        "name": "dayPopoverAutoFlip",
        "default": "true",
        "type": "boolean"
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
    },
    {
        "name": "doneText",
        "type": "string"
    },
    {
        "name": "clearText",
        "type": "string"
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

## Slots

::slots-table
---
slots: [
    {
        "name": "day-popover",
        "description": "Content of the panel of a day in the calendar, shown according to `dayPopoverTrigger`. Receives `date` (the ISO date), `markers` (the markers of the day) and `close` (a function that closes the panel)."
    },
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

### type

Sets what the field picks, via the `DatePickerType` enum. The values are the ones of the native input types they replace, so a `v-model` keeps the same format.

```vue
<template>
    <DatePickerField id="week" :type="DatePickerType.WEEK" label="Week" />
</template>
```

- **Type:** `DatePickerType`
- **Default:** `DatePickerType.DATE`

#### Options

::options-table
---
options: [
    { value: "DATE", description: "date: an ISO date, such as `2026-10-15`" },
    { value: "MONTH", description: "month: a month, such as `2026-10`" },
    { value: "WEEK", description: "week: an ISO week, such as `2026-W41`" },
    { value: "DATETIME_LOCAL", description: "datetime-local: a date and a time, such as `2026-10-15T19:30`" },
]
---
::

### variant

Sets how the calendar is shown via the `PickerVariant` enum. `INPUT` shows a field that opens the calendar in a popup, and `INLINE` shows the calendar itself in place of the field. The label, help text and error are shown in both.

```vue
<template>
    <DatePickerField id="date" :variant="PickerVariant.INLINE" label="Date" />
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

Sets the selected value. In `SINGLE` mode it is a string, in `MULTIPLE` mode an array of strings and in `RANGE` mode a `CalendarRange`. The format of each string depends on the [type](#type): a date (`2026-10-15`), a month (`2026-10`), an ISO week (`2026-W41`) or a date and time (`2026-10-15T19:30`). Bind it with `v-model`.

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

Sets how many selections can be made, via the `CalendarMode` enum. See the [Calendar](/docs/components/calendar#mode) for how each mode behaves. It combines with the [type](#type): a range of months, several weeks... The `DATETIME_LOCAL` type always takes one.

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

Sets the placeholder of the input. Falls back to a text for the [type](#type) in `useDSConfig().calendar`. Only applies to the `INPUT` variant.

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

Sets the height of the input via the `InputSize` enum. When it is not set, it is `InputSize.LG` on mobile and `InputSize.MD` from the `lg` breakpoint up. Passing a value keeps that size at every screen width. Only applies to the `INPUT` variant.

```vue
<template>
    <DatePickerField id="date" :size="InputSize.LG" />
</template>
```

- **Type:** `InputSize`
- **Default:** `undefined` (LG on mobile, MD from `lg` up)

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

Sets how dates are written in the input, using `Intl.DateTimeFormat` options. Defaults to a numeric `day/month/year` order that follows the [locale](#locale), and to the month name and year for the `MONTH` type. It does not apply to the `WEEK` type or to the time of `DATETIME_LOCAL`.

```vue
<template>
    <DatePickerField id="date" :displayFormat="{ dateStyle: 'long' }" />
</template>
```

- **Type:** `Intl.DateTimeFormatOptions`

### closeOnSelect

Closes the popup once the selection is complete: after one date, month or week, and after the end date of a range. `MULTIPLE` mode and the `DATETIME_LOCAL` type never close on their own, since they take more than one pick: close them with `Escape` or by clicking outside.

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


### autoFlip

Moves the calendar to the other side when it does not fit in the window. If it would be cut off at the bottom or the top edge of the screen and there is more room on the other side, it opens there instead. The position is checked when it opens, and `calendarPosition` is only the starting point. Set it to `false` to always keep the position as given.

```vue
<template>
    <DatePickerField v-model="date" id="date" :autoFlip="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### min

Sets the earliest selectable value, in the format of the [type](#type): a date, a month (`2026-10`), a week (`2026-W41`) or a date and time (`2026-10-15T09:00`). In date and time, the time limit only applies on the day of the date limit.

```vue
<template>
    <DatePickerField id="date" min="2026-10-10" />
</template>
```

- **Type:** `string`

### max

Sets the latest selectable value, in the same formats as [min](#min).

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

Sets the first column of the calendar, from `0` (Sunday) to `6` (Saturday). The `WEEK` type always starts on Monday.

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

### hasWeekNumbers

Shows the ISO week number of each row in the calendar. The `WEEK` type always shows them.

```vue
<template>
    <DatePickerField id="date" :hasWeekNumbers="true" :firstDayOfWeek="1" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

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

Adds the border and background to the calendar. Only applies to the `INLINE` variant, since the popup is always boxed.

```vue
<template>
    <DatePickerField id="date" :variant="PickerVariant.INLINE" :isBoxed="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### markers

Shows dots under the days of the calendar, such as events or tasks. It is passed to the [Calendar](/docs/components/calendar#markers). It maps ISO dates to a list of markers. A marker can have a `color`, from the `ColorAccent` enum (`PRIMARY_BRAND` by default), and a `label`, which is added to the `aria-label` of the day so screen readers get it too. The dots follow the design system colors, and on a selected day they use the color of the text on filled backgrounds so they stay visible.

```vue
<template>
    <DatePickerField v-model="date" id="date" :markers="events" />
</template>

<script setup lang="ts">
const events = {
    '2026-10-15': [{ color: ColorAccent.DANGER, label: 'Deploy' }],
    '2026-10-20': [{ label: 'Review' }, { color: ColorAccent.SUCCESS, label: 'Release' }],
}
</script>
```

- **Type:** `Record<string, CalendarMarker[]>`
- **Default:** `{}`

#### TypeScript Interface

```ts
export interface CalendarMarker {
    color?: ColorAccent
    label?: string
}
```

### maxMarkers

Sets how many dots are drawn under a day. The labels of all its markers are still part of the `aria-label`.

```vue
<template>
    <DatePickerField v-model="date" id="date" :markers="events" :maxMarkers="2" />
</template>
```

- **Type:** `number`
- **Default:** `3`

### dayPopoverTrigger

Sets when the panel of a day opens, via the `Trigger` enum. See the [Calendar](/docs/components/calendar#daypopovertrigger) for the details. The `CLICK` trigger selects the day too, which closes the popup unless [closeOnSelect](#closeonselect) is off or the selection takes more picks, so `HOVER` is usually the better fit for a date field. The content of the panel is the `day-popover` slot, which receives the date, its markers and a `close` function. By default the panel opens only for days with [markers](#markers), and [hasDayPopover](#hasdaypopover) changes that. It also closes with `Escape`, with a click outside, and when the visible month changes. Without the slot, or with `MANUAL`, no panel is shown.

```vue
<template>
    <DatePickerField v-model="date" id="date" :markers="events" :dayPopoverTrigger="Trigger.HOVER">
        <template #day-popover="{ date, markers, close }">
            <p v-for="marker in markers" :key="marker.label">{{ marker.label }}</p>
        </template>
    </DatePickerField id="date">
</template>
```

- **Type:** `Trigger`
- **Default:** `Trigger.MANUAL`

#### Options

::options-table
---
options: [
    { value: "CLICK", description: "click: a click opens the panel (and a second click closes it). The click still selects the day." },
    { value: "HOVER", description: "hover: the panel opens while the pointer or the keyboard focus is on the day, and stays open while the pointer is over it." },
    { value: "MANUAL", description: "manual: the panel never opens. This is the default." },
]
---
::

The panel opens below the day, towards the inside of the calendar for the first and last columns. It is not repositioned near the edge of the screen and can be clipped by a parent with `overflow: hidden`.

### hasDayPopover

Receives each day as an ISO string and returns `true` when it has a panel. It replaces the default rule of opening only for days with [markers](#markers), so you can show a panel on any day, such as an empty state with an add button.

```vue
<template>
    <DatePickerField v-model="date" id="date" :dayPopoverTrigger="Trigger.CLICK" :hasDayPopover="isWorkday">
        <template #day-popover="{ date }">
            <ActionButton text="Add task" @click="addTask(date)" />
        </template>
    </DatePickerField id="date">
</template>
```

- **Type:** `(date: string) => boolean`

### dayPopoverPosition

Sets whether the panel of a day opens below or above it, via the `Position` enum. See the [Calendar](/docs/components/calendar#daypopoverposition) for the details. It is not the position of the calendar popup, which is [calendarPosition](#calendarposition). With [dayPopoverAutoFlip](#daypopoverautoflip), it goes to the other side when it does not fit.

```vue
<template>
    <DatePickerField v-model="date" id="date" :markers="events" :dayPopoverTrigger="Trigger.HOVER" :dayPopoverPosition="Position.TOP">
        <template #day-popover="{ date }">{{ date }}</template>
    </DatePickerField v-model="date" id="date">
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

#### Options

::options-table
---
options: [
    { value: "BOTTOM", description: "bottom" },
    { value: "TOP", description: "top" },
]
---
::

### dayPopoverAlign

Sets how the panel is aligned with its day, via the `Align` enum. Without it, the panel is centered under the day, and the first two and last two columns align it inwards (`LEFT` and `RIGHT`) so it stays inside the calendar.

```vue
<template>
    <DatePickerField v-model="date" id="date" :markers="events" :dayPopoverTrigger="Trigger.HOVER" :dayPopoverAlign="Align.LEFT">
        <template #day-popover="{ date }">{{ date }}</template>
    </DatePickerField v-model="date" id="date">
</template>
```

- **Type:** `Align`

#### Options

::options-table
---
options: [
    { value: "LEFT", description: "left: the left edge of the panel is aligned with the left edge of the day" },
    { value: "CENTER", description: "center: the panel is centered on the day" },
    { value: "RIGHT", description: "right: the right edge of the panel is aligned with the right edge of the day" },
]
---
::

### dayPopoverAutoFlip

Moves the panel when it does not fit in the window. It goes to the other side, above or below, when it would be cut off and there is more room there, and it aligns to the right or the left when it would overflow horizontally. The position is checked when the panel opens, and a position or align that you set is only the starting point. Set it to `false` to always keep the placement as given.

```vue
<template>
    <DatePickerField v-model="date" id="date" :markers="events" :dayPopoverTrigger="Trigger.HOVER" :dayPopoverAutoFlip="false">
        <template #day-popover="{ date }">{{ date }}</template>
    </DatePickerField v-model="date" id="date">
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### hourFormat

Sets the 12 or 24 hour clock of the time picker via the `HourFormat` enum. Defaults to the one of the [locale](#locale). Only applies to the `DATETIME_LOCAL` type.

```vue
<template>
    <DatePickerField id="date" :type="DatePickerType.DATETIME_LOCAL" :hourFormat="HourFormat.HOURS_12" />
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

Adds a seconds column to the time picker and to the value (`YYYY-MM-DDTHH:mm:ss`). Only applies to the `DATETIME_LOCAL` type.

```vue
<template>
    <DatePickerField id="date" :type="DatePickerType.DATETIME_LOCAL" :hasSeconds="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### minuteStep

Sets the interval between the minutes of the time picker. Only applies to the `DATETIME_LOCAL` type.

```vue
<template>
    <DatePickerField id="date" :type="DatePickerType.DATETIME_LOCAL" :minuteStep="15" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### secondStep

Sets the interval between the seconds of the time picker. Only applies to the `DATETIME_LOCAL` type.

```vue
<template>
    <DatePickerField id="date" :type="DatePickerType.DATETIME_LOCAL" :hasSeconds="true" :secondStep="15" />
</template>
```

- **Type:** `number`
- **Default:** `1`

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

### doneText

Sets the text of the button that closes the calendar in `CalendarMode.MULTIPLE` and in the date and time type, where no pick completes the selection. Falls back to `useDSConfig().calendar.doneText()`.

```vue
<template>
    <DatePickerField id="date" :mode="CalendarMode.MULTIPLE" doneText="Listo" />
</template>
```

- **Type:** `string`

### clearText

Sets the text of the button that clears the selected value in `CalendarMode.MULTIPLE` and in the date and time type. It sits next to the done button and keeps the calendar open. Falls back to `useDSConfig().calendar.clearText()`.

```vue
<template>
    <DatePickerField id="date" :mode="CalendarMode.MULTIPLE" clearText="Limpiar" />
</template>
```

- **Type:** `string`

### glowColorMode

Draws a glow around the date input box only. The label and the help text do not glow. It is shown in light mode, dark mode, both or none, and it uses the `GlowColorMode` enum. It is `GlowColorMode.NONE` by default, so the field has no glow until you turn it on.

The glow uses the brand color and turns to the error color when the field has an error.

```vue
<template>
    <DatePickerField :glowColorMode="GlowColorMode.DARK" />
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

`FOCUS` shows the glow while the field has focus. On touch screens there is no hover, so with `HOVER` the glow never shows.

```vue
<template>
    <DatePickerField :glowColorMode="GlowColorMode.BOTH" :glowTrigger="GlowTrigger.FOCUS" />
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
        description: "The glow shows while the pointer is over the field.",
    },
    {
        value: "FOCUS",
        description: "The glow shows while the field has focus.",
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
    <DatePickerField :glowColorMode="GlowColorMode.BOTH" :glowType="GlowType.INNER" />
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
    <DatePickerField :glowColorMode="GlowColorMode.BOTH" :glowOpacity="30" />
</template>
```

- **Type:** `number`
- **Default:** `40` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

### glowSize

Sets how far the glow spreads, in pixels. It is `null` by default, so each component keeps its own size (for example, buttons follow their `size`). Values move in steps of 2 from `0` to `64`, so `13` is rounded to `14`. It has no effect while `glowColorMode` is `GlowColorMode.NONE`.

```vue
<template>
    <DatePickerField :glowColorMode="GlowColorMode.BOTH" :glowSize="32" />
</template>
```

- **Type:** `number`
- **Default:** `null` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

## Accessibility

For every type, in the `INPUT` variant the field is a read-only text input with `aria-haspopup="dialog"` and `aria-expanded`. Focus moves into the calendar when it opens and returns to the input when it closes.

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
    { value: "@update:modelValue", description: "Emitted with the new value when it changes: a string, an array of strings or a `CalendarRange`, depending on the mode. Clearing emits `null`, `[]` or `{ start: null, end: null }`." },
    { value: "@day-click", description: "Emitted with `{ date, key, isDisabled }` when a day of the calendar is clicked, also for disabled days and when the calendar is readonly. `key` is what the click would select: the date, its ISO week or its month, depending on the `unit`." },
    { value: "@day-hover", description: "Emitted with `{ date, key, isDisabled }` when the pointer enters a day." },
    { value: "@day-hover-end", description: "Emitted when the pointer leaves the grid of days." },
    { value: "@month-change", description: "Emitted with `{ year, month, from, to }` when the visible month changes, by the buttons, the month and year pickers or the keyboard. `month` goes from 1 to 12, and `from` and `to` are the first and last day of the month as ISO dates, so you can load its events." },
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
    { value: "open()", description: "Opens the popup. Does nothing when the field is disabled, readonly or inline." },
    { value: "close()", description: "Closes the popup and returns the focus to the input." },
]
---
::
