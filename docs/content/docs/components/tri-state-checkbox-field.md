
## Component

::component-code
---
srcDir: 'forms/fields/checkbox/TriStateCheckboxField.vue'
props: 
    id: "field-id"
    label: "Checkbox label text"
    legend: "Sample legend"
    helptText: ""
    modelValue: "unchecked"
    error: ""
    validator: null
    disabled: false
    required: false
    size: "md"
    inverse: false
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
  - error
externalTypes:
  - TriStateValue
  - string
enums:
    modelValue: "TriStateValue"
    size: "ControlFieldSize"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
propsSettingsExcludedProps: ['validator']
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
        "name": "label",
        "default": "'Text'",
        "type": "string",
    },
    {
        "name": "legend",
        "type": "string",
    },
    {
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "modelValue",
        "default": "TriStateValue.UNCHECKED",
        "type": "TriStateValue",
    },
    {
        "name": "validator",
        "default": "null",
        "type": "function",
    },
    {
        "name": "error",
        "default": "''",
        "type": "string",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "required",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "size",
        "default": "ControlFieldSize.MD",
        "type": "ControlFieldSize",
    },
    {
        "name": "inverse",
        "default": "false",
        "type": "boolean",
    },
]
---
::

## Usage
### id 

Sets the id of the field.

```vue
<template>
    <TriStateCheckboxField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label 

Sets the label of the field.

```vue
<template>
    <TriStateCheckboxField label="Checkbox label text" />
</template>
```

- **Type:** `string`
- **Default:** `'Text'`

### legend 

Sets the legend of the field.

```vue
<template>
    <TriStateCheckboxField legend="Sample legend" />
</template>
```

- **Type:** `string`

### helpText

Sets the help text of the field.

```vue
<template>
    <TriStateCheckboxField helpText="Help text" />
</template>
```

- **Type:** `string`

### modelValue

Controls the state of the field. Use `v-model` for two-way binding. It uses the `TriStateValue` enum.

Clicking or pressing space always resolves to `TriStateValue.CHECKED` or `TriStateValue.UNCHECKED`. `TriStateValue.INDETERMINATE` can only be set programmatically.

```vue
<template>
    <TriStateCheckboxField v-model="state" />
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
        description: "The checkbox is in a partial/mixed state.",
    },
]
---
::

### validator

Sets the validator function for the field, which controls its internal validation state.

```vue
<template>
    <TriStateCheckboxField :validator="myValidator" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Defines the error message displayed by the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <TriStateCheckboxField v-model:error="Error message" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### disabled

Sets the disabled state of the field.

```vue
<template>
    <TriStateCheckboxField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### required

Sets the required state of the field.

```vue
<template>
    <TriStateCheckboxField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### size

Sets the size of the field. It uses the `ControlFieldSize` enum.

```vue
<template>
    <TriStateCheckboxField :size="ControlFieldSize.LG" />
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

### inverse

Sets the checkbox on the right side of the text.

```vue
<template>
    <TriStateCheckboxField inverse />
</template>
```

- **Type:** `boolean`
- **Default:** `false`
