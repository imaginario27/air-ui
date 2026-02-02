## Component

::component-code
---
srcDir: 'layouts/headers/CompactHeader.vue'
props: 
    pageTitleFormat: "simple"
    navMenuItems:
        - text: "Home"
          to: ""
        - text: "About"
          to: ""
    userFullname: "Jane Smith"
    userAvatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    userMenuItems:
        - text: "Profile"
          to: ""
        - text: "Settings"
          to: ""
        - text: "Logout"
          to: ""
    showMobileMenuToggle: true
    showMobileSidebarToggle: true
    sidebarTogglePosition: "right-side"
    hasBorder: false
    isSticky: false
    hasGlassEffect: false
    detectActiveMenuItem: true
    navMenuClass: "hidden lg:flex"
    navMobileMenuClass: "lg:hidden min-w-[280px]"
    headerClass: ""
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
external:
  - navMenuItems
  - userMenuItems
externalTypes:
  - MenuItem[]
  - DropdownMenuItem[]
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
        "name": "navMenuClass",
        "default": "'hidden lg:flex'",
        "type": "string"
    },
    {
        "name": "navMobileMenuClass",
        "default": "'lg:hidden min-w-[280px]'",
        "type": "string"
    },
    {
        "name": "headerClass",
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

The `navMenuItems` prop allows you to define the navigation menu items displayed in the compact header. You can pass an array of `MenuItem` objects to customize the menu.

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
        to: "/about",
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
}
```

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

### navMenuClass

The `navMenuClass` prop allows you to add custom CSS classes to the navigation menu container in the compact header.

```vue
<template>
    <CompactHeader
        navMenuClass="hidden lg:flex custom-nav-class"
    />
</template>
```

- **Type:** `string`
- **Default:** `'hidden lg:flex'`

### navMobileMenuClass

The `navMobileMenuClass` prop allows you to add custom CSS classes to the mobile navigation menu container in the compact header.

```vue
<template>
    <CompactHeader
        navMobileMenuClass="lg:hidden min-w-[280px] custom-mobile-nav-class"
    />
</template>
```

- **Type:** `string`
- **Default:** `'lg:hidden min-w-[280px]'`

### headerClass

The `headerClass` prop allows you to add custom CSS classes to the header.

```vue
<template>
    <CompactHeader
        headerClass="custom-header-class"
    />
</template>
```