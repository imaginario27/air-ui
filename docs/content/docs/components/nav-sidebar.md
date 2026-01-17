## Component

::component-code
---
srcDir: 'navigation/nav-sidebar/NavSidebar.vue'
model:
  isCollapsed: update:isCollapsed
props: 
    sidebarId: 'example-nav-sidebar'
    menuItems:
        - isSectionTitle: true
          text: 'Section title'
          icon: 'mdi:bullseye'
        - text: 'Item 1'
          icon: 'mdi:help'
          to: null
        - text: 'Item 2'
          icon: 'mdi:help'
          to: null
        - text: 'Item 3'
          icon: 'mdi:help'
          to: null
          children:
              - text: 'Subitem 1'
                icon: 'mdi:help-circle-outline'
                to: null
              - text: 'Subitem 2'
                icon: 'mdi:help-circle-outline'
                to: null
    expandedWidth: 240
    collapsedWidth: 60
    multipleSubmenusOpen: false
    isCollapsed: false
    showCollapseDivider: false
    collapsedSubmenuOffset: 20
    collapsedSubmenuWidth: 200
    collapsedFlipLimit: 8
    showCollapseToggle: false
    collapseTogglePosition: "bottom"
    collapsedStateIcon: "mdi:menu-close"
    expandedStateIcon: "mdi:menu-open"
    showMobileSidebarClose: false
    mobileSidebarCloseIcon: "mdi:close"
    isFixed: true
    stickOnScroll: false
    stickyScrollHeight: 0
    headerHeight: 0
    footerHeight: 0
    footerSafeAreaHeight: 180
    itemsStyleType: "compact"
    class: "relative !h-[500px] translate-x-0"
items:
    itemsStyleType:
        - value: spaced
          text: SPACED
        - value: compact
          text: COMPACT
    collapseTogglePosition: 
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
external:
  - menuItems
externalTypes:
  - SidebarMenuItem[]
propsSettingsExcludedProps: [
    'menuItems',
    'class',
    'isFixed',
    'stickOnScroll',
    'stickyScrollHeight',
    'headerHeight',
    'footerHeight',
    'footerSafeAreaHeight',
]
---
::

## Props

::props-table
---
props: [
    {
        "name": "sidebarId",
        "type": "string",
        "required": true,
    },
    {
        "name": "menuItems",
        "default": "An example array",
        "type": "SidebarMenuItem[]",
    }, 
    {
        "name": "expandedWidth",
        "default": "240",
        "type": "number",
    },
    {
        "name": "collapsedWidth",
        "default": "60",
        "type": "number",
    },
    {
        "name": "multipleSubmenusOpen",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "isCollapsed",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "showCollapseDivider",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "collapsedSubmenuOffset",
        "default": "20",
        "type": "number",
    },
    {
        "name": "collapsedSubmenuWidth",
        "default": "200",
        "type": "number",
    },
    {
        "name": "collapsedFlipLimit",
        "default": "8",
        "type": "number",
    },
    {
        "name": "showCollapseToggle",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "collapseTogglePosition",
        "default": "Position.BOTTOM",
        "type": "Position",
    },
    {
        "name": "collapsedStateIcon",
        "default": "mdi:menu-close",
        "type": "string",
    },
    {
        "name": "expandedStateIcon",
        "default": "mdi:menu-open",
        "type": "string",
    },
    {
        "name": "showMobileSidebarClose",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "mobileSidebarCloseIcon",
        "default": "mdi:close",
        "type": "string",
    },
    {
        "name": "isFixed",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "stickOnScroll",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "stickyScrollHeight",
        "default": "0",
        "type": "number",
    },
    {
        "name": "headerHeight",
        "default": "0",
        "type": "number",
    },
    {
        "name": "footerHeight",
        "default": "0",
        "type": "number",
    },
    {
        "name": "footerSafeAreaHeight",
        "default": "180",
        "type": "number",
    },
    {
        "name": "itemsStyleType",
        "type": "SidebarNavMenuItemStyleType",
    },
    {
        "name": "itemsCustomClass",
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
        name: "sidebar-header",
        description: "Template to render a header for the sidebar. It is commonly used for logos, language selectors, etc.",
    },
    {
        name: "sidebar-menu-prefix-content",
        description: "Template to render the prefix content before the menu items. It will render the content before the menu items inside the menu.",
    },
    {
        name: "sidebar-menu-suffix-content",
        description: "Template to render the suffix content before the menu items. It will render the content after the menu items inside the menu.",
    },
    {
        name: "sidebar-footer",
        description: "Template to render a footer for the sidebar. It is commonly used for footer menus, banners, etc.",
    },
]
---
::

```vue
<template>
    <NavSidebar
        sidebarId="example-nav-sidebar"
        :menuItems="routeItems"
    >
        <template #sidebar-header>
            <!-- Add content here -->
        </template>

        <template #sidebar-menu-prefix-content>
            <!-- Add content here -->
        </template>

        <template #sidebar-menu-suffix-content>
            <!-- Add content here -->
        </template>

        <template #sidebar-footer>
            <!-- Add content here -->
        </template>
    </NavSidebar>
</template>
<script setup lang="ts">
const routeItems: SidebarMenuItem[] = [
    // ...
]
</script>
```

## Usage
### sidebarId

A unique identifier for the sidebar. It is used to manage the state of the sidebar (collapsed or expanded) when using multiple sidebars in the same application.

```vue
<template>
    <NavSidebar
        sidebarId="main-sidebar"
    />
</template>
```

- **Type:** `string`
- **Required:** `true`

### menuItems

An array of objects used to render the menu items.

```vue
<template>
    <NavSidebar
        :menuItems="routeItems"
    />
</template>
<script setup lang="ts">
const routeItems: SidebarMenuItem[] = [
    {
        isSectionTitle: true,
        text: 'Section title',
        icon: 'mdi:bullseye',
    },
    {
        text: 'Item 1',
        icon: 'mdi:help',
        to: '/',
    },
    {
        text: 'Item 2',
        icon: 'mdi:help',
        to: '/',
    },
    {
        text: 'Item 3',
        icon: 'mdi:help',
        children: [
            {
                text: 'Subitem 1',
                icon: 'mdi:help',
                to: '/',
            },
            {
                text: 'Subitem 2',
                icon: 'mdi:help',
                to: '/',
            },
        ],
    },
]
</script>
```

- **Type:** `SidebarMenuItem[]`
- **Default:** `An example array`

#### TypeScript interface
```ts
interface SidebarMenuItem {
    text: string
    icon?: string
    to?: string
    isSectionTitle?: boolean
    children?: SidebarMenuItem[]
}
```

### expandedWidth

A number value that sets the width of the sidebar when it is expanded.

```vue
<template>
    <NavSidebar
        :expandedWidth="300"
    />
</template>
```

- **Type:** `number`
- **Default:** `240`

### collapsedWidth

A number value that sets the width of the sidebar when it is collapsed.

```vue
<template>
    <NavSidebar
        :collapsedWidth="80"
    />
</template>
```

- **Type:** `number`
- **Default:** `60`

### multipleSubmenusOpen

A boolean value that determines whether multiple submenus can be open at the same time.

```vue
<template>
    <NavSidebar
        multipleSubmenusOpen
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isCollapsed

A boolean value that determines whether to render the sidebar in a collapsed state.

There are two ways to control the collapsed state of the sidebar:

#### With v-model
```vue
<template>
    <NavSidebar
        v-model:isCollapsed="isSidebarCollapsed"
    />
</template>
<script setup lang="ts">
const isSidebarCollapsed = ref(false)
</script>
```

- **Type:** `boolean`
- **Default:** `false`

#### With the useSidebar composable
```vue
<template>
    <NavSidebar
        :isCollapsed="isSidebarCollapsed('example-nav-sidebar')"
    /> 
</template>
<script setup lang="ts">
const { isSidebarCollapsed } = useSidebar()
</script>
```

#### Note
::content-alert
---
props:
    title: "Important"
    description: "If you use collapsed state, make sure to pass icons for each menu item, otherwise they won't be visible when the sidebar is collapsed. Additionally, the sidebar will require a unique `sidebarId` prop to manage its state."
---
::

```vue
<template>
    <NavSidebar
        sidebarId="example-nav-sidebar"
        isCollapsed
    />
</template>
```

### showCollapseDivider

A boolean value that determines whether to render the section title as a divider when the sidebar is collapsed.

```vue
<template>
    <NavSidebar
        isCollapsed
        showCollapseDivider
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false` 

### collapsedSubmenuOffset

The `collapsedSubmenuOffset` prop allows you to set the horizontal offset for submenus when the sidebar is in a collapsed state. This offset determines how far the submenu will be positioned horizontally from the edge of the icon.

```vue
<template>
    <NavSidebar
        isCollapsed
        :collapsedSubmenuOffset="30"
    />
</template>
```

- **Type:** `number`
- **Default:** `20`

### collapsedSubmenuWidth

The `collapsedSubmenuWidth` prop allows you to set the width for submenus dropdown when the sidebar is in a collapsed state. 

```vue

<template>
    <NavSidebar
        isCollapsed
        :collapsedSubmenuMinWidth="250"
    />
</template>
```

- **Type:** `number`
- **Default:** `200`

### collapsedFlipLimit

The submenu dropdown will have two possible opening directions in the collapsed state: **upwards** or **downwards**.

The `collapsedFlipLimit` prop allows you to specify how many of the submenu dropdowns should open downwards when the sidebar is in a collapsed state. 

This is particularly useful for ensuring that submenus do not extend beyond the viewport when there are many items in the sidebar.

```vue
<template>
    <NavSidebar
        :collapsedDropdownTopCount="5"
    />
</template>
```

- **Type:** `number`
- **Default:** `8`

### showCollapseToggle

A boolean value that determines whether to render the collapse toggle button to collapse or expand the sidebar.

```vue
<template>
    <NavSidebar
        showCollapseToggle
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### collapseTogglePosition

The `collapseTogglePosition` prop allows you to set the position of the collapse toggle button. It uses the `Position` enum.

```vue
<template>
    <NavSidebar
        showCollapseToggle
        :collapseTogglePosition="Position.TOP"
    />
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

#### Options
::options-table
---
options: [
    {
        value: "TOP",
        description: "The toggle button is rendered at the top of the sidebar.",
    },
    {
        value: "BOTTOM",
        description: "The toggle button is rendered at the bottom of the sidebar.",
    },
]
---
::

### collapsedStateIcon

The `collapsedStateIcon` prop allows you to set a custom icon for the collapse toggle button when the sidebar is in a collapsed state.

```vue
<template>
    <NavSidebar
        showCollapseToggle
        collapsedStateIcon="mdi:arrow-right-bold-circle"
    />
</template>
```

- **Type:** `string`
- **Default:** `mdi:menu-close`

### expandedStateIcon

The `expandedStateIcon` prop allows you to set a custom icon for the collapse toggle button when the sidebar is in an expanded state.

```vue
<template>
    <NavSidebar
        showCollapseToggle
        expandedStateIcon="mdi:arrow-left-bold-circle"
    />
</template>
```

- **Type:** `string`
- **Default:** `mdi:menu-open`


### showMobileSidebarClose

A boolean value that determines whether to render the close button in the for the mobile sidebar. 

It will only be visible on small screen widths and when the sidebar do not use the collapsed mode.

```vue
<template>
    <NavSidebar
        showMobileSidebarClose
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### mobileSidebarCloseIcon

The `mobileSidebarCloseIcon` prop allows you to set a custom icon for the close button in the mobile sidebar.

```vue
<template>
    <NavSidebar
        showMobileSidebarClose
        mobileSidebarCloseIcon="mdi:close-circle"
    />
</template>
``` 

- **Type:** `string`
- **Default:** `mdi:close-circle`

### isFixed

A boolean value that determines whether to render the sidebar as a fixed element.

```vue
<template>
    <NavSidebar
        isFixed
    />
</template>
```

### stickOnScroll

The `stickOnScroll` prop allows the sidebar to adjust its vertical position dynamically based on the user's scroll position. When enabled, it simulates a "sticky" behavior — the sidebar initially appears slightly offset from the top (defined by `stickyScrollHeight`), and as the user scrolls past that threshold, the sidebar sticks to the very top.

It requires `isFixed` to be true.

```vue
<template>
    <NavSidebar
        stickOnScroll
    />
</template>
``` 

- **Type:** `boolean`
- **Default:** `false`

### stickyScrollHeight

The `stickyScrollHeight` prop determines the height at which the sidebar will stick to the top when `stickOnScroll` is enabled. This value is used to calculate the initial offset of the sidebar.

It requires `isFixed` to be true.

```vue
<template>
    <NavSidebar
        stickOnScroll
        stickyScrollHeight="85"
    />
</template>
```

- **Type:** `number`
- **Default:** `0`

### headerHeight

The `headerHeight` prop specifies the height of the header to the sidebar menu. It is used to calculate the total height of the sidebar menu and is particularly useful in layouts where the sidebar is below a sticky header.

```vue
<template>
    <NavSidebar
        :headerHeight="100"
    />
</template>
```

- **Type:** `number`
- **Default:** `0`

### footerHeight

The `footerHeight` prop specifies the height of the footer to the sidebar menu. It is used to calculate the total height of the sidebar menu and is particularly useful in layouts where the sidebar is above a sticky footer.

```vue
<template>
    <NavSidebar
        :footerHeight="40"
    />
</template>
```

- **Type:** `number`
- **Default:** `0`

### footerSafeAreaHeight

The `footerSafeAreaHeight` prop specifies a safe height for the sidebar menu in the event of using the bottom footer of the sidebar. It is used to calculate the total height of the sidebar menu.

```vue
<template>
    <NavSidebar
        :footerSafeAreaHeight="180"
    />
</template>
```

- **Type:** `number`
- **Default:** `0`

### itemsStyleType

The `itemsStyleType` prop allows you to set the style of the menu items. It uses the `SidebarNavMenuItemStyleType` enum.

**Important**: It only works when menu items are passed as an array by using the `menuItems` props.

```vue
<template>
    <NavSidebar
        :itemsStyleType="SidebarNavMenuItemStyleType.SPACED"
    />
</template>
```

- **Type:** `SidebarNavMenuItemStyleType`
- **Default:** `SPACED`

#### Options
::options-table
---
options: [
    {
        value: "SPACED",
        description: "The items have more space around them.",
    },
    {
        value: "COMPACT",
        description: "The items padding is more condensed and the optional icon is slightly smaller.",
    },
]
---
::

### itemsCustomClass

The `itemsCustomClass` prop allows you to set a custom class for the menu items. It is useful when you want to apply specific styles to the menu items.

**Important**: It only works when menu items are passed as an array by using the `menuItems` props.

```vue
<template>
    <NavSidebar
        :itemsCustomClass="'custom-class-name'"
    />
</template>
```
