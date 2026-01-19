
## Component

::component-code
---
srcDir: 'steppers/TabStepper.vue'
props: 
    modelValue: 1
    steps:
        - title: "Step 1"
          description: "Description one"
          icon: "mdi:home-outline"
        - title: "Step 2"
          description: "Description two"
          icon: "mdi:account-outline"
        - title: "Step 3"
          description: "Description three"
          icon: "mdi:map-marker-star-outline"
    type: "number"
    completedIcon: "mdi:check"
    isInteractive: false
    hasDivider: true
    justifySteps: false
    isFullWidth: true
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
  - TabStep[]  
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
        "type": "TabStep[]>",
    },
    {
        "name": "type",
        "default": "StepIndicatorType.NUMBER",
        "type": "StepIndicatorType"
    },
    {
        "name": "size",
        "default": "StepIndicator.XL",
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
        "name": "hasDivider",
        "default": "true",
        "type": "boolean"
    },
    {
        "name": "justifySteps",
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
    <TabStepper v-model="currentStep" />
</template>
<script setup lang="ts">
const currentStep = ref(1)
</script>
```

- **Type:** `number`
- **Default:** `1`

### steps

Sets the steps. The steps are an array of objects which uses the `TabStep` interface.

```vue
<template>
    <TabStepper :steps="steps" />
</template>
<script setup lang="ts">
const steps: TabStep[] = [
    {
        title: "Step 1",
        description: "Description one",
    },
    {
        title: "Step 2",
        description: "Description two",
    },
    {
        title: "Step 3",
        description: "Description three",
    },
]
</script>
```

#### TypeScript interface
```ts
interface TabStep {
    title: string
    description?: string
    icon?: string
}
```

The `icon` property is usefull when the type is `ICON`. Otherwise, it is ignored even if it passed in the array.


### type

Sets the type of the step indicators. Uses the `StepIndicatorType` enum.

```vue
<template>
    <TabStepper :type="StepIndicatorType.NUMBER" />
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
    <TabStepper completedIcon="mdi:check" />
</template>
```

- **Type:** `string`
- **Default:** `mdi:check`

### isInteractive

Sets if the step indicator is interactive. If it is, the user can click on the step to go to the step. As a result, it will also update the `ref` asigned to the `v-model`. 

In case of having the value `false`, nothing will happen.

```vue
<template>
    <TabStepper :isInteractive="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### hasDivider

Sets if the chevron divider is displayed, which will be shown between the steps.


```vue
<template>
    <TabStepper hasDivider />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### justifySteps

Justify the spacing between the steps in order to distribute the items along the available space.

```vue
<template>
    <TabStepper :justifySteps="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### isFullWidth

Sets if the component will be displayed as a full width component. It will take the full width of the parent element. Otherwise, it will fit to the content.

```vue
<template>
    <TabStepper :isFullWidth="true" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`