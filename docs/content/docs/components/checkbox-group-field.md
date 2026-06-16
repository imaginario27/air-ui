
## Component

::component-code
---
srcDir: 'forms/fields/checkbox/CheckboxGroupField.vue'
props:
    label: "Label"
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
    modelValue:
        - "option2"
    validator: null
    error: ""
    required: false
    disabled: false
    helpText: "Select one or more options."
    helpTextPosition: "bottom"
    inverse: false
    orientation: "vertical"
items:
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
enums:
    orientation: "Orientation"
    helpTextPosition: "Position"
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
        "name": "label",
        "type": "string",
    },
    {
        "name": "options",
        "required": "true",
        "type": "CheckboxOption[]",
    },
    {
        "name": "modelValue",
        "required": "true",
        "type": "(string | number | boolean)[]",
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
### label

Sets the label of the field group.

```vue
<template>
    <CheckboxGroupField label="Choose options" />
</template>
```

- **Type:** `string`

### options

Sets the options for the checkboxes.

```vue
<template>
    <CheckboxGroupField :options="exampleOptions" />
</template>
<script setup lang="ts">
const exampleOptions: CheckboxOption[] = [
    { id: 'option1', value: 'option1', label: 'Option 1' },
    { id: 'option2', value: 'option2', label: 'Option 2' },
    { id: 'option3', value: 'option3', label: 'Option 3' },
]
</script>
```

- **Type:** `CheckboxOption[]`
- **Required:** `true`

#### TypeScript interface
```ts
interface CheckboxOption {
    id: string | number
    value: string | number | boolean
    label?: string
    ariaLabel?: string
    helpText?: string
    disabled?: boolean
}
```

::content-alert
---
props:
    title: "Accessibility"
    description: "If an option hides its visual label (for example, `label: ''`), provide `ariaLabel` so screen readers still announce an accessible name."
---
::

### modelValue

Sets the array of currently selected values.

```vue
<template>
    <CheckboxGroupField
        v-model="selectedValues"
        :options="exampleOptions"
    />
</template>
<script setup lang="ts">
const selectedValues = ref<(string | number | boolean)[]>([])
const exampleOptions: CheckboxOption[] = [
    { id: 'option1', value: 'option1', label: 'Option 1' },
    { id: 'option2', value: 'option2', label: 'Option 2' },
    { id: 'option3', value: 'option3', label: 'Option 3' },
]
</script>
```

- **Type:** `(string | number | boolean)[]`
- **Required:** `true`

### validator

Sets the validator function for the field, which controls its internal validation state.

It can use the following validation utilities:
- `validateField`
- `validateBooleanField`

```vue
<template>
    <CheckboxGroupField :validator="validateField" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Sets the error message of the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <CheckboxGroupField v-model:error="errorMessage" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### required

Sets whether the field is required.

```vue
<template>
    <CheckboxGroupField required />
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
    description: "Each checkbox option can also be individually disabled by setting the `disabled` property on the option object. If the `disabled` prop is set on the `CheckboxGroupField`, it will override the individual option settings and disable all options."
---
::

```vue
<template>
    <CheckboxGroupField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### helpText

Sets the help text of the field.

```vue
<template>
    <CheckboxGroupField helpText="This is some help text." />
</template>
```

- **Type:** `string`

### inverse

Sets whether the checkbox is displayed on the right side of the text.

```vue
<template>
    <CheckboxGroupField inverse />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### orientation

Sets the orientation of the checkboxes.

```vue
<template>
    <CheckboxGroupField orientation="Orientation.HORIZONTAL" />
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
        description: "Checkbox options are displayed vertically.",
    },
    {
        value: "HORIZONTAL",
        description: "Checkbox options are displayed in a two-column grid.",
    },
]
---
::

### helpTextPosition

Sets the position of the help text relative to the field group.

```vue
<template>
    <CheckboxGroupField helpTextPosition="top" helpText="Appears above the options" />
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
