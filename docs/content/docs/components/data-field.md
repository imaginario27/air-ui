
## Component

::component-code
---
srcDir: 'forms/fields/DataField.vue'
props: 
    id: "field-id"
    label: "Sample label"
    text: "Example data"
    emptyText: "Not defined"
    helpText: "Example help text"
    hasCopyToClipboardButton: false
    copyToClipboardMessage: "Copied to clipboard"
    copyToClipboardErrorMessage: "Failed to copy to clipboard"
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
        "name": "text",
        "type": "string | number",
    },
    {
        "name": "emptyText",
        "type": "string",
        "default": "'Not defined'"
    },
    {
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "hasCopyToClipboardButton",
        "type": "boolean",
        "default": "false"
    },
    {
        "name": "copyToClipboardMessage",
        "type": "string",
        "default": "'Copied to clipboard'"
    },
    {
        "name": "copyToClipboardErrorMessage",
        "type": "string",
        "default": "'Failed to copy to clipboard'"
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
        description: "Template to custom content instead of the text or emptyText props.",
    },
]
---
::

```vue
<template>
    <DataField>
        <!-- Custom content here -->
    </DataField>
</template>
```

## Usage

### id 

Sets the id of the field.

```vue
<template>
    <DataField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label

Sets the label of the field.

```vue
<template>
    <DataField label="Sample label" />
</template>
```

- **Type:** `string`

### text

Sets the text to display in the field.

```vue
<template>
    <DataField text="Example data" />
</template>
```

- **Type:** `string | number`

### emptyText

Sets the text to display when there is no data.

```vue
<template>
    <DataField emptyText="Not defined" />
</template>
```

- **Type:** `string`
- **Default:** `'Not defined'`

### helpText

Sets the help text for the field.

```vue

<template>
    <DataField helpText="Example help text" />
</template>
```

- **Type:** `string`

### hasCopyToClipboardButton

Determines whether to show a copy to clipboard button.

```vue
<template>
    <DataField :hasCopyToClipboardButton="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### copyToClipboardMessage

Sets the message to display when the text is successfully copied to the clipboard.

```vue

<template>
    <DataField copyToClipboardMessage="Copied to clipboard" />
</template>
```

- **Type:** `string`
- **Default:** `'Copied to clipboard'`

### copyToClipboardErrorMessage

Sets the message to display when there is an error copying the text to the clipboard.

```vue
<template>
    <DataField copyToClipboardErrorMessage="Failed to copy to clipboard" />
</template>
```

- **Type:** `string`
- **Default:** `'Failed to copy to clipboard'`






