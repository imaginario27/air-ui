
## Component

::component-code
---
srcDir: 'steppers/vertical-stepper/VerticalStepper.vue'
props: 
    items:
        - title: "Start with Nuxt"
          metaTitle: "Step 1: Setup"
          description: "Initialize your project using Nuxt 3 to build a performant and scalable Vue application."
          stepStatus: "none"
          stepIcon: "mdiRocketLaunch"

        - title: "Style with Tailwind"
          metaTitle: "Step 2: Styling"
          description: "Integrate Tailwind CSS to style your application using utility-first classes and responsive design."
          stepStatus: "none"
          stepIcon: "mdiBrush"

        - title: "Combine the Power"
          metaTitle: "Step 3: Integration"
          description: "Use Nuxt and Tailwind together to rapidly build modern, fully styled full-stack applications."
          stepStatus: "none"
          stepIcon: "mdiPowerPlug"
    
    stepType: "number"
    stepSize: "sm"
    stepCompletedIcon: "mdiCheck"
    hasStepper: true
    hasStepperGap: true
    showLine: true
    isStepInteractive: false
items:
    stepType: 
        - value: number
          text: NUMBER
        - value: empty
          text: EMPTY
        - value: icon
          text: ICON
    stepSize: 
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
  - items
externalTypes:
  - VerticalStepperItem[]
propsSettingsExcludedProps: ['items']
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "items",
        "type": "VerticalStepperItem[]",
    },
    {
        "name": "stepType",
        "default": "StepIndicatorType.NUMBER",
        "type": "StepIndicatorType",
    },
    {
        "name": "stepSize",
        "default": "StepIndicatorSize.SM",
        "type": "StepIndicatorSize",
    },
    {
        "name": "stepCompletedIcon",
        "default": "mdiCheck",
        "type": "string",
    },
    {
        "name": "hasStepper",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "hasStepperGap",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "showLine",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "isStepInteractive",
        "default": "false",
        "type": "boolean",
    },
]
---
::

## Usage

### items

The `items` prop is an array of `VerticalStepperItem` objects that define the steps of the stepper.

```vue
<template>
    <VerticalStepper :items />
</template>
<script setup lang="ts">
const items: VerticalStepperItem[] = [
    {
        title: "Start with Nuxt",
        metaTitle: "Step 1: Setup",
        description: "Initialize your project using Nuxt 3 to build a performant and scalable Vue application.",
        stepStatus: "none",
        stepIcon: "mdiRocketLaunch",
    },
    {
        title: "Style with Tailwind",
        metaTitle: "Step 2: Styling",
        description: "Integrate Tailwind CSS to style your application using utility-first classes and responsive design.",
        stepStatus: "none",
        stepIcon: "mdiBrush",
    },
    {
        title: "Combine the Power",
        metaTitle: "Step 3: Integration",
        description: "Use Nuxt and Tailwind together to
        rapidly build modern, fully styled full-stack applications.",
        stepStatus: "none",
        stepIcon: "mdiPowerPlug",
    },
]
</script>
```

- **Type:** `VerticalStepperItem[]`
- **Default:** `An example array`

#### TypeScript interface
```ts
interface VerticalStepperItem {
    title: string
    metaTitle?: string
    description: string
    stepStatus?: StepStatus
    stepIcon?: any
}
```

### stepType

Sets the type of the step indicator. Uses the `StepIndicatorType` enum.

```vue
<template>
    <VerticalStepper :stepType="StepIndicatorType.ICON" />
</template>
```

#### Options
::options-table
---
options: [
    {
        value: "NUMBER",
        description: "Uses a numbered step indicator",
    },
    {
        value: "EMPTY",
        description: "Dont show any item inside the step indicator",
    },
    {
        value: "ICON",
        description: "Displays the icon passed from the stepIcon object key.",
    },
]
---
::

### stepSize

Sets the size of the step indicator. Uses the `StepIndicatorSize` enum.

```vue
<template>
    <VerticalStepper :stepSize="StepIndicatorSize.SM" />
</template>
```

#### Options
::options-table
---
options: [
    {
        value: "XL",
        description: "Large",
    },
    {
        value: "LG",
        description: "Large",
    },
    {
        value: "MD",
        description: "Medium",
    },
    {
        value: "SM",
        description: "Small",
    },
    {
        value: "XS",
        description: "Extra small",
    },
]
---
::

### stepCompletedIcon

Sets the icon to be displayed when the step is completed.

```vue
<template>
    <VerticalStepper stepCompletedIcon="mdiCheck" />
</template>
```

### hasStepper

Sets whether the stepper is displayed or not.

```vue
<template>
    <VerticalStepper :hasStepper="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### hasStepperGap

Sets whether the gap between the step indicator and the vertical is displayed or not.

```vue
<template>
    <VerticalStepper :hasStepperGap="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### showLine

Sets whether the vertical line between the steps is displayed or not.

```vue
<template>
    <VerticalStepper :showLine="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### isStepInteractive

Sets whether the steps indicator should use or not.

```vue
<template>
    <VerticalStepper :isStepInteractive="false" />
</template>
```

- **Type:** `boolean`
- **Default:** `false` 


## Slots
::slots-table
---
slots: [
    {
        name: "default",
        description: "Can be used as an alternative to the items props to loop through the steps. Useful to harness the <VerticalStep> slot and render custom content instead of the step description.",
    },
]
---
::

```vue
<template>
    <VerticalStepper>
        <VerticalStep
            v-if="item in items"
            :key="item.title"
            :step
            :title="item.title"
            :description="item.description
        />
    </VerticalStepper>
</template>
<script setup lang="ts">
const items: VerticalStepperItem[] = [
    ...
]
</script>
```

## VerticalStep

Represents the single vertical step. 

::component-code
---
srcDir: 'steppers/vertical-stepper/VerticalStep.vue'
props:    
    title: "Step title"
    metaTitle: "Step 1"
    description: "Description"
    step: 1
    stepType: "number"
    stepSize: "sm"
    stepIcon: "mdiHelp"
    stepCompletedIcon: "mdiCheck"
    hasStepper: true
    hasStepperGap: true
    showLine: true
    isLast: false
    isHovered: false
items:
    stepType: 
        - value: number
          text: NUMBER
        - value: empty
          text: EMPTY
        - value: icon
          text: ICON
    stepSize: 
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
previewBackground: 'white'
---
::

### Props

::props-table
---
props: [
    {
        "name": "title",
        "type": "string",
        "default": "Step title",
    },
    {
        "name": "metaTitle",
        "type": "string",
    },
    {
        "name": "description",
        "type": "string",
    },
    {
        "name": "step",
        "type": "number",
        "default": 1,
    },
    {
        "name": "stepType",
        "default": "StepIndicatorType.NUMBER",
        "type": "StepIndicatorType",
    },
    {
        "name": "stepStatus",
        "default": "StepStatus.NONE",
        "type": "StepStatus",
    },
    {
        "name": "stepSize",
        "default": "StepIndicatorSize.SM",
        "type": "StepIndicatorSize",
    },
    {
        "name": "stepIcon",
        "type": "string",
    },
    {
        "name": "stepCompletedIcon",
        "type": "string",
    },
    {
        "name": "isLast",
        "type": "boolean",
        "default": "false",
    },
    {
        "name": "hasStepper",
        "type": "boolean",
        "default": "true",
    },
    {
        "name": "hasStepperGap",
        "type": "boolean",
        "default": "true",
    },
    {
        "name": "showLine",
        "type": "boolean",
        "default": "true",
    },
    {
        "name": "isHovered",
        "type": "boolean",
    },
]
---
::

### Shared props

The `<VerticalStep>` component uses almost the same props as the parent wrapper except for a few different props.

### isLast

If the step is set as the last step, this item will not display the vertical line.

```vue
<template>
    <VerticalStep isLast />
</template>
```

- **Type:** `boolean`
- **Default:** `false` 

### isHovered

Sets the hover state for the current step indicator.

```vue
<template>
    <VerticalStep isHovered />
</template>
```

- **Type:** `boolean`
- **Default:** `false` 


### Item slots
::slots-table
---
slots: [
    {
        name: "default",
        description: "Used to render custom content instead of the description.",
    },
]
---
::

```vue
<template>
    <VerticalStep
        title="Sample title"
    >
        <!-- Custom step content -->
    </VerticalStep>
</template>
```


   