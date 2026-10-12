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
        "name": "getEventColor",
        "type": "(event: FullCalendarEvent) => ColorAccent | undefined"
    },
    {
        "name": "morePopoverAutoFlip",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "headingTag",
        "default": "'h2'",
        "type": "HeadingTag"
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
        "description": "Content of an event, also in the `+N more` panel. Receives `event` (the `FullCalendarEvent`). It replaces the dot, the time and the title."
    },
    {
        "name": "more-popover",
        "description": "Content of the `+N more` panel. Receives `date` (the ISO date), `label` (the full date as text), `events` (all the events of the day) and `close` (a function that closes the panel). It replaces the title, the close button and the list, and the panel keeps its box and its placement."
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
    meta?: Record<string, unknown> // Anything else you need back
}
```

The `meta` field is for your own data, such as a category or the id of the record in your API. It is not read by the calendar: it comes back untouched in `event-click`, `more-click`, the `event` slot and `getEventColor`.

```vue
<template>
    <FullCalendar :events @event-click="openEvent" />
</template>

<script setup lang="ts">
const events: FullCalendarEvent[] = [
    { title: 'Design review', start: '2026-10-12', meta: { category: 'work', recordId: 42 } },
]

const openEvent = (event: FullCalendarEvent) => router.push(`/records/${event.meta?.recordId}`)
</script>
```

### getEventColor

Sets the color of each event with a function, so you can map your own data to the `ColorAccent` colors. It wins over the `color` of the event, and when it returns `undefined` the `color` of the event is used (primary brand by default). The colors are always the accent tokens of the theme, never raw colors.

```vue
<template>
    <FullCalendar :events :getEventColor="getColor" />
</template>

<script setup lang="ts">
const colors: Record<string, ColorAccent> = {
    work: ColorAccent.INFO,
    personal: ColorAccent.SUCCESS,
    deadline: ColorAccent.DANGER,
}

const getColor = (event: FullCalendarEvent) => colors[event.meta?.category as string]
</script>
```

- **Type:** `(event: FullCalendarEvent) => ColorAccent | undefined`

### morePopoverAutoFlip

Moves the `+N more` panel to the other side when it does not fit in the calendar: upwards in the last rows, and towards the left when it goes out on the right. Set it to `false` to always open it down and to the right (the last columns open to the left).

```vue
<template>
    <FullCalendar :events :morePopoverAutoFlip="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### maxEvents

Sets how many events a day shows. The rest are collapsed into a `+N more` button. Clicking it opens a panel over the day with all of its events, and emits `more-click`.

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

### headingTag

Sets the HTML tag of the month title, so the heading level fits the outline of your page. It accepts `h1` to `h6`.

```vue
<template>
    <FullCalendar headingTag="h3" />
</template>
```

- **Type:** `HeadingTag`
- **Default:** `'h2'`

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

The `+N more` button has `aria-haspopup="dialog"` and `aria-expanded`. The panel is a `dialog` named after the date, and `Escape` closes it and returns the focus to the day. It also closes when you click outside, click a day, pick an event or change the month.

The `Today` and `+N more` texts come from `useDSConfig().calendar`, and the close button text from `useDSConfig().actions`.

## Emits

::options-table
---
options: [
    { value: "@day-click", description: "Emitted with `{ date, key, isDisabled }` when a day is clicked." },
    { value: "@event-click", description: "Emitted with the `FullCalendarEvent` when an event is clicked. The day is not selected." },
    { value: "@month-change", description: "Emitted with `{ year, month, from, to }` when the visible month changes. `month` goes from 1 to 12, and `from` and `to` are the first and last day of the month as ISO dates, so you can load its events." },
    { value: "@more-click", description: "Emitted with `{ date, events }` when a `+N more` button is clicked, after the panel opens. `events` are all the events of the day." },
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

#### Custom panel

```vue
<template>
    <FullCalendar :events>
        <template #more-popover="{ label, events, close }">
            <p class="font-semibold">{{ label }}</p>
            <ul>
                <li v-for="event in events" :key="event.id">{{ event.title }}</li>
            </ul>
            <ActionButton text="Done" @click="close" />
        </template>
    </FullCalendar>
</template>
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
