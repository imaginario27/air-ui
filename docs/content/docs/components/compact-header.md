## Component

::component-code
---
srcDir: 'layouts/headers/CompactHeader.vue'
props: 
    pageTitleFormat: "simple"
    navMenuItems:
        - text: "Home"
          to: ""
        - text: "Services"
          to: ""
        - text: "About"
          to: ""
          children:
            - text: "Team"
              to: ""
            - text: "Mission"
              to: ""
    submenuYOffset: 8
    submenuDropdownClass: "min-w-[200px]"
    submenuTrigger: "click"
    userFullname: "Jane Smith"
    userAvatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    userMenuItems:
        - text: "Profile"
          to: ""
        - text: "Settings"
          to: ""
        - text: "Logout"
          to: ""
    mobileBreakpoint: 1024
    showMobileMenuToggle: true
    showMobileSidebarToggle: true
    sidebarTogglePosition: "right-side"
    hasBorder: false
    isSticky: false
    hasGlassEffect: false
    detectActiveMenuItem: true
    prefetchOn: "visibility"
    zIndex: "50"
    navMenuClass: ""
    navMobileMenuClass: "min-w-[280px]"
    headerClass: ""
    sidebarOpenAriaLabel: "Open sidebar"
    sidebarCloseAriaLabel: "Close sidebar"
    mobileMenuAriaLabel: "Open mobile menu"
    class: "w-full border border-border-default"
slots:
    header-logo: ""
slotComponents:
    header-logo:
        srcDir: 'content/demos/layouts/LogoExample.vue'
        componentSource: 'docs'
items:
    pageTitleFormat:
        - value: simple
          text: SIMPLE
        - value: full
          text: FULL
    sidebarTogglePosition:
        - value: right-side
          text: RIGHT_SIDE
        - value: logo-left-side
          text: LOGO_LEFT_SIDE
        - value: logo-right-side
          text: LOGO_RIGHT_SIDE
    submenuTrigger:
        - value: click
          text: CLICK
        - value: hover
          text: HOVER
    prefetchOn:
        - value: visibility
          text: VISIBILITY
        - value: interaction
          text: INTERACTION
external:
  - navMenuItems
  - userMenuItems
externalTypes:
  - MenuItem[]
  - DropdownMenuItem[]
enums:
    pageTitleFormat: "PageTitleFormat"
    sidebarTogglePosition: "SidebarTogglePosition"
    submenuTrigger: "Trigger"
    prefetchOn: "PrefetchOn"
propsSettingsExcludedProps: ['navMenuItems', 'userMenuItems', 'class']
---
::

## Props

::props-table
---
props: [
    {
        "name": "pageTitleFormat",
        "default": "PageTitleFormat.SIMPLE",
        "type": "PageTitleFormat"
    },
    {
        "name": "navMenuItems",
        "default": "[]",
        "type": "MenuItem[]"
    },
    {
        "name": "submenuYOffset",
        "default": "8",
        "type": "number"
    },
    {
        "name": "submenuDropdownClass",
        "default": "'min-w-[220px]'",
        "type": "string"
    },
    {
        "name": "submenuTrigger",
        "default": "Trigger.CLICK",
        "type": "Trigger"
    },
    {
        "name": "userFullname",
        "type": "string"
    },
    {
        "name": "userAvatarUrl",
        "type": "string"
    },
    {
        "name": "userMenuItems",
        "default": "[]",
        "type": "DropdownMenuItem[]"
    },
    {
        "name": "mobileBreakpoint",
        "default": "1024",
        "type": "number"
    },
    {
        "name": "showMobileMenuToggle",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "showMobileSidebarToggle",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "sidebarTogglePosition",
        "default": "SidebarTogglePosition.RIGHT_SIDE",
        "type": "SidebarTogglePosition"
    },
    {
        "name": "hasBorder",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "isSticky",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "hasGlassEffect",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "detectActiveMenuItem",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "prefetchOn",
        "default": "PrefetchOn.VISIBILITY",
        "type": "PrefetchOnStrategy"
    },
    {
        "name": "navMenuClass",
        "default": "''",
        "type": "string"
    },
    {
        "name": "navMobileMenuClass",
        "default": "'min-w-[280px]'",
        "type": "string"
    },
    {
        "name": "zIndex",
        "default": "'50'",
        "type": "string"
    },
    {
        "name": "headerClass",
        "type": "string"
    },
    {
        "name": "sidebarOpenAriaLabel",
        "default": "'Open sidebar'",
        "type": "string"
    },
    {
        "name": "sidebarCloseAriaLabel",
        "default": "'Close sidebar'",
        "type": "string"
    },
    {
        "name": "mobileMenuAriaLabel",
        "default": "'Open mobile menu'",
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
        name: "top-header",
        description: "Slot to customize the top header area.",
    },
    {
        name: "header-logo",
        description: "Slot to customize the header logo area.",
    },
    {
        name: "header-actions",
        description: "Slot to customize the header actions area.",
    },
    {
        name: "bottom-header",
        description: "Slot to customize the bottom header area.",
    },
]
---
::

```vue
<template>
    <CompactHeader
        :navMenuItems="mainHeaderMenu"
        :userMenuItems="userDropdownMenu"
        userFullname="John Doe"
        userAvatarUrl="https://randomuser.me/api/portraits/men/45.jpg"
    >
        <template #top-header>
            <!-- Custom top header content here -->
        </template>
        
        <template #header-logo>
            <!-- Custom logo here -->
            <AppLogo
                :src="logo"
                class="max-w-[80px]"
            />
        </template>

        <template #header-actions>
            <!-- Custom actions here -->
        </template>

        <template #bottom-header>
            <!-- Custom bottom header content here -->
        </template>
    </CompactHeader>
</template>
<script setup lang="ts">
const mainHeaderMenu = ref<mainHeaderMenu[]>([
    {
        text: "Home",
        to: "/",
    },
    {
        text: "About",
        to: "/about",
    },
    {
        text: "Contact",
        to: "/contact",
    },
])

const userDropdownMenu = ref<DropdownMenuItem[]>([
    {
        text: "Profile",
        to: "/profile",
    },
    {
        text: "Settings",
        to: "/settings",
    },
    {
        text: "Logout",
        to: "/logout",
    },
])
</script>
```

## Usage
### pageTitleFormat

The compact header component uses `useHead` under the hood to set the page title based on the selected format as a fallback. 

By using the `PageTitleFormat` enum, you can choose between the available formats for the page title.

```vue
<template>
    <CompactHeader
        :pageTitleFormat="PageTitleFormat.FULL"
    />
</template>
```

- **Type:** `PageTitleFormat`
- **Default:** `PageTitleFormat.SIMPLE`

#### Options
::options-table
---
options: [
    {
        value: "SIMPLE",
        description: "Sets the page title to the current page's title only.",
    },
    {
        value: "FULL",
        description: "Sets the page title to include both the current page's title and the site name.",
    },
]
---
::

### navMenuItems

The `navMenuItems` prop allows you to define the navigation menu items displayed in the compact header. You can pass an array of `MenuItem` objects to customize the menu, including optional `children` for submenu items.

```vue
<template>
    <CompactHeader
        :navMenuItems="mainHeaderMenu"
    />
</template>
<script setup lang="ts">
const mainHeaderMenu = ref<MenuItem[]>([
    {
        text: "Home",
        to: "/",
    },
    {
        text: "About",
        to: "",
        submenuDropdownClass: "min-w-[320px]",
        children: [
            {
                text: "Team",
                to: "/about/team",
            },
            {
                text: "Mission",
                to: "/about/mission",
            },
        ],
    },
    {
        text: "Contact",
        to: "/contact",
    },
])
</script>
```

#### TypeScript interface
```ts
interface MenuItem {
    text: string
    to: string
    children?: {
        text: string
        to: string
    }[]
    submenuDropdownClass?: string
}
```

### submenuYOffset

The `submenuYOffset` prop allows you to control the vertical offset in pixels for nav menu submenus.

```vue
<template>
    <CompactHeader
        :navMenuItems="mainHeaderMenu"
        :submenuYOffset="12"
    />
</template>
```

- **Type:** `number`
- **Default:** `8`

### submenuDropdownClass

The `submenuDropdownClass` prop allows you to define the default class for submenu dropdown containers (for example width classes).

If a menu item defines `submenuDropdownClass`, that item value takes precedence over `submenuDropdownClass`.

```vue
<template>
    <CompactHeader
        :navMenuItems="mainHeaderMenu"
        submenuDropdownClass="min-w-[280px]"
    />
</template>
```

- **Type:** `string`
- **Default:** `'min-w-[220px]'`

### submenuTrigger

The `submenuTrigger` prop controls how nav menu submenus are opened.

```vue
<template>
    <CompactHeader
        :navMenuItems="mainHeaderMenu"
        :submenuTrigger="Trigger.HOVER"
    />
</template>
```

- **Type:** `Trigger`
- **Default:** `Trigger.CLICK`

#### Options
::options-table
---
options: [
    {
        value: "CLICK",
        description: "Open the submenu when clicking the nav menu item.",
    },
    {
        value: "HOVER",
        description: "Open the submenu when hovering the nav menu item.",
    },
]
---
::

### userFullname

The `userFullname` prop allows you to set the full name of the user to be displayed in the compact header.

```vue
<template>
    <CompactHeader
        userFullname="John Doe"
    />
</template>
```

- **Type:** `string`

### userAvatarUrl

The `userAvatarUrl` prop allows you to set the URL of the user's avatar image to be displayed in the compact header.

```vue
<template>
    <CompactHeader
        userAvatarUrl="https://randomuser.me/api/portraits/men/45.jpg"
    />
</template>
```

- **Type:** `string`

### userMenuItems

The `userMenuItems` prop allows you to define the dropdown menu items for the user profile section in the compact header. You can pass an array of `DropdownMenuItem` objects to customize the menu.

```vue
<template>
    <CompactHeader
        :userMenuItems="userDropdownMenu"
    />
</template>
<script setup lang="ts">
const userDropdownMenu = ref<DropdownMenuItem[]>([
    {
        text: "Profile",
        to: "/profile",
    },
    {
        text: "Settings",
        to: "/settings",
    },
    {
        text: "Logout",
        to: "/logout",
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
    hasSeparator?: boolean
    callback?: () => void
}
```

### mobileBreakpoint

The `mobileBreakpoint` prop sets the viewport width (in pixels) below which the compact header switches to its mobile layout. It is the single source of truth for responsive switching: below it the horizontal nav menu, header actions, and desktop content are hidden and the mobile menu and sidebar toggles appear; at or above it the desktop layout is shown.

```vue
<template>
    <CompactHeader
        :mobileBreakpoint="1024"
    />
</template>
```

- **Type:** `number`
- **Default:** `1024`

### showMobileMenuToggle

The `showMobileMenuToggle` prop allows you to control the visibility of the mobile menu toggle button in the compact header.

```vue
<template>
    <CompactHeader
        :showMobileMenuToggle="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### showMobileSidebarToggle

The `showMobileSidebarToggle` prop allows you to control the visibility of the mobile sidebar toggle button in the compact header.

```vue
<template>
    <CompactHeader
        :showMobileSidebarToggle="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### sidebarTogglePosition

The `sidebarTogglePosition` prop allows you to set the position of the sidebar toggle button in the compact header. You can choose from predefined positions using the `SidebarTogglePosition` enum.

```vue
<template>
    <CompactHeader
        :sidebarTogglePosition="SidebarTogglePosition.RIGHT_SIDE"
    />
</template>
```

- **Type:** `SidebarTogglePosition`
- **Default:** `SidebarTogglePosition.RIGHT_SIDE`

#### Options
::options-table
---
options: [
    {
        value: "RIGHT_SIDE",
        description: "Places the sidebar toggle button on the right side of the header.",
    },
    {
        value: "LOGO_LEFT_SIDE",
        description: "Places the sidebar toggle button to the left of the logo.",
    },
    {
        value: "LOGO_RIGHT_SIDE",
        description: "Places the sidebar toggle button to the right of the logo.",
    },
]
---
::

### hasBorder

The `hasBorder` prop allows you to add a bottom border to the compact header.

```vue
<template>
    <CompactHeader
        :hasBorder="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isSticky

The `isSticky` prop allows you to make the compact header stick to the top of the viewport when scrolling.

```vue
<template>
    <CompactHeader
        :isSticky="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasGlassEffect

The `hasGlassEffect` prop allows you to apply a background glass effect to the compact header.

```vue
<template>
    <CompactHeader
        :hasGlassEffect="true"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### detectActiveMenuItem

The `detectActiveMenuItem` prop allows you to enable or disable the automatic detection of the active menu item based on the current route.

```vue
<template>
    <CompactHeader
        :navMenuItems="mainHeaderMenu"
        :detectActiveMenuItem="true"
    />
</template>
<script setup lang="ts">
const mainHeaderMenu = ref<MenuItem[]>([
    {
        text: "Home",
        to: "/",
    },
    {
        text: "About",
        to: "/about",
    },
    {
        text: "Contact",
        to: "/contact",
    },
])
</script>
```

- **Type:** `boolean`
- **Default:** `true`

### prefetchOn
Controls when header route targets should be prefetched. It uses either the `PrefetchOnStrategy` type or the `PrefetchOn` enum.

```vue
<template>
    <CompactHeader
        :navMenuItems="mainHeaderMenu"
        :prefetchOn="PrefetchOn.INTERACTION"
    />
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
        description: "Prefetches routes based on visibility strategy.",
    },
    {
        value: "INTERACTION",
        description: "Prefetches routes when users hover or focus header navigation and user menu links.",
    },
]
---
::

You can also pass an object strategy:

```ts
{
    visibility: true,
    interaction: true,
}
```

### navMenuClass

The `navMenuClass` prop allows you to add custom CSS classes to the navigation menu container in the compact header. Show/hide is controlled by `mobileBreakpoint` — these classes are additive styling, not visibility.

```vue
<template>
    <CompactHeader
        navMenuClass="custom-nav-class"
    />
</template>
```

- **Type:** `string`
- **Default:** `''`

### navMobileMenuClass

The `navMobileMenuClass` prop allows you to add custom CSS classes to the mobile navigation menu container in the compact header. Show/hide is controlled by `mobileBreakpoint` — these classes are additive styling, not visibility.

```vue
<template>
    <CompactHeader
        navMobileMenuClass="min-w-[280px] custom-mobile-nav-class"
    />
</template>
```

- **Type:** `string`
- **Default:** `'min-w-[280px]'`

### zIndex

The `zIndex` prop sets the CSS `z-index` for all dropdowns rendered by the compact header: the nav menu submenu, the user menu, and the mobile menu. Use it to ensure consistent stacking and to avoid conflicts with other fixed or sticky elements on the page.

```vue
<template>
    <CompactHeader
        :isSticky="true"
        zIndex="100"
    />
</template>
```

- **Type:** `string`
- **Default:** `'50'`

### headerClass

The `headerClass` prop allows you to add custom CSS classes to the header.

```vue
<template>
    <CompactHeader
        headerClass="custom-header-class"
    />
</template>
```

### sidebarOpenAriaLabel

The `sidebarOpenAriaLabel` prop sets the accessible label for the sidebar toggle button when the sidebar is closed. Override it for i18n.

```vue
<template>
    <CompactHeader
        sidebarOpenAriaLabel="Abrir barra lateral"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Open sidebar'`

### sidebarCloseAriaLabel

The `sidebarCloseAriaLabel` prop sets the accessible label for the sidebar toggle button when the sidebar is open. Override it for i18n.

```vue
<template>
    <CompactHeader
        sidebarCloseAriaLabel="Cerrar barra lateral"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Close sidebar'`

### mobileMenuAriaLabel

The `mobileMenuAriaLabel` prop sets the accessible label for the mobile menu toggle button. Override it for i18n.

```vue
<template>
    <CompactHeader
        mobileMenuAriaLabel="Abrir menú móvil"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Open mobile menu'`