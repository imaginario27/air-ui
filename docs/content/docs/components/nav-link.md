## Component

::component-code
---
srcDir: 'navigation/links/NavLink.vue'
props: 
    text: "Link text"
    size: "sm"
    icon: "mdi:arrow-right-thin"
    iconPosition: "none"
    disabled: false
    to: "/"
    isExternal: false
    textClass: "font-semibold"
items:
    iconPosition: 
        - value: none
          text: None
        - value: left
          text: Left
        - value: right
          text: Right
    size: 
        - value: 2xl
          text: XXL
        - value: xl
          text: XL
        - value: lg
          text: LG
        - value: md
          text: MD
        - value: sm
          text: SM
        - value: xs
          text: XS
---
::

## Props

::props-table
---
props: [
    {
        "name": "text",
        "default": "Link text",
        "type": "string",
    }, 
    {
        "name": "align",
        "default": "NavLinkSize.SM",
        "type": "NavLinkSize",
    },
    {
        "name": "icon",
        "default": "mdi:arrow-right-thin",
        "type": "string",
    },
    {
        "name": "iconPosition",
        "default": "IconPosition.NONE",
        "type": "IconPosition",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
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
        "name": "textClass",
        "default": "`font-semibold`",
        "type": "string",
    },
]
---
::

## Usage
### text
Sets the text of the link. 

```vue
<template>
    <NavLink 
        text="Link text"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Link text'`

### size
Sets the size of the link. Uses the `NavLinkSize` enum.

```vue
<template>
    <NavLink 
        :size="NavLinkSize.LG"
    />
</template>
```

- **Type:** `NavLinkSize`
- **Default:** `NavLinkSize.SM`

#### Options

::options-table
---
options: [
    {
        value: "XXL",
        description: "Large size.",
    },
    {
        value: "XL",
        description: "Medium size.",
    },
    {
        value: "LG",
        description: "Small size.",
    },
    {
        value: "MD",
        description: "Medium size.",
    },
    {
        value: "SM",
        description: "Small size.",
    },
    {
        value: "XS",
        description: "Small size.",
    },
]
---
::

### icon
Sets the icon of the link.

```vue
<template>
    <NavLink 
        icon="mdi:arrow-right-thin"
    />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:arrow-right-thin'`

### iconPosition
Sets the position of the icon. Uses the `IconPosition` enum.

```vue
<template>
    <NavLink 
        :iconPosition="IconPosition.LEFT"
    />
</template>
```

- **Type:** `IconPosition`
- **Default:** `IconPosition.NONE`

#### Options

::options-table
---
options: [
    {
        value: "NONE",
        description: "No icon.",
    },
    {
        value: "LEFT",
        description: "Icon on the left side of the text.",
    },
    {
        value: "RIGHT",
        description: "Icon on the right side of the text.",
    },
]
---
::

### disabled
Sets the disabled state of the link. 

```vue
<template>
    <NavLink 
        disabled
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### to
Sets the link to the desired route. 

```vue
<template>
    <NavLink 
        to="/some/route"
    />
</template>
```

- **Type:** `string`
- **Default:** `'/'`

### isExternal
Sets the link to an external route. 

```vue
<template>
    <NavLink 
        isExternal
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### textClass
Sets the class of the text. 

```vue
<template>
    <NavLink 
        textClass="font-semibold"
    />
</template>
```

- **Type:** `string`
- **Default:** `'font-semibold'`