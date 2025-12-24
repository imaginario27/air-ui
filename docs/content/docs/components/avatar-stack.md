
## Component

::component-code
---
srcDir: 'avatars/AvatarStack.vue'
props: 
    shape: "circle"
    size: "md"
    isInteractive: true
    itemsLimit: 3
    counterType: "ellipsis"
    items:
        - displayName: "John Doe"
        - displayName: "Sarah Penny"
        - displayName: "Rachel Kross"
        - displayName: "Jadie Miller"
        - displayName: "Alicia Mels"
items:
    shape:
        - value: circle
          text: CIRCLE
        - value: square
          text: SQUARE
    size:
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
    counterType:
        - value: ellipsis
          text: ELLIPSIS
        - value: counter
          text: COUNTER
external:
  - items
externalTypes:
  - Avatar[]
propsSettingsExcludedProps: ['items']
---
::


## Props

::props-table
---
props: [
    {
        "name": "items",
        "default": "An example array",
        "type": "Avatar[]"
    },
    {
        "name": "shape",
        "default": "AvatarShape.CIRCLE",
        "type": "AvatarShape",
    },
    {
        "name": "size",
        "default": "AvatarSize.SM",
        "type": "AvatarStackSize",
    },
    {
        "name": "isInteractive",
        "type": "boolean",
    },
    {
        "name": "itemsLimit",
        "default": "null",
        "type": "number | null",
    },
    {
        "name": "counterType",
        "default": "StackCounterType.ELLIPSIS",
        "type": "StackCounterType",
    },
]
---
::


## Usage

### items
The `items` prop is an array of `Avatar` objects that will be displayed in the stack. Each `Avatar` object should have a `displayName` property.

```vue
<template>
    <AvatarStack :items="exampleItems" />
</template>
<script setup lang="ts">
const exampleItems = ref<Avatar[]>([
    {
        displayName: "John Doe",
    },
    {
        displayName: "Sarah Penny",
    },
    {
        displayName: "Rachel Kross",
    },
    {
        displayName: "Jadie Miller",
    },
    {
        displayName: "Alicia Mels",
    },
])
</script>
```

- **Type:** `Avatar[]`
- **Default:** `An example array`

#### TypeScript interface
```ts
interface Avatar {
    displayName: string
    imgUrl?: string
}
```

### shape

The `shape` prop defines the avatar stack's container shape. It uses the `AvatarShape` enum.

```vue
<template>
    <AvatarStack :shape="AvatarShape.CIRCLE" />
</template>
```

- **Type:** `AvatarShape`
- **Default:** `AvatarShape.CIRCLE`

#### Options

::options-table
---
options: [
    {
        value: "CIRCLE",
        description: "Circular shape",
    },
    {
        value: "SQUARE",
        description: "Square shape",
    },
]
---
::

### size

The `size` prop determines the overall dimensions of the avatar stacks items. It accepts values from `AvatarStackSize` enums.

```vue
<template>
    <AvatarStack :size="AvatarStackSize.MD" />
</template>
```

- **Type:** `AvatarStackSize`
- **Default:** `AvatarStackSize.MD`

#### Options

::options-table
---
options: [
    {
        value: "XS",
        description: "X-small size",
    },
    {
        value: "SM",
        description: "Small size",
    },
    {
        value: "MD",
        description: "Medium size",
    },
    {
        value: "LG",
        description: "Large size",
    },
    {
        value: "XL",
        description: "Extra Large size",
    },
    {
        value: "XXL",
        description: "2X-large size",
    },
    {
        value: "XXXL",
        description: "3X-large size",
    },
    {
        value: "XXXL",
        description: "4X-large size",
    },  
]
---
::


### itemsLimit
The `itemsLimit` prop sets the maximum number of items displayed in the badge stack.

```vue
<template>
    <AvatarStack :itemsLimit="3" />
</template>
```

- **Type:** `number | null`
- **Default:** `null`

### counterType

Sets the counter type. It will only appear if the `itemsLimit` prop is set to a value lower than the amount of items. It uses the `StackCounterType` enum.

```vue
<template>
    <AvatarStack :itemsLimit="3" :counterType="StackCounterType.COUNTER" />
</template>
```

- **Type:** `StackCounterType`
- **Default:** `StackCounterType.ELLIPSIS`

#### Options

::options-table
---
options: [
    {
        value: "COUNTER",
        description: [
            "If the total amount of items is higher than: ",
            { type: "code", content: "itemsLimit" },
            "it will display a counter with the amount of items that are remaining from the total. In case of having more than 9 items, it will display '+9'.",
        ],
    },
    {
        value: "ELLIPSIS",
        description: "In the event of more items than the limit or the base limit (9 items), it will display an ellipsis (...).",
    },
]
---
::