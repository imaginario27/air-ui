## Component

::component-code
---
srcDir: 'dropdowns/DropdownSelect.vue'
props: 
    id: ""
    options:
        - id: "item-1"
          text: "Item 1"
          value: "item-1"
          icon: "mdiSpaOutline"
        - id: "item-2"
          text: "Item 2"
          value: "item-2"
          icon: "mdiChatOutline"
        - id: "item-3"
          text: "Item 3"
          value: "item-3"
          icon: "mdiGiftOutline"
    placeholder: "Select an option"
    type: "text"
    size: "md"
    activeStyle: "check"
    modelValue: "item-1"
    dropdownPosition: "bottom"
    selectBoxClass: "bg-background-container-surface"
    filterable: false
    searchFieldPlaceholder: "Search..."
    noResultsFoundText: "No results found"
    disabled: false
    hasSeparator: false
    multiple: false
    allowDeselect: false
    isLoading: false
    loadingText: "Loading options..."
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
propsSettingsExcludedProps: ['options']
---
::


## Props

::props-table
---
props: [
    {
        "name": "id",
        "type": "string",
    },
    {
        "name": "options",
        "default": "An example array",
        "type": "SelectOption[]",
    },
    {
        "name": "placeholder",
        "default": "Select an option",
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
        "default": null,
        "type": "string | number | (string | number)[] | null",
    },
    {
        "name": "dropdownPosition",
        "default": "DropdownPosition.BOTTOM",
        "type": "DropdownPosition",
    },
    {
        "name": "selectBoxClass",
        "type": "string",
    },
    {
        "name": "filterable",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "searchFieldPlaceholder",
        "default": "Search...",
        "type": "string",
    },
    {
        "name": "noResultsFoundText",
        "default": "No results found",
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
        "name": "isLoading",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "loadingText",
        "default": "'Loading options...'",
        "type": "string",
    },
]
---
::

## Usage
### id
Sets an id for the component.

```vue
<template>
    <DropdownSelect
        id=""
    />
</template>
```

- **Type:** `string`

### options
Sets the options for the component.

```vue
<template>
    <DropdownSelect
        :options="exampleOptions"
    />
</template>

<script setup lang="ts">
const exampleOptions = ref<SelectOption[]>([
    {
        text: "Item 1",
        value: "item-1",
    },
    {
        text: "Item 2",
        value: "item-2",
    },
    {
        text: "Item 3",
        value: "item-3",
    },
])
</script>
```

- **Type:** `SelectOption[]`
- **Default:** `'An example array'`

#### TypeScript interface
```ts
interface SelectOption {
    id?: string | number
    value: string | number
    text?: string
    icon?: any
    customIcon?: string
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
Sets the placeholder text for the select. This text appears when no option is selected.

```vue
<template>
    <DropdownSelect
        placeholder="Select an option"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Select an option'`

### type
Sets the type of the select. Uses the `SelectType` enum.

```vue
<template>
    <DropdownSelect
        type="SelectType.TEXT"
    />
</template>
```

- **Type:** `SelectType`
- **Default:** `SelectType.TEXT`

#### Options
::options-table
---
options: [
    {
        value: "TEXT",
        description: "Uses the following keys from the options array: text, value",
    },
    {
        value: "ICON",
        description: "Uses the following keys from the options array: text, value, icon | customIcon",
    },
    {
        value: "USER",
        description: "Uses the following keys from the options array: userDisplayName, userProfileImg, value",
    },
    {
        value: "IMAGE",
        description: "Uses the following keys from the options array: text, value, imgUrl, alt",
    },
]
---
::

### size
Sets the size of the select. Uses the `SelectSize` enum.

```vue
<template>
    <DropdownSelect
        size="SelectSize.LG"
    />
</template>
```

- **Type:** `SelectSize`
- **Default:** `SelectSize.MD`

#### Options
::options-table
---
options: [
    {
        value: "MD",
        description: "Medium size",
    },
    {
        value: "LG",
        description: "Large size",
    },
]
---
::

### activeStyle
Sets the active style of the select. Uses the `SelectActiveStyle` enum.

```vue
<template>
    <DropdownSelect
        activeStyle="SelectActiveStyle.FILL"
    />
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
        description: "Check style",
    },
    {
        value: "FILL",
        description: "Fill style",
    },
]
---
::

### modelValue
Sets the model value of the select. 

```vue
<template>
    <DropdownSelect
        :modelValue="selectedValue"
    />
</template>

<script setup lang="ts">
const selectedValue = ref("item-1")
</script>
```

- **Type:** `string | number | (string | number)[] | null`
- **Default:** `null`

### dropdownPosition
Sets the position of the dropdown. It is usefull to avoid dropdown menu overflow when reaching the container limit. Uses the `DropdownPosition` enum

```vue
<template>
    <DropdownSelect
        dropdownPosition="DropdownPosition.TOP"
    />
</template>
```

- **Type:** `DropdownPosition`
- **Default:** `DropdownPosition.BOTTOM`

#### Options
::options-table
---
options: [
    {
        value: "TOP",
        description: "Top position",
    },
    {
        value: "BOTTOM",
        description: "Bottom position",
    },
]
---
::

### selectBoxClass
Sets the class of the select box. Customizes and overrides the select box styles.

```vue
<template>
    <DropdownSelect
        selectBoxClass="bg-background-container-surface"
    />
</template>
```

- **Type:** `string`

### filterable
Enables or disables filterable dropdown items. Those items can be filtered using a search field that appear on top of the list items.

```vue
<template>
    <DropdownSelect
        filterable
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### searchFieldPlaceholder
Sets the placeholder text for the filtered DropdownSelect search field. It requires the prop `filterable` to be true helpful.

```vue
<template>
    <DropdownSelect
        filterable
        searchFieldPlaceholder="Search..."
    />
</template>
```

- **Type:** `string`
- **Default:** `'Search...'`

### noResultsFoundText
Sets the text to display when there are no results found while filtering. It requires the prop `filterable` to be true helpful.

```vue
<template>
    <DropdownSelect
        filterable
        noResultsFoundText="No results found"
    />
</template>
```

- **Type:** `string`
- **Default:** `'No results found'`

### disabled
Enables or disables the select. 

```vue
<template>
    <DropdownSelect
        disabled
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasSeparator
Shows or hides the separator between the dropdown menu items. 

```vue
<template>
    <DropdownSelect
        hasSeparator
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### multiple
Allows multiple selection of items. This requires the `modelValue` to be an array.

```vue
<template>
    <DropdownSelect
        multiple
    />
</template>
```

- **Type:** `boolean`
- **Default:** `false`


### allowDeselect
Allows the user to deselect items. Can be used with single and multiple selections.

```vue
<template>
    <DropdownSelect
        allowDeselect
    />
</template>
```

### isLoading
Shows a loading state for the select box and dropdown.

```vue
<template>
    <DropdownSelect
        isLoading
    />
</template>
```

### loadingText
Sets the text to display while the select box is loading. It requires the `isLoading` prop in order to be useful. 

```vue
<template>
    <DropdownSelect
        isLoading
        loadingText="Loading options..."
    />
</template>
```

- **Type:** `string`
- **Default:** `'Loading options...'`

