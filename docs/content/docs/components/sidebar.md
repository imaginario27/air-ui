::component-code
---
srcDir: 'navigation/nav-sidebar/NavSidebar.vue'
props: 
    class: "relative !h-[500px] translate-x-0"
propsSettingsExcludedProps: ['class']
isCodePreviewEnabled: false
isPlaygroundEnabled: false
---
::

```vue
<template>
    <NavSidebar
        :menuItems="routeItems"
        isFixed
        :hasCloseButton="false"
        stickOnScroll
        stickyScrollHeight="85"
    />
</template>
<script setup lang="ts">
const routeItems: SidebarMenuItem[] = [
    {
        isSectionTitle: true,
        text: 'Section title',
        icon: 'mdiBullseye',
    },
    {
        text: 'Item 1',
        icon: 'mdiHelp',
        to: '/',
    },
    {
        text: 'Item 2',
        icon: 'mdiHelp',
        to: '/',
    },
    {
        text: 'Item 3',
        icon: 'mdiHelp',
        to: '/',
    },
]
</script>
```

itemsStyleType: String as PropType<SidebarNavMenuItemStyleType>,    
    itemsCustomClass: String as PropType<string>

## Props

::props-table
---
props: [
    {
        "name": "menuItems",
        "default": "An example array",
        "type": "SidebarMenuItem[]",
    }, 
    {
        "name": "hasCloseButton",
        "default": "false",
        "type": "boolean",
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
        icon: 'mdiBullseye',
    },
    {
        text: 'Item 1',
        icon: 'mdiHelp',
        to: '/',
    },
    {
        text: 'Item 2',
        icon: 'mdiHelp',
        to: '/',
    },
    {
        text: 'Item 3',
        icon: 'mdiHelp',
        to: '/',
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
}
```

### hasCloseButton
A boolean value that determines whether to render the close button in the sidebar.

```vue
<template>
    <NavSidebar
        :menuItems="routeItems"
        hasCloseButton
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isFixed
A boolean value that determines whether to render the sidebar as a fixed element.

```vue
<template>
    <NavSidebar
        :menuItems="routeItems"
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
        :menuItems="routeItems"
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
        :menuItems="routeItems"
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
        :menuItems="routeItems"
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
        :menuItems="routeItems"
        :itemsCustomClass="'custom-class-name'"
    />
</template>
```
