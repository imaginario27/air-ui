
## Component

::component-code
---
srcDir: 'forms/fields/SwitchField.vue'
props: 
    id: "field-id"
    label: "Switch label text"
    legend: "Example legend"
    helptText: "Example help text"
    modelValue: false
    validator: null
    error: ""
    required: false
    disabled: false
    size: "md"
    icon: null
    styleType: "brand"
    fitToContent: false
    checkboxWrapperClass: ""
    labelClass: ""
items:
    size: 
        - value: lg
          text: LG
        - value: md
          text: MD
    styleType:
        - value: brand
          text: BRAND
        - value: success
          text: SUCCESS
external:
  - modelValue
  - error
externalTypes:
  - boolean
  - string
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
        "name": "required",
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
        "default": "'md'",
        "type": "ControlFieldSize",
    },
    {
        "name": "icon",
        "type": "string",
    },
    {
        "name": "styleType",
        "default": "SwitchStyle.BRAND",
        "type": "SwitchStyle",
    },
    {
        "name": "fitToContent",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "checkboxWrapperClass",
        "type": "string",
    },
    {
        "name": "labelClass",
        "type": "string",
    },
]
---
::

## Usage
### id 

Sets the id of the field.

```vue
<template>
    <SwitchField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label 

Sets the label of the field.

```vue
<template>
    <SwitchField label="Switch label text" />
</template>
```

- **Type:** `string`
- **Default:** `'Text'`

### legend

Sets the legend text of the field.

```vue
<template>
    <SwitchField legend="Legend text" />
</template>
```

- **Type:** `string`

### helpText

Sets the help text of the field.

```vue
<template>
    <SwitchField helpText="Help text" />
</template>
```

- **Type:** `string`

### modelValue

Sets the value of the field.

```vue
<template>
    <SwitchField v-model="isEnabled" />
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
    <SwitchField :validator="validateBooleanField" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Defines the error message displayed by the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <SwitchField v-model:error="Error message" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### required

Sets the required state of the field.

```vue
<template>
    <SwitchField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### disabled

Sets the disabled state of the field.

```vue
<template>
    <SwitchField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`


### size

Sets the size of the field. It uses the `ControlFieldSize` enum.

```vue
<template>
    <SwitchField :size="ControlFieldSize.LG" />
</template>
```

- **Type:** `ControlFieldSize`
- **Default:** `ControlFieldSize.MD`

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

### icon

Sets the icon of the field.

```vue
<template>
    <SwitchField icon="mdi:check" />
</template>
```

- **Type:** `string`

### styleType

Sets the style type of the field. It uses the `SwitchStyle` enum.

```vue
<template>
    <SwitchField :styleType="SwitchStyle.SUCCESS" />
</template>
```

- **Type:** `SwitchStyle`
- **Default:** `SwitchStyle.BRAND`

#### Options
::options-table
---
options: [
    {
        value: "BRAND",
        description: "Uses the primary brand color for the background when the switch is on.",
    },
    {
        value: "SUCCESS",
        description: "Uses the success color for the background when the switch is on.",
    },
]
---
::

### fitToContent

When set to `true`, the switch field will adjust its width to fit its content, rather than stretching to fill the container.

```vue
<template>
    <SwitchField fitToContent />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### checkboxWrapperClass

Sets additional classes for the checkbox wrapper element.

```vue
<template>
    <SwitchField checkboxWrapperClass="custom-checkbox-wrapper" />
</template>
```

- **Type:** `string`

### labelClass

Sets additional classes for the label element.

```vue
<template>
    <SwitchField labelClass="custom-label-class" />
</template>
```

- **Type:** `string`