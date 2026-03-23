
## Component

::component-code
---
srcDir: 'forms/Checkbox.vue'
props: 
    id: "checkbox-id"
    modelValue: false
    disabled: false
    size: "md"
items:
    size: 
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
external:
  - modelValue
externalTypes:
  - boolean
enums:
    size: "ControlFieldSize"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
---
::

## Props

::props-table
---
props: [
    {
        "name": "id",
        "required": "true",
        "type": "string",
    },
    {
        "name": "modelValue",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "size",
        "default": "ControlFieldSize.MD",
        "type": "ControlFieldSize",
    },
]
---
::

## Usage

### id

Sets the id of the underlying native checkbox input.

```vue
<template>
    <Checkbox id="my-checkbox" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### modelValue

Controls the checked state of the checkbox. Use `v-model` for two-way binding.

```vue
<template>
    <Checkbox id="my-checkbox" v-model="isChecked" />
</template>
<script setup lang="ts">
const isChecked = ref(false)
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### disabled

Sets the disabled state of the checkbox. When disabled, clicks are ignored and the checkbox appearance reflects the inactive state.

```vue
<template>
    <Checkbox id="my-checkbox" disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### size

Sets the size of the checkbox. It uses the `ControlFieldSize` enum.

```vue
<template>
    <Checkbox id="my-checkbox" :size="ControlFieldSize.LG" />
</template>
```

- **Type:** `ControlFieldSize`
- **Default:** `ControlFieldSize.MD`

#### Options
::options-table
---
options: [
    {
        value: "XS",
        description: "Extra Small",
    },
    {
        value: "SM",
        description: "Small",
    },
    {
        value: "MD",
        description: "Medium",
    },
    {
        value: "LG",
        description: "Large",
    },
]
---
::