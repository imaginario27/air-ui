
## Component

::component-code
---
srcDir: 'forms/fields/FileUploadField.vue'
props: 
    id: "field-id"
    label: "Sample label"
    ariaLabel: "Upload contract files"
    title: "Field title"
    helpText: "Example help text"
    icon: "mdi:file-document-outline"
    buttonText: "Upload file"
    singleFileTitleText: "Drag and drop a file here"
    replaceTitleText: "Upload a new file to replace current one"
    singleFileButtonText: "Select file"
    replaceButtonText: "Replace file"
    upToText: "up to"
    allFilesTypeText: "All file types"
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
    itemsLayout: "list"
    state: "default"
    selectFileStrategy: "merge"
    showSelectButton: true
    showClearAllButton: true
    clearAllButtonText: "Clear all"
    fileTypeIconMap:
        pdf: "mdi:file-pdf-box"
    totalProgress: 0
    useServerUpload: false
    uploadUrl: ""
    deleteUrl: ""
    uploadHeaders:
        Authorization: "Bearer token"
    uploadAdditionalData:
        module: "documents"
    uploadWithCredentials: false
    uploadingStatusText: "Uploading"
    successStatusText: "Uploaded"
    errorStatusText: "Upload failed"
    pendingStatusText: "Pending"
    retryIcon: "mdi:refresh"
    removeIcon: "mdi:close"
    retryButtonStyleType: "neutral-filled"
    removeButtonStyleType: "delete-filled"
    retryIconClass: "text-text-default"
    removeIconClass: "text-text-default"
    retryButtonClass: ""
    removeButtonClass: ""
    maxItemsContainerHeight: 280
    containerClass: ""
    dropzoneClass: ""
    titleClass: ""
    descriptionClass: ""
    iconClass: ""
    actionsClass: ""
    listClass: ""
    gridClass: ""
    fileItemClass: ""
    fileNameClass: ""
    fileMetaClass: ""
external:
  - modelValue
externalTypes:
  - File[]
isPreviewContentBoxed: true
previewContentMaxWidth: 600
propsSettingsExcludedProps: ['validator', 'modelValue', 'accept', 'uploadHeaders', 'uploadAdditionalData']
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
        "name": "title",
        "type": "string",
    },
    {
        "name": "helpText",
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
    },
    {
        "name": "singleFileTitleText",
        "type": "string",
        "default": "'Drag and drop a file here'",
    },
    {
        "name": "replaceTitleText",
        "type": "string",
        "default": "'Upload a new file to replace current one'",
    },
    {
        "name": "singleFileButtonText",
        "type": "string",
        "default": "'Select file'",
    },
    {
        "name": "replaceButtonText",
        "type": "string",
        "default": "'Replace file'",
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
        "name": "totalProgress",
        "type": "number",
        "default": "0",
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
        "name": "retryButtonStyleType",
        "type": "ButtonStyleType",
        "default": "ButtonStyleType.NEUTRAL_FILLED",
    },
    {
        "name": "removeButtonStyleType",
        "type": "ButtonStyleType",
        "default": "ButtonStyleType.DELETE_FILLED",
    },
    {
        "name": "retryIconClass",
        "type": "string | string[]",
    },
    {
        "name": "removeIconClass",
        "type": "string | string[]",
    },
    {
        "name": "retryButtonClass",
        "type": "string",
    },
    {
        "name": "removeButtonClass",
        "type": "string",
    },
    {
        "name": "maxItemsContainerHeight",
        "type": "number",
    },
    {
        "name": "containerClass",
        "type": "string",
    },
    {
        "name": "dropzoneClass",
        "type": "string",
    },
    {
        "name": "titleClass",
        "type": "string",
    },
    {
        "name": "descriptionClass",
        "type": "string",
    },
    {
        "name": "iconClass",
        "type": "string | string[]",
    },
    {
        "name": "actionsClass",
        "type": "string",
    },
    {
        "name": "listClass",
        "type": "string",
    },
    {
        "name": "gridClass",
        "type": "string",
    },
    {
        "name": "fileItemClass",
        "type": "string",
    },
    {
        "name": "fileNameClass",
        "type": "string",
    },
    {
        "name": "fileMetaClass",
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

### ariaLabel

Sets the accessible name passed to the dropzone area when the visual `label` is hidden.
It is also used as preview image alt fallback.

```vue
<template>
    <FileUploadField
        label=""
        ariaLabel="Upload contract files"
    />
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
    <FileUploadField icon="mdi:upload" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:cloud-upload-outline'`

### buttonText

Sets the button text of the field.

```vue
<template>
    <FileUploadField buttonText="Upload file" />
</template>
```

- **Type:** `string`

### singleFileTitleText

Sets the dropzone title used when `multiple` is `false`.

```vue
<template>
    <FileUploadField singleFileTitleText="Drag and drop a file here" />
</template>
```

- **Type:** `string`
- **Default:** `'Drag and drop a file here'`

### replaceTitleText

Sets the dropzone title shown when preview mode is active and the field is in replace mode.

```vue
<template>
    <FileUploadField replaceTitleText="Upload a new file to replace current one" />
</template>
```

- **Type:** `string`
- **Default:** `'Upload a new file to replace current one'`

### singleFileButtonText

Sets the select button text used when `multiple` is `false`.

```vue
<template>
    <FileUploadField singleFileButtonText="Select file" />
</template>
```

- **Type:** `string`
- **Default:** `'Select file'`

### replaceButtonText

Sets the select button text shown when preview mode is active and the field is in replace mode.

```vue
<template>
    <FileUploadField replaceButtonText="Replace file" />
</template>
```

- **Type:** `string`
- **Default:** `'Replace file'`

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
    <FileUploadField v-model:error="errorMessage" />
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
- **Default:** `'*'`

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

### itemsLayout

Sets how uploaded items are rendered (`LIST` or `GRID`).

```vue
<template>
    <FileUploadField itemsLayout="grid" />
</template>
```

- **Type:** `DropzoneLayout`
- **Default:** `DropzoneLayout.LIST`

### state

Sets the visual dropzone state (`DEFAULT`, `INDETERMINATE`, `SUCCESS`, `ERROR`).

```vue
<template>
    <FileUploadField state="success" />
</template>
```

- **Type:** `DropzoneState`
- **Default:** `DropzoneState.DEFAULT`

### selectFileStrategy

Sets how new files are handled when files already exist (`MERGE` or `REPLACE`).

```vue
<template>
    <FileUploadField selectFileStrategy="replace" multiple />
</template>
```

- **Type:** `FileSelectStrategy`
- **Default:** `FileSelectStrategy.MERGE`

### showSelectButton

Controls visibility of the select files button.

```vue
<template>
    <FileUploadField :showSelectButton="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### showClearAllButton

Controls visibility of the clear all button.

```vue
<template>
    <FileUploadField :showClearAllButton="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### clearAllButtonText

Sets clear all button text.

```vue
<template>
    <FileUploadField clearAllButtonText="Remove all" />
</template>
```

- **Type:** `string`
- **Default:** `'Clear all'`

### fileTypeIconMap

Overrides default icon mapping by file type/extension key.

```vue
<template>
    <FileUploadField :fileTypeIconMap="{ pdf: 'mdi:file-pdf-box', geo: 'mdi:map-outline' }" />
</template>
```

- **Type:** `Record<string, string>`
- **Default:** `{}`

### totalProgress

Two-way bound overall upload progress value with `v-model:totalProgress`. This value is used to update the progress bar shown in the dropzone when `useServerUpload` is `true`.

```vue
<template>
    <FileUploadField v-model:totalProgress="totalProgress" />
</template>

<script setup lang="ts">
const totalProgress = ref(0)
</script>
```

- **Type:** `number`
- **Default:** `0`

### useServerUpload

Enables server-side upload mode.

```vue
<template>
    <FileUploadField
        useServerUpload
        uploadUrl="/api/uploads"
        deleteUrl="/api/uploads"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### uploadUrl

Server endpoint used to upload files.

```vue
<template>
    <FileUploadField useServerUpload uploadUrl="/api/uploads" />
</template>
```

- **Type:** `string`

### deleteUrl

Server endpoint used to delete uploaded files.

```vue
<template>
    <FileUploadField useServerUpload deleteUrl="/api/uploads" />
</template>
```

- **Type:** `string`

### uploadHeaders

Custom headers used for upload and delete requests.

```vue
<template>
    <FileUploadField :uploadHeaders="{ Authorization: 'Bearer token' }" />
</template>
```

- **Type:** `Record<string, string>`
- **Default:** `{}`

### uploadAdditionalData

Additional key-value pairs appended to upload `FormData`.

```vue
<template>
    <FileUploadField :uploadAdditionalData="{ module: 'documents', public: true }" />
</template>
```

- **Type:** `Record<string, string | Blob | number | boolean>`
- **Default:** `{}`

### uploadWithCredentials

Sends upload requests with credentials.

```vue
<template>
    <FileUploadField useServerUpload uploadWithCredentials />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### uploadingStatusText

Text used while a file is uploading.

```vue
<template>
    <FileUploadField uploadingStatusText="Uploading file" />
</template>
```

- **Type:** `string`
- **Default:** `'Uploading'`

### successStatusText

Text used after a successful upload.

```vue
<template>
    <FileUploadField successStatusText="Done" />
</template>
```

- **Type:** `string`
- **Default:** `'Uploaded'`

### errorStatusText

Text used after a failed upload.

```vue
<template>
    <FileUploadField errorStatusText="Try again" />
</template>
```

- **Type:** `string`
- **Default:** `'Upload failed'`

### pendingStatusText

Text used for files waiting to upload.

```vue
<template>
    <FileUploadField pendingStatusText="Waiting" />
</template>
```

- **Type:** `string`
- **Default:** `'Pending'`

### retryIcon

Icon used by the retry action button.

```vue
<template>
    <FileUploadField retryIcon="mdi:reload" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:refresh'`

### removeIcon

Icon used by the remove action button.

```vue
<template>
    <FileUploadField removeIcon="mdi:trash-can-outline" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:close'`

### retryButtonStyleType

Style variant used by the retry action button.

```vue
<template>
    <FileUploadField retryButtonStyleType="neutral-transparent" />
</template>
```

- **Type:** `ButtonStyleType`
- **Default:** `ButtonStyleType.NEUTRAL_FILLED`

### removeButtonStyleType

Style variant used by the remove action button.

```vue
<template>
    <FileUploadField removeButtonStyleType="delete-transparent" />
</template>
```

- **Type:** `ButtonStyleType`
- **Default:** `ButtonStyleType.DELETE_FILLED`

### retryIconClass

Custom class or class list applied to retry icon.

```vue
<template>
    <FileUploadField retryIconClass="text-text-default" />
</template>
```

- **Type:** `string | string[]`

### removeIconClass

Custom class or class list applied to remove icon.

```vue
<template>
    <FileUploadField :removeIconClass="['text-text-error', 'opacity-90']" />
</template>
```

- **Type:** `string | string[]`

### retryButtonClass

Custom class applied to retry button wrapper.

```vue
<template>
    <FileUploadField retryButtonClass="rounded-md" />
</template>
```

- **Type:** `string`

### removeButtonClass

Custom class applied to remove button wrapper.

```vue
<template>
    <FileUploadField removeButtonClass="rounded-md" />
</template>
```

- **Type:** `string`

### maxItemsContainerHeight

Sets max height in pixels for the list items container before vertical scrolling.

```vue
<template>
    <FileUploadField :maxItemsContainerHeight="280" />
</template>
```

- **Type:** `number`

### containerClass

Custom class for the root Dropzone container.

```vue
<template>
    <FileUploadField containerClass="bg-background-neutral-subtlest" />
</template>
```

- **Type:** `string`

### dropzoneClass

Custom class for the drag-and-drop area.

```vue
<template>
    <FileUploadField dropzoneClass="border-border-success" />
</template>
```

- **Type:** `string`

### titleClass

Custom class for the dropzone title.

```vue
<template>
    <FileUploadField titleClass="text-text-primary" />
</template>
```

- **Type:** `string`

### descriptionClass

Custom class for the dropzone description.

```vue
<template>
    <FileUploadField descriptionClass="text-text-neutral-subtle" />
</template>
```

- **Type:** `string`

### iconClass

Custom class or class list for the dropzone icon.

```vue
<template>
    <FileUploadField :iconClass="['text-icon-default', 'opacity-80']" />
</template>
```

- **Type:** `string | string[]`

### actionsClass

Custom class for the actions container.

```vue
<template>
    <FileUploadField actionsClass="justify-start" />
</template>
```

- **Type:** `string`

### listClass

Custom class for list layout container.

```vue
<template>
    <FileUploadField listClass="gap-3" />
</template>
```

- **Type:** `string`

### gridClass

Custom class for grid layout container.

```vue
<template>
    <FileUploadField itemsLayout="grid" gridClass="gap-4" />
</template>
```

- **Type:** `string`

### fileItemClass

Custom class for each file item card.

```vue
<template>
    <FileUploadField fileItemClass="shadow-xs" />
</template>
```

- **Type:** `string`

### fileNameClass

Custom class for file name text.

```vue
<template>
    <FileUploadField fileNameClass="text-sm" />
</template>
```

- **Type:** `string`

### fileMetaClass

Custom class for file metadata text.

```vue
<template>
    <FileUploadField fileMetaClass="text-xs" />
</template>
```

- **Type:** `string`

## Emits

::props-table
---
props: [
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
    },
]
---
::

