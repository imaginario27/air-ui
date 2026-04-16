## Component

::component-code
---
srcDir: 'dropdowns/ContextMenu.vue'
props:
    items:
        - text: "Open"
          icon: "mdi:file-document-outline"
          kbd:
              - "Ctrl"
              - "O"
        - text: "Rename"
          icon: "mdi:pencil-outline"
          kbd: "F2"
        - divider: true
        - text: "Move to"
          icon: "mdi:folder-outline"
          children:
              - text: "Archive"
              - text: "Shared"
              - divider: true
              - text: "Favorites"
                kbd:
                    - "Ctrl"
                    - "Shift"
                    - "M"
        - text: "Delete"
          type: "danger-icon"
          icon: "mdi:delete-outline"
          kbd: "Del"
    hasShadow: true
    hasBorder: true
    width: 240
    disabled: false
    prefetchOn: 'visibility'
    positionXOffset: 0
    positionYOffset: 0
    shouldTeleport: true
    nestedMenuGap: 8
    zIndex: '50'
slots:
    default: ''
slotComponents:
    default:
        srcDir: 'placeholders/ContentPlaceholder.vue'
        props:
            text: 'Right click here'
external:
    - items
externalTypes:
    - ContextMenuItem[]
enums:
    prefetchOn: 'PrefetchOn'
propsSettingsExcludedProps: ['items']
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "items",
        "type": "ContextMenuItem[]",
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
        "name": "width",
        "default": "240",
        "type": "number",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "prefetchOn",
        "default": "PrefetchOn.VISIBILITY",
        "type": "PrefetchOnStrategy",
    },
    {
        "name": "positionXOffset",
        "default": "0",
        "type": "number",
    },
    {
        "name": "positionYOffset",
        "default": "0",
        "type": "number",
    },
    {
        "name": "shouldTeleport",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "nestedMenuGap",
        "default": "8",
        "type": "number",
    },
    {
        "name": "zIndex",
        "default": "'50'",
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
        name: 'default',
        description: 'Target content that will open the menu on right click.',
    },
    {
        name: 'items',
        description: 'Optional custom content using compact DropdownMenuContextItem entries.',
    },
]
---
::

## Usage
### items

Sets the contextual items rendered by the menu. Divider entries render a separator, while `kbd` renders one or more keyboard keycaps.

```vue
<template>
    <ContextMenu
        :items="items"
        :width="240"
    >
        <ContentPlaceholder text="Right click here" />
    </ContextMenu>
</template>

<script setup lang="ts">
const items = ref<ContextMenuItem[]>([
    {
        text: 'Open',
        icon: 'mdi:file-document-outline',
        kbd: ['Ctrl', 'O'],
    },
    {
        text: 'Rename',
        icon: 'mdi:pencil-outline',
        kbd: 'F2',
    },
    {
        divider: true,
    },
    {
        text: 'Move to',
        icon: 'mdi:folder-outline',
        children: [
            { text: 'Archive' },
            { text: 'Shared' },
            { divider: true },
            {
                text: 'Favorites',
                kbd: ['Ctrl', 'Shift', 'M'],
            },
        ],
    },
])
</script>
```

### width

Sets a fixed menu width in pixels.

```vue
<template>
    <ContextMenu
        :items="items"
        :width="280"
    >
        <ContentPlaceholder text="Right click here" />
    </ContextMenu>
</template>
```

- **Type:** `number`
- **Default:** `240`

#### TypeScript interface
```ts
interface ContextMenuItem extends DropdownMenuItem {
    divider?: boolean
    kbd?: string | string[]
    children?: ContextMenuItem[]
}
```

### disabled

Disables context-menu opening in the target area.

```vue
<template>
    <ContextMenu
        :items="items"
        :disabled="true"
    >
        <ContentPlaceholder text="Right click here" />
    </ContextMenu>
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### shouldTeleport

Controls whether the menu is rendered through `<teleport>`.

```vue
<template>
    <ContextMenu
        :items="items"
        :shouldTeleport="true"
    >
        <ContentPlaceholder text="Right click here" />
    </ContextMenu>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### positionXOffset

Applies a horizontal offset from the click coordinates.

```vue
<template>
    <ContextMenu
        :items="items"
        :positionXOffset="8"
    >
        <ContentPlaceholder text="Right click here" />
    </ContextMenu>
</template>
```

- **Type:** `number`
- **Default:** `0`

### positionYOffset

Applies a vertical offset from the click coordinates.

```vue
<template>
    <ContextMenu
        :items="items"
        :positionYOffset="8"
    >
        <ContentPlaceholder text="Right click here" />
    </ContextMenu>
</template>
```

- **Type:** `number`
- **Default:** `0`

### nestedMenuGap

Sets the horizontal spacing between nested context menu levels.

```vue
<template>
    <ContextMenu
        :items="items"
        :nestedMenuGap="12"
    >
        <ContentPlaceholder text="Right click here" />
    </ContextMenu>
</template>
```

- **Type:** `number`
- **Default:** `8`

### prefetchOn

Controls link prefetch behavior for context items with `actionType: LINK`.

```vue
<template>
    <ContextMenu
        :items="items"
        :prefetchOn="PrefetchOn.INTERACTION"
    >
        <ContentPlaceholder text="Right click here" />
    </ContextMenu>
</template>
```

- **Type:** `PrefetchOnStrategy`
- **Default:** `PrefetchOn.VISIBILITY`

#### Options

::options-table
---
options: [
    {
        value: "VISIBILITY",
        description: "Prefetch when links become visible.",
    },
    {
        value: "INTERACTION",
        description: "Prefetch when links are interacted with.",
    },
]
---
::