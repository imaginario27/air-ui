## AirUI configuration

AirUI exposes a small set of behaviors as shared, reactive configuration through the `useDSConfig` composable, instead of hardcoding them inside each component. This lets you set a value once for your whole project rather than repeating the same prop on every component instance.

`useDSConfig` returns the same reactive object everywhere it's called, grouped by domain (e.g. `forms`). Setting a value from anywhere in your app updates it everywhere it's used, since it's shared, reactive state.

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

    dsConfig.forms.optionalLabelText = () => 'Optional'
})
```

`useDSConfig` is auto-imported, just like AirUI's components and composables.

### Translations

Translation is optional; a plain string works fine, as shown above. Text values are resolver functions (`() => string`), so if your project uses an i18n library, point the resolver at its translation function to stay reactive to locale changes:

```ts
// plugins/air-ui-config.ts
export default defineNuxtPlugin(() => {
    const { t } = useI18n()
    const dsConfig = useDSConfig()

    dsConfig.forms.optionalLabelText = () => t('forms.optional')
})
```

### Options

::props-table
---
props: [
    {
        "name": "forms.optionalLabelText",
        "default": "() => '(optional)'",
        "type": "() => string",
        "description": "The hint shown next to a field's label when it isn't marked as required (e.g. in InputField). It can also be overridden for a single field via that component's own optionalLabel prop, which takes priority over this global setting.",
    },
]
---
::
