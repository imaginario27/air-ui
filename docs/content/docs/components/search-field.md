
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
items:
    size: 
        - value: lg
          text: LG
        - value: md
          text: MD
enums:
    size: "InputSize"
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
- **Default:** `'Text'`

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