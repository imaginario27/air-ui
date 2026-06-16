## Component

::component-code
---
srcDir: 'forms/fields/TagsField.vue'
props:
    id: "tags-field-id"
    label: "Tags"
    placeholder: "Enter values separated by commas"
    clearText: "Clear"
    helpText: "Press Enter or comma to add a tag"
    helpTextPosition: "bottom"
    icon: null
    modelValue: 
        - "Nuxt"
        - "TypeScript"
    validator: null
    error: ""
    maxTags: 6
    autofocus: false
    disabled: false
    transparent: false
    required: false
    inputClass: null
items:
    helpTextPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
enums:
    helpTextPosition: "Position"
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
        "name": "clearText",
        "default": "'Clear'",
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

### clearText

Customizes the clear button label.

```vue
<template>
    <TagsField
        id="tags-clear-text"
        v-model="tags"
        clearText="Remove all"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Clear'`

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

### transparent

When `true`, removes the default `bg-background-container-surface` background from the tags input container, making it transparent.

```vue
<template>
    <TagsField transparent />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### inputClass

Applies additional CSS classes directly to the `<input>` element, appended last so they can override other classes.

```vue
<template>
    <TagsField inputClass="font-mono" />
</template>
```

- **Type:** `string`

### helpTextPosition

Sets the position of the help text relative to the field. It uses the `Position` enum.

```vue
<template>
    <TagsField helpTextPosition="top" helpText="Appears above the field" />
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

## Field behavior

- Press Enter or comma to create one or more tags.
- Pasting comma-separated values creates multiple tags.
- Duplicate values are ignored.
- Click the close icon in a badge to remove that tag.
- If input is empty, Backspace removes the last tag.
