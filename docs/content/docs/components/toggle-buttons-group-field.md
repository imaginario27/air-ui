
## Component

::component-code
---
srcDir: 'forms/fields/ToggleButtonsGroupField.vue'
props: 
    id: "field-id"
    label: "Label"
    helpText: "Help text example"
    helpTextPosition: "bottom"
    buttons: 
        - text: "Option 1"
          value: "option1"
          ariaLabel: "Select option 1"
        - text: "Option 2"
          value: "option2"
          ariaLabel: "Select option 2"
    modelValue: "option1"
    onlyIcon: false
    groupStyle: "grouped"
    disabled: false
    transparent: false
items:
    groupStyle: 
        - value: grouped
          text: GROUPED
        - value: segmented
          text: SEGMENTED
    helpTextPosition:
        - value: top
          text: TOP
        - value: bottom
          text: BOTTOM
external:
  - buttons
externalTypes:
  - ToggleButton[] | ToggleIconButton[]
enums:
    groupStyle: "ToggleButtonGroupStyle"
    helpTextPosition: "Position"
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

### helpText

Sets the help text of the field.

```vue
<template>
    <ToggleButtonsGroupField helpText="This is an example help text." />
</template>
```

- **Type:** `string`
- **Default:** `''`

### helpTextPosition

Sets the position of the help text relative to the field. It uses the `Position` enum.

```vue
<template>
    <ToggleButtonsGroupField helpTextPosition="top" helpText="Appears above the field" />
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
    { icon: 'mdi:arrow-up', value: 'Newest', ariaLabel: 'Sort by newest' }, 
    { icon: 'mdi:arrow-down', value: 'Oldest', ariaLabel: 'Sort by oldest' }, 
]) 
</script> 
```

- **Type:** `ToggleButton[] | ToggleIconButton[]`
    
```ts
export interface BaseToggleButton {
    value: string
    ariaLabel?: string
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

For icon-only buttons (`ToggleIconButton[]`), set `ariaLabel` on each item so every button has an accessible name.

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
    <ToggleButtonsGroupField disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### transparent

Removes the background fill from each toggle button, making them transparent.

```vue
<template>
    <ToggleButtonsGroupField transparent />
</template>
```

- **Type:** `boolean`
- **Default:** `false`