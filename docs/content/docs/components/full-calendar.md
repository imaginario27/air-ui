## Component

::component-code
---
srcDir: 'calendars/FullCalendar.vue'
props:
    modelValue: "2026-10-12"
    events:
        - id: "1"
          title: "Sprint planning"
          start: "2026-10-05"
          time: "10:00"
        - id: "2"
          title: "Design review"
          start: "2026-10-12"
          time: "11:30"
          color: "info"
        - id: "3"
          title: "Product launch"
          start: "2026-10-12"
          color: "danger"
        - id: "4"
          title: "Team offsite"
          start: "2026-10-14"
          end: "2026-10-16"
          color: "success"
        - id: "5"
          title: "Client demo"
          start: "2026-10-15"
          time: "16:00"
          color: "secondary-brand"
        - id: "6"
          title: "Standup"
          start: "2026-10-15"
          time: "09:15"
        - id: "7"
          title: "Retro"
          start: "2026-10-15"
          time: "17:30"
          color: "warning"
        - id: "11"
          title: "Code freeze"
          start: "2026-10-15"
          color: "danger"
        - id: "8"
          title: "Conference"
          start: "2026-10-19"
          end: "2026-10-23"
          color: "info"
        - id: "9"
          title: "Quarterly report due"
          start: "2026-10-28"
          color: "warning"
        - id: "10"
          title: "Dentist"
          start: "2026-10-29"
          time: "08:45"
          color: "neutral"
    maxEvents: 3
    locale: "en-US"
    firstDayOfWeek: 1
    color: "primary-brand"
    disabled: false
    ariaLabel: "Calendar"
items:
    color:
        - value: primary-brand
          text: PRIMARY_BRAND
        - value: secondary-brand
          text: SECONDARY_BRAND
enums:
    color: "ColorAccent"
propsSettingsExcludedProps: ["modelValue", "events"]
---
::

## Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "default": "null",
        "type": "string | null"
    },
    {
        "name": "events",
        "default": "[]",
        "type": "FullCalendarEvent[]"
    },
    {
        "name": "maxEvents",
        "default": "3",
        "type": "number"
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
        "name": "disabled",
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
]
---
::

## Slots

::slots-table
---
slots: [
    {
        "name": "event",
        "description": "Content of an event. Receives `event` (the `FullCalendarEvent`). It replaces the dot, the time and the title."
    },
]
---
::

## Usage

All dates are ISO strings (`YYYY-MM-DD`), the same format the native date input uses. No time zone is involved.

### modelValue

Sets the selected day, shown with a soft highlight. You can bind it with `v-model`. Today is always shown with a filled circle.

```vue
<template>
    <FullCalendar v-model="date" :events />
</template>

<script setup lang="ts">
const date = ref<string | null>('2026-10-12')
</script>
```

- **Type:** `string | null`
- **Default:** `null`

### events

Sets the events to show. An event that spans several days, or that has no `time`, is a colored bar. A single-day event with a `time` (`HH:mm`) is a dot followed by the time and the title. A bar that crosses weeks continues on the next row. Events with an invalid `start` are ignored.

```vue
<template>
    <FullCalendar :events />
</template>

<script setup lang="ts">
const events: FullCalendarEvent[] = [
    { id: '1', title: 'Product launch', start: '2026-10-12', color: ColorAccent.DANGER },
    { id: '2', title: 'Team offsite', start: '2026-10-14', end: '2026-10-16', color: ColorAccent.SUCCESS },
    { id: '3', title: 'Client demo', start: '2026-10-15', time: '16:00' },
]
</script>
```

- **Type:** `FullCalendarEvent[]`
- **Default:** `[]`

#### TypeScript Interface

```ts
export interface FullCalendarEvent {
    id?: string
    title: string
    start: string
    end?: string // The last day, inclusive
    time?: string // HH:mm
    color?: ColorAccent
}
```

### maxEvents

Sets how many events a day shows. The rest are collapsed into a `+N more` button that emits `more-click`.

```vue
<template>
    <FullCalendar :events :maxEvents="2" />
</template>
```

- **Type:** `number`
- **Default:** `3`

### locale

Sets the locale used for the month, the weekdays and the full date of each day.

```vue
<template>
    <FullCalendar locale="es-ES" :firstDayOfWeek="1" />
</template>
```

- **Type:** `string`
- **Default:** `'en-US'`

### firstDayOfWeek

Sets the first day of the week, from `0` (Sunday) to `6` (Saturday).

```vue
<template>
    <FullCalendar :firstDayOfWeek="1" />
</template>
```

- **Type:** `number`
- **Default:** `0`

### color

Sets the accent of today, the selected day and the focus ring via the `ColorAccent` enum. Events use their own `color`.

```vue
<template>
    <FullCalendar :color="ColorAccent.SECONDARY_BRAND" />
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

### disabled

Disables the navigation, the days and the events.

```vue
<template>
    <FullCalendar :disabled="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### ariaLabel

Sets the accessible name of the calendar.

```vue
<template>
    <FullCalendar ariaLabel="Team calendar" />
</template>
```

- **Type:** `string`

### previousMonthAriaLabel

Overrides the `aria-label` of the previous month button. By default it comes from `useDSConfig().calendar`.

- **Type:** `string`

### nextMonthAriaLabel

Overrides the `aria-label` of the next month button. By default it comes from `useDSConfig().calendar`.

- **Type:** `string`

## Accessibility

The calendar is a `group`. The title of the month is announced when it changes. Each day is a button with its full date as `aria-label`, `aria-pressed` when it is selected and `aria-current="date"` when it is today. Each event is a button named after its time and title.

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

The `Today` and `+N more` texts come from `useDSConfig().calendar`.

## Emits

::options-table
---
options: [
    { value: "@day-click", description: "Emitted with `{ date, key, isDisabled }` when a day is clicked." },
    { value: "@event-click", description: "Emitted with the `FullCalendarEvent` when an event is clicked. The day is not selected." },
    { value: "@month-change", description: "Emitted with `{ year, month, from, to }` when the visible month changes. `month` goes from 1 to 12, and `from` and `to` are the first and last day of the month as ISO dates, so you can load its events." },
    { value: "@more-click", description: "Emitted with `{ date, events }` when a `+N more` button is clicked. `events` are all the events of the day." },
    { value: "@update:modelValue", description: "Emitted with the new ISO date when a day is selected." },
]
---
::

#### Example

```vue
<template>
    <FullCalendar
        v-model="date"
        :events
        @event-click="openEvent"
        @more-click="openDay"
        @month-change="loadEvents"
    />
</template>

<script setup lang="ts">
const date = ref<string | null>(null)
const events = ref<FullCalendarEvent[]>([])

const openEvent = (event: FullCalendarEvent) => console.log('Event', event.title)
const openDay = ({ date, events }: FullCalendarMoreEvent) => console.log(date, events.length)

const loadEvents = async ({ from, to }: CalendarMonthEvent) => {
    events.value = await fetchEvents(from, to)
}
</script>
```

#### TypeScript Interface

```ts
export interface FullCalendarMoreEvent {
    date: string
    events: FullCalendarEvent[]
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
    <FullCalendar ref="calendar" v-model="date" />
    <ActionButton text="Focus" @click="calendar?.focus()" />
</template>

<script setup lang="ts">
const calendar = ref()
</script>
```
