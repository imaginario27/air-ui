## Component

::component-code
---
srcDir: 'content/demos/modals/ModalDialogDemo.vue'
previewBackground: "white"
isCodePreviewEnabled: false
componentSource: 'docs'
---
::

```vue
<template>
    <ModalDialog v-model="showModal">
        <ContentPlaceholder text="Insert content here"/>
    </ModalDialog>
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

## Architecture
The `ModalDialog` component body can be composed freely with the structure you prefer. Nonetheless, tt is recommended to use the `ModalContent` component to wrap the content of the modal.

```vue
<template>
    <ModalDialog 
        :modelValue 
        :closeOnClickOutside="false"
        :hasCornerCloseButton="true"
        id="modal-example
        @update:modelValue="updateModelValue"
    >
        <!-- Custom content layout -->
        <ModalContent>  
            <!-- Optional modal title -->
            <ModalTitle title="My modal title" /> 

            <!-- Modal content -->
        </ModalContent>
    </ModalDialog>
</template>
```

## Components
This set of components can be used inside the default slot of `ModalDialog`, preferably inside the `ModalContent` component.

::components-table
---
components: [
    {
        name: "<ModalTitle>",
        description: "Defines the modal’s title. Recommended for accessibility and consistent typography.",
    },
    {
        name: "<ModalSubtitle>",
        description: "Defines the modal’s subtitle. Can be used if the modal requires a secondary title.",
    },
    {
        name: "<ModalDescription>",
        description: "Provides a short, descriptive message below the title. Ideal for context or additional instructions.",
    },
    {
        name: "<ModalHeaderGroup>",
        description: "Wraps both the title and description in a pre-styled layout. Useful when you want consistent spacing and alignment between heading and supporting text.",
    },
    {
        name: "<ModalActions>",
        description: "Container for action buttons or links at the bottom of the modal. Optimized for responsive layouts, especially on mobile. Avoid using this if you're placing a form or components that already manage modal behavior internally.",
    },
    {
        name: "<ModalHeadings>",
        description: "Container for headings such as ModalTitle and ModalSubtitle. Useful when you want to use more than one title. Otherwise, you can use the ModalTitle component without this container.",
    },
]
---
::


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
        "name": "closeOnClickOutside",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "hasCornerCloseButton",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "overlayClass",
        "type": "string",
    },
    {
        "name": "containerClass",
        "type": "string",
    },
    {
        "name": "cardClass",
        "type": "string",
        "default": "'max-w-[600px]'",
    },
    {
        "name": "id",
        "type": "string",
    },
    {
        "name": "closeAriaLabel",
        "default": "'Close'",
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
    <ModalDialog v-model="showModal" >
        ...
    </ModalDialog>
</template>
<script setup="ts">
const showModal = ref(false)
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### closeOnClickOutside
Enables to close the modal when clicking outside the modal card. If set to `false`, the modal cannot be closed by clicking outside the modal card.

```vue
<template>
    <ModalDialog :closeOnClickOutside="false" >
        ...
    </ModalDialog>
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasCornerCloseButton
Sets the close button to have a corner button. If set to `false`, the close button needs to be be a button inside the modal.

```vue
<template>
    <ModalDialog :hasCornerCloseButton="false" >
        ...
    </ModalDialog>
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### overlayClass
Sets the classes for the modal overlay.

```vue
<template>
    <ModalDialog :overlayClass="'bg-black/50'" >
        ...
    </ModalDialog>
</template>
```
- **Type:** `string`

### containerClass
Sets the classes for the modal container. 

```vue
<template>
    <ModalDialog :containerClass="'p-4'" >
        ...
    </ModalDialog>
</template>
```

### cardClass
Sets the classes for the modal card. It can be used to set the maximum width of the modal card.

```vue
<template>
    <ModalDialog :cardClass="'max-w-[600px]' >
        ...
    </ModalDialog>
</template>
```

- **Type:** `string`
- **Default:** `'max-w-[600px]'`

### id
Sets the id of the modal.

```vue
<template>
    <ModalDialog :id="'modal'" >
        ...
    </ModalDialog>
</template>
```

- **Type:** `string`

### closeAriaLabel
The `closeAriaLabel` prop sets the accessible label for the close button. Override it for i18n.

```vue
<template>
    <ModalDialog closeAriaLabel="Cerrar">
        ...
    </ModalDialog>
</template>
```

- **Type:** `string`
- **Default:** `'Close'`

## Prop-based Components
Some of the components listed in the table above accept specific props to customize their behavior or appearance.

The remaining components can be used without any props and rely on their default slot content for rendering.

### ModalTitle
#### title
Sets the title.

```vue
<template>
    <ModalTitle title="My modal title" />
</template>
```

- **Type:** `string`
- **Default:** `'Modal title'`


### ModalSubtitle
#### title
Sets the subtitle.

```vue
<template>
    <ModalSubtitle title="My modal subtitle" />
</template>
```

- **Type:** `string`
- **Default:** `'Modal subtitle'`

### ModalHeaderGroup
#### centered
Sets the title and description to be centered. If `false`, the title and description will be aligned to the left.

```vue
<template>
    <ModalHeaderGroup centered >
        <ModalTitle title="My modal title">
        <ModalDescription>
            ...
        </ModalDescription>
    </ModalHeaderGroup>
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### ModalActions
#### reverseOnMobile
Sets the order of the actions in the modal. When set to `true`, actions are placed at the bottom of the modal layout.

Since `true` is the default value, you only need to pass this prop if you want to disable this behavior by setting it to `false`.

```vue
<template>
    <ModalActions reverseOnMobile >
        <ActionButton 
            text="close"
            @click="closeModal"
        />
        <ActionButton 
            :styleType="ButtonStyleType.PRIMARY_BRAND_FILLED"
            text="save"
            @click="saveModal"
        />
    </ModalActions>
</template>
<script setup="ts">
const closeModal = () => {
    emit('update:modelValue', value)
}
const saveModal = () => {
    console.log('save')
}
</script>
```

- **Type:** `boolean`
- **Default:** `true`