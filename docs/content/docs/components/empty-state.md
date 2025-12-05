::component-code
---
srcDir: 'empty-states/EmptyState.vue'
props: 
    title: "Ups! No data found"
    description: "No data found"
    icon: "mdiDatabaseAlertOutline"
    iconClass: "text-icon-neutral-sublest"
    titleClass: "text-base"
    descriptionClass: "text-sm text-text-neutral-subtle"
    orientation: "vertical"
    buttonText: "Add new data"
    buttonIconPosition: "left"
    buttonIcon: "mdiPlus"
    buttonStyleType: "primary-brand-filled"
    hasContainer: false
    containerStyle: "filled-neutral"
    styledContainerClass: ""
items:
    orientation: 
        - value: horizontal
          text: HORIZONTAL
        - value: vertical
          text: VERTICAL
    buttonIconPosition: 
        - value: none
          text: NONE
        - value: left
          text: LEFT
        - value: right
          text: RIGHT
    containerStyle: 
        - value: dashed
          text: DASHED
        - value: filled-neutral
          text: FILLED_NEUTRAL
        - value: filled-primary-brand
          text: FILLED_PRIMARY_BRAND
    buttonStyleType:
        - value: primary-brand-filled
          text: PRIMARY_BRAND_FILLED
        - value: primary-brand-transparent
          text: PRIMARY_BRAND_TRANSPARENT
        - value: primary-brand-soft
          text: PRIMARY_BRAND_SOFT
        - value: secondary-brand-filled
          text: SECONDARY_BRAND_FILLED
        - value: neutral-outlined
          text: NEUTRAL_OUTLINED
        - value: neutral-transparent
          text: NEUTRAL_TRANSPARENT
        - value: neutral-transparent-subtle
          text: NEUTRAL_TRANSPARENT_SUBTLE
        - value: neutral-filled
          text: NEUTRAL_FILLED
        - value: delete-filled
          text: DELETE_FILLED
        - value: delete-outlined
          text: DELETE_OUTLINED
        - value: delete-soft
          text: DELETE_SOFT
        - value: delete-transparent
          text: DELETE_TRANSPARENT
emits:
    buttonClick: "() => console.log('Button clicked')"
previewBackground: 'white'
---
::


## Props

::props-table
---
props: [
    {
        "name": "title",
        "default": "'Ups! No data found'",
        "type": "string",
    },
    {
        "name": "description",
        "type": "string",
    },
    {
        "name": "icon",
        "default": "'mdiDatabaseAlertOutline'",
        "type": "string",
    },
    {
        "name": "iconClass",
        "default": "'text-icon-neutral-sublest'",
        "type": "string",
    },
    {
        "name": "titleClass",
        "type": "string",
    },
    {
        "name": "descriptionClass",
        "default": "'text-sm text-text-neutral-subtle'",
        "type": "string",
    },
    {
        "name": "orientation",
        "default": "Orientation.VERTICAL",
        "type": "Orientation",
    },
    {
        "name": "buttonText",
        "type": "string",
    },
    {
        "name": "buttonIconPosition",
        "type": "string",
    },
    {
        "name": "buttonIcon",
        "type": "string",
    },
    {
        "name": "buttonStyleType",
        "default": "ButtonStyleType.PRIMARY_BRAND_FILLED",
        "type": "ButtonStyleType",
    },
    {
        "name": "hasContainer",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "containerStyle",
        "default": "EmptyPlaceholderContainerStyle.FILLED_NEUTRAL",
        "type": "EmptyPlaceholderContainerStyle",
    },
    {
        "name": "styledContainerClass",
        "type": "string",
    },
]
---
::

## Usage
### title

Displays a custom title

```vue
<template>
    <EmptyState title="Replace me" />
</template>
```

- **Type:** `text`
- **Default:** `Ups! No data found`

### description

Displays a custom description. If discussion is not provided, it will not appear.

```vue
<template>
    <EmptyState description="Example description" />
</template>
```

- **Type:** `text`

### icon

Sets the icon to be displayed.

```vue
<template>
    <EmptyState icon="mdiDatabaseAlertOutline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdiDatabaseAlertOutline'`

### iconClass

Sets custom class to the icon.

```vue
<template>
    <EmptyState iconClass="text-icon-neutral-sublest" />
</template>
```

- **Type:** `string`
- **Default:** `'text-icon-neutral-sublest'`

### titleClass

Sets custom class to the title.

```vue
<template>
    <EmptyState titleClass="text-base" />
</template>
```

- **Type:** `string`

### descriptionClass

Sets custom class to the description.

```vue
<template>
    <EmptyState descriptionClass="text-sm text-text-neutral-subtle" />
</template>
```

- **Type:** `string`
- **Default:** `'text-sm text-text-neutral-subtle'`

### orientation

Sets the layout direction empty state content. Uses the `Orientation` enum.

```vue
<template>
    <EmptyState :orientation="Orientation.VERTICAL" />
</template>
```

#### Options
::options-table
---
options: [
    {
        value: "HORIZONTAL",
        description: "horizontal",
    },
    {
        value: "VERTICAL",
        description: "vertical",
    },
]
---
::

### buttonText

Sets the text of the button.

```vue
<template>
    <EmptyState buttonText="Add new data" />
</template>
```

- **Type:** `string`

### buttonIconPosition

Sets the position of the button icon. Uses the `IconPosition` enum.

```vue
<template>
    <EmptyState :buttonIconPosition="IconPosition.LEFT" />
</template>
```

#### Options
::options-table
---
options: [
    {
        value: "LEFT",
        description: "left",
    },
    {
        value: "RIGHT",
        description: "right",
    },
    {
        value: "NONE",
        description: "none (icon does not appear at all)",
    },
]
---
::

### buttonIcon

Sets the icon of the button.

```vue
<template>
    <EmptyState 
        :buttonIconPosition="IconPosition.LEFT" 
        buttonIcon="mdiPlus" 
    />
</template>
```

- **Type:** `string`

### buttonStyleType

Controls the empty state optional button's visual variant using `ButtonStyleType` enum.

```vue
<template>
    <EmptyState 
        buttonText="Add new"
        :buttonStyleType="ButtonStyleType.PRIMARY_BRAND_FILLED" 
    />
</template>
```

#### Options

::options-table
---
options: [
    {
        value: "PRIMARY_BRAND_FILLED",
        description: "Primary brand filled",
    },
    {
        value: "PRIMARY_BRAND_TRANSPARENT",
        description: "Primary brand transparent",
    },
    {
        value: "PRIMARY_BRAND_SOFT",
        description: "Primary brand soft",
    },
    {
        value: "SECONDARY_BRAND_FILLED",
        description: "Secondary brand filled",
    },
    {
        value: "NEUTRAL_OUTLINED",
        description: "Neutral outlined",
    },
    {
        value: "NEUTRAL_TRANSPARENT",
        description: "Neutral transparent",
    },
    {
        value: "NEUTRAL_TRANSPARENT_SUBTLE",
        description: "Neutral transparent subtle",
    },
    {
        value: "NEUTRAL_FILLED",
        description: "Neutral filled",
    },
    {
        value: "DELETE_FILLED",
        description: "Delete filled",
    },
    {
        value: "DELETE_OUTLINED",
        description: "Delete outlined",
    },
    {
        value: "DELETE_SOFT",
        description: "Delete soft", 
    },
    {
        value: "DELETE_TRANSPARENT",
        description: "Delete transparent",
    },
]
---
::

### hasContainer

Enables the empty state container.

```vue
<template>
    <EmptyState hasContainer />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### containerStyle

Sets the style of the empty state container. Uses the `EmptyPlaceholderContainerStyle` enum.

You need to enable the container first in order to use this option.

```vue
<template>
    <EmptyState 
        hasContainer
        :containerStyle="EmptyPlaceholderContainerStyle.FILLED_PRIMARY_BRAND" 
    />
</template>
```
 
#### Options
::options-table
---
options: [
    {
        value: "DASHED",
        description: "Dashed-styled outline container",
    },
    {
        value: "FILLED_NEUTRAL",
        description: "Light gray background styled container",
    },
    {
        value: "FILLED_PRIMARY_BRAND",
        description: "Soft primary brand background color styled container",
    },
]
---
::

### styledContainerClass

Sets custom class to the main styled container. 

You need to enable the container first in order to use this option.

```vue
<template>
    <EmptyState 
        hasContainer
        styledContainerClass="rounded-2xl"
    />
</template>
```

## Emits
::options-table
---
options: [
    {
        value: "@buttonClick",
        description: "Triggers a callback function when clicking on the button",
    },
]
---
::

#### Example

```vue
<template>
    <EmptyState 
        @buttonClick="handleClick"
    />
</template>
<script setup lang="ts">
const handleClick = () => {
    console.log("Button clicked")
}
</script>
```