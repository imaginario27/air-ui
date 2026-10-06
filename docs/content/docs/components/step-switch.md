
## Component

::component-code
---
srcDir: 'forms/fields/switch/StepSwitch.vue'
props: 
    id: "step-switch-id"
    modelValue: "medium"
    steps:
        - value: "minimal"
          label: "Minimal"
        - value: "low"
          label: "Low"
        - value: "medium"
          label: "Medium"
        - value: "high"
          label: "High"
        - value: "xhigh"
          label: "Extra high"
        - value: "max"
          label: "Max"
    maxSteps: 5
    disabled: false
    size: "md"
    styleType: "brand"
items:
    size: 
        - value: xs
          text: XS
        - value: sm
          text: SM
        - value: md
          text: MD
        - value: lg
          text: LG
    styleType:
        - value: brand
          text: BRAND
        - value: success
          text: SUCCESS
external:
  - modelValue
externalTypes:
  - string
enums:
    size: "ControlFieldSize"
    styleType: "SwitchStyle"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
propsSettingsExcludedProps: ['steps', 'modelValue']
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
        "name": "ariaLabel",
        "type": "string",
    },
    {
        "name": "modelValue",
        "type": "string | number",
    },
    {
        "name": "steps",
        "default": "[]",
        "type": "StepSwitchOption[]",
    },
    {
        "name": "maxSteps",
        "default": "5",
        "type": "number",
    },
    {
        "name": "disabled",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "size",
        "default": "ControlFieldSize.MD",
        "type": "ControlFieldSize",
    },
    {
        "name": "styleType",
        "default": "SwitchStyle.BRAND",
        "type": "SwitchStyle",
    },
]
---
::

## Usage

### id

Sets the id of the underlying native range input.

```vue
<template>
    <StepSwitch id="my-step-switch" :steps="steps" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### ariaLabel

Sets the accessible label of the switch. Use it when there is no visible label. Falls back to `Select step`.

```vue
<template>
    <StepSwitch id="my-step-switch" :steps="steps" ariaLabel="Effort" />
</template>
```

- **Type:** `string`

### modelValue

Controls the selected step by its `value`. Use `v-model` for two-way binding. If it does not match any step, the first step is shown as selected.

```vue
<template>
    <StepSwitch id="my-step-switch" v-model="effort" :steps="steps" />
</template>
<script setup lang="ts">
const effort = ref<string | number>('medium')
</script>
```

- **Type:** `string | number`

### steps

Defines the available steps, in order. Each step has a `value` and an optional `label`. The `label` is announced by screen readers as the value text of the selected step.

```vue
<template>
    <StepSwitch id="my-step-switch" v-model="effort" :steps="steps" />
</template>
<script setup lang="ts">
const steps: StepSwitchOption[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
]
</script>
```

- **Type:** `StepSwitchOption[]`
- **Default:** `[]`

#### TypeScript interface
```ts
interface StepSwitchOption {
    value: string | number
    label?: string
}
```

### maxSteps

Sets the maximum number of steps rendered. Extra items in `steps` are ignored. Keeps the control compact and readable.

::content-alert
---
props:
    title: "Recommended maximum"
    description: "It is not enforced, but we recommend using no more than 7 steps. Beyond that, the positions become hard to read and to target, especially in small sizes."
---
::

```vue
<template>
    <StepSwitch id="my-step-switch" :steps="steps" :maxSteps="4" />
</template>
```

- **Type:** `number`
- **Default:** `5`

### disabled

Sets the disabled state of the switch. When disabled, clicks and keyboard input are ignored and the switch appearance reflects the inactive state.

```vue
<template>
    <StepSwitch id="my-step-switch" :steps="steps" disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### size

Sets the size of the switch. It uses the `ControlFieldSize` enum.

```vue
<template>
    <StepSwitch id="my-step-switch" :steps="steps" :size="ControlFieldSize.LG" />
</template>
```

- **Type:** `ControlFieldSize`
- **Default:** `ControlFieldSize.MD`

#### Options
::options-table
---
options: [
    {
        value: "XS",
        description: "Extra Small",
    },
    {
        value: "SM",
        description: "Small",
    },
    {
        value: "MD",
        description: "Medium",
    },
    {
        value: "LG",
        description: "Large",
    },
]
---
::

### styleType

Sets the style type of the switch. It uses the `SwitchStyle` enum.

```vue
<template>
    <StepSwitch id="my-step-switch" :steps="steps" :styleType="SwitchStyle.SUCCESS" />
</template>
```

- **Type:** `SwitchStyle`
- **Default:** `SwitchStyle.BRAND`

#### Options
::options-table
---
options: [
    {
        value: "BRAND",
        description: "Uses the primary brand color for the filled part of the track.",
    },
    {
        value: "SUCCESS",
        description: "Uses the success color for the filled part of the track.",
    },
]
---
::

## Emits

::options-table
---
options: [
    {
        value: "update:modelValue",
        description: "Emitted with the `value` of the selected step when the user clicks a step or moves the native range input with the keyboard.",
    },
]
---
::

#### Example

```vue
<template>
    <StepSwitch
        id="my-step-switch"
        :modelValue="effort"
        :steps="steps"
        @update:modelValue="effort = $event"
    />
</template>
```
