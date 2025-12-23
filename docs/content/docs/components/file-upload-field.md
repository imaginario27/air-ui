
## Component

::component-code
---
srcDir: 'forms/fields/FileUploadField.vue'
props: 
    id: "field-id"
    label: "Sample label"
    title: "Field title"
    helpText: "Example help text"
    icon: "mdiFileDocumentOutline"
    buttonText: "Upload file"
    upToText: "up to"
    modelValue: []
    validator: null
    error: ""
    disabled: false
    required: false
    multiple: false
    accept: 
        - "application/pdf"
        - "image/*"
        - "video/*"
    maxFileSize: 5
    maxFiles: 1
    fileUploadErrorMessage: "The size or format of one ore more files is incorrect."
    showPreview: false
    previewImageUrl: ""
    previewContainerClasses: "w-[120px] h-[120px] min-w-[120px]"
isPreviewContentBoxed: true
previewContentMaxWidth: 600
propsSettingsExcludedProps: ['validator', 'modelValue', 'accept']
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
        "name": "title",
        "type": "string",
    },
    {
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "icon",
        "type": "any",
        "default": "'mdiUploadOutline'",
    },
    {
        "name": "buttonText",
        "type": "string",
    },
    {
        "name": "upToText",
        "type": "string",
        "default": "'up to'",
    },
    {
        "name": "modelValue",
        "type": "array",
        "default": "[]",
    },
    {
        "name": "validator",
        "type": "function",
        "default": "null",
    },
    {
        "name": "error",
        "type": "string",
    },
    {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
    },
    {
        "name": "required",
        "type": "boolean",
        "default": "false",
    },
    {
        "name": "multiple",
        "type": "boolean",
        "default": "false",
    },
    {
        "name": "accept",
        "type": "string | string[]",
        "default": "'application/pdf'",
    },
    {
        "name": "maxFileSize",
        "type": "number",
        "default": "5",
    },
    {
        "name": "maxFiles",
        "type": "number",
        "default": "1",
    },
    {
        "name": "fileUploadErrorMessage",
        "type": "string",
        "default": "'The size or format of one ore more files is incorrect.'",
    },
    {
        "name": "showPreview",
        "type": "boolean",
        "default": "false",
    },
    {
        "name": "previewImageUrl",
        "type": "string",
    },
    {
        "name": "previewContainerClasses",
        "type": "string",
        "default": "'w-[120px] h-[120px] min-w-[120px]'",
    },
]
---
::

## Usage

### id 

Sets the id of the field.

```vue
<template>
    <FileUploadField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label

Sets the label of the field.

```vue
<template>
    <FileUploadField label="Sample label" />
</template>
```

- **Type:** `string`

### title

Sets the drag and drop area title of the field.

```vue
<template>
    <FileUploadField title="Field title" />
</template>
```

- **Type:** `string`

### helpText

Sets the help text of the field.

```vue
<template>
    <FileUploadField helpText="Example help text" />
</template>
```

- **Type:** `string`

### icon

Sets the icon of the drag and drop area.

```vue
<template>
    <FileUploadField icon="mdiFileUpload" />
</template>
```

- **Type:** `any`
- **Default:** `'mdiUploadOutline'`

### buttonText

Sets the button text of the field.

```vue
<template>
    <FileUploadField buttonText="Upload file" />
</template>
```

- **Type:** `string`

### upToText

Sets the "up to" text shown next to the maximum file size.

```vue
<template>
    <FileUploadField upToText="up to" />
</template>
```

- **Type:** `string`
- **Default:** `'up to'`

### modelValue

Binds the selected files to the field.

```vue
<template>
    <FileUploadField v-model="files" />
</template>

<script setup lang="ts">
const files = ref<File[]>([])
</script>
```

- **Type:** `array`
- **Default:** `[]`

### validator

Sets the validator function for the field, which controls its internal validation state.

Since this field expects an array value, the `validateArrayField` utility should be used to perform required field validation.

```vue
<template>
    <FileUploadField :validator="validateArrayField" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Defines the error message displayed by the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <FileUploadField v-model:error="Error message" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### disabled

Sets the disabled state of the field.

```vue
<template>
    <FileUploadField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### required
Sets the required state of the field.

```vue
<template>
    <FileUploadField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### multiple

Sets whether multiple file selection is allowed.

```vue
<template>
    <FileUploadField multiple />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### accept

Sets the accepted file types for upload. It can be a string or an array of strings.

```vue
<template>
    <FileUploadField accept="image/*" />
</template>
```

- **Type:** `string | string[]`
- **Default:** `'application/pdf'`

### maxFileSize
Sets the maximum file size (in MB) allowed for each uploaded file.

```vue
<template>
    <FileUploadField :maxFileSize="5" />
</template>
```

- **Type:** `number`
- **Default:** `5`

### maxFiles

Sets the maximum number of files that can be uploaded.

```vue
<template>
    <FileUploadField :maxFiles="1" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### fileUploadErrorMessage
Sets the error message displayed when one or more files fail validation.

```vue
<template>
    <FileUploadField fileUploadErrorMessage="File upload failed" />
</template>
```

- **Type:** `string`
- **Default:** `'The size or format of one ore more files is incorrect.'`

### showPreview

Sets whether to show a preview of the uploaded file.

```vue
<template>
    <FileUploadField showPreview />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### previewImageUrl

Sets the URL of the image to be shown in the preview.

```vue
<template>
    <FileUploadField 
        showPreview
        previewImageUrl="https://example.com/image.jpg" 
    />
</template>
```

- **Type:** `string`

### previewContainerClasses

Sets the CSS classes for the preview container.

```vue
<template>
    <FileUploadField 
        showPreview
        previewContainerClasses="w-[150px] h-[150px]" 
    />
</template>
```

- **Type:** `string`
- **Default:** `'w-[120px] h-[120px] min-w-[120px]'`

