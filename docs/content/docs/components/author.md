
## Component

::component-code
---
srcDir: 'users/Author.vue'
props: 
    name: "John Doe"
    role: ""
    layoutOrientation: "horizontal"
    detailsOrientation: "vertical"
    verticalLayoutAlign: "left"
    shape: "circle"
    size: "sm"
items:
    layoutOrientation:
        - value: horizontal
          text: HORIZONTAL
        - value: vertical
          text: VERTICAL
    detailsOrientation:
        - value: horizontal
          text: HORIZONTAL
        - value: vertical
          text: VERTICAL
    verticalLayoutAlign:
        - value: left
          text: LEFT
        - value: center
          text: CENTER
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
        
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "name",
        "default": "'John Doe'",
        "type": "string",
    },
    {
        "name": "role",
        "type": "string",
    },
    {
        "name": "imgUrl",
        "type": "string",
    },
    {
        "name": "layoutOrientation",
        "default": "Orientation.HORIZONTAL",
        "type": "Orientation",
    },
    {
        "name": "detailsOrientation",
        "default": "Orientation.VERTICAL",
        "type": "Orientation",
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
]
---
::


## name

Sets the name (or full name) for the author. Additionally, it is used by the author's avatar to set the initials, in case the are required if no `imgUrl` is set.

```vue
<template>
    <Author name="John Doe" />
</template>
```

- **Type:** `string`
- **Default:** `'John Doe'`

### role

Sets the role for the author. It is used to display the role in the author's details.

```vue
<template>
    <Author role="Frontend Developer" />
</template>
```

### imgUrl

The `imgUrl` prop sets the image source for the author's avatar. If the URL is not provided, invalid or the image fails to load, a fallback (initials) is shown.

```vue
<template>
    <Author imgUrl="https://exampleweb.com/image/20" />
</template>
```

- **Type:** `string`

### layoutOrientation

The `layoutOrientation` prop defines the main layout orientation of the author's information and avatar. It uses the `Orientation` enum.

```vue
<template>
    <Author :layoutOrientation="Orientation.HORIZONTAL" />
</template>
```

#### Options

::options-table
---
options: [
    {
        value: "Orientation.HORIZONTAL",
        description: "horizontal",
    },
    {
        value: "Orientation.VERTICAL",
        description: "vertical",
    },
]
---
::

### detailsOrientation

Defines the author details layout orientation. It uses the `Orientation` enum.

```vue
<template>
    <Author :detailsOrientation="Orientation.VERTICAL" />
</template>
```

#### Options

::options-table
---
options: [
    {
        value: "Orientation.HORIZONTAL",
        description: "horizontal",
    },
    {
        value: "Orientation.VERTICAL",
        description: "vertical",
    },
]
---
::

### shape

The `shape` prop defines the author's avatar container shape. It uses the `AvatarShape` enum.

```vue
<template>
    <Author :shape="AvatarShape.CIRCLE" />
</template>
```

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
    <Author :size="AvatarSize.SM" />
</template>
```

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