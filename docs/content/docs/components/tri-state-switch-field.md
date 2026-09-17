
## Component

::component-code
---
srcDir: 'forms/fields/switch/TriStateSwitchField.vue'
props: 
    id: "field-id"
    label: "Switch label text"
    legend: "Example legend"
    helptText: "Example help text"
    modelValue: "unchecked"
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
    styleType:
        - value: brand
          text: BRAND
        - value: success
          text: SUCCESS
external:
  - modelValue
  - error
externalTypes:
  - TriStateValue
  - string
enums:
    modelValue: "TriStateValue"
    size: "ControlFieldSize"
    styleType: "SwitchStyle"
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
        "default": "ControlFieldSize.MD",
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
    <TriStateSwitchField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label 

Sets the label of the field.

```vue
<template>
    <TriStateSwitchField label="Switch label text" />
</template>
```

- **Type:** `string`

### legend

Sets the legend text of the field.

```vue
<template>
    <TriStateSwitchField legend="Legend text" />
</template>
```

- **Type:** `string`

### helpText

Sets the help text of the field.

```vue
<template>
    <TriStateSwitchField helpText="Help text" />
</template>
```

- **Type:** `string`

### modelValue

Controls the state of the field. Use `v-model` for two-way binding. It uses the `TriStateValue` enum.

Clicking or pressing space always resolves to `TriStateValue.CHECKED` or `TriStateValue.UNCHECKED`. `TriStateValue.INDETERMINATE` can only be set programmatically.

```vue
<template>
    <TriStateSwitchField v-model="state" />
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
        description: "The switch is off.",
    },
    {
        value: "CHECKED",
        description: "The switch is on.",
    },
    {
        value: "INDETERMINATE",
        description: "The switch is in a partial/mixed state.",
    },
]
---
::

### validator

Sets the validator function for the field, which controls its internal validation state.

```vue
<template>
    <TriStateSwitchField :validator="myValidator" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Defines the error message displayed by the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <TriStateSwitchField v-model:error="Error message" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### required

Sets the required state of the field.

```vue
<template>
    <TriStateSwitchField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### disabled

Sets the disabled state of the field.

```vue
<template>
    <TriStateSwitchField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### size

Sets the size of the field. It uses the `ControlFieldSize` enum.

```vue
<template>
    <TriStateSwitchField :size="ControlFieldSize.LG" />
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

### icon

Sets the icon of the field.

```vue
<template>
    <TriStateSwitchField icon="mdi:check" />
</template>
```

- **Type:** `string`

### styleType

Sets the style type of the field. It uses the `SwitchStyle` enum.

```vue
<template>
    <TriStateSwitchField :styleType="SwitchStyle.SUCCESS" />
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
        description: "Uses the primary brand color for the background when the switch is on or indeterminate.",
    },
    {
        value: "SUCCESS",
        description: "Uses the success color for the background when the switch is on or indeterminate.",
    },
]
---
::

### fitToContent

When set to `true`, the switch field will adjust its width to fit its content, rather than stretching to fill the container.

```vue
<template>
    <TriStateSwitchField fitToContent />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### checkboxWrapperClass

Sets additional classes for the checkbox wrapper element.

```vue
<template>
    <TriStateSwitchField checkboxWrapperClass="custom-checkbox-wrapper" />
</template>
```

- **Type:** `string`

### labelClass

Sets additional classes for the label element.

```vue
<template>
    <TriStateSwitchField labelClass="custom-label-class" />
</template>
```

- **Type:** `string`
