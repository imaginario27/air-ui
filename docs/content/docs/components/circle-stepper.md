
## Component

::component-code
---
srcDir: 'steppers/CircleStepper.vue'
props: 
    modelValue: 1
    steps:
        - icon: "mdi:home-outline"
        - icon: "mdi:account-outline"
        - icon: "mdi:map-marker-star-outline"
    type: "number"
    completedIcon: "mdi:check"
    isInteractive: false
    isFullWidth: false
    dividerClass: ""
items:
    type: 
        - value: number
          text: NUMBER
        - value: empty
          text: EMPTY
        - value: icon
          text: ICON
    size: 
        - value: xl
          text: XL
        - value: lg
          text: LG
        - value: md
          text: MD     
external:
  - modelValue
  - steps
externalTypes:
  - number
  - CircleStep[]  
enums:
    type: "StepIndicatorType"
    size: "StepIndicatorSize"
propsSettingsExcludedProps: ['steps']
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "modelValue",
        "default": "1",
        "type": "number"
    },
    {
        "name": "steps",
        "default": "An example array",
        "type": "number | CircleStep[]>",
    },
    {
        "name": "type",
        "default": "StepIndicatorType.NUMBER",
        "type": "StepIndicatorType"
    },
    {
        "name": "size",
        "default": "StepIndicatorSize.XL",
        "type": "StepIndicator"
    },
    {
        "name": "completedIcon",
        "default": "mdi:check",
        "type": "string"
    },
    {
        "name": "isInteractive",
        "default": "false",
        "type": "boolean"
    },
    {
        "name": "isFullWidth",
        "default": "true",
        "type": "boolean"
    }
]
---
::


## Usage
### modelValue

Sets the current step. The steps starts always with the value `1` by default.

```vue
<template>
    <CircleStepper v-model="currentStep" />
</template>
<script setup lang="ts">
const currentStep = ref(1)
</script>
```

- **Type:** `number`
- **Default:** `1`

### steps

Sets the steps. You can set the steps by using a number or pass an array of objects which uses the `CircleStep` interface.

```vue
<template>
    <CircleStepper :steps="steps" />
</template>
<script setup lang="ts">
const steps: CircleStep[] = [
    {
        icon: 'mdi:home-outline',
    },
    {
        icon: 'mdi:account-outline',
    },
    {
        icon: 'mdi:map-marker-star-outline',
    },
]
</script>
```

#### TypeScript interface
```ts
interface CircleStep {
    icon?: string
}
```

The `icon` property is usefull when the type is `ICON`. Otherwise, it is ignored even if it passed in the array.


### type

Sets the type of the step indicators. Uses the `StepIndicatorType` enum.

```vue
<template>
    <CircleStepper :type="StepIndicatorType.NUMBER" />
</template>
```

- **Type:** `StepIndicatorType`
- **Default:** `StepIndicatorType.NUMBER`

#### Options
::options-table
---
options: [
    {
        value: "NUMBER",
        description: "Uses numbered steps",
    },
    {
        value: "EMPTY",
        description: "Shows an empty space in the step indicator",
    },
    {
        value: "ICON",
        description: "Displays a custom icon in the step indicator (except if the step is completed).",
    },
]
---
::

### completedIcon

Sets the icon to be displayed when the step is completed. 

```vue
<template>
    <CircleStepper completedIcon="mdi:check" />
</template>
```

- **Type:** `string`
- **Default:** `mdi:check`

### isInteractive

Sets if the step indicator is interactive. If it is, the user can click on the step to go to the step. As a result, it will also update the `ref` asigned to the `v-model`. 

In case of having the value `false`, nothing will happen.

```vue
<template>
    <CircleStepper :isInteractive="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isFullWidth

Sets if the component will be displayed as a full width component. It will take the full width of the parent element. Otherwise, it will fit to the content.

```vue
<template>
    <CircleStepper :isFullWidth="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### dividerClass

Sets the class to be applied to the divider. It is useful when you want to customize the divider. 

You can change for instance the color or the divider or the min-width.