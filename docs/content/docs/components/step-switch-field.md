
## Component

::component-code
---
srcDir: 'forms/fields/switch/StepSwitchField.vue'
props: 
    id: "field-id"
    label: "Effort"
    legend: "Example legend"
    helpText: "Example help text"
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
    validator: null
    error: ""
    required: false
    showOptionalLabel: true
    optionalLabel: null
    disabled: false
    size: "md"
    icon: null
    styleType: "brand"
    fitToContent: false
    checkboxWrapperClass: ""
    labelClass: ""
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
  - error
externalTypes:
  - string
  - string
enums:
    size: "ControlFieldSize"
    styleType: "SwitchStyle"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
propsSettingsExcludedProps: ['validator', 'steps', 'modelValue']
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
        "name": "ariaLabel",
        "type": "string",
    },
    {
        "name": "legend",
        "type": "string",
    },
    {
        "name": "helpText",
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
        "name": "showOptionalLabel",
        "default": "true",
        "type": "boolean",
    },
    {
        "name": "optionalLabel",
        "type": "string",
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
        "name": "icon",
        "type": "string",
    },
    {
        "name": "styleType",
        "default": "SwitchStyle.BRAND",
        "type": "SwitchStyle",
    },
    {
        "name": "fitToContent",
        "default": "false",
        "type": "boolean",
    },
    {
        "name": "checkboxWrapperClass",
        "type": "string",
    },
    {
        "name": "labelClass",
        "type": "string",
    },
]
---
::

## Slots
::slots-table
---
slots: [
    {
        name: "label",
        description: "Overrides the rendered label with custom markup, instead of the plain-text `label` prop. Use this when the label needs formatted or rich content.",
    },
]
---
::

```vue
<template>
    <StepSwitchField id="field-id" :steps="steps">
        <template #label>
            Reasoning <strong>effort</strong>
        </template>
    </StepSwitchField>
</template>
```

## Usage
### id 

Sets the id of the field.

```vue
<template>
    <StepSwitchField id="field-id" :steps="steps" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### label 

Sets the label of the field.

```vue
<template>
    <StepSwitchField label="Effort" :steps="steps" />
</template>
```

- **Type:** `string`

### ariaLabel

Sets the accessible label of the switch. Use it when there is no visible `label` or `legend`.

```vue
<template>
    <StepSwitchField ariaLabel="Effort" :steps="steps" />
</template>
```

- **Type:** `string`

### legend

Sets the legend text of the field.

```vue
<template>
    <StepSwitchField legend="Legend text" :steps="steps" />
</template>
```

- **Type:** `string`

### helpText

Sets the help text of the field.

```vue
<template>
    <StepSwitchField helpText="Help text" :steps="steps" />
</template>
```

- **Type:** `string`

### modelValue

Controls the selected step by its `value`. Use `v-model` for two-way binding.

```vue
<template>
    <StepSwitchField v-model="effort" :steps="steps" />
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
    <StepSwitchField v-model="effort" :steps="steps" />
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

Sets the maximum number of steps rendered. Extra items in `steps` are ignored.

::content-alert
---
props:
    title: "Recommended maximum"
    description: "It is not enforced, but we recommend using no more than 7 steps. Beyond that, the positions become hard to read and to target, especially in small sizes."
---
::

```vue
<template>
    <StepSwitchField :steps="steps" :maxSteps="4" />
</template>
```

- **Type:** `number`
- **Default:** `5`

### validator

Sets the validator function for the field, which controls its internal validation state. It receives the current `modelValue`.

```vue
<template>
    <StepSwitchField :validator="myValidator" :steps="steps" />
</template>
```

- **Type:** `function`
- **Default:** `null`

### error (v-model:error)

Defines the error message displayed by the field. This prop is bindable via `v-model:error`, allowing two-way syncing of the validation state.

```vue
<template>
    <StepSwitchField v-model:error="errorMessage" :steps="steps" />
</template>
```

- **Type:** `string`
- **Default:** `''`

### required

Sets the required state of the field.

```vue
<template>
    <StepSwitchField required :steps="steps" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### showOptionalLabel

When the field is not `required`, shows an "(optional)" hint next to the `legend`. Set to `false` to hide it. The hint text defaults to a global setting that can be overridden project-wide, and can also be overridden per field with the `optionalLabel` prop.

```vue
<template>
    <StepSwitchField legend="Effort" :showOptionalLabel="false" :steps="steps" />
</template>
```

- **Type:** `boolean`
- **Default:** `true`

### optionalLabel

Overrides the "(optional)" hint text for this specific field, taking priority over the global default.

```vue
<template>
    <StepSwitchField legend="Effort" optionalLabel="(not required)" :steps="steps" />
</template>
```

- **Type:** `string`

### disabled

Sets the disabled state of the field.

```vue
<template>
    <StepSwitchField disabled :steps="steps" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### size

Sets the size of the field. It uses the `ControlFieldSize` enum.

```vue
<template>
    <StepSwitchField :size="ControlFieldSize.LG" :steps="steps" />
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

### icon

Sets the icon of the field.

```vue
<template>
    <StepSwitchField icon="mdi:brain" :steps="steps" />
</template>
```

- **Type:** `string`

### styleType

Sets the style type of the field. It uses the `SwitchStyle` enum.

```vue
<template>
    <StepSwitchField :styleType="SwitchStyle.SUCCESS" :steps="steps" />
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

### fitToContent

When set to `true`, the field will adjust its width to fit its content, rather than stretching to fill the container.

```vue
<template>
    <StepSwitchField fitToContent :steps="steps" />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### checkboxWrapperClass

Sets additional classes for the switch wrapper element.

```vue
<template>
    <StepSwitchField checkboxWrapperClass="custom-wrapper" :steps="steps" />
</template>
```

- **Type:** `string`

### labelClass

Sets additional classes for the label element.

```vue
<template>
    <StepSwitchField labelClass="custom-label-class" :steps="steps" />
</template>
```

- **Type:** `string`
