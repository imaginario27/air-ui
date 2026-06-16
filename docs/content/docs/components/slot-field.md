## Component

::component-code
---
srcDir: 'forms/fields/SlotField.vue'
props: 
    id: "field-id"
    label: "Custom field label"
    ariaLabel: "Custom control label"
    helpText: "Help text shown below the slot content"
    helpTextPosition: "bottom"
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
items:
    helpTextPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
enums:
    helpTextPosition: "Position"
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
        "name": "ariaLabel",
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
        v-slot="{ id, ariaLabel, hasError, error, helpText, disabled, required }"
    >
        <YourComponent
            :id="id"
            :aria-label="ariaLabel"
            :hasError="hasError"
            :error="error"
            :helpText="helpText"
            :disabled="disabled"
            :required="required"
        />
    </SlotField>
</template>
```

The slot exposes: `id`, `ariaLabel`, `error`, `hasError`, `helpText`, `disabled`, `required`.

### ariaLabel

Provides an accessibility label that can be consumed by your slotted control when visual labels are hidden.

```vue
<template>
    <SlotField
        id="custom-slot-field"
        label=""
        ariaLabel="Custom control label"
        v-slot="{ id, ariaLabel }"
    >
        <YourComponent :id="id" :aria-label="ariaLabel" />
    </SlotField>
</template>
```

- **Type:** `string`

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

### helpTextPosition

Sets the position of the help text relative to the field. It uses the `Position` enum.

```vue
<template>
    <SlotField id="field-id" helpTextPosition="top" helpText="Appears above the field" v-slot="{ id }">
        <YourComponent :id="id" />
    </SlotField>
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