
## Component

::component-code
---
srcDir: 'steppers/StepIndicator.vue'
props: 
    type: "number"
    status: "none"
    size: "xl"
    step: 1
    stepIcon: 'mdi:home-outline'
    completedIcon: 'mdi:check'
    isHovered: false
items:
    type: 
        - value: number
          text: NUMBER
        - value: empty
          text: EMPTY
        - value: icon
          text: ICON
    status: 
        - value: none
          text: NONE
        - value: inactive
          text: INACTIVE
        - value: current
          text: CURRENT
        - value: completed
          text: COMPLETED
    size: 
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
enums:
    type: "StepIndicatorType"
    status: "StepStatus"
    size: "StepIndicatorSize"
previewBackground: 'white'
---
::

## Props

::props-table
---
props: [
    {
        "name": "type",
        "default": "StepIndicatorType.NUMBER",
        "type": "StepIndicatorType"
    },
    {
        "name": "status",
        "default": "StepStatus.INACTIVE",
        "type": "StepStatus"
    },
    {
        "name": "size",
        "default": "StepIndicatorSize.XL",
        "type": "StepIndicatorSize"
    },
    {
        "name": "step",
        "default": 1,
        "type": "number"
    },
    {
        "name": "stepIcon",
        "type": "string"
    },
    {
        "name": "completedIcon",
        "default": "'mdi:check'",
        "type": "string"
    },
    {
        "name": "isHovered",
        "default": "false",
        "type": "boolean",
    },
]
---
::


## Usage
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

### status

Sets the status of the step indicators. Uses the `StepStatus` enum.

```vue
<template>
    <CircleStepper :status="StepStatus.CURRENT" />
</template>
```

#### Options
::options-table
---
options: [
    {
        value: "none",
        description: "The step does not use state and renders a default style",
    },
    {
        value: "inactive",
        description: "The step is inactive",
    },
    {
        value: "current",
        description: "The step is the current step",
    },
    {
        value: "completed",
        description: "The step is completed",
    },
]
---
::

### size

Sets the size of the step indicators. Uses the `StepIndicatorSize` enum.

```vue
<template>
    <CircleStepper :size="StepIndicatorSize.XL" />
</template>
```

#### Options
::options-table
---
options: [
    {
        value: "XL",
        description: "Large size",
    },
    {
        value: "LG",
        description: "Large size",
    },
    {
        value: "MD",
        description: "Medium size",
    },
    {
        value: "SM",
        description: "Small size",
    },
    {
        value: "XS",
        description: "Extra small size",
    },
]
---
::

### step

Sets the current step. 

```vue
<template>
    <CircleStepper :step="3" />
</template>
```

- **Type:** `number`
- **Default:** `1`

### stepIcon

Sets the icon to be displayed when the step is not completed. 

```vue
<template>
    <CircleStepper stepIcon="mdi:home-outline" />
</template>
```

- **Type:** `string`
- **Default:** `mdi:home-outline`

### completedIcon

Sets the icon to be displayed when the step is completed. 

```vue
<template>
    <CircleStepper completedIcon="mdi:check" />
</template>
```

- **Type:** `string`
- **Default:** `mdi:check`

### isHovered

Sets if the step indicator is interactive. 

```vue
<template>
    <CircleStepper isHovered />
</template>
```

- **Type:** `boolean`
- **Default:** `false`