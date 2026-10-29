## Component

::component-code
---
srcDir: 'forms/fields/ComboboxField.vue'
props:
    id: "field-id"
    label: "Label"
    placeholder: "Select an option"
    helpText: "Help text example"
    helpTextPosition: "bottom"
    required: false
    showOptionalLabel: true
    optionalLabel: null
    options:
        - value: 1
          text: Option 1
        - value: 2
          text: Option 2
        - value: 3
          text: Option 3
    modelValue: null
    validator: null
    error: ""
    type: "text"
    size: "md"
    responsiveSize: false
    activeStyle: "check"
    dropdownPosition: "bottom"
    autoFlip: true
    noResultsFoundText: "No results found"
    disabled: false
    readonly: false
    hasSeparator: false
    multiple: false
    hasBadgeStack: false
    allowDeselect: false
    allowCustomValue: false
    clearable: true
    filterLocally: true
    searchDebounce: 300
    isLoading: false
    loadingText: "Loading options..."
    selectBoxClass: ""
    transparent: false
    clearSelectionAriaLabel: "Clear selection"
    shouldTeleport: false
    teleportTo: "body"
    glowColorMode: "none"
    glowTrigger: "focus"
    glowType: "inner"
    glowOpacity: 40
    glowSize: null
items:
    size:
        - value: lg
          text: LG
        - value: md
          text: MD
    type:
        - value: text
          text: TEXT
        - value: icon
          text: ICON
        - value: user
          text: USER
        - value: image
          text: IMAGE
    activeStyle:
        - value: check
          text: CHECK
        - value: fill
          text: FILL
    dropdownPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
    helpTextPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
    glowColorMode:
        - value: none
          text: NONE
        - value: both
          text: BOTH
        - value: light
          text: LIGHT
        - value: dark
          text: DARK
    glowTrigger:
        - value: always
          text: ALWAYS
        - value: hover
          text: HOVER
        - value: focus
          text: FOCUS
        - value: hoverFocus
          text: HOVER_FOCUS
    glowType:
        - value: outer
          text: OUTER
        - value: inner
          text: INNER
enums:
    glowColorMode: "GlowColorMode"
    glowTrigger: "GlowTrigger"
    glowType: "GlowType"
    size: "SelectSize"
    type: "SelectType"
    activeStyle: "SelectActiveStyle"
    dropdownPosition: "Position"
    helpTextPosition: "Position"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
propsSettingsExcludedProps: ['validator','options']
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
        "name": "required",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "showOptionalLabel",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "optionalLabel",
        "type": "string",
    },
    {
        "name": "options",
        "default": "[]",
        "type": "SelectOption[]",
    },
    {
        "name": "placeholder",
        "default": "'Select an option'",
        "type": "string",
    },
    {
        "name": "modelValue",
        "default": "null",
        "type": "string | number | (string | number)[] | null",
    },
    {
        "name": "type",
        "default": "SelectType.TEXT",
        "type": "SelectType",
    },
    {
        "name": "size",
        "default": "SelectSize.MD",
        "type": "SelectSize",
    },
    {
        "name": "responsiveSize",
        "default": "null",
        "type": "boolean",
    },
    {
        "name": "activeStyle",
        "default": "SelectActiveStyle.CHECK",
        "type": "SelectActiveStyle",
    },
    {
        "name": "dropdownPosition",
        "default": "Position.BOTTOM",
        "type": "Position",
    },
    {
        "name": "autoFlip",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "noResultsFoundText",
        "default": "'No results found'",
        "type": "string",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "readonly",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "validator",
        "default": "() => null",
        "type": "function",
    },
    {
        "name": "error",
        "default": "''",
        "type": "string",
    },
    {
        "name": "hasSeparator",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "multiple",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "hasBadgeStack",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "allowDeselect",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "allowCustomValue",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "clearable",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "filterLocally",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "searchDebounce",
        "default": "300",
        "type": "number",
    },
    {
        "name": "isLoading",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "loadingText",
        "default": "'Loading options...'",
        "type": "string",
    },
    {
        "name": "selectBoxClass",
        "type": "string",
    },
    {
        "name": "transparent",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "clearSelectionAriaLabel",
        "default": "'Clear selection'",
        "type": "string",
    },
    {
        "name": "shouldTeleport",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "teleportTo",
        "default": "'body'",
        "type": "string",
    },
    {
        "name": "glowColorMode",
        "default": "GlowColorMode.NONE",
        "type": "GlowColorMode",
    },
    {
        "name": "glowTrigger",
        "default": "GlowTrigger.FOCUS",
        "type": "GlowTrigger",
    },
    {
        "name": "glowType",
        "default": "GlowType.INNER",
        "type": "GlowType",
    },
    {
        "name": "glowOpacity",
        "default": "40",
        "type": "number",
    },
    {
        "name": "glowSize",
        "type": "number",
    },
]
---
::

## Usage

### id

Sets the id of the input. The label is linked to it.

```vue
<template>
    <ComboboxField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label

Sets the label of the field.

```vue
<template>
    <ComboboxField id="field-id" label="Country" />
</template>
```

- **Type:** `string`

### ariaLabel

Sets the accessible label of the input. It is only used when there is no `label`.

```vue
<template>
    <ComboboxField id="field-id" ariaLabel="Country" />
</template>
```

- **Type:** `string`

### helpText

Sets the help text of the field.

```vue
<template>
    <ComboboxField id="field-id" helpText="Start typing to filter the list" />
</template>
```

- **Type:** `string`

### helpTextPosition

Sets the position of the help text relative to the field. It uses the `Position` enum.

```vue
<template>
    <ComboboxField id="field-id" helpText="Appears above the field" :helpTextPosition="Position.TOP" />
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

#### Options

::options-table
---
options: [
    { value: "TOP", description: "top" },
    { value: "BOTTOM", description: "bottom" },
]
---
::

### required

Sets whether the field is required or not. Validation only runs for required fields.

```vue
<template>
    <ComboboxField id="field-id" required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showOptionalLabel

When the field is not `required`, shows an "(optional)" hint next to the label. Set it to `false` to hide it.

```vue
<template>
    <ComboboxField id="field-id" label="Country" :showOptionalLabel="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### optionalLabel

Overrides the "(optional)" hint text for this field, taking priority over the global default.

```vue
<template>
    <ComboboxField id="field-id" label="Country" optionalLabel="(not required)" />
</template>
```

- **Type:** `string`

### options

Sets the options of the field. The array of options must be of type [`SelectOption`](/docs/components/dropdown-combobox#options).

```vue
<template>
    <ComboboxField id="field-id" :options="items" />
</template>
<script setup lang="ts">
const items: SelectOption[] = [
    { value: 1, text: 'Option 1' },
    { value: 2, text: 'Option 2' },
    { value: 3, text: 'Option 3' },
]
</script>
```

- **Type:** `SelectOption[]`
- **Default:** `[]`

### placeholder

Sets the placeholder text of the input.

```vue
<template>
    <ComboboxField id="field-id" placeholder="Search a country" />
</template>
```

- **Type:** `string`
- **Default:** `'Select an option'`

### modelValue

Sets the value of the field. Use `v-model` to bind it. With `multiple`, the value is an array.

```vue
<template>
    <ComboboxField id="field-id" v-model="selectedValue" :options="items" />
</template>
<script setup lang="ts">
const selectedValue = ref<string | number | (string | number)[] | null>(null)
</script>
```

- **Type:** `string | number | (string | number)[] | null`
- **Default:** `null`

### type

Sets how the options are rendered in the list. It uses the `SelectType` enum.

```vue
<template>
    <ComboboxField id="field-id" :type="SelectType.ICON" :options="items" />
</template>
```

- **Type:** `SelectType`
- **Default:** `SelectType.TEXT`

#### Options

::options-table
---
options: [
    { value: "TEXT", description: "Options with text" },
    { value: "ICON", description: "Options with icon and text" },
    { value: "USER", description: "Options with user avatar and username" },
    { value: "IMAGE", description: "Options with image and text" },
]
---
::

### size

Sets the size of the field. It uses the `SelectSize` enum.

```vue
<template>
    <ComboboxField id="field-id" :size="SelectSize.LG" />
</template>
```

- **Type:** `SelectSize`
- **Default:** `SelectSize.MD`

#### Options

::options-table
---
options: [
    { value: "MD", description: "md" },
    { value: "LG", description: "lg" },
]
---
::

### responsiveSize

Makes the field taller on mobile so it is easier to tap. When `size` is `SelectSize.MD`, it is `SelectSize.LG` below the `lg` breakpoint and `SelectSize.MD` from `lg` up. Other sizes do not change.

```vue
<template>
    <ComboboxField :responsiveSize="true" />
</template>
```

When the prop is not set, it follows `forms.responsiveSize` of the DS config, which is `false` by default. Pass `false` to keep a single field at its own size on mobile even when the config turns it on for the whole project. See [Configuration](/docs/getting-started/configuration).

- **Type:** `boolean`
- **Default:** `null` (follows `forms.responsiveSize` of the DS config, `false` by default)

### activeStyle

Sets the style of the selected option in the list. It uses the `SelectActiveStyle` enum.

```vue
<template>
    <ComboboxField id="field-id" :activeStyle="SelectActiveStyle.FILL" />
</template>
```

- **Type:** `SelectActiveStyle`
- **Default:** `SelectActiveStyle.CHECK`

#### Options

::options-table
---
options: [
    { value: "CHECK", description: "Displays a checkmark next to the selected option" },
    { value: "FILL", description: "Fills the background of the selected option" },
]
---
::

### dropdownPosition

Sets the position of the list relative to the input. It uses the `Position` enum.

```vue
<template>
    <ComboboxField id="field-id" :dropdownPosition="Position.TOP" />
</template>
```

- **Type:** `Position`
- **Default:** `Position.BOTTOM`

#### Options

::options-table
---
options: [
    { value: "TOP", description: "Displays the list above the input" },
    { value: "BOTTOM", description: "Displays the list below the input" },
]
---
::


### autoFlip

Moves the dropdown to the other side when it does not fit in the window. If it would be cut off at the bottom or the top edge of the screen and there is more room on the other side, it opens there instead. The position is checked when it opens, and `dropdownPosition` is only the starting point. Set it to `false` to always keep the position as given.

```vue
<template>
    <ComboboxField v-model="value" id="combobox" :options="options" :autoFlip="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### noResultsFoundText

Sets the text displayed when no option matches the typed text.

```vue
<template>
    <ComboboxField id="field-id" noResultsFoundText="No countries found" />
</template>
```

- **Type:** `string`
- **Default:** `'No results found'`

### disabled

Disables the field.

```vue
<template>
    <ComboboxField id="field-id" disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### readonly

Sets the readonly state. The value is still displayed but the user cannot change it.

```vue
<template>
    <ComboboxField readonly />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### validator

Sets the validator function for the field. It runs when the value changes, only if the field is `required`, and its result is emitted through `update:error`.

```vue
<template>
    <ComboboxField id="field-id" required :validator="validateField" />
</template>
<script setup lang="ts">
const validateField = (value: unknown) => (value ? null : 'This field is required')
</script>
```

- **Type:** `function`
- **Default:** `() => null`

### error (v-model:error)

Sets the error message of the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <ComboboxField id="field-id" v-model:error="errorMessage" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### hasSeparator

Adds a separator between options in the list.

```vue
<template>
    <ComboboxField id="field-id" hasSeparator />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### multiple

Enables multiple selection. The input becomes a search box and `modelValue` is an array.

```vue
<template>
    <ComboboxField id="field-id" v-model="values" multiple />
</template>
<script setup lang="ts">
const values = ref<(string | number)[]>([])
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### hasBadgeStack

Displays the selected options as removable badges above the input. Only applies with [multiple](#multiple).

```vue
<template>
    <ComboboxField id="field-id" multiple hasBadgeStack />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### allowDeselect

Allows deselecting the selected option by picking it again. Only applies to single selection.

```vue
<template>
    <ComboboxField id="field-id" allowDeselect />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### allowCustomValue

Lets the user commit text that is not part of `options` by pressing Enter or leaving the input. If the text matches the label of an existing option, that option's value is used instead.

```vue
<template>
    <ComboboxField id="field-id" allowCustomValue />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### clearable

Shows a button to clear the current value or typed text.

```vue
<template>
    <ComboboxField id="field-id" :clearable="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### filterLocally

Filters `options` by their label while the user types. Set it to `false` when the options come from the server and are already filtered by the [`@search`](#emits) event.

```vue
<template>
    <ComboboxField
        id="field-id"
        :options="results"
        :filterLocally="false"
        :isLoading="isSearching"
        @search="fetchOptions"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### searchDebounce

Sets the delay, in milliseconds, between the last keystroke and the `search` event.

```vue
<template>
    <ComboboxField id="field-id" :searchDebounce="500" @search="fetchOptions" />
</template>
```

- **Type:** `number`
- **Default:** `300`

### isLoading

Shows a spinner in the input and replaces the list with the loading text. Use it while options are being fetched.

```vue
<template>
    <ComboboxField id="field-id" :isLoading="isSearching" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### loadingText

Sets the text displayed in the list while `isLoading` is `true`.

```vue
<template>
    <ComboboxField id="field-id" isLoading loadingText="Loading options..." />
</template>
```

- **Type:** `string`
- **Default:** `'Loading options...'`

### selectBoxClass

Allows passing custom classes to the box that wraps the input.

```vue
<template>
    <ComboboxField id="field-id" selectBoxClass="custom-box" />
</template>
```

- **Type:** `string`

### transparent

Removes the default background from the box, making it transparent.

```vue
<template>
    <ComboboxField id="field-id" transparent />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### clearSelectionAriaLabel

Sets the accessible label of the clear button. Useful for i18n.

```vue
<template>
    <ComboboxField id="field-id" clearSelectionAriaLabel="Limpiar selección" />
</template>
```

- **Type:** `string`
- **Default:** `'Clear selection'`

### shouldTeleport

Teleports the list to `teleportTo` instead of rendering it inside the field. Enable it when the field is inside a container with `overflow-hidden` or `overflow-auto` (such as `Table`), otherwise the list gets clipped.

```vue
<template>
    <ComboboxField id="field-id" shouldTeleport />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### teleportTo

Sets the teleport target selector used when `shouldTeleport` is `true`.

```vue
<template>
    <ComboboxField id="field-id" shouldTeleport teleportTo="body" />
</template>
```

- **Type:** `string`
- **Default:** `'body'`

### glowColorMode

Draws a glow around the combobox box only. The label and the help text do not glow. It is shown in light mode, dark mode, both or none, and it uses the `GlowColorMode` enum. It is `GlowColorMode.NONE` by default, so the field has no glow until you turn it on.

The glow uses the brand color and turns to the error color when the field has an error.

```vue
<template>
    <ComboboxField :glowColorMode="GlowColorMode.DARK" />
</template>
```

- **Type:** `GlowColorMode`
- **Default:** `GlowColorMode.NONE` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

#### Options
::options-table
---
options: [
    {
        value: "NONE",
        description: "No glow.",
    },
    {
        value: "BOTH",
        description: "Glow in light and dark mode.",
    },
    {
        value: "LIGHT",
        description: "Glow in light mode only.",
    },
    {
        value: "DARK",
        description: "Glow in dark mode only.",
    },
]
---
::

### glowTrigger

Sets when the glow appears. It uses the `GlowTrigger` enum and works together with `glowColorMode`, which decides in which theme the glow shows. It is `GlowTrigger.FOCUS` by default.

`FOCUS` shows the glow while the field has focus. On touch screens there is no hover, so with `HOVER` the glow never shows.

```vue
<template>
    <ComboboxField :glowColorMode="GlowColorMode.BOTH" :glowTrigger="GlowTrigger.FOCUS" />
</template>
```

- **Type:** `GlowTrigger`
- **Default:** `GlowTrigger.FOCUS` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

#### Options
::options-table
---
options: [
    {
        value: "ALWAYS",
        description: "The glow is always visible.",
    },
    {
        value: "HOVER",
        description: "The glow shows while the pointer is over the field.",
    },
    {
        value: "FOCUS",
        description: "The glow shows while the field has focus.",
    },
    {
        value: "HOVER_FOCUS",
        description: "The glow shows on hover and on focus.",
    },
]
---
::

### glowType

Sets where the glow is drawn. It uses the `GlowType` enum and works together with `glowColorMode`. It is `GlowType.INNER` by default.

```vue
<template>
    <ComboboxField :glowColorMode="GlowColorMode.BOTH" :glowType="GlowType.INNER" />
</template>
```

- **Type:** `GlowType`
- **Default:** `GlowType.INNER` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

#### Options
::options-table
---
options: [
    {
        value: "OUTER",
        description: "The glow spreads around the outside of the element.",
    },
    {
        value: "INNER",
        description: "The glow is drawn inside the element, along its edges.",
    },
]
---
::

### glowOpacity

Sets how strong the glow is, from `0` (invisible) to `100` (full color). The default is `40`. Values move in steps of 5, so `42` is rounded to `40`. It has no effect while `glowColorMode` is `GlowColorMode.NONE`.

```vue
<template>
    <ComboboxField :glowColorMode="GlowColorMode.BOTH" :glowOpacity="30" />
</template>
```

- **Type:** `number`
- **Default:** `40` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

### glowSize

Sets how far the glow spreads, in pixels. It is `null` by default, so each component keeps its own size (for example, buttons follow their `size`). Values move in steps of 2 from `0` to `64`, so `13` is rounded to `14`. It has no effect while `glowColorMode` is `GlowColorMode.NONE`.

```vue
<template>
    <ComboboxField :glowColorMode="GlowColorMode.BOTH" :glowSize="32" />
</template>
```

- **Type:** `number`
- **Default:** `null` (set by the DS config, see [Configuration](/docs/getting-started/configuration))

## Accessibility

The field links its `label` to the input and the input follows the ARIA combobox pattern, with the highlighted option exposed through `aria-activedescendant`. When there is no visible `label`, pass `ariaLabel`. See [DropdownCombobox](/docs/components/dropdown-combobox#accessibility) for the keyboard shortcuts.

## Emits

::options-table
---
options: [
    { value: "@update:modelValue", description: "Emitted when the selection changes. The payload is the new value, `null` when a single selection is cleared, or the new array in `multiple` mode." },
    { value: "@update:error", description: "Emitted with the validator result when the value changes and the field is `required`." },
    { value: "@search", description: "Emitted, after `searchDebounce`, when the user types or clears the input. The payload is the typed text." },
]
---
::

#### Example

```vue
<template>
    <ComboboxField
        id="user"
        label="User"
        v-model="userId"
        :options="results"
        :filterLocally="false"
        :isLoading="isSearching"
        @search="fetchUsers"
    />
</template>
<script setup lang="ts">
const userId = ref<string | number | null>(null)
const results = ref<SelectOption[]>([])
const isSearching = ref(false)

const fetchUsers = async (query: string) => {
    isSearching.value = true
    results.value = await searchUsers(query)
    isSearching.value = false
}
</script>
```
