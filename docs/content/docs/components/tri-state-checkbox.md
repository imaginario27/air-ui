
## Component

::component-code
---
srcDir: 'forms/fields/checkbox/TriStateCheckbox.vue'
props: 
    id: "tri-state-checkbox-id"
    modelValue: "unchecked"
    disabled: false
    size: "md"
items:
    modelValue:
        - value: unchecked
          text: UNCHECKED
        - value: checked
          text: CHECKED
        - value: indeterminate
          text: INDETERMINATE
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
  - TriStateValue
enums:
    modelValue: "TriStateValue"
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
        "default": "TriStateValue.UNCHECKED",
        "type": "TriStateValue",
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
    <TriStateCheckbox id="my-checkbox" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### modelValue

Controls the state of the checkbox. Use `v-model` for two-way binding. It uses the `TriStateValue` enum.

Clicking or pressing space always resolves to `TriStateValue.CHECKED` or `TriStateValue.UNCHECKED`. `TriStateValue.INDETERMINATE` can only be set programmatically (for example, from a parent "select all" checkbox computing a partial-selection state), matching how tri-state checkboxes behave natively.

```vue
<template>
    <TriStateCheckbox id="my-checkbox" v-model="state" />
</template>
<script setup lang="ts">
const state = ref<TriStateValue>(TriStateValue.INDETERMINATE)
</script>
```

- **Type:** `TriStateValue`
- **Default:** `TriStateValue.UNCHECKED`

#### Options
::options-table
---
options: [
    {
        value: "UNCHECKED",
        description: "The checkbox is unchecked.",
    },
    {
        value: "CHECKED",
        description: "The checkbox is checked.",
    },
    {
        value: "INDETERMINATE",
        description: "The checkbox is in a partial/mixed state. Renders a dash icon and sets aria-checked to \"mixed\".",
    },
]
---
::

### disabled

Sets the disabled state of the checkbox. When disabled, clicks are ignored and the checkbox appearance reflects the inactive state.

```vue
<template>
    <TriStateCheckbox id="my-checkbox" disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### size

Sets the size of the checkbox. It uses the `ControlFieldSize` enum.

```vue
<template>
    <TriStateCheckbox id="my-checkbox" :size="ControlFieldSize.LG" />
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
