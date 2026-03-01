## Component

::component-code
---
srcDir: 'placeholders/ContentPlaceholder.vue'
props: 
    text: "Replace me"
---
::

## Props

::props-table
---
props: [
    {
        "name": "text",
        "default": "Replace me",
        "type": "string",
    },
    {
        "name": "textWrapperClass",
        "type": "string",
    },
    {
        "name": "textClass",
        "type": "string",
    },
]
---
::

## Usage
### text

Displays a custom tex on the placeholder

```vue
<template>
    <ContentPlaceholder text="Replace me" />
</template>
```

- **Type:** `text`
- **Default:** `Replace me`

## Custom styles

The component can be customized with the following props and attributes:

### class

The class of the main wrapper, which can be used to override the default styles.

```vue
<template>
    <ContentPlaceholder class="bg-blue-500" />
</template>
```

### textWrapperClass

The class of the wrapper of the text, which can be used to override the default styles.

```vue
<template>
    <ContentPlaceholder textWrapperClass="py-3 px-4" />
</template>
```

- **Type:** `string`

### textClass

The class of the text, which can be used to override the default styles.

```vue
<template>
    <ContentPlaceholder textClass="text-2xl" />
</template>
```

- **Type:** `string`