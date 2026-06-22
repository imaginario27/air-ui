
## Component

::component-code
---
srcDir: 'forms/fields/checkbox/CheckboxGroupField.vue'
props:
    label: "Label"
    options:
        - id: "option1"
          value: "option1"
          label: "Option 1"
        - id: "option2"
          value: "option2"
          label: "Option 2"
        - id: "option3"
          value: "option3"
          label: "Option 3"
    modelValue:
        - "option2"
    validator: null
    error: ""
    required: false
    disabled: false
    helpText: "Select one or more options."
    helpTextPosition: "bottom"
    inverse: false
    orientation: "vertical"
    layout: "list"
    gridCols: 3
    gridTabletCols: 2
    gridMobileCols: 1
    gridGapClass: "gap-4"
    listClass: ""
items:
    orientation:
        - value: vertical
          text: VERTICAL
        - value: horizontal
          text: HORIZONTAL
    helpTextPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
    layout:
        - value: list
          text: LIST
        - value: grid
          text: GRID
enums:
    orientation: "Orientation"
    helpTextPosition: "Position"
    layout: "ListLayout"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
propsSettingsExcludedProps: ['validator', 'options']
---
::

## Props

::props-table
---
props: [
    {
        "name": "label",
        "type": "string",
    },
    {
        "name": "options",
        "required": "true",
        "type": "CheckboxOption[]",
    },
    {
        "name": "modelValue",
        "required": "true",
        "type": "(string | number | boolean)[]",
    },
    {
        "name": "validator",
        "default": "null",
        "type": "(value: unknown) => string | null",
    },
    {
        "name": "error",
        "default": "''",
        "type": "string",
    },
    {
        "name": "required",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "inverse",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "helpTextPosition",
        "default": "Position.BOTTOM",
        "type": "Position",
    },
    {
        "name": "orientation",
        "default": "'vertical'",
        "type": "Orientation",
    },
    {
        "name": "layout",
        "default": "ListLayout.LIST",
        "type": "ListLayout",
    },
    {
        "name": "gridCols",
        "default": "3",
        "type": "number",
    },
    {
        "name": "gridTabletCols",
        "default": "2",
        "type": "number",
    },
    {
        "name": "gridMobileCols",
        "default": "1",
        "type": "number",
    },
    {
        "name": "gridGapClass",
        "default": "'gap-4'",
        "type": "string",
    },
    {
        "name": "listClass",
        "type": "string",
    },
]
---
::

## Usage
### label

Sets the label of the field group.

```vue
<template>
    <CheckboxGroupField label="Choose options" />
</template>
```

- **Type:** `string`

### options

Sets the options for the checkboxes.

```vue
<template>
    <CheckboxGroupField :options="exampleOptions" />
</template>
<script setup lang="ts">
const exampleOptions: CheckboxOption[] = [
    { id: 'option1', value: 'option1', label: 'Option 1' },
    { id: 'option2', value: 'option2', label: 'Option 2' },
    { id: 'option3', value: 'option3', label: 'Option 3' },
]
</script>
```

- **Type:** `CheckboxOption[]`
- **Required:** `true`

#### TypeScript interface
```ts
interface CheckboxOption {
    id: string | number
    value: string | number | boolean
    label?: string
    ariaLabel?: string
    helpText?: string
    disabled?: boolean
}
```

::content-alert
---
props:
    title: "Accessibility"
    description: "If an option hides its visual label (for example, `label: ''`), provide `ariaLabel` so screen readers still announce an accessible name."
---
::

### modelValue

Sets the array of currently selected values.

```vue
<template>
    <CheckboxGroupField
        v-model="selectedValues"
        :options="exampleOptions"
    />
</template>
<script setup lang="ts">
const selectedValues = ref<(string | number | boolean)[]>([])
const exampleOptions: CheckboxOption[] = [
    { id: 'option1', value: 'option1', label: 'Option 1' },
    { id: 'option2', value: 'option2', label: 'Option 2' },
    { id: 'option3', value: 'option3', label: 'Option 3' },
]
</script>
```

- **Type:** `(string | number | boolean)[]`
- **Required:** `true`

### validator

Sets the validator function for the field, which controls its internal validation state.

It can use the following validation utilities:
- `validateField`
- `validateBooleanField`

```vue
<template>
    <CheckboxGroupField :validator="validateField" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Sets the error message of the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <CheckboxGroupField v-model:error="errorMessage" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### required

Sets whether the field is required.

```vue
<template>
    <CheckboxGroupField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### disabled

Sets whether the field is disabled.

::content-alert
---
props:
    title: "Important"
    description: "Each checkbox option can also be individually disabled by setting the `disabled` property on the option object. If the `disabled` prop is set on the `CheckboxGroupField`, it will override the individual option settings and disable all options."
---
::

```vue
<template>
    <CheckboxGroupField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### helpText

Sets the help text of the field.

```vue
<template>
    <CheckboxGroupField helpText="This is some help text." />
</template>
```

- **Type:** `string`

### helpTextPosition

Sets the position of the help text relative to the field group.

```vue
<template>
    <CheckboxGroupField helpTextPosition="top" helpText="Appears above the options" />
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
        description: "Help text is displayed above the options.",
    },
    {
        value: "BOTTOM",
        description: "Help text is displayed below the options.",
    },
]
---
::

### inverse

Sets whether the checkbox is displayed on the right side of the text.

```vue
<template>
    <CheckboxGroupField inverse />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### orientation

Sets the orientation of the checkboxes. When `layout` is `list`, vertical stacks items in a column and horizontal wraps them in a row.

```vue
<template>
    <CheckboxGroupField orientation="Orientation.HORIZONTAL" />
</template>
```

- **Type:** `Orientation`
- **Default:** `Orientation.VERTICAL`

#### Options
::options-table
---
options: [
    {
        value: "VERTICAL",
        description: "Checkbox options are stacked vertically.",
    },
    {
        value: "HORIZONTAL",
        description: "Checkbox options are wrapped horizontally (list layout) or placed in a grid (grid layout).",
    },
]
---
::

### layout

Sets the layout mode for the options container.

```vue
<template>
    <CheckboxGroupField layout="ListLayout.GRID" :gridCols="3" :gridTabletCols="2" :gridMobileCols="1" />
</template>
```

- **Type:** `ListLayout`
- **Default:** `ListLayout.LIST`

#### Options
::options-table
---
options: [
    {
        value: "LIST",
        description: "Options are arranged with flexbox — vertically stacked or horizontally wrapped depending on the orientation prop.",
    },
    {
        value: "GRID",
        description: "Options are arranged in a CSS grid using the cols, tabletCols, and mobileCols props.",
    },
]
---
::

### gridCols

Sets the number of grid columns on desktop. Only applies when `layout` is `ListLayout.GRID`.

```vue
<template>
    <CheckboxGroupField layout="grid" :gridCols="4" />
</template>
```

- **Type:** `number`
- **Default:** `3`

### gridTabletCols

Sets the number of grid columns on tablet. Only applies when `layout` is `ListLayout.GRID`.

```vue
<template>
    <CheckboxGroupField layout="grid" :gridTabletCols="2" />
</template>
```

- **Type:** `number`
- **Default:** `2`

### gridMobileCols

Sets the number of grid columns on mobile. Only applies when `layout` is `ListLayout.GRID`.

```vue
<template>
    <CheckboxGroupField layout="grid" :gridMobileCols="1" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### gridGapClass

Sets the Tailwind gap utility passed to the grid container. Only applies when `layout` is `ListLayout.GRID`.

```vue
<template>
    <CheckboxGroupField layout="grid" gridGapClass="gap-8" />
</template>
```

- **Type:** `string`
- **Default:** `'gap-4'`

### listClass

Appends extra classes to the list container. Only applies when `layout` is `ListLayout.LIST`. Useful for overriding spacing or adding custom layout utilities.

```vue
<template>
    <CheckboxGroupField listClass="mt-2 px-4" />
</template>
```

- **Type:** `string`
