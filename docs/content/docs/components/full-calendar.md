## Component

::component-code
---
srcDir: 'calendars/FullCalendar.vue'
props:
    modelValue: "2026-10-12"
    view: "month"
    events:
        - id: "1"
          title: "Sprint planning"
          start: "2026-10-05"
          time: "10:00"
          endTime: "11:00"
        - id: "2"
          title: "Design review"
          start: "2026-10-12"
          time: "11:30"
          endTime: "12:30"
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
        - id: "12"
          title: "Mon: 1st column"
          start: "2026-10-26"
          time: "09:00"
          color: "info"
        - id: "13"
          title: "Tue: 2nd column"
          start: "2026-10-27"
          color: "success"
        - id: "14"
          title: "Fri: 5th column"
          start: "2026-10-30"
          time: "12:00"
          color: "warning"
        - id: "15"
          title: "Sat: 6th column"
          start: "2026-10-31"
          color: "danger"
        - id: "16"
          title: "Sun: last column"
          start: "2026-11-01"
          time: "18:00"
          color: "secondary-brand"
        - id: "17"
          title: "Tue: 2nd column"
          start: "2026-10-06"
          time: "10:00"
        - id: "18"
          title: "Wed: 3rd column"
          start: "2026-10-07"
          color: "info"
        - id: "19"
          title: "Thu: 4th column"
          start: "2026-10-08"
          time: "15:00"
          color: "success"
        - id: "20"
          title: "Fri: 5th column"
          start: "2026-10-09"
          color: "warning"
        - id: "21"
          title: "Sat: 6th column"
          start: "2026-10-10"
          time: "11:00"
          color: "danger"
        - id: "22"
          title: "Sun: last column"
          start: "2026-10-11"
          time: "09:30"
          color: "secondary-brand"
        - id: "23"
          title: "Sun: more 1"
          start: "2026-10-11"
          time: "10:30"
        - id: "24"
          title: "Sun: more 2"
          start: "2026-10-11"
          time: "11:30"
          color: "info"
        - id: "25"
          title: "Sun: more 3"
          start: "2026-10-11"
          time: "12:30"
          color: "success"
        - id: "26"
          title: "Mon: more 1"
          start: "2026-10-05"
          time: "12:00"
          color: "info"
        - id: "27"
          title: "Mon: more 2"
          start: "2026-10-05"
          time: "13:00"
          color: "warning"
        - id: "28"
          title: "Mon: more 3"
          start: "2026-10-05"
          time: "14:00"
          color: "success"
    maxEvents: 3
    agendaDays: 30
    timeGridMaxHeight: "40rem"
    hourFormat: "24"
    locale: "en-US"
    firstDayOfWeek: 1
    color: "primary-brand"
    hasEventPopover: true
    isAddable: true
    isEditable: true
    isDeletable: true
    isBoxed: true
    disabled: false
    ariaLabel: "Calendar"
items:
    view:
        - value: day
          text: DAY
        - value: week
          text: WEEK
        - value: month
          text: MONTH
        - value: year
          text: YEAR
        - value: agenda
          text: AGENDA
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
    view: "FullCalendarView"
    hourFormat: "HourFormat"
    color: "ColorAccent"
external:
    - events
externalTypes:
    - FullCalendarEvent[]
propsSettingsExcludedProps: ["modelValue", "views", "events"]
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
        "name": "view",
        "default": "FullCalendarView.MONTH",
        "type": "FullCalendarView"
    },
    {
        "name": "views",
        "default": "Object.values(FullCalendarView)",
        "type": "FullCalendarView[]"
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
        "name": "agendaDays",
        "default": "30",
        "type": "number"
    },
    {
        "name": "timeGridMaxHeight",
        "default": "'40rem'",
        "type": "string"
    },
    {
        "name": "timeGridHeaderClass",
        "default": "'bg-background-container-surface'",
        "type": "string"
    },
    {
        "name": "hourFormat",
        "default": "HourFormat.HOURS_24",
        "type": "HourFormat"
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
        "name": "hasEventPopover",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "isAddable",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "isEditable",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "isDeletable",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "headingTag",
        "default": "'h2'",
        "type": "HeadingTag"
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
        "description": "Content of an event in every view, also in the `+N more` panel. Receives `event` (the `FullCalendarEvent`). It replaces what is inside the event: the dot, the time and the title in the month and the agenda, and the title and time of the block in the day and week."
    },
    {
        "name": "more-popover",
        "description": "Content of the `+N more` panel. Receives `date` (the ISO date), `label` (the full date as text), `events` (all the events of the day) and `close` (a function that closes the panel). It replaces the title, the close button and the list, and the panel keeps its box and its placement."
    },
    {
        "name": "event-popover",
        "description": "Content of the popover of an event. Receives `event` (the `FullCalendarEvent`), `close` (a function that closes the popover), `edit` (a function that emits `event-edit` with the event and closes the popover) and `remove` (a function that emits `event-delete` with the event and closes the popover). It replaces the information and the buttons, and the popover keeps its box and its placement."
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

### view

Sets the view that is shown via the `FullCalendarView` enum. You can bind it with `v-model:view`. The view menu and the [keyboard shortcuts](#accessibility) change it too, and every view shows the same focused day, so changing the view keeps the date.

```vue
<template>
    <FullCalendar v-model:view="view" :events />
</template>

<script setup lang="ts">
const view = ref(FullCalendarView.WEEK)
</script>
```

In the `DAY` and `WEEK` views the header, with the dates and the events of the whole day, stays on top while the hours scroll. The height of the hours is set with [timeGridMaxHeight](#timegridmaxheight).

- **Type:** `FullCalendarView`
- **Default:** `FullCalendarView.MONTH`

#### Options

::options-table
---
options: [
    { value: "DAY", description: "day: one day with its hours. The events with a time are blocks on the hours, and the rest are in the all day row. Events that share hours are put side by side." },
    { value: "WEEK", description: "week: the 7 days of the week with their hours. Clicking a day opens it in the day view." },
    { value: "MONTH", description: "month: the weeks of the month, with the events laid over the days." },
    { value: "YEAR", description: "year: the 12 months. Clicking a day opens it in the day view, and clicking a month opens it in the month view." },
    { value: "AGENDA", description: "agenda: the list of the days that have events, starting on the shown day (see [agendaDays](#agendadays))." },
]
---
::

### views

Sets the views that can be chosen, shown in the order of the enum. The menu is hidden when there is only one view. A view that is not in the list also ignores its shortcut and is skipped when a day or a month is clicked.

```vue
<template>
    <FullCalendar :views="[FullCalendarView.MONTH, FullCalendarView.WEEK]" />
</template>
```

- **Type:** `FullCalendarView[]`
- **Default:** `Object.values(FullCalendarView)`

### events

Sets the events to show. An event that spans several days, or that has no valid `time` (`HH:mm`), is a colored bar: in the month and the agenda it is on its days, and in the day and week it is in the all day row. A single-day event with a `time` is a dot followed by the time and the title in the month, and a block from `time` to `endTime` in the day and week (an hour long without `endTime`). Blocks that share hours are put side by side. A bar that crosses weeks continues on the next row. Events that already ended are shown faded in every view, but they can still be clicked: an event of the day is past after its last day, and an event with a time after its `endTime` (an hour after `time` without it). Events with an invalid `start` are ignored.

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
    endTime?: string // HH:mm
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

### maxEvents

Sets how many events a day shows. The rest are collapsed into a `+N more` button. Clicking it opens a panel over the day with all of its events, and emits `more-click`.

```vue
<template>
    <FullCalendar :events :maxEvents="2" />
</template>
```

- **Type:** `number`
- **Default:** `3`

### agendaDays

Sets how many days the `AGENDA` view covers, from the focused day. The arrows move by this amount. Only the days that have events are listed.

```vue
<template>
    <FullCalendar :view="FullCalendarView.AGENDA" :agendaDays="14" />
</template>
```

- **Type:** `number`
- **Default:** `30`

### timeGridMaxHeight

Sets the maximum height of the hours of the `DAY` and `WEEK` views, as a CSS length. The hours scroll inside it, and the header with the dates stays on top. The view starts an hour before the current time, or at 7:00 when today is not shown.

```vue
<template>
    <FullCalendar :view="FullCalendarView.WEEK" timeGridMaxHeight="30rem" />
</template>
```

- **Type:** `string`
- **Default:** `'40rem'`

### timeGridHeaderClass

Sets the Tailwind classes of the sticky header of the `DAY` and `WEEK` views, the one with the dates and the all day events that stays on top while the hours scroll. They replace the default `bg-background-container-surface`, so include a background when you set it. Use theme tokens, such as `bg-background-neutral-subtlest`, to keep the dark mode working.

```vue
<template>
    <FullCalendar :view="FullCalendarView.WEEK" timeGridHeaderClass="bg-background-neutral-subtlest" />
</template>
```

- **Type:** `string`
- **Default:** `'bg-background-container-surface'`

### hourFormat

Sets how the hours of the day and week views are written, via the `HourFormat` enum: `13:00` or `1:00 PM`. The times of the events are shown as they are given.

```vue
<template>
    <FullCalendar :view="FullCalendarView.WEEK" :hourFormat="HourFormat.HOURS_12" />
</template>
```

- **Type:** `HourFormat`
- **Default:** `HourFormat.HOURS_24`

#### Options

::options-table
---
options: [
    { value: "HOURS_12", description: "12: hours with AM / PM, such as `1:00 PM`" },
    { value: "HOURS_24", description: "24: hours from 00 to 23, such as `13:00`" },
]
---
::

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

Moves the `+N more` panel to the other side when it does not fit in the calendar: upwards in the last rows, and towards the left or the right when it goes out on a side. The panel is centered on its day in the middle columns, starts at the day in the first columns, and ends at it in the last ones. Set it to `false` to keep that initial placement without measuring. The popover of an event is also centered on the event and always kept inside the calendar.

```vue
<template>
    <FullCalendar :events :morePopoverAutoFlip="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### hasEventPopover

Opens a popover with the information of an event when it is clicked: its title, its day or days, and its time (or "All day"). It works in every view, also in the `+N more` panel. It closes with its close button, with `Escape`, when you click outside, or when the view or the dates change. `event-click` is emitted either way, so set it to `false` to show your own dialog instead.

```vue
<template>
    <FullCalendar :events :hasEventPopover="false" @event-click="openDialog" />
</template>
```

Use the [event-popover](#slots) slot to change what the popover shows.

- **Type:** `boolean`
- **Default:** `true`

### isAddable

Lets you add events by clicking a cell. Clicking a day of the month emits `event-add` with `{ date }`, and clicking an empty hour of the day or week views emits it with `{ date, time }` (in steps of 30 minutes). The calendar does not create anything: open a form or a dialog in the handler, save the event and add it to `events`.

```vue
<template>
    <FullCalendar :events isAddable @event-add="openForm" />
</template>

<script setup lang="ts">
const openForm = ({ date, time }: FullCalendarAddEvent) => console.log(date, time)
</script>
```

- **Type:** `boolean`
- **Default:** `false`

#### TypeScript Interface

```ts
export interface FullCalendarAddEvent {
    date: string
    time?: string // HH:mm, only in the day and week views
}
```

### isEditable

Shows an edit button in the popover of an event. Clicking it closes the popover and emits `event-edit` with the event. The calendar does not change the event: open your form in the handler, save it (it can be asynchronous), and update `events` when it is done.

```vue
<template>
    <FullCalendar :events isEditable @event-edit="openForm" />
</template>

<script setup lang="ts">
const openForm = (event: FullCalendarEvent) => console.log('Edit', event.id)
</script>
```

It needs [hasEventPopover](#haseventpopover).

- **Type:** `boolean`
- **Default:** `false`

### isDeletable

Shows a delete button in the popover of an event. Clicking it closes the popover and emits `event-delete` with the event. The calendar does not remove the event: delete it in the handler, which can be asynchronous, and update `events` when it is done.

```vue
<template>
    <FullCalendar :events isDeletable @event-delete="removeEvent" />
</template>

<script setup lang="ts">
const events = ref<FullCalendarEvent[]>([])

const removeEvent = async (event: FullCalendarEvent) => {
    await api.deleteEvent(event.id)
    events.value = events.value.filter((item) => item.id !== event.id)
}
</script>
```

It needs [hasEventPopover](#haseventpopover).

- **Type:** `boolean`
- **Default:** `false`

### headingTag

Sets the HTML tag of the month title, so the heading level fits the outline of your page. It accepts `h1` to `h6`.

```vue
<template>
    <FullCalendar headingTag="h3" />
</template>
```

- **Type:** `HeadingTag`
- **Default:** `'h2'`

### isBoxed

Shows the calendar inside a box, with a border, rounded corners and a surface background. Set it to `false` to place the calendar in a container that already has its own box.

```vue
<template>
    <FullCalendar :isBoxed="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

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

The month view is described below. In the day and week views the dates of the header are buttons, with their full date as `aria-label`, and the hours are a plain grid of events. The year view has a button for each month and each day, and the agenda lists each day with a button for its date and one for each event.

The view menu opens with the mouse or the keyboard, and each view has a shortcut when the focus is in the calendar (except while typing in a field, or with `Ctrl`, `Cmd` or `Alt`):

::options-table
---
options: [
    { value: "D", description: "Shows the day view." },
    { value: "W", description: "Shows the week view." },
    { value: "M", description: "Shows the month view." },
    { value: "Y", description: "Shows the year view." },
    { value: "A", description: "Shows the agenda view." },
]
---
::

In the month view only one day is in the tab order. Once the focus is on a day, these keys move it:

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

The popover of an event is a `dialog` named after the event. `Escape` closes it and returns the focus to the event, and its buttons are named after `useDSConfig().calendar.editEventText()`, `useDSConfig().calendar.deleteEventText()` and `useDSConfig().actions.closeText()`.

The `+N more` button has `aria-haspopup="dialog"` and `aria-expanded`. The panel is a `dialog` named after the date, and `Escape` closes it and returns the focus to the day. It also closes when you click outside, click a day, pick an event or change the month.

The texts of the buttons, the views and the agenda come from `useDSConfig().calendar`, and the close button text from `useDSConfig().actions`.

## Emits

::options-table
---
options: [
    { value: "@day-click", description: "Emitted with `{ date, key, isDisabled }` when a day is clicked in the month, or a day of the header, the year or the agenda is opened." },
    { value: "@update:view", description: "Emitted with the new `FullCalendarView` when the view changes, by the menu, a shortcut or a day or month that opens another view." },
    { value: "@range-change", description: "Emitted with `{ view, from, to }` when the view or the dates it shows change. `from` and `to` are the first and last day (ISO dates) that the view shows, so you can load its events. In the month they are the first and last day of the grid, including the days of the months around it." },
    { value: "@slot-click", description: "Emitted with `{ date, time }` when an empty part of a day in the day or week view is clicked. `time` is the start of the half hour (`HH:mm`), so you can open a form to create an event." },
    { value: "@event-click", description: "Emitted with the `FullCalendarEvent` when an event is clicked. The day is not selected." },
    { value: "@event-add", description: "Emitted with `{ date, time? }` when a cell is clicked and [isAddable](#isaddable) is set: a day of the month (`date` only) or an empty hour of the day and week views. The calendar does not add the event, so you can ask for its data or call your API first." },
    { value: "@event-edit", description: "Emitted with the `FullCalendarEvent` when the edit button of its popover is clicked and [isEditable](#iseditable) is set. The calendar does not change the event, so you can open a form, call your API and then update `events`." },
    { value: "@event-delete", description: "Emitted with the `FullCalendarEvent` when the delete button of its popover is clicked and [isDeletable](#isdeletable) is set. The calendar does not remove the event, so you can call your API first and then update `events`." },
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
        isAddable
        isEditable
        isDeletable
        @event-click="openEvent"
        @event-add="addEvent"
        @event-edit="editEvent"
        @event-delete="deleteEvent"
        @more-click="openDay"
        @month-change="loadEvents"
    />
</template>

<script setup lang="ts">
const date = ref<string | null>(null)
const events = ref<FullCalendarEvent[]>([])

const openEvent = (event: FullCalendarEvent) => console.log('Event', event.title)
const openDay = ({ date, events }: FullCalendarMoreEvent) => console.log(date, events.length)

const addEvent = async ({ date, time }: FullCalendarAddEvent) => {
    const created = await api.createEvent({ title: 'New event', start: date, time })
    events.value = [...events.value, created]
}

const editEvent = (event: FullCalendarEvent) => console.log('Edit', event.id)

const deleteEvent = async (event: FullCalendarEvent) => {
    await api.deleteEvent(event.id)
    events.value = events.value.filter((item) => item.id !== event.id)
}

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

export interface FullCalendarRangeEvent {
    view: FullCalendarView
    from: string
    to: string
}

export interface FullCalendarSlotEvent {
    date: string
    time: string
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
