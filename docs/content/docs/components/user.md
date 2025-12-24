
## Component

::component-code
---
srcDir: 'users/User.vue'
props: 
    displayName: "John Doe"
    shape: "circle"
    size: "sm"
    avatarSize: ""
    isInteractive: true
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
    avatarSize:
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "displayName",
        "default": "'Test username'",
        "type": "string",
    },
    {
        "name": "shape",
        "default": "AvatarShape.CIRCLE",
        "type": "AvatarShape",
    },
    {
        "name": "size",
        "default": "AvatarSize.SM",
        "type": "AvatarSize",
        "description": "<b>Allowed sizes</b>: XS, SM, MD"
    },
    {
        "name": "isInteractive",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "imgUrl",
        "type": "string",
    },
]
---
::


## Usage

### displayName

Provides the desired name for the user. Additionally, it is used by the user's avatar to set the initials, in case the are required if no `imgUrl` is set.

```vue
<template>
    <User displayName="John Doe" />
</template>
```

- **Type:** `string`
- **Default:** `'Test user'`


### shape

The `shape` prop defines the user's avatar container shape. It uses the `AvatarShape` enum.

```vue
<template>
    <User :shape="AvatarShape.CIRCLE" />
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

The `size` prop determines the overall dimensions of the user's avatar. It uses the `AvatarSize` enum.

**Allowed sizes**: XS, SM, MD

```vue
<template>
    <User :size="AvatarSize.MD" />
</template>
```

- **Type:** `AvatarSize`
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
]
---
::

### avatarSize

The `avatarSize` sets a custom avatar size and overrides the `size` settings for the avatar. It uses the `AvatarSize` enum.

**Allowed sizes**: XS, SM, MD

```vue
<template>
    <User 
        :size="AvatarSize.MD"
        :avatarSize="AvatarSize.SM" 
    />
</template>
```

- **Type:** `AvatarSize`
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
]
---
::

### isInteractive

If `true`, the avatar becomes interactive (e.g., hover effects, clickable). It is useful when you want to enhance the UX experiencie when linking an user to a specified URL. 


```vue
<template>
    <User :isInteractive="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### imgUrl

The `imgUrl` prop sets the image source for the user's avatar. If the URL is not provided, invalid or the image fails to load, a fallback (initials) is shown.

```vue
<template>
    <User imgUrl="https://exampleweb.com/image/20" />
</template>
```

- **Type:** `string`

