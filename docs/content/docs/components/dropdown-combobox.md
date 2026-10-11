## Component

::component-code
---
srcDir: 'dropdowns/DropdownCombobox.vue'
props:
    id: "combobox"
    options:
        - id: "section-fruits"
          sectionTitle: true
          text: "Fruits"
          value: "section-fruits"
        - id: "apple"
          text: "Apple"
          value: "apple"
        - id: "banana"
          text: "Banana"
          value: "banana"
        - id: "cherry"
          text: "Cherry (disabled)"
          value: "cherry"
          disabled: true
        - id: "date"
          text: "Date"
          value: "date"
    placeholder: "Select an option"
    type: "text"
    size: "md"
    activeStyle: "check"
    modelValue: null
    dropdownPosition: "bottom"
    selectBoxClass: ""
    noResultsFoundText: "No results found"
    disabled: false
    hasSeparator: false
    multiple: false
    allowDeselect: false
    allowCustomValue: false
    clearable: true
    filterLocally: true
    searchDebounce: 300
    isLoading: false
    loadingText: "Loading options..."
    clearSelectionAriaLabel: "Clear selection"
    transparent: false
    shouldTeleport: false
    teleportTo: "body"
items:
    size:
        - value: lg
          text: LG
        - value: md
          text: MD
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
    type:
        - value: text
          text: TEXT
        - value: icon
          text: ICON
        - value: user
          text: USER
        - value: image
          text: IMAGE
external:
    - options
externalTypes:
    - SelectOption[]
enums:
    size: "SelectSize"
    activeStyle: "SelectActiveStyle"
    dropdownPosition: "Position"
    type: "SelectType"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
propsSettingsExcludedProps: ['options']
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
        "name": "ariaLabel",
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
        "name": "activeStyle",
        "default": "SelectActiveStyle.CHECK",
        "type": "SelectActiveStyle",
    },
    {
        "name": "modelValue",
        "default": "null",
        "type": "string | number | (string | number)[] | null",
    },
    {
        "name": "dropdownPosition",
        "default": "Position.BOTTOM",
        "type": "Position",
    },
    {
        "name": "selectBoxClass",
        "type": "string",
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
        "name": "clearSelectionAriaLabel",
        "default": "'Clear selection'",
        "type": "string",
    },
    {
        "name": "transparent",
        "default": "false",
        "type": "boolean",
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
]
---
::

## Usage

### id

Sets the id of the input. It is also used to build the ids of the listbox and its options for assistive technologies.

```vue
<template>
    <DropdownCombobox id="fruit" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### ariaLabel

Sets the accessible label of the input. Use it when there is no visible `<label>` associated with the input.

```vue
<template>
    <DropdownCombobox id="fruit" ariaLabel="Fruit" />
</template>
```

- **Type:** `string`

### options

Sets the options of the combobox. The array of options must be of type `SelectOption`. Options with `sectionTitle: true` render as section headers and are hidden while the user is filtering.

```vue
<template>
    <DropdownCombobox id="fruit" :options="items" />
</template>
<script setup lang="ts">
const items: SelectOption[] = [
    { value: 'apple', text: 'Apple' },
    { value: 'banana', text: 'Banana' },
    { value: 'cherry', text: 'Cherry', disabled: true },
]
</script>
```

- **Type:** `SelectOption[]`
- **Default:** `[]`

#### TypeScript Interface

```ts
interface SelectOption {
    id?: string | number
    value: string | number
    sectionTitle?: boolean
    text?: string
    icon?: string
    userDisplayName?: string
    userProfileImg?: string
    imgUrl?: string
    alt?: string
    helpText?: string
    to?: string
    isExternal?: boolean
    disabled?: boolean
}
```

### placeholder

Sets the placeholder text of the input. In `multiple` mode, the labels of the selected options replace the placeholder.

```vue
<template>
    <DropdownCombobox id="fruit" placeholder="Search a fruit" />
</template>
```

- **Type:** `string`
- **Default:** `'Select an option'`

### type

Sets how the options are rendered in the list. It uses the `SelectType` enum. The input always shows the text of the selected option.

```vue
<template>
    <DropdownCombobox id="fruit" :type="SelectType.ICON" :options="items" />
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

Sets the size of the combobox. It uses the `SelectSize` enum.

```vue
<template>
    <DropdownCombobox id="fruit" :size="SelectSize.LG" />
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

### activeStyle

Sets the style of the selected option in the list. It uses the `SelectActiveStyle` enum.

```vue
<template>
    <DropdownCombobox id="fruit" :activeStyle="SelectActiveStyle.FILL" />
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

### modelValue

Sets the selected value. Use `v-model` to bind it. With `multiple`, the value is an array.

```vue
<template>
    <DropdownCombobox id="fruit" v-model="fruit" :options="items" />
</template>
<script setup lang="ts">
const fruit = ref<string | number | (string | number)[] | null>(null)
</script>
```

- **Type:** `string | number | (string | number)[] | null`
- **Default:** `null`

### dropdownPosition

Sets the position of the list relative to the input. It uses the `Position` enum.

```vue
<template>
    <DropdownCombobox id="fruit" :dropdownPosition="Position.TOP" />
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

### selectBoxClass

Allows passing custom classes to the box that wraps the input.

```vue
<template>
    <DropdownCombobox id="fruit" selectBoxClass="custom-box" />
</template>
```

- **Type:** `string`

### noResultsFoundText

Sets the text displayed when no option matches the typed text.

```vue
<template>
    <DropdownCombobox id="fruit" noResultsFoundText="No fruits found" />
</template>
```

- **Type:** `string`
- **Default:** `'No results found'`

### disabled

Disables the input.

```vue
<template>
    <DropdownCombobox id="fruit" disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasSeparator

Adds a separator between options in the list.

```vue
<template>
    <DropdownCombobox id="fruit" hasSeparator />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### multiple

Enables multiple selection. The input becomes a search box, the list stays open after each pick, and `modelValue` is an array.

```vue
<template>
    <DropdownCombobox id="fruits" v-model="fruits" multiple />
</template>
<script setup lang="ts">
const fruits = ref<(string | number)[]>([])
</script>
```

- **Type:** `boolean`
- **Default:** `false`

### allowDeselect

Allows deselecting the selected option by picking it again. Only applies to single selection.

```vue
<template>
    <DropdownCombobox id="fruit" allowDeselect />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### allowCustomValue

Lets the user commit text that is not part of `options` by pressing Enter or leaving the input. The typed text becomes the value, or is added to the array in `multiple` mode. If the text matches the label of an existing option, that option's value is used instead.

```vue
<template>
    <DropdownCombobox id="tag" v-model="tag" :options="items" allowCustomValue />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### clearable

Shows a button to clear the current value or typed text.

```vue
<template>
    <DropdownCombobox id="fruit" :clearable="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### filterLocally

Filters `options` by their label while the user types. Set it to `false` when the options come from the server and are already filtered by the [`@search`](#emits) event.

```vue
<template>
    <DropdownCombobox
        id="user"
        :options="results"
        :filterLocally="false"
        :isLoading="isSearching"
        @search="fetchUsers"
    />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### searchDebounce

Sets the delay, in milliseconds, between the last keystroke and the `search` event.

```vue
<template>
    <DropdownCombobox id="user" :searchDebounce="500" @search="fetchUsers" />
</template>
```

- **Type:** `number`
- **Default:** `300`

### isLoading

Shows a spinner in the input and replaces the list with the loading text. Use it while options are being fetched.

```vue
<template>
    <DropdownCombobox id="user" :isLoading="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### loadingText

Sets the text displayed in the list while `isLoading` is `true`.

```vue
<template>
    <DropdownCombobox id="user" isLoading loadingText="Loading options..." />
</template>
```

- **Type:** `string`
- **Default:** `'Loading options...'`

### clearSelectionAriaLabel

Sets the accessible label of the clear button. Useful for i18n.

```vue
<template>
    <DropdownCombobox id="fruit" clearSelectionAriaLabel="Limpiar selección" />
</template>
```

- **Type:** `string`
- **Default:** `'Clear selection'`

### transparent

Removes the default background from the box, making it transparent.

```vue
<template>
    <DropdownCombobox id="fruit" transparent />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### shouldTeleport

Teleports the list to `teleportTo` instead of rendering it inside the combobox. Enable it when the combobox is inside a container with `overflow-hidden` or `overflow-auto` (such as `Table`), otherwise the list gets clipped.

```vue
<template>
    <DropdownCombobox id="fruit" shouldTeleport />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### teleportTo

Sets the teleport target selector used when `shouldTeleport` is `true`.

```vue
<template>
    <DropdownCombobox id="fruit" shouldTeleport teleportTo="body" />
</template>
```

- **Type:** `string`
- **Default:** `'body'`

## Accessibility

The input follows the ARIA combobox pattern: it has `role="combobox"`, `aria-expanded`, `aria-controls` pointing to the listbox, and `aria-activedescendant` pointing to the highlighted option, so keyboard focus never leaves the input. The list uses `role="listbox"` and each option uses `role="option"` with `aria-selected`.

Provide an accessible name with a visible `<label for="id">` or the `ariaLabel` prop. [ComboboxField](/docs/components/combobox-field) handles this for you.

::options-table
---
options: [
    { value: "Arrow Down", description: "Opens the list, or moves the highlight to the next enabled option. It wraps around." },
    { value: "Arrow Up", description: "Opens the list, or moves the highlight to the previous enabled option. It wraps around." },
    { value: "Enter", description: "Selects the highlighted option. With `allowCustomValue`, it commits the typed text when no option is highlighted." },
    { value: "Escape", description: "Closes the list and restores the label of the current selection." },
    { value: "Tab", description: "Leaves the input, closes the list and restores the label of the current selection." },
]
---
::

## Emits

::options-table
---
options: [
    { value: "@update:modelValue", description: "Emitted when the selection changes. The payload is the new value, `null` when a single selection is cleared, or the new array in `multiple` mode." },
    { value: "@search", description: "Emitted, after `searchDebounce`, when the user types or clears the input. The payload is the typed text." },
]
---
::

#### Example

```vue
<template>
    <DropdownCombobox
        id="user"
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
