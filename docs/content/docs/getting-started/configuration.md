## AirUI configuration

AirUI exposes a small set of behaviors as shared, reactive configuration instead of hardcoding them inside each component. This lets you set a value once for your whole project rather than repeating the same prop on every component instance.

There are two config composables, one per package:

- `useDSConfig` (from `@imaginario27/air-ui-ds`): text used by components, grouped under `forms`, `actions` and `common`.
- `useUtilsConfig` (from `@imaginario27/air-ui-utils`): messages used by the framework-agnostic form validators in `air-ui-utils`, grouped under `validation`.

<br/>

Both return the same reactive object everywhere they're called. Setting a value from anywhere in your app updates it everywhere it's used, since it's shared, reactive state. A prop passed explicitly to a component always wins over its matching global config value.

```ts
const dsConfig = useDSConfig()

dsConfig.forms.optionalLabelText = () => 'Optional'
```

### Global plugin setup

Set overrides in a Nuxt plugin so they apply once, before any AirUI component renders. `useDSConfig` and `useUtilsConfig` are auto-imported, just like AirUI's components and composables.

Text values are resolver functions (`() => string`). A plain string works fine, as in the two examples below. If your project uses an i18n library, point the resolver at its translation function instead, as shown further down in Translations, to stay reactive to locale changes.

#### DS config options

```ts
// plugins/air-ui-config.ts
export default defineNuxtPlugin(() => {
    const dsConfig = useDSConfig()

    /* Form fields customizations */
    Object.assign(dsConfig.forms, {
        optionalLabelText: () => '(optional)',
        selectPlaceholderText: () => 'Select an option',
        searchText: () => 'Search...',
        noResultsText: () => 'No results found',
        loadingOptionsText: () => 'Loading options...',
        clearSelectionText: () => 'Clear selection',
        clearSearchText: () => 'Clear search',
    })

    Object.assign(dsConfig.forms.fileUpload, {
        dragDropText: () => 'Drag and drop files here',
        selectFilesText: () => 'Select files',
        uploadingText: () => 'Uploading',
        uploadedText: () => 'Uploaded',
        uploadFailedText: () => 'Upload failed',
        removeFileText: () => 'Remove file',
    })

    /* Text used by action buttons along the design system */
    Object.assign(dsConfig.actions, {
        cancelText: () => 'Cancel',
        clearAllText: () => 'Clear all',
        closeText: () => 'Close',
    })

    /* Shared text used across multiple component types */
    Object.assign(dsConfig.common, {
        loadingText: () => 'Loading...',
    })
})
```

#### Utils config options

```ts
// plugins/air-ui-config.ts
export default defineNuxtPlugin(() => {
    const utilsConfig = useUtilsConfig()

    /* Fallback messages used by air-ui-utils's form validators */
    Object.assign(utilsConfig.validation, {
        requiredFieldMessage: () => 'This field is required.',
        invalidEmailMessage: () => 'Invalid email address.',
        passwordsDoNotMatchMessage: () => 'Passwords do not match.',
        invalidDateRangeMessage: () => 'Start date must be before or equal to end date',
        invalidUrlMessage: () => 'Invalid URL.',
    })
})
```

#### Translations

Point the resolver at your i18n library's translation function instead of returning a plain string, so the value stays reactive to locale changes. You only need to override the options you want translated:

```ts
// plugins/air-ui-config.ts
export default defineNuxtPlugin(() => {
    const { t } = useI18n()
    const dsConfig = useDSConfig()
    const utilsConfig = useUtilsConfig()

    Object.assign(dsConfig.forms, {
        optionalLabelText: () => t('forms.optional'),
        selectPlaceholderText: () => t('forms.selectPlaceholder'),
        searchText: () => t('forms.search'),
    })

    Object.assign(utilsConfig.validation, {
        requiredFieldMessage: () => t('validation.required'),
        invalidEmailMessage: () => t('validation.invalidEmail'),
    })
})
```

### Extending the config

`useDSConfig` and `useUtilsConfig` cover AirUI's own text and validator messages only. They aren't meant to hold project-specific config for your own local components or utils; add a separate composable in your app for that.

If you want typed additions to `DesignSystemConfig` or `UtilsConfig` themselves, use TypeScript declaration merging in your app rather than editing these types in AirUI:

```ts
// types/air-ui-config.d.ts
import '@imaginario27/air-ui-ds'

declare module '@imaginario27/air-ui-ds' {
    interface DesignSystemConfig {
        myApp: {
            welcomeText: () => string
        }
    }
}
```

```ts
// plugins/air-ui-config.ts
export default defineNuxtPlugin(() => {
    const dsConfig = useDSConfig()

    dsConfig.myApp = {
        welcomeText: () => 'Welcome back',
    }
})
```

This keeps `DesignSystemConfig` and `UtilsConfig` closed and fully typed for every consumer of the library, while your app still gets typed access to the properties it adds.
