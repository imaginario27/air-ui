## Component

::component-code
---
srcDir: 'notifications/NotificationsPopover.vue'
props:
    list:
        - id: "1"
          read: false
          title: "New message"
          description: "You have a new message from Alice."
          timeAgo: "2 minutes ago"
          author: "Alice"
          link: "/messages/1"
          icon: "mdi:bell-outline"
          iconColor: "primary-brand"
        - id: "2"
          read: false
          title: "Deployment complete"
          description: "Your application was deployed successfully."
          timeAgo: "15 minutes ago"
          author: "CI System"
          link: "/deployments/2"
          icon: "mdi:check-circle-outline"
          iconColor: "success"
        - id: "3"
          read: true
          title: "New comment"
          description: "Bob left a comment on your post."
          timeAgo: "1 hour ago"
          author: "Bob"
          link: "/posts/3"
          icon: "mdi:comment-outline"
          iconColor: "secondary-brand"
    limit: 10
    position: "bottom"
    align: "center"
    trigger: "click"
    popoverClass: "min-w-[332px]"
    title: "Notifications"
    isLoading: false
    errorText: ""
    listEmptyText: "No notifications available."
    listMaxHeightClass: "max-h-[400px]"
    viewAllText: "View all"
    viewAllLink: ""
    isListIconContained: true
    listIconSize: "md"
    listContainedIconSize: "sm"
    listContainedIconShape: "circle"
    listContainedStyleType: "flat"
    listTimeAgoIcon: "mdi:clock-time-four-outline"
    listAuthorIcon: "mdi:account-outline"
    listRemoveItemIcon: "mdi:close"
    listRemoveItemAriaLabel: "Remove notification"
    badgeColor: "secondary-brand"
    badgeStyleType: "filled"
    badgeShape: "pill"
    buttonAllReadText: "Mark all as read"
    buttonAllReadIcon: "mdi:check-all"
    buttonClearAllText: "Clear all"
    buttonClearAllIcon: "mdi:close-circle-outline"
    filterAllButtonText: "All"
    filterUnreadButtonText: "Unread"
    filterGroupStyle: "grouped"
items:
    position:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
    align:
        - value: left
          text: LEFT
        - value: center
          text: CENTER
        - value: right
          text: RIGHT
    trigger:
        - value: click
          text: CLICK
        - value: hover
          text: HOVER
    listIconSize:
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
        - value: xl
          text: XL
    listContainedIconSize:
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
        - value: xl
          text: XL
        - value: xxl
          text: XXL
    listContainedIconShape:
        - value: circle
          text: CIRCLE
        - value: square
          text: SQUARE
    listContainedStyleType:
        - value: flat
          text: FLAT
        - value: filled
          text: FILLED
    badgeColor:
        - value: neutral
          text: NEUTRAL
        - value: primary-brand
          text: PRIMARY_BRAND
        - value: secondary-brand
          text: SECONDARY_BRAND
        - value: success
          text: SUCCESS
        - value: warning
          text: WARNING
        - value: danger
          text: DANGER
        - value: info
          text: INFO
    badgeStyleType:
        - value: filled
          text: FILLED
        - value: soft
          text: SOFT
        - value: outlined
          text: OUTLINED
    badgeShape:
        - value: pill
          text: PILL
        - value: rounded
          text: ROUNDED
    filterGroupStyle:
        - value: grouped
          text: GROUPED
        - value: separated
          text: SEPARATED
emits:
    remove: "({ id }) => console.log('remove', id)"
    markAllAsRead: "() => console.log('markAllAsRead')"
    clearAll: "() => console.log('clearAll')"
slots:
    activator: ""
slotComponents:
    activator:
        srcDir: 'buttons/ActionButton.vue'
        props:
            text: "Show notifications"
enums:
    position: "Position"
    align: "Align"
    trigger: "Trigger"
    listIconSize: "IconSize"
    listContainedIconSize: "IconContainerSize"
    listContainedIconShape: "IconContainerShape"
    listContainedStyleType: "IconContainerStyleType"
    badgeColor: "ColorAccent"
    badgeStyleType: "BadgeStyle"
    badgeShape: "BadgeShape"
    filterGroupStyle: "ToggleButtonGroupStyle"
external:
  - list
externalTypes:
  - NotificationItem[]
propsSettingsExcludedProps: ['list']
---
::

## Props

::props-table
---
props: [
    {
        "name": "list",
        "default": "[]",
        "type": "NotificationItem[]",
    },
    {
        "name": "limit",
        "default": "10",
        "type": "number",
    },
    {
        "name": "title",
        "default": "'Notifications'",
        "type": "string",
    },
    {
        "name": "isLoading",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "loadingText",
        "default": "'Loading notifications'",
        "type": "string",
    },
    {
        "name": "errorText",
        "default": "''",
        "type": "string",
    },
    {
        "name": "listEmptyText",
        "default": "'No notifications available.'",
        "type": "string",
    },
    {
        "name": "listMaxHeightClass",
        "default": "'max-h-[400px]'",
        "type": "string",
    },
    {
        "name": "isListIconContained",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "listIconSize",
        "default": "IconSize.MD",
        "type": "IconSize",
    },
    {
        "name": "listContainedIconSize",
        "default": "IconContainerSize.SM",
        "type": "IconContainerSize",
    },
    {
        "name": "listContainedIconShape",
        "default": "IconContainerShape.CIRCLE",
        "type": "IconContainerShape",
    },
    {
        "name": "listContainedStyleType",
        "default": "IconContainerStyleType.FLAT",
        "type": "IconContainerStyleType",
    },
    {
        "name": "listTimeAgoIcon",
        "default": "'mdi:clock-time-four-outline'",
        "type": "string",
    },
    {
        "name": "listAuthorIcon",
        "default": "'mdi:account-outline'",
        "type": "string",
    },
    {
        "name": "listRemoveItemIcon",
        "default": "'mdi:close'",
        "type": "string",
    },
    {
        "name": "listRemoveItemAriaLabel",
        "default": "'Remove notification'",
        "type": "string",
    },
    {
        "name": "viewAllText",
        "default": "'View all'",
        "type": "string",
    },
    {
        "name": "viewAllLink",
        "default": "''",
        "type": "string",
    },
    {
        "name": "badgeColor",
        "default": "ColorAccent.SECONDARY_BRAND",
        "type": "ColorAccent",
    },
    {
        "name": "badgeStyleType",
        "default": "BadgeStyle.FILLED",
        "type": "BadgeStyle",
    },
    {
        "name": "badgeShape",
        "default": "BadgeShape.PILL",
        "type": "BadgeShape",
    },
    {
        "name": "buttonAllReadText",
        "default": "'Mark all as read'",
        "type": "string",
    },
    {
        "name": "buttonAllReadIcon",
        "default": "'mdi:check-all'",
        "type": "string",
    },
    {
        "name": "buttonClearAllText",
        "default": "'Clear all'",
        "type": "string",
    },
    {
        "name": "buttonClearAllIcon",
        "default": "'mdi:close-circle-outline'",
        "type": "string",
    },
    {
        "name": "filterAllButtonText",
        "default": "'All'",
        "type": "string",
    },
    {
        "name": "filterUnreadButtonText",
        "default": "'Unread'",
        "type": "string",
    },
    {
        "name": "filterGroupStyle",
        "default": "ToggleButtonGroupStyle.GROUPED",
        "type": "ToggleButtonGroupStyle",
    },
    {
        "name": "position",
        "default": "Position.BOTTOM",
        "type": "Position",
    },
    {
        "name": "align",
        "default": "Align.RIGHT",
        "type": "Align",
    },
    {
        "name": "trigger",
        "default": "Trigger.CLICK",
        "type": "Trigger",
    },
    {
        "name": "popoverClass",
        "default": "'min-w-[332px]'",
        "type": "string",
    },
]
---
::

## Slots
::slots-table
---
slots: [
    {
        name: "activator",
        description: "The element that triggers the popover. Typically an icon button or action button.",
    },
    {
        name: "list",
        description: "Overrides the default rendered list. When provided, NotificationListItem components are not rendered automatically.",
    },
]
---
::

```vue
<template>
    <NotificationsPopover :list="notifications">
        <template #list>
            <NotificationListItem
                v-for="item in notifications"
                :key="item.id"
                :title="item.title"
                :description="item.description"
                :timeAgo="item.timeAgo"
                :author="item.author"
            />
        </template>
        <template #activator>
            <ActionIconButton icon="mdi:bell-outline" />
        </template>
    </NotificationsPopover>
</template>
```

## Components
::components-table
---
components: [
    {
        name: "<NotificationsPopover>",
        description: "The main popover container. Manages the internal list state, filtering, and emits events for remove, mark-all-read, and clear-all.",
    },
    {
        name: "<NotificationListItem>",
        description: "Represents a single notification row. Handles click-to-read, item removal, and optional navigation via the to prop.",
    },
]
---
::

## Usage

### list

The array of notification items to display. Each item must conform to the `NotificationItem` interface: `id`, `read`, `title`, `description`, `timeAgo`, `author`, `link` (required), plus optional `icon` and `iconColor`.

```vue
<template>
    <NotificationsPopover :list="notifications">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>

<script setup lang="ts">
const notifications: NotificationItem[] = [
    {
        id: '1',
        read: false,
        title: 'New message',
        description: 'You have a new message from Alice.',
        timeAgo: '2 minutes ago',
        author: 'Alice',
        link: '/messages/1',
        icon: 'mdi:bell-outline',
        iconColor: ColorAccent.PRIMARY_BRAND,
    },
]
</script>
```

- **Type:** `NotificationItem[]`
- **Default:** `[]`

#### TypeScript interface
```ts
interface NotificationItem {
    id: string;
    read: boolean;
    title: string;
    description: string;
    timeAgo: string;
    author: string;
    link: string;
    icon?: string;
    iconColor?: ColorAccent;
}
```

### limit

Caps the number of notifications rendered in the list, applied after the read/unread filter. The unread count badge always reflects the full list, regardless of the limit.

```vue
<template>
    <NotificationsPopover :list="notifications" :limit="5">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `number`
- **Default:** `10`

### title

Sets the heading text displayed at the top of the popover.

```vue
<template>
    <NotificationsPopover title="Updates">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"Notifications"`

### isLoading

Shows a loading spinner and hides the list while notifications are being fetched.

```vue
<template>
    <NotificationsPopover :isLoading="true">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### loadingText

The label shown next to the loading spinner when `isLoading` is `true`.

```vue
<template>
    <NotificationsPopover :isLoading="true" loadingText="Fetching updates…">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"Loading notifications"`

### errorText

When non-empty, renders an error message and hides the list. Use this when the notification fetch fails.

```vue
<template>
    <NotificationsPopover errorText="Could not load notifications.">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `""`

### listEmptyText

The message displayed when the list has no items to show.

```vue
<template>
    <NotificationsPopover :list="[]" listEmptyText="You're all caught up!">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"No notifications available."`

### listMaxHeightClass

A Tailwind `max-h-*` utility class applied to the scrollable list container.

```vue
<template>
    <NotificationsPopover listMaxHeightClass="max-h-[600px]">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"max-h-[400px]"`

### isListIconContained

When `true`, each item's icon is wrapped in a `ContainedIcon`. When `false`, a plain `Icon` is rendered instead.

```vue
<template>
    <NotificationsPopover :isListIconContained="false">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### listIconSize

Size of the plain icon rendered when `isListIconContained` is `false`. Uses the `IconSize` enum.

```vue
<template>
    <NotificationsPopover :isListIconContained="false" :listIconSize="IconSize.LG">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `IconSize`
- **Default:** `IconSize.MD`

#### Options

::options-table
---
options: [
    { value: "XS", description: "Extra small icon." },
    { value: "SM", description: "Small icon." },
    { value: "MD", description: "Medium icon." },
    { value: "LG", description: "Large icon." },
    { value: "XL", description: "Extra large icon." },
]
---
::

### listContainedIconSize

Size of the `ContainedIcon` container per list item when `isListIconContained` is `true`. Uses the `IconContainerSize` enum.

```vue
<template>
    <NotificationsPopover :listContainedIconSize="IconContainerSize.MD">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `IconContainerSize`
- **Default:** `IconContainerSize.SM`

#### Options

::options-table
---
options: [
    { value: "SM", description: "24 × 24 px container." },
    { value: "MD", description: "32 × 32 px container." },
    { value: "LG", description: "40 × 40 px container." },
    { value: "XL", description: "48 × 48 px container." },
    { value: "XXL", description: "56 × 56 px container." },
]
---
::

### listContainedIconShape

Shape of the `ContainedIcon` container per list item. Uses the `IconContainerShape` enum.

```vue
<template>
    <NotificationsPopover :listContainedIconShape="IconContainerShape.SQUARE">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `IconContainerShape`
- **Default:** `IconContainerShape.CIRCLE`

#### Options

::options-table
---
options: [
    { value: "CIRCLE", description: "Fully rounded container." },
    { value: "SQUARE", description: "Rounded-corner square container." },
]
---
::

### listContainedStyleType

Visual style of the `ContainedIcon` container per list item. Uses the `IconContainerStyleType` enum.

```vue
<template>
    <NotificationsPopover :listContainedStyleType="IconContainerStyleType.FILLED">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `IconContainerStyleType`
- **Default:** `IconContainerStyleType.FLAT`

#### Options

::options-table
---
options: [
    { value: "FLAT", description: "Subtle background tinted to match the icon colour." },
    { value: "FILLED", description: "Bold filled background with an on-filled icon colour." },
]
---
::

### listTimeAgoIcon

Icon name rendered before the time-ago label on each list item.

```vue
<template>
    <NotificationsPopover listTimeAgoIcon="mdi:timer-outline">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"mdi:clock-time-four-outline"`

### listAuthorIcon

Icon name rendered before the author name on each list item.

```vue
<template>
    <NotificationsPopover listAuthorIcon="mdi:account-circle-outline">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"mdi:account-outline"`

### listRemoveItemIcon

Icon used for the remove button on each list item.

```vue
<template>
    <NotificationsPopover listRemoveItemIcon="mdi:trash-can-outline">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"mdi:close"`

### listRemoveItemAriaLabel

Accessible label for the remove button on each list item.

```vue
<template>
    <NotificationsPopover listRemoveItemAriaLabel="Dismiss notification">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"Remove notification"`

### viewAllText

Label of the "view all" link displayed in the header.

```vue
<template>
    <NotificationsPopover viewAllText="See all updates" viewAllLink="/notifications">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"View all"`

### viewAllLink

Route passed to the "view all" link in the header. When empty the link is not rendered.

```vue
<template>
    <NotificationsPopover viewAllLink="/notifications">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `""`

### badgeColor

Colour of the unread-count badge displayed next to the title. Uses the `ColorAccent` enum.

```vue
<template>
    <NotificationsPopover :badgeColor="ColorAccent.DANGER">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.SECONDARY_BRAND`

#### Options

::options-table
---
options: [
    { value: "NEUTRAL", description: "Neutral grey badge." },
    { value: "PRIMARY_BRAND", description: "Primary brand colour badge." },
    { value: "SECONDARY_BRAND", description: "Secondary brand colour badge." },
    { value: "SUCCESS", description: "Green success badge." },
    { value: "WARNING", description: "Yellow warning badge." },
    { value: "DANGER", description: "Red danger badge." },
    { value: "INFO", description: "Blue info badge." },
]
---
::

### badgeStyleType

Visual style of the unread-count badge. Uses the `BadgeStyle` enum.

```vue
<template>
    <NotificationsPopover :badgeStyleType="BadgeStyle.SOFT">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `BadgeStyle`
- **Default:** `BadgeStyle.FILLED`

#### Options

::options-table
---
options: [
    { value: "FILLED", description: "Solid background badge." },
    { value: "SOFT", description: "Tinted soft background badge." },
    { value: "OUTLINED", description: "Transparent badge with a border." },
]
---
::

### badgeShape

Shape of the unread-count badge. Uses the `BadgeShape` enum.

```vue
<template>
    <NotificationsPopover :badgeShape="BadgeShape.ROUNDED">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `BadgeShape`
- **Default:** `BadgeShape.PILL`

#### Options

::options-table
---
options: [
    { value: "PILL", description: "Fully rounded pill shape." },
    { value: "ROUNDED", description: "Rounded-corner rectangle." },
]
---
::

### buttonAllReadText

Label of the "mark all as read" footer button.

```vue
<template>
    <NotificationsPopover buttonAllReadText="Read all">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"Mark all as read"`

### buttonAllReadIcon

Icon for the "mark all as read" footer button.

```vue
<template>
    <NotificationsPopover buttonAllReadIcon="mdi:check">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"mdi:check-all"`

### buttonClearAllText

Label of the "clear all" footer button.

```vue
<template>
    <NotificationsPopover buttonClearAllText="Remove all">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"Clear all"`

### buttonClearAllIcon

Icon for the "clear all" footer button.

```vue
<template>
    <NotificationsPopover buttonClearAllIcon="mdi:trash-can-outline">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"mdi:close-circle-outline"`

### filterAllButtonText

Label of the toggle button that shows all notifications.

```vue
<template>
    <NotificationsPopover filterAllButtonText="All items">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"All"`

### filterUnreadButtonText

Label of the toggle button that shows only unread notifications.

```vue
<template>
    <NotificationsPopover filterUnreadButtonText="New">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"Unread"`

### filterGroupStyle

Visual style of the filter toggle buttons group. Uses the `ToggleButtonGroupStyle` enum.

```vue
<template>
    <NotificationsPopover :filterGroupStyle="ToggleButtonGroupStyle.SEPARATED">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `ToggleButtonGroupStyle`
- **Default:** `ToggleButtonGroupStyle.GROUPED`

#### Options

::options-table
---
options: [
    { value: "GROUPED", description: "Buttons share a single joined container." },
    { value: "SEPARATED", description: "Buttons are rendered individually with gaps." },
]
---
::

### position

Determines the vertical position of the popover relative to the activator. Uses the `Position` enum.

```vue
<template>
    <NotificationsPopover :position="Position.TOP">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

#### Options

::options-table
---
options: [
    { value: "TOP", description: "The popover appears above the activator." },
    { value: "BOTTOM", description: "The popover appears below the activator." },
]
---
::

### align

Sets the horizontal alignment of the popover relative to the activator. Uses the `Align` enum.

```vue
<template>
    <NotificationsPopover :align="Align.LEFT">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `Align`
- **Default:** `Align.RIGHT`

#### Options

::options-table
---
options: [
    { value: "LEFT", description: "The popover aligns to the left edge of the activator." },
    { value: "CENTER", description: "The popover centers relative to the activator." },
    { value: "RIGHT", description: "The popover aligns to the right edge of the activator." },
]
---
::

### trigger

Configures how the popover is opened. Uses the `Trigger` enum.

```vue
<template>
    <NotificationsPopover :trigger="Trigger.HOVER">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `Trigger`
- **Default:** `Trigger.CLICK`

#### Options

::options-table
---
options: [
    { value: "CLICK", description: "The popover opens on activator click." },
    { value: "HOVER", description: "The popover opens on activator hover." },
]
---
::

### popoverClass

Overrides the popover panel's CSS class. Use it to set a custom minimum width or other layout styles.

```vue
<template>
    <NotificationsPopover popoverClass="min-w-[420px]">
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>
```

- **Type:** `string`
- **Default:** `"min-w-[332px]"`

## NotificationListItem

`<NotificationListItem>` represents a single row in the notifications list. It supports an optional icon, navigation link, read/unread state, and a remove action.

::component-code
---
srcDir: 'notifications/NotificationListItem.vue'
props:
    modelValue: false
    icon: "mdi:bell-outline"
    iconColor: "secondary-brand"
    iconSize: "md"
    isIconContained: true
    containedStyleType: "flat"
    containedIconShape: "circle"
    containedIconSize: "xl"
    to: ""
    title: "Notification title"
    description: "This is a notification description."
    timeAgo: "5 minutes ago"
    timeAgoIcon: "mdi:clock-time-four-outline"
    author: "John Doe"
    authorIcon: "mdi:account-outline"
    removeItemIcon: "mdi:close"
    removeAriaLabel: "Remove notification"
items:
    iconColor:
        - value: neutral
          text: NEUTRAL
        - value: primary-brand
          text: PRIMARY_BRAND
        - value: secondary-brand
          text: SECONDARY_BRAND
        - value: success
          text: SUCCESS
        - value: warning
          text: WARNING
        - value: danger
          text: DANGER
        - value: info
          text: INFO
    iconSize:
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
        - value: xl
          text: XL
    containedStyleType:
        - value: flat
          text: FLAT
        - value: filled
          text: FILLED
    containedIconShape:
        - value: circle
          text: CIRCLE
        - value: square
          text: SQUARE
    containedIconSize:
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
        - value: xl
          text: XL
        - value: xxl
          text: XXL
emits:
    remove: "() => console.log('remove')"
    update:modelValue: "(value) => console.log('update:modelValue', value)"
enums:
    iconColor: "ColorAccent"
    iconSize: "IconSize"
    containedStyleType: "IconContainerStyleType"
    containedIconShape: "IconContainerShape"
    containedIconSize: "IconContainerSize"
previewBackground: 'white'
---
::

### Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "default": "false",
        "type": "boolean",
        "description": "The read status of the notification. Use v-model to keep the parent in sync.",
    },
    {
        "name": "icon",
        "type": "string",
    },
    {
        "name": "iconColor",
        "default": "ColorAccent.NEUTRAL",
        "type": "ColorAccent",
    },
    {
        "name": "iconSize",
        "default": "IconSize.MD",
        "type": "IconSize",
    },
    {
        "name": "isIconContained",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "containedStyleType",
        "default": "IconContainerStyleType.FLAT",
        "type": "IconContainerStyleType",
    },
    {
        "name": "containedIconShape",
        "default": "IconContainerShape.CIRCLE",
        "type": "IconContainerShape",
    },
    {
        "name": "containedIconSize",
        "default": "IconContainerSize.XL",
        "type": "IconContainerSize",
    },
    {
        "name": "to",
        "type": "string",
    },
    {
        "name": "title",
        "default": "'Title'",
        "type": "string",
    },
    {
        "name": "description",
        "default": "'Description'",
        "type": "string",
    },
    {
        "name": "timeAgo",
        "default": "'Time ago'",
        "type": "string",
    },
    {
        "name": "timeAgoIcon",
        "default": "'mdi:clock-time-four-outline'",
        "type": "string",
    },
    {
        "name": "author",
        "default": "'Author'",
        "type": "string",
    },
    {
        "name": "authorIcon",
        "default": "'mdi:account-outline'",
        "type": "string",
    },
    {
        "name": "removeItemIcon",
        "default": "'mdi:close'",
        "type": "string",
    },
    {
        "name": "removeAriaLabel",
        "default": "'Remove notification'",
        "type": "string",
    },
]
---
::

### modelValue

Controls the read state of the notification. Bind with `v-model` to keep the parent in sync. The item automatically emits `update:modelValue` with `true` when clicked.

```vue
<template>
    <NotificationListItem
        v-model="notification.read"
        title="New message"
        description="You have a new message."
        timeAgo="2 minutes ago"
        author="Alice"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### icon

Icon name rendered on the left of the list item. When paired with `isIconContained`, it is displayed inside a `ContainedIcon`.

```vue
<template>
    <NotificationListItem
        icon="mdi:bell-outline"
        :iconColor="ColorAccent.PRIMARY_BRAND"
        title="New message"
        description="You have a new message."
        timeAgo="2 minutes ago"
        author="Alice"
    />
</template>
```

- **Type:** `string`

### iconColor

Colour applied to the icon or its container. Uses the `ColorAccent` enum.

```vue
<template>
    <NotificationListItem
        icon="mdi:bell-outline"
        :iconColor="ColorAccent.DANGER"
        title="Alert"
        description="Something needs your attention."
        timeAgo="1 minute ago"
        author="System"
    />
</template>
```

- **Type:** `ColorAccent`
- **Default:** `ColorAccent.NEUTRAL`

#### Options

::options-table
---
options: [
    { value: "NEUTRAL", description: "Neutral grey." },
    { value: "PRIMARY_BRAND", description: "Primary brand colour." },
    { value: "SECONDARY_BRAND", description: "Secondary brand colour." },
    { value: "SUCCESS", description: "Green success colour." },
    { value: "WARNING", description: "Yellow warning colour." },
    { value: "DANGER", description: "Red danger colour." },
    { value: "INFO", description: "Blue info colour." },
]
---
::

### iconSize

Size of the plain icon when `isIconContained` is `false`. Uses the `IconSize` enum.

```vue
<template>
    <NotificationListItem
        icon="mdi:bell-outline"
        :isIconContained="false"
        :iconSize="IconSize.LG"
        title="New message"
        description="You have a new message."
        timeAgo="2 minutes ago"
        author="Alice"
    />
</template>
```

- **Type:** `IconSize`
- **Default:** `IconSize.MD`

#### Options

::options-table
---
options: [
    { value: "XS", description: "Extra small icon." },
    { value: "SM", description: "Small icon." },
    { value: "MD", description: "Medium icon." },
    { value: "LG", description: "Large icon." },
    { value: "XL", description: "Extra large icon." },
]
---
::

### isIconContained

When `true`, the icon is wrapped inside a `ContainedIcon` component. When `false`, a plain `Icon` is rendered.

```vue
<template>
    <NotificationListItem
        icon="mdi:bell-outline"
        :isIconContained="false"
        title="New message"
        description="You have a new message."
        timeAgo="2 minutes ago"
        author="Alice"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### containedStyleType

Visual style of the `ContainedIcon` container. Uses the `IconContainerStyleType` enum.

```vue
<template>
    <NotificationListItem
        icon="mdi:bell-outline"
        :containedStyleType="IconContainerStyleType.FILLED"
        title="New message"
        description="You have a new message."
        timeAgo="2 minutes ago"
        author="Alice"
    />
</template>
```

- **Type:** `IconContainerStyleType`
- **Default:** `IconContainerStyleType.FLAT`

#### Options

::options-table
---
options: [
    { value: "FLAT", description: "Subtle tinted background matching the icon colour." },
    { value: "FILLED", description: "Bold filled background with an on-filled icon colour." },
]
---
::

### containedIconShape

Shape of the `ContainedIcon` container. Uses the `IconContainerShape` enum.

```vue
<template>
    <NotificationListItem
        icon="mdi:bell-outline"
        :containedIconShape="IconContainerShape.SQUARE"
        title="New message"
        description="You have a new message."
        timeAgo="2 minutes ago"
        author="Alice"
    />
</template>
```

- **Type:** `IconContainerShape`
- **Default:** `IconContainerShape.CIRCLE`

#### Options

::options-table
---
options: [
    { value: "CIRCLE", description: "Fully rounded container." },
    { value: "SQUARE", description: "Rounded-corner square container." },
]
---
::

### containedIconSize

Size of the `ContainedIcon` container. Uses the `IconContainerSize` enum.

```vue
<template>
    <NotificationListItem
        icon="mdi:bell-outline"
        :containedIconSize="IconContainerSize.MD"
        title="New message"
        description="You have a new message."
        timeAgo="2 minutes ago"
        author="Alice"
    />
</template>
```

- **Type:** `IconContainerSize`
- **Default:** `IconContainerSize.XL`

#### Options

::options-table
---
options: [
    { value: "SM", description: "24 × 24 px container." },
    { value: "MD", description: "32 × 32 px container." },
    { value: "LG", description: "40 × 40 px container." },
    { value: "XL", description: "48 × 48 px container." },
    { value: "XXL", description: "56 × 56 px container." },
]
---
::

### to

Navigation route for the item. When provided, clicking the content area navigates to this path.

```vue
<template>
    <NotificationListItem
        to="/messages/1"
        title="New message"
        description="You have a new message."
        timeAgo="2 minutes ago"
        author="Alice"
    />
</template>
```

- **Type:** `string`

### title

The main heading text of the notification.

```vue
<template>
    <NotificationListItem
        title="Deployment complete"
        description="Your application was deployed successfully."
        timeAgo="3 minutes ago"
        author="CI System"
    />
</template>
```

- **Type:** `string`
- **Default:** `"Title"`

### description

The body text of the notification.

```vue
<template>
    <NotificationListItem
        title="New comment"
        description="Bob left a comment on your post."
        timeAgo="10 minutes ago"
        author="Bob"
    />
</template>
```

- **Type:** `string`
- **Default:** `"Description"`

### timeAgo

The relative time string displayed below the description.

```vue
<template>
    <NotificationListItem
        title="New message"
        description="You have a new message."
        timeAgo="just now"
        author="Alice"
    />
</template>
```

- **Type:** `string`
- **Default:** `"Time ago"`

### timeAgoIcon

Icon name rendered before the time-ago string.

```vue
<template>
    <NotificationListItem
        title="New message"
        description="You have a new message."
        timeAgo="2 minutes ago"
        author="Alice"
        timeAgoIcon="mdi:timer-outline"
    />
</template>
```

- **Type:** `string`
- **Default:** `"mdi:clock-time-four-outline"`

### author

The name of the notification's author, displayed below the description.

```vue
<template>
    <NotificationListItem
        title="New message"
        description="You have a new message."
        timeAgo="2 minutes ago"
        author="Alice Smith"
    />
</template>
```

- **Type:** `string`
- **Default:** `"Author"`

### authorIcon

Icon name rendered before the author name.

```vue
<template>
    <NotificationListItem
        title="New message"
        description="You have a new message."
        timeAgo="2 minutes ago"
        author="Alice"
        authorIcon="mdi:account-circle-outline"
    />
</template>
```

- **Type:** `string`
- **Default:** `"mdi:account-outline"`

### removeItemIcon

Icon for the remove button.

```vue
<template>
    <NotificationListItem
        title="New message"
        description="You have a new message."
        timeAgo="2 minutes ago"
        author="Alice"
        removeItemIcon="mdi:trash-can-outline"
    />
</template>
```

- **Type:** `string`
- **Default:** `"mdi:close"`

### removeAriaLabel

Accessible label for the remove button.

```vue
<template>
    <NotificationListItem
        title="New message"
        description="You have a new message."
        timeAgo="2 minutes ago"
        author="Alice"
        removeAriaLabel="Dismiss this notification"
    />
</template>
```

- **Type:** `string`
- **Default:** `"Remove notification"`

### Slots

::slots-table
---
slots: [
    {
        name: "content",
        description: "Replaces the entire content area (icon excluded). Use this for fully custom layouts.",
    },
    {
        name: "description",
        description: "Replaces only the description paragraph while keeping the title, timeAgo and author rows.",
    },
]
---
::

```vue
<template>
    <NotificationListItem
        title="New message"
        timeAgo="2 minutes ago"
        author="Alice"
    >
        <template #description>
            <p class="text-sm text-text-default">
                Bob left a <strong>comment</strong> on your post.
            </p>
        </template>
    </NotificationListItem>
</template>
```

### Emits

::options-table
---
options: [
    {
        value: "update:modelValue",
        description: "Emitted with true when an unread item is clicked. Use with v-model to keep read state in sync.",
    },
    {
        value: "remove",
        description: "Emitted when the remove button is clicked. Clicking remove does not trigger update:modelValue.",
    },
]
---
::

## Emits

::options-table
---
options: [
    {
        value: "remove",
        description: "Emitted when a list item's close button is clicked. Payload: { id: string }.",
    },
    {
        value: "markAllAsRead",
        description: "Emitted when the 'Mark all as read' footer button is clicked.",
    },
    {
        value: "clearAll",
        description: "Emitted when the 'Clear all' footer button is clicked.",
    },
]
---
::

#### Example

```vue
<template>
    <NotificationsPopover
        :list="notifications"
        @remove="onRemove"
        @mark-all-as-read="onMarkAllAsRead"
        @clear-all="onClearAll"
    >
        <template #activator>
            <ActionButton text="Show notifications" />
        </template>
    </NotificationsPopover>
</template>

<script setup lang="ts">
const onRemove = ({ id }: { id: string }) => {
    // Remove the notification with the given id from your data source
}

const onMarkAllAsRead = () => {
    // Sync all-read state to your data source
}

const onClearAll = () => {
    // Clear all notifications in your data source
}
</script>
```
