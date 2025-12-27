## Component

::component-code
---
srcDir: 'dropdowns/DropdownMenu.vue'
props: 
    hasShadow: true
    hasBorder: true
    position: 'bottom-right'
    positionXOffset: 0
    positionYOffset: 8
    positionClass: ''
    isRelative: true
    class: "min-w-[200px]"
items:
    position:
        - value: top-left
          text: TOP_LEFT
        - value: top-right
          text: TOP_RIGHT
        - value: bottom-left
          text: BOTTOM_LEFT
        - value: bottom-right
          text: BOTTOM_RIGHT
        - value: left-top
          text: LEFT_TOP
        - value: left-bottom
          text: LEFT_BOTTOM
        - value: right-top
          text: RIGHT_TOP
        - value: right-bottom
          text: RIGHT_BOTTOM
slots:
    items: ""
    activator: ""
slotComponents:
    items:
        multiple: true
        srcDir: 'dropdowns/DropdownMenuItem.vue'
        props:
            - text: "Item 1"
            - text: "Item 2"
            - text: "Item 3"
    activator:
        srcDir: 'buttons/ActionButton.vue'
        props:
            text: "Open dropdown"
            styleType: "neutral-filled"
        slotProps:
            onClick: "@click"
external:
    - items
externalTypes:
    - DropdownMenuItem[]
---
::

## Props

::props-table
---
props: [
    {
        "name": "items",
        "type": "DropdownMenuItem[]",
    },
    {
        "name": "hasShadow",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "hasBorder",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "position",
        "default": "bottom-right",
        "type": "DropdownPosition",
    },
    {
        "name": "positionXOffset",
        "default": "0",
        "type": "number",
    },
    {
        "name": "positionYOffset",
        "default": "8",
        "type": "number",
    },
    {
        "name": "positionClass",
        "default": "'absolute right-0 mt-2 top-full'",
        "type": "string",
    },
    {
        "name": "isRelative",
        "default": "true",
        "type": "boolean",
    },

]
---
::

## Slots
::slots-table
---
slots: [
    {
        name: "items",
        description: "Slot to insert the '<DropdownMenuItem />' components",
    },
    {
        name: "activator",
        description: "Slot to insert in activator item (eg. ActionButton)",
    },
]
---
::

```vue
<template>
    <DropdownMenu
        class="min-w-[200px]"
    >
        <template #items>
            <DropdownMenuItem
                v-for="(item, index) in items"
                :key="index"
                v-bind="item"
            />
        </template>
        <template #activator="{ onClick }">
            <ActionButton
                text="Open dropdown"
                styleType="neutral-filled"
                @click="onClick"
            />
        </template>
    </DropdownMenu>
</template>

<script setup lang="ts">
const items = ref<DropdownMenuItem[]>([
    {
        text: "Item 1",
    },
    {
        text: "Item 2",
    },
    {
        text: "Item 3",
    },
])
</script>
```

## Components
::components-table
---
components: [
    {
        name: "<DropdownMenu>",
        description: "The main container that wraps all DropdownMenuItem components",
    },
    {
        name: "<DropdownMenuItem>",
        description: "Represents the single menu item.",
    },
    {
        name: "<DropdownMenuActions>",
        description: "Acts as a container for all DropdownMenuActions components. It is not included by default within the DropdownMenu component and must be manually injected when customizing the dropdown's structure.",
    },
]
---
::

## Usage
### items
Sets the items that will be displayed in the dropdown menu. It is an alternative to using the slot `<template #items>`.

It can be used while not using the `<template #items>` slot.

```vue
<template>
    <DropdownMenu
        :items="exampleItems"
        class="min-w-[200px]"
    >
        <template #activator="{ onClick }">
            <ActionButton
                text="Open dropdown"
                styleType="neutral-filled"
                @click="onClick"
            />
        </template>
    </DropdownMenu>
</template>

<script setup lang="ts">
const exampleItems = ref<DropdownMenuItem[]>([
    {
        text: "Item 1",
    },
    {
        text: "Item 2",
    },
    {
        text: "Item 3",
    },
])
</script>
```

#### TypeScript interface
```ts
interface DropdownMenuItem {
    actionType?: DropdownActionType
    text?: string
    icon?: any
    size?: DropdownItemSize
    type?: DropdownItemType
    userDisplayName?: string
    userProfileImg?: string
    imgUrl?: string
    alt?: string
    helpText?: string
    to?: string
    isExternal?: boolean
    exportData?: Record<string, any>[]
    exportFields?: Record<string, any>
    exportType?: string
    exportFileName?: string
    hasSeparator?: boolean
    callback?: () => void
}
```

### hasShadow
Activates a dropdown shadow on the menu.

```vue
<template>
    <DropdownMenu
        hasShadow
    >
        ....
    </DropdownMenu>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### hasBorder
Activates a border on the menu.

```vue
<template>
    <DropdownMenu
        hasBorder
    >
        ....
    </DropdownMenu>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### position
Sets the position of the dropdown menu relative to its activator. Uses the `DropdownPosition` enum.

::content-alert
---
props:
    title: "Important"
    description: "Do not forget to adjust the X and Y offsets to achieve the desired positioning. It is particularly useful to set a gap between the dropdown menu and the activator."
---
::

```vue
<template>
    <DropdownMenu
        :position="DropdownPosition.BOTTOM_RIGHT"
    >
        ....
    </DropdownMenu>
</template>
```

- **Type:** `DropdownPosition`
- **Default:** `DropdownPosition.BOTTOM_RIGHT`

#### Options

::options-table
---
options: [
    {
        value: "TOP_LEFT",
        description: "Aligns the menu above and to the left of the activator.",
    },
    {
        value: "TOP_RIGHT",
        description: "Aligns the menu above and to the right of the activator.",
    },
    {
        value: "BOTTOM_LEFT",
        description: "Places the menu below and left-aligned with the activator.",
    },
    {
        value: "BOTTOM_RIGHT",
        description: "Places the menu below and right-aligned with the activator.",
    },
    {
        value: "LEFT_TOP",
        description: "Displays the menu to the left of the activator, aligned to its top edge.",
    },
    {
        value: "LEFT_BOTTOM",
        description: "Displays the menu to the left of the activator, aligned to its bottom edge.",
    },
    {
        value: "RIGHT_TOP",
        description: "Displays the menu to the right of the activator, aligned to its top edge.",
    },
    {
        value: "RIGHT_BOTTOM",
        description: "Displays the menu to the right of the activator, aligned to its bottom edge.",
    }

]
---
::

### positionXOffset
Sets the horizontal offset of the dropdown menu relative to its activator. Positive values move the menu to the right, while negative values move it to the left.

```vue
<template>
    <DropdownMenu
        positionXOffset="10"
    >
        ....
    </DropdownMenu>
</template>
```

- **Type:** `number | string`
- **Default:** `0`

### positionYOffset
Sets the vertical offset of the dropdown menu relative to its activator. Positive values move the menu down, while negative values move it up.

```vue
<template>
    <DropdownMenu
        positionYOffset="10"
    >
        ....
    </DropdownMenu>
</template>
```

- **Type:** `number | string`
- **Default:** `8`

### positionClass
Applies Tailwind classes to control the dropdown menu's placement relative to its activator. Useful for fine-tuning alignment, spacing, or offset beyond default positioning.

::content-alert
---
props:
    title: "Important"
    description: "When applying positionClass, position offsets and default positions will be ignored."
---
::

```vue
<template>
    <DropdownMenu
        positionClass="absolute right-0 mt-2 top-full"
    >
        ....
    </DropdownMenu>
</template>
```

- **Type:** `string`

### isRelative
Sets the dropdown menu wrapper as the relative element. In case relative is `false`, the dropdown menu will be positioned absolutely or will try to find the next parent relative element.

```vue
<template>
    <DropdownMenu
        isRelative
    >
        ....
    </DropdownMenu>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

## DropdownMenuItem
`<DropdownMenuItem>` represents an individual item within the dropdown menu. It supports multiple visual and functional types—such as text, icons, user profiles, and images—making it flexible for various use cases like navigation, actions, or exporting data.

::component-code
---
srcDir: 'dropdowns/DropdownMenuItem.vue'
props: 
    actionType: "link"
    text: "Menu item text"
    icon: "mdiHelp"
    size: "md"
    type: "text"
    userDisplayName: "Test user"
    userProfileImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    imgUrl: "https://www.wheeliebinstorage.co.uk/wp-content/uploads/2025/01/Small-Space-Garden-Ideas.jpg"
    alt: "Menu item image"
    helpText: ""
    to: null
    isExternal: false
    hasSeparator: false
    class: "bg-background-neutral-default shadow-sm"
items:
    size:
        - value: lg
          text: LG
        - value: md
          text: MD
    type:
        - value: text
          text: TEXT
        - value: icon
          text: ICON
        - value: danger-icon
          text: DANGER_ICON
        - value: user
          text: USER
        - value: image
          text: IMAGE
    actionType:
        - value: action
          text: ACTION
        - value: link
          text: LINK
        - value: export-excel
          text: EXPORT_EXCEL
propsSettingsExcludedProps: ['class']
---
::

### Props

::props-table
---
props: [
    {
        "name": "actionType",
        "default": "LINK",
        "type": "DropdownActionType",
    },
    {
        "name": "text",
        "default": "Menu item text",
        "type": "string",
    },
    {
        "name": "icon",
        "default": "mdiHelp",
        "type": "any",
    },
    {
        "name": "size",
        "default": "MD",
        "type": "DropdownItemSize",
    },
    {
        "name": "type",
        "default": "TEXT",
        "type": "DropdownItemType",
    },
    {
        "name": "userDisplayName",
        "default": "Test user",
        "type": "string",
    },
    {
        "name": "userProfileImg",
        "type": "string",
    },
    {
        "name": "imgUrl",
        "type": "string",
    },
    {
        "name": "alt",
        "default": "Menu item image",
        "type": "string",
    },
    {
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "to",
        "default": "/",
        "type": "string",
    },
    {
        "name": "isExternal",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "exportData",
        "default": [],
        "type": "Record<string, any>[]",
    },
    {
        "name": "exportFields",
        "default": {},
        "type": "Record<string, any>",
    },
    {
        "name": "exportType",
        "default": "xls",
        "type": "string",
    },
    {
        "name": "exportFileName",
        "default": "exported-data",
        "type": "string",
    },
    {
        "name": "hasSeparator",
        "default": "false",
        "type": "boolean",
    },
]
---
::

### actionType
Sets the action type for the menu item. Uses the `DropdownActionType` enum.

```vue
<template>
    <DropdownMenuItem
        actionType="action"
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `DropdownActionType`
- **Default:** `'LINK'`

### text
Sets the text content of the menu item.

```vue
<template>
    <DropdownMenuItem
        text="Menu item text"
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `string`
- **Default:** `'Menu item text'`

### icon
Sets the icon to be displayed in the menu item.

```vue
<template>
    <DropdownMenuItem
        icon="mdiHelp"
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `any`
- **Default:** `'mdiHelp'`

### size
Sets the size of the menu item. Uses the `DropdownItemSize` enum.

```vue
<template>
    <DropdownMenuItem
        size="DropdownItemSize.LG"
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `DropdownItemSize`
- **Default:** `'MD'`

### type
Sets the type of the menu item. Uses the `DropdownItemType` enum.

```vue
<template>
    <DropdownMenuItem
        type="DropdownItemType.TEXT"
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `DropdownItemType`
- **Default:** `'TEXT'`

### userDisplayName
Sets the userDisplayName of the user profile.

```vue
<template>
    <DropdownMenuItem
        userDisplayName="Test user"
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `string`
- **Default:** `'Test user'`


### userProfileImg
Sets the URL of the user profile image.

```vue
<template>
    <DropdownMenuItem
        userProfileImg="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `string`

### imgUrl
Sets the URL of the image.

```vue
<template>
    <DropdownMenuItem
        imgUrl="https://www.wheeliebinstorage.co.uk/wp-content/uploads/2025/01/Small-Space-Garden-Ideas.jpg"
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `string`

### alt
Sets the alternative text for the image.

```vue
<template>
    <DropdownMenuItem
        alt="Menu item image"
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `string`
- **Default:** `'Menu item image'`

### helpText
Sets the help text for the menu item.

```vue
<template>
    <DropdownMenuItem
        helpText="Help text"
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `string`

### to
Sets the target URL for the menu item.

```vue
<template>
    <DropdownMenuItem
        to="/"
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `string`
- **Default:** `'/'`

### isExternal
Sets whether the menu item is external or not.

```vue
<template>
    <DropdownMenuItem
        isExternal
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### exportData
Sets the export data for the menu item. 

```vue
<template>
    <DropdownMenuItem
        exportData=[
            { name: 'Name', value: 'John Doe' },
            { name: 'Email', value: 'john.doe@example.com' },
        ]
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `Record<string, any>[]`
- **Default:** `[]`

### exportFields
Sets the export fields for the menu item. 

```vue
<template>
    <DropdownMenuItem
        exportFields={{
            name: 'Name',
            email: 'Email',
        }}
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `Record<string, any>`
- **Default:** `{}`

### exportType
Sets the export type for the menu item.

```vue
<template>
    <DropdownMenuItem
        exportType="xls"
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `string`
- **Default:** `'xls'`

### exportFileName
Sets the export file name for the menu item.

```vue
<template>
    <DropdownMenuItem
        exportFileName="exported-data"
    >
        ....
    </DropdownMenuItem>
</template>
```

- **Type:** `string`
- **Default:** `'exported-data'`

## Menu Item Export Props

The export-related props on `DropdownMenuItem` utilize the [`vue-json-excel3`](https://vue-json-excel3.netlify.app/){ target="_blank" } library to enable exporting data to Excel (`.xls`) format. 
This allows you to provide export functionality directly within a dropdown menu item.

For full configuration details and advanced usage, refer to the [official vue-json-excel3 documentation](https://vue-json-excel3.netlify.app/){ target="_blank" }.


