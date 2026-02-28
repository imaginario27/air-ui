## Component

::component-code
---
srcDir: 'content/demos/drawers/DrawerDemo.vue'
previewBackground: "white"
isCodePreviewEnabled: false
componentSource: 'docs'
---
::

```vue
<template>
    <Drawer 
        v-model="showDrawer" 
        :direction="Direction.RIGHT"
    >
        <ContentPlaceholder text="Insert content here" />
    </Drawer>
        
    <ActionButton 
        :styleType="ButtonStyleType.NEUTRAL_FILLED"
        text="Open drawer"
        @click="showDrawer = true"
    />
</template>
<script setup lang="ts">
// States
const showDrawer = ref(false)
</script>
```

## Architecture
The `Drawer` component is a modal that slides in from the edge of the screen. It can be used to display additional content or actions without navigating away from the current page.

```vue
<template>
    <Drawer 
        v-model="showDrawer"
        :direction="currentDirection"
    >
        <ContentPlaceholder text="Insert content here" />
    </Drawer>
</template>
```

## Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "direction",
        "default": "Direction.RIGHT",
        "type": "Direction",
    },
    {
        "name": "maxSize",
        "default": "320",
        "type": "number",
    },
    {
        "name": "hasHeader",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "hasCloseButton",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "hasOverlay",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "closeOnOverlayClick",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "title",
        "default": "'Drawer'",
        "type": "string",
    },
    {
        "name": "titleHeadingTag",
        "default": "'h2'",
        "type": "'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
    },
    {
        "name": "buttonCloseIcon",
        "default": "'mdi:close'",
        "type": "string",
    },
    {
        "name": "hasBorder",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "drawerClass",
        "default": "",
        "type": "string",
    },
    {
        "name": "overlayClass",
        "default": "",
        "type": "string",
    }, 
]
---
::

## Usage
### modelValue
Sets the modal to open or close.

```vue
<template>
    <Drawer v-model="showDrawer" >
        ...
    </Drawer>
</template>
<script setup="ts">
const showDrawer = ref(false)
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### direction
Sets the direction from which the drawer will appear. It can uses the `Direction` enum.

```vue
<template>
    <Drawer :direction="Direction.LEFT">
        ...
    </Drawer>
</template>
```

- **Type:** `Direction`
- **Default:** `Direction.RIGHT`

#### Options
::options-table
---
options: [
    {
        value: "Direction.LEFT",
        description: "The drawer appears from the left",
    },
    {
        value: "Direction.RIGHT",
        description: "The drawer appears from the right",
    },
    {
        value: "Direction.TOP",
        description: "The drawer appears from the top",
    },
    {
        value: "Direction.BOTTOM",
        description: "The drawer appears from the bottom",
    },
]
---
::

### maxSize
Defines the maximum size of the drawer in pixels. For left and right directions, it sets the max width, while for top and bottom directions, it sets the max height.

```vue
<template>
    <Drawer :maxSize="400">
        ...
    </Drawer>
</template>
```

- **Type:** `number`
- **Default:** `320`

### hasHeader
Determines whether the drawer should display a header section containing the title and close button.

```vue
<template>
    <Drawer :hasHeader="false">
        ...
    </Drawer>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### hasCloseButton
Controls the visibility of the close button in the drawer header.

```vue<template>
    <Drawer :hasCloseButton="false">
        ...
    </Drawer>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### closeOnOverlayClick
Enables closing the drawer when the user clicks on the overlay outside of the drawer content.

```vue
<template>
    <Drawer :closeOnOverlayClick="false">
        ...
    </Drawer>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### title
Sets the text to be displayed as the drawer's title in the header.

```vue<template>
    <Drawer title="My Custom Title">
        ...
    </Drawer>
</template>
```

- **Type:** `string`
- **Default:** `'Drawer'`

### titleHeadingTag
Defines the HTML heading tag used for the drawer title in the header.

```vue
<template>
    <Drawer :titleHeadingTag="'h3'">
        ...
    </Drawer>
</template>
```

- **Type:** `'h2' | 'h3' | 'h4' | 'h5' | 'h6'`
- **Default:** `'h2'`

### buttonCloseIcon
Specifies the icon to be used for the close button in the drawer header. It accepts any valid icon name from the integrated icon library.

```vue
<template>
    <Drawer buttonCloseIcon="mdi:close-circle">
        ...
    </Drawer>
</template>
```

- **Type:** `string`
- **Default:** `'mdi:close'`

### hasBorder
Determines whether the drawer should have a border. If set to `false`, the drawer will be rendered without a border, creating a more seamless look with the surrounding content.

```vue
<template>
    <Drawer :hasBorder="false">
        ...
    </Drawer>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### drawerClass
Allows you to pass custom CSS classes to the drawer element for additional styling.

```vue
<template>
    <Drawer drawerClass="custom-drawer-class">
        ...
    </Drawer>
</template>
```

- **Type:** `string`

### overlayClass
Allows you to pass custom CSS classes to the overlay element for additional styling.

```vue
<template>
    <Drawer 
        hasOverlay
        overlayClass="custom-overlay-class"
    >
        ...
    </Drawer>
</template>
```

- **Type:** `string`