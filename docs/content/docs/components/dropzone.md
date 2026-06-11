## Component

::component-code
---
srcDir: 'dropzone/Dropzone.vue'
props:
    modelValue: []
    title: "Drag and drop files here"
    singleFileTitleText: "Drag and drop a file here"
    description: ""
    icon: "mdi:cloud-upload-outline"
    buttonText: "Select files"
    singleFileButtonText: "Select file"
    upToText: "up to"
    allFilesTypeText: "All file types"
    disabled: false
    multiple: true
    accept:
        - "application/pdf"
        - "image/*"
    maxFileSize: 5
    maxFiles: 5
    fileUploadErrorMessage: "The size or format of one ore more files is incorrect."
    itemsLayout: "list"
    state: "default"
    selectFileStrategy: "merge"
    showSelectButton: true
    showClearAllButton: true
    clearAllButtonText: "Clear all"
    fileTypeIconMap: {}
    useServerUpload: false
    uploadUrl: ""
    deleteUrl: ""
    uploadHeaders: {}
    uploadAdditionalData: {}
    uploadWithCredentials: false
    uploadingStatusText: "Uploading"
    successStatusText: "Uploaded"
    errorStatusText: "Upload failed"
    pendingStatusText: "Pending"
    retryIcon: "mdi:refresh"
    removeIcon: "mdi:close"
    retryAriaLabel: "Retry upload"
    removeAriaLabel: "Remove file"
    maxItemsContainerHeight: 260
    totalProgress: 0
external:
  - modelValue
  - totalProgress
externalTypes:
  - File[]
  - number
items:
    itemsLayout:
        - value: list
          text: LIST
        - value: grid
          text: GRID
    state:
        - value: default
          text: DEFAULT
        - value: indeterminate
          text: INDETERMINATE
        - value: success
          text: SUCCESS
        - value: error
          text: ERROR
    selectFileStrategy:
        - value: merge
          text: MERGE
        - value: replace
          text: REPLACE
enums:
    itemsLayout: "DropzoneLayout"
    state: "DropzoneState"
    selectFileStrategy: "FileSelectStrategy"
propsSettingsExcludedProps: ['modelValue', 'uploadHeaders', 'uploadAdditionalData', 'fileTypeIconMap']
isPreviewContentBoxed: true
previewContentMaxWidth: 760
---
::

## Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "type": "File[]",
        "default": "[]",
    },
    {
        "name": "title",
        "type": "string",
        "default": "'Drag and drop files here'",
    },
    {
        "name": "singleFileTitleText",
        "type": "string",
        "default": "'Drag and drop a file here'",
    },
    {
        "name": "description",
        "type": "string",
    },
    {
        "name": "icon",
        "type": "string",
        "default": "'mdi:cloud-upload-outline'",
    },
    {
        "name": "buttonText",
        "type": "string",
        "default": "'Select files'",
    },
    {
        "name": "singleFileButtonText",
        "type": "string",
        "default": "'Select file'",
    },
    {
        "name": "upToText",
        "type": "string",
        "default": "'up to'",
    },
    {
        "name": "allFilesTypeText",
        "type": "string",
        "default": "'All file types'",
    },
    {
        "name": "disabled",
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
        "default": "'*'",
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
        "name": "itemsLayout",
        "type": "DropzoneLayout",
        "default": "DropzoneLayout.LIST",
    },
    {
        "name": "state",
        "type": "DropzoneState",
        "default": "DropzoneState.DEFAULT",
    },
    {
        "name": "selectFileStrategy",
        "type": "FileSelectStrategy",
        "default": "FileSelectStrategy.MERGE",
    },
    {
        "name": "showSelectButton",
        "type": "boolean",
        "default": "true",
    },
    {
        "name": "showClearAllButton",
        "type": "boolean",
        "default": "true",
    },
    {
        "name": "clearAllButtonText",
        "type": "string",
        "default": "'Clear all'",
    },
    {
        "name": "fileTypeIconMap",
        "type": "Record<string, string>",
        "default": "{}",
    },
    {
        "name": "useServerUpload",
        "type": "boolean",
        "default": "false",
    },
    {
        "name": "uploadUrl",
        "type": "string",
    },
    {
        "name": "deleteUrl",
        "type": "string",
    },
    {
        "name": "uploadHeaders",
        "type": "Record<string, string>",
        "default": "{}",
    },
    {
        "name": "uploadAdditionalData",
        "type": "Record<string, string | Blob | number | boolean>",
        "default": "{}",
    },
    {
        "name": "uploadWithCredentials",
        "type": "boolean",
        "default": "false",
    },
    {
        "name": "uploadingStatusText",
        "type": "string",
        "default": "'Uploading'",
    },
    {
        "name": "successStatusText",
        "type": "string",
        "default": "'Uploaded'",
    },
    {
        "name": "errorStatusText",
        "type": "string",
        "default": "'Upload failed'",
    },
    {
        "name": "pendingStatusText",
        "type": "string",
        "default": "'Pending'",
    },
    {
        "name": "retryIcon",
        "type": "string",
        "default": "'mdi:refresh'",
    },
    {
        "name": "removeIcon",
        "type": "string",
        "default": "'mdi:close'",
    },
    {
        "name": "maxItemsContainerHeight",
        "type": "number",
    },
    {
        "name": "totalProgress",
        "type": "number",
        "default": "0",
    },
    {
        "name": "retryAriaLabel",
        "type": "string",
        "default": "'Retry upload'",
    },
    {
        "name": "removeAriaLabel",
        "type": "string",
        "default": "'Remove file'",
    }
]
---
::

## Usage

### modelValue

Binds the selected files array.

```vue
<template>
    <Dropzone v-model="files" />
</template>

<script setup lang="ts">
const files = ref<File[]>([])
</script>
```

- **Type:** `File[]`
- **Default:** `[]`

### title

Sets the title text used when `multiple` is true.

```vue
<template>
    <Dropzone title="Drop your files" :multiple="true" />
</template>
```

- **Type:** `string`
- **Default:** `'Drag and drop files here'`

### singleFileTitleText

Sets the title text used when `multiple` is false.

```vue
<template>
    <Dropzone singleFileTitleText="Drop your file" :multiple="false" />
</template>
```

- **Type:** `string`
- **Default:** `'Drag and drop a file here'`

### description

Overrides the default generated description line.

```vue
<template>
    <Dropzone description="PDF, PNG, JPG up to 10MB" />
</template>
```

- **Type:** `string`

### buttonText

Sets the select button text used when `multiple` is true.

```vue
<template>
    <Dropzone buttonText="Choose files" :multiple="true" />
</template>
```

- **Type:** `string`
- **Default:** `'Select files'`

### singleFileButtonText

Sets the select button text used when `multiple` is false.

```vue
<template>
    <Dropzone singleFileButtonText="Choose file" :multiple="false" />
</template>
```

- **Type:** `string`
- **Default:** `'Select file'`

### upToText

Sets the helper phrase used in the autogenerated description.

```vue
<template>
    <Dropzone upToText="max" />
</template>
```

- **Type:** `string`
- **Default:** `'up to'`

### accept

Sets accepted file types using MIME values and/or extensions.

```vue
<template>
    <Dropzone :accept="['application/pdf', '.png', 'image/*']" />
</template>
```

- **Type:** `string | string[]`
- **Default:** `'*'`

### maxFileSize

Sets max file size in MB per file.

```vue
<template>
    <Dropzone :maxFileSize="10" />
</template>
```

- **Type:** `number`
- **Default:** `5`

### maxFiles

Sets max number of files kept in the model.

```vue
<template>
    <Dropzone :maxFiles="10" :multiple="true" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### itemsLayout

Controls file item presentation layout.

```vue
<template>
    <Dropzone itemsLayout="grid" />
</template>
```

- **Type:** `DropzoneLayout`
- **Default:** `DropzoneLayout.LIST`

#### Options
::options-table
---
options: [
    {
        value: "LIST",
        description: "Shows file items in a vertical list",
    },
    {
        value: "GRID",
        description: "Shows file items in a thumbnail grid",
    }
]
---
::

### selectFileStrategy

Controls how newly selected or dropped files are combined.

```vue
<template>
    <Dropzone
        :multiple="true"
        selectFileStrategy="merge"
    />
</template>
```

- **Type:** `FileSelectStrategy`
- **Default:** `FileSelectStrategy.MERGE`

#### Options
::options-table
---
options: [
    {
        value: "MERGE",
        description: "Adds selected files to current list",
    },
    {
        value: "REPLACE",
        description: "Replaces current list with selected files",
    }
]
---
::

### maxItemsContainerHeight

Sets max height (px) for items container and enables vertical scroll.

```vue
<template>
    <Dropzone :maxItemsContainerHeight="320" />
</template>
```

- **Type:** `number`

### useServerUpload

Enables internal upload/delete flow.

```vue
<template>
    <Dropzone
        :useServerUpload="true"
        uploadUrl="/api/uploads"
        deleteUrl="/api/uploads"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### uploadingStatusText

Sets text used while a file is uploading.

```vue
<template>
    <Dropzone uploadingStatusText="Uploading" />
</template>
```

- **Type:** `string`
- **Default:** `'Uploading'`

### successStatusText

Sets text used when a file upload succeeds.

```vue
<template>
    <Dropzone successStatusText="Uploaded" />
</template>
```

- **Type:** `string`
- **Default:** `'Uploaded'`

### errorStatusText

Sets text used when a file upload fails.

```vue
<template>
    <Dropzone errorStatusText="Upload failed" />
</template>
```

- **Type:** `string`
- **Default:** `'Upload failed'`

### retryIcon

Sets icon names for retry actions.

```vue
<template>
    <Dropzone retryIcon="mdi:refresh" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:refresh'`

### removeIcon

Sets icon names for remove actions.

```vue
<template>
    <Dropzone removeIcon="mdi:close" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:close'`

### retryAriaLabel

The `retryAriaLabel` prop sets the accessible label for the retry button on failed uploads. Override it for i18n.

```vue
<template>
    <Dropzone retryAriaLabel="Reintentar subida" />
</template>
```

- **Type:** `string`
- **Default:** `'Retry upload'`

### removeAriaLabel

The `removeAriaLabel` prop sets the accessible label for the remove file button. Override it for i18n.

```vue
<template>
    <Dropzone removeAriaLabel="Eliminar archivo" />
</template>
```

- **Type:** `string`
- **Default:** `'Remove file'`

## Example

### Basic

```vue
<template>
    <Dropzone
        v-model="files"
        :multiple="true"
        :accept="['application/pdf', 'image/*']"
        :maxFileSize="10"
        :maxFiles="10"
        itemsLayout="grid"
        selectFileStrategy="merge"
        :maxItemsContainerHeight="320"
    />
</template>

<script setup lang="ts">
const files = ref<File[]>([])
</script>
```

### Server Integration Example

```vue
<template>
    <Dropzone
        v-model="files"
        v-model:total-progress="totalProgress"
        :multiple="true"
        :useServerUpload="true"
        uploadUrl="/api/uploads"
        deleteUrl="/api/uploads"
        :uploadHeaders="{
            Authorization: `Bearer ${token}`,
        }"
        :uploadAdditionalData="{
            module: 'feedback',
            userId,
        }"
        uploadingStatusText="Uploading"
        successStatusText="Uploaded"
        errorStatusText="Upload failed"
    />

    <ProgressBar :progress="totalProgress" />
</template>

<script setup lang="ts">
const files = ref<File[]>([])
const totalProgress = ref(0)
const token = 'your-token'
const userId = 123
</script>
```

## Emits

::props-table
---
props: [
    {
        "name": "update:modelValue",
        "type": "(files: File[]) => void",
    },
    {
        "name": "update:totalProgress",
        "type": "(value: number) => void",
    },
    {
        "name": "error",
        "type": "(message: string) => void",
    },
    {
        "name": "file-added",
        "type": "(file: File) => void",
    },
    {
        "name": "file-removed",
        "type": "(file: File) => void",
    },
    {
        "name": "clear-all",
        "type": "(files: File[]) => void",
    }
]
---
::
