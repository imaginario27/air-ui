
## Component

::component-code
---
srcDir: 'forms/fields/InputField.vue'
props: 
    id: "field-id"
    label: "Input label text"
    type: "text"
    placeholder: "Placeholder"
    helpText: "Help text example"
    icon: null
    suffixIcon: null
    linkText: null
    linkUrl: null
    size: "md"
    modelValue: ""
    validator: null
    error: ""
    maxLength: null
    filterAlphabetic: false
    permitNegativeNumber: false
    hasShowPasswordButton: true
    min: null
    max: null
    step: null
    pattern: null
    readonly: false
    autocomplete: "off"
    autofocus: false
    disabled: false
    required: false
items:
    size: 
        - value: lg
          text: LG
        - value: md
          text: MD
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
        "name": "type",
        "default": "'text'",
        "type": "AllowedInputType",
    },
    {
        "name": "placeholder",
        "default": "'Placeholder'",
        "type": "string",
    },
    {
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "icon",
        "type": "any",
    },
    {
        "name": "suffixIcon",
        "type": "any",
    },
    {
        "name": "linkText",
        "type": "string",
    },
    {
        "name": "linkUrl",
        "type": "string",
    },
    {
        "name": "size",
        "default": "'md'",
        "type": "InputSize",
    },
    {
        "name": "modelValue",
        "default": "''",
        "type": "string | number | null",
    },
    {
        "name": "validator",
        "type": "Function",
    },
    {
        "name": "error",
        "type": "string",
    },
    {
        "name": "maxLength",
        "type": "number",
    },
    {
        "name": "filterAlphabetic",
        "type": "boolean",
    },
    {
        "name": "permitNegativeNumber",
        "type": "boolean",
    },
    {
        "name": "hasShowPasswordButton",
        "type": "boolean",
    },
    {
        "name": "min",
        "type": "string",
    },
    {
        "name": "max",
        "type": "string",
    },
    {
        "name": "step",
        "type": "string",
    },
    {
        "name": "pattern",
        "type": "string",
    },
    {
        "name": "readonly",
        default": "false",
        "type": "boolean",
    },
    {
        "name": "autocomplete",
        "default": "'off'",
        "type": "string",
    },
    {
        "name": "autofocus",
        "default": "false",
        "type": "boolean",
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

### type

Sets the type of the input field. It uses the `AllowedInputType` type.

For the rest of native HTML input types, please use the specific components provided by AirUI.

```vue
<template>
    <InputField type="text" />
</template>
```

- **Type:** `AllowedInputType`
    ```ts
    export type AllowedInputType =
        | 'color'
        | 'email'
        | 'number'
        | 'password'
        | 'tel'
        | 'text'
        | 'url'
        | 'date'
        | 'datetime-local'
        | 'time'
        | 'month'
        | 'week'
    ```

- **Default:** `'text'`

### placeholder

Sets the placeholder text of the input field.

```vue
<template>
    <InputField placeholder="Placeholder" />
</template>
```

- **Type:** `string`
- **Default:** `'Placeholder'`

### helpText

Sets the help text displayed below the input field.

```vue
<template>
    <InputField helpText="Help text example" />
</template>
```

- **Type:** `string`

### icon

Sets the icon of the input field.

```vue
<template>
    <InputField icon="mdiAccount" />
</template>
```

- **Type:** `any`

### required

Sets the required state of the field.

```vue
<template>
    <InputField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`