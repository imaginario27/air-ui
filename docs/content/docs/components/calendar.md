## Component

::component-code
---
srcDir: 'calendars/Calendar.vue'
props:
    modelValue: "2026-10-15"
    mode: "single"
    unit: "day"
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
    markers:
        "2026-10-12":
            - color: "info"
              label: "Planning"
        "2026-10-15":
            - color: "danger"
              label: "Deploy"
            - color: "success"
              label: "Release"
        "2026-10-20":
            - label: "Review"
    maxMarkers: 3
    dayPopoverTrigger: "hover"
    dayPopoverPosition: "bottom"
    dayPopoverAutoFlip: true
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
    unit:
        - value: day
          text: DAY
        - value: week
          text: WEEK
        - value: month
          text: MONTH
    color:
        - value: primary-brand
          text: PRIMARY_BRAND
        - value: secondary-brand
          text: SECONDARY_BRAND
    dayPopoverTrigger:
        - value: hover
          text: HOVER
        - value: click
          text: CLICK
        - value: manual
          text: MANUAL
    dayPopoverPosition:
        - value: bottom
          text: BOTTOM
        - value: top
          text: TOP
enums:
    mode: "CalendarMode"
    unit: "CalendarUnit"
    color: "ColorAccent"
    dayPopoverTrigger: "Trigger"
    dayPopoverPosition: "Position"
slots:
    day-popover: ""
slotComponents:
    day-popover:
        srcDir: 'placeholders/ContentPlaceholder.vue'
        slotProps:
            date: "text"
propsSettingsExcludedProps: ["modelValue", "isDateDisabled", "markers"]
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
        "name": "unit",
        "default": "CalendarUnit.DAY",
        "type": "CalendarUnit"
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

## Slots

::slots-table
---
slots: [
    {
        "name": "day-popover",
        "description": "Content of the panel of a day, shown according to `dayPopoverTrigger`. Receives `date` (the ISO date), `markers` (the markers of the day) and `close` (a function that closes the panel)."
    },
]
---
::

## Usage

All dates are ISO strings (`YYYY-MM-DD`), the same format the native date input uses. No time or time zone is involved.

### modelValue

Sets the selected date. You can bind it with `v-model`. In `MULTIPLE` mode it is an array, and in `RANGE` mode it is a `CalendarRange` object (see [mode](#mode)). What each value is depends on the [unit](#unit): an ISO date (`2026-10-15`), an ISO week (`2026-W41`) or a month (`2026-10`).

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

Sets how many selections can be made via the `CalendarMode` enum. It combines with the [unit](#unit), which sets what each selection covers. In `MULTIPLE` mode, clicking a day adds it to the array and clicking it again removes it; the array is kept sorted. In `RANGE` mode, the first click sets `start`, the second sets `end`, and a click before the start (or after a complete range) starts a new range. The days between the hovered day and the start are previewed while picking.

```vue
<template>
    <Calendar v-model="range" :mode="CalendarMode.RANGE" />
    <Calendar v-model="days" :mode="CalendarMode.MULTIPLE" />
</template>

<script setup lang="ts">
const range = ref({ start: '2026-10-10', end: '2026-10-14' })
const days = ref(['2026-10-10', '2026-10-15'])
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
]
---
::

### unit

Sets what each selection covers via the `CalendarUnit` enum: a day, an ISO week or a month. It is independent from the [mode](#mode), so every combination works: one week, several weeks, a range of months...

- `WEEK`: clicking a day selects its whole ISO week (Monday to Sunday), and the value is a string such as `2026-W41`. The week always starts on Monday, whatever [firstDayOfWeek](#firstdayofweek) says. Combine it with [hasWeekNumbers](#hasweeknumbers) to show the week numbers.
- `MONTH`: only the months and years are shown, and the value is a string such as `2026-10`.

The value of [min](#min) and [max](#max) can be given in any of the formats. In `RANGE` mode, the weeks or months at both ends are filled and the ones between are soft, and the hovered one previews the end.

```vue
<template>
    <Calendar v-model="week" :unit="CalendarUnit.WEEK" :hasWeekNumbers="true" />
    <Calendar v-model="weeks" :unit="CalendarUnit.WEEK" :mode="CalendarMode.RANGE" />
    <Calendar v-model="months" :unit="CalendarUnit.MONTH" :mode="CalendarMode.MULTIPLE" />
</template>

<script setup lang="ts">
const week = ref('2026-W41')
const weeks = ref({ start: '2026-W41', end: '2026-W43' })
const months = ref(['2026-03', '2026-10'])
</script>
```

- **Type:** `CalendarUnit`
- **Default:** `CalendarUnit.DAY`

#### Options

::options-table
---
options: [
    { value: "DAY", description: "day: values are ISO dates, such as `2026-10-15`" },
    { value: "WEEK", description: "week: values are ISO weeks, such as `2026-W41`" },
    { value: "MONTH", description: "month: values are months, such as `2026-10`" },
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

Sets the first column of the week, from `0` (Sunday) to `6` (Saturday). It is ignored when the [unit](#unit) is `WEEK`, which always starts on Monday.

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

Shows the ISO week number of each row in a column before the days. The number is the one of the Thursday of the row, so it is right for Monday-first calendars (`firstDayOfWeek` of `1`) and for the `WEEK` [unit](#unit). The header text comes from `useDSConfig().calendar.weekAbbreviationText()`.

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

### markers

Shows dots under the days of the calendar, such as events or tasks. It maps ISO dates to a list of markers. A marker can have a `color`, from the `ColorAccent` enum (`PRIMARY_BRAND` by default), and a `label`, which is added to the `aria-label` of the day so screen readers get it too. The dots follow the design system colors, and on a selected day they use the color of the text on filled backgrounds so they stay visible.

```vue
<template>
    <Calendar v-model="date" :markers="events" />
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
    <Calendar v-model="date" :markers="events" :maxMarkers="2" />
</template>
```

- **Type:** `number`
- **Default:** `3`

### dayPopoverTrigger

Sets when the panel of a day opens, via the `Trigger` enum. The content of the panel is the `day-popover` slot, which receives the date, its markers and a `close` function. By default the panel opens only for days with [markers](#markers), and [hasDayPopover](#hasdaypopover) changes that. It also closes with `Escape`, with a click outside, and when the visible month changes. Without the slot, or with `MANUAL`, no panel is shown.

```vue
<template>
    <Calendar v-model="date" :markers="events" :dayPopoverTrigger="Trigger.HOVER">
        <template #day-popover="{ date, markers, close }">
            <p v-for="marker in markers" :key="marker.label">{{ marker.label }}</p>
        </template>
    </Calendar>
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

By default the panel opens below the day, towards the inside of the calendar for the first and last columns, and moves to the other side when it does not fit in the window (see [dayPopoverPosition](#daypopoverposition), [dayPopoverAlign](#daypopoveralign) and [dayPopoverAutoFlip](#daypopoverautoflip)). It can still be clipped by a parent with `overflow: hidden`.

### hasDayPopover

Receives each day as an ISO string and returns `true` when it has a panel. It replaces the default rule of opening only for days with [markers](#markers), so you can show a panel on any day, such as an empty state with an add button.

```vue
<template>
    <Calendar v-model="date" :dayPopoverTrigger="Trigger.CLICK" :hasDayPopover="isWorkday">
        <template #day-popover="{ date }">
            <ActionButton text="Add task" @click="addTask(date)" />
        </template>
    </Calendar>
</template>
```

- **Type:** `(date: string) => boolean`

### dayPopoverPosition

Sets whether the panel of a day opens below or above it, via the `Position` enum. With [dayPopoverAutoFlip](#daypopoverautoflip), it goes to the other side when it does not fit.

```vue
<template>
    <Calendar v-model="date" :markers="events" :dayPopoverTrigger="Trigger.HOVER" :dayPopoverPosition="Position.TOP">
        <template #day-popover="{ date }">{{ date }}</template>
    </Calendar v-model="date">
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
    <Calendar v-model="date" :markers="events" :dayPopoverTrigger="Trigger.HOVER" :dayPopoverAlign="Align.LEFT">
        <template #day-popover="{ date }">{{ date }}</template>
    </Calendar v-model="date">
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
    <Calendar v-model="date" :markers="events" :dayPopoverTrigger="Trigger.HOVER" :dayPopoverAutoFlip="false">
        <template #day-popover="{ date }">{{ date }}</template>
    </Calendar v-model="date">
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

Days with markers have their labels in the `aria-label`. When a day has a panel, its button has `aria-haspopup="dialog"` and `aria-expanded`, and the panel is a `dialog` named after the date. With `HOVER`, keyboard focus on the day opens it too, and `Escape` closes it and returns the focus to the day.

Clicking the month in the header opens the months view, and clicking the year opens a page of years. Picking a month or a year goes straight back to the days. Navigation text comes from `useDSConfig().calendar`.

## Emits

::options-table
---
options: [
    { value: "@day-click", description: "Emitted with `{ date, key, isDisabled }` when a day is clicked, also for disabled days and when the calendar is readonly. `key` is what the click would select: the date, its ISO week or its month, depending on the `unit`." },
    { value: "@day-hover", description: "Emitted with `{ date, key, isDisabled }` when the pointer enters a day." },
    { value: "@day-hover-end", description: "Emitted when the pointer leaves the grid of days." },
    { value: "@month-change", description: "Emitted with `{ year, month, from, to }` when the visible month changes, by the buttons, the month and year pickers or the keyboard. `month` goes from 1 to 12, and `from` and `to` are the first and last day of the month as ISO dates, so you can load its events." },
    { value: "@update:modelValue", description: "Emitted with the new ISO date when a day is selected. It is an array in `MULTIPLE` mode and a `CalendarRange` in `RANGE` mode. Each value is a date, an ISO week or a month, depending on the [unit](#unit)." },
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

#### Events

```vue
<template>
    <Calendar v-model="date" :markers="events" @day-click="handleClick" @month-change="loadEvents" />
</template>

<script setup lang="ts">
const events = ref<Record<string, CalendarMarker[]>>({})

const handleClick = ({ date, isDisabled }: CalendarDayEvent) => {
    if (!isDisabled) console.log('Day', date)
}

const loadEvents = async ({ from, to }: CalendarMonthEvent) => {
    events.value = await fetchEvents(from, to)
}
</script>
```

#### TypeScript Interface

```ts
export interface CalendarDayEvent {
    date: string
    key: string
    isDisabled: boolean
}

export interface CalendarMonthEvent {
    year: number
    month: number
    from: string
    to: string
}
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
