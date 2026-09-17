
## Component

::component-code
---
srcDir: 'forms/fields/radio/RadioGroupField.vue'
props: 
    label: "Label"
    name: "radio-group"
    options: 
        - id: "option1"
          value: "option1"
          label: "Option 1"
        - id: "option2"
          value: "option2"
          label: "Option 2"
        - id: "option3"
          value: "option3"
          label: "Option 3"
    modelValue: "option2"
    validator: null
    error: ""
    type: "default"
    required: false
    disabled: false
    helpText: "Select one of the options."
    helpTextPosition: "bottom"
    inverse: false
    size: "md"
    orientation: "vertical"
items:
    type: 
        - value: default
          text: DEFAULT
        - value: button
          text: BUTTON
    orientation:
        - value: vertical
          text: VERTICAL
        - value: horizontal
          text: HORIZONTAL
    helpTextPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
    size:
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
enums:
    type: "RadioType"
    orientation: "Orientation"
    helpTextPosition: "Position"
    size: "ControlFieldSize"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
propsSettingsExcludedProps: ['validator', 'options']
---
::

## Props

::props-table
---
props: [
    {
        "name": "name",
        "required": "true",
        "type": "string",
    },
    {
        "name": "label",
        "type": "string",
    },
    {
        "name": "options",
        "required": "true",
        "type": "RadioOption[]",
    },
    {
        "name": "modelValue",
        "required": "true",
        "type": "string | number | boolean | null",
    },
    {
        "name": "validator",
        "default": "null",
        "type": "(value: unknown) => string | null",
    },
    {
        "name": "error",
        "default": "''",
        "type": "string",
    },
    {
        "name": "type",
        "default": "'default'",
        "type": "RadioType",
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
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "inverse",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "size",
        "default": "ControlFieldSize.MD",
        "type": "ControlFieldSize",
    },
    {
        "name": "helpTextPosition",
        "default": "Position.BOTTOM",
        "type": "Position",
    },
    {
        "name": "orientation",
        "default": "'vertical'",
        "type": "Orientation",
    }    
]
---
::

## Usage
### name

Sets the name of the radio button group.

```vue
<template>
    <RadioGroupField name="radio-group" />
</template>
```

### label 

Sets the label of the field.

```vue
<template>
    <RadioGroupField label="Label text" />
</template>
```

- **Type:** `string`

### Options

Sets the options for the radio buttons.

```vue
<template>
    <RadioGroupField 
        :options="exampleOptions" 
    />
</template>
<script setup lang="ts">
const exampleOptions: RadioOption[] = [
    { id: 'option1', value: 'option1', label: 'Option 1' },
    { id: 'option2', value: 'option2', label: 'Option 2' },
    { id: 'option3', value: 'option3', label: 'Option 3' },
]
</script>
```

- **Type:** `RadioOption[]`
- **Required:** `true`

#### TypeScript interface
```ts
interface RadioOption {
    id: string | number
    value: string | number | boolean
    label?: string
    ariaLabel?: string
    helpText?: string
    disabled?: boolean
    type?: ColorAccent.INFO | ColorAccent.SUCCESS | ColorAccent.DANGER | ColorAccent.PRIMARY_BRAND | ColorAccent.SECONDARY_BRAND
    icon?: string
}
```

::content-alert
---
props:
    title: "Accessibility"
    description: "If an option hides its visual label (for example, `label: ''`), provide `ariaLabel` so screen readers still announce an accessible name."
---
::

```vue
<script setup lang="ts">
const exampleOptions: RadioOption[] = [
    { id: 'icon-only', value: 'icon-only', label: '', ariaLabel: 'Icon only option' },
    { id: 'with-label', value: 'with-label', label: 'Option with label' },
]
</script>
```

### modelValue

Sets the selected value of the radio button group.

```vue
<template>
    <RadioGroupField 
        v-model="selectedValue" 
        :options="exampleOptions" 
    />
</template>
<script setup lang="ts">
const selectedValue = ref<string | number | boolean | null>(null)
const exampleOptions: RadioOption[] = [
    { id: 'option1', value: 'option1', label: 'Option 1' },
    { id: 'option2', value: 'option2', label: 'Option 2' },
    { id: 'option3', value: 'option3', label: 'Option 3' },
]
</script>
```

- **Type:** `string | number | boolean | null`
- **Required:** `true`

### validator

Sets the validator function for the field, which controls its internal validation state.

It can use the following validations utilities:
- `validateField`
- `validateBooleanField`

```vue
<template>
    <RadioGroupField :validator="validateField" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Sets the error message of the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <RadioGroupField v-model:error="errorMessage" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### type

Sets the style type of the radio buttons.

```vue
<template>
    <RadioGroupField :type="RadioType.BUTTON" />
</template>
```

- **Type:** `RadioType`
- **Default:** `RadioType.DEFAULT`

#### Options
::options-table
---
options: [
    {
        value: "DEFAULT",
        description: "Uses the default radio button style.",
    },
    {
        value: "BUTTON",
        description: "Uses the button type for radio buttons with icons and boxed style.",
    },
]
---
::

### required

Sets whether the field is required.

```vue
<template>
    <RadioGroupField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### disabled

Sets whether the field is disabled.

::content-alert
---
props:
    title: "Important"
    description: "Each radio option can also be individually disabled by setting the `disabled` property on the option object. If the `disabled` prop is set on the `RadioGroupField`, it will override the individual option settings and disable all options."
---
::

```vue
<template>
    <RadioGroupField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### helpText

Sets the help text of the field.

```vue

<template>
    <RadioGroupField helpText="This is some help text." />
</template>
```

- **Type:** `string`

### inverse

Sets whether the radio button is displayed on the right side of the text.

::content-alert
---
props:
    title: "Important"
    description: "This prop is only applicable when the `type` prop is set to `RadioType.DEFAULT`."
---
::

```vue
<template>
    <RadioGroupField inverse />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### size

Sets the size of the radio options in the group. It uses the `ControlFieldSize` enum.

```vue
<template>
    <RadioGroupField :size="ControlFieldSize.LG" />
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

### orientation

Sets the orientation of the radio buttons.

```vue
<template>
    <RadioGroupField orientation="Orientation.VERTICAL" />
</template>
```

- **Type:** `Orientation`
- **Default:** `Orientation.VERTICAL`

#### Options
::options-table
---
options: [
    {
        value: "VERTICAL",
        description: "Radio options are displayed vertically.",
    },
    {
        value: "HORIZONTAL",
        description: "Radio options are displayed in a two-column grid.",
    },
]
---
::

### helpTextPosition

Sets the position of the help text relative to the field group.

```vue
<template>
    <RadioGroupField helpTextPosition="top" helpText="Appears above the options" />
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

#### Options
::options-table
---
options: [
    {
        value: "TOP",
        description: "Help text is displayed above the options.",
    },
    {
        value: "BOTTOM",
        description: "Help text is displayed below the options.",
    },
]
---
::