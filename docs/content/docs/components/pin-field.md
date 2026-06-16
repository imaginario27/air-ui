
## Component

::component-code
---
srcDir: 'forms/fields/PinField.vue'
props: 
    id: "field-id"
    modelValue: "1234"
    type: "string"
    length: 4
    size: "md"
    label: "Enter PIN"
    placeholder: "•"
    helpText: "Your PIN should be 4 digits."
    helpTextPosition: "bottom"
    mask: false
    maskCharacter: "•"
    uppercase: false
    validator: null
    error: ""
    disabled: false
    transparent: false
    required: false
    autofocus: false
    otp: false
items:
    size: 
        - value: lg
          text: LG
        - value: md
          text: MD
    type:
        - value: string
          text: String
        - value: number
          text: Number
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
        "name": "modelValue",
        "default": "''",
        "type": "string",
    },
    {
        "name": "type",
        "default": "string",
        "type": "'string' | 'number'",
    },
    {
        "name": "length",
        "default": "4",
        "type": "number",
    },
    {
        "name": "size",
        "default": "InputSize.MD",
        "type": "InputSize",
    },
    {
        "name": "label",
        "type": "string",
    },
    {
        "name": "placeholder",
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
        "name": "mask",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "maskCharacter",
        "default": "'•'",
        "type": "string",
    },
    {
        "name": "uppercase",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "validator",
        "type": "Function",
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
        "name": "autofocus",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "otp",
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

### modelValue
The value of the field.

```vue
<template>
    <InputField v-model="pin" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### type
Sets the type of the field, which controls the allowed input characters and the mobile keyboard type.

```vue
<template>
    <InputField type="number" />
</template>
```

- **Type:** `'string' | 'number'`
- **Default:** `'string'`

### length
Sets the number of inputs to display.

```vue
<template>
    <InputField :length="6" />
</template>
```

- **Type:** `number`
- **Default:** `4`

### size
Sets the size of the inputs. It uses the `InputSize` enum.

```vue
<template>
    <InputField :size="InputSize.LG" />
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

### label
Sets the label of the field.

```vue
<template>
    <InputField label="Enter PIN" />
</template>
```

- **Type:** `string`

### placeholder
Sets the placeholder of the inputs.

```vue
<template>
    <InputField placeholder="•" />
</template>
```

- **Type:** `string`

### helpText
Sets the help text of the field.

```vue
<template>
    <InputField helpText="Your PIN should be 4 digits." />
</template>
```

- **Type:** `string`

### helpTextPosition

Sets the position of the help text relative to the field. It uses the `Position` enum.

```vue
<template>
    <PinField helpTextPosition="top" helpText="Appears above the field" />
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

### mask
If `true`, the input will be masked.

```vue
<template>
    <InputField mask />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### maskCharacter
Sets the mask character of the inputs when `mask` is `true`.

```vue
<template>
    <InputField mask maskCharacter="*" />
</template>
```

- **Type:** `string`
- **Default:** `'•'`

### uppercase
If `true`, the input will be transformed to uppercase.

```vue
<template>
    <InputField uppercase />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### validator

Sets the validator function for the field, which controls its internal validation state.

It uses the `validateField` utility to perform required field validation.

```vue
<template>
    <PinField :validator="validateField" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Sets the error message of the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <PinField v-model:error="errorMessage" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### disabled
If `true`, the field will be disabled.

```vue
<template>
    <PinField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### required
If `true`, the field will be required.

```vue
<template>
    <PinField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### autofocus
If `true`, the first input will be focused on mount.

```vue
<template>
    <PinField autofocus />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### otp
If `true`, the field will be optimized for one-time password (OTP) input, which may include features like auto-focusing the next input after a character is entered.

```vue
<template>
    <PinField otp />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### transparent

When `true`, removes the default `bg-background-container-surface` background from each pin input, making them transparent.

```vue
<template>
    <PinField transparent />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### inputClass

Applies additional CSS classes directly to each `<input>` element, appended last so they can override other classes.

```vue
<template>
    <PinField inputClass="font-mono text-lg" />
</template>
```

- **Type:** `string`