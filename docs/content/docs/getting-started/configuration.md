## AirUI configuration

AirUI exposes a small set of behaviors as shared, reactive configuration instead of hardcoding them inside each component. This lets you set a value once for your whole project rather than repeating the same prop on every component instance.

There are two config composables, one per package:

- `useDSConfig` (from `@imaginario27/air-ui-ds`) — text used by components, grouped under `forms`, `actions` and `common`.
- `useUtilsConfig` (from `@imaginario27/air-ui-utils`) — messages used by the framework-agnostic form validators in `air-ui-utils`, grouped under `validation`.

<br/>

Both return the same reactive object everywhere they're called. Setting a value from anywhere in your app updates it everywhere it's used, since it's shared, reactive state. A prop passed explicitly to a component always wins over its matching global config value.

```ts
const dsConfig = useDSConfig()

dsConfig.forms.optionalLabelText = () => 'Optional'
```

### Global plugin setup

Set overrides in a Nuxt plugin so they apply once, before any AirUI component renders.

```ts
// plugins/air-ui-config.ts
export default defineNuxtPlugin(() => {
    const dsConfig = useDSConfig()
    const utilsConfig = useUtilsConfig()

    dsConfig.forms.optionalLabelText = () => 'Optional'
    utilsConfig.validation.requiredFieldMessage = () => 'This field is required'
})
```

`useDSConfig` and `useUtilsConfig` are auto-imported, just like AirUI's components and composables.

### Translations

Translation is optional; a plain string works fine, as shown above. Text values are resolver functions (`() => string`), so if your project uses an i18n library, point the resolver at its translation function to stay reactive to locale changes:

```ts
// plugins/air-ui-config.ts
export default defineNuxtPlugin(() => {
    const { t } = useI18n()
    const dsConfig = useDSConfig()
    const utilsConfig = useUtilsConfig()

    dsConfig.forms.optionalLabelText = () => t('forms.optional')
    utilsConfig.validation.requiredFieldMessage = () => t('validation.required')
})
```

### `useDSConfig` options

::props-table
---
props: [
    {
        "name": "forms.optionalLabelText",
        "default": "() => '(optional)'",
        "type": "() => string",
        "description": "The hint shown next to a field's label when it isn't marked as required (e.g. in InputField). Overridable per field via that component's own optionalLabel prop, which takes priority over this global setting.",
    },
    {
        "name": "forms.selectPlaceholderText",
        "default": "() => 'Select an option'",
        "type": "() => string",
        "description": "Default placeholder for SelectField and DropdownSelect. Overridable per field via the placeholder prop.",
    },
    {
        "name": "forms.searchText",
        "default": "() => 'Search...'",
        "type": "() => string",
        "description": "Default placeholder for the search input in a filterable SelectField or DropdownSelect. Overridable per field via the searchFieldPlaceholder prop.",
    },
    {
        "name": "forms.noResultsText",
        "default": "() => 'No results found'",
        "type": "() => string",
        "description": "Default message shown when a filterable SelectField or DropdownSelect has no matching options. Overridable per field via the noResultsFoundText prop.",
    },
    {
        "name": "forms.loadingOptionsText",
        "default": "() => 'Loading options...'",
        "type": "() => string",
        "description": "Default message shown while a SelectField or DropdownSelect is loading its options. Overridable per field via the loadingText prop.",
    },
    {
        "name": "forms.clearSelectionText",
        "default": "() => 'Clear selection'",
        "type": "() => string",
        "description": "Default aria-label for the clear button in a multiple SelectField or DropdownSelect. Overridable per field via the clearSelectionAriaLabel prop.",
    },
    {
        "name": "forms.clearSearchText",
        "default": "() => 'Clear search'",
        "type": "() => string",
        "description": "Default aria-label for the clear button in SearchField. Overridable via the clearAriaLabel prop.",
    },
    {
        "name": "forms.fileUpload.dragDropText",
        "default": "() => 'Drag and drop files here'",
        "type": "() => string",
        "description": "Default title shown by FileUploadField and Dropzone when multiple is true. Overridable per field via the title prop.",
    },
    {
        "name": "forms.fileUpload.selectFilesText",
        "default": "() => 'Select files'",
        "type": "() => string",
        "description": "Default select-files button text shown by FileUploadField and Dropzone when multiple is true. Overridable per field via the buttonText prop.",
    },
    {
        "name": "forms.fileUpload.uploadingText",
        "default": "() => 'Uploading'",
        "type": "() => string",
        "description": "Default in-progress upload status text for FileUploadField and Dropzone. Overridable per field via the uploadingStatusText prop.",
    },
    {
        "name": "forms.fileUpload.uploadedText",
        "default": "() => 'Uploaded'",
        "type": "() => string",
        "description": "Default successful-upload status text for FileUploadField and Dropzone. Overridable per field via the successStatusText prop.",
    },
    {
        "name": "forms.fileUpload.uploadFailedText",
        "default": "() => 'Upload failed'",
        "type": "() => string",
        "description": "Default failed-upload status text for FileUploadField and Dropzone. Overridable per field via the errorStatusText prop.",
    },
    {
        "name": "forms.fileUpload.removeFileText",
        "default": "() => 'Remove file'",
        "type": "() => string",
        "description": "Default aria-label for a file's remove button in FileUploadField and Dropzone. Overridable per field via the removeAriaLabel prop.",
    },
    {
        "name": "actions.cancelText",
        "default": "() => 'Cancel'",
        "type": "() => string",
        "description": "Default close-button text for DangerModalDialog. Overridable via the buttonCloseText prop.",
    },
    {
        "name": "actions.clearAllText",
        "default": "() => 'Clear all'",
        "type": "() => string",
        "description": "Default clear-all text used by NotificationsPopover, FileUploadField and Dropzone. Overridable via each component's buttonClearAllText/clearAllButtonText prop.",
    },
    {
        "name": "actions.closeText",
        "default": "() => 'Close'",
        "type": "() => string",
        "description": "Default corner close-button aria-label used by ModalDialog, InfoModalDialog, SuccessModalDialog and DangerModalDialog. Overridable via each component's closeAriaLabel prop.",
    },
    {
        "name": "common.loadingText",
        "default": "() => 'Loading...'",
        "type": "() => string",
        "description": "Default label shown by ProgressBar while isIndeterminate is true. Overridable via the loadingText prop.",
    },
]
---
::

### `useUtilsConfig` options

`air-ui-utils`'s form validators (`validateField`, `validateEmail`, `validatePasswordMatch`, `validateDateRange`, `validateUrl`, `validateBooleanField`, `validateArrayField`) fall back to these messages when a validator is called without its own per-call message argument.

::props-table
---
props: [
    {
        "name": "validation.requiredFieldMessage",
        "default": "() => 'This field is required.'",
        "type": "() => string",
        "description": "Default message for a missing required value. Overridable per call via each validator's requiredFieldMessage argument.",
    },
    {
        "name": "validation.invalidEmailMessage",
        "default": "() => 'Invalid email address.'",
        "type": "() => string",
        "description": "Default message when validateEmail receives a badly formatted address. Overridable per call via its invalidEmailMessage argument.",
    },
    {
        "name": "validation.passwordsDoNotMatchMessage",
        "default": "() => 'Passwords do not match.'",
        "type": "() => string",
        "description": "Default message when validatePasswordMatch's two values differ. Overridable per call via its mismatchMessage argument.",
    },
    {
        "name": "validation.invalidDateRangeMessage",
        "default": "() => 'Start date must be before or equal to end date'",
        "type": "() => string",
        "description": "Default message when validateDateRange's end date precedes its start date. Overridable per call via its invalidRangeMessage argument.",
    },
    {
        "name": "validation.invalidUrlMessage",
        "default": "() => 'Invalid URL.'",
        "type": "() => string",
        "description": "Default message when validateUrl receives a malformed URL. Overridable per call via its invalidUrlMessage argument.",
    },
]
---
::
