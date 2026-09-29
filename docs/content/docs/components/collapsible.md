## Component

::component-code
---
srcDir: 'collapsibles/Collapsible.vue'
props: 
    modelValue: false
    title: "Item title"
    titleClass: ""
    titleWrapperClass: ""
    actionsWrapperClass: ""
    buttonSize: "md"
slots:
    default: ""
    title-suffix: ""
    header-suffix: ""
slotComponents:
    default:
        srcDir: 'placeholders/ContentPlaceholder.vue'
        props:
            text: "Insert content here"
    title-suffix:
        srcDir: 'placeholders/ContentPlaceholder.vue'
        props:
            text: "Insert title suffix here"
    header-suffix:
        srcDir: 'placeholders/ContentPlaceholder.vue'
        props:
            text: "Insert header suffix here"
items:
    buttonSize: 
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
enums:
    buttonSize: "ButtonSize"
external:
  - modelValue
externalTypes:
  - boolean
---
::

## Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "default": false,
        "type": "boolean",
    },
    {
        "name": "title",
        "default": "'Item title'",
        "type": "string",
    },
    {
        "name": "titleClass",
        "type": "string",
    },
    {
        "name": "titleWrapperClass",
        "type": "string",
    },
    {
        "name": "actionsWrapperClass",
        "type": "string",
    },
    {
        "name": "buttonSize",
        "default": "ButtonSize.MD",
        "type": "ButtonSize",
    },
]
---
::

## Slots
::slots-table
---
slots: [
    {
        name: "default",
        description: "Slot to render the collapsible content",
    },
    {
        name: "title-suffix",
        description: "Template to render content right after the title, such as a badge or an icon.",
    },
    {
        name: "header-suffix",
        description: "Template to render content before the expand/collapse icon button, such as buttons or other components.",
    },
]
---
::

```vue
<template>
    <Collapsible
        title="My collapsible title"
    >
        <!-- Insert content here -->
    </ActionPanel>
</template>
```

## Usage
### modelValue
Provides a way to control the open/closed state of the collapsible from a parent component. By default default, it handles open state internally.

`modelValue` is particularly useful when you want to trigger toggle state from outside of the collapsiable or from the slot itself.

```vue
<template>
    <Collapsible 
        v-model="isOpen" 
        title="My collapsible title"
    >
        <button @click="isOpen = false">Close from inside</button>
    </Collapsible>

    <button @click="isOpen = true">Open from outside</button>
</template>
<script setup lang="ts">
const isOpen = ref(false)
</script>

### title
Collapsible item title.

```vue
<template>
    <Collapsible
        title="My collapsible title"
    >
        <!-- Insert content here -->
    </ActionPanel>
</template>
```

- **Type:** `string`
- **Default:** `'Item title'`

### titleClass
Adds extra classes to the title `<span>`, appended after the base styling.

```vue
<template>
    <Collapsible
        title="My collapsible title"
        titleClass="text-lg"
    >
        <!-- Insert content here -->
    </Collapsible>
</template>
```

- **Type:** `string`

### titleWrapperClass
Adds extra classes to the wrapper `<div>` around the title and the `title-suffix` slot, appended after the base styling.

```vue
<template>
    <Collapsible
        title="My collapsible title"
        titleWrapperClass="items-center"
    >
        <!-- Insert content here -->
    </Collapsible>
</template>
```

- **Type:** `string`

### actionsWrapperClass
Adds extra classes to the wrapper `<div>` around the `header-suffix` slot and the expand/collapse icon button, appended after the base styling.

```vue
<template>
    <Collapsible
        title="My collapsible title"
        actionsWrapperClass="items-center"
    >
        <!-- Insert content here -->
    </Collapsible>
</template>
```

- **Type:** `string`

### buttonSize
Controls the size of the expand/collapse icon button via `ButtonSize` enum.

```vue
<template>
    <Collapsible
        title="My collapsible title"
        :buttonSize="ButtonSize.LG"
    >
        <!-- Insert content here -->
    </Collapsible>
</template>
```

- **Type:** `ButtonSize`
- **Default:** `ButtonSize.MD`

#### Options
::options-table
---
options: [
    {
        value: "XS",
        description: "xs",
    },
    {
        value: "SM",
        description: "sm",
    },
    {
        value: "MD",
        description: "md",
    },
    {
        value: "LG",
        description: "lg",
    },
    {
        value: "XL",
        description: "xl",
    },
    {
        value: "XXL",
        description: "2xl",
    },
]
---
::