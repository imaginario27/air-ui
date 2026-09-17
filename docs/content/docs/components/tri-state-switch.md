
## Component

::component-code
---
srcDir: 'forms/fields/switch/TriStateSwitch.vue'
props: 
    id: "tri-state-switch-id"
    modelValue: "unchecked"
    disabled: false
    size: "md"
    styleType: "brand"
items:
    modelValue:
        - value: unchecked
          text: UNCHECKED
        - value: checked
          text: CHECKED
        - value: indeterminate
          text: INDETERMINATE
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
  - TriStateValue
enums:
    modelValue: "TriStateValue"
    size: "ControlFieldSize"
    styleType: "SwitchStyle"
isPreviewContentBoxed: true
previewContentMaxWidth: 400
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
        "name": "modelValue",
        "default": "TriStateValue.UNCHECKED",
        "type": "TriStateValue",
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

Sets the id of the underlying native checkbox input.

```vue
<template>
    <TriStateSwitch id="my-switch" />
</template>
```

- **Type:** `string`
- **Required:** `true`

### modelValue

Controls the state of the switch. Use `v-model` for two-way binding. It uses the `TriStateValue` enum.

Clicking or pressing space always resolves to `TriStateValue.CHECKED` or `TriStateValue.UNCHECKED`. `TriStateValue.INDETERMINATE` can only be set programmatically (for example, from a parent computing a partial-selection state), matching how tri-state checkboxes behave natively.

```vue
<template>
    <TriStateSwitch id="my-switch" v-model="state" />
</template>
<script setup lang="ts">
const state = ref<TriStateValue>(TriStateValue.INDETERMINATE)
</script>
```

- **Type:** `TriStateValue`
- **Default:** `TriStateValue.UNCHECKED`

#### Options
::options-table
---
options: [
    {
        value: "UNCHECKED",
        description: "The switch is off.",
    },
    {
        value: "CHECKED",
        description: "The switch is on.",
    },
    {
        value: "INDETERMINATE",
        description: "The switch is in a partial/mixed state. The handle rests in the middle and aria-checked is set to \"mixed\".",
    },
]
---
::

### disabled

Sets the disabled state of the switch. When disabled, clicks are ignored and the switch appearance reflects the inactive state.

```vue
<template>
    <TriStateSwitch id="my-switch" disabled />
</template>
```

- **Type:** `boolean`
- **Default:** `false`

### size

Sets the size of the switch. It uses the `ControlFieldSize` enum.

```vue
<template>
    <TriStateSwitch id="my-switch" :size="ControlFieldSize.LG" />
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
    <TriStateSwitch id="my-switch" :styleType="SwitchStyle.SUCCESS" />
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
        description: "Uses the primary brand color for the background when the switch is on or indeterminate.",
    },
    {
        value: "SUCCESS",
        description: "Uses the success color for the background when the switch is on or indeterminate.",
    },
]
---
::
