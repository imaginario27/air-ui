## Component

::component-code
---
srcDir: 'forms/fields/SlotField.vue'
props: 
    id: "field-id"
    label: "Custom field label"
    helpText: "Help text shown below the slot content"
    error: ""
    disabled: false
    required: false
slots:
  default: ""
slotComponents:
  default:
    srcDir: 'placeholders/ContentPlaceholder.vue'
    props:
        text: "Insert slot content here"
isPreviewContentBoxed: true
previewContentMaxWidth: 500
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
        "name": "helpText",
        "type": "string",
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
]
---
::


## Slots

::slots-table
---
slots: [
    {
        name: "default",
        description: "Template to render a custom content for the field.",
    },
]
---
::


### Slot exposed props

Use the default slot to render your custom control while reusing SlotField label, help text, and error UI.

```vue
<template>
    <SlotField
        id="custom-slot-field"
        label="Profile"
        helpText="Write a short bio"
        :required="true"
        error=""
        v-slot="{ id, hasError, error, helpText, disabled, required }"
    >
        <YourComponent
            :id="id"
            :hasError="hasError"
            :error="error"
            :helpText="helpText"
            :disabled="disabled"
            :required="required"
        />
    </SlotField>
</template>
```

The slot exposes: `id`, `error`, `hasError`, `helpText`, `disabled`, `required`.

## Usage

### id

Sets the id of the field.

```vue
<template>
    <SlotField id="field-id" v-slot="{ id }">
        <YourComponent :id="id" />
    </SlotField>
</template>
```

- **Type:** `string`
- **Required:** `true`

### label

Sets the label of the field.

```vue
<template>
    <SlotField id="field-id" label="Custom field label" v-slot="{ id }">
        <YourComponent :id="id" />
    </SlotField>
</template>
```

- **Type:** `string`

### helpText

Sets helper text displayed below the field when there is no error.

```vue
<template>
    <SlotField id="field-id" helpText="Help text shown below the slot content" v-slot="{ id }">
        <YourComponent :id="id" />
    </SlotField>
</template>
```

- **Type:** `string`

### error

Defines the error message displayed by the field. When this prop is not empty, the label and helper text area use error styling.

```vue
<template>
    <SlotField id="field-id" error="This field is required" v-slot="{ id, hasError }">
        <YourComponent
            :id="id"
            :hasError="hasError"
        />
    </SlotField>
</template>
```

- **Type:** `string`
- **Default:** `''`

### disabled

Sets the disabled state of the field wrapper.

```vue
<template>
    <SlotField id="field-id" disabled v-slot="{ id, disabled }">
        <YourComponent
            :id="id"
            :disabled="disabled"
        />
    </SlotField>
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### required

Sets the required state passed to the slot props.

```vue
<template>
    <SlotField id="field-id" required v-slot="{ id, required }">
        <YourComponent
            :id="id"
            :required="required"
        />
    </SlotField>
</template>
```

- **Type:** `boolean`
- **Default:** `false`