## Component

::component-code
---
srcDir: 'content/demos/modals/InfoModalDialogDemo.vue'
props:
    icon: "mdi:information-outline"
    title: "Modal title"
    description: "Modal description"
    buttonCloseText: "Cancel"
    buttonActionText: "Continue"
    buttonActionIcon: "mdi:arrow-right-thin"
    isLoading: false
    loadingText: "Processing..."
    orientation: "vertical"
    cardClass: "max-w-[400px]"
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
    <InfoModalDialog 
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
        cardClass="max-w-[520px]"
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
        "default": "mdi:information-outline",
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
        "default": "Orientation.VERTICAL",
        "type": "Orientation",
    },
    {
        "name": "cardClass",
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
    <InfoModalDialog v-model="showModal" />
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
    <InfoModalDialog icon="mdi:check-bold" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:information-outline'`

### title
Sets the title for the modal.

```vue
<template>
    <InfoModalDialog title="Modal title" />
</template>
```

- **Type:** `string`
- **Default:** `'Modal title'`

### description
Sets the description for the modal.

```vue
<template>
    <InfoModalDialog description="Modal description" />
</template>
```

- **Type:** `string`
- **Default:** `'Modal description'`

### buttonCloseText
Sets the text for the close button.

```vue
<template>
    <InfoModalDialog buttonCloseText="Cancel" />
</template>
```

- **Type:** `string`
- **Default:** `'Cancel'`

### buttonActionText
Sets the text for the action button.

```vue
<template>
    <InfoModalDialog buttonActionText="Delete" />
</template>
```

- **Type:** `string`
- **Default:** `'Delete'`

### buttonActionIcon
Sets the icon for the action button.

```vue
<template>
    <InfoModalDialog buttonActionIcon="mdi:delete-forever-outline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:delete-forever-outline'`

### isLoading
Sets the loading state of the action button.

```vue
<template>
    <InfoModalDialog :isLoading="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### loadingText
Sets the text for the loading state of the action button.

```vue
<template>
    <InfoModalDialog 
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
    <InfoModalDialog :orientation="Orientation.HORIZONTAL" />
</template>
```

- **Type:** `Orientation`
- **Default:** `Orientation.VERTICAL`

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

### cardClass
Sets the classes for the modal card. It can be used to set the maximum width of the modal card.

```vue
<template>
    <InfoModalDialog :cardClass="'max-w-[400px]' />
</template>
```

- **Type:** `string`
- **Default:** `'max-w-[600px]'`

### closeOnClickOutside
Enables to close the modal when clicking outside the modal card. If set to `false`, the modal cannot be closed by clicking outside the modal card.

```vue
<template>
    <InfoModalDialog :closeOnClickOutside="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasCornerCloseButton
Sets the close button to have a corner button. If set to `false`, the close button needs to be be a button inside the modal.

```vue
<template>
    <InfoModalDialog :hasCornerCloseButton="false" />
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