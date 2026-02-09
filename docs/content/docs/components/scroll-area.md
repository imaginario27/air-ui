
## Component

::component-code
---
srcDir: 'scroll/ScrollArea.vue'
props: 
    scrollOrientation: "vertical"
    maxHeight: 300
    hasBorder: false
items:
    scrollOrientation: 
        - value: vertical
          text: VERTICAL
        - value: horizontal
          text: HORIZONTAL
        - value: both
          text: BOTH
slots:
    default: ""
slotComponents:
    default:
        srcDir: 'content/demos/scroll/ScrollContentDemo.vue'
        componentSource: 'docs'
previewBackground: 'white'
---
::


## Props

::props-table
---
props: [
    {
        "name": "scrollOrientation",
        "default": "ScrollOrientation.VERTICAL",
        "type": "ScrollOrientation",
    },
    {
        "name": "maxHeight",
        "default": 300,
        "type": "number",
    },
    {
        "name": "hasBorder",
        "default": false,
        "type": "boolean",
    },
]
---
::

## Usage
### scrollOrientation

The `scrollOrientation` prop determines the orientation of the scroll area. It accepts values from the `ScrollOrientation` enum.

```vue
<template>
    <ScrollArea 
        :scrollOrientation="ScrollOrientation.VERTICAL"  
    />
</template>
```

- **Type:** `ScrollOrientation`
- **Default:** `ScrollOrientation.VERTICAL`

#### Options
::options-table
---
options: [
    {
        value: "VERTICAL",
        description: "Vertical scroll orientation",
    },
    {
        value: "HORIZONTAL",
        description: "Horizontal scroll orientation",
    },
    {
        value: "BOTH",
        description: "Both axes scroll orientation",
    },
]
---
::

### maxHeight
The `maxHeight` prop sets the maximum height of the scroll area in pixels. If the content exceeds this height, a scrollbar will appear.

```vue
<template>
    <ScrollArea 
        :maxHeight="400"  
    />
</template>
```

- **Type:** `number`
- **Default:** `300`

### hasBorder
The `hasBorder` prop determines whether the scroll area should have a border. When set to `true`, a border will be applied around the scroll area.

```vue
<template>
    <ScrollArea 
        hasBorder  
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`