## Component

::component-code
---
srcDir: 'layouts/Footer.vue'
props: 
    credits: '© <year> <your-company>. All rights reserved.'
    menuItems:
        - text: 'Privacy Policy'
          to: ''
        - text: 'Terms of Service'
          to: ''
        - text: 'Contact Us'
          to: ''
    socialNetworks:
        - name: 'Twitter'
          link: 'https://twitter.com'
          icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg'
        - name: 'LinkedIn'
          link: 'https://linkedin.com'
          icon: 'https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg'
        - name: 'Facebook'
          link: 'https://facebook.com'
          icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg'
    hasContentMaxWidth: false
    hasSidePadding: true
    isMobileCentered: false
external:
  - menuItems
  - socialNetworks
externalTypes:
  - MenuItem[]
  - SocialNetwork[]
propsSettingsExcludedProps: ['menuItems', 'socialNetworks']
---
::

## Props

::props-table
---
props: [
    {
        "name": "credits",
        "default": "'© <year> <your-company>. All rights reserved.'",
        "type": "string"
    },
    {
        "name": "menuItems",
        "default": "[]",
        "type": "MenuItem[]"
    },
    {
        "name": "socialNetworks",
        "default": "[]",
        "type": "SocialNetwork[]"
    },
    {
        "name": "hasContentMaxWidth",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "hasSidePadding",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "isMobileCentered",
        "default": "false",
        "type": "boolean"
    }
]
---
::

## Slots
::slots-table
---
slots: [
    {
        name: "default",
        description: "Slot for inserting custom content into the Footer component. If used, it will override the default footer layout and props will be ignored (except for hasContentMaxWidth and hasSidePadding).",
    },
]
---
::

```vue
<template>
    <Footer>
        <!-- Custom footer content goes here -->
    </Footer>
</template>
```

## Usage
### credits

The `credits` prop allows you to set the text displayed in the footer, typically used for copyright information.

```vue
<template>
  <Footer credits="© 2024 MyCompany. All rights reserved." />
</template>
```

- **Type:** `string`
- **Default:** `© <year> <your-company>. All rights reserved.`

### menuItems

The `menuItems` prop accepts an array of menu items to be displayed in the footer. Each item should have `text` and `to` properties.

```vue
<template>
    <Footer :menuItems="exampleFooterMenuItems" />
</template>
<script setup lang="ts">
const exampleFooterMenuItems: MenuItem[] = [
    { text: 'Privacy Policy', to: '/privacy' },
    { text: 'Terms of Service', to: '/terms' },
    { text: 'Contact Us', to: '/contact' },
]
</script>
```

#### TypeScript interface
```ts
interface MenuItem {
    text: string
    to: string
}
```

### socialNetworks

The `socialNetworks` prop allows you to add social media links to the footer. Each social network should have `name`, `link`, and `icon` properties.

```vue
<template>
    <Footer :socialNetworks="exampleSocialNetworks" />
</template>
<script setup lang="ts">
const exampleSocialNetworks: SocialNetwork[] = [
    { name: 'Twitter', link: 'https://twitter.com', icon: 'path/to/twitter-icon.svg' },
    { name: 'LinkedIn', link: 'https://linkedin.com', icon: 'path/to/linkedin-icon.svg' },
    { name: 'Facebook', link: 'https://facebook.com', icon: 'path/to/facebook-icon.svg' },
]
</script>
```

#### TypeScript interface
```ts
interface SocialNetwork {
    name: string
    link: string
    icon: any
}
```

### hasContentMaxWidth

When set to `true`, the footer content will be constrained to a maximum width for better alignment with other page content.

```vue
<template>
    <Footer hasContentMaxWidth />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasSidePadding

The `hasSidePadding` prop adds horizontal padding to the footer content, enhancing its appearance on larger screens.

```vue
<template>
    <Footer hasSidePadding />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### isMobileCentered

When `isMobileCentered` is set to `true`, the footer content will be centered on mobile devices for improved aesthetics.

```vue
<template>
    <Footer isMobileCentered />
</template>
```

- **Type:** `boolean`
- **Default:** `false`