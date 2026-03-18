## Component

::component-code
---
srcDir: 'forms/fields/TagsField.vue'
props:
    id: "tags-field-id"
    label: "Tags"
    placeholder: "Enter values separated by commas"
    helpText: "Press Enter or comma to add a tag"
    icon: null
    modelValue: 
        - "Nuxt"
        - "TypeScript"
    validator: null
    error: ""
    maxTags: 6
    autofocus: false
    disabled: false
    required: false
external:
  - modelValue
propsSettingsExcludedProps: ['validator', 'modelValue']
isPreviewContentBoxed: true
previewContentMaxWidth: 520
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
        "default": "'Enter values separated by commas'",
        "type": "string",
    },
    {
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "icon",
        "type": "string",
    },
    {
        "name": "modelValue",
        "default": "[]",
        "type": "string[]",
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
        "name": "maxTags",
        "type": "number",
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

### modelValue

The field value is always an array of strings.

```vue
<template>
    <TagsField id="skills" v-model="skills" />
</template>

<script setup lang="ts">
const skills = ref<string[]>(['TypeScript', 'Nuxt'])
</script>
```

- **Type:** `string[]`
- **Default:** `[]`

### maxTags

Limits how many tags can be added.

```vue
<template>
    <TagsField
        id="technologies"
        v-model="technologies"
        :maxTags="5"
    />
</template>
```

- **Type:** `number`

### validator

Validates the current tags array and updates `v-model:error`.

```vue
<template>
    <TagsField
        id="required-tags"
        v-model="tags"
        v-model:error="errorMessage"
        :required="true"
        :validator="validateField"
    />
</template>
```

- **Type:** `function`

### error (v-model:error)

Binds the field error message for validation feedback.

```vue
<template>
    <TagsField
        id="validated-tags"
        v-model="tags"
        v-model:error="errorMessage"
    />
</template>
```

- **Type:** `string`
- **Default:** `''`

### disabled

Disables input and tag interactions.

```vue
<template>
    <TagsField id="tags-disabled" v-model="tags" disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### required

Marks the field as required when used with a validator.

```vue
<template>
    <TagsField
        id="tags-required"
        v-model="tags"
        :required="true"
        :validator="validateField"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

## Field behavior

- Press Enter or comma to create one or more tags.
- Pasting comma-separated values creates multiple tags.
- Duplicate values are ignored.
- Click the close icon in a badge to remove that tag.
- If input is empty, Backspace removes the last tag.
