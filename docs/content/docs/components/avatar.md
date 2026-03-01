
## Component

::component-code
---
srcDir: 'avatars/Avatar.vue'
props: 
    shape: "circle"
    size: "lg"
    isInteractive: true
    displayName: "Test user"
    imgUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    hasBorder: true
items:
    shape:
        - value: circle
          text: CIRCLE
        - value: square
          text: SQUARE
    size:
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
        - value: 2xl
          text: XXL
        - value: 3xl
          text: XXXL
        - value: 4xl
          text: XXXXL
enums:
    shape: "AvatarShape"
    size: "AvatarSize"
---
::

## Props

::props-table
---
props: [
    {
        "name": "shape",
        "default": "AvatarShape.CIRCLE",
        "type": "AvatarShape",
    },
    {
        "name": "size",
        "default": "AvatarSize.SM",
        "type": "AvatarSize | AvatarStackSize",
    },
    {
        "name": "isInteractive",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "displayName",
        "default": "'Test user'",
        "type": "string",
    },
    {
        "name": "imgUrl",
        "type": "string",
    },
    {
        "name": "hasBorder",
        "default": "false",
        "type": "boolean",
    },
]
---
::


## Usage

### shape

The `shape` prop defines the avatar container shape. It uses the `AvatarShape` enum.

```vue
<template>
    <Avatar :shape="AvatarShape.CIRCLE" />
</template>
```

- **Type:** `AvatarShape`
- **Default:** `AvatarShape.CIRCLE`

#### Options

::options-table
---
options: [
    {
        value: "CIRCLE",
        description: "Circular shape",
    },
    {
        value: "SQUARE",
        description: "Square shape",
    },
]
---
::

### size

The `size` prop determines the overall dimensions of the avatar. It accepts values from both `AvatarSize` and `AvatarStackSize` enums.

```vue
<template>
    <Avatar :size="AvatarShape.LG" />
</template>
```

- **Type:** `AvatarSize | AvatarStackSize`
- **Default:** `AvatarSize.SM`

#### Options

::options-table
---
options: [
    {
        value: "XS",
        description: "X-small size",
    },
    {
        value: "SM",
        description: "Small size",
    },
    {
        value: "MD",
        description: "Medium size",
    },
    {
        value: "LG",
        description: "Large size",
    },
    {
        value: "XL",
        description: "Extra Large size",
    },
    {
        value: "XXL",
        description: "2X-large size",
    },
    {
        value: "XXXL",
        description: "3X-large size",
    },
    {
        value: "XXXL",
        description: "4X-large size",
    },  
]
---
::


### isInteractive

If `true`, the avatar becomes interactive (e.g., hover effects, clickable). Useful for avatars used as UI controls or navigation elements. 
This props only works if `isInteractive` is true.

```vue
<template>
    <Avatar :isInteractive="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`



### displayName

The `displayName` prop provides an accessible name for the avatar, used as a fallback when the image is not available or for screen readers.

```vue
<template>
    <Avatar displayName="John Doe" />
</template>
```

- **Type:** `string`
- **Default:** `'Test user'`


### imgUrl

The `imgUrl` prop sets the image source for the avatar. If the URL is not provided, invalid or the image fails to load, a fallback (initials) is shown.

```vue
<template>
    <Avatar imgUrl="https://exampleweb.com/image/20" />
</template>
```

- **Type:** `string`


### hasBorder

If `true`, a border is rendered around the avatar, typically used to highlight or visually separate it from the background.

```vue
<template>
    <Avatar :isInteractive="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

