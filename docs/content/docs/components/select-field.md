
## Component

::component-code
---
srcDir: 'forms/fields/SelectField.vue'
props: 
    id: "field-id"
    label: "Label"
    placeholder: "Select an option"
    helpText: "Help text example"
    helpTextPosition: "bottom"
    required: false
    options: 
        - value: 1
          text: Option 1
        - value: 2
          text: Option 2
        - value: 3
          text: Option 3
    modelValue: ""
    validator: null
    error: ""
    type: "text"
    size: "md"
    activeStyle: "check"
    dropdownPosition: "bottom"
    filterable: false
    searchFieldPlaceholder: "Search..."
    noResultsFoundText: "No results found"
    disabled: false
    hasSeparator: false
    multiple: false
    hasBadgeStack: false
    allowDeselect: false
    showLoadingState: true
    isLoading: false
    loadingText: "Loading options..."
    loadingOptionsPlaceholder: "Options are being loaded"
    selectBoxClass: ""
    transparent: false
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
enums:
    size: "InputSize"
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
        "default": "'Text'",
        "type": "string",
    },
    {
        "name": "helpText",
        "default": "'Text'",
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
        "name": "filterable",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "searchFieldPlaceholder",
        "default": "'Search...'",
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
        "name": "showLoadingState",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "isLoading",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "loadingText",
        "default": "'Loading options...'",
        "type": "string",
    },
    {
        "name": "loadingOptionsPlaceholder",
        "default": "'Options are being loaded'",
    },
    {
        "name": "selectBoxClass",
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
]
---
::

## Usage
### id 

Sets the id of the field.

```vue
<template>
    <SelectField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label 

Sets the label of the field.

```vue
<template>
    <SelectField label="Label text" />
</template>
```

- **Type:** `string`
- **Default:** `'Text'`

### helpText 

Sets the help text of the field.

```vue
<template>
    <SelectField helpText="Help text example" />
</template>
```

- **Type:** `string`

### helpTextPosition

Sets the position of the help text relative to the field. It uses the `Position` enum.

```vue
<template>
    <SelectField helpTextPosition="top" helpText="Appears above the field" />
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

### required 

Sets whether the field is required or not.

```vue
<template>
    <SelectField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### options 

Sets the options of the field. The array of options must be of type `SelectOption`.

```vue
<template>
    <SelectField :options="items" />
</template>
<script setup lang="ts">
const items: SelectOption[] = [
    {
        value: 1,
        text: 'Option 1',
    },
    {
        value: 2,
        text: 'Option 2',
    },
    {
        value: 3,
        text: 'Option 3',
    },
]
</script>
```

#### TypeScript interface
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
}
```

### placeholder 

Sets the placeholder text of the field.

```vue
<template>
    <SelectField placeholder="Select an option" />
</template>
```

- **Type:** `string`
- **Default:** `'Select an option'`

### modelValue 

Sets the value of the field. The value can be a string, number, or an array of strings or numbers.

```vue
<template>
    <SelectField v-model="selectedValue" />
</template>
<script setup lang="ts">
const selectedValue = ref<string | number | (string | number)[]>(null)
</script>
```

- **Type:** `string | number | (string | number)[] | null`
- **Default:** `null`

### type 

Sets the type of the field. It uses the `SelectType` enum.

```vue
<template>
    <SelectField 
        :type="SelectType.ICON" 
        :options="items"
    />
</template>
<script setup lang="ts">
const items: SelectOption[] = [
    {
        value: 'home',
        text: 'Home',
        icon: 'mdi:home-outline',
    },
    {
        value: 'settings',
        text: 'Settings',
        icon: 'mdi:cog-outline',
    },
    {
        value: 'profile',
        text: 'Profile',
        icon: 'mdi:account-outline',
    },
]
</script>
```

- **Type:** `SelectType`
- **Default:** `SelectType.TEXT`

#### Options
::options-table
---
options: [
    {
        value: "TEXT",
        description: "Displays a select with text options",
    },
    {
        value: "ICON",
        description: "Displays a select with icon and text options",
    },
    {
        value: "USER",
        description: "Displays a select with user avatar and username options",
    },
    {
        value: "IMAGE",
        description: "Displays a select with image and text options",
    },
]

---
::

### size

Sets the size of the input field. It uses the `InputSize` enum.

```vue
<template>
    <SelectField :size="InputSize.MD" />
</template>
```

- **Type:** `InputSize`
- **Default:** `InputSize.MD`

#### Options
::options-table
---
options: [
    {
        value: "MD",
        description: "md",
    },
    {
        value: "LG",
        description: "lg",
    },
]
---
::

### activeStyle

Sets the active style of the selected option. It uses the `SelectActiveStyle` enum.

```vue
<template>
    <SelectField :activeStyle="SelectActiveStyle.FILL" />
</template>
```

- **Type:** `SelectActiveStyle`
- **Default:** `SelectActiveStyle.CHECK`

#### Options
::options-table
---
options: [
    {
        value: "CHECK",
        description: "Displays a checkmark next to the selected option",
    },
    {
        value: "FILL",
        description: "Fills the background of the selected option",
    },
]
---
::

### dropdownPosition

Sets the position of the dropdown. It uses the `Position` enum.

```vue
<template>
    <SelectField :dropdownPosition="Position.TOP" />
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
        description: "Displays the dropdown above the select field",
    },
    {
        value: "BOTTOM",
        description: "Displays the dropdown below the select field",
    },
]
---
::

### filterable

Sets whether the select field is filterable or not.

```vue
<template>
    <SelectField filterable />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### searchFieldPlaceholder

Sets the placeholder text of the search field.

```vue
<template>
    <SelectField searchFieldPlaceholder="Search..." />
</template>
```

- **Type:** `string`
- **Default:** `'Search...'`

### noResultsFoundText

Sets the text displayed when no results are found in the search.

```vue
<template>
    <SelectField noResultsFoundText="No results found" />
</template>
```

- **Type:** `string`
- **Default:** `'No results found'`

### disabled

Sets whether the select field is disabled or not.

```vue
<template>
    <SelectField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### validator

Sets the validator function for the field, which controls its internal validation state.

```vue
<template>
    <InputField :validator="validateField" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Sets the error message of the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <SelectField v-model:error="errorMessage" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### hasSeparator

Adds a separator between options in the dropdown.

```vue
<template>
    <SelectField hasSeparator />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### multiple

Enables multiple selection mode.

```vue
<template>
    <SelectField multiple />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasBadgeStack

Enables badge stack for multiple selected options.

```vue
<template>
    <SelectField hasBadgeStack multiple />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### allowDeselect

Allows deselecting the selected option.

```vue
<template>
    <SelectField allowDeselect />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showLoadingState

Sets whether to show the loading state when options are being loaded.

```vue
<template>
    <SelectField showLoadingState />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### isLoading

Sets whether the options are currently being loaded.

```vue
<template>
    <SelectField :isLoading="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### loadingText

Sets the loading text displayed when options are being loaded.

```vue
<template>
    <SelectField loadingText="Loading options..." />
</template>
```

- **Type:** `string`
- **Default:** `'Loading options...'`

### loadingOptionsPlaceholder

Sets the placeholder text displayed when options are being loaded.

```vue
<template>
    <SelectField loadingOptionsPlaceholder="Options are being loaded" />
</template>
```

- **Type:** `string`
- **Default:** `'Options are being loaded'`

### selectBoxClass

Allows passing custom classes to the select box for additional styling.

```vue
<template>
    <SelectField selectBoxClass="custom-select-box" />
</template>
```

- **Type:** `string`

### clearSelectionAriaLabel
Sets the accessible label for the clear selection button in multi-select mode. Useful for i18n.

```vue
<template>
    <SelectField clearSelectionAriaLabel="Limpiar selección" />
</template>
```

- **Type:** `string`

### transparent

When `true`, removes the default `bg-background-container-surface` background from the select box, making it transparent.

```vue
<template>
    <SelectField transparent />
</template>
```

- **Type:** `boolean`
- **Default:** `false`
- **Default:** `'Clear selection'`





