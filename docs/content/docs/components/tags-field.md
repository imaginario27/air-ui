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
    showOptionalLabel: true
    optionalLabel: null
    inputClass: null
    glowColorMode: "none"
    glowTrigger: "focus"
    glowType: "inner"
    glowOpacity: 40
    glowSize: null
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
    glowType:
        - value: outer
          text: OUTER
        - value: inner
          text: INNER
enums:
    glowColorMode: "GlowColorMode"
    glowTrigger: "GlowTrigger"
    glowType: "GlowType"
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
        "name": "showOptionalLabel",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "optionalLabel",
        "type": "string",
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

### showOptionalLabel

When the field is not `required`, shows an "(optional)" hint next to the label. Set to `false` to hide it. The hint text defaults to a global setting that can be overridden project-wide, and can also be overridden per field with the `optionalLabel` prop.

```vue
<template>
    <TagsField label="Keywords" :showOptionalLabel="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### optionalLabel

Overrides the "(optional)" hint text for this specific field, taking priority over the global default.

```vue
<template>
    <TagsField label="Keywords" optionalLabel="(not required)" />
</template>
```

- **Type:** `string`

### transparent

When `true`, removes the default `bg-background-field` background from the tags input container, making it transparent.

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

### glowColorMode

Draws a glow around the tags box only. The label and the help text do not glow. It is shown in light mode, dark mode, both or none, and it uses the `GlowColorMode` enum. It is `GlowColorMode.NONE` by default, so the field has no glow until you turn it on.

The glow uses the brand color and turns to the error color when the field has an error.

```vue
<template>
    <TagsField :glowColorMode="GlowColorMode.DARK" />
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
    <TagsField :glowColorMode="GlowColorMode.BOTH" :glowTrigger="GlowTrigger.FOCUS" />
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
    <TagsField :glowColorMode="GlowColorMode.BOTH" :glowType="GlowType.INNER" />
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
    <TagsField :glowColorMode="GlowColorMode.BOTH" :glowOpacity="30" />
</template>
```

- **Type:** `number`
- **Default:** `40` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

### glowSize

Sets how far the glow spreads, in pixels. It is `null` by default, so each component keeps its own size (for example, buttons follow their `size`). Values move in steps of 2 from `0` to `64`, so `13` is rounded to `14`. It has no effect while `glowColorMode` is `GlowColorMode.NONE`.

```vue
<template>
    <TagsField :glowColorMode="GlowColorMode.BOTH" :glowSize="32" />
</template>
```

- **Type:** `number`
- **Default:** `null` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

## Field behavior

- Press Enter or comma to create one or more tags.
- Pasting comma-separated values creates multiple tags.
- Duplicate values are ignored.
- Click the close icon in a badge to remove that tag.
- If input is empty, Backspace removes the last tag.
