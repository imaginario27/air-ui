
## Component

::component-code
---
srcDir: 'forms/fields/TextareaField.vue'
props: 
    id: "field-id"
    label: "Label"
    placeholder: "Placeholder"
    helpText: "Help text example"
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
    required: false  
    minHeightClass: "min-h-[150px]"
    maxHeightClass: "max-h-[300px]"
    textareaClass: ""
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
        "default": "'Text'",
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
    }
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
- **Default:** `'Text'`

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