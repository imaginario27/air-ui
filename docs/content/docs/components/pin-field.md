
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
    responsiveSize: false
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
    readonly: false
    transparent: false
    required: false
    showOptionalLabel: true
    optionalLabel: null
    autofocus: false
    otp: false
    glowColorMode: "none"
    glowTrigger: "focus"
    glowType: "inner"
    glowOpacity: 40
    glowSize: null
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
    glowColorMode:
        - value: none
          text: NONE
        - value: both
          text: BOTH
        - value: light
          text: LIGHT
        - value: dark
          text: DARK
    glowTrigger:
        - value: always
          text: ALWAYS
        - value: hover
          text: HOVER
        - value: focus
          text: FOCUS
        - value: hoverFocus
          text: HOVER_FOCUS
    glowType:
        - value: outer
          text: OUTER
        - value: inner
          text: INNER
enums:
    glowColorMode: "GlowColorMode"
    glowTrigger: "GlowTrigger"
    glowType: "GlowType"
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
        "name": "responsiveSize",
        "default": "null",
        "type": "boolean",
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
        "name": "readonly",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "required",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "showOptionalLabel",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "optionalLabel",
        "type": "string",
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
    {
        "name": "glowColorMode",
        "default": "GlowColorMode.NONE",
        "type": "GlowColorMode",
    },
    {
        "name": "glowTrigger",
        "default": "GlowTrigger.FOCUS",
        "type": "GlowTrigger",
    },
    {
        "name": "glowType",
        "default": "GlowType.INNER",
        "type": "GlowType",
    },
    {
        "name": "glowOpacity",
        "default": "40",
        "type": "number",
    },
    {
        "name": "glowSize",
        "type": "number",
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

### responsiveSize

Makes the field taller on mobile so it is easier to tap. When `size` is `InputSize.MD`, it is `InputSize.LG` below the `lg` breakpoint and `InputSize.MD` from `lg` up. Other sizes do not change.

```vue
<template>
    <PinField :responsiveSize="true" />
</template>
```

When the prop is not set, it follows `forms.responsiveSize` of the DS config, which is `false` by default. Pass `false` to keep a single field at its own size on mobile even when the config turns it on for the whole project. See [Configuration](/docs/getting-started/configuration).

- **Type:** `boolean`
- **Default:** `null` (follows `forms.responsiveSize` of the DS config, `false` by default)

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

### readonly

Sets the readonly state. The value is still displayed but the user cannot change it.

```vue
<template>
    <PinField readonly />
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

### showOptionalLabel

When the field is not `required`, shows an "(optional)" hint next to the label. Set to `false` to hide it. The hint text defaults to a global setting that can be overridden project-wide, and can also be overridden per field with the `optionalLabel` prop.

```vue
<template>
    <PinField label="Enter PIN" :showOptionalLabel="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### optionalLabel

Overrides the "(optional)" hint text for this specific field, taking priority over the global default.

```vue
<template>
    <PinField label="Enter PIN" optionalLabel="(not required)" />
</template>
```

- **Type:** `string`

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

When `true`, removes the default `bg-background-field` background from each pin input, making them transparent.

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

### glowColorMode

Draws a glow around the pin boxes only. The label and the help text do not glow. It is shown in light mode, dark mode, both or none, and it uses the `GlowColorMode` enum. It is `GlowColorMode.NONE` by default, so the field has no glow until you turn it on.

The glow uses the brand color and turns to the error color when the field has an error.

```vue
<template>
    <PinField :glowColorMode="GlowColorMode.DARK" />
</template>
```

- **Type:** `GlowColorMode`
- **Default:** `GlowColorMode.NONE` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

#### Options
::options-table
---
options: [
    {
        value: "NONE",
        description: "No glow.",
    },
    {
        value: "BOTH",
        description: "Glow in light and dark mode.",
    },
    {
        value: "LIGHT",
        description: "Glow in light mode only.",
    },
    {
        value: "DARK",
        description: "Glow in dark mode only.",
    },
]
---
::

### glowTrigger

Sets when the glow appears. It uses the `GlowTrigger` enum and works together with `glowColorMode`, which decides in which theme the glow shows. It is `GlowTrigger.FOCUS` by default.

`FOCUS` shows the glow while the field has focus. On touch screens there is no hover, so with `HOVER` the glow never shows.

```vue
<template>
    <PinField :glowColorMode="GlowColorMode.BOTH" :glowTrigger="GlowTrigger.FOCUS" />
</template>
```

- **Type:** `GlowTrigger`
- **Default:** `GlowTrigger.FOCUS` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

#### Options
::options-table
---
options: [
    {
        value: "ALWAYS",
        description: "The glow is always visible.",
    },
    {
        value: "HOVER",
        description: "The glow shows while the pointer is over the field.",
    },
    {
        value: "FOCUS",
        description: "The glow shows while the field has focus.",
    },
    {
        value: "HOVER_FOCUS",
        description: "The glow shows on hover and on focus.",
    },
]
---
::

### glowType

Sets where the glow is drawn. It uses the `GlowType` enum and works together with `glowColorMode`. It is `GlowType.INNER` by default.

```vue
<template>
    <PinField :glowColorMode="GlowColorMode.BOTH" :glowType="GlowType.INNER" />
</template>
```

- **Type:** `GlowType`
- **Default:** `GlowType.INNER` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

#### Options
::options-table
---
options: [
    {
        value: "OUTER",
        description: "The glow spreads around the outside of the element.",
    },
    {
        value: "INNER",
        description: "The glow is drawn inside the element, along its edges.",
    },
]
---
::

### glowOpacity

Sets how strong the glow is, from `0` (invisible) to `100` (full color). The default is `40`. Values move in steps of 5, so `42` is rounded to `40`. It has no effect while `glowColorMode` is `GlowColorMode.NONE`.

```vue
<template>
    <PinField :glowColorMode="GlowColorMode.BOTH" :glowOpacity="30" />
</template>
```

- **Type:** `number`
- **Default:** `40` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

### glowSize

Sets how far the glow spreads, in pixels. It is `null` by default, so each component keeps its own size (for example, buttons follow their `size`). Values move in steps of 2 from `0` to `64`, so `13` is rounded to `14`. It has no effect while `glowColorMode` is `GlowColorMode.NONE`.

```vue
<template>
    <PinField :glowColorMode="GlowColorMode.BOTH" :glowSize="32" />
</template>
```

- **Type:** `number`
- **Default:** `null` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

