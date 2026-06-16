
## Component

::component-code
---
srcDir: 'forms/fields/InputField.vue'
props: 
    id: "field-id"
    label: "Label"
    type: "text"
    placeholder: "Placeholder"
    helpText: "Help text example"
    helpTextPosition: "bottom"
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
    transparent: false
    required: false
    inputClass: null
items:
    size: 
        - value: lg
          text: LG
        - value: md
          text: MD
    helpTextPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
enums:
    size: "InputSize"
    helpTextPosition: "Position"
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
        "name": "helpTextPosition",
        "default": "Position.BOTTOM",
        "type": "Position",
    },
    {
        "name": "icon",
        "type": "string",
    },
    {
        "name": "suffixIcon",
        "type": "string",
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
        "default": "InputSize.MD",
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
    {
        "name": "transparent",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "inputClass",
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
    <InputField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label 

Sets the label of the field.

```vue
<template>
    <InputField label="Label text" />
</template>
```

- **Type:** `string`

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

### helpTextPosition

Sets the position of the help text relative to the input field. It uses the `Position` enum.

```vue
<template>
    <InputField helpTextPosition="top" helpText="Appears above the field" />
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
        description: "top",
    },
    {
        value: "BOTTOM",
        description: "bottom",
    },
]
---
::

### icon

Sets the icon of the input field.

```vue
<template>
    <InputField icon="mdi:account" />
</template>
```

- **Type:** `string`

### suffixIcon

Sets the suffix icon of the input field.

```vue
<template>
    <InputField suffixIcon="mdi:eye" />
</template>
```

- **Type:** `string`

### linkText

Sets the link text of the input field when the type is `password`.

```vue
<template>
    <InputField linkText="Forgot password?" />
</template>
```

- **Type:** `string`

### linkUrl

Sets the link URL of the input field when the type is `password`.

```vue
<template>
    <InputField linkUrl="/reset-password" />
</template>
```

- **Type:** `string`

### size

Sets the size of the input field. It uses the `InputSize` enum.

```vue
<template>
    <InputField :size="InputSize.MD" />
</template>
```

- **Type:** `InputSize`
- **Default:** `InputSize.MD`

#### Options
::options-table
---
options: [
    {
        value: "MD",
        description: "md",
    },
    {
        value: "LG",
        description: "lg",
    },
]
---
::

### modelValue

Sets the value of the input field.

```vue
<template>
    <InputField v-model="inputValue" />
</template>
<script setup lang="ts">
const inputValue = ref<string | number | null>('')
</script>
```

- **Type:** `string | number | null`
- **Default:** `''`

### validator

Sets the validator function for the field, which controls its internal validation state.

It uses the `validateField` utility to perform required field validation.

```vue
<template>
    <InputField :validator="validateField" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Sets the error message of the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <InputField v-model:error="errorMessage" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### maxLength

Sets the maximum length of the input field.

```vue
<template>
    <InputField :maxLength="10" />
</template>
```

- **Type:** `number`

### filterAlphabetic

Sets whether to filter alphabetic characters in the input field.

```vue
<template>
    <InputField filterAlphabetic />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### permitNegativeNumber

Sets whether to permit negative numbers in the input field (only for type `number`).

```vue
<template>
    <InputField permitNegativeNumber />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasShowPasswordButton

Sets whether to show the "show password" button (only for type `password`).

```vue
<template>
    <InputField hasShowPasswordButton />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### min

Sets the minimum value of the input field (only for type `number`).

```vue
<template>
    <InputField :min="0" />
</template>
```

- **Type:** `string`

### max

Sets the maximum value of the input field (only for type `number`).

```vue
<template>
    <InputField :max="100" />
</template>
```

- **Type:** `string`

### step

Sets the step value of the input field (only for type `number`).

```vue
<template>
    <InputField :step="1" />
</template>
```

- **Type:** `string`

### pattern

Sets the pattern attribute of the input field.

```vue
<template>
    <InputField pattern="[A-Za-z]{3}" />
</template>
```

- **Type:** `string`

### readonly

Sets the readonly state of the field.

```vue
<template>
    <InputField readonly />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### autocomplete

Sets the autocomplete attribute of the input field.

```vue
<template>
    <InputField autocomplete="on" />
</template>
```

- **Type:** `string`
- **Default:** `'off'`

### autofocus

Sets the autofocus state of the field.

```vue
<template>
    <InputField autofocus />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### disabled

Sets the disabled state of the field.

```vue
<template>
    <InputField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### required

Sets the required state of the field.

```vue
<template>
    <InputField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### transparent

When `true`, removes the default `bg-background-container-surface` background from the input container, making it transparent.

```vue
<template>
    <InputField transparent />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### inputClass

Applies additional CSS classes directly to the `<input>` element, appended last so they can override other classes.

```vue
<template>
    <InputField inputClass="text-right font-mono" />
</template>
```

- **Type:** `string`