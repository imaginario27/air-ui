
## Component

::component-code
---
srcDir: 'forms/fields/ToggleButtonsGroupField.vue'
props: 
    id: "field-id"
    label: "Label"
    helpText: "Help text example"
    buttons: 
        - text: "Option 1"
          value: "option1"
        - text: "Option 2"
          value: "option2"
    modelValue: "option1"
    onlyIcon: false
    groupStyle: "grouped"
    disabled: false
items:
    groupStyle: 
        - value: grouped
          text: GROUPED
        - value: segmented
          text: SEGMENTED
external:
  - buttons
externalTypes:
  - ToggleButton[]
enums:
    groupStyle: "ToggleButtonGroupStyle"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
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
        "default": "ToggleButton[]",
    },
    {
        "name": "modelValue",
        "required": "true",
        "type": "string",
    },
    {
        "name": "onlyIcon", 
        "default": "false", 
        "type": "boolean",
    },
    {
        "name": "groupStyle",
        "type": "ToggleButtonGroupStyle",
    },   
    {
        "name": "disabled",
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
    <ToggleButtonsGroupField id="field-id" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label 

Sets the label of the field.

```vue
<template>
    <ToggleButtonsGroupField label="Example label text" />
</template>
```

- **Type:** `string`
- **Default:** `'Text'`

### helpText

Sets the help text of the field.

```vue
<template>
    <ToggleButtonsGroupField helpText="This is an example help text." />
</template>
```

- **Type:** `string`
- **Default:** `''`

### buttons

Sets the buttons options of the field. Use two buttons for the toggle behavior.

Buttons can be of type `ToggleButton` or `ToggleIconButton`. The first one includes a text and an optional icon, while the second one is only an icon button.

#### Using TogggleButton array

```vue
<template>
    <ToggleButtonsGroupField :buttons="exampleButtons" />
</template>
<script setup lang="ts">
const exampleButtons = ref<ToggleButton[]>([
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
])
</script>
```

#### Using TogggleIconButton array 
```vue 
<template> 
    <ToggleButtonsGroupField 
        :buttons="exampleIconButtons" 
        onlyIcon 
    /> 
</template> 
<script setup lang="ts">
const exampleIconButtons = ref<ToggleIconButton[]>([ 
    { icon: 'mdi:arrow-up', value: 'Newest' }, 
    { icon: 'mdi:arrow-down', value: 'Oldest' }, 
    ]) 
</script> 
```

- **Type:** `ToggleButton[] | ToggleIconButton[]`
    
```ts
export interface BaseToggleButton {
    value: string
    active?: boolean
    action?: () => void
    size?: ButtonSize
    icon?: string
}

export interface ToggleButton extends BaseToggleButton {
    text: string
    iconPosition?: IconPosition
}

export type ToggleIconButton = BaseToggleButton

export type ToggleButtonItem = ToggleButton | ToggleIconButton
```

### modelValue

Sets the selected value of the field.

```vue
<template>
    <ToggleButtonsGroupField v-model="selectedValue" />
</template>
<script setup lang="ts">
const selectedValue = ref<string>('option1')
</script>
```

- **Type:** `string`
- **Required:** `true`

### onlyIcon
When using icon buttons, this prop determines whether to display only the icons or also the text (if available). 
```vue 
    <template> 
        <ToggleButtonsGroupField 
            :buttons="exampleIconButtons" 
            onlyIcon 
        /> 
    </template> 
<script setup lang="ts"> 
const exampleIconButtons = ref<ToggleIconButton[]>([ 
    { icon: 'mdi:arrow-up', value: 'Newest' }, 
    { icon: 'mdi:arrow-down', value: 'Oldest' }, 
]) 
</script> 
``` 

- **Type:** `boolean` 
- **Default:** `false`

### groupStyle

Sets the style of the toggle buttons group.

```vue
<template>
    <ToggleButtonsGroupField :groupStyle="ToggleButtonGroupStyle.GROUPED" />
</template>
```

- **Type:** `ToggleButtonGroupStyle`

#### Options
::options-table
---
options: [
    {
        value: "GROUPED",
        description: "Grouped style",
    },
    {
        value: "SEGMENTED",
        description: "Segmented style",
    },
]
---
::

### disabled

Sets the disabled state of the field.

```vue
<template>
    <OptionButtonsGroupField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`