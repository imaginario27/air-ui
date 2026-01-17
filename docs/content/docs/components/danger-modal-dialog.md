## Component

::component-code
---
srcDir: 'content/demos/modals/DangerModalDialogDemo.vue'
props:
    icon: "mdi:alert-outline"
    title: "Modal title"
    description: "Modal description"
    buttonCloseText: "Cancel"
    buttonActionText: "Delete"
    buttonActionIcon: "mdi:delete-forever-outline"
    isLoading: false
    loadingText: "Processing..."
    orientation: "horizontal"
    cardClasses: "max-w-[400px]"
    closeOnClickOutside: true
    hasCornerCloseButton: false
items:
    orientation: 
        - value: horizontal
          text: HORIZONTAL
        - value: vertical
          text: VERTICAL
previewBackground: "white"
isCodePreviewEnabled: false
componentSource: 'docs'
---
::

```vue
<template>
    <DangerModalDialog 
        v-model="showModal"
        icon="mdi:check-bold"
        title="Modal title"
        description="Modal description"
        buttonCloseText="Cancel"
        buttonActionText="Delete"
        buttonActionIcon="mdi:delete"
        :isLoading="false"
        loadingText="Processing..."
        :orientation="Orientation.VERTICAL"
        cardClasses="max-w-[520px]"
        :closeOnClickOutside="false"
        :hasCornerCloseButton="false"
    />
    <ActionButton 
        :styleType="ButtonStyleType.NEUTRAL_FILLED"
        text="Open Modal"
        @click="showModal = true"
    />
</template>
<script setup lang="ts">
const showModal = ref(false)
</script>
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
        "name": "icon",
        "default": "mdi:alert-outline",
        "type": "string",
    },
    {
        "name": "title",
        "default": "'Modal title'",
        "type": "string",
    },
    {
        "name": "description",
        "default": "'Modal description'",
        "type": "string",
    },
    {
        "name": "buttonCloseText",
        "default": "'Cancel'",
        "type": "string",
    },
    {
        "name": "buttonActionText",
        "default": "'Delete'",
        "type": "string",
    },
    {
        "name": "buttonActionIcon",
        "default": "'mdi:delete-forever-outline'",
        "type": "string",
    },
    {
        "name": "isLoading",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "loadingText",
        "default": "'Processing...'",
        "type": "string",
    },
    {
        "name": "orientation",
        "default": "Orientation.HORIZONTAL",
        "type": "Orientation",
    },
    {
        "name": "cardClasses",
        "default": "'max-w-[520px]'",
        "type": "string",
    },
    {
        "name": "closeOnClickOutside",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "hasCornerCloseButton",
        "default": "false",
        "type": "boolean",
    },
]
---
::

## Usage
### modelValue
Sets the modal to open or close.

```vue
<template>
    <DangerModalDialog v-model="showModal" />
</template>
<script setup="ts">
const showModal = ref(false)
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### icon
Sets the icon for the modal.

```vue
<template>
    <DangerModalDialog icon="mdi:check-bold" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:alert-outline'`

### title
Sets the title for the modal.

```vue
<template>
    <DangerModalDialog title="Modal title" />
</template>
```

- **Type:** `string`
- **Default:** `'Modal title'`

### description
Sets the description for the modal.

```vue
<template>
    <DangerModalDialog description="Modal description" />
</template>
```

- **Type:** `string`
- **Default:** `'Modal description'`

### buttonCloseText
Sets the text for the close button.

```vue
<template>
    <DangerModalDialog buttonCloseText="Cancel" />
</template>
```

- **Type:** `string`
- **Default:** `'Cancel'`

### buttonActionText
Sets the text for the action button.

```vue
<template>
    <DangerModalDialog buttonActionText="Delete" />
</template>
```

- **Type:** `string`
- **Default:** `'Delete'`

### buttonActionIcon
Sets the icon for the action button.

```vue
<template>
    <DangerModalDialog buttonActionIcon="mdi:delete-forever-outline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:delete-forever-outline'`

### isLoading
Sets the loading state of the action button.

```vue
<template>
    <DangerModalDialog :isLoading="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### loadingText
Sets the text for the loading state of the action button.

```vue
<template>
    <DangerModalDialog 
        :isLoading="true"
        loadingText="Loading..." 
    />
</template>
```

- **Type:** `string`
- **Default:** `'Processing...'`

### orientation
Sets the layout direction of the panel’s actions content. Uses the `Orientation` enum.

```vue
<template>
    <DangerModalDialog :orientation="Orientation.HORIZONTAL" />
</template>
```

- **Type:** `Orientation`
- **Default:** `Orientation.HORIZONTAL`

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

### cardClasses
Sets the classes for the modal card. It can be used to set the maximum width of the modal card.

```vue
<template>
    <DangerModalDialog :cardClasses="'max-w-[400px]' />
</template>
```

- **Type:** `string`
- **Default:** `'max-w-[600px]'`

### closeOnClickOutside
Enables to close the modal when clicking outside the modal card. If set to `false`, the modal cannot be closed by clicking outside the modal card.

```vue
<template>
    <DangerModalDialog :closeOnClickOutside="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasCornerCloseButton
Sets the close button to have a corner button. If set to `false`, the close button needs to be be a button inside the modal.

```vue
<template>
    <DangerModalDialog :hasCornerCloseButton="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

## Emits
::options-table
---
options: [
    {
        value: "@action",
        description: "Triggers a custom action when clicking on the action button.",
    },
    {
        value: "@close",
        description: "Triggers a custom action after closing the modal.",
    },
]
---
::