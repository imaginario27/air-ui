
## Component

::component-code
---
srcDir: 'forms/fields/OptionButtonsGroupField.vue'
props: 
    id: "field-id"
    label: "Label"
    helpText: "Help text example"
    buttons: 
        - text: "Option 1"
          value: "option1"
        - text: "Option 2"
          value: "option2"
        - text: "Option 3"
          value: "option3"
    modelValue: ""
    validator: null
    error: ""
    disabled: false
    required: false
    buttonStyle: "neutral-outlined"
    buttonSize: "md"
    isRounded: false
    isMultiple: false
    hasAllButton: false
    allButtonText: "All"
    allButtonValue: "all"
items:
    buttonStyle: 
        - value: primary-brand-soft
          text: PRIMARY_BRAND_SOFT
        - value: neutral-outlined
          text: NEUTRAL_OUTLINED
    size: 
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
external:
  - buttons
externalTypes:
    - OptionButton[]
enums:
    buttonStyle: "ButtonStyleType"
    buttonSize: "ButtonSize"
isPreviewContentBoxed: true
previewContentMaxWidth: 800
propsSettingsExcludedProps: ['validator', 'buttons']
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
        "type": "string",
    },
    {
        "name": "buttons",
        "type": "array",
        "default": "OptionButton[]",
    },
    {
        "name": "modelValue",
        "type": "string | string[]",
        "required": "true",
    },
    {
        "name": "validator",
        "type": "function",
        "default": "null",
    },
    {
        "name": "error",
        "type": "string",
        "default": "''",
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
        "name": "buttonStyle",
        "default": "ButtonStyleType.NEUTRAL_OUTLINED",
        "type": "ButtonStyleType.NEUTRAL_OUTLINED | ButtonStyleType.PRIMARY_BRAND_SOFT",
    },
    {
        "name": "buttonSize",
        "type": "ButtonSize",
    },
    {
        "name": "isRounded",
        "type": "boolean",
        "default": "false",
    },
    {
        "name": "isMultiple",
        "type": "boolean",
        "default": "false",
    },
    {
        "name": "hasAllButton",
        "type": "boolean",
        "default": "false",
    },
    {
        "name": "allButtonText",
        "type": "string",
        "default": "'All'",
    },
    {
        "name": "allButtonValue",
        "type": "string",
        "default": "'all'",
    },
]
---
::

## Usage
### id 

Sets the id of the field.

```vue
<template>
    <OptionButtonsGroupField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label 

Sets the label of the field.

```vue
<template>
    <OptionButtonsGroupField label="Example label text" />
</template>
```

- **Type:** `string`
- **Default:** `'Text'`

### helpText

Sets the help text of the field.

```vue
<template>
    <OptionButtonsGroupField helpText="This is an example help text." />
</template>
```

- **Type:** `string`
- **Default:** `''`

### buttons

Sets the buttons options of the field.

```vue
<template>
    <OptionButtonsGroupField :buttons="exampleButtons" />
</template>
<script setup lang="ts">
const exampleButtons = ref<OptionButton[]>([
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' }
])
</script>
```

- **Type:** `OptionButton[]`

```ts
export interface ActionButton {
    text: string
    value: string
    ariaLabel?: string
    active?: boolean
    action?: () => void
    size?: ButtonSize
    icon?: string
    iconPosition?: IconPosition
    disabled?: boolean
}

export interface OptionButton extends ActionButton {
    styleType?: ButtonStyleType
}
```

`ariaLabel` is optional for text buttons. Use it when you need a custom accessible name.

### modelValue

Sets the selected value(s) of the field.

```vue
<template>
    <OptionButtonsGroupField v-model="selectedOption" />
</template>
<script setup lang="ts">
const selectedOption = ref<string | string[]>('')
</script>
```

- **Type:** `string | string[]`
- **Required:** `true`

### validator

Sets the validator function for the field, which controls its internal validation state.

Since it can be a string or an array value, the `validateArrayField` or `validateField` utilities can be used to perform required field validation.

```vue
<template>
    <OptionButtonsGroupField :validator="validateArrayField" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Sets the error message of the field.

```vue
<template>
    <OptionButtonsGroupField error="This is an error message." />
</template>
```

- **Type:** `string`
- **Default:** `''`

### disabled

Sets the disabled state of the field.

```vue
<template>
    <OptionButtonsGroupField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### required

Sets the required state of the field.

```vue
<template>
    <OptionButtonsGroupField required />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### buttonStyle

Sets the style of the option buttons. It uses the `ButtonStyleType.NEUTRAL_OUTLINED` or `ButtonStyleType.PRIMARY_BRAND_SOFT` enum.

```vue
<template>
    <OptionButtonsGroupField :buttonStyle="ButtonStyleType.NEUTRAL_OUTLINED" />
</template>
```

- **Type:** `ButtonStyleType.NEUTRAL_OUTLINED | ButtonStyleType.PRIMARY_BRAND_SOFT`
- **Default:** `ButtonStyleType.NEUTRAL_OUTLINED`

#### Options

::options-table
---
options: [
    {
        value: "PRIMARY_BRAND_SOFT",
        description: "Primary brand soft",
    },
    {
        value: "NEUTRAL_OUTLINED",
        description: "Neutral outlined",
    },
]
---
::

### buttonSize

Sets the size of the option buttons. It uses the `ButtonSize` enum.

```vue
<template>
    <OptionButtonsGroupField :buttonSize="ButtonSize.MD" />
</template>
```

- **Type:** `ButtonSize`
- **Default:** `ButtonSize.MD`

#### Options
::options-table
---
options: [
    {
        value: "XS",
        description: "xs",
    },
    {
        value: "SM",
        description: "sm",
    },
    {
        value: "MD",
        description: "md",
    },
    {
        value: "LG",
        description: "lg",
    },
    {
        value: "XL",
        description: "xl",
    },
    {
        value: "XXL",
        description: "2xl",
    },
]
---
::

### isRounded

Sets whether the option buttons should be rounded.

```vue
<template>
    <OptionButtonsGroupField isRounded />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isMultiple

Sets whether multiple options can be selected.

```vue
<template>
    <OptionButtonsGroupField isMultiple />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasAllButton

Sets whether to include an "All" button that selects/deselects all options.

```vue
<template>
    <OptionButtonsGroupField hasAllButton />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### allButtonText

Sets the text for the "All" button.

```vue
<template>
    <OptionButtonsGroupField allButtonText="Select All" />
</template>
```

- **Type:** `string`
- **Default:** `'All'`

### allButtonValue

Sets the value for the "All" button.

```vue
<template>
    <OptionButtonsGroupField allButtonValue="select_all" />
</template>
```

- **Type:** `string`
- **Default:** `'all'`
