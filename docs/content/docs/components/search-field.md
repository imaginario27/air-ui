
## Component

::component-code
---
srcDir: 'forms/fields/SearchField.vue'
props: 
    id: "field-id"
    label: "Label"
    type: "text"
    placeholder: "Placeholder"
    helpText: "Help text example"
    helpTextPosition: "bottom"
    icon: "mdi:magnify"
    size: "md"
    modelValue: ""
    maxLength: 200
    filterAlphabetic: false
    readonly: false
    autocomplete: "off"
    autofocus: false
    disabled: false
    inputCustomClass: ""
    clearAriaLabel: "Clear search"
    transparent: false
    inputClass: null
    glowColorMode: "none"
    glowTrigger: "always"
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
    size: "InputSize"
    helpTextPosition: "Position"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
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
        "name": "icon",
        "default": "'mdi:magnify'",
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
        "name": "maxLength",
        "type": "number",
    },
    {
        "name": "filterAlphabetic",
        "type": "boolean",
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
        "name": "inputCustomClass",
        "type": "string",
    },
    {
        "name": "clearAriaLabel",
        "default": "'Clear search'",
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
    <SearchField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label 

Sets the label of the field.

```vue
<template>
    <SearchField label="Label text" />
</template>
```

- **Type:** `string`

### placeholder

Sets the placeholder text of the search field.

```vue
<template>
    <SearchField placeholder="Placeholder" />
</template>
```

- **Type:** `string`
- **Default:** `'Placeholder'`

### helpText

Sets the help text displayed below the search field.

```vue
<template>
    <SearchField helpText="Help text example" />
</template>
```

- **Type:** `string`

### helpTextPosition

Sets the position of the help text relative to the field. It uses the `Position` enum.

```vue
<template>
    <SearchField helpTextPosition="top" helpText="Appears above the field" />
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

Sets the icon of the search field.

```vue
<template>
    <SearchField icon="mdi:magnify" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:magnify'`

### size

Sets the size of the search field. It uses the `InputSize` enum.

```vue
<template>
    <SearchField :size="InputSize.MD" />
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

Sets the value of the search field.

```vue
<template>
    <SearchField v-model="inputValue" />
</template>
<script setup lang="ts">
const inputValue = ref('')
</script>
```

- **Type:** `string`
- **Default:** `''`


### maxLength

Sets the maximum length of the search field.

```vue
<template>
    <SearchField :maxLength="10" />
</template>
```

- **Type:** `number`

### filterAlphabetic

Sets whether to filter alphabetic characters in the search field.

```vue
<template>
    <SearchField filterAlphabetic />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### readonly

Sets the readonly state of the field.

```vue
<template>
    <SearchField readonly />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### autocomplete

Sets the autocomplete attribute of the search field.

```vue
<template>
    <SearchField autocomplete="on" />
</template>
```

- **Type:** `string`
- **Default:** `'off'`

### autofocus

Sets the autofocus state of the field.

```vue
<template>
    <SearchField autofocus />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### disabled

Sets the disabled state of the field.

```vue
<template>
    <SearchField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### inputCustomClass

Sets a custom class for the input element.

```vue
<template>
    <SearchField inputCustomClass="my-custom-class" />
</template>
```

- **Type:** `string`

### clearAriaLabel

The `clearAriaLabel` prop sets the accessible label for the clear search button. Override it for i18n.

```vue
<template>
    <SearchField clearAriaLabel="Borrar busqueda" />
</template>
```

- **Type:** `string`
- **Default:** `'Clear search'`

### transparent

When `true`, removes the default `bg-background-container-surface` background from the search input container, making it transparent.

```vue
<template>
    <SearchField transparent />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### inputClass

Applies additional CSS classes directly to the `<input>` element, appended last so they can override other classes.

```vue
<template>
    <SearchField inputClass="text-right" />
</template>
```

- **Type:** `string`

### glowColorMode

Draws a glow around the search box only. The label and the help text do not glow. It is shown in light mode, dark mode, both or none, and it uses the `GlowColorMode` enum. It is `GlowColorMode.NONE` by default, so the field has no glow until you turn it on.

The glow uses the brand color and turns to the error color when the field has an error.

```vue
<template>
    <SearchField :glowColorMode="GlowColorMode.DARK" />
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
    <SearchField :glowColorMode="GlowColorMode.BOTH" :glowTrigger="GlowTrigger.FOCUS" />
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
