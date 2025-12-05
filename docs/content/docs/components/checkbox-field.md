
## Component

::component-code
---
srcDir: 'forms/fields/CheckboxField.vue'
props: 
    id: "field-id"
    label: "Checkbox label text"
    legend: "Sample legend"
    helptText: ""
    modelValue: false
    error: ""
    validator: null
    disabled: false
    required: false
    size: "md"
    inverse: false
items:
    size: 
        - value: lg
          text: LG
        - value: md
          text: MD
external:
  - modelValue
  - error
externalTypes:
  - boolean
  - string
previewBackground: 'white'
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
        "name": "label",
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
        "default": "false",
        "type": "boolean",
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
    <CheckboxField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label 

Sets the label of the field.

```vue
<template>
    <CheckboxField label="Checkbox label text" />
</template>
```

- **Type:** `string`
- **Default:** `'Text'`

### legend 

Sets the legend of the field.

```vue
<template>
    <CheckboxField legend="Sample legend" />
</template>
```

- **Type:** `string`

### helpText

Sets the help text of the field.

```vue
<template>
    <CheckboxField helpText="Help text" />
</template>
```

- **Type:** `string`

### modelValue

Sets the value of the field.

```vue
<template>
    <CheckboxField v-model="isEnabled" />
</template>
<script setup lang="ts">
const isEnabled = ref(false)
</script>
```

### validator

Sets the validator function for the field, which controls its internal validation state.

Since this field expects a boolean value, the `validateBooleanField` utility should be used to perform required field validation.

```vue
<template>
    <CheckboxField :validator="validateBooleanField" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Defines the error message displayed by the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <CheckboxField v-model:error="Error message" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### disabled

Sets the disabled state of the field.

```vue
<template>
    <CheckboxField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### required

Sets the required state of the field.

```vue
<template>
    <CheckboxField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### size

Sets the size of the field. It uses the `ControlFieldSize` enum.

#### Options
::options-table
---
options: [
    {
        value: "LG",
        description: "lg",
    },
    {
        value: "MD",
        description: "md",
    },
]
---
::

### inverse

Sets the checkbox on the right side of the text.

```vue
<template>
    <CheckboxField inverse />
</template>
```

- **Type:** `boolean`
- **Default:** `false`
