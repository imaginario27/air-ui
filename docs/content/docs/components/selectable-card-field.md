## Component

::component-code
---
srcDir: 'forms/fields/SelectableCardField.vue'
props: 
    id: "selectable-card-field-1"
    label: "Label"
    options:
        - value: "option1"
          title: "Option 1"
          description: "Description for option 1"
        - value: "option2"
          title: "Option 2"
          description: "Description for option 2"
        - value: "option3"
          title: "Option 3"
          description: "Description for option 3"
    modelValue: ""
    multiple: false
    selectMode: "card"
    validator: null
    error: ""
    required: false
    disabled: false
    helpText: "Help text example"
    showLoadingState: false
    isLoading: false
    loadingText: "Loading"
    titleClass: ""
    descriptionClass: ""
    checkIcon: "mdi:check-circle-outline"
    containedIconShape: "square"
    containedIconStyleType: "flat"
    layoutAlign: "left"
    buttonSize: "lg"
    hasSecondaryBtn: true
    secondaryBtnText: "Details"
    secondaryBtnStyleType: "neutral-outlined"
    secondaryBtnIconPosition: "none"
    secondaryBtnIcon: "mdi:arrow-right"
    selectBtnStyleType: "neutral-filled"
    selectBtnIconPosition: "none"
    selectBtnIcon: "mdi:arrow-right"
    selectText: "Select"
    selectedText: "Selected"
    hasFooter: true
    footerContentAlign: "right"
    hasShadow: true
    gridDesktopCols: 3
    gridTabletCols: 2
    gridMobileCols: 1
    gridGapClass: "gap-6"
items:
    containedIconShape: 
        - value: square
          text: SQUARE
        - value: circle
          text: CIRCLE
    containedIconStyleType: 
        - value: flat
          text: FLAT
        - value: filled
          text: FILLED
    containedIconColor: 
        - value: neutral
          text: NEUTRAL
        - value: success
          text: SUCCESS
        - value: warning
          text: WARNING
        - value: danger
          text: DANGER
        - value: info
          text: INFO
        - value: primary-brand
          text: PRIMARY_BRAND
        - value : secondary-brand
          text: SECONDARY_BRAND
    layoutAlign: 
        - value: left
          text: LEFT
        - value: center
          text: CENTER
    selectMode:
        - value: card
          text: CARD
        - value: button
          text: BUTTON
    secondaryBtnStyleType:
        - value: primary-brand-filled
          text: PRIMARY_BRAND_FILLED
        - value: primary-brand-transparent
          text: PRIMARY_BRAND_TRANSPARENT
        - value: primary-brand-soft
          text: PRIMARY_BRAND_SOFT
        - value: secondary-brand-filled
          text: SECONDARY_BRAND_FILLED
        - value: neutral-outlined
          text: NEUTRAL_OUTLINED
        - value: neutral-transparent
          text: NEUTRAL_TRANSPARENT
        - value: neutral-transparent-subtle
          text: NEUTRAL_TRANSPARENT_SUBTLE
        - value: neutral-filled
          text: NEUTRAL_FILLED
        - value: delete-filled
          text: DELETE_FILLED
        - value: delete-outlined
          text: DELETE_OUTLINED
        - value: delete-soft
          text: DELETE_SOFT
        - value: delete-transparent
          text: DELETE_TRANSPARENT
    selectBtnStyleType:
        - value: primary-brand-filled
          text: PRIMARY_BRAND_FILLED
        - value: primary-brand-transparent
          text: PRIMARY_BRAND_TRANSPARENT
        - value: primary-brand-soft
          text: PRIMARY_BRAND_SOFT
        - value: secondary-brand-filled
          text: SECONDARY_BRAND_FILLED
        - value: neutral-outlined
          text: NEUTRAL_OUTLINED
        - value: neutral-transparent
          text: NEUTRAL_TRANSPARENT
        - value: neutral-transparent-subtle
          text: NEUTRAL_TRANSPARENT_SUBTLE
        - value: neutral-filled
          text: NEUTRAL_FILLED
        - value: delete-filled
          text: DELETE_FILLED
        - value: delete-outlined
          text: DELETE_OUTLINED
        - value: delete-soft
          text: DELETE_SOFT
        - value: delete-transparent
          text: DELETE_TRANSPARENT
    secondaryBtnIconPosition:
        - value: none
          text: NONE
        - value: left
          text: LEFT
        - value: right
          text: RIGHT
    selectBtnIconPosition:
        - value: none
          text: NONE
        - value: left
          text: LEFT
        - value: right
          text: RIGHT
    buttonSize: 
        - value: 2xl
          text: XXL
        - value: xl
          text: XL
        - value: lg
          text: LG
        - value: md
          text: MD
        - value: sm
          text: SM
        - value: xs
          text: XS
    footerContentAlign:
        - value: left
          text: LEFT
        - value: center
          text: CENTER
        - value: right
          text: RIGHT
enums:
    containedIconShape: "IconContainerShape"
    containedIconStyleType: "IconContainerStyleType"
    containedIconColor: "ColorAccent"
    layoutAlign: "Align"
    selectMode: "CardSelectionMode"
    secondaryBtnStyleType: "ButtonStyleType"
    secondaryBtnIconPosition: "IconPosition"
    selectBtnStyleType: "ButtonStyleType"
    selectBtnIconPosition: "IconPosition"
    buttonSize: "ButtonSize"
    footerContentAlign: "Align"
propsSettingsExcludedProps: ['options', 'validator', 'modelValue']
isPreviewContentBoxed: true
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
        "name": "options",
        "type": "SelectableCardOption[]",
    },
    {
        "name": "modelValue",
        "required": "true",
        "type": "string | boolean | Array<string | boolean> | null",
    },
    {
        "name": "multiple",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "selectMode",
        "default": "CardSelectionMode.CARD",
        "type": "CardSelectionMode",
    },
    {
        "name": "validator",
        "default": "null",
        "type": "function",
    },
    {
        "name": "error",
        "default": "''",
        "type": "string",
    },
    {
        "name": "required",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "helpText",
        "type": "string",
    },
    {
        "name": "showLoadingState",
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
        "default": "'Loading'",
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
        "name": "checkIcon",
        "default": "'mdi:check-circle-outline'",
        "type": "string",
    },
    {
        "name": "containedIconShape",
        "default": "IconContainerShape.SQUARE",
        "type": "IconContainerShape",
    },
    {
        "name": "containedIconStyleType",
        "default": "IconContainerStyleType.FLAT",
        "type": "IconContainerStyleType",
    },
    {
        "name": "layoutAlign",
        "default": "Align.LEFT",
        "type": "Align",
    },
    {
        "name": "buttonSize",
        "default": "ButtonSize.LG",
        "type": "ButtonSize",
    },
    {
        "name": "hasSecondaryBtn",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "secondaryBtnText",
        "default": "'Details'",
        "type": "string",
    },
    {
        "name": "secondaryBtnStyleType",
        "default": "ButtonStyleType.NEUTRAL_OUTLINED",
        "type": "ButtonStyleType",
    },
    {
        "name": "secondaryBtnIconPosition",
        "default": "IconPosition.NONE",
        "type": "IconPosition",
    },
    {
        "name": "secondaryBtnIcon",
        "default": "'mdi:arrow-right'",
        "type": "string",
    },
    {
        "name": "selectBtnStyleType",
        "default": "ButtonStyleType.NEUTRAL_FILLED",
        "type": "ButtonStyleType",
    },
    {
        "name": "selectBtnIconPosition",
        "default": "IconPosition.NONE",
        "type": "IconPosition",
    },
    {
        "name": "selectBtnIcon",
        "default": "'mdi:arrow-right'",
        "type": "string",
    },
    {
        "name": "selectText",
        "default": "'Select'",
        "type": "string",
    },
    {
        "name": "selectedText",
        "default": "'Selected'",
        "type": "string",
    },
    {
        "name": "hasFooter",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "footerContentAlign",
        "default": "Align.RIGHT",
        "type": "Align",
    },
    {
        "name": "hasShadow",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "gridDesktopCols",
        "default": "3",
        "type": "number",
    },
    {
        "name": "gridTabletCols",
        "default": "2",
        "type": "number",
    },
    {
        "name": "gridMobileCols",
        "default": "1",
        "type": "number",
    },
]
---
::

## Usage
### id

Sets the id of the field.

```vue
<template>
  <SelectableCardField id="selectable-card-field-1" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label

Sets the label of the field.

```vue
<template>
  <SelectableCardField label="Label" />
</template>
```

- **Type:** `string`

### options

Sets the selectable card options.

```vue
<template>
    <SelectableCardField :options="options" />
</template>
<script setup lang="ts">
const options = ref<SelectableCardOption[]>([
    {
        value: 'option1',
        title: 'Option 1',
        description: 'Description for option 1',
        icon: 'mdi:star-outline',
    },
    {
        value: 'option2',
        title: 'Option 2',
        description: 'Description for option 2',
        icon: 'mdi:help',   
    },
])
</script>
```

#### TypeScript interface
```ts
export interface SelectableCardOption {
    value: string | boolean
    title: string
    titleClass?: string
    description: string
    descriptionClass?: string
    checkIcon?: string
    icon?: string
    containedIconColor?: ColorAccent
    hasSecondaryBtn?: boolean
    secondaryBtnText?: string
    secondaryBtnIconPosition?: IconPosition
    secondaryBtnIcon?: string
    disabled?: boolean
    secondaryBtnCallback?: () => void
}
```
  
### modelValue

Sets the selected value (single) or values (multiple).

```vue
<template>
    <SelectableCardField v-model="selected" />
</template>
<script setup lang="ts">
const selected = ref<string | null>(null)
</script>
```

For multi-select:

```vue
<template>
    <SelectableCardField v-model="selected" multiple />
</template>
<script setup lang="ts">
const selected = ref<Array<string | boolean>>([])
</script>
```

- **Type:** `string | boolean | Array<string | boolean> | null`
- **Required:** `true`

### multiple

Enables multiple selections.

```vue
<template>
    <SelectableCardField multiple />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### selectMode

Controls the selection UI behavior (card or button). It uses the `CardSelectionMode` enum for options.

```vue
<template>
    <SelectableCardField :selectMode="CardSelectionMode.CARD" />
</template>
```

- **Type:** `CardSelectionMode`
- **Default:** `CardSelectionMode.CARD`

#### Options
::options-table
---
options: [
    {
        value: "CARD",
        description: "Select by clicking the card",
    },
    {
        value: "BUTTON",
        description: "Select using the footer button",
    },
]
---
::

### validator

Sets the validator function for the field, which controls its internal validation state.

It uses the `validateField` or `validateArrayField` utility to perform required field validation.

```vue
<template>
    <SelectableCardField 
        :validator="validateField" 
        required 
    />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Defines the error message displayed by the field. This prop is bindable via `v-model:error`.

```vue
<template>
    <SelectableCardField v-model:error="errorMessage" />
</template>
<script setup lang="ts">
const errorMessage = ref('')
</script>
```

- **Type:** `string`
- **Default:** `''`

### required

Marks the field as required for validation.

```vue
<template>
    <SelectableCardField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### disabled

Disables all options in the field.

```vue
<template>
    <SelectableCardField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### helpText

Sets the help text.

```vue
<template>
    <SelectableCardField helpText="Help text example" />
</template>
```

- **Type:** `string`

### showLoadingState
Toggles the loading state of the field.

```vue
<template>
    <SelectableCardField :showLoadingState="true" :isLoading="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isLoading
Sets the loading state of the field.

```vue
<template>
    <SelectableCardField :isLoading="true" :showLoadingState="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### loadingText
Sets the loading text displayed when `isLoading` is true.

```vue
<template>
    <SelectableCardField 
        :isLoading="true" 
        :showLoadingState="true" 
        loadingText="Loading"
    />
</template>
```

- **Type:** `string`
- **Default:** `'Loading'`

### titleClass

Adds a custom class to the option title.

```vue
<template>
    <SelectableCardField titleClass="text-text-primary" />
</template>
```

- **Type:** `string`

### descriptionClass

Adds a custom class to the option description.

```vue
<template>
    <SelectableCardField descriptionClass="text-text-neutral" />
</template>
```

- **Type:** `string`

### checkIcon

Sets the icon used for the selected state.

```vue
<template>
    <SelectableCardField checkIcon="mdi:check" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:check-circle-outline'`

### containedIconShape

Sets the icon container shape. It uses the `IconContainerShape` enum for options.

```vue
<template>
    <SelectableCardField :containedIconShape="IconContainerShape.CIRCLE" />
</template>
```

- **Type:** `IconContainerShape`
- **Default:** `IconContainerShape.SQUARE`

#### Options
::options-table
---
options: [
    { value: "SQUARE", description: "square" },
    { value: "CIRCLE", description: "circle" },
]
---
::

### containedIconStyleType

Sets the icon container style. It uses the `IconContainerStyleType` enum for options.

```vue
<template>
    <SelectableCardField :containedIconStyleType="IconContainerStyleType.FILLED" />
</template>
```

- **Type:** `IconContainerStyleType`
- **Default:** `IconContainerStyleType.FLAT`

#### Options
::options-table
---
options: [
    { value: "FLAT", description: "flat" },
    { value: "FILLED", description: "filled" },
]
---
::

### layoutAlign

Sets the alignment of content inside each card. It uses the `Align` enum for options.

```vue
<template>
    <SelectableCardField :layoutAlign="Align.CENTER" />
</template>
```

- **Type:** `Align`
- **Default:** `Align.LEFT`

#### Options
::options-table
---
options: [
    { value: "LEFT", description: "left" },
    { value: "CENTER", description: "center" },
]
---
::

### buttonSize

Sets the button size for footer actions. It uses the `ButtonSize` enum for options.

```vue
<template>
    <SelectableCardField :buttonSize="ButtonSize.MD" />
</template>
```

- **Type:** `ButtonSize`
- **Default:** `ButtonSize.LG`

#### Options
::options-table
---
options: [
    { value: "XXL", description: "2xl" },
    { value: "XL", description: "xl" },
    { value: "LG", description: "lg" },
    { value: "MD", description: "md" },
    { value: "SM", description: "sm" },
    { value: "XS", description: "xs" },
]
---
::

### hasSecondaryBtn

Shows a secondary action button on each card.

```vue
<template>
    <SelectableCardField :hasSecondaryBtn="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### secondaryBtnText

Sets the secondary button label.

```vue
<template>
    <SelectableCardField secondaryBtnText="Details" />
</template>
```

- **Type:** `string`
- **Default:** `'Details'`

### secondaryBtnStyleType

Sets the secondary button style. It uses the `ButtonStyleType` enum for options.

```vue
<template>
    <SelectableCardField :secondaryBtnStyleType="ButtonStyleType.NEUTRAL_OUTLINED" />
</template>
```

- **Type:** `ButtonStyleType`
- **Default:** `ButtonStyleType.NEUTRAL_OUTLINED`

#### Options
::options-table
---
options: [
    { value: "PRIMARY_BRAND_FILLED", description: "primary-brand-filled" },
    { value: "PRIMARY_BRAND_TRANSPARENT", description: "primary-brand-transparent" },
    { value: "PRIMARY_BRAND_SOFT", description: "primary-brand-soft" },
    { value: "SECONDARY_BRAND_FILLED", description: "secondary-brand-filled" },
    { value: "NEUTRAL_OUTLINED", description: "neutral-outlined" },
    { value: "NEUTRAL_TRANSPARENT", description: "neutral-transparent" },
    { value: "NEUTRAL_TRANSPARENT_SUBTLE", description: "neutral-transparent-subtle" },
    { value: "NEUTRAL_FILLED", description: "neutral-filled" },
    { value: "DELETE_FILLED", description: "delete-filled" },
    { value: "DELETE_OUTLINED", description: "delete-outlined" },
    { value: "DELETE_SOFT", description: "delete-soft" },
    { value: "DELETE_TRANSPARENT", description: "delete-transparent" },
]
---
::

### secondaryBtnIconPosition

Sets the icon position for the secondary button. It uses the `IconPosition` enum for options.

```vue
<template>
    <SelectableCardField :secondaryBtnIconPosition="IconPosition.LEFT" />
</template>
```

- **Type:** `IconPosition`
- **Default:** `IconPosition.NONE`

#### Options
::options-table
---
options: [
    { value: "NONE", description: "none" },
    { value: "LEFT", description: "left" },
    { value: "RIGHT", description: "right" },
]
---
::

### secondaryBtnIcon

Sets the icon for the secondary button.

```vue
<template>
    <SelectableCardField secondaryBtnIcon="mdi:arrow-right" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:arrow-right'`

### selectBtnStyleType

Sets the primary select button style. It uses the `ButtonStyleType` enum for options.

```vue
<template>
    <SelectableCardField :selectBtnStyleType="ButtonStyleType.NEUTRAL_FILLED" />
</template>
```

- **Type:** `ButtonStyleType`
- **Default:** `ButtonStyleType.NEUTRAL_FILLED`

#### Options
::options-table
---
options: [
    { value: "PRIMARY_BRAND_FILLED", description: "primary-brand-filled" },
    { value: "PRIMARY_BRAND_TRANSPARENT", description: "primary-brand-transparent" },
    { value: "PRIMARY_BRAND_SOFT", description: "primary-brand-soft" },
    { value: "SECONDARY_BRAND_FILLED", description: "secondary-brand-filled" },
    { value: "NEUTRAL_OUTLINED", description: "neutral-outlined" },
    { value: "NEUTRAL_TRANSPARENT", description: "neutral-transparent" },
    { value: "NEUTRAL_TRANSPARENT_SUBTLE", description: "neutral-transparent-subtle" },
    { value: "NEUTRAL_FILLED", description: "neutral-filled" },
    { value: "DELETE_FILLED", description: "delete-filled" },
    { value: "DELETE_OUTLINED", description: "delete-outlined" },
    { value: "DELETE_SOFT", description: "delete-soft" },
    { value: "DELETE_TRANSPARENT", description: "delete-transparent" },
]
---
::

### selectBtnIconPosition

Sets the icon position for the select button. It uses the `IconPosition` enum for options.

```vue
<template>
    <SelectableCardField :selectBtnIconPosition="IconPosition.RIGHT" />
</template>
```

- **Type:** `IconPosition`
- **Default:** `IconPosition.NONE`

#### Options
::options-table
---
options: [
    { value: "NONE", description: "none" },
    { value: "LEFT", description: "left" },
    { value: "RIGHT", description: "right" },
]
---
::

### selectBtnIcon

Sets the icon for the select button.

```vue
<template>
    <SelectableCardField selectBtnIcon="mdi:arrow-right" />
</template>
```

- **Type:** `string`
- **Default:** `'mdi:arrow-right'`

### selectText

Sets the label for the unselected button state.

```vue
<template>
  <SelectableCardField selectText="Select" />
</template>
```

- **Type:** `string`
- **Default:** `'Select'`

### selectedText

Sets the label for the selected button state.

```vue
<template>
  <SelectableCardField selectedText="Selected" />
</template>
```

- **Type:** `string`
- **Default:** `'Selected'`

### hasFooter

Shows or hides the footer area of cards.

::content-alert
---
props:
    title: "Important"
    description: "When using the select mode `CardSelectionMode.BUTTON`, the footer will always be shown even if this prop is set to false, as the select button is located in the footer."
---
::

```vue
<template>
    <SelectableCardField :hasFooter="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### footerContentAlign

Sets the footer content alignment.

```vue
<template>
    <SelectableCardField :footerContentAlign="Align.RIGHT" />
</template>
```

- **Type:** `Align`
- **Default:** `Align.RIGHT`

#### Options
::options-table
---
options: [
  { value: "LEFT", description: "left" },
  { value: "CENTER", description: "center" },
  { value: "RIGHT", description: "right" },
]
---
::

### hasShadow

Toggles card shadow.

```vue
<template>
    <SelectableCardField :hasShadow="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### gridDesktopCols

Sets the number of columns on desktop.

```vue
<template>
    <SelectableCardField :gridDesktopCols="3" />
</template>
```

- **Type:** `number`
- **Default:** `3`

### gridTabletCols

Sets the number of columns on tablet.

```vue
<template>
    <SelectableCardField :gridTabletCols="2" />
</template>
```

- **Type:** `number`
- **Default:** `2`

### gridMobileCols

Sets the number of columns on mobile.

```vue
<template>
    <SelectableCardField :gridMobileCols="1" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### gridGapClass
Sets the gap class for the grid layout.

```vue
<template>
    <SelectableCardField :gridGapClass="'gap-6'" />
</template>
```

- **Type:** `string`
- **Default:** `'gap-6'`
