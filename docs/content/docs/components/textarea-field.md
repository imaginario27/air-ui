
## Component

::component-code
---
srcDir: 'forms/fields/TextareaField.vue'
props: 
    id: "field-id"
    label: "Label"
    placeholder: "Placeholder"
    helpText: "Help text example"
    helpTextPosition: "bottom"
    modelValue: "Sample text"
    validator: null
    error: ""
    maxLength: 500
    hasCharCounter: true
    readonly: false
    autocomplete: "off"
    autofocus: false
    wrap: "soft"
    spellcheck: false
    autoResize: false
    blurContent: false
    revealBlurOnFocus: true
    disabled: false
    transparent: false
    required: false  
    showOptionalLabel: true
    optionalLabel: null
    minHeightClass: "min-h-[150px]"
    maxHeightClass: "max-h-[300px]"
    textareaClass: ""
    glowColorMode: "none"
    glowTrigger: "always"
items:
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
enums:
    glowColorMode: "GlowColorMode"
    glowTrigger: "GlowTrigger"
    helpTextPosition: "Position"
isPreviewContentBoxed: true
previewContentMaxWidth: 600
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
        "name": "modelValue",
        "default": "''",
        "type": "string",
    },
    {
        "name": "validator",
        "type": "function",
    },
    {
        "name": "error",
        "default": "''",
        "type": "string",
    },
    {
        "name": "maxLength",
        "required": "true",
        "type": "number",
    },
    {
        "name": "hasCharCounter",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "readonly",
        "default": "false",
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
        "name": "wrap",
        "default": "'soft'",
        "type": "'soft' | 'hard'",
    },
    {
        "name": "spellcheck",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "autoResize",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "blurContent",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "revealBlurOnFocus",
        "default": "true",
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
        "name": "showOptionalLabel",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "optionalLabel",
        "type": "string",
    },
    {
        "name": "minHeightClass",
        "default": "'min-h-[150px]'",
        "type": "string",
    },
    {
        "name": "maxHeightClass",
        "default": "'max-h-[300px]'",
        "type": "string",
    },
    {
        "name": "textareaClass",
        "type": "string",
    },
    {
        "name": "transparent",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "glowColorMode",
        "default": "GlowColorMode.NONE",
        "type": "GlowColorMode",
    },
    {
        "name": "glowTrigger",
        "default": "GlowTrigger.ALWAYS",
        "type": "GlowTrigger",
    },
]
---
::

## Usage
### id 

Sets the id of the field.

```vue
<template>
    <TextareaField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label 

Sets the label of the field.

```vue
<template>
    <TextareaField label="Label text" />
</template>
```

- **Type:** `string`

### placeholder

Sets the placeholder text of the input field.

```vue
<template>
    <TextareaField placeholder="Placeholder" />
</template>
```

- **Type:** `string`
- **Default:** `'Placeholder'`

### helpText

Sets the help text displayed below the input field.

```vue
<template>
    <TextareaField helpText="Help text example" />
</template>
```

- **Type:** `string`

### helpTextPosition

Sets the position of the help text relative to the field. It uses the `Position` enum.

```vue
<template>
    <TextareaField helpTextPosition="top" helpText="Appears above the field" />
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

### modelValue

Sets the value of the textarea.

```vue
<template>
    <TextareaField v-model="textValue" />
</template>
<script setup lang="ts">
const textValue = ref('Sample text');
</script>
```

- **Type:** `string`
- **Default:** `''`

### validator

Sets the validator function for the field, which controls its internal validation state.

It uses the `validateField` utility to perform required field validation.

```vue
<template>
    <TextareaField :validator="validateField" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Sets the error message of the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <TextareaField v-model:error="errorMessage" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### maxLength

Sets the maximum length of the textarea.

```vue
<template>
    <TextareaField :maxLength="500" />
</template>
```

- **Type:** `number`
- **Required:** `true`

### hasCharCounter

Enables or disables the character counter display.

```vue
<template>
    <TextareaField hasCharCounter />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### readonly

Sets the textarea to read-only mode.

```vue
<template>
    <TextareaField readonly />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### autocomplete

Sets the autocomplete attribute of the textarea.

```vue
<template>
    <TextareaField autocomplete="off" />
</template>
```

- **Type:** `string`
- **Default:** `'off'`

### autofocus

Sets the autofocus state of the field.

```vue
<template>
    <TextareaField autofocus />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### wrap

Sets the wrap attribute of the textarea.

```vue
<template>
    <TextareaField wrap="soft" />
</template>
```

- **Type:** `'soft' | 'hard'`
- **Default:** `'soft'`

### spellcheck

Sets the spellcheck attribute of the textarea.

```vue
<template>
    <TextareaField spellcheck />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### autoResize

Enables or disables the auto-resize feature of the textarea. It does not refer to the native `resize` property of the textarea, but to automatically adjusting the height based on the content.

```vue
<template>
    <TextareaField autoResize />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### blurContent

Enables or disables the blur effect on the content of the textarea.

```vue
<template>
    <TextareaField blurContent />
</template>
```

- **Type:** `boolean`
- **Default:** `false`


#### Security note
::content-alert
---
props:
    title: "Important"
    description: "Blurring the content does not protect sensitive information. Users can still copy or view the content in other ways."
---
::

To prevent sensitive information from being exposed, consider using other security measures such as encryption or secure storage.

Additionally, you can handle the value of `v-model` dynamically:

```vue
<template>
    <TextareaField
        id="protected-field"
        v-model="protectedValue"
        v-model:blurContent="isBlurred"
    />
</template>

<script setup lang="ts">
const protectedValue = ref('')
const isBlurred = ref(true)

// Example reveal logic
const revealValue = async () => {
    const decrypted = await fetchSecret()
    protectedValue.value = decrypted
    isBlurred.value = false
}
</script>
```

### revealBlurOnFocus

Controls whether the blur effect is revealed when the textarea is focused.

```vue
<template>
    <TextareaField revealBlurOnFocus />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### disabled

Sets the disabled state of the field.

```vue
<template>
    <TextareaField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### required

Sets the required state of the field.

```vue
<template>
    <TextareaField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showOptionalLabel

When the field is not `required`, shows an "(optional)" hint next to the label. Set to `false` to hide it. The hint text defaults to a global setting that can be overridden project-wide, and can also be overridden per field with the `optionalLabel` prop.

```vue
<template>
    <TextareaField label="Notes" :showOptionalLabel="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### optionalLabel

Overrides the "(optional)" hint text for this specific field, taking priority over the global default.

```vue
<template>
    <TextareaField label="Notes" optionalLabel="(not required)" />
</template>
```

- **Type:** `string`

### minHeightClass

Sets the minimum height CSS class for the textarea.

```vue
<template>
    <TextareaField minHeightClass="min-h-[150px]" />
</template>
```

- **Type:** `string`
- **Default:** `'min-h-[150px]'`

### maxHeightClass

Sets the maximum height CSS class for the textarea.

::content-alert
---
props:
    title: "Important"
    description: "Max height only applies when autoResize is enabled."
---
::

```vue
<template>
    <TextareaField maxHeightClass="max-h-[300px]" />
</template>
```

- **Type:** `string`
- **Default:** `'max-h-[300px]'`

### textareaClass

Sets the custom CSS class for the textarea.

```vue
<template>
    <TextareaField textareaClass="border-border-success" />
</template>
```

- **Type:** `string`

### transparent

When `true`, removes the default `bg-background-field` background from the textarea container, making it transparent.

```vue
<template>
    <TextareaField transparent />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### glowColorMode

Draws a glow around the textarea box only. The label and the help text do not glow. It is shown in light mode, dark mode, both or none, and it uses the `GlowColorMode` enum. It is `GlowColorMode.NONE` by default, so the field has no glow until you turn it on.

The glow uses the brand color and turns to the error color when the field has an error.

```vue
<template>
    <TextareaField :glowColorMode="GlowColorMode.DARK" />
</template>
```

- **Type:** `GlowColorMode`
- **Default:** `GlowColorMode.NONE`

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

Sets when the glow appears. It uses the `GlowTrigger` enum and works together with `glowColorMode`, which decides in which theme the glow shows. It is `GlowTrigger.ALWAYS` by default.

`FOCUS` shows the glow while the field has focus. On touch screens there is no hover, so with `HOVER` the glow never shows.

```vue
<template>
    <TextareaField :glowColorMode="GlowColorMode.BOTH" :glowTrigger="GlowTrigger.FOCUS" />
</template>
```

- **Type:** `GlowTrigger`
- **Default:** `GlowTrigger.ALWAYS`

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
