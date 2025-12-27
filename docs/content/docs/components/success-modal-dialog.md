## Component

::component-code
---
srcDir: 'content/demos/modals/SuccessModalDialogDemo.vue'
props:
    icon: "mdiCheckBold"
    title: "Modal title"
    description: "Modal description"
    buttonText: "Close"
    cardClasses: "max-w-[400px]"
    closeOnClickOutside: true
    hasCornerCloseButton: false
previewBackground: "white"
isCodePreviewEnabled: false
componentSource: 'docs'
---
::

```vue
<template>
    <SuccessModalDialog 
        v-model="showModal"
        icon="mdiCheckBold
        title="Modal title"
        description="Modal description"
        buttonText="Close"
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
        "default": "'mdiCheckBold'",
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
        "name": "buttonText",
        "default": "'Close'",
        "type": "string",
    },
    {
        "name": "cardClasses",
        "default": "'max-w-[400px]'",
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
    <SuccessModalDialog v-model="showModal" />
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
    <SuccessModalDialog icon="mdiCheckBold" />
</template>
```

- **Type:** `string`
- **Default:** `'mdiCheckBold'`

### title
Sets the title for the modal.

```vue
<template>
    <SuccessModalDialog title="Modal title" />
</template>
```

- **Type:** `string`
- **Default:** `'Modal title'`

### description
Sets the description for the modal.

```vue
<template>
    <SuccessModalDialog description="Modal description" />
</template>
```

- **Type:** `string`
- **Default:** `'Modal description'`

### buttonText
Sets the text for the close button.

```vue
<template>
    <SuccessModalDialog buttonText="Close" />
</template>
```

- **Type:** `string`
- **Default:** `'Close'`


### cardClasses
Sets the classes for the modal card. It can be used to set the maximum width of the modal card.

```vue
<template>
    <ModalDialog :cardClasses="'max-w-[400px]' />
</template>
```

- **Type:** `string`
- **Default:** `'max-w-[600px]'`

### closeOnClickOutside
Enables to close the modal when clicking outside the modal card. If set to `false`, the modal cannot be closed by clicking outside the modal card.

```vue
<template>
    <SuccessModalDialog :closeOnClickOutside="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasCornerCloseButton
Sets the close button to have a corner button. If set to `false`, the close button needs to be be a button inside the modal.

```vue
<template>
    <SuccessModalDialog :hasCornerCloseButton="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`
